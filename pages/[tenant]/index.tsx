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
import { useAppContext } from '../../contexts/AppContext';
import { useEffect } from 'react';

const Home = (data: Props) => {
  const {tenant, setTenant} = useAppContext();

  useEffect(() => {
    setTenant(data.tenant);
  }, []);

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
            <div className={styles.menuButton}>
              <div className={styles.menuButtonLine} style={{backgroundColor: tenant?.mainColor}}></div>
              <div className={styles.menuButtonLine} style={{backgroundColor: tenant?.mainColor}}></div>
              <div className={styles.menuButtonLine} style={{backgroundColor: tenant?.mainColor}}></div>
            </div>
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
        <ProdutcItem 
          data={{
            id: 1,
            image: '/tmp/texasBurger.png',
            categoryName: 'Tradicional',
            name: 'B7Burger',
            price: 'RS 25,50'
          }}
        />
      </div>
    </div>
  );
}

export default Home;

type Props = {
  tenant: Tenant
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const {tenant: tenantSlug} = context.query;

  const api = useApi();

  //Get Tenant
  const tenant = await api.getTenant(tenantSlug as string);

  if(!tenant) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }
  
  return {
    props: {
      tenant
    }
  }
}