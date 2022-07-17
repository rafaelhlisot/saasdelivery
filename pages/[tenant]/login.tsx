//package imports
import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';

//style imports
import styles from '../../styles/Login.module.css';

//components imports
import { useApi } from '../../libs/useApi';
import { Tenant } from '../../types/Tenant';
import { useAppContext } from '../../contexts/AppContext';
import Head from 'next/head';
import { Header } from '../../components/Header';
import { InputField } from '../../components/InputField';

const Login = (data: Props) => {
  const {tenant, setTenant} = useAppContext();

  useEffect(() => {
    setTenant(data.tenant);
  }, []);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className={styles.container}>      
      <Head>
        <title>Login | {data.tenant.name}</title>
      </Head>

      <Header color={data.tenant.mainColor} backHref={`/${data.tenant.slug}`} />

      <InputField
        color={data.tenant.mainColor}
        placeholder="Digite Seu E-Mail"
        value={email}
        onChange={setEmail}
      />

      <InputField
        color={data.tenant.mainColor}
        placeholder="Digite Sua senha"
        value={password}
        onChange={setPassword}
        password
      />
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