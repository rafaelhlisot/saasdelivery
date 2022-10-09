//style imports
import styles from '../../styles/Checkout.module.css';

//package imports
import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';
import { getCookie } from 'cookies-next';

//libs imports
import { useApi } from '../../libs/useApi';

//contexts imports
import { useAuthContext } from '../../contexts/auth';
import { useAppContext } from '../../contexts/app';

//components imports
import { InputField } from '../../components/InputField';

//types imports
import { Tenant } from '../../types/Tenant';
import { User } from '../../types/User';
import Head from 'next/head';
import { Header } from '../../components/Header';
import { Button } from '../../components/Button';
import { useFormatter } from '../../libs/useFormatter';
import { CartItem } from '../../types/CartItem';
import { useRouter } from 'next/router';
import { CartProductItem } from '../../components/CartMenuItem';
import { ButtonWithIcon } from '../../components/ButtonWithIcon';
import { Address } from '../../types/Address';

const Checkout = (data: Props) => {
  const {setToken, setUser} = useAuthContext();
  const {tenant, setTenant} = useAppContext();

  const formatter = useFormatter();
  const router = useRouter();

  const [shippingPrice, setShippingPrice] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [cart, setCart] = useState<CartItem[]>(data.cart);
  const [shippingAddress, setShippingAddress] = useState<Address>();
  const [paymentType, setPaymentType] = useState<'money' | 'card'>('money');
  const [paymentChange, setPaymentChange] = useState(0);
  const [cupom, setCupom] = useState("");
  const [cupomDiscount, setCupomDiscount] = useState(0);
  const [cupomInput, setCupomInput] = useState('');

  useEffect(() => {
    setTenant(data.tenant);
    setToken(data.token);
    if(data.user) setUser(data.user);
  }, []);

  useEffect(() => {
    let sub = 0;
    for(let i in cart) {
      sub += cart[i].product.price * cart[i].qt;
    }
    setSubtotal(sub);
  }, [cart]);


  

  const handleChangeAddress = () => {
    //router.push(`/${data.tenant.slug}/myaddresses`);
    setShippingAddress({
      id: 1,
      cep: "89925000",
      street: "Rua Santos Dumont",
      number: "852",
      neighborhood: "centro",
      city: "Belmonte",
      state: "SC"
    });
    setShippingPrice(10);
  }

  const handleSetCupom = () => {
    if(cupomInput) {
      setCupom(cupomInput);
      setCupomDiscount(10);
    }
  }

  const handleFinish = () => {
    
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Checkout | {data.tenant.name}</title>
      </Head>

      <Header
        backHref={`/${data.tenant.slug}`}
        color={data.tenant.mainColor}
        title="Checkout"
      />

      <div className={styles.infoGroup}>
        <div className={styles.infoArea}>
          <div className={styles.infoTitle}>Endereço</div>
          <div className={styles.infoBody}>
            <ButtonWithIcon
              color={data.tenant.mainColor}
              leftIcon={"location"}
              rightIcon={"rightArrow"}
              value={shippingAddress  ? `${shippingAddress.street} ${shippingAddress.number} - ${shippingAddress.city}` : "Escolha Um Endereço"}
              onClick={handleChangeAddress}
            />
          </div>
        </div>

        <div className={styles.infoArea}>
          <div className={styles.infoTitle}>Tipo de Pagamento</div>
          <div className={styles.infoBody}>
            <div className={styles.paymentTypes}>
              <div className={styles.paymentBtn}>
                <ButtonWithIcon
                  color={data.tenant.mainColor}
                  value="Dinheiro"
                  leftIcon="money"
                  onClick={() => setPaymentType('money')}
                  fill={paymentType === 'money'}
                />
              </div>
              <div className={styles.paymentBtn}>
                <ButtonWithIcon
                  color={data.tenant.mainColor}
                  value="Cartão"
                  leftIcon="card"
                  onClick={() => setPaymentType('card')}
                  fill={paymentType === 'card'}
                />
              </div>
            </div>
          </div>
        </div>

        {paymentType === 'money' &&
          <div className={styles.infoArea}>
            <div className={styles.infoTitle}>Troco</div>
            <div className={styles.infoBody}>
              <InputField
                color={data.tenant.mainColor}
                placeholder="Quanto você tem em dinheiro?"
                value={paymentChange ? paymentChange.toString() : ""}
                onChange={newValue => setPaymentChange(parseInt(newValue))}
              />
            </div>
          </div>
        }

        <div className={styles.infoArea}>
          <div className={styles.infoTitle}>Cupom de Desconto</div>
          <div className={styles.infoBody}>
            {cupom &&
              <ButtonWithIcon
                color={data.tenant.mainColor}
                value={cupom.toUpperCase()}
                leftIcon="cupom"
                rightIcon="checked"
              />
            }
            {!cupom &&
              <div className={styles.cupomInput}>
                <InputField
                  color={data.tenant.mainColor}
                  onChange={newValue => setCupomInput(newValue)}
                  placeholder="Tem Um Cupom??"
                  value={cupomInput}
                />
                <Button
                  color={data.tenant.mainColor}
                  label="OK"
                  onClick={handleSetCupom}
                />
              </div>
            }
          </div>
        </div>
      </div>

      <div className={styles.productsQuantity}>{cart.length} {cart.length === 1 ? 'item' : 'itens'}</div>

      <div className={styles.productsList}>
        {cart.map((cartItem, index) => (
          <CartProductItem
            key={index}
            color={data.tenant.mainColor}
            quantity={cartItem.qt}
            product={cartItem.product}
            onChange={() => {}}
            noEdit
          />
        ))}
      </div>

      <div className={styles.resumeArea}>
        <div className={styles.resumeItem}>
          <div className={styles.resumeLeft}>Subtotal</div>
          <div className={styles.resumeRight}>{formatter.formatPrice(subtotal)}</div>
        </div>
        {cupomDiscount > 0 &&
          <div className={styles.resumeItem}>
            <div className={styles.resumeLeft}>Desconto</div>
            <div className={styles.resumeRight}>-{formatter.formatPrice(cupomDiscount)}</div>
          </div>
        }
        <div className={styles.resumeItem}>
          <div className={styles.resumeLeft}>Frete</div>
          <div className={styles.resumeRight}>
            {shippingPrice > 0 ? formatter.formatPrice(shippingPrice) : '--'}
          </div>
        </div>
        <div className={styles.resumeLine}></div>
        <div className={styles.resumeItem}>
          <div className={styles.resumeLeft}>Total</div>
          <div className={styles.resumeRightBig} style={{color: data.tenant.mainColor}}>
            {formatter.formatPrice(shippingPrice + subtotal - cupomDiscount)}
          </div>
        </div>
        <div className={styles.resumeButtom}>
          <Button
            color={data.tenant.mainColor}
            label="Finalizar pedido"
            onClick={handleFinish}
            fill
            disabled={!shippingAddress}
          />
        </div>
      </div>
    </div>
  );
}

export default Checkout;

type Props = {
  tenant: Tenant;
  token: string;
  user: User | null;
  cart: CartItem[];
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

  const cartCookie = getCookie('cart', context);

  const cart = await api.getCartProducts(cartCookie as string);
  
  return {
    props: {
      tenant,
      user,
      token,
      cart
    }
  }
}