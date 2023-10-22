import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { AppLayout } from "../components/AppLayout";
import { getAppProps } from "../utils/getAppProps";
export default function Success() {
  return (
    <div className="m-auto text-center">
      <h1>Thank you for your purchase! 😊</h1>
      <small>
        Note: Even if you used your real card, no charge will be incurred!
      </small>
    </div>
  );
}

Success.getLayout = function getLayout(page, pageProps) {
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
