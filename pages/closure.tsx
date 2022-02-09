import type { NextPage } from "next";
import Layout from "../components/Layout";
import markdownToHtml from "../lib/markdown";
import { getDocBySlug } from "../lib/posts";

interface Props {
  content: string;
}

const Closure: NextPage<Props> = (props) => {
  return (
    <Layout>
      <div dangerouslySetInnerHTML={{ __html: props.content }}></div>
    </Layout>
  );
};

export async function getStaticProps() {
  const doc = getDocBySlug("closure");
  const content = await markdownToHtml(doc.content || "");

  return {
    props: {
      ...doc,
      content,
    },
  };
}

export default Closure;
