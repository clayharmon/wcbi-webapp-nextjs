import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import type { ParsedUrlQuery } from "querystring";
import Head from "next/head";

import { Article, getArticleBySlug, getArticleIds } from "../../lib/articles";

interface IParams extends ParsedUrlQuery {
  slug: string;
}
interface Props {
  articleData: Article;
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params as IParams;
  const articleData = await getArticleBySlug(slug);
  return {
    props: {
      articleData,
    },
  };
};
export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getArticleIds();
  return {
    paths,
    fallback: false,
  };
};

const ArticlePage: NextPage<Props> = ({ articleData }) => {
  const content = articleData.content.rendered;
  const imageIdRegex = /class="wp-image-(?<id>.*?) /gm;
  const foundAll = content.matchAll(imageIdRegex);
  const ids = [];
  for (const found of foundAll) {
    if (found.groups) {
      ids.push(found.groups.id);
    }
  }

  console.log(ids);
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

export default ArticlePage;
