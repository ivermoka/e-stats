import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="bg-bgLight dark:bg-bg text-textLight dark:text-text">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
