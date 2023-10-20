import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { AppLayout } from "../../components/AppLayout";
import { useState } from "react";

export default function NewPost(props) {
  const [postContent, setPostContent] = useState("");

  const handleClick = async () => {
    const response = await fetch(`/api/generatePost`, {
      method: "POST",
    });

    const json = await response.json();
    console.log("RESULT: ", json);
    setPostContent(json.post.postContent);
  };
  return (
    <div>
      <h1>Hello New Post Page!</h1>
      <button className="btn" onClick={handleClick}>
        Generate Post
      </button>
      <div dangerouslySetInnerHTML={{ __html: postContent }}></div>
    </div>
  );
}

NewPost.getLayout = function getLayout(page, pageProps) {
  return <AppLayout {...pageProps}>{page}</AppLayout>;
};

export const getServerSideProps = withPageAuthRequired(() => {
  return {
    props: {},
  };
});
