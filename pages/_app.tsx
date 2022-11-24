import "../styles/globals.css";
import type { AppProps } from "next/app";
import { NhostNextProvider } from "@nhost/nextjs";
import { nhost } from "../utils/nhost";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <NhostNextProvider nhost={nhost}>
      <div className='max-w-xl mx-auto'>
        <Component {...pageProps} />
      </div>
    </NhostNextProvider>
  );
}
