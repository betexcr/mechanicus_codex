import Link from "next/link";
import { motion } from "framer-motion";
import codexDetails from "../data/codexDetails";
import { ChevronRight, BookOpen, Zap, Code, Database, Globe, Cpu } from "lucide-react";

// Technology categories for the main page
const technologyCategories = {
  'React': {
    icon: <Zap className="w-8 h-8" />,
    color: 'text-blue-400',
    bgColor: 'bg-blue-900/20',
    borderColor: 'border-blue-800',
    description: 'Component optimization, hooks, and performance techniques'
  },
  'Next.js': {
    icon: <Globe className="w-8 h-8" />,
    color: 'text-gray-400',
    bgColor: 'bg-gray-900/20',
    borderColor: 'border-gray-800',
    description: 'SSR, SSG, streaming, and framework optimizations'
  },
  'Performance': {
    icon: <Cpu className="w-8 h-8" />,
    color: 'text-green-400',
    bgColor: 'bg-green-900/20',
    borderColor: 'border-green-800',
    description: 'Bundle analysis, caching, and optimization strategies'
  },
  'Node.js': {
    icon: <Database className="w-8 h-8" />,
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-900/20',
    borderColor: 'border-yellow-800',
    description: 'Server optimization, APIs, and backend performance'
  },
  'TypeScript': {
    icon: <Code className="w-8 h-8" />,
    color: 'text-purple-400',
    bgColor: 'bg-purple-900/20',
    borderColor: 'border-purple-800',
    description: 'Type safety, advanced patterns, and developer experience'
  },
  'Python': {
    icon: <Code className="w-8 h-8" />,
    color: 'text-orange-400',
    bgColor: 'bg-orange-900/20',
    borderColor: 'border-orange-800',
    description: 'Async programming, memory optimization, and performance'
  },
  'Web Development Basics': {
    icon: <BookOpen className="w-8 h-8" />,
    color: 'text-cyan-400',
    bgColor: 'bg-cyan-900/20',
    borderColor: 'border-cyan-800',
    description: 'Complete learning path from beginner to senior developer'
  }
};

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
  // Group optimizations by category
  const groupedOptimizations = {};
  Object.entries(codexDetails).forEach(([slug, data]) => {
    // Find which category this belongs to
    for (const [category, slugs] of Object.entries({
      'React': ['react-memo', 'usememo-usecallback', 'lazy-loading', 'virtualization', 'lazy-hydration', 'error-boundaries', 'react-concurrent-features', 'react-server-components'],
      'Next.js': ['code-splitting', 'image-optimization', 'ssr-caching', 'static-generation', 'prefetching', 'static-assets-caching', 'nextjs-streaming', 'nextjs-partial-prerendering'],
      'Performance': ['throttling-debouncing', 'use-swr', 'bundle-analyzer'],
      'Node.js': ['api-pagination', 'api-rate-limiting', 'node-event-loop', 'js-memory-leaks', 'serverless-architecture', 'nodejs-worker-threads', 'nodejs-cluster-optimization'],
      'TypeScript': ['typescript-strictness', 'typescript-satisfies-operator', 'typescript-template-literal-types'],
      'Python': ['python-async-optimization', 'python-memory-optimization', 'python-efficient-data-structures', 'python-profiling-performance', 'python-numpy-optimization', 'python-multiprocessing-threading', 'python-generators-lazy-evaluation'],
      'Web Development Basics': ['web-fundamentals-html', 'web-fundamentals-css', 'web-fundamentals-javascript', 'web-development-tools', 'web-development-frameworks', 'web-development-backend', 'web-development-practice']
    })) {
      if (slugs.includes(slug)) {
        if (!groupedOptimizations[category]) {
          groupedOptimizations[category] = [];
        }
        groupedOptimizations[category].push({ slug, ...data });
        break;
      }
    }
  });

  return (
    <>
      <div className="min-h-screen bg-black text-red-200 p-8 font-mono">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-red-500 drop-shadow-xl">
            ⚙️ Mechanicus Codex ⚙️
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto">
            The Sacred Repository of Advanced Web Development Knowledge
          </p>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            From React optimizations to Python performance, from web fundamentals to senior-level techniques. 
            All blessed by the Omnissiah's digital wisdom.
          </p>
        </motion.div>

        {/* Technology Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center mb-12 text-red-400">
            Sacred Technology Categories
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Object.entries(technologyCategories).map(([category, config]) => (
              <motion.div
                key={category}
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ duration: 0.2 }}
                className={`${config.bgColor} ${config.borderColor} border-2 rounded-2xl p-6 hover:shadow-lg transition-all cursor-pointer group`}
              >
                <div className={`${config.color} mb-4 group-hover:scale-110 transition-transform`}>
                  {config.icon}
                </div>
                <h3 className="text-xl font-semibold text-red-400 mb-2">
                  {category}
                </h3>
                <p className="text-sm text-gray-300 mb-4">
                  {config.description}
                </p>
                <div className="flex items-center text-xs text-gray-400">
                  <span>{groupedOptimizations[category]?.length || 0} entries</span>
                  <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Featured Optimizations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center mb-12 text-red-400">
            Sacred Optimization Techniques
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {optimizations.slice(0, 9).map(({ title, summary, slug }) => {
              const slugStr = Array.isArray(slug) ? slug[0] : slug ?? "";
              return (
                <motion.div
                  key={slugStr}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  className="bg-gray-900 border border-red-800 p-6 rounded-2xl shadow-lg hover:shadow-red-600/40 transition-all cursor-pointer group"
                >
                  <Link href={`/codex/${slugStr}`} className="block">
                    <h3 className="text-lg font-semibold text-red-400 mb-2 underline underline-offset-4 group-hover:text-red-300 transition-colors">
                      {title}
                    </h3>
                    <p className="text-sm text-gray-300 line-clamp-3">{summary}</p>
                    <div className="flex items-center mt-3 text-xs text-gray-400">
                      <span>Read more</span>
                      <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-gray-900/50 border border-red-800 rounded-2xl p-8 mb-16"
        >
          <h2 className="text-2xl font-bold text-center mb-8 text-red-400">
            Sacred Knowledge Statistics
          </h2>
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-red-500 mb-2">
                {optimizations.length}
              </div>
              <div className="text-gray-300">Total Entries</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-red-500 mb-2">
                {Object.keys(technologyCategories).length}
              </div>
              <div className="text-gray-300">Technology Categories</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-red-500 mb-2">
                7
              </div>
              <div className="text-gray-300">Learning Path Steps</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-red-500 mb-2">
                ∞
              </div>
              <div className="text-gray-300">Sacred Wisdom</div>
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center"
        >
          <h2 className="text-2xl font-bold mb-6 text-red-400">
            Begin Your Sacred Journey
          </h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Explore the complete collection of optimization techniques, from web fundamentals to advanced performance strategies.
          </p>
          <Link href="/codex/web-fundamentals-html">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-red-800 hover:bg-red-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-colors shadow-lg hover:shadow-red-600/40"
            >
              Start Learning Now
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </>
  );
}
