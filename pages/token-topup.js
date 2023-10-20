import { AppLayout } from "../components/AppLayout";
export default function TokenTopup() {
  return (
    <div>
      <h1>Hello Token Topup Page!</h1>
    </div>
  );
}

TokenTopup.getLayout = function getLayout(page, pageProps) {
  return <AppLayout {...pageProps}>{page}</AppLayout>;
};
