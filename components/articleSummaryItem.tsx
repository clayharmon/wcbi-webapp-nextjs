import Image from "next/image";
import type { Article } from "../lib/articles";

const ArticleSummaryItem = ({
  title,
  meta,
  excerpt,
  modified,
  author,
  rayos_teaser,
  base64Image,
}: Article) => {
  return (
    <article>
      <Image
        src={rayos_teaser.source_url}
        alt={title.rendered}
        width={rayos_teaser.width}
        height={rayos_teaser.height}
        layout="responsive"
        placeholder="blur"
        blurDataURL={base64Image}
      />
      <h2>{title.rendered}</h2>
      <time>{modified}</time>
      <span>{author}</span>
      <div dangerouslySetInnerHTML={{ __html: excerpt.rendered }}></div>
    </article>
  );
};

export default ArticleSummaryItem;
