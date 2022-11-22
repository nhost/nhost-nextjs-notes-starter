import { useState } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useNhostClient } from '@nhost/nextjs';
import fetch from 'cross-fetch';

export default function Home() {
  const [file, setFile] = useState(null);

  const nhost = useNhostClient();

  const customUpload = async (params) => {
    try {
      const formData = new FormData();
      const { file } = params;

      formData.append('file', file);

      // you can specify a custom URL to storage here if needed
      const res = await fetch(nhost.storage.api.url + '/files', {
        body: formData,
        method: 'POST',
        headers: {
          ...nhost.storage.api.generateUploadHeaders(params),
          ...nhost.storage.api.generateAuthHeaders(),
          Authorization: 'bla',
          'x-hasura-custom-value': 'ok123',
        },
      });
      const data = await res.json();

      return { fileMetadata: data, error: null };
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    console.log('UPLOAD!');

    console.log({ file });

    const res = await customUpload({ file });
    console.log({ res });
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          asdasd File upload test for <a href="https://nhost.io">Nhost!</a>
        </h1>

        <div>
          <form onSubmit={handleUpload}>
            <input
              type="file"
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  console.log('set file!');
                  setFile(e.target.files[0]);
                }
              }}
            />
            <button type="submit">Upload</button>
          </form>
        </div>
      </main>
    </div>
  );
}
