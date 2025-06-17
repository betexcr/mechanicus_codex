import Link from "next/link";
import { motion } from "framer-motion";
import codexDetails from "../data/codexDetails";
import Head from "next/head";

export async function getStaticProps() {
  const optimizations = Object.entries(codexDetails).map(([slug, data]) => ({
    slug,
    title: data.title,
    summary: data.summary,
  }));

  return {
    props: { optimizations },
  };
}

export default function Codex({ optimizations }) {
  return (
    <>
      <Head>
        <title>
          Advanced Next.js, React, Node.js & API Development Tips | Alberto Muñoz
        </title>
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
          content="https://codex.ultharcr.com/og-image.png"
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
          content="https://codex.ultharcr.com/twitter-image.png"
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
      <div className="min-h-screen bg-black text-red-200 p-8 font-mono">
        <h1 className="text-4xl font-bold text-center mb-12 text-red-500 drop-shadow-xl">
          ⚙️ React & Next.js Optimization Codex ⚙️
        </h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {optimizations.map(({ title, summary, slug }) => {
            const slugStr = Array.isArray(slug) ? slug[0] : slug ?? "";
            return (
              <motion.div
                key={slugStr}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="bg-gray-900 border border-red-800 p-6 rounded-2xl shadow-lg hover:shadow-red-600/40 transition-all cursor-pointer"
              >
                <Link href={`/codex/${slugStr}`} className="block">
                  <h2 className="text-xl font-semibold text-red-400 mb-2 underline underline-offset-4">
                    {title}
                  </h2>
                  <p className="text-sm text-gray-300">{summary}</p>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </>
  );
}
