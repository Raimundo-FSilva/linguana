import '../styles/globals.css'
import '../styles/animations.css'
import 'react-toastify/dist/ReactToastify.css';

import type { AppProps } from 'next/app'
import Head from "next/head";

import {AccountsContextProvider} from "../context/AccountContext"


import {ToastContainer} from "react-toastify";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Linguana - Inglês interdisciplinar</title>
        <link rel="icon" type="image/x-icon" href="/assets/logo.png"/>
      </Head>
      <ToastContainer
        position={"top-center"}
        theme={"colored"}
        hideProgressBar={true}/>

        <AccountsContextProvider>
          <Component {...pageProps} />
        </AccountsContextProvider>
    </>
  )
}
