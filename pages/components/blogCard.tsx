import { Button, ElevatedCard } from "@cred/neopop-web/lib/components";
import moment from "moment";
import Link from "next/link";
import { FiCalendar } from "react-icons/fi";

const BlogCard = ({
  title,
  img_url,
  slug,
  author_name,
  author_img,
  publish_date,
}: {
  title: any;
  img_url: any;
  slug: any;
  author_name: any;
  author_img: any;
  publish_date: any;
}) => {
  publish_date = moment(publish_date).fromNow();
  return (
    <Link href={"/posts/" + slug}>
      <div className="mt-20 cursor-pointer">
        <ElevatedCard
          backgroundColor="#D8DEE9"
          edgeColors={{
            bottom: "#2E3440",
            right: "#3e4656",
          }}
        >
          <div className="">
            <img
              className="object-fill border-b border-[#3e4656]  h-48 w-full"
              src={img_url.url}
              alt="unable to load"
            />
          </div>
          <h1 className="text-2xl mt-5 text-[#2E3440] font-semibold px-5">
            {title}
          </h1>
          <p className="text-[#2E3440] p-5">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis
            ipsa facere, suscipit facilis enim repudiandae saepe perferendis id!
            Accusamus beatae similique nam officia ea, soluta aliquid
            necessitatibus magni sed minima!
          </p>

          <div className="pl-5 pb-5">
            <img
              className="rounded-full inline border border-[#3e4656] w-10 h-10"
              src={author_img}
              alt=""
            />
            <p className="inline ml-4 text-[12px] uppercase font-bold">
              {author_name}
            </p>
            <div className="float-right mt-[5px] mr-5">
              <FiCalendar className="inline mr-[8px]" />
              <p className="inline text-[12px] font-bold">
                {publish_date}
              </p>
            </div>
          </div>
        </ElevatedCard>
      </div>
    </Link>
  );
};

export default BlogCard;
