import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { CssBaseline, ThemeProvider } from '@mui/material';

import { lightTheme } from '../themes';
import { SWRConfig } from 'swr/_internal';
import { CartProvider, UiProvider } from '../context';
import { AuthProvider } from '../context/auth';


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig value={{fetcher: (resource, init) =>fetch(resource,init).then(res => res.json())}}>
      <AuthProvider isLoggedIn={false}>

      <CartProvider cart={[]} numberOfItems={0} subTotal={0} tax={0} total={0}>

      <UiProvider isMenuOpen={false}>
      

        <ThemeProvider theme={ lightTheme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      
      </UiProvider>
      </CartProvider>
      </AuthProvider>
    </SWRConfig>
  )
}

export default MyApp
