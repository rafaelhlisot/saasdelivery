//style imports
import styles from '../../styles/Checkout.module.css';

//package imports
import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';
import { getCookie, setCookie } from 'cookies-next';

//libs imports
import { useApi } from '../../libs/useApi';

//contexts imports
import { useAuthContext } from '../../contexts/auth';
import { useAppContext } from '../../contexts/app';

//components imports
import { InputField } from '../../components/InputField';

//types imports
import { Tenant } from '../../types/Tenant';
import { Product } from '../../types/Product';
import { User } from '../../types/User';
import Head from 'next/head';
import { Header } from '../../components/Header';
import { Button } from '../../components/Button';
import { useFormatter } from '../../libs/useFormatter';
import { CartItem } from '../../types/CartItem';
import { useRouter } from 'next/router';
import { CartProductItem } from '../../components/CartMenuItem';
import { CartCookie } from '../../types/CartCookie';
import { ButtonWithIcon } from '../../components/ButtonWithIcon';

const Checkout = (data: Props) => {
  const {setToken, setUser} = useAuthContext();
  const {tenant, setTenant} = useAppContext();

  const formatter = useFormatter();
  const router = useRouter();

  const [shippingInput, setShippingInput] = useState('');
  const [shippingPrice, setShippingPrice] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [shippingTime, setShippingTime] = useState(0);
  const [cart, setCart] = useState<CartItem[]>(data.cart);
  const [shippingAddress, setShippingAddress] = useState('');

  useEffect(() => {
    setTenant(data.tenant);
    setToken(data.token);
    if(data.user) setUser(data.user);
  }, []);

  useEffect(() => {
    let sub = 0;
    for(let i in cart) {
      sub += cart[i].product.price * cart[i].qt;
    }
    setSubtotal(sub);
  }, [cart]);


  const handleShippingCalc = () => {
    setShippingAddress('Rua das couves');
    setShippingPrice(9.50);
    setShippingTime(20);
  }

  const handleCartChange = (newCount: number, id: number) => {
    const tmpCart: CartItem[] = [...cart];

    const cartindex = tmpCart.findIndex(item => item.product.id === id);
    if(newCount > 0) {
      tmpCart[cartindex].qt = newCount;
    } else {
      delete tmpCart[cartindex];
    }

    let newCart: CartItem[] = tmpCart.filter(item => item);
    setCart(newCart);

    let cartCookie: CartCookie[] = [];
    for(let i in newCart) {
      cartCookie.push({
        id: newCart[i].product.id,
        qt: newCart[i].qt
      });
    }

    setCookie('cart', JSON.stringify(cartCookie));
  }

  const handleFinish = () => {
    router.push(`/${data.tenant.slug}/checkout`);
  }

  const handleChangeAddress = () => {

  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Checkout | {data.tenant.name}</title>
      </Head>

      <Header
        backHref={`/${data.tenant.slug}`}
        color={data.tenant.mainColor}
        title="Checkout"
      />

      <div className={styles.infoGroup}>
        <div className={styles.infoArea}>
          <div className={styles.infoTitle}>Endereço</div>
          <div className={styles.infoBody}>
            <ButtonWithIcon
              color={data.tenant.mainColor}
              leftIcon={"location"}
              rightIcon={"rightArrow"}
              value={"Rua Teste, 456"}
              onClick={handleChangeAddress}
            />
          </div>
        </div>

        <div className={styles.infoArea}>
          <div className={styles.infoTitle}>Tipo de Pagamento</div>
          <div className={styles.infoBody}>
            <div className={styles.paymentTypes}>
              <div className={styles.paymentBtn}>
                <ButtonWithIcon
                  color={data.tenant.mainColor}
                  value="Dinheiro"
                  leftIcon="money"
                  onClick={() => {}}
                  fill
                />
              </div>
              <div className={styles.paymentBtn}>
                <ButtonWithIcon
                  color={data.tenant.mainColor}
                  value="Cartão"
                  leftIcon="card"
                  onClick={() => {}}
                />
              </div>
            </div>
          </div>
        </div>

        <div className={styles.infoArea}>
          <div className={styles.infoTitle}>Troco</div>
          <div className={styles.infoBody}>
            <InputField
              color={data.tenant.mainColor}
              placeholder="Quanto você tem em dinheiro?"
              value={""}
              onChange={() => {}}
            />
          </div>
        </div>

        <div className={styles.infoArea}>
          <div className={styles.infoTitle}>Cupom de Desconto</div>
          <div className={styles.infoBody}>
            <ButtonWithIcon
              color={data.tenant.mainColor}
              value="teste123"
              leftIcon="cupom"
              rightIcon="checked"
            />
          </div>
        </div>
      </div>











      <div className={styles.productsQuantity}>{cart.length} {cart.length === 1 ? 'item' : 'itens'}</div>

      <div className={styles.productsList}>
        {cart.map((cartItem, index) => (
          <CartProductItem
            key={index}
            color={data.tenant.mainColor}
            quantity={cartItem.qt}
            product={cartItem.product}
            onChange={handleCartChange}
          />
        ))}
      </div>

      <div className={styles.shippingArea}>
        <div className={styles.shippingTitle}>Calcular frete e prazo</div>
        <div className={styles.shippingForm}>
          <InputField
            color={data.tenant.mainColor}
            placeholder="Digite seu CEP"
            onChange={newValue => setShippingInput(newValue)}
            value={shippingInput}
          />

          <Button
            color={data.tenant.mainColor}
            label="OK"
            onClick={handleShippingCalc}
          />
        </div>
        {shippingTime > 0 &&
          <div className={styles.shippingInfo}>
            <div className={styles.shippingAddress}>{shippingAddress}</div>
            <div className={styles.shippingTime}>
              <div className={styles.shippingTimeText}>Receba em até {shippingTime} minutos</div>
              <div className={styles.shippingPrice} style={{color: data.tenant.mainColor}}>
                {formatter.formatPrice(shippingPrice)}
              </div>
            </div>
          </div>
        }
      </div>

      <div className={styles.resumeArea}>
        <div className={styles.resumeItem}>
          <div className={styles.resumeLeft}>Subtotal</div>
          <div className={styles.resumeRight}>{formatter.formatPrice(subtotal)}</div>
        </div>
        <div className={styles.resumeItem}>
          <div className={styles.resumeLeft}>Frete</div>
          <div className={styles.resumeRight}>
            {shippingPrice > 0 ? formatter.formatPrice(shippingPrice) : '--'}
          </div>
        </div>
        <div className={styles.resumeLine}></div>
        <div className={styles.resumeItem}>
          <div className={styles.resumeLeft}>Total</div>
          <div className={styles.resumeRightBig} style={{color: data.tenant.mainColor}}>
            {formatter.formatPrice(shippingPrice + subtotal)}
          </div>
        </div>
        <div className={styles.resumeButtom}>
          <Button
            color={data.tenant.mainColor}
            label="Continuar"
            onClick={handleFinish}
            fill
          />
        </div>
      </div>
    </div>
  );
}

export default Checkout;

type Props = {
  tenant: Tenant;
  token: string;
  user: User | null;
  cart: CartItem[];
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const {tenant: tenantSlug} = context.query;

  const api = useApi(tenantSlug as string);

  //Get Tenant
  const tenant = await api.getTenant();

  if(!tenant) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  const token = getCookie('token', context);

  const user = await api.authorizeToken(token as string);

  const cartCookie = getCookie('cart', context);

  const cart = await api.getCartProducts(cartCookie as string);
  
  return {
    props: {
      tenant,
      user,
      token,
      cart
    }
  }
}