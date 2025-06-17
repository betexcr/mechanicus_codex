(()=>{var e={};e.id=405,e.ids=[405,888,660],e.modules={1420:(e,t,o)=>{"use strict";o.a(e,async(e,n)=>{try{o.r(t),o.d(t,{config:()=>y,default:()=>p,getServerSideProps:()=>h,getStaticPaths:()=>f,getStaticProps:()=>m,reportWebVitals:()=>g,routeModule:()=>P,unstable_getServerProps:()=>x,unstable_getServerSideProps:()=>C,unstable_getStaticParams:()=>w,unstable_getStaticPaths:()=>b,unstable_getStaticProps:()=>v});var r=o(7093),a=o(5244),s=o(1323),i=o(1777),l=o.n(i),u=o(1484),c=o(4579),d=e([c]);c=(d.then?(await d)():d)[0];let p=(0,s.l)(c,"default"),m=(0,s.l)(c,"getStaticProps"),f=(0,s.l)(c,"getStaticPaths"),h=(0,s.l)(c,"getServerSideProps"),y=(0,s.l)(c,"config"),g=(0,s.l)(c,"reportWebVitals"),v=(0,s.l)(c,"unstable_getStaticProps"),b=(0,s.l)(c,"unstable_getStaticPaths"),w=(0,s.l)(c,"unstable_getStaticParams"),x=(0,s.l)(c,"unstable_getServerProps"),C=(0,s.l)(c,"unstable_getServerSideProps"),P=new r.PagesRouteModule({definition:{kind:a.x.PAGES,page:"/index",pathname:"/",bundlePath:"",filename:""},components:{App:u.default,Document:l()},userland:c});n()}catch(e){n(e)}})},4008:(e,t,o)=>{"use strict";o.d(t,{Z:()=>n});let n={"react-memo":{title:"React.memo",summary:"Prevents unnecessary re-renders of functional components by memoizing the result unless props change.",why:`React.memo is useful when a component renders the same output given the same props. It uses shallow comparison to detect prop changes. This is effective for performance-critical components that re-render often unnecessarily.

Use cases include UI controls, status indicators, or list items receiving stable props.`,example:`// ✅ Good
const MemoizedBtn = React.memo(function Button({ onClick, label }) {
  return <button onClick={onClick}>{label}</button>;
});

// 🛑 Bad
const Timer = React.memo(({ time }) => <p>{time}</p>); // Renders anyway because props change every tick.`,whenNot:`Don't use React.memo if:
- The component is already very lightweight.
- Props change on every render (e.g., timestamps).
- The shallow compare doesn't offer benefits.`},"node-event-loop":{title:"Node.js Event Loop Awareness",summary:"Understanding how the event loop works allows you to write more efficient asynchronous code.",why:`The event loop is central to Node.js. Avoid blocking it with CPU-heavy tasks or synchronous operations, or performance will degrade.

Use async functions, avoid large sync loops, and offload heavy processing to worker threads.`,example:`// ✅ Good
setTimeout(() => doAsyncWork(), 0);

// 🛑 Bad
while (true) { doWork(); } // Blocks loop`,whenNot:"You may not need to optimize for the event loop if your app is primarily I/O-bound with minimal CPU work."},"js-memory-leaks":{title:"Avoid JavaScript Memory Leaks",summary:"Leaks happen when memory is retained unnecessarily. Clean up references, listeners, and timers.",why:`Memory leaks accumulate over time and degrade performance. Common causes include unremoved event listeners and global references.

Use tools like Chrome DevTools, weak references, and be mindful of closures.`,example:`// ✅ Good
componentWillUnmount() {
  window.removeEventListener('resize', this.handler);
}

// 🛑 Bad
const retained = document.getElementById('large'); // Stays forever`,whenNot:"This applies universally. There is no safe time to ignore memory management in long-lived applications."},"api-pagination":{title:"API Pagination",summary:"Never return unbounded data. Always paginate large results from your API.",why:`Unbounded queries cause huge payloads, long load times, and excessive memory use. Pagination improves responsiveness and scales APIs.

Use cursor-based or offset-based pagination depending on your use case.`,example:`// ✅ Good
GET /users?page=3&limit=50

// 🛑 Bad
GET /users // returns 10,000 records`,whenNot:"Pagination can be avoided only when the dataset is guaranteed to be tiny and infrequently accessed."},"api-rate-limiting":{title:"API Rate Limiting",summary:"Limit requests to prevent abuse and protect server resources.",why:`Rate limiting mitigates DDoS, protects your infra, and ensures fair access. You can limit by IP, user ID, or token.

Use libraries like express-rate-limit or middleware at the API Gateway level.`,example:`// ✅ Good
rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });

// 🛑 Bad
// No limit. Bot sends 10,000 requests in seconds.`,whenNot:"Internal APIs with tightly controlled access might not need rate limiting, but public-facing ones always should."},"code-splitting":{title:"Code Splitting (Dynamic Imports)",summary:"Split bundles to reduce initial load time.",why:`Large bundles slow down the time-to-interactive for users. Splitting non-critical parts of your app into separate chunks allows the browser to load what's necessary first.

Next.js supports this natively via dynamic import().`,example:`// ✅ Good
const HeavyComponent = dynamic(() => import('../HeavyComponent'));

// 🛑 Bad
import HeavyComponent from '../HeavyComponent'; // always loads it up front`,whenNot:"Avoid dynamic imports for small, frequently used components, as the overhead may outweigh the benefits."},"useMemo-useCallback":{title:"useMemo and useCallback",summary:"Memoize functions and values to avoid unnecessary re-creation.",why:`These hooks help avoid unnecessary computation or function identity changes that could trigger re-renders.

They're especially useful when passing props to memoized components.`,example:`// ✅ Good
const memoizedFn = useCallback(() => doSomething(), []);

// 🛑 Bad
const fn = () => doSomething(); // causes re-render every time`,whenNot:`Avoid overusing these hooks. Only memoize if there’s a measurable performance impact.`},"image-optimization":{title:"Image Optimization",summary:"Use Next.js <Image> component for optimal performance.",why:`Large images significantly slow down page load. Next.js' <Image> supports lazy loading, compression, and resizing.

Always provide width and height to reduce layout shifts.`,example:`// ✅ Good
<Image src="/hero.jpg" width={500} height={300} alt="Hero" />

// 🛑 Bad
<img src="/hero.jpg" /> // No optimization`,whenNot:"Avoid it for icons or tiny assets where optimization overhead may not be worth it."},"lazy-loading":{title:"Lazy Loading Components",summary:"Load components only when needed to reduce initial bundle size.",why:`Lazy loading delays loading non-critical parts of the UI until they are needed, improving initial load times and reducing memory use.

Use React.lazy or Next.js dynamic imports with suspense.`,example:`// ✅ Good
const LazyComp = React.lazy(() => import('./LazyComp'));

// 🛑 Bad
import LazyComp from './LazyComp'; // loads upfront`,whenNot:"Do not lazy load components that are visible immediately, as it may cause layout shifts or flickers."},"prefetching-data":{title:"Prefetching Data",summary:"Load data in advance to improve perceived performance.",why:`Fetching data before it is strictly needed (e.g., on hover or route prefetch) results in faster transitions and better UX.

Next.js supports route prefetching natively.`,example:`// ✅ Good
<Link href="/details" prefetch={true}>Details</Link>

// 🛑 Bad
No prefetch, data loads only after navigation causing delays.`,whenNot:"Avoid prefetching huge datasets or when network bandwidth is constrained."},"debounce-throttle":{title:"Debounce and Throttle Events",summary:"Limit how often expensive functions run in response to frequent events.",why:"Events like scroll, resize, or input can fire many times per second. Debouncing or throttling reduces computation overhead and prevents UI jank.",example:`// ✅ Good
const debouncedSearch = debounce(() => search(query), 300);

// 🛑 Bad
const searchOnInput = () => search(query); // triggers on every keystroke`,whenNot:"For infrequent or user-critical immediate responses, debounce may degrade UX."},"web-worker-usage":{title:"Use Web Workers for Heavy Computations",summary:"Offload CPU-intensive tasks to background threads.",why:"Heavy computations block the main thread causing UI freezes. Web Workers run in parallel and keep UI responsive.",example:`// ✅ Good
const worker = new Worker('heavyTask.js');

// 🛑 Bad
function heavyTask() {
  while(true) {} // freezes UI`,whenNot:"Not needed for lightweight or infrequent tasks where thread overhead is unjustified."},"ssr-caching":{title:"SSR Caching Strategies",summary:"Cache server-side rendered pages or data to speed up responses.",why:"Caching reduces server load and decreases latency by avoiding repeated expensive renders or data fetches.",example:`// ✅ Good
getStaticProps with revalidate: 60;

// 🛑 Bad
No caching, every request hits the server anew`,whenNot:"Avoid caching for highly dynamic data requiring real-time accuracy."},"bundle-analyzing":{title:"Bundle Analyzing",summary:"Analyze and optimize JavaScript bundle size.",why:"Understanding bundle contents helps identify and remove bloat, improving load times.",example:`// ✅ Good
Using webpack-bundle-analyzer to inspect sizes.

// 🛑 Bad
Blindly importing large libs increases bundle size unnecessarily.`,whenNot:"Regular analysis is beneficial; skipping it is heresy to optimization."},"critical-css":{title:"Critical CSS Extraction",summary:"Inline above-the-fold CSS to speed up first paint.",why:"Inlining critical CSS reduces render-blocking resources, improving perceived load speed.",example:`// ✅ Good
Using Next.js built-in CSS support or tools like Critical for extraction.

// 🛑 Bad
Loading full CSS asynchronously causing FOUC.`,whenNot:"Complex CSS may be too large to inline efficiently."},"http2-multiplexing":{title:"HTTP/2 Multiplexing",summary:"Serve multiple assets over a single connection for faster loads.",why:"HTTP/2 allows simultaneous requests reducing load time and overhead compared to HTTP/1.1.",example:`// ✅ Good
Hosting assets on HTTP/2 enabled servers.

// 🛑 Bad
Using HTTP/1.1 and multiple connections slows loading.`,whenNot:"Legacy environments or unsupported servers negate benefits."}}},3412:(e,t)=>{"use strict";var o;Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var o in t)Object.defineProperty(e,o,{enumerable:!0,get:t[o]})}(t,{PrefetchKind:function(){return o},ACTION_REFRESH:function(){return n},ACTION_NAVIGATE:function(){return r},ACTION_RESTORE:function(){return a},ACTION_SERVER_PATCH:function(){return s},ACTION_PREFETCH:function(){return i},ACTION_FAST_REFRESH:function(){return l},ACTION_SERVER_ACTION:function(){return u},isThenable:function(){return c}});let n="refresh",r="navigate",a="restore",s="server-patch",i="prefetch",l="fast-refresh",u="server-action";function c(e){return e&&("object"==typeof e||"function"==typeof e)&&"function"==typeof e.then}(function(e){e.AUTO="auto",e.FULL="full",e.TEMPORARY="temporary"})(o||(o={})),("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},6504:(e,t,o)=>{"use strict";function n(e,t,o,n){return!1}Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"getDomainLocale",{enumerable:!0,get:function(){return n}}),o(282),("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},3480:(e,t,o)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return v}});let n=o(167),r=o(997),a=n._(o(6689)),s=o(7950),i=o(7229),l=o(6982),u=o(6921),c=o(7727),d=o(5469),p=o(7443),m=o(1722),f=o(6504),h=o(634),y=o(3412);function g(e){return"string"==typeof e?e:(0,l.formatUrl)(e)}let v=a.default.forwardRef(function(e,t){let o,n;let{href:l,as:v,children:b,prefetch:w=null,passHref:x,replace:C,shallow:P,scroll:k,locale:S,onClick:j,onMouseEnter:T,onTouchStart:N,legacyBehavior:_=!1,...A}=e;o=b,_&&("string"==typeof o||"number"==typeof o)&&(o=(0,r.jsx)("a",{children:o}));let I=a.default.useContext(d.RouterContext),z=a.default.useContext(p.AppRouterContext),O=null!=I?I:z,R=!I,L=!1!==w,U=null===w?y.PrefetchKind.AUTO:y.PrefetchKind.FULL,{href:E,as:M}=a.default.useMemo(()=>{if(!I){let e=g(l);return{href:e,as:v?g(v):e}}let[e,t]=(0,s.resolveHref)(I,l,!0);return{href:e,as:v?(0,s.resolveHref)(I,v):t||e}},[I,l,v]),B=a.default.useRef(E),G=a.default.useRef(M);_&&(n=a.default.Children.only(o));let H=_?n&&"object"==typeof n&&n.ref:t,[q,D,F]=(0,m.useIntersection)({rootMargin:"200px"}),W=a.default.useCallback(e=>{(G.current!==M||B.current!==E)&&(F(),G.current=M,B.current=E),q(e),H&&("function"==typeof H?H(e):"object"==typeof H&&(H.current=e))},[M,H,E,F,q]);a.default.useEffect(()=>{},[M,E,D,S,L,null==I?void 0:I.locale,O,R,U]);let K={ref:W,onClick(e){_||"function"!=typeof j||j(e),_&&n.props&&"function"==typeof n.props.onClick&&n.props.onClick(e),O&&!e.defaultPrevented&&function(e,t,o,n,r,s,l,u,c){let{nodeName:d}=e.currentTarget;if("A"===d.toUpperCase()&&(function(e){let t=e.currentTarget.getAttribute("target");return t&&"_self"!==t||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||e.nativeEvent&&2===e.nativeEvent.which}(e)||!c&&!(0,i.isLocalURL)(o)))return;e.preventDefault();let p=()=>{let e=null==l||l;"beforePopState"in t?t[r?"replace":"push"](o,n,{shallow:s,locale:u,scroll:e}):t[r?"replace":"push"](n||o,{scroll:e})};c?a.default.startTransition(p):p()}(e,O,E,M,C,P,k,S,R)},onMouseEnter(e){_||"function"!=typeof T||T(e),_&&n.props&&"function"==typeof n.props.onMouseEnter&&n.props.onMouseEnter(e)},onTouchStart(e){_||"function"!=typeof N||N(e),_&&n.props&&"function"==typeof n.props.onTouchStart&&n.props.onTouchStart(e)}};if((0,u.isAbsoluteUrl)(M))K.href=M;else if(!_||x||"a"===n.type&&!("href"in n.props)){let e=void 0!==S?S:null==I?void 0:I.locale,t=(null==I?void 0:I.isLocaleDomain)&&(0,f.getDomainLocale)(M,e,null==I?void 0:I.locales,null==I?void 0:I.domainLocales);K.href=t||(0,h.addBasePath)((0,c.addLocale)(M,e,null==I?void 0:I.defaultLocale))}return _?a.default.cloneElement(n,K):(0,r.jsx)("a",{...A,...K,children:o})});("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},1722:(e,t,o)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"useIntersection",{enumerable:!0,get:function(){return l}});let n=o(6689),r=o(9126),a="function"==typeof IntersectionObserver,s=new Map,i=[];function l(e){let{rootRef:t,rootMargin:o,disabled:l}=e,u=l||!a,[c,d]=(0,n.useState)(!1),p=(0,n.useRef)(null),m=(0,n.useCallback)(e=>{p.current=e},[]);return(0,n.useEffect)(()=>{if(a){if(u||c)return;let e=p.current;if(e&&e.tagName)return function(e,t,o){let{id:n,observer:r,elements:a}=function(e){let t;let o={root:e.root||null,margin:e.rootMargin||""},n=i.find(e=>e.root===o.root&&e.margin===o.margin);if(n&&(t=s.get(n)))return t;let r=new Map;return t={id:o,observer:new IntersectionObserver(e=>{e.forEach(e=>{let t=r.get(e.target),o=e.isIntersecting||e.intersectionRatio>0;t&&o&&t(o)})},e),elements:r},i.push(o),s.set(o,t),t}(o);return a.set(e,t),r.observe(e),function(){if(a.delete(e),r.unobserve(e),0===a.size){r.disconnect(),s.delete(n);let e=i.findIndex(e=>e.root===n.root&&e.margin===n.margin);e>-1&&i.splice(e,1)}}}(e,e=>e&&d(e),{root:null==t?void 0:t.current,rootMargin:o})}else if(!c){let e=(0,r.requestIdleCallback)(()=>d(!0));return()=>(0,r.cancelIdleCallback)(e)}},[u,o,t,c,p.current]),[m,c,(0,n.useCallback)(()=>{d(!1)},[])]}("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},1484:(e,t,o)=>{"use strict";o.r(t),o.d(t,{default:()=>r});var n=o(997);function r({Component:e,pageProps:t}){return n.jsx(e,{...t})}o(6764)},4579:(e,t,o)=>{"use strict";o.a(e,async(e,n)=>{try{o.r(t),o.d(t,{default:()=>d,getStaticProps:()=>c});var r=o(997),a=o(1664),s=o.n(a),i=o(6197),l=o(4008),u=e([i]);async function c(){return{props:{optimizations:Object.entries(l.Z).map(([e,t])=>({slug:e,title:t.title,summary:t.summary}))}}}function d({optimizations:e}){return(0,r.jsxs)("div",{className:"min-h-screen bg-black text-red-200 p-8 font-mono",children:[r.jsx("h1",{className:"text-4xl font-bold text-center mb-12 text-red-500 drop-shadow-xl",children:"⚙️ React & Next.js Optimization Codex ⚙️"}),r.jsx("div",{className:"grid md:grid-cols-2 lg:grid-cols-3 gap-6",children:e.map(({title:e,summary:t,slug:o})=>{let n=Array.isArray(o)?o[0]:o??"";return r.jsx(i.motion.div,{whileHover:{scale:1.02},whileTap:{scale:.98},transition:{duration:.2},className:"bg-gray-900 border border-red-800 p-6 rounded-2xl shadow-lg hover:shadow-red-600/40 transition-all cursor-pointer",children:(0,r.jsxs)(s(),{href:`/codex/${n}`,className:"block",children:[r.jsx("h2",{className:"text-xl font-semibold text-red-400 mb-2 underline underline-offset-4",children:e}),r.jsx("p",{className:"text-sm text-gray-300",children:t})]})},n)})})]})}i=(u.then?(await u)():u)[0],n()}catch(e){n(e)}})},6764:()=>{},7443:(e,t,o)=>{"use strict";e.exports=o(7093).vendored.contexts.AppRouterContext},1664:(e,t,o)=>{e.exports=o(3480)},2785:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/pages.runtime.prod.js")},6689:e=>{"use strict";e.exports=require("react")},997:e=>{"use strict";e.exports=require("react/jsx-runtime")},6197:e=>{"use strict";e.exports=import("framer-motion")},1017:e=>{"use strict";e.exports=require("path")}};var t=require("../webpack-runtime.js");t.C(e);var o=e=>t(t.s=e),n=t.X(0,[777,460],()=>o(1420));module.exports=n})();