import { motion } from "framer-motion";
import Link from "next/link";
import codexDetails from "../../data/codexDetails";
import { useRouter } from "next/router";
import { ChevronLeft, ChevronRight, BookOpen, Zap, Code, Database, Globe, Cpu } from "lucide-react";
import { useLoading } from "../../components/LoadingContext";
import { useEffect } from "react";

// Technology categories mapping (same as in index.tsx)
const technologyCategories = {
  'react': {
    icon: <Zap className="w-8 h-8" />,
    color: 'text-blue-400',
    bgColor: 'bg-blue-900/20',
    borderColor: 'border-blue-800',
    description: 'The Sacred Art of Component Optimization - Master the blessed hooks of React and the sacred rituals of memoization that prevent unnecessary re-renders of the Machine Spirit.',
    ritual: 'Ritual of Component Sanctification',
    techPriestDescription: 'Learn the ancient arts of React optimization, where components are blessed with the sacred shield of memoization and hooks flow like the sacred data streams of the Omnissiah.',
    technologies: ['React.memo', 'useMemo & useCallback', 'Lazy Loading', 'Virtualization', 'Error Boundaries', 'Concurrent Features', 'Server Components']
  },
  'next.js': {
    icon: <Globe className="w-8 h-8" />,
    color: 'text-gray-400',
    bgColor: 'bg-gray-900/20',
    borderColor: 'border-gray-800',
    description: 'The Sacred Framework of the Omnissiah - Master server-side rendering, static generation, and the blessed streaming that delivers content with divine efficiency.',
    ritual: 'Ritual of Server-Side Sanctification',
    techPriestDescription: 'Embrace the power of Next.js, where pages are pre-rendered in the sacred forges and delivered with the swiftness of a discharged plasma bolt.',
    technologies: ['Code Splitting', 'Image Optimization', 'SSR Caching', 'Static Generation', 'Prefetching', 'Streaming', 'Partial Prerendering']
  },
  'performance': {
    icon: <Cpu className="w-8 h-8" />,
    color: 'text-green-400',
    bgColor: 'bg-green-900/20',
    borderColor: 'border-green-800',
    description: 'The Sacred Optimization Protocols - Unlock the full power of your applications through bundle analysis, caching strategies, and performance monitoring.',
    ritual: 'Ritual of Performance Purification',
    techPriestDescription: 'Purge the bloat from your bundles and optimize your code with the precision of the Omnissiah\'s chosen tools.',
    technologies: ['Bundle Analysis', 'Throttling & Debouncing', 'SWR/React Query', 'Static Asset Caching']
  },
  'node.js': {
    icon: <Database className="w-8 h-8" />,
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-900/20',
    borderColor: 'border-yellow-800',
    description: 'The Sacred Server Architecture - Master the event loop, worker threads, and cluster optimization to build servers that scale like the sacred legions.',
    ritual: 'Ritual of Server Optimization',
    techPriestDescription: 'Command the server spirits with the wisdom of the Omnissiah, ensuring your APIs serve with the reliability of sacred cogitators.',
    technologies: ['API Pagination', 'Rate Limiting', 'Event Loop Awareness', 'Memory Leak Prevention', 'Worker Threads', 'Cluster Optimization']
  },
  'typescript': {
    icon: <Code className="w-8 h-8" />,
    color: 'text-purple-400',
    bgColor: 'bg-purple-900/20',
    borderColor: 'border-purple-800',
    description: 'The Sacred Type System - Harness the power of compile-time type checking and advanced TypeScript patterns that ensure code sanctity.',
    ritual: 'Ritual of Type Sanctification',
    techPriestDescription: 'Let the strict compiler be your relentless sentinel, purging errors before they dare manifest in your blessed code.',
    technologies: ['Strict TypeScript Settings', 'Satisfies Operator', 'Template Literal Types']
  },
  'python': {
    icon: <Code className="w-8 h-8" />,
    color: 'text-orange-400',
    bgColor: 'bg-orange-900/20',
    borderColor: 'border-orange-800',
    description: 'The Sacred Python Algorithms - Master async programming, memory optimization, and the blessed data structures that honor the Omnissiah\'s efficiency.',
    ritual: 'Ritual of Python Optimization',
    techPriestDescription: 'Channel the power of Python with the wisdom of the Tech-Priests, where async spirits flow and memory is conserved like sacred energy.',
    technologies: ['Async/Await Optimization', 'Memory Optimization', 'Efficient Data Structures', 'Profiling', 'NumPy Optimization', 'Multiprocessing']
  },
  'java': {
    icon: <Code className="w-8 h-8" />,
    color: 'text-amber-400',
    bgColor: 'bg-amber-900/20',
    borderColor: 'border-amber-800',
    description: 'The Sacred JVM Optimizations - Tame GC spirits, harness JIT tempests, and orchestrate threads to achieve blessed latency and throughput.',
    ritual: 'Ritual of JVM Sanctification',
    techPriestDescription: 'Master the rites of garbage collection, virtual threads, reactive streams, and native images, that your services may start swift and run unblocked.',
    technologies: ['G1/ZGC Tuning', 'Tiered JIT', 'Virtual Threads', 'Reactor', 'Micrometer', 'JFR', 'GraalVM']
  },
  'web-development-basics': {
    icon: <BookOpen className="w-8 h-8" />,
    color: 'text-cyan-400',
    bgColor: 'bg-cyan-900/20',
    borderColor: 'border-cyan-800',
    description: 'The Sacred Path of Web Mastery - From HTML foundations to senior-level techniques, this is the complete journey from acolyte to Tech-Priest.',
    ritual: 'Ritual of Web Enlightenment',
    techPriestDescription: 'Begin your sacred journey through the digital realms, mastering each step from the foundational markup to the advanced server architectures.',
    technologies: ['HTML Fundamentals', 'CSS Mastery', 'JavaScript Essentials', 'Development Tools', 'Modern Frameworks', 'Backend Development', 'Portfolio Building']
  }
};

// Category to slugs mapping
const categorySlugMapping = {
  'react': ['react-memo', 'usememo-usecallback', 'lazy-loading', 'virtualization', 'lazy-hydration', 'error-boundaries', 'react-concurrent-features', 'react-server-components'],
  'next.js': ['code-splitting', 'image-optimization', 'ssr-caching', 'static-generation', 'prefetching', 'static-assets-caching', 'nextjs-streaming', 'nextjs-partial-prerendering'],
  'performance': ['throttling-debouncing', 'use-swr', 'bundle-analyzer'],
  'node.js': ['api-pagination', 'api-rate-limiting', 'node-event-loop', 'js-memory-leaks', 'serverless-architecture', 'nodejs-worker-threads', 'nodejs-cluster-optimization'],
  'typescript': ['typescript-strictness', 'typescript-satisfies-operator', 'typescript-template-literal-types'],
  'python': ['python-async-optimization', 'python-memory-optimization', 'python-efficient-data-structures', 'python-profiling-performance', 'python-numpy-optimization', 'python-multiprocessing-threading', 'python-generators-lazy-evaluation'],
  'java': ['java-gc-tuning','java-jit-optimizations','java-threading-concurrency','java-spring-boot-performance','java-memory-profiling','java-graalvm-native-image','java-reactive-programming'],
  'web-development-basics': ['web-fundamentals-html', 'web-fundamentals-css', 'web-fundamentals-javascript', 'web-development-tools', 'web-development-frameworks', 'web-development-backend', 'web-development-practice']
};

export async function getStaticPaths() {
  const paths = Object.keys(technologyCategories).map((category) => ({
    params: { category },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { category } = params;
  const categoryConfig = technologyCategories[category];
  const slugs = categorySlugMapping[category] || [];
  
  const entries = slugs.map(slug => ({
    slug,
    ...codexDetails[slug]
  })).filter(entry => entry.title); // Filter out any missing entries

  // Remove the icon from categoryConfig to avoid serialization issues
  const { icon, ...serializableCategoryConfig } = categoryConfig || {};

  return {
    props: {
      category,
      categoryConfig: serializableCategoryConfig,
      entries,
    },
  };
}

export default function CategoryPage({ category, categoryConfig, entries }) {
  const router = useRouter();
  const { setLoading } = useLoading();

  useEffect(() => {
    // Set loading to false once component mounts and data is available
    setLoading(false);
  }, [setLoading]);
  
  // Get the full category config including the icon
  const fullCategoryConfig = technologyCategories[category];

  if (!categoryConfig || !fullCategoryConfig) {
    return (
      <div className="min-h-screen bg-black text-red-200 p-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl text-red-400 mb-4">Sacred Domain Not Found</h1>
          <p className="text-gray-300 mb-8">The category you seek does not exist in the sacred archives.</p>
          <Link href="/">
            <span className="text-red-300 hover:text-white underline cursor-pointer">
              Return to the Codex
            </span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-red-200 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <Link href="/">
            <div className="flex items-center text-gray-400 hover:text-white mb-8 cursor-pointer transition-colors">
              <ChevronLeft className="w-5 h-5 mr-2" />
              <span>Return to Sacred Codex</span>
            </div>
          </Link>

          <div className={`${categoryConfig.bgColor} ${categoryConfig.borderColor} border-2 rounded-2xl p-8`}>
            <div className="flex items-start justify-between">
              <div className="flex-1">
              <div className={`${fullCategoryConfig.color} mb-4`}>
                {fullCategoryConfig.icon}
              </div>
                <h1 className="text-4xl font-bold text-red-400 mb-4 capitalize">
                  {category.replace('-', ' ')} Sacred Domain
                </h1>
                <h2 className="text-lg font-semibold text-red-500 mb-3">
                  {categoryConfig.ritual}
                </h2>
                <p className="text-gray-300 mb-6">
                  {categoryConfig.techPriestDescription}
                </p>
                <div className="flex flex-wrap gap-2">
                  {categoryConfig.technologies.map((tech, index) => (
                    <span 
                      key={index}
                      className="text-xs bg-gray-800 text-gray-300 px-3 py-1 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-red-500 mb-2">
                  {entries.length}
                </div>
                <div className="text-sm text-gray-400">
                  Sacred Entries
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Entries Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold text-red-400 mb-8">
            Sacred Knowledge Entries
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {entries.map((entry) => (
              <motion.div
                key={entry.slug}
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ duration: 0.2 }}
                className="bg-gray-900 border border-red-800 p-6 rounded-2xl shadow-lg hover:shadow-red-600/40 transition-all cursor-pointer group"
              >
                <Link href={`/codex/${entry.slug}`} className="block">
                  <h3 className="text-lg font-semibold text-red-400 mb-3 underline underline-offset-4 group-hover:text-red-300 transition-colors">
                    {entry.title}
                  </h3>
                  <p className="text-sm text-gray-300 mb-4 line-clamp-3">
                    {entry.summary}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span className="bg-gray-800 px-2 py-1 rounded">
                      Sacred Technique
                    </span>
                    <div className="flex items-center">
                      <span className="mr-1">Study</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Back to Categories */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-red-800 hover:bg-red-700 text-white px-8 py-4 rounded-xl font-semibold transition-colors shadow-lg hover:shadow-red-600/40"
            >
              Explore Other Sacred Domains
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
