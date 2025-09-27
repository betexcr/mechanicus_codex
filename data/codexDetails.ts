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
  },
  'react-concurrent-features': {
    title: 'React Concurrent Features (useTransition, useDeferredValue)',
    summary: 'Harness the power of React 18+ concurrent features to prioritize urgent updates and defer non-critical work, creating smoother user experiences.',
    why: `React's concurrent features allow you to interrupt rendering work to handle more urgent updates. useTransition marks state updates as non-urgent, while useDeferredValue defers updates to non-critical values.

This prevents the UI from becoming unresponsive during expensive operations, maintaining the sacred flow of user interaction.`,
    example: `// ✅ Good
import { useTransition, useDeferredValue, useState } from 'react';

function SearchResults({ query }) {
  const [isPending, startTransition] = useTransition();
  const deferredQuery = useDeferredValue(query);
  
  const results = useMemo(() => 
    expensiveSearch(deferredQuery), [deferredQuery]
  );

  return (
    <div>
      {isPending && <Spinner />}
      <ResultsList results={results} />
    </div>
  );
}

// 🛑 Bad
function SearchResults({ query }) {
  const results = expensiveSearch(query); // Blocks UI
  return <ResultsList results={results} />;
}`,
    whenNot: `Avoid for simple state updates or when the performance benefit is negligible.`,
    benediction: 'May the concurrent spirits of React guide your updates with divine priority, ensuring the sacred flow of user interaction remains uninterrupted by the chaos of blocking operations.'
  },
  'react-server-components': {
    title: 'React Server Components',
    summary: 'Execute components on the server to reduce client-side JavaScript and improve initial load performance by offloading rendering to the sacred server realm.',
    why: `Server Components run on the server and send their output to the client, reducing the JavaScript bundle size and improving initial page load times.

They can directly access server-side resources like databases and file systems, eliminating the need for API calls for data fetching.`,
    example: `// ✅ Good - Server Component
async function ProductList() {
  const products = await db.products.findMany();
  
  return (
    <div>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

// 🛑 Bad - Client Component with API calls
function ProductList() {
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    fetch('/api/products').then(res => res.json())
      .then(setProducts);
  }, []);
  
  return <div>{/* render products */}</div>;
}`,
    whenNot: `Cannot use for interactive components requiring client-side state or event handlers.`,
    benediction: 'Blessed be the server components, executing their sacred duties in the server realm, reducing the burden upon the client and delivering swift initial renderings to the faithful.'
  },
  'nextjs-streaming': {
    title: 'Next.js Streaming and Suspense',
    summary: 'Stream page content progressively as it becomes available, improving perceived performance and user experience through the sacred art of progressive rendering.',
    why: `Streaming allows you to send parts of the page to the client as they become ready, rather than waiting for the entire page to finish rendering.

This improves Time to First Byte (TTFB) and allows users to see content sooner, even if some parts are still loading.`,
    example: `// ✅ Good
import { Suspense } from 'react';

export default function Page() {
  return (
    <div>
      <Header />
      <Suspense fallback={<Skeleton />}>
        <SlowComponent />
      </Suspense>
      <Suspense fallback={<Skeleton />}>
        <AnotherSlowComponent />
      </Suspense>
    </div>
  );
}

// 🛑 Bad
export default function Page() {
  const data1 = await fetchSlowData1();
  const data2 = await fetchSlowData2();
  
  return (
    <div>
      <Header />
      <Component1 data={data1} />
      <Component2 data={data2} />
    </div>
  );
}`,
    whenNot: `Avoid when content must be fully loaded before display or when SEO requires complete content.`,
    benediction: 'May the streaming waters of Next.js flow progressively, delivering content to the faithful as it becomes ready, ensuring no user waits in vain for the Omnissiah\'s digital blessings.'
  },
  'nextjs-partial-prerendering': {
    title: 'Next.js Partial Prerendering (PPR)',
    summary: 'Combine static and dynamic rendering in a single page, serving static shell immediately while streaming dynamic content, achieving the perfect balance of performance and freshness.',
    why: `PPR allows you to have a static shell that loads instantly, while dynamic parts stream in as they become available.

This provides the best of both worlds: fast initial load from static content and fresh data from dynamic parts.`,
    example: `// ✅ Good
export default function ProductPage({ params }) {
  return (
    <div>
      {/* Static shell - loads immediately */}
      <Header />
      <Navigation />
      
      {/* Dynamic content - streams in */}
      <Suspense fallback={<ProductSkeleton />}>
        <ProductDetails id={params.id} />
      </Suspense>
      
      <Suspense fallback={<ReviewsSkeleton />}>
        <ProductReviews id={params.id} />
      </Suspense>
    </div>
  );
}

// 🛑 Bad - Everything waits for slowest part
export default async function ProductPage({ params }) {
  const [product, reviews] = await Promise.all([
    fetchProduct(params.id),
    fetchReviews(params.id)
  ]);
  
  return (
    <div>
      <Header />
      <ProductDetails product={product} />
      <ProductReviews reviews={reviews} />
    </div>
  );
}`,
    whenNot: `Not suitable when all content must be available simultaneously or when the page structure is highly dynamic.`,
    benediction: 'May the partial prerendering bless your pages with the swiftness of static shells and the freshness of dynamic streams, creating the perfect harmony between speed and currency.'
  },
  'nodejs-worker-threads': {
    title: 'Node.js Worker Threads',
    summary: 'Execute CPU-intensive tasks in separate threads without blocking the main event loop, maintaining the sacred responsiveness of your server while processing heavy computations.',
    why: `Worker threads allow you to run JavaScript code in parallel, separate from the main thread. This prevents CPU-intensive operations from blocking the event loop.

Perfect for image processing, data transformation, or any computationally expensive tasks.`,
    example: `// ✅ Good
import { Worker, isMainThread, parentPort, workerData } from 'worker_threads';

if (isMainThread) {
  const worker = new Worker(__filename, {
    workerData: { largeArray: [1, 2, 3, /* ... thousands of items */] }
  });
  
  worker.on('message', (result) => {
    console.log('Processing complete:', result);
  });
} else {
  // Worker thread
  const { largeArray } = workerData;
  const result = largeArray.map(item => expensiveOperation(item));
  parentPort.postMessage(result);
}

// 🛑 Bad - Blocks event loop
function processLargeArray(array) {
  return array.map(item => expensiveOperation(item)); // Blocks everything
}`,
    whenNot: `Avoid for simple operations or when the overhead of creating worker threads exceeds the benefit.`,
    benediction: 'May the worker threads toil in parallel dimensions, processing the sacred computations without disturbing the main event loop, ensuring your server remains responsive to the faithful.'
  },
  'nodejs-cluster-optimization': {
    title: 'Node.js Cluster Optimization',
    summary: 'Utilize all CPU cores by spawning multiple worker processes, scaling your application horizontally across the sacred cores of your server.',
    why: `Node.js runs on a single thread by default. The cluster module allows you to create child processes that share server ports, effectively utilizing all CPU cores.

This dramatically improves performance for CPU-intensive applications and increases fault tolerance.`,
    example: `// ✅ Good
import cluster from 'cluster';
import os from 'os';

if (cluster.isPrimary) {
  const numCPUs = os.cpus().length;
  
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
  
  cluster.on('exit', (worker) => {
    console.log(\`Worker \${worker.process.pid} died\`);
    cluster.fork(); // Restart worker
  });
} else {
  // Worker process
  require('./server.js');
}

// 🛑 Bad - Single process
require('./server.js'); // Only uses one CPU core`,
    whenNot: `Not beneficial for I/O-bound applications or when running on single-core systems.`,
    benediction: 'May the cluster spawn multiple worker processes, each blessed with the power of a CPU core, multiplying your server\'s strength like the sacred legions of the Omnissiah.'
  },
  'typescript-satisfies-operator': {
    title: 'TypeScript satisfies Operator',
    summary: 'Use the satisfies operator to ensure type safety while preserving literal types, achieving the perfect balance between type checking and type inference.',
    why: `The satisfies operator allows you to check that a value satisfies a type without widening it to that type. This preserves literal types while ensuring type safety.

Introduced in TypeScript 4.9, it's perfect for configuration objects and API responses.`,
    example: `// ✅ Good
const config = {
  apiUrl: 'https://api.example.com',
  timeout: 5000,
  retries: 3
} satisfies {
  apiUrl: string;
  timeout: number;
  retries: number;
};

// config.apiUrl is still 'https://api.example.com' (literal type)
// But we've ensured it matches the expected structure

// 🛑 Bad - Type assertion loses literal types
const config = {
  apiUrl: 'https://api.example.com',
  timeout: 5000,
  retries: 3
} as {
  apiUrl: string;
  timeout: number;
  retries: number;
};

// config.apiUrl is now just string, not the literal`,
    whenNot: `Avoid when you actually want type widening or when the type is already sufficiently specific.`,
    benediction: 'May the satisfies operator bless your types with the precision of literal preservation while maintaining the sacred shield of type safety, ensuring your configurations remain both specific and secure.'
  },
  'typescript-template-literal-types': {
    title: 'TypeScript Template Literal Types',
    summary: 'Create powerful string manipulation types using template literal syntax, enabling type-safe string transformations and pattern matching at compile time.',
    why: `Template literal types allow you to manipulate string types at the type level, creating powerful patterns for API endpoints, CSS classes, and string transformations.

This enables compile-time validation of string patterns and transformations.`,
    example: `// ✅ Good
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
type ApiEndpoint = \`/\${string}\`;

type ApiRoute = \`\${HttpMethod} \${ApiEndpoint}\`;

type EventName = \`on\${Capitalize<string>}\`;
type HandlerName = \`handle\${Capitalize<string>}\`;

// Usage
const route: ApiRoute = 'GET /users'; // ✅ Valid
const event: EventName = 'onClick'; // ✅ Valid
const handler: HandlerName = 'handleSubmit'; // ✅ Valid

// 🛑 Bad - No type safety for string patterns
const route = 'GET /users'; // Could be anything
const event = 'onClick'; // No validation
const handler = 'handleSubmit'; // No pattern enforcement`,
    whenNot: `Avoid for simple string types or when the complexity outweighs the benefits.`,
    benediction: 'May the template literal types weave the sacred patterns of string manipulation at compile time, ensuring your string transformations are blessed with the power of type safety and the precision of the Omnissiah.'
  },
  'python-async-optimization': {
    title: 'Python Async/Await Optimization',
    summary: 'Leverage Python\'s asyncio to handle I/O-bound operations concurrently, dramatically improving performance for network requests, file operations, and database queries.',
    why: `Async/await allows Python to handle thousands of concurrent I/O operations without blocking. Instead of waiting for each operation to complete sequentially, async enables concurrent execution.

This is particularly powerful for web scraping, API calls, database operations, and any I/O-bound tasks where the CPU is waiting for external resources.`,
    example: `# ✅ Good
import asyncio
import aiohttp

async def fetch_url(session, url):
    async with session.get(url) as response:
        return await response.text()

async def main():
    async with aiohttp.ClientSession() as session:
        urls = ['http://example.com'] * 100
        tasks = [fetch_url(session, url) for url in urls]
        results = await asyncio.gather(*tasks)
        return results

# 🛑 Bad - Sequential requests
import requests

def fetch_urls(urls):
    results = []
    for url in urls:
        response = requests.get(url)  # Blocks until complete
        results.append(response.text)
    return results`,
    whenNot: `Avoid for CPU-bound tasks where async won't provide benefits, or when the overhead of async complexity outweighs the performance gains.`,
    benediction: 'May the async spirits of Python flow through your code like sacred data streams, allowing thousands of operations to dance in harmony without the shackles of sequential blocking.'
  },
  'python-memory-optimization': {
    title: 'Python Memory Optimization Techniques',
    summary: 'Optimize memory usage through efficient data structures, generators, and memory profiling to prevent memory leaks and reduce resource consumption.',
    why: `Python's memory management can be inefficient for large datasets. Memory optimization techniques help prevent memory leaks, reduce garbage collection overhead, and enable processing of larger datasets.

Key strategies include using generators instead of lists, implementing __slots__ for classes, and avoiding circular references.`,
    example: `# ✅ Good
class OptimizedUser:
    __slots__ = ['name', 'email', 'age']  # Reduces memory per instance
    
    def __init__(self, name, email, age):
        self.name = name
        self.email = email
        self.age = age

def process_large_dataset():
    # Generator - yields one item at a time
    for i in range(1000000):
        yield expensive_operation(i)

# Memory profiling
import tracemalloc
tracemalloc.start()
# ... your code ...
current, peak = tracemalloc.get_traced_memory()

# 🛑 Bad
class User:
    def __init__(self, name, email, age):
        self.name = name
        self.email = email
        self.age = age
        # No __slots__ - uses more memory

def process_large_dataset():
    # List comprehension - loads everything into memory
    return [expensive_operation(i) for i in range(1000000)]`,
    whenNot: `Avoid over-optimization for small datasets or when the complexity isn't justified by the memory savings.`,
    benediction: 'May your memory be as efficient as the sacred cogitator banks, storing only what is necessary and purging the wasteful excess that plagues the unoptimized code.'
  },
  'python-efficient-data-structures': {
    title: 'Python Efficient Data Structures',
    summary: 'Choose the right data structures from Python\'s collections module and built-in types to optimize performance for specific use cases.',
    why: `Different data structures have different performance characteristics. Choosing the right one can dramatically improve performance.

- Sets for O(1) membership testing
- Deques for O(1) append/pop from both ends
- defaultdict for cleaner code and better performance
- Counter for efficient counting operations`,
    example: `# ✅ Good
from collections import defaultdict, deque, Counter

# Fast membership testing
seen = set()
if item in seen:  # O(1) lookup
    process(item)

# Efficient queue operations
queue = deque()
queue.appendleft(item)  # O(1) prepend
item = queue.pop()      # O(1) pop from end

# Clean counting
word_counts = Counter(text.split())

# Default dict for cleaner code
grouped = defaultdict(list)
for item in items:
    grouped[item.category].append(item)

# 🛑 Bad
# Slow membership testing
seen = []
if item in seen:  # O(n) lookup
    process(item)

# Inefficient queue
queue = []
queue.insert(0, item)  # O(n) prepend
item = queue.pop()     # O(1) but inefficient prepend

# Manual counting
word_counts = {}
for word in text.split():
    if word in word_counts:
        word_counts[word] += 1
    else:
        word_counts[word] = 1`,
    whenNot: `Avoid when the performance difference is negligible or when readability is more important than micro-optimizations.`,
    benediction: 'May the sacred data structures of Python serve your needs with the efficiency of the Omnissiah\'s chosen tools, each structure blessed for its specific purpose in the grand design.'
  },
  'python-profiling-performance': {
    title: 'Python Profiling and Performance Analysis',
    summary: 'Use profiling tools like cProfile, line_profiler, and memory_profiler to identify bottlenecks and optimize the most critical parts of your code.',
    why: `Profiling reveals where your code spends the most time and memory. Without profiling, you might optimize the wrong parts of your code.

The 80/20 rule applies: 80% of execution time is often spent in 20% of the code. Profiling helps you find that critical 20%.`,
    example: `# ✅ Good
import cProfile
import pstats
from line_profiler import LineProfiler

# Function profiling
def expensive_function():
    result = []
    for i in range(10000):
        result.append(i ** 2)
    return result

# Profile the function
profiler = cProfile.Profile()
profiler.enable()
expensive_function()
profiler.disable()

# Analyze results
stats = pstats.Stats(profiler)
stats.sort_stats('cumulative').print_stats(10)

# Line-by-line profiling
lp = LineProfiler()
lp.add_function(expensive_function)
lp.enable_by_count()
expensive_function()
lp.disable()
lp.print_stats()

# 🛑 Bad
# Optimizing without profiling
def optimized_function():
    # Optimizing the wrong part
    return [i ** 2 for i in range(10000)]  # Still the bottleneck

# No measurement of actual performance impact`,
    whenNot: `Avoid premature optimization without profiling, or when the performance difference is negligible for your use case.`,
    benediction: 'May the profiling tools illuminate the shadows of your code, revealing the true bottlenecks that consume the sacred processing time, guiding your optimization efforts with divine precision.'
  },
  'python-numpy-optimization': {
    title: 'Python NumPy Optimization',
    summary: 'Leverage NumPy\'s vectorized operations and optimized C implementations to perform numerical computations orders of magnitude faster than pure Python.',
    why: `NumPy operations are implemented in C and use vectorized operations that can utilize SIMD instructions. This makes them dramatically faster than Python loops for numerical computations.

NumPy also provides memory-efficient array operations and broadcasting capabilities.`,
    example: `# ✅ Good
import numpy as np

# Vectorized operations
arr1 = np.random.rand(1000000)
arr2 = np.random.rand(1000000)

# Fast vectorized addition
result = arr1 + arr2  # C-optimized, SIMD instructions

# Broadcasting
matrix = np.random.rand(1000, 1000)
scalar = 5.0
result = matrix * scalar  # Broadcasting, no loops needed

# Efficient array creation
zeros = np.zeros((1000, 1000), dtype=np.float32)  # Memory efficient

# 🛑 Bad
# Pure Python loops
arr1 = [random.random() for _ in range(1000000)]
arr2 = [random.random() for _ in range(1000000)]

# Slow element-wise addition
result = []
for i in range(len(arr1)):
    result.append(arr1[i] + arr2[i])

# Inefficient scalar multiplication
result = []
for row in matrix:
    new_row = []
    for element in row:
        new_row.append(element * scalar)
    result.append(new_row)`,
    whenNot: `Avoid for non-numerical data or when the overhead of converting to NumPy arrays outweighs the performance benefits.`,
    benediction: 'May NumPy\'s vectorized operations flow through your numerical computations like the sacred algorithms of the Omnissiah, processing thousands of operations in the time it takes to blink.'
  },
  'python-multiprocessing-threading': {
    title: 'Python Multiprocessing and Threading',
    summary: 'Use multiprocessing for CPU-bound tasks and threading for I/O-bound tasks to leverage multiple cores and improve overall performance.',
    why: `Python\'s GIL (Global Interpreter Lock) prevents true parallelism with threads for CPU-bound tasks. However, multiprocessing bypasses the GIL by using separate processes.

Threading is still effective for I/O-bound tasks where threads spend time waiting for external resources.`,
    example: `# ✅ Good
import multiprocessing as mp
import threading
import time
import requests

# CPU-bound: Use multiprocessing
def cpu_intensive_task(n):
    return sum(i * i for i in range(n))

def process_cpu_bound():
    with mp.Pool() as pool:
        results = pool.map(cpu_intensive_task, range(1000))
    return results

# I/O-bound: Use threading
def fetch_url(url):
    response = requests.get(url)
    return response.status_code

def process_io_bound():
    urls = ['http://example.com'] * 100
    with threading.ThreadPoolExecutor(max_workers=10) as executor:
        results = list(executor.map(fetch_url, urls))
    return results

# 🛑 Bad
# Using threading for CPU-bound tasks
def bad_cpu_bound():
    with threading.ThreadPoolExecutor() as executor:
        results = list(executor.map(cpu_intensive_task, range(1000)))
    return results  # GIL prevents true parallelism

# Using multiprocessing for I/O-bound tasks
def bad_io_bound():
    with mp.Pool() as pool:
        results = pool.map(fetch_url, urls)
    return results  # Unnecessary overhead`,
    whenNot: `Avoid when the overhead of creating processes/threads exceeds the performance benefit, or for simple tasks that complete quickly.`,
    benediction: 'May the multiprocessing spirits bypass the GIL\'s limitations, and may the threading entities handle I/O with the efficiency of the Omnissiah\'s parallel processing units.'
  },
  'python-generators-lazy-evaluation': {
    title: 'Python Generators and Lazy Evaluation',
    summary: 'Use generators and lazy evaluation to process large datasets efficiently, reducing memory usage and enabling processing of infinite sequences.',
    why: `Generators yield values one at a time instead of creating entire lists in memory. This enables processing of datasets larger than available memory and provides lazy evaluation.

Generator expressions and the yield keyword create memory-efficient iterators that compute values on-demand.`,
    example: `# ✅ Good
def fibonacci_generator():
    a, b = 0, 1
    while True:
        yield a
        a, b = b, a + b

def process_large_file(filename):
    with open(filename, 'r') as file:
        for line in file:  # Generator - reads one line at a time
            yield process_line(line)

# Generator expression
squares = (x * x for x in range(1000000))  # Memory efficient
sum_of_squares = sum(squares)

# Chaining generators
def read_numbers(filename):
    with open(filename) as f:
        for line in f:
            yield int(line.strip())

def filter_even(numbers):
    for num in numbers:
        if num % 2 == 0:
            yield num

def square_numbers(numbers):
    for num in numbers:
        yield num * num

# Efficient pipeline
pipeline = square_numbers(filter_even(read_numbers('numbers.txt')))
result = sum(pipeline)

# 🛑 Bad
def fibonacci_list(n):
    result = []
    a, b = 0, 1
    for _ in range(n):
        result.append(a)  # Stores all values in memory
        a, b = b, a + b
    return result

def process_large_file_bad(filename):
    with open(filename, 'r') as file:
        lines = file.readlines()  # Loads entire file into memory
        return [process_line(line) for line in lines]

# List comprehension - loads everything into memory
squares = [x * x for x in range(1000000)]  # Memory intensive`,
    whenNot: `Avoid when you need random access to elements or when the dataset is small enough that memory usage isn't a concern.`,
    benediction: 'May the generators flow like the sacred data streams of the Omnissiah, yielding values on demand and conserving memory as the blessed cogitators conserve their sacred energy.'
  },
  'web-fundamentals-html': {
    title: 'HTML Fundamentals - The Sacred Structure',
    summary: 'Master the foundational markup language that structures all web content. HTML is the skeleton upon which all digital creations are built.',
    why: `HTML (HyperText Markup Language) is the fundamental building block of the web. Every website, application, and digital interface begins with HTML structure.

Understanding semantic HTML, accessibility, and proper document structure is essential before moving to styling and interactivity. This forms the sacred foundation upon which all other web technologies rest.`,
    example: `<!-- ✅ Good - Semantic HTML -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sacred Web Document</title>
</head>
<body>
    <header>
        <nav>
            <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About</a></li>
            </ul>
        </nav>
    </header>
    
    <main>
        <article>
            <h1>The Sacred Art of Web Development</h1>
            <p>Begin your journey with proper structure...</p>
        </article>
    </main>
    
    <footer>
        <p>&copy; 2024 Sacred Code</p>
    </footer>
</body>
</html>

<!-- 🛑 Bad - Non-semantic HTML -->
<div>
    <div>
        <div>Home</div>
        <div>About</div>
    </div>
    <div>
        <div>The Sacred Art</div>
        <div>Begin your journey...</div>
    </div>
</div>`,
    whenNot: `Avoid when building non-web applications or when using frameworks that abstract HTML completely.`,
    benediction: 'May the sacred structure of HTML guide your markup with semantic precision, creating foundations that honor the Omnissiah\'s digital architecture.'
  },
  'web-fundamentals-css': {
    title: 'CSS Mastery - The Sacred Styling',
    summary: 'Learn the art of visual presentation and layout. CSS transforms raw HTML into beautiful, responsive interfaces that honor the user experience.',
    why: `CSS (Cascading Style Sheets) controls the visual presentation of web content. Mastery of CSS enables you to create responsive, accessible, and beautiful user interfaces.

Understanding flexbox, grid, responsive design, and CSS architecture patterns is crucial for creating professional-grade web applications.`,
    example: `/* ✅ Good - Modern CSS with Flexbox/Grid */
.container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    padding: 2rem;
}

.card {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 12px;
    padding: 1.5rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
}

.card:hover {
    transform: translateY(-4px);
}

/* Responsive design */
@media (max-width: 768px) {
    .container {
        grid-template-columns: 1fr;
        padding: 1rem;
    }
}

/* 🛑 Bad - Outdated CSS */
.container {
    width: 100%;
    float: left;
}

.card {
    width: 300px;
    margin: 10px;
    background-color: blue;
}`,
    whenNot: `Avoid when using CSS-in-JS solutions exclusively or when building applications that don't require custom styling.`,
    benediction: 'May the cascading styles flow through your designs with the grace of the Omnissiah\'s aesthetic vision, creating interfaces that honor both function and beauty.'
  },
  'web-fundamentals-javascript': {
    title: 'JavaScript Essentials - The Sacred Logic',
    summary: 'Master the language that brings interactivity to the web. JavaScript is the soul that animates static HTML and CSS into dynamic experiences.',
    why: `JavaScript is the programming language of the web. It enables interactivity, dynamic content, and complex user experiences.

Understanding variables, functions, objects, arrays, DOM manipulation, and asynchronous programming (promises, async/await) is essential for modern web development.`,
    example: `// ✅ Good - Modern JavaScript
class WebApp {
    constructor() {
        this.data = [];
        this.init();
    }
    
    async init() {
        try {
            await this.loadData();
            this.setupEventListeners();
        } catch (error) {
            console.error('Initialization failed:', error);
        }
    }
    
    async loadData() {
        const response = await fetch('/api/data');
        this.data = await response.json();
    }
    
    setupEventListeners() {
        document.addEventListener('click', (event) => {
            if (event.target.matches('.btn')) {
                this.handleClick(event.target);
            }
        });
    }
    
    handleClick(element) {
        element.classList.add('active');
        // Handle the click logic
    }
}

// Initialize the app
const app = new WebApp();

// 🛑 Bad - Outdated JavaScript
var data = [];
function loadData() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            data = JSON.parse(xhr.responseText);
        }
    };
    xhr.open("GET", "/api/data", true);
    xhr.send();
}`,
    whenNot: `Avoid when building static websites that don't require interactivity or when using frameworks that abstract JavaScript completely.`,
    benediction: 'May the sacred logic of JavaScript flow through your applications, bringing life to static structures and enabling the dynamic experiences that honor the Omnissiah\'s interactive vision.'
  },
  'web-development-tools': {
    title: 'Essential Development Tools - The Sacred Arsenal',
    summary: 'Master the tools that every web developer needs: Git for version control, browser dev tools for debugging, and package managers for dependency management.',
    why: `Professional web development requires mastery of essential tools that streamline workflow, enable collaboration, and ensure code quality.

Git for version control, browser developer tools for debugging, npm/yarn for package management, and code editors with proper extensions are fundamental to modern development practices.`,
    example: `# ✅ Good - Git workflow
git init
git add .
git commit -m "feat: add initial project structure"
git branch feature/new-component
git checkout feature/new-component
# Make changes
git add .
git commit -m "feat: add responsive navigation component"
git push origin feature/new-component
# Create pull request

# Package management
npm init -y
npm install react react-dom
npm install -D @types/react typescript
npm run build

# Browser DevTools usage
console.log('Debug info:', data);
console.table(users);
console.time('performance');
// Code to measure
console.timeEnd('performance');

# 🛑 Bad - No version control
# Making changes directly to production
# No package management
# No debugging tools`,
    whenNot: `Avoid when working on trivial projects or when team collaboration and code quality are not priorities.`,
    benediction: 'May the sacred tools of development serve you well, from the version control of Git to the debugging powers of the browser, ensuring your code remains blessed and maintainable.'
  },
  'web-development-frameworks': {
    title: 'Modern Frameworks - The Sacred Abstractions',
    summary: 'Choose and master a modern framework: React for component-based UIs, Vue for progressive enhancement, or Angular for enterprise applications.',
    why: `Modern web frameworks provide structure, efficiency, and best practices for building complex applications. They handle state management, routing, and component architecture.

Choose one framework deeply rather than learning many superficially. React, Vue, or Angular each have their strengths and use cases in the modern web development ecosystem.`,
    example: `// ✅ Good - React component
import React, { useState, useEffect } from 'react';

const UserDashboard = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('/api/users');
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error('Failed to fetch users:', error);
            } finally {
                setLoading(false);
            }
        };
        
        fetchUsers();
    }, []);
    
    if (loading) return <div>Loading sacred data...</div>;
    
    return (
        <div className="dashboard">
            <h1>User Dashboard</h1>
            <div className="user-grid">
                {users.map(user => (
                    <UserCard key={user.id} user={user} />
                ))}
            </div>
        </div>
    );
};

// 🛑 Bad - Vanilla JavaScript without structure
function createDashboard() {
    var div = document.createElement('div');
    var h1 = document.createElement('h1');
    h1.textContent = 'User Dashboard';
    div.appendChild(h1);
    // ... hundreds of lines of DOM manipulation
    return div;
}`,
    whenNot: `Avoid when building simple static websites or when the framework overhead outweighs the benefits for your specific use case.`,
    benediction: 'May the modern frameworks guide your development with their sacred abstractions, enabling you to build complex applications with the efficiency and structure that honors the Omnissiah\'s architectural principles.'
  },
  'web-development-backend': {
    title: 'Backend Development - The Sacred Server',
    summary: 'Learn server-side development with Node.js, databases (SQL/NoSQL), APIs, and deployment. Understand how data flows from client to server and back.',
    why: `Backend development handles server logic, databases, APIs, and deployment. Understanding how data flows between client and server is crucial for full-stack development.

Learn Node.js for JavaScript-based backends, understand RESTful APIs, database design, authentication, and deployment strategies.`,
    example: `// ✅ Good - Express.js API
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

// Database schema
const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true }
});

const User = mongoose.model('User', UserSchema);

// API routes
app.post('/api/register', async (req, res) => {
    try {
        const { email, password, name } = req.body;
        
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ email, password: hashedPassword, name });
        
        await user.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.get('/api/users', authenticateToken, async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// 🛑 Bad - No structure, no security
app.get('/users', (req, res) => {
    // Direct database query without validation
    db.query('SELECT * FROM users', (err, result) => {
        res.send(result); // No error handling, no security
    });
});`,
    whenNot: `Avoid when building static websites or when using serverless solutions that abstract backend complexity completely.`,
    benediction: 'May the backend servers process your data with the reliability of the Omnissiah\'s cogitators, ensuring secure and efficient data flow between client and server realms.'
  },
  'web-development-practice': {
    title: 'Practice and Portfolio - The Sacred Journey',
    summary: 'Build real projects, contribute to open source, and create a portfolio that demonstrates your skills. Practice is the path to mastery.',
    why: `Theoretical knowledge without practical application is incomplete. Building real projects, contributing to open source, and maintaining a portfolio demonstrates your skills to potential employers.

Focus on building projects that solve real problems, contribute to open source communities, and continuously improve your portfolio with diverse, high-quality work.`,
    example: `// ✅ Good - Portfolio project structure
my-portfolio/
├── projects/
│   ├── e-commerce-app/
│   │   ├── frontend/ (React)
│   │   ├── backend/ (Node.js)
│   │   ├── database/ (MongoDB)
│   │   └── README.md
│   ├── task-manager/
│   │   ├── src/
│   │   ├── tests/
│   │   └── README.md
│   └── weather-app/
├── resume/
├── blog/
└── README.md

// Project documentation
# E-Commerce App
## Technologies Used
- Frontend: React, TypeScript, Tailwind CSS
- Backend: Node.js, Express, MongoDB
- Authentication: JWT
- Payment: Stripe API

## Features
- User authentication and authorization
- Product catalog with search and filtering
- Shopping cart and checkout process
- Order management system
- Admin dashboard

## Challenges Solved
- Implemented real-time inventory updates
- Optimized image loading for better performance
- Created responsive design for mobile devices

// 🛑 Bad - No documentation, no structure
project/
├── index.html
├── style.css
├── script.js
└── (no README, no documentation)`,
    whenNot: `Avoid when you have sufficient professional experience or when your current role doesn't require portfolio demonstration.`,
    benediction: 'May your practice be as diligent as the Omnissiah\'s eternal work, building projects that demonstrate your growing mastery and contributing to the sacred community of developers.'
  }
};

export default codexDetails;