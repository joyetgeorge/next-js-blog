import { GraphQLClient, gql } from "graphql-request";
import { Router } from "next/router";
import NProgress from "nprogress"
import { Head } from "next/document";

import BlogCard from "./components/blogCard";

const graphcms = new GraphQLClient(

);

const QUERY = gql`
  {
    posts {
      tItle
      slug
      content {
        html
      }
      featuredImage {
        url
      }
      createdBy {
        name
        picture
      }
      publishedOn
    }
  }
`;

export async function getStaticProps() {
  const { posts } = await graphcms.request(QUERY);
  return {
    props: {
      posts,
    },
    revalidate: 10,
  };
}

const Blog = (posts: any) => {
  Router.events.on("routeChangeStart", () => {
    NProgress.start();
  });

  Router.events.on("routeChangeComplete", () => {
    NProgress.done()
  });

  return (
    <div className="items-center">
      <div className="mx-96 my-20">
        <div>
          <img
            className="w-4 h-4 relative top-7 left-3"
            src="https://cdn-icons-png.flaticon.com/512/482/482631.png"
            alt=""
          />
          <input
            className="w-full h-10 bg-[#D8DEE9] border border-[#aaadc2] focus:outline-none pl-10 focus:border-[#2E3440]"
            autoFocus
          />
        </div>
        {posts.posts.map((post: any) => (
          <div className="inline-block">
            {/* <div dangerouslySetInnerHTML={{__html: post.content.html}}></div> */}
            <BlogCard
              slug={post.slug}
              title={post.tItle}
              img_url={post.featuredImage}
              author_name={post.createdBy.name}
              author_img={post.createdBy.picture}
              publish_date={post.publishedOn}
            ></BlogCard>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Blog;
