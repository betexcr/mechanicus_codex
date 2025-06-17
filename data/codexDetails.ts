const codexDetails: Record<string, {
  title: string;
  summary: string;
  why: string;
  example: string;
  whenNot: string;
}> = {
  'react-memo': {
    title: 'React.memo',
    summary: 'Prevents unnecessary re-renders of functional components by memoizing the rendered output unless props change. Useful when components render the same result given the same props, reducing rendering overhead.',
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
  'usememo-usecallback': {
    title: 'useMemo and useCallback',
    summary: 'Memoize expensive calculations and function references to prevent unnecessary re-creation on every render, reducing wasted work and preventing triggering child re-renders.',
    why: `These hooks help avoid unnecessary computation or function identity changes that could trigger re-renders.

They're especially useful when passing props to memoized components.`,
    example: `// ✅ Good
const memoizedFn = useCallback(() => doSomething(), []);

// 🛑 Bad
const fn = () => doSomething(); // causes re-render every time`,
    whenNot: `Avoid overusing these hooks. Only memoize if there’s a measurable performance impact.`
  },
  'code-splitting': {
    title: 'Code Splitting (Dynamic Imports)',
    summary: 'Split large bundles into smaller chunks that can be loaded on demand to reduce initial load times and improve perceived performance.',
    why: `Large bundles slow down the time-to-interactive for users. Splitting non-critical parts of your app into separate chunks allows the browser to load what's necessary first.

Next.js supports this natively via dynamic import().`,
    example: `// ✅ Good
const HeavyComponent = dynamic(() => import('../HeavyComponent'));

// 🛑 Bad
import HeavyComponent from '../HeavyComponent'; // always loads it up front`,
    whenNot: `Avoid dynamic imports for small, frequently used components, as the overhead may outweigh the benefits.`
  },
  'image-optimization': {
    title: 'Image Optimization',
    summary: 'Use Next.js <Image> component for automatic resizing, compression, and lazy loading to reduce page load time and layout shifts.',
    why: `Large images significantly slow down page load. Next.js' <Image> supports lazy loading, compression, and resizing.

Always provide width and height to reduce layout shifts.`,
    example: `// ✅ Good
<Image src="/hero.jpg" width={500} height={300} alt="Hero" />

// 🛑 Bad
<img src="/hero.jpg" /> // No optimization`,
    whenNot: `Avoid it for icons or tiny assets where optimization overhead may not be worth it.`
  },
  'lazy-loading': {
    title: 'Lazy Loading Components',
    summary: 'Defer loading of components that are not immediately needed to improve initial page load time.',
    why: `Improves performance by reducing initial JS bundle size and loading secondary components only when needed.`,
    example: `// ✅ Good
const LazyComp = React.lazy(() => import('./Comp'));

// 🛑 Bad
import Comp from './Comp'; // loads immediately regardless of usage`,
    whenNot: `Not recommended for components critical to first meaningful paint or initial UI.`
  },
  'virtualization': {
    title: 'List Virtualization',
    summary: 'Render only visible items in large lists to reduce DOM nodes and improve rendering performance.',
    why: `Rendering thousands of list items at once causes slowdowns and memory issues.

Libraries like react-window or react-virtualized help efficiently render large lists.`,
    example: `// ✅ Good
import { FixedSizeList as List } from 'react-window';

<List
  height={150}
  itemCount={1000}
  itemSize={35}
  width={300}
>
  {({ index, style }) => <div style={style}>Row {index}</div>}
</List>

// 🛑 Bad
Array(1000).fill().map((_, i) => <div key={i}>Row {i}</div>) // renders all at once`,
    whenNot: `For small or infrequently changing lists, virtualization may add unnecessary complexity.`
  },
  'ssr-caching': {
    title: 'SSR Caching',
    summary: 'Cache server-rendered pages to improve response time and reduce server CPU usage on repeated requests.',
    why: `SSR caching helps scale server resources by avoiding redundant rendering for common pages.

Use Cache-Control headers or CDN-level caching.`,
    example: `// ✅ Good
res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=30');

// 🛑 Bad
No caching on SSR pages, causing repeated full renders.`,
    whenNot: `Avoid caching on user-personalized or frequently changing pages.`
  },
  'static-generation': {
    title: 'Static Site Generation (SSG)',
    summary: 'Pre-render pages at build time to deliver static HTML, enabling extremely fast load times.',
    why: `SSG removes server rendering overhead and allows CDN caching.

Use getStaticProps and getStaticPaths in Next.js.`,
    example: `// ✅ Good
export async function getStaticProps() {
  const data = await fetchData();
  return { props: { data } };
}

// 🛑 Bad
Using SSR for all pages even when data rarely changes.`,
    whenNot: `For pages with highly dynamic or user-specific data.`
  },
  'api-pagination': {
    title: 'API Pagination',
    summary: 'Limit data returned from APIs by paginating large result sets to reduce payload size and improve responsiveness.',
    why: `Unbounded API responses cause slow loads and excessive memory use.

Use cursor or offset pagination depending on requirements.`,
    example: `// ✅ Good
GET /users?page=3&limit=50

// 🛑 Bad
GET /users // returns 10,000+ records`,
    whenNot: `Pagination can be skipped for tiny, fixed datasets.`
  },
  'api-rate-limiting': {
    title: 'API Rate Limiting',
    summary: 'Restrict number of API requests per user/IP to prevent abuse and ensure fair resource usage.',
    why: `Rate limiting helps mitigate denial-of-service attacks and protects server stability.

Use middleware like express-rate-limit or gateway-level limits.`,
    example: `// ✅ Good
rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });

// 🛑 Bad
No limits; clients can spam endpoints endlessly.`,
    whenNot: `Internal APIs with trusted access may not require rate limiting.`
  },
  'node-event-loop': {
    title: 'Node.js Event Loop Awareness',
    summary: 'Avoid blocking the event loop with synchronous or CPU-intensive tasks to keep server responsive.',
    why: `Node.js runs on a single thread event loop. Blocking it stalls all async operations.

Use asynchronous APIs and worker threads for CPU-heavy work.`,
    example: `// ✅ Good
setTimeout(() => doAsyncWork(), 0);

// 🛑 Bad
while (true) { doWork(); } // blocks the loop`,
    whenNot: `For simple scripts or CLI tools, this may be less critical.`
  },
  'js-memory-leaks': {
    title: 'Avoid JavaScript Memory Leaks',
    summary: 'Ensure event listeners, timers, and references are cleaned up to prevent memory buildup over time.',
    why: `Leaks cause slowdowns and crashes in long-running apps.

Use tools like Chrome DevTools heap profiler to identify leaks.`,
    example: `// ✅ Good
componentWillUnmount() {
  window.removeEventListener('resize', this.handler);
}

// 🛑 Bad
const retained = document.getElementById('large'); // stays forever`,
    whenNot: `Always relevant for production apps with long uptime.`
  },
  'lazy-hydration': {
    title: 'Lazy Hydration',
    summary: 'Delay hydration of non-critical React components to improve Time to Interactive and reduce blocking JS.',
    why: `Hydration can be CPU-intensive. Deferring it improves perceived load speed.`,
    example: `// ✅ Good
import LazyHydrate from 'react-lazy-hydration';

<LazyHydrate whenVisible>
  <HeavyComponent />
</LazyHydrate>

// 🛑 Bad
Hydrating all components at once immediately.`,
    whenNot: `For interactive UIs needing instant input responsiveness.`
  },
  'prefetching': {
    title: 'Next.js Prefetching',
    summary: 'Prefetch pages and resources users are likely to navigate to next, speeding up client-side transitions.',
    why: `Improves navigation speed and user experience by preloading bundles and data.`,
    example: `// ✅ Good
<Link href="/next" prefetch={true}>Next</Link>

// 🛑 Bad
No prefetching, causing delays on navigation.`,
    whenNot: `Prefetch too many links wastes bandwidth and memory.`
  },
  'static-assets-caching': {
    title: 'Static Assets Caching',
    summary: 'Leverage long cache lifetimes with immutable versioned filenames to improve loading performance.',
    why: `Clients reuse cached assets without repeated downloads, reducing load times and server requests.`,
    example: `// ✅ Good
Cache-Control: max-age=31536000, immutable

// 🛑 Bad
No caching headers or unversioned assets.`,
    whenNot: `For rapidly changing assets without versioning.`
  },
  'throttling-debouncing': {
    title: 'Throttling and Debouncing',
    summary: 'Limit the frequency of event handler calls to reduce expensive computations during rapid events.',
    why: `Avoids performance bottlenecks on scroll, resize, and input events.`,
    example: `// ✅ Good
const debouncedFn = debounce(() => fetchData(), 300);

// 🛑 Bad
Calling fetchData on every keystroke`,
    whenNot: `For infrequent events or one-off handlers.`
  },
  'use-swr': {
    title: 'Use SWR or React Query',
    summary: 'Leverage data fetching libraries providing caching, revalidation, and stale-while-revalidate behavior.',
    why: `Simplifies data fetching and improves UX with minimal stale data.`,
    example: `// ✅ Good
const { data, error } = useSWR('/api/data', fetcher);

// 🛑 Bad
Manually managing fetch and cache logic everywhere.`,
    whenNot: `For apps with trivial or no async data requirements.`
  },
  'error-boundaries': {
    title: 'Error Boundaries',
    summary: 'Use React error boundary components to catch rendering errors and display fallback UIs.',
    why: `Prevents app crashes and offers better fault tolerance.`,
    example: `// ✅ Good
<ErrorBoundary>
  <MyComponent />
</ErrorBoundary>

// 🛑 Bad
No error boundary; entire app crashes on error.`,
    whenNot: `Does not catch errors in event handlers or async code.`
  },
  'typescript-strictness': {
    title: 'Use Strict TypeScript Settings',
    summary: 'Enable strict mode and other strict flags to catch bugs at compile time and increase code safety.',
    why: `Improves maintainability, readability, and reduces runtime errors.`,
    example: `// ✅ Good
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    // other strict options
  }
}

// 🛑 Bad
"strict": false`,
    whenNot: `For rapid prototyping where speed is prioritized over safety.`
  },
  'bundle-analyzer': {
    title: 'Bundle Analysis',
    summary: 'Use tools to analyze and visualize bundle composition to optimize size and remove bloat.',
    why: `Helps identify large dependencies and duplicated code to improve load times.`,
    example: `// ✅ Good
// next.config.js
const withBundleAnalyzer = require('@next/bundle-analyzer')({ enabled: true });
module.exports = withBundleAnalyzer({});

// 🛑 Bad
No analysis leading to hidden bloat.`,
    whenNot: `For small projects or initial development stages.`
  },
  'serverless-architecture': {
    title: 'Serverless Functions for APIs',
    summary: 'Use serverless functions for scalable, cost-effective, and easy-to-maintain backend endpoints.',
    why: `Provides automatic scaling, pay-per-use pricing, and great integration with Next.js API routes.`,
    example: `// ✅ Good
export default function handler(req, res) {
  res.status(200).json({ message: "Hello, world!" });
}

// 🛑 Bad
Heavy monolithic servers with manual scaling.`,
    whenNot: `For long-running compute-intensive or stateful backend services.`
  }
};

export default codexDetails;
