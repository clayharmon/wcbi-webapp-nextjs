interface Rendered {
  rendered: string;
  protected?: boolean;
}

export interface WpPost {
  author: number;
  categories: number[];
  comment_status: string;
  content: Rendered;
  date: string;
  date_gmt: string;
  excerpt: Rendered;
  format: string;
  gtx_gallery?: object;
  guid: Rendered;
  id: number;
  link: string;
  meta: any; // change from any
  modified: string;
  modified_gmt: string;
  ping_status: string;
  rayos_authors?: number[];
  rayos_subtitle: string;
  rayos_teaser: any; // change from any
  slug: string;
  status: string;
  sticky: boolean;
  tags: number[];
  template: string;
  title: Rendered;
  type: string;
  yoast_head?: string;
  _links: any; // change from any
}
export interface Article extends WpPost {
  base64Image: string;
}

export interface ArticlePageParams {
  params: {
    slug: string;
  };
}

const env = process.env.NODE_ENV;
const WCBI_API_ENDPOINT = "https://www.wcbi.com/wp-json/wp/v2";
const CLOUDINARY_PLACEHOLDER_URL =
  env === "development"
    ? ""
    : "https://res.cloudinary.com/rwrwdf/image/fetch/w_200/e_blur:1000,q_1,f_auto/";

const fetchBase64 = async (url: string): Promise<string> => {
  const res = await fetch(url);
  const body = await res.arrayBuffer();
  const base64Url = Buffer.from(body).toString("base64");
  return `data:img/jpeg;base64,${base64Url}`;
};

export const getLatestArticles = async (): Promise<Article[]> => {
  const url = `${WCBI_API_ENDPOINT}/posts`;
  const posts: WpPost[] = await (await fetch(url)).json();
  const newArticle: Promise<Article[]> = Promise.all(
    posts.map(async (post) => {
      let small = `${CLOUDINARY_PLACEHOLDER_URL}${post.rayos_teaser.source_url}`;
      return { ...post, base64Image: await fetchBase64(small) };
    })
  );
  return newArticle;
};

export const getArticleIds = async (): Promise<ArticlePageParams[]> => {
  const url = `${WCBI_API_ENDPOINT}/posts`;
  const posts: WpPost[] = await (await fetch(url)).json();
  const slugs: Promise<ArticlePageParams[]> = Promise.all(
    posts.map(async (post) => {
      return { params: { slug: post.slug } };
    })
  );
  return slugs;
};

export const getArticleBySlug = async (slug: string): Promise<Article> => {
  const url = `${WCBI_API_ENDPOINT}/posts?slug=${slug}`;
  const posts: WpPost[] = await (await fetch(url)).json();
  const post = posts[0];
  let small = `${CLOUDINARY_PLACEHOLDER_URL}${post.rayos_teaser.source_url}`;
  return { ...post, base64Image: await fetchBase64(small) };
};
