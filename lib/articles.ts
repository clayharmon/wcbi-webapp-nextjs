interface Rendered {
  rendered: string;
  protected?: boolean;
}

export interface Article {
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

const WCBI_API_ENDPOINT = "https://www.wcbi.com/wp-json/wp/v2";
export const getLatestArticles = async (): Promise<Article[]> => {
  const url = `${WCBI_API_ENDPOINT}/posts`;
  return (await fetch(url)).json();
};
