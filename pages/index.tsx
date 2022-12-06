import Head from "next/head";
import { SignedIn, SignedOut } from "@nhost/nextjs";
import { Notes } from "../components/Notes";
import { SignIn } from "../components/SignIn";
import { nhost } from "../utils/nhost";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Notes App with Nhost</title>
        <meta name='description' content='Notes app with Nhost' />
        <link rel='icon' href='/favicon.png' />
      </Head>

      <main>
        <SignedIn>
          <div className='flex justify-between py-2 border-b border-gray-300 mb-4 items-baseline'>
            <div className='font-semibold text-lg'>Notes App</div>
            <div>
              <button
                className='inline-flex items-center rounded-md border border-transparent bg-blue-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                onClick={() => nhost.auth.signOut()}
              >
                Sign Out
              </button>
            </div>
          </div>
          <Notes />
        </SignedIn>
        <SignedOut>
          <SignIn />
        </SignedOut>
      </main>
    </div>
  );
}
