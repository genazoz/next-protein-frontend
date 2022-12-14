import App from "next/app";
import type {AppProps} from 'next/app'
import {Router, useRouter} from "next/router";
import Head from "next/head";
import dynamic from "next/dynamic";
import {useSelector} from "react-redux";
import {ThemeProvider} from "styled-components";
import nProgress from "nprogress";

import '/public/fonts/fonts.sass'
import GlobalStyles from "../styles/GlobalStyles";
import theme from "../styles/theme";
import {wrapper} from "../app/store";
import {settingsSelector} from "../features/settings/settingsSlice";
import {Api} from "../utils/api";
import {setUserData} from "../features/user/userSlice";
import PrivatePaths from "../utils/privatePaths";
import RouteGuard from '../components/RouteGuard';
import Transition from '../components/Transition';

Router.events.on("routeChangeStart", nProgress.start);
Router.events.on("routeChangeError", nProgress.done);
Router.events.on("routeChangeComplete", nProgress.done);

const DynamicHeader = dynamic(() => import(/*webpackChunkName: "Header_DYNAMIC_IMPORT"*/'../components/Header'))
const DynamicPreloader = dynamic(() => import(/*webpackChunkName: "Preloader_DYNAMIC_IMPORT"*/'../components/Preloader'))

function MyApp({Component, pageProps}: AppProps) {
  const {showPreloader} = useSelector(settingsSelector);
  const router = useRouter()

  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>Protein Next</title>
      </Head>
      <GlobalStyles/>
      <DynamicHeader/>
      {showPreloader && <DynamicPreloader selector={'#preloader-root'}/>}
      <RouteGuard>
        <Transition location={router.pathname}>
          <Component {...pageProps} />
        </Transition>
      </RouteGuard>
    </ThemeProvider>
  )
}

MyApp.getInitialProps = wrapper.getInitialAppProps(
  (store) => async (context) => {
    const ctx = context.ctx;
    try {
      const userData = await Api(ctx).user.getMe();

      store.dispatch(setUserData(userData));
    } catch (err) {

      if (ctx.asPath && PrivatePaths.includes(ctx.asPath)) {
        ctx.res?.writeHead(302, {
          Location: "/",
        });
        ctx.res?.end();
      }
      console.warn(err);
    }

    return {
      pageProps: {
        ...(await App.getInitialProps(context)).pageProps,
      },
    };
  }
);

export default wrapper.withRedux(MyApp);
