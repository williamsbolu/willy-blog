import Image from "next/image";
import { fullBlog } from "@/lib/interface";
import { client, urlFor } from "@/lib/sanity";
import { PortableText } from "@portabletext/react";

export const revalidate = 30;

async function getData(slug: string) {
  const query = `
        *[_type == "blog" && slug.current == '${slug}'] {
        "currentSlug": slug.current,
        title,
        content,
        titleImage
        }[0]`;

  const data = await client.fetch(query);

  return data;
}

export default async function BlogArticle({
  params,
}: {
  params: { slug: string };
}) {
  const data: fullBlog = await getData(params.slug);

  return (
    <div className="mt-6 mb-8">
      <h1>
        <span className="block text-base text-center text-primary font-semibold tracking-wide uppercase">
          Willy - Blog
        </span>
        <span className="mt-2 block text-3xl text-center leading-8 font-bold tracking-tight sm:text-4xl">
          {data.title}
        </span>
      </h1>

      <Image
        src={urlFor(data.titleImage).url()}
        width={800}
        height={800}
        alt="title"
        priority
        className="rounded-lg mt-8 border"
      />

      <div className="mt-16 prose prose-blue prose-xl dark:prose-invert prose-headings:font-bold">
        <PortableText value={data.content} />
      </div>
    </div>
  );
}

// 1hr 19 mins incase you want to learn how to style or edit the text editor with tailwind typography
