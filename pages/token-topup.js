import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { AppLayout } from "../components/AppLayout";
import { getAppProps } from "../utils/getAppProps";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoins } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
export default function TokenTopup() {
  const handleClick = async () => {
    const result = await fetch(`/api/addTokens`, {
      method: "POST",
    });

    const json = await result.json();
    console.log("RESULT:", json);
    window.location.href = json.session.url;
  };
  return (
    <div className="flex flex-col justify-center items-center m-auto h-full w-full">
      <h1>Top up your tokens</h1>
      <div className="border border-slate-200 p-5 bg-green-200 rounded-md flex flex-col items-center">
        <FontAwesomeIcon
          icon={faCoins}
          className="text-6xl mb-3 text-yellow-500"
        />
        <div className="text-lg font-bold">$9 SGD</div>
        <button className="btn" onClick={handleClick}>
          Add 10 tokens
        </button>
      </div>
      <small className="mt-5 text-center">
        For purposes of portolio only. Payment page will NOT charge you and you
        can use dummy values instead of actual ones.
      </small>
      <small>Use any valid card number, and any name/CVC</small>
      <small>Eg. Card No. 4242 4242 4242 4242, name: test, CVC: 111 </small>
      <Image
        src="/images/ExampleCCData.png"
        alt="Dummy credit card information"
        width={300}
        height={300}
      />
    </div>
  );
}

TokenTopup.getLayout = function getLayout(page, pageProps) {
  return <AppLayout {...pageProps}>{page}</AppLayout>;
};

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(ctx) {
    const props = await getAppProps(ctx);
    return {
      props,
    };
  },
});
