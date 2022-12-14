import '../styles/globals.scss'
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
  return ( 
  <>
    <Head>
      <title>Blue Flamingos Pokédex Assessment</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
    </Head>
    <Component {...pageProps} />
  </>
  )
}

export default MyApp
