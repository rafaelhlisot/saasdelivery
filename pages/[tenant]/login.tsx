//style imports
import styles from '../../styles/Login.module.css';

//package imports
import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

//libs imports
import { useApi } from '../../libs/useApi';

//contexts imports
import { useAppContext } from '../../contexts/app';
import { useAuthContext } from '../../contexts/auth';

//components imports
import { Header } from '../../components/Header';
import { InputField } from '../../components/InputField';
import { Button } from '../../components/Button';

//types imports
import { Tenant } from '../../types/Tenant';

const Login = (data: Props) => {
  const {tenant, setTenant} = useAppContext();

  const {setToken, setUser} = useAuthContext();

  useEffect(() => {
    setTenant(data.tenant);
  }, []);

  const router = useRouter();

  const handleSubmit = () => {
    setToken('1234');
    setUser({
      name: 'Rafael',
      email: 'rafael@teste.com'
    })
    router.push(`/${data.tenant.slug}`);
  }

  const handleSignUp = () => {
    router.push(`/${data.tenant.slug}/signup`);
  }

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className={styles.container}>      
      <Head>
        <title>Login | {data.tenant.name}</title>
      </Head>

      <Header color={data.tenant.mainColor} backHref={`/${data.tenant.slug}`} />

      <div className={styles.header}>{data.tenant.name}</div>

      <div
        className={styles.subtitle}
        style={{borderBottomColor: data.tenant.mainColor}}
      >Use suas credenciais para realizar o login.</div>

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
          <InputField
            color={data.tenant.mainColor}
            placeholder="Digite Sua senha"
            value={password}
            onChange={setPassword}
            password
          />
        </div>
        <div className={styles.inputArea}>
          <Button
            color={data.tenant.mainColor}
            label="Entrar"
            onClick={handleSubmit}
            fill
          />
        </div>
      </div>

      <div className={styles.forgetArea} style={{borderBottomColor: data.tenant.mainColor}}>
        Esqueceu sua senha? <Link href={`/${data.tenant.slug}/forget`}><a style={{color: data.tenant.mainColor}}>Clique Aqui</a></Link>.
      </div>

      <div className={styles.line}></div>

      <div className={styles.singupArea}>
        <Button
          color={data.tenant.mainColor}
          label="Quero me cadastrar"
          onClick={handleSignUp}
        />
      </div>

    </div>
  );
}

export default Login;

type Props = {
  tenant: Tenant
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const {tenant: tenantSlug} = context.query;

  const api = useApi(tenantSlug as string);

  //Get Tenant
  const tenant = await api.getTenant();

  console.log('tenant:', tenant);

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