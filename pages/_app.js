import Head from 'next/head';
import GlobalStyle from '../src/theme/GlobalStyle';

export default function MyApp({ Component, pageProps }) {
    return(
        <>
            <Head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;700;800&display=swap" rel="stylesheet" />
            </Head>
            <GlobalStyle />
            <Component {...pageProps} />
        </>
    ) 
}
