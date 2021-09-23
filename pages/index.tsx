import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { Article, getLatestArticles } from "../lib/articles";
// import Image from "next/image";

export const getStaticProps: GetStaticProps = async () => {
  const allArticleData = await getLatestArticles();
  return {
    props: {
      allArticleData,
    },
  };
};
interface Props {
  allArticleData: Article[];
}

const Home: NextPage<Props> = ({ allArticleData }) => {
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
