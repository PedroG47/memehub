import Head from 'next/head';
import GlobalStyle from '../src/theme/GlobalStyle';
import { useEffect, useState } from 'react';
import checkSession from '../src/services/auth/checkSession';


export default function MyApp({ Component, pageProps }) {
    const [session, setSession] = useState(false)

    useEffect(() =>{
        const hasSession = checkSession();
        setSession(hasSession)
    })
    return session &&(
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
