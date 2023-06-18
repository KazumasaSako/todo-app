import * as React from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';
import theme from 'styles/theme';
import createEmotionCache from 'services/emotionCache/createEmotionCache';
import 'styles/global.css';
import { APP_NAME } from 'utility/Const';

import { Amplify } from 'aws-amplify';
import AwsExports from "aws-exports";
Amplify.configure(AwsExports);

import { GetUserInfo } from 'services/amplify/AmplifyControl';

const clientSideEmotionCache = createEmotionCache();

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  const Router = useRouter();
  /** セッション確認フラグ */
  const [IsSessionConfirmation, setIsSessionConfirmation] = React.useState<boolean>(false);
  React.useEffect(() => {
    GetUserInfo()
      .then(data => {
        // セッション情報有りでPath:indexの場合は、todo-listに遷移させる
        Router.pathname === '/' ?
          Router.push({ pathname: '/todo-list' }) :
          setIsSessionConfirmation(true);
      })
      .catch(err => {
        // セッション情報無しでPath:index以外の場合は、indexに遷移させる
        Router.pathname !== '/' ?
          Router.push({ pathname: '/' }) :
          setIsSessionConfirmation(true);
      })
  }, [Router.pathname])

  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <title>{APP_NAME}</title>
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {
          IsSessionConfirmation && (
            <Component {...pageProps} />
          )
        }
      </ThemeProvider>
    </CacheProvider>
  );
}
