import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>
          Advanced Next.js, React, Node.js & API Development Tips | Alberto
          Muñoz
        </title>
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Explore cutting-edge tips and best practices for Next.js, React, Node.js, and API development. Level up your web projects with expert insights."
        />
        <meta
          name="keywords"
          content="Next.js tips, React advanced, Node.js best practices, API development, web development, full-stack, JavaScript"
        />
        <meta
          property="og:title"
          content="Advanced Next.js, React, Node.js & API Development Tips"
        />
        <meta
          property="og:description"
          content="Explore cutting-edge tips and best practices for Next.js, React, Node.js, and API development. Level up your web projects with expert insights."
        />
        <meta
          property="og:image"
          content="https://codex.ultharcr.com/images/og-image.jpg"
        />
        <meta property="og:url" content="https://codex.ultharcr.com" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Advanced Next.js, React, Node.js & API Development Tips"
        />
        <meta
          name="twitter:description"
          content="Expert insights and best practices to elevate your full-stack web development skills."
        />
        <meta
          name="twitter:image"
          content="https://codex.ultharcr.com/images/twitter-image.jpg"
        />
        <link rel="canonical" href="https://codex.ultharcr.com" />
        <meta name="robots" content="index, follow" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Alberto Muñoz",
              url: "https://codex.ultharcr.com",
              sameAs: [
                "https://github.com/betexcr",
                "https://www.linkedin.com/in/betomm",
              ],
              jobTitle: "Full-Stack Developer",
              knowsAbout: [
                "Next.js",
                "React",
                "Node.js",
                "API Development",
                "JavaScript",
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              url: "https://yourdomain.com",
              name: "Advanced Next.js, React, Node.js & API Development Tips",
              description:
                "A collection of expert tips, tutorials, and best practices for modern full-stack web development.",
            }),
          }}
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
