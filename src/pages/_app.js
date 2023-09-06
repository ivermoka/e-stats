import "@/styles/globals.css";
import Layout from "./../layouts/defaultLayout";

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
