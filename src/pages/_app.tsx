import Head from "next/head";
import { AppProps } from "next/app";
import "../styles/globals.css";
import "@/assets/fonts/fonts.css";
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>NASA Calendar App</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0"
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
