import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import ArticleSummaryItem from "../components/articleSummaryItem";
import { Article, getLatestArticles } from "../lib/articles";

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
      <main>
        {allArticleData.map((item) => (
          <ArticleSummaryItem key={item.id} {...item} />
        ))}
      </main>
      <footer></footer>
    </div>
  );
};

export default Home;
