const codexDetails: Record<string, {
  title: string;
  summary: string;
  why: string;
  example: string;
  whenNot: string;
}> = {
  'react-memo': {
    title: 'React.memo',
    summary: 'Prevents unnecessary re-renders of functional components by memoizing the result unless props change.',
    why: `React.memo is useful when a component renders the same output given the same props. It uses shallow comparison to detect prop changes. This is effective for performance-critical components that re-render often unnecessarily.

Use cases include UI controls, status indicators, or list items receiving stable props.`,
    example: `// ✅ Good
const MemoizedBtn = React.memo(function Button({ onClick, label }) {
  return <button onClick={onClick}>{label}</button>;
});

// 🛑 Bad
const Timer = React.memo(({ time }) => <p>{time}</p>); // Renders anyway because props change every tick.`,
    whenNot: `Don't use React.memo if:
- The component is already very lightweight.
- Props change on every render (e.g., timestamps).
- The shallow compare doesn't offer benefits.`
  },
  'node-event-loop': {
    title: 'Node.js Event Loop Awareness',
    summary: 'Understanding how the event loop works allows you to write more efficient asynchronous code.',
    why: `The event loop is central to Node.js. Avoid blocking it with CPU-heavy tasks or synchronous operations, or performance will degrade.

Use async functions, avoid large sync loops, and offload heavy processing to worker threads.`,
    example: `// ✅ Good
setTimeout(() => doAsyncWork(), 0);

// 🛑 Bad
while (true) { doWork(); } // Blocks loop` ,
    whenNot: `You may not need to optimize for the event loop if your app is primarily I/O-bound with minimal CPU work.`
  },
  'js-memory-leaks': {
    title: 'Avoid JavaScript Memory Leaks',
    summary: 'Leaks happen when memory is retained unnecessarily. Clean up references, listeners, and timers.',
    why: `Memory leaks accumulate over time and degrade performance. Common causes include unremoved event listeners and global references.

Use tools like Chrome DevTools, weak references, and be mindful of closures.`,
    example: `// ✅ Good
componentWillUnmount() {
  window.removeEventListener('resize', this.handler);
}

// 🛑 Bad
const retained = document.getElementById('large'); // Stays forever` ,
    whenNot: `This applies universally. There is no safe time to ignore memory management in long-lived applications.`
  },
  'api-pagination': {
    title: 'API Pagination',
    summary: 'Never return unbounded data. Always paginate large results from your API.',
    why: `Unbounded queries cause huge payloads, long load times, and excessive memory use. Pagination improves responsiveness and scales APIs.

Use cursor-based or offset-based pagination depending on your use case.`,
    example: `// ✅ Good
GET /users?page=3&limit=50

// 🛑 Bad
GET /users // returns 10,000 records` ,
    whenNot: `Pagination can be avoided only when the dataset is guaranteed to be tiny and infrequently accessed.`
  },
  'api-rate-limiting': {
    title: 'API Rate Limiting',
    summary: 'Limit requests to prevent abuse and protect server resources.',
    why: `Rate limiting mitigates DDoS, protects your infra, and ensures fair access. You can limit by IP, user ID, or token.

Use libraries like express-rate-limit or middleware at the API Gateway level.`,
    example: `// ✅ Good
rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });

// 🛑 Bad
// No limit. Bot sends 10,000 requests in seconds.` ,
    whenNot: `Internal APIs with tightly controlled access might not need rate limiting, but public-facing ones always should.`
  },
  'code-splitting': {
    title: 'Code Splitting (Dynamic Imports)',
    summary: 'Split bundles to reduce initial load time.',
    why: `Large bundles slow down the time-to-interactive for users. Splitting non-critical parts of your app into separate chunks allows the browser to load what's necessary first.

Next.js supports this natively via dynamic import().`,
    example: `// ✅ Good
const HeavyComponent = dynamic(() => import('../HeavyComponent'));

// 🛑 Bad
import HeavyComponent from '../HeavyComponent'; // always loads it up front` ,
    whenNot: `Avoid dynamic imports for small, frequently used components, as the overhead may outweigh the benefits.`
  },
  'useMemo-useCallback': {
    title: 'useMemo and useCallback',
    summary: 'Memoize functions and values to avoid unnecessary re-creation.',
    why: `These hooks help avoid unnecessary computation or function identity changes that could trigger re-renders.

They're especially useful when passing props to memoized components.`,
    example: `// ✅ Good
const memoizedFn = useCallback(() => doSomething(), []);

// 🛑 Bad
const fn = () => doSomething(); // causes re-render every time` ,
    whenNot: `Avoid overusing these hooks. Only memoize if there’s a measurable performance impact.`
  },
  'image-optimization': {
    title: 'Image Optimization',
    summary: 'Use Next.js <Image> component for optimal performance.',
    why: `Large images significantly slow down page load. Next.js' <Image> supports lazy loading, compression, and resizing.

Always provide width and height to reduce layout shifts.`,
    example: `// ✅ Good
<Image src="/hero.jpg" width={500} height={300} alt="Hero" />

// 🛑 Bad
<img src="/hero.jpg" /> // No optimization` ,
    whenNot: `Avoid it for icons or tiny assets where optimization overhead may not be worth it.`
  },
  'lazy-loading': {
    title: 'Lazy Loading Components',
    summary: 'Load components only when needed to reduce initial bundle size.',
    why: `Lazy loading delays loading non-critical parts of the UI until they are needed, improving initial load times and reducing memory use.

Use React.lazy or Next.js dynamic imports with suspense.`,
    example: `// ✅ Good
const LazyComp = React.lazy(() => import('./LazyComp'));

// 🛑 Bad
import LazyComp from './LazyComp'; // loads upfront` ,
    whenNot: `Do not lazy load components that are visible immediately, as it may cause layout shifts or flickers.`
  },
  'prefetching-data': {
    title: 'Prefetching Data',
    summary: 'Load data in advance to improve perceived performance.',
    why: `Fetching data before it is strictly needed (e.g., on hover or route prefetch) results in faster transitions and better UX.

Next.js supports route prefetching natively.`,
    example: `// ✅ Good
<Link href="/details" prefetch={true}>Details</Link>

// 🛑 Bad
No prefetch, data loads only after navigation causing delays.` ,
    whenNot: `Avoid prefetching huge datasets or when network bandwidth is constrained.`
  },
  'debounce-throttle': {
    title: 'Debounce and Throttle Events',
    summary: 'Limit how often expensive functions run in response to frequent events.',
    why: `Events like scroll, resize, or input can fire many times per second. Debouncing or throttling reduces computation overhead and prevents UI jank.`,
    example: `// ✅ Good
const debouncedSearch = debounce(() => search(query), 300);

// 🛑 Bad
const searchOnInput = () => search(query); // triggers on every keystroke` ,
    whenNot: `For infrequent or user-critical immediate responses, debounce may degrade UX.`
  },
  'web-worker-usage': {
    title: 'Use Web Workers for Heavy Computations',
    summary: 'Offload CPU-intensive tasks to background threads.',
    why: `Heavy computations block the main thread causing UI freezes. Web Workers run in parallel and keep UI responsive.`,
    example: `// ✅ Good
const worker = new Worker('heavyTask.js');

// 🛑 Bad
function heavyTask() {
  while(true) {} // freezes UI` ,
    whenNot: `Not needed for lightweight or infrequent tasks where thread overhead is unjustified.`
  },
  'ssr-caching': {
    title: 'SSR Caching Strategies',
    summary: 'Cache server-side rendered pages or data to speed up responses.',
    why: `Caching reduces server load and decreases latency by avoiding repeated expensive renders or data fetches.`,
    example: `// ✅ Good
getStaticProps with revalidate: 60;

// 🛑 Bad
No caching, every request hits the server anew` ,
    whenNot: `Avoid caching for highly dynamic data requiring real-time accuracy.`
  },
  'bundle-analyzing': {
    title: 'Bundle Analyzing',
    summary: 'Analyze and optimize JavaScript bundle size.',
    why: `Understanding bundle contents helps identify and remove bloat, improving load times.`,
    example: `// ✅ Good
Using webpack-bundle-analyzer to inspect sizes.

// 🛑 Bad
Blindly importing large libs increases bundle size unnecessarily.` ,
    whenNot: `Regular analysis is beneficial; skipping it is heresy to optimization.`
  },
  'critical-css': {
    title: 'Critical CSS Extraction',
    summary: 'Inline above-the-fold CSS to speed up first paint.',
    why: `Inlining critical CSS reduces render-blocking resources, improving perceived load speed.`,
    example: `// ✅ Good
Using Next.js built-in CSS support or tools like Critical for extraction.

// 🛑 Bad
Loading full CSS asynchronously causing FOUC.` ,
    whenNot: `Complex CSS may be too large to inline efficiently.`
  },
  'http2-multiplexing': {
    title: 'HTTP/2 Multiplexing',
    summary: 'Serve multiple assets over a single connection for faster loads.',
    why: `HTTP/2 allows simultaneous requests reducing load time and overhead compared to HTTP/1.1.`,
    example: `// ✅ Good
Hosting assets on HTTP/2 enabled servers.

// 🛑 Bad
Using HTTP/1.1 and multiple connections slows loading.` ,
    whenNot: `Legacy environments or unsupported servers negate benefits.`
  }
};

export default codexDetails;
