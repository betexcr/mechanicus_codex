const codexDetails: Record<string, {
  title: string;
  summary: string;
  why: string;
  example: string;
  whenNot: string;
}> = {
  // React & Next.js Performance Optimization Tips (15)
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
  'usememo-usecallback': {
    title: 'useMemo and useCallback',
    summary: 'Memoize functions and values to avoid unnecessary re-creation.',
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
    summary: 'Split bundles to reduce initial load time.',
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
    summary: 'Use Next.js <Image> component for optimal performance.',
    why: `Large images significantly slow down page load. Next.js' <Image> supports lazy loading, compression, and resizing.

Always provide width and height to reduce layout shifts.`,
    example: `// ✅ Good
<Image src="/hero.jpg" width={500} height={300} alt="Hero" />

// 🛑 Bad
<img src="/hero.jpg" /> // No optimization`,
    whenNot: `Avoid it for icons or tiny assets where optimization overhead may not be worth it.`
  },
  'lazy-loading': {
    title: 'Lazy Loading',
    summary: 'Load components and assets only when needed.',
    why: `Reduces initial load time and saves bandwidth by deferring non-critical resources until needed.

Use React.lazy for components or IntersectionObserver for images.`,
    example: `// ✅ Good
const LazyComponent = React.lazy(() => import('./HeavyComponent'));

// 🛑 Bad
import HeavyComponent from './HeavyComponent'; // loaded immediately`,
    whenNot: `Avoid lazy loading critical UI elements required immediately on page load.`
  },
  'virtualization': {
    title: 'List Virtualization',
    summary: 'Render only visible items in long lists for performance.',
    why: `Rendering thousands of list items kills performance. Virtualization renders only items in viewport plus buffer, reducing DOM nodes.

Libraries: react-window, react-virtualized.`,
    example: `// ✅ Good
import { FixedSizeList as List } from 'react-window';

<List
  height={500}
  itemCount={1000}
  itemSize={35}
  width={300}
>
  {({ index, style }) => <div style={style}>Item {index}</div>}
</List>

// 🛑 Bad
items.map(item => <div>{item.name}</div>); // renders all items`,
    whenNot: `Avoid for short lists where overhead is unnecessary.`
  },
  'ssr-caching': {
    title: 'SSR Caching',
    summary: 'Cache SSR output to reduce server load and speed responses.',
    why: `Re-generating SSR pages for each request is costly. Caching can reuse rendered output for identical requests, improving scalability.`,
    example: `// ✅ Good
res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=30');

// 🛑 Bad
No caching on SSR responses`,
    whenNot: `Avoid caching for dynamic user-specific pages unless cache is per user/session.`
  },
  'static-generation': {
    title: 'Static Site Generation (SSG)',
    summary: 'Pre-build pages at build time for fast load.',
    why: `SSG pre-renders pages once, serving them as static files, leading to fast load times and fewer server resources.`,
    example: `// ✅ Good
export async function getStaticProps() {
  // fetch data once
  return { props: { ... } }
}

// 🛑 Bad
SSR or CSR when data is static`,
    whenNot: `Avoid if data updates frequently or user-specific.`
  },
  'api-pagination': {
    title: 'API Pagination',
    summary: 'Never return unbounded data. Always paginate large results from your API.',
    why: `Unbounded queries cause huge payloads, long load times, and excessive memory use. Pagination improves responsiveness and scales APIs.

Use cursor-based or offset-based pagination depending on your use case.`,
    example: `// ✅ Good
GET /users?page=3&limit=50

// 🛑 Bad
GET /users // returns 10,000 records`,
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
// No limit. Bot sends 10,000 requests in seconds.`,
    whenNot: `Internal APIs with tightly controlled access might not need rate limiting, but public-facing ones always should.`
  },
  'node-event-loop': {
    title: 'Node.js Event Loop Awareness',
    summary: 'Understanding how the event loop works allows you to write more efficient asynchronous code.',
    why: `The event loop is central to Node.js. Avoid blocking it with CPU-heavy tasks or synchronous operations, or performance will degrade.

Use async functions, avoid large sync loops, and offload heavy processing to worker threads.`,
    example: `// ✅ Good
setTimeout(() => doAsyncWork(), 0);

// 🛑 Bad
while (true) { doWork(); } // Blocks loop`,
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
const retained = document.getElementById('large'); // Stays forever`,
    whenNot: `This applies universally. There is no safe time to ignore memory management in long-lived applications.`
  },
  'lazy-hydration': {
    title: 'Lazy Hydration',
    summary: 'Defer React hydration of non-critical components on the client.',
    why: `Hydrating large pages all at once hurts Time to Interactive. Lazy hydration prioritizes critical UI, improving perceived performance.`,
    example: `// ✅ Good
<LazyHydrate whenVisible>
  <NonCriticalComponent />
</LazyHydrate>

// 🛑 Bad
Hydrate everything immediately`,
    whenNot: `Not suitable for components that must be interactive immediately.`
  },
  'prefetching': {
    title: 'Next.js Prefetching',
    summary: 'Preload pages or data the user is likely to need soon.',
    why: `Prefetching improves UX by loading pages or resources in the background before navigation occurs.`,
    example: `// ✅ Good
<Link href="/about" prefetch={true}>About</Link>

// 🛑 Bad
No prefetch, causing delay on navigation`,
    whenNot: `Prefetching excessive or unlikely pages wastes bandwidth.`
  },
  'static-assets-caching': {
    title: 'Static Assets Caching',
    summary: 'Cache static files aggressively with long expiry headers.',
    why: `Caching static assets reduces load times and server bandwidth.`,
    example: `// ✅ Good
Cache-Control: public, max-age=31536000, immutable

// 🛑 Bad
No caching or short expiry`,
    whenNot: `Avoid for assets that change frequently without versioning.`
  },
  'throttling-debouncing': {
    title: 'Throttling and Debouncing',
    summary: 'Limit the rate of expensive function calls during events like scroll or input.',
    why: `Improves performance and prevents excessive renders or network requests.`,
    example: `// ✅ Good
const debouncedFn = debounce(() => fetchData(), 300);

// 🛑 Bad
Calling fetchData on every keystroke`,
    whenNot: `Not needed for low-frequency or one-off events.`
  }
};

export default codexDetails;
