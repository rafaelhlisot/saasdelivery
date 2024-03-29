//style imports
import styles from '../../../styles/Product-id.module.css';

//package imports
import { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { getCookie, hasCookie, setCookie } from 'cookies-next';
import { useRouter } from 'next/router';

//libs imports
import { useApi } from '../../../libs/useApi';
import { useFormatter } from '../../../libs/useFormatter';

//components imports
import { Tenant } from '../../../types/Tenant';
import { Header } from '../../../components/Header';
import { Button } from '../../../components/Button';
import { Quantity } from '../../../components/Quantity';

//contexts imports
import { useAppContext } from '../../../contexts/app';

//types imports
import { Product } from '../../../types/Product';
import { CartCookie } from '../../../types/CartCookie';


const Product = (data: Props) => {
  const {tenant, setTenant} = useAppContext();

  useEffect(() => {
    setTenant(data.tenant);
  }, []);

  const [qtCount, setQtCount] = useState(1);

  const formatter = useFormatter();
  const router = useRouter();
  const handleAddToCart = () => {
    let cart: CartCookie[] = [];

    if(hasCookie('cart')) {
      const cartCookie = getCookie('cart');
      const cartJson: CartCookie[] = JSON.parse(cartCookie as string);

      for(let i in cartJson) {
        if(cartJson[i].qt && cartJson[i].id) {
          cart.push(cartJson[i]);
        }
      }
    }

    const cartIndex = cart.findIndex(item => item.id === data.product.id);
    if(cartIndex > - 1) {
      cart[cartIndex].qt += qtCount;
    } else {
      cart.push({
        id: data.product.id,
        qt: qtCount
      });
    }

    setCookie('cart', JSON.stringify(cart));

    router.push(`/${data.tenant.slug}/cart`);
  }

  const handleUpdateQt = (newCount: number) => {
    setQtCount(newCount);
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>{data.product.name} | {data.tenant.name}</title>
      </Head>

      <div className={styles.headerArea}>
        <Header 
          color={data.tenant.mainColor}
          backHref={`/${data.tenant.slug}`}
          title="Produto"
          invert
        />
      </div>
      <div className={styles.headerBg} style={{backgroundColor: data.tenant.mainColor}}></div>

      <div className={styles.productImage}>
        <img src={data.product.image} alt=""/>
      </div>

      <div className={styles.category}>{data.product.categoryName}</div>
      <div className={styles.title} style={{borderBottomColor: data.tenant.mainColor}}>{data.product.name}</div>
      <div className={styles.line}></div>

      <div className={styles.description}>{data.product.description}</div>

      <div className={styles.qtText}>Quantidade</div>

      <div className={styles.area}>
        <div className={styles.areaLeft}>
          <Quantity
            color={data.tenant.mainColor}
            count={qtCount}
            onUpdateCount={handleUpdateQt}
            min={1}
          />
        </div>
        <div className={styles.areaRight} style={{color: data.tenant.mainColor}}>
          {formatter.formatPrice(data.product.price)}
        </div>
      </div>
      <div className={styles.buttonArea}>
          <Button 
            color={data.tenant.mainColor}
            label='Adicionar à sacola'
            onClick={handleAddToCart}
            fill
          />
        </div>
    </div>
  );
}

export default Product;

type Props = {
  tenant: Tenant,
  product: Product,
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const {tenant: tenantSlug, id} = context.query;

  const api = useApi(tenantSlug as string);

  //Get Tenant
  const tenant = await api.getTenant();

  if(!tenant) {
    return {redirect: {destination: '/', permanent: false}}
  }

  const product = await api.getProduct(parseInt(id as string));
  
  return {
    props: {
      tenant,
      product
    }
  }
}