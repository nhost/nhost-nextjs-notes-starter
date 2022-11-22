import '../styles/globals.css';
import { NhostClient, NhostNextProvider } from '@nhost/nextjs';

const nhost = new NhostClient({
  backendUrl: 'https://90d0-98-128-191-120.ngrok.io',
});

function MyApp({ Component, pageProps }) {
  return (
    <NhostNextProvider nhost={nhost}>
      <Component {...pageProps} />
    </NhostNextProvider>
  );
}

export default MyApp;
