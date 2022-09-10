import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { Button } from "@cred/neopop-web/lib/components";

const Home: NextPage = () => {
  return (
    <div className="container ">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Link href="/blog">
        <Button
          variant="primary"
          kind="elevated"
          size="big"
          colorMode="dark"
        >
          Primary
        </Button>
      </Link>
    </div>
  );
};

export default Home;
