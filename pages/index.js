import Head from "next/head";
import Header from "../components/Header";
import PostBox from "../components/PostBox";

export default function Home() {
  return (
    <div className="max-w-[1200px] mx-auto">
      <Head>
        <title>RedditClone</title>
      </Head>
      <PostBox />
    </div>
  );
}
