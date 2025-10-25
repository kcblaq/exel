import React from 'react';
import { BlogBreadCrumb } from '../components/BlogBreadCrumb';
import { Title } from '@/app/about/components/Utils.about';
import Image from 'next/image';
import { getPostBySlug } from '@/services/getPost';
import moment from "moment";
import { MarkdownRenderer } from '../components/MarkdownRenderer';
import { extractHeadings } from '../utils/extractHeadings';
import MyNavigator from '../utils/Navigator';


export default async function BlogPostPage({ params }: any) {
    const post = await getPostBySlug(params?.slug);
    const headings = await extractHeadings(post?.content || "");

    return (
        <div className="px-4 md:px-8 xl:px-14 2xl:px-20 my-4 md:my-20 py-4 grid gap-4 lg:gap-6">
            <BlogBreadCrumb service={post?.category} postTitle={post?.title} />
            <Title title={post?.title} className="text-start" />
            <p>
                <span className="font-bold">Written by:</span> Exel team |{" "}
                <span className="font-bold">Date:</span>{" "}
                {moment(post?.publishedDate).format("Do MMM, YY")}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {/* SIDEBAR */}
                {/* <div className="col-span-1 rounded-lg p-2 sticky top-20 h-fit">
          <h5 className="uppercase text-primary font-bold mb-4">
            Jump to section
          </h5>
          <ul className="list-disc list-inside space-y-2 text-sm">
            {headings.map((h, index) => (
              <li key={index} className={`ml-${(h.depth - 1) * 2}`}>
                <a href={`#${h.id}`} className="text-blue-600 hover:underline">
                  {h.text}
                </a>
              </li>
            ))}
          </ul>
        </div> */}
                <MyNavigator headings={headings} />
                    

                {/* MAIN CONTENT */}
                <div className="col-span-1 md:col-span-2 lg:col-span-3 grid gap-4 lg:gap-6">
                    <div className="w-full grid gap-3">
                        <Image
                            src={post?.coverImage?.url}
                            alt={post?.coverImage?.alt}
                            width={400}
                            height={100}
                            className="rounded-lg w-full"
                        />
                        <MarkdownRenderer content={post?.content} />
                    </div>
                </div>
            </div>
        </div>
    );
}
