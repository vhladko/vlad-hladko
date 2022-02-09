import type { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Vlad Hladko</title>
        <meta
          name="description"
          content="Personal web site/blog software developer"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Hey, I&apos;m Vlad!</h1>
        <h2>Software Developer, Game Developer, just a nice guy.</h2>
      </main>

      <footer></footer>
    </div>
  );
};

export default Home;
