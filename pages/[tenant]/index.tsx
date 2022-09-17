//package imports
import { GetServerSideProps } from 'next';

//style imports
import styles from '../../styles/Home.module.css';

//components imports
import { Banner } from '../../components/Banner';
import { ProdutcItem } from '../../components/ProductItem';
import { SearchInput } from '../../components/SearchInput';
import { useApi } from '../../libs/useApi';
import { Tenant } from '../../types/Tenant';
import { useAppContext } from '../../contexts/app';
import { useEffect, useState } from 'react';
import { Product } from '../../types/Product';
import { Sidebar } from '../../components/Sidebar';

const Home = (data: Props) => {
  const {tenant, setTenant} = useAppContext();

  useEffect(() => {
    setTenant(data.tenant);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [products, setProducts] = useState<Product[]>(data.products);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSearch = (searchValue: string) => {
    console.log(searchValue);
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerTop}>
          <div className={styles.headerTopLeft}>
            <div className={styles.headerTitle}>Seja Bem-Vindo(a) 👋</div>
            <div className={styles.headerSubtitle}>O que deseja para hoje?</div>
          </div>
          <div className={styles.headerTopRight}>
            <div
              className={styles.menuButton}
              onClick={() => setSidebarOpen(true)}
            >
              <div className={styles.menuButtonLine} style={{backgroundColor: tenant?.mainColor}}></div>
              <div className={styles.menuButtonLine} style={{backgroundColor: tenant?.mainColor}}></div>
              <div className={styles.menuButtonLine} style={{backgroundColor: tenant?.mainColor}}></div>
            </div>
            <Sidebar
              tenant={data.tenant}
              onClose={() => setSidebarOpen(false)}
              open={sidebarOpen}  
            />
          </div>
        </div>
        <div className={styles.headerBottom}>
          <SearchInput
            onSearch={handleSearch}
          />
        </div>
      </header>

      <Banner />
      
      <div className={styles.grid}>
        {products.map((item, index) => (
          <ProdutcItem key={index} data={item} />
        ))}
      </div>
    </div>
  );
}

export default Home;

type Props = {
  tenant: Tenant,
  products: Product[],
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const {tenant: tenantSlug} = context.query;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const api = useApi(tenantSlug as string);

  //Get Tenant
  const tenant = await api.getTenant();

  if(!tenant) {
    return {redirect: {destination: '/', permanent: false}}
  }

  const products = await api.getAllProducts();
  
  return {
    props: {
      tenant,
      products
    }
  }
}