import type { NextPage } from "next";
import Head from "next/head";
// import Image from "next/image";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>WCBI Simple Webapp</title>
        <meta
          name="description"
          content="A webapp that pulls data from wcbi.com that aims to be super fast."
        />
        <link rel="icon" href="/icon.png" />
      </Head>
      <header></header>
      <main></main>
      <footer></footer>
    </div>
  );
};

export default Home;
