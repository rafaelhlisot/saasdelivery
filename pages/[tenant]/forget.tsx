//style imports
import styles from '../../styles/Forget.module.css';

//package imports
import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

//libs imports
import { useApi } from '../../libs/useApi';

//context imports
import { useAppContext } from '../../contexts/app';

//components imports
import { Header } from '../../components/Header';
import { InputField } from '../../components/InputField';
import { Button } from '../../components/Button';

//types imports
import { Tenant } from '../../types/Tenant';

const Forget = (data: Props) => {
  const {tenant, setTenant} = useAppContext();

  useEffect(() => {
    setTenant(data.tenant);
  }, []);

  const router = useRouter();

  const handleSubmit = () => {
    router.push(`/${data.tenant.slug}/forget-success`);
  }

  const [email, setEmail] = useState('');

  return (
    <div className={styles.container}>      
      <Head>
        <title>Esqueci a senha | {data.tenant.name}</title>
      </Head>

      <Header color={data.tenant.mainColor} backHref={`/${data.tenant.slug}/login`} />

      <div className={styles.header}>{data.tenant.name}</div>

      <div className={styles.title}>
        Esqueceu sua senha?
      </div>

      <div
        className={styles.subtitle}
        style={{borderBottomColor: data.tenant.mainColor}}
      >Preencha o campo com seu e-mail e receba as instruções nescessárias para redefinir sua senha.</div>

      <div className={styles.line}></div>

      <div className={styles.formArea}>
        <div className={styles.inputArea}>
          <InputField
            color={data.tenant.mainColor}
            placeholder="Digite Seu E-Mail"
            value={email}
            onChange={setEmail}
          />
        </div>
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

export default Forget;

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