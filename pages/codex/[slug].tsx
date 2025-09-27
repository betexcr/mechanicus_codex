import { motion } from "framer-motion";
import codexDetails from "../../data/codexDetails";
import { useRouter } from "next/router";
import { Share_Tech_Mono } from "next/font/google";
import Link from "next/link";

const shareTech = Share_Tech_Mono({ subsets: ["latin"], weight: "400" });

export default function CodexDetail() {
  const router = useRouter();
  const { slug } = router.query;
  const slugStr = Array.isArray(slug) ? slug[0] : slug ?? "";

  if (!slugStr)
    return <p className="text-white p-10">Loading sacred scroll...</p>;

  const data = codexDetails[slugStr];

  if (!data) return <p className="text-white p-10">Scroll not found...</p>;

  return (
    <div className="bg-black min-h-screen text-red-200">
      <main className={`p-8 ${shareTech.className} overflow-auto`}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-4xl mx-auto border border-red-700 p-8 rounded-2xl bg-gray-950 shadow-lg"
        >
          <h1 className="text-3xl text-red-400 mb-4 font-bold">{data.title}</h1>
          <p className="text-sm mb-4 text-gray-300 italic">{data.summary}</p>

          <section className="mb-6">
            <h2 className="text-xl text-red-500 underline underline-offset-4 mb-2">
              🧠 Why Use It
            </h2>
            <p className="whitespace-pre-line text-gray-300">{data.why}</p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl text-red-500 underline underline-offset-4 mb-2">
              ✅ Good / Bad Example
            </h2>
            <pre className="bg-gray-800 p-4 rounded text-sm overflow-x-auto text-green-200 whitespace-pre-wrap">
              {data.example}
            </pre>
          </section>

          <section>
            <h2 className="text-xl text-red-500 underline underline-offset-4 mb-2">
              ⚠️ When Not to Use
            </h2>
            <p className="whitespace-pre-line text-gray-300">{data.whenNot}</p>
          </section>
          {data.benediction && (
            <section className="mt-8 border-t border-red-800 pt-6">
              <h2 className="text-xl text-red-500 mb-2">
                📜 Benediction of Optimization
              </h2>
              <p className="text-gray-300 italic">{data.benediction}</p>
            </section>
          )}
          <div className="mt-10 text-center">
            <Link href="/">
              <span className="text-red-300 hover:text-white underline cursor-pointer">
                ⬅ Return to Codex
              </span>
            </Link>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
