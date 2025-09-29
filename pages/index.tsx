import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import codexDetails from "../data/codexDetails";
import { ChevronRight, BookOpen, Zap, Code, Database, Globe, Cpu } from "lucide-react";
import tipQuotes from "../data/tipQuotes";
import { useEffect, useMemo, useState } from "react";
import techpriestQuotes from "../data/quotes";

// Technology categories for the main page
const technologyCategories = {
  'React': {
    icon: <Zap className="w-8 h-8" />,
    color: 'text-blue-400',
    bgColor: 'bg-blue-900/20',
    borderColor: 'border-blue-800',
    description: 'The Sacred Art of Component Optimization - Master the blessed hooks of React and the sacred rituals of memoization that prevent unnecessary re-renders of the Machine Spirit.',
    ritual: 'Ritual of Component Sanctification',
    techPriestDescription: 'Learn the ancient arts of React optimization, where components are blessed with the sacred shield of memoization and hooks flow like the sacred data streams of the Omnissiah.',
    technologies: ['React.memo', 'useMemo & useCallback', 'Lazy Loading', 'Virtualization', 'Error Boundaries', 'Concurrent Features', 'Server Components']
  },
  'Next.js': {
    icon: <Globe className="w-8 h-8" />,
    color: 'text-gray-400',
    bgColor: 'bg-gray-900/20',
    borderColor: 'border-gray-800',
    description: 'The Sacred Framework of the Omnissiah - Master server-side rendering, static generation, and the blessed streaming that delivers content with divine efficiency.',
    ritual: 'Ritual of Server-Side Sanctification',
    techPriestDescription: 'Embrace the power of Next.js, where pages are pre-rendered in the sacred forges and delivered with the swiftness of a discharged plasma bolt.',
    technologies: ['Code Splitting', 'Image Optimization', 'SSR Caching', 'Static Generation', 'Prefetching', 'Streaming', 'Partial Prerendering']
  },
  'Performance': {
    icon: <Cpu className="w-8 h-8" />,
    color: 'text-green-400',
    bgColor: 'bg-green-900/20',
    borderColor: 'border-green-800',
    description: 'The Sacred Optimization Protocols - Unlock the full power of your applications through bundle analysis, caching strategies, and performance monitoring.',
    ritual: 'Ritual of Performance Purification',
    techPriestDescription: 'Purge the bloat from your bundles and optimize your code with the precision of the Omnissiah\'s chosen tools.',
    technologies: ['Bundle Analysis', 'Throttling & Debouncing', 'SWR/React Query', 'Static Asset Caching']
  },
  'Node.js': {
    icon: <Database className="w-8 h-8" />,
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-900/20',
    borderColor: 'border-yellow-800',
    description: 'The Sacred Server Architecture - Master the event loop, worker threads, and cluster optimization to build servers that scale like the sacred legions.',
    ritual: 'Ritual of Server Optimization',
    techPriestDescription: 'Command the server spirits with the wisdom of the Omnissiah, ensuring your APIs serve with the reliability of sacred cogitators.',
    technologies: ['API Pagination', 'Rate Limiting', 'Event Loop Awareness', 'Memory Leak Prevention', 'Worker Threads', 'Cluster Optimization']
  },
  'TypeScript': {
    icon: <Code className="w-8 h-8" />,
    color: 'text-purple-400',
    bgColor: 'bg-purple-900/20',
    borderColor: 'border-purple-800',
    description: 'The Sacred Type System - Harness the power of compile-time type checking and advanced TypeScript patterns that ensure code sanctity.',
    ritual: 'Ritual of Type Sanctification',
    techPriestDescription: 'Let the strict compiler be your relentless sentinel, purging errors before they dare manifest in your blessed code.',
    technologies: ['Strict TypeScript Settings', 'Satisfies Operator', 'Template Literal Types']
  },
  'Python': {
    icon: <Code className="w-8 h-8" />,
    color: 'text-orange-400',
    bgColor: 'bg-orange-900/20',
    borderColor: 'border-orange-800',
    description: 'The Sacred Python Algorithms - Master async programming, memory optimization, and the blessed data structures that honor the Omnissiah\'s efficiency.',
    ritual: 'Ritual of Python Optimization',
    techPriestDescription: 'Channel the power of Python with the wisdom of the Tech-Priests, where async spirits flow and memory is conserved like sacred energy.',
    technologies: ['Async/Await Optimization', 'Memory Optimization', 'Efficient Data Structures', 'Profiling', 'NumPy Optimization', 'Multiprocessing']
  },
  'Java': {
    icon: <Code className="w-8 h-8" />,
    color: 'text-amber-400',
    bgColor: 'bg-amber-900/20',
    borderColor: 'border-amber-800',
    description: 'The Sacred JVM Optimizations - Tune GC, harness JIT, and command threads to achieve sanctified performance.',
    ritual: 'Ritual of JVM Sanctification',
    techPriestDescription: 'From G1/ZGC to Virtual Threads and Reactive Streams, master the JVM rites for low latency and high throughput.',
    technologies: ['G1/ZGC Tuning', 'Tiered JIT', 'Virtual Threads', 'Reactor', 'Micrometer', 'JFR', 'GraalVM']
  },
  'Web Development Basics': {
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

// Generate a Tech-Priest inspired quote per technique (varies by category and slug)
const slugGroups = {
  react: ['react-memo','usememo-usecallback','lazy-loading','virtualization','lazy-hydration','error-boundaries','react-concurrent-features','react-server-components'],
  next: ['code-splitting','image-optimization','ssr-caching','static-generation','prefetching','static-assets-caching','nextjs-streaming','nextjs-partial-prerendering'],
  performance: ['throttling-debouncing','use-swr','bundle-analyzer','static-assets-caching'],
  node: ['api-pagination','api-rate-limiting','node-event-loop','js-memory-leaks','serverless-architecture','nodejs-worker-threads','nodejs-cluster-optimization'],
  typescript: ['typescript-strictness','typescript-satisfies-operator','typescript-template-literal-types'],
  python: ['python-async-optimization','python-memory-optimization','python-efficient-data-structures','python-profiling-performance','python-numpy-optimization','python-multiprocessing-threading','python-generators-lazy-evaluation'],
  java: ['java-gc-tuning','java-jit-optimizations','java-threading-concurrency','java-spring-boot-performance','java-memory-profiling','java-graalvm-native-image','java-reactive-programming'],
  web: ['web-fundamentals-html','web-fundamentals-css','web-fundamentals-javascript','web-development-tools','web-development-frameworks','web-development-backend','web-development-practice']
};

function hashSlug(slug: string) {
  let h = 0;
  for (let i = 0; i < slug.length; i++) h = (h + slug.charCodeAt(i)) % 2147483647;
  return h;
}

function getCategoryForSlug(slug: string) {
  if (slugGroups.react.includes(slug)) return 'react';
  if (slugGroups.next.includes(slug)) return 'next';
  if (slugGroups.performance.includes(slug)) return 'performance';
  if (slugGroups.node.includes(slug)) return 'node';
  if (slugGroups.typescript.includes(slug)) return 'typescript';
  if (slugGroups.python.includes(slug)) return 'python';
  if (slugGroups.web.includes(slug)) return 'web';
  return 'misc';
}

function getTechPriestQuote(slug: string, title: string) {
  const category = getCategoryForSlug(slug);
  const seed = hashSlug(slug);
  const pick = (arr: string[]) => arr[seed % arr.length];
  const invocations = [
    '“By the Omnissiah,',
    '“Machine-Spirit willing,',
    '“In the sacred stacks,',
    '“Let the data-choirs sing,',
    '“Under red-lit forges,'
  ];
  const closures = [
    'so efficiency prevails.”',
    'and entropy is denied.”',
    'that latency may fall.”',
    'granting ordered execution.”',
    'and throughput is sanctified.”'
  ];

  const banks = {
    react: {
      verbs: ['quiets re-renders','stills jitter','aligns fibers','pacifies props','guards state'],
      nouns: ['the UI engine','component hymnals','virtual DOM','render-spirits','hook liturgy']
    },
    next: {
      verbs: ['lightens payloads','prepares routes','parts the bundle','streams fragments','hastens TTFB'],
      nouns: ['edge shrines','CDN reliquaries','route-spirits','page forges','cache altars']
    },
    performance: {
      verbs: ['purges bloat','sharpens frames','tempers cycles','culls excess','steadies motion'],
      nouns: ['frame cadence','timing reliquary','performance dials','render cadence','sacred loops']
    },
    node: {
      verbs: ['keeps the loop','orders daemons','guards the port','untangles I/O','balances load'],
      nouns: ['server-forge','worker cohorts','event conduits','daemon-processes','socket temples']
    },
    typescript: {
      verbs: ['seals contracts','banishes bugs','fortifies types','guards interfaces','marks invariants'],
      nouns: ['runes of type','compiler shrine','schema tablets','type reliquary','interface sigils']
    },
    python: {
      verbs: ['tames async','conserves memory','vectorizes rites','profiles truth','spawns workers'],
      nouns: ['serpent loops','heap basin','numeric arrays','hot paths','process choir']
    },
    web: {
      verbs: ['honors semantics','shapes layout','enlightens novices','arms artisans','orders content'],
      nouns: ['markup rites','responsive grid','learning walkway','tool sanctum','document spine']
    },
    misc: {
      verbs: ['restores order','aligns circuits','cleanses drift','binds chaos','keeps harmony'],
      nouns: ['data conduits','logic cogs','control rails','state gears','code reliquary']
    }
  } as const;

  const kit = (banks as any)[category] || (banks as any).misc;
  const invocation = pick(invocations);
  const verb = pick(kit.verbs);
  const noun = pick(kit.nouns);
  const closure = pick(closures);

  return `${invocation} ${title} ${verb} within ${noun}, ${closure}`;
}

export async function getStaticProps() {
  const optimizations = Object.entries(codexDetails).map(([slug, data]) => ({
    slug,
    title: data.title,
    summary: data.summary,
    benediction: data.benediction,
  }));

  return {
    props: { optimizations },
  };
}

export default function Codex({ optimizations }) {
  // Deterministic initial value to avoid SSR/client mismatch; randomize after mount
  const [quoteIndex, setQuoteIndex] = useState(0);
  // Local state for randomized optimizations on each page load
  const [shuffledOptimizations, setShuffledOptimizations] = useState(optimizations);

  useEffect(() => {
    // Randomize starting quote after hydration
    setQuoteIndex(Math.floor(Math.random() * techpriestQuotes.length));
    // Shuffle optimizations after hydration so order changes on each load
    setShuffledOptimizations(prev => {
      const arr = [...optimizations];
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const tmp = arr[i];
        arr[i] = arr[j];
        arr[j] = tmp;
      }
      return arr;
    });
    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % techpriestQuotes.length);
    }, 13000);
    return () => clearInterval(interval);
  }, []);

  const activeQuote = useMemo(() => techpriestQuotes[quoteIndex], [quoteIndex]);
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
      'Java': ['java-gc-tuning', 'java-jit-optimizations', 'java-threading-concurrency', 'java-spring-boot-performance', 'java-memory-profiling', 'java-graalvm-native-image', 'java-reactive-programming'],
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
          <p className="text-xl md:text-2xl text-gray-300 mb-4 max-w-4xl mx-auto">
            The Sacred Repository of Advanced Web Development Knowledge
          </p>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto mb-8">
            From React optimizations to Python performance, from web fundamentals to senior-level techniques. 
            All blessed by the Omnissiah's digital wisdom.
          </p>
          <div className="bg-gray-900/50 border border-red-800 rounded-xl p-6 max-w-4xl mx-auto min-h-[132px] flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeQuote.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.5 }}
              >
                <p className="text-red-300 italic text-lg">
                  “{activeQuote.text}”
                </p>
                <p className="text-sm text-gray-400 mt-2">- {activeQuote.author}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Technology Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center mb-4 text-red-400">
            Sacred Technology Categories
          </h2>
          <p className="text-lg text-gray-400 text-center mb-12 max-w-4xl mx-auto">
            Choose your path of digital enlightenment. Each category contains the sacred knowledge 
            needed to master specific technologies in the Omnissiah's digital realm.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 gap-8">
            {Object.entries(technologyCategories).map(([category, config]) => (
              <Link key={category} href={`/category/${category.toLowerCase().replace(/\s+/g, '-')}`}>
                <motion.div
                  whileHover={{ scale: 1.02, y: -5 }}
                  transition={{ duration: 0.2 }}
                  className={`${config.bgColor} ${config.borderColor} border-2 rounded-2xl p-8 hover:shadow-lg transition-all cursor-pointer group`}
                >
                <div className={`${config.color} mb-6 group-hover:scale-110 transition-transform`}>
                  {config.icon}
                </div>
                <h3 className="text-2xl font-bold text-red-400 mb-3">
                  {category}
                </h3>
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-red-500 mb-2">
                    {config.ritual}
                  </h4>
                  <p className="text-sm text-gray-300 mb-4">
                    {config.techPriestDescription}
                  </p>
                </div>
                <div className="mb-6">
                  <h5 className="text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wider">
                    Sacred Technologies
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {config.technologies.slice(0, 4).map((tech, index) => (
                      <span 
                        key={index}
                        className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                    {config.technologies.length > 4 && (
                      <span className="text-xs text-gray-500">
                        +{config.technologies.length - 4} more
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span className="font-semibold">
                    {groupedOptimizations[category]?.length || 0} Sacred Entries
                  </span>
                  <div className="flex items-center">
                    <span className="mr-1">Enter Sacred Realm</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
                </motion.div>
              </Link>
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
            {shuffledOptimizations.slice(0, 9).map(({ title, summary, slug, benediction }) => {
              const slugStr = Array.isArray(slug) ? slug[0] : slug ?? "";
              const categoryKey = getCategoryForSlug(slugStr);
              const categoryDisplay = {
                react: 'React',
                next: 'Next.js',
                performance: 'Performance',
                node: 'Node.js',
                typescript: 'TypeScript',
                python: 'Python',
                java: 'Java',
                web: 'Web Development Basics',
                misc: 'Misc'
              }[categoryKey] || 'Misc';
              return (
                <motion.div
                  key={slugStr}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  className="bg-gray-900 border border-red-800 p-6 rounded-2xl shadow-lg hover:shadow-red-600/40 transition-all cursor-pointer group relative"
                >
                  <Link href={`/codex/${slugStr}`} className="block">
                    <div className="absolute top-4 right-4">
                      <span className="text-[10px] uppercase tracking-wide bg-gray-800 text-gray-300 border border-red-900 px-2 py-0.5 rounded">
                        {categoryDisplay}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-red-400 mb-2 underline underline-offset-4 group-hover:text-red-300 transition-colors">
                      {title}
                    </h3>
                    <p className="text-xs text-red-300 italic mb-3">
                      {tipQuotes[slugStr] || getTechPriestQuote(slugStr, title)}
                    </p>
                    <p className="text-sm text-gray-300 line-clamp-3">{summary}</p>
                    {benediction && (
                      <div className="mt-4 pt-3 border-t border-red-900">
                        <div className="text-sm text-gray-300 italic whitespace-pre-line">
                          {benediction}
                        </div>
                      </div>
                    )}
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
          <h2 className="text-2xl font-bold text-center mb-4 text-red-400">
            Sacred Knowledge Statistics
          </h2>
          <p className="text-center text-gray-400 mb-8">
            The accumulated wisdom of the Mechanicus, quantified for the faithful
          </p>
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div className="bg-gray-800/50 rounded-xl p-4">
              <div className="text-4xl font-bold text-red-500 mb-2">
                {optimizations.length}
              </div>
              <div className="text-gray-300 text-sm">Sacred Scrolls</div>
              <div className="text-xs text-gray-500 mt-1">Optimization Techniques</div>
            </div>
            <div className="bg-gray-800/50 rounded-xl p-4">
              <div className="text-4xl font-bold text-red-500 mb-2">
                {Object.keys(technologyCategories).length}
              </div>
              <div className="text-gray-300 text-sm">Sacred Domains</div>
              <div className="text-xs text-gray-500 mt-1">Technology Categories</div>
            </div>
            <div className="bg-gray-800/50 rounded-xl p-4">
              <div className="text-4xl font-bold text-red-500 mb-2">
                7
              </div>
              <div className="text-gray-300 text-sm">Sacred Rites</div>
              <div className="text-xs text-gray-500 mt-1">Learning Path Steps</div>
            </div>
            <div className="bg-gray-800/50 rounded-xl p-4">
              <div className="text-4xl font-bold text-red-500 mb-2">
                ∞
              </div>
              <div className="text-gray-300 text-sm">Omnissiah's Blessing</div>
              <div className="text-xs text-gray-500 mt-1">Infinite Wisdom</div>
            </div>
          </div>
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-400 italic">
              "Each scroll represents countless hours of sacred study and the blessing of the Machine Spirit."
            </p>
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
            Choose your path of digital enlightenment. Whether you seek the foundational wisdom of web development 
            or the advanced optimization techniques of senior Tech-Priests, your journey begins here.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/codex/web-fundamentals-html">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-red-800 hover:bg-red-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-colors shadow-lg hover:shadow-red-600/40"
              >
                🚀 Start as Acolyte
              </motion.button>
            </Link>
            <Link href="/codex/react-memo">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gray-800 hover:bg-gray-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-colors shadow-lg border border-red-800"
              >
                ⚡ Jump to React Mastery
              </motion.button>
            </Link>
          </div>
          <div className="mt-8 text-sm text-gray-400">
            <p className="italic">
              "Every journey begins with a single step into the sacred circuits of knowledge."
            </p>
          </div>
        </motion.div>
      </div>
    </>
  );
}
