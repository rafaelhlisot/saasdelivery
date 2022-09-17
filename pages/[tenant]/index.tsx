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
import { getCookie } from 'cookies-next';
import { User } from '../../types/User';
import { useAuthContext } from '../../contexts/auth';
import NoItemsIcon from '../../public/assets/noitems.svg';

const Home = (data: Props) => {
  const {setToken, setUser} = useAuthContext();
  const {tenant, setTenant} = useAppContext();
  const [products, setProducts] = useState<Product[]>(data.products);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  const handleSearch = (value: string) => setSearchText(value);

  useEffect(() => {
    setTenant(data.tenant);
    setToken(data.token);
    if(data.user) setUser(data.user);
  }, []);

  useEffect(() => {
    let newFilteredProducts: Product[] = [];
    for(let product of data.products) {
      if(product.name.toLowerCase().indexOf(searchText.toLowerCase()) > -1) {
        newFilteredProducts.push(product);
      }
    }
    setFilteredProducts(newFilteredProducts);
  }, [searchText]);

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

      {searchText &&
        <>
          <div className={styles.seacrText}>
            Procurando por: <strong>{searchText}</strong>
          </div>

          {filteredProducts.length > 0 &&
            <div className={styles.grid}>
              {filteredProducts.map((item, index) => (
                <ProdutcItem key={index} data={item} />
              ))}
            </div>
          }

          {filteredProducts.length === 0 &&
            <div className={styles.noProducts}>
              <NoItemsIcon color="#E0E0E0"/>
              <div className={styles.noProductsText}>
                Ops! Não há itens com esse nome...
              </div>
            </div>
          }
        </>
      }

      {!searchText &&
        <>
          <Banner />
          
          <div className={styles.grid}>
            {products.map((item, index) => (
              <ProdutcItem key={index} data={item} />
            ))}
          </div>
        </>
      }
    </div>
  );
}

export default Home;

type Props = {
  tenant: Tenant;
  products: Product[];
  token: string;
  user: User | null;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const {tenant: tenantSlug} = context.query;

  const api = useApi(tenantSlug as string);

  //Get Tenant
  const tenant = await api.getTenant();

  if(!tenant) {
    return {redirect: {destination: '/', permanent: false}}
  }

  const token = getCookie('token', context);

  const user = await api.authorizeToken(token as string);

  const products = await api.getAllProducts();
  
  return {
    props: {
      tenant,
      products,
      user,
      token
    }
  }
}