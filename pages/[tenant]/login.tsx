//package imports
import { GetServerSideProps } from 'next';
import { useEffect } from 'react';

//style imports
import styles from '../../styles/Login.module.css';

//components imports
import { useApi } from '../../libs/useApi';
import { Tenant } from '../../types/Tenant';
import { useAppContext } from '../../contexts/AppContext';
import Head from 'next/head';

const Login = (data: Props) => {
  const {tenant, setTenant} = useAppContext();

  useEffect(() => {
    setTenant(data.tenant);
  }, []);

  return (
    <div className={styles.container}>      
      <Head>
        <title>Login | {data.tenant.name}</title>
      </Head>
    </div>
  );
}

export default Login;

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