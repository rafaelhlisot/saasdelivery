//style imports
import '../styles/globals.css';

//package imports
import type { AppProps } from 'next/app';

//context imports
import { Provider as AppContextProvider } from '../contexts/app';
import { Provider as AuthContextProvider } from '../contexts/auth';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <AppContextProvider>
        <Component {...pageProps} />
      </AppContextProvider>
    </AuthContextProvider>
  );
}
export default MyApp;
