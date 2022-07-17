import Link from 'next/link';
import { Product } from '../../types/Product';
import styles from './styles.module.css';

type Props = {
  data: Product;
  mainColor: string;
  secondColor: string; 
}

export const ProdutcItem = ({data, mainColor, secondColor}: Props) => {
  return (
    <Link href={`/b7burger/product/${data.id}`}>
      <a className={styles.container}>
        <div className={styles.head} style={{ backgroundColor: secondColor}}></div>
        <div className={styles.info}>
          <div className={styles.img}>
            <img src={data.image} alt="" />
          </div>
          <div className={styles.catName}>{data.categoryName}</div>
          <div className={styles.productName}>{data.name}</div>
          <div className={styles.productPrice} style={{color: mainColor}}>{data.price}</div>
        </div>
      </a>
    </Link>
  );
}