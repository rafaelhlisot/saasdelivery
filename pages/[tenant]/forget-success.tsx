//package imports
import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';

//style imports
import styles from '../../styles/ForgetSuccess.module.css';

//components imports
import { useApi } from '../../libs/useApi';
import { Tenant } from '../../types/Tenant';
import { useAppContext } from '../../contexts/AppContext';
import Head from 'next/head';
import { Header } from '../../components/Header';
import { InputField } from '../../components/InputField';
import { Button } from '../../components/Button';
import { useRouter } from 'next/router';
import { Icon } from '../../components/Icon';

const ForgetSuccess = (data: Props) => {
  const {tenant, setTenant} = useAppContext();

  useEffect(() => {
    setTenant(data.tenant);
  }, []);

  const router = useRouter();

  const handleSubmit = () => {
    router.push(`/${data.tenant.slug}/login`);
  }

  const [email, setEmail] = useState('');

  return (
    <div className={styles.container}>      
      <Head>
        <title>Esqueci a senha | {data.tenant.name}</title>
      </Head>

      <Header color={data.tenant.mainColor} backHref={`/${data.tenant.slug}/forget`} />

      <div className={styles.iconArea}>
        <Icon icon='mailSent' color={data.tenant.mainColor} width={99} height={81} />
      </div>

      <div className={styles.title}>
        Verifique seu e-mail
      </div>

      <div className={styles.subtitle}>Enviamos as instruções para recuperação de senha para o seu e-mail</div>

      <div className={styles.formArea}>
        <div className={styles.inputArea}>
          <Button
            color={data.tenant.mainColor}
            label="Enviar"
            onClick={handleSubmit}
            fill
          />
        </div>
      </div>
    </div>
  );
}

export default ForgetSuccess;

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