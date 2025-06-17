const codexDetails: Record<string, {
  title: string;
  summary: string;
  why: string;
  example: string;
  whenNot: string;
  benediction: string;
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
- The shallow compare doesn't offer benefits.`,
    benediction: 'May the Omnissiah bless your components with the sacred shield of memoization, sparing them needless rebirth and granting your renders the efficiency of the Machine Spirit.'
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
    whenNot: `Avoid overusing these hooks. Only memoize if there’s a measurable performance impact.`,
    benediction: 'Invoke the blessings of useMemo and useCallback, that your functions and calculations may be eternal, untouched by the chaos of needless recreation.'
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
    whenNot: `Avoid dynamic imports for small, frequently used components, as the overhead may outweigh the benefits.`,
    benediction: 'May your bundles be divided like the sacred forges, delivering only what is needed with the swiftness of a cogitator’s command.'
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
    whenNot: `Avoid it for icons or tiny assets where optimization overhead may not be worth it.`,
    benediction: 'Blessed be the images, compressed and sized by the sacred rites of the Omnissiah, that they may grace your page without burdening the Machine Spirit.'
  },
  'lazy-loading': {
    title: 'Lazy Loading Components',
    summary: 'Defer loading of components that are not immediately needed to improve initial page load time.',
    why: `Improves performance by reducing initial JS bundle size and loading secondary components only when needed.`,
    example: `// ✅ Good
const LazyComp = React.lazy(() => import('./Comp'));

// 🛑 Bad
import Comp from './Comp'; // loads immediately regardless of usage`,
    whenNot: `Not recommended for components critical to first meaningful paint or initial UI.`,
    benediction: 'May your components slumber in the deep vaults until summoned forth, conserving power for the Omnissiah’s holy purpose.'
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
    whenNot: `For small or infrequently changing lists, virtualization may add unnecessary complexity.`,
    benediction: 'Render but what the eye perceives; may your lists be as efficient as the servo-skulls’ flight through the data.'
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
    whenNot: `Avoid caching on user-personalized or frequently changing pages.`,
    benediction: 'Grant swift responses through the sacred cache, sparing the forge from needless toil and honoring the Machine Spirit’s efficiency.'
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
    whenNot: `For pages with highly dynamic or user-specific data.`,
    benediction: 'May the Omnissiah bless your static pages with eternal readiness, ever-present and swift as a discharged plasma bolt.'
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
    whenNot: `Pagination can be skipped for tiny, fixed datasets.`,
    benediction: 'May your APIs serve only the measure needed, sparing bandwidth as the Omnissiah conserves sacred energy.'
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
    whenNot: `Internal APIs with trusted access may not require rate limiting.`,
    benediction: 'Let no heretic flood your endpoints; the Omnissiah demands order and balance in all requests to the sacred servers.'
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
    whenNot: `For simple scripts or CLI tools, this may be less critical.`,
    benediction: 'Guard the event loop as the Omnissiah guards the sacred data streams—block not the flow or the entire system shall perish.'
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
    whenNot: `Always relevant for production apps with long uptime.`,
    benediction: 'Purge all lingering spirits from memory’s forge; let no leak corrupt the sanctity of your running code.'
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
    whenNot: `For interactive UIs needing instant input responsiveness.`,
    benediction: 'May your components awaken only when needed, conserving the Omnissiah’s holy energy for the moment of true demand.'
  },
  'prefetching': {
    title: 'Next.js Prefetching',
    summary: 'Prefetch pages and resources users are likely to navigate to next, speeding up client-side transitions.',
    why: `Improves navigation speed and user experience by preloading bundles and data.`,
    example: `// ✅ Good
<Link href="/next" prefetch={true}>Next</Link>

// 🛑 Bad
No prefetching, causing delays on navigation.`,
    whenNot: `Prefetch too many links wastes bandwidth and memory.`,
    benediction: 'May your future paths be known and prepared by the blessed prefetchers, allowing swift journeys through your digital domains.'
  },
  'static-assets-caching': {
    title: 'Static Assets Caching',
    summary: 'Leverage long cache lifetimes with immutable versioned filenames to improve loading performance.',
    why: `Clients reuse cached assets without repeated downloads, reducing load times and server requests.`,
    example: `// ✅ Good
Cache-Control: max-age=31536000, immutable

// 🛑 Bad
No caching headers or unversioned assets.`,
    whenNot: `For rapidly changing assets without versioning.`,
    benediction: 'May your static relics remain ever cached, immutable and eternal, as decreed by the Omnissiah’s immutable will.'
  },
  'throttling-debouncing': {
    title: 'Throttling and Debouncing',
    summary: 'Limit the frequency of event handler calls to reduce expensive computations during rapid events.',
    why: `Avoids performance bottlenecks on scroll, resize, and input events.`,
    example: `// ✅ Good
const debouncedFn = debounce(() => fetchData(), 300);

// 🛑 Bad
Calling fetchData on every keystroke`,
    whenNot: `For infrequent events or one-off handlers.`,
    benediction: 'May your event handlers be tempered like the forge’s hammer strikes, neither too frequent nor too sparse, achieving perfect harmony.'
  },
  'use-swr': {
    title: 'Use SWR or React Query',
    summary: 'Leverage data fetching libraries providing caching, revalidation, and stale-while-revalidate behavior.',
    why: `Simplifies data fetching and improves UX with minimal stale data.`,
    example: `// ✅ Good
const { data, error } = useSWR('/api/data', fetcher);

// 🛑 Bad
Manually managing fetch and cache logic everywhere.`,
    whenNot: `For apps with trivial or no async data requirements.`,
    benediction: 'Let SWR’s sacred cycle of fetching and caching renew your data streams in the eternal dance of information sanctity.'
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
    whenNot: `Does not catch errors in event handlers or async code.`,
    benediction: 'Guard your sacred application with error boundaries, lest a single fault corrupt the entire reliquary of your UI.'
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
    whenNot: `For rapid prototyping where speed is prioritized over safety.`,
    benediction: 'May the strict compiler be your relentless sentinel, purging errors before they dare manifest in your blessed code.'
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
    whenNot: `For small projects or initial development stages.`,
    benediction: 'Illuminate the shadows of your bundle, revealing bloat to be purged by the cleansing light of the Omnissiah.'
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
    whenNot: `For long-running compute-intensive or stateful backend services.`,
    benediction: 'Let your APIs ascend the serverless heavens, scaling with grace and fueled by the boundless power of the Omnissiah.'
  }
};

export default codexDetails;