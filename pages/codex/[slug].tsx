import { Inter, Share_Tech_Mono } from "next/font/google";
import { useRouter } from "next/router";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import codexDetails from "@/data/codexDetails";

const shareTech = Share_Tech_Mono({ subsets: ["latin"], weight: "400" });

export default function CodexDetail() {
  const router = useRouter();
  const { slug } = router.query;
  const data = slug && codexDetails[slug as string];

  const slugStr = Array.isArray(slug) ? slug[0] : slug ?? "";
  if (!data) {
    return (
      <p className="text-white p-10 font-mono">
        Sacred scroll not found. Please return to the Codex.
      </p>
    );
  }
  const handleTransitionBack = (e) => {
    e.preventDefault();
    if ("startViewTransition" in document) {
      // @ts-ignore
      document.startViewTransition(() => {
        router.push("/");
      });
    } else {
      router.push("/");
    }
  };

  if (!data)
    return (
      <p className="text-white p-10 font-mono">Loading sacred scroll...</p>
    );

  return (
    <main
      data-view-transition="true"
      className={`min-h-screen bg-black text-red-200 p-8 ${shareTech.className}`}
      style={{ perspective: "1500px" }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={slugStr}
          initial={{ opacity: 0, scale: 0.92, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: -30 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          className="max-w-4xl mx-auto border border-red-700 p-8 rounded-2xl bg-gray-950 shadow-lg"
        >
          <h1 className="text-3xl text-red-400 mb-4 font-bold">{data.title}</h1>
          <p className="text-sm mb-4 text-gray-300 italic">{data.summary}</p>

          <section className="mb-6">
            <h2 className="text-xl text-red-500 underline underline-offset-4 mb-2">
              🧠 Why Use It
            </h2>
            <p className="text-gray-300 whitespace-pre-line">{data.why}</p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl text-red-500 underline underline-offset-4 mb-2">
              ✅ Good / Bad Example
            </h2>
            <pre className="bg-gray-800 p-4 rounded text-sm overflow-x-auto text-green-200">
              {data.example}
            </pre>
          </section>

          <section>
            <h2 className="text-xl text-red-500 underline underline-offset-4 mb-2">
              ⚠️ When Not to Use
            </h2>
            <p className="text-gray-300 whitespace-pre-line">{data.whenNot}</p>
          </section>

          <div className="mt-10 text-center">
            <a
              href="/"
              onClick={handleTransitionBack}
              className="text-red-300 hover:text-white underline cursor-pointer"
              aria-label="Return to Codex"
            >
              ⬅ Return to Codex
            </a>
          </div>
        </motion.div>
      </AnimatePresence>
    </main>
  );
}
