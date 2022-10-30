//style imports
import styles from '../../styles/MyAdreesses.module.css';

//package imports
import { GetServerSideProps } from 'next';
import { getCookie } from 'cookies-next';

//libs imports
import { useApi } from '../../libs/useApi';

//contexts imports
import { useAuthContext } from '../../contexts/auth';
import { useAppContext } from '../../contexts/app';

//types imports
import { Tenant } from '../../types/Tenant';
import { User } from '../../types/User';
import Head from 'next/head';
import { Header } from '../../components/Header';
import { useFormatter } from '../../libs/useFormatter';
import { CartItem } from '../../types/CartItem';
import { useRouter } from 'next/router';
import { Button } from '../../components/Button';
import { Address } from '../../types/Address';

const MyAdreesses = (data: Props) => {
  const {setToken, setUser} = useAuthContext();
  const {tenant, setTenant} = useAppContext();

  const formatter = useFormatter();
  const router = useRouter();

  const handleNewAdress = () => {
    router.push(`/${data.tenant.slug}/newaddress`);
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Meus Endereços | {data.tenant.name}</title>
      </Head>

      <Header
        backHref={`/${data.tenant.slug}/checkout`}
        color={data.tenant.mainColor}
        title="Meus Endereços"
      />

      <div className={styles.list}>
        {data.address.map((item, index) => (
          <div key={index}>{item.street} - {item.number}</div>
        ))}
      </div>

      <div className={styles.btnArea}>
        <Button
          color={data.tenant.mainColor}
          label='Novo Endereço'
          fill
          onClick={handleNewAdress}
        />
      </div>
    </div>
  );
}

export default MyAdreesses;

type Props = {
  tenant: Tenant;
  token: string;
  user: User | null;
  address: Address[];
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

  if(!user) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  const address = await api.getUserAddresses(user.email);
  
  return {
    props: {
      tenant,
      user,
      token,
      address
    }
  }
}