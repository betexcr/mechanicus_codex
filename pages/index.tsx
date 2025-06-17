import Link from "next/link";
import { motion } from "framer-motion";
import codexDetails from "../data/codexDetails";

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
  );
}
