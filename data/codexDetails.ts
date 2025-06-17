const codexDetails: Record<string, {
  title: string;
  summary: string;
  why: string;
  example: string;
  whenNot: string;
}> = {
  // React & Next.js
  'react-memo': {
    title: 'React.memo',
    summary: 'Prevents unnecessary re-renders of functional components by memoizing the result unless props change.',
    why: `React.memo is useful when a component renders the same output given the same props. It uses shallow comparison to detect prop changes. Effective for components with stable props.`,
    example: `const MemoBtn = React.memo(({ onClick, label }) => <button onClick={onClick}>{label}</button>);`,
    whenNot: `Avoid when props change frequently or component is very lightweight.`
  },
  'usememo-usecallback': {
    title: 'useMemo and useCallback',
    summary: 'Memoize functions and values to avoid unnecessary recomputations and re-renders.',
    why: `Avoids creating new function instances or expensive calculations each render, which helps with memoized children.`,
    example: `const memoizedValue = useMemo(() => compute(), [deps]);`,
    whenNot: `Avoid premature optimization or overusing these hooks unnecessarily.`
  },
  'code-splitting': {
    title: 'Code Splitting (Dynamic Imports)',
    summary: 'Split bundles to reduce initial load time using dynamic import.',
    why: `Improves initial page load by loading only required chunks.`,
    example: `const LazyComp = dynamic(() => import('./HeavyComp'));`,
    whenNot: `Avoid for tiny components or when code-splitting adds overhead.`
  },
  'image-optimization': {
    title: 'Image Optimization',
    summary: 'Use Next.js <Image> for automatic resizing, compression, and lazy loading.',
    why: `Reduces load times and bandwidth with proper image sizing.`,
    example: `<Image src="/pic.jpg" width={600} height={400} alt="pic" />`,
    whenNot: `Small icons or images with negligible impact.`
  },
  'lazy-loading': {
    title: 'Lazy Loading Components',
    summary: 'Defer loading of components until needed.',
    why: `Improves initial load performance by splitting non-critical UI.`,
    example: `const LazyComp = React.lazy(() => import('./Comp'));`,
    whenNot: `Not for critical UI that must appear immediately.`
  },
  'virtualization': {
    title: 'List Virtualization',
    summary: 'Render only visible list items in long lists.',
    why: `Prevents performance bottlenecks from rendering thousands of DOM nodes.`,
    example: `Using react-window or react-virtualized.`,
    whenNot: `For small lists or infrequent rendering.`
  },
  'ssr-caching': {
    title: 'SSR Caching',
    summary: 'Cache server-rendered pages for repeated requests.',
    why: `Reduces server load and latency by reusing generated HTML.`,
    example: `Cache-Control headers with s-maxage.`,
    whenNot: `For personalized or frequently changing pages.`
  },
  'static-generation': {
    title: 'Static Site Generation (SSG)',
    summary: 'Pre-build pages at build time for speed.',
    why: `Static files serve instantly with low server cost.`,
    example: `getStaticProps in Next.js.`,
    whenNot: `Pages with frequently updated or user-specific data.`
  },
  'api-pagination': {
    title: 'API Pagination',
    summary: 'Split API results into pages to limit response size.',
    why: `Improves responsiveness and reduces memory overhead.`,
    example: `GET /items?page=2&limit=50`,
    whenNot: `Tiny datasets where pagination adds unnecessary complexity.`
  },
  'api-rate-limiting': {
    title: 'API Rate Limiting',
    summary: 'Limit the number of API calls per user/IP to prevent abuse.',
    why: `Protects resources and prevents DDoS attacks.`,
    example: `Using express-rate-limit middleware.`,
    whenNot: `Internal APIs with trusted clients.`
  },
  // Node.js & JavaScript
  'node-event-loop': {
    title: 'Node.js Event Loop Awareness',
    summary: 'Write non-blocking async code and avoid CPU-heavy sync tasks.',
    why: `Keeps server responsive and efficient.`,
    example: `Offload heavy tasks to worker threads or child processes.`,
    whenNot: `If app is simple and mostly I/O-bound, less critical.`
  },
  'js-memory-leaks': {
    title: 'Avoid JavaScript Memory Leaks',
    summary: 'Clean up listeners, timers, and references to prevent leaks.',
    why: `Memory leaks degrade app stability and performance over time.`,
    example: `Remove event listeners on component unmount.`,
    whenNot: `Always relevant for long-running apps.`
  },
  'lazy-hydration': {
    title: 'Lazy Hydration',
    summary: 'Defer hydration of non-critical React components.',
    why: `Improves Time to Interactive on large pages.`,
    example: `Using libraries like react-lazy-hydration.`,
    whenNot: `For components needing instant interactivity.`
  },
  'prefetching': {
    title: 'Next.js Prefetching',
    summary: 'Preload pages and data likely to be needed soon.',
    why: `Speeds up navigation and improves user experience.`,
    example: `<Link href="/next-page" prefetch={true}>Next</Link>`,
    whenNot: `Prefetching too many pages wastes bandwidth.`
  },
  'static-assets-caching': {
    title: 'Static Assets Caching',
    summary: 'Use long cache lifetimes with versioned filenames.',
    why: `Improves load times by avoiding repeated downloads.`,
    example: `Cache-Control: max-age=31536000, immutable`,
    whenNot: `When assets change frequently without versioning.`
  },
  'throttling-debouncing': {
    title: 'Throttling and Debouncing',
    summary: 'Control the frequency of expensive event handlers.',
    why: `Improves performance on scroll, resize, input events.`,
    example: `Debounce search input to limit API calls.`,
    whenNot: `For infrequent or one-time events.`
  },
  // Additional from previous discussions:
  'use-swr': {
    title: 'Use SWR or React Query',
    summary: 'Data fetching libraries with caching, revalidation, and more.',
    why: `Simplifies fetching logic and improves UX with stale-while-revalidate.`,
    example: `const { data } = useSWR('/api/data', fetcher);`,
    whenNot: `If app has very simple or no data fetching needs.`
  },
  'error-boundaries': {
    title: 'Error Boundaries',
    summary: 'React components to catch and handle rendering errors gracefully.',
    why: `Prevents app crashes and improves fault tolerance.`,
    example: `<ErrorBoundary><MyComponent /></ErrorBoundary>`,
    whenNot: `Not useful for async errors or event handlers.`
  },
  'typescript-strictness': {
    title: 'Use Strict TypeScript Settings',
    summary: 'Enable strict mode for better code safety and fewer runtime errors.',
    why: `Catches bugs at compile time and improves maintainability.`,
    example: `tsconfig.json with "strict": true`,
    whenNot: `For rapid prototyping where speed beats safety.`
  },
  'bundle-analyzer': {
    title: 'Bundle Analysis',
    summary: 'Use tools to inspect and optimize bundle size.',
    why: `Identifies large dependencies and duplicates for better performance.`,
    example: `next-bundle-analyzer or webpack-bundle-analyzer.`,
    whenNot: `For tiny apps or initial development phase.`
  },
  'serverless-architecture': {
    title: 'Serverless Functions for APIs',
    summary: 'Use serverless for scalable, pay-per-use API endpoints.',
    why: `Eases scaling, reduces maintenance, and integrates well with Next.js API routes.`,
    example: `export default function handler(req, res) { res.json({ message: "Hello" }) }`,
    whenNot: `For heavy long-running compute or complex stateful apps.`
  }
};

export default codexDetails;
