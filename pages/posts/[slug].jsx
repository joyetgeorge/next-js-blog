import { GraphQLClient, gql } from "graphql-request";
import Prism from "prismjs";
import { useEffect } from "react";
import { FiCalendar, FiClock, FiHome, FiMoon } from "react-icons/fi";
import moment from "moment";

require("prismjs/components/prism-javascript");

require("prismjs/components/prism-css");

require("prismjs/components/prism-jsx");

const graphcms = new GraphQLClient(

);

const QUERY = gql`
  query Post($slug: String!) {
    post(where: { slug: $slug }) {
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
      categories {
        name
      }
      publishedOn
    }
  }
`;

const SLUGLIST = gql`
  {
    posts {
      slug
    }
  }
`;

export async function getStaticPaths() {
  const slugList = await graphcms.request(SLUGLIST);
  return {
    paths: slugList.posts.map((post) => ({ params: { slug: post.slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const slug = params.slug;
  const data = await graphcms.request(QUERY, { slug });
  const post = data.post;
  return {
    props: {
      post,
    },
    revalidate: 10,
  };
}

export default function BlogPost({ post }) {
  var publish_date = moment(post.publishedOn).fromNow();
  useEffect(() => {
    Prism.highlightAll();
  }, []);
  return (
    <div className="mx-96">
      <img
        className="object-fill mt-5 border border-[#3e4656]  h-48 w-full"
        src={post.featuredImage.url}
        alt="unable to load"
      />
      <div className="my-5 text-sm pb-3">
        {post.categories.map((categorie) => (
          <p className="inline bg-[#2E3440] text-white uppercase text-[12px] p-1 mr-2"># {categorie.name}</p>
        ))}
        <p className="inline uppercase font-bold float-right">{publish_date}</p>
        <FiClock className="mr-3 -mt-[2px] float-right w-6 h-6 inline" />
      </div>
      <h1>{post.tItle}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.content.html }}></div>
    </div>
  );
} 
