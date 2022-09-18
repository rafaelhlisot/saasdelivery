//style imports
import styles from './styles.module.css';

//package imports
import Link from 'next/link';

//components imports
import { useAppContext } from '../../contexts/app';

//libs imports
import { useFormatter } from '../../libs/useFormatter';

//types imports
import { Product } from '../../types/Product';


type Props = {
  data: Product; 
}

export const ProdutcItem = ({data}: Props) => {
  const {tenant} = useAppContext();
  const formatter = useFormatter();

  return (
    <Link href={`/${tenant?.slug}/product/${data.id}`}>
      <a className={styles.container}>
        <div className={styles.head} style={{ backgroundColor: tenant?.secondColor}}></div>
        <div className={styles.info}>
          <div className={styles.img}>
            <img src={data.image} alt="" />
          </div>
          <div className={styles.catName}>{data.categoryName}</div>
          <div className={styles.productName}>{data.name}</div>
          <div className={styles.productPrice} style={{color: tenant?.mainColor}}>{formatter.formatPrice(data.price)}</div>
        </div>
      </a>
    </Link>
  );
}