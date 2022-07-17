//style imports
import styles from '../../styles/Home.module.css';

//components imports
import { Banner } from '../../components/Banner';
import { ProdutcItem } from '../../components/ProductItem';
import { SearchInput } from '../../components/SearchInput';

const Home = () => {

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
              <div className={styles.menuButtonLine}></div>
              <div className={styles.menuButtonLine}></div>
              <div className={styles.menuButtonLine}></div>
            </div>
          </div>
        </div>
        <div className={styles.headerBottom}>
          <SearchInput
            mainColor="#FB9400"
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
            name: 'Texas Burger',
            price: 'RS 25,50'
          }}
          mainColor="#FB9400"
          secondColor="#FFF9F2"
        />
      </div>
    </div>
  );
}

export default Home;