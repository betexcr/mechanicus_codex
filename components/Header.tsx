import Link from 'next/link';
import { useRouter } from 'next/router';
import codexDetails from '../data/codexDetails';
import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Menu, X, ChevronRight, Home } from 'lucide-react';

// Technology categories based on the codex content
const technologyCategories = {
  'React': [
    'react-memo',
    'usememo-usecallback', 
    'lazy-loading',
    'virtualization',
    'lazy-hydration',
    'error-boundaries',
    'react-concurrent-features',
    'react-server-components'
  ],
  'Next.js': [
    'code-splitting',
    'image-optimization',
    'ssr-caching',
    'static-generation',
    'prefetching',
    'static-assets-caching',
    'nextjs-streaming',
    'nextjs-partial-prerendering'
  ],
  'Performance': [
    'throttling-debouncing',
    'use-swr',
    'bundle-analyzer'
  ],
  'Node.js': [
    'api-pagination',
    'api-rate-limiting',
    'node-event-loop',
    'js-memory-leaks',
    'serverless-architecture',
    'nodejs-worker-threads',
    'nodejs-cluster-optimization'
  ],
  'TypeScript': [
    'typescript-strictness',
    'typescript-satisfies-operator',
    'typescript-template-literal-types'
  ],
  'Python': [
    'python-async-optimization',
    'python-memory-optimization',
    'python-efficient-data-structures',
    'python-profiling-performance',
    'python-numpy-optimization',
    'python-multiprocessing-threading',
    'python-generators-lazy-evaluation'
  ],
  'Web Development Basics': [
    'web-fundamentals-html',
    'web-fundamentals-css',
    'web-fundamentals-javascript',
    'web-development-tools',
    'web-development-frameworks',
    'web-development-backend',
    'web-development-practice'
  ]
};

export default function Header() {
  const router = useRouter();
  const currentSlug = Array.isArray(router.query.slug)
    ? router.query.slug[0]
    : router.query.slug ?? '';

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [breadcrumbHover, setBreadcrumbHover] = useState<string | null>(null);
  const dropdownRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const breadcrumbRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      
      // Don't close if clicking on a link inside the dropdown
      if (target.closest('a')) {
        return;
      }
      
      // Only close main navigation dropdowns on click outside
      Object.values(dropdownRefs.current).forEach(ref => {
        if (ref && !ref.contains(target)) {
          setOpenDropdown(null);
        }
      });

      // Don't close breadcrumb dropdowns on click - they're hover-only
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setOpenDropdown(null);
    setBreadcrumbHover(null);
  }, [router.asPath]);

  const toggleDropdown = (category: string) => {
    setOpenDropdown(openDropdown === category ? null : category);
  };

  const handleBreadcrumbHover = (category: string) => {
    setBreadcrumbHover(category);
  };

  const handleBreadcrumbLeave = () => {
    setBreadcrumbHover(null);
  };

  const isActive = (slug: string) => slug === currentSlug;

  // Get current technology category and page info for breadcrumbs
  const getCurrentTechInfo = () => {
    if (!currentSlug) return null;
    
    for (const [category, slugs] of Object.entries(technologyCategories)) {
      if (slugs.includes(currentSlug)) {
        const data = codexDetails[currentSlug];
        return {
          category,
          title: data?.title || currentSlug,
          slug: currentSlug
        };
      }
    }
    return null;
  };

  const currentTechInfo = getCurrentTechInfo();

  return (
    <header className="bg-black border-b border-red-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        {currentTechInfo && (
          <div className="py-2 border-b border-red-800/50">
            <nav className="flex items-center space-x-2 text-sm text-gray-400">
              <Link href="/" className="flex items-center hover:text-red-400 transition-colors">
                <Home size={14} className="mr-1" />
                Home
              </Link>
              <ChevronRight size={14} />
              <div 
                className="relative"
                ref={el => breadcrumbRefs.current[currentTechInfo.category] = el}
                onMouseEnter={() => handleBreadcrumbHover(currentTechInfo.category)}
                onMouseLeave={handleBreadcrumbLeave}
              >
                <span className="text-red-400 font-medium cursor-pointer hover:text-red-300 transition-colors">
                  {currentTechInfo.category}
                </span>
                
                {/* Breadcrumb Dropdown */}
                {breadcrumbHover === currentTechInfo.category && (
                  <div className="absolute top-full left-0 mt-2 w-64 max-w-[calc(100vw-2rem)] bg-gray-900 border border-red-800 rounded-lg shadow-lg py-1 z-50 max-h-[85vh] overflow-y-auto scrollbar-thin scrollbar-track-gray-800 scrollbar-thumb-red-800 hover:scrollbar-thumb-red-700">
                    {technologyCategories[currentTechInfo.category]?.map(slug => {
                      const data = codexDetails[slug];
                      if (!data) return null;
                      
                      return (
                        <Link
                          key={slug}
                          href={`/codex/${slug}`}
                          className={`block px-3 py-1.5 text-sm transition-colors ${
                            isActive(slug)
                              ? 'bg-red-700 text-red-100 font-semibold'
                              : 'text-gray-300 hover:bg-red-900 hover:text-red-200'
                          }`}
                        >
                          {data.title}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
              <ChevronRight size={14} />
              <span className="text-red-300 font-semibold">{currentTechInfo.title}</span>
            </nav>
          </div>
        )}
        
        <div className="flex items-center justify-between h-16">
          {/* Logo/Title */}
          <Link href="/" className="flex items-center space-x-2 text-red-500 hover:text-red-400 transition-colors">
            <span className="text-2xl">⚙️</span>
            <span className="text-xl font-bold font-mono">Mechanicus Codex</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {Object.entries(technologyCategories).map(([category, slugs], index) => (
              <div key={category} className="relative" ref={el => dropdownRefs.current[category] = el}>
                <button
                  onClick={() => toggleDropdown(category)}
                  className="flex items-center space-x-1 text-red-400 hover:text-red-300 transition-colors font-mono"
                >
                  <span>{category}</span>
                  <ChevronDown 
                    size={16} 
                    className={`transition-transform ${openDropdown === category ? 'rotate-180' : ''}`}
                  />
                </button>

                {/* Dropdown Menu */}
                {openDropdown === category && (
                  <div className={`absolute top-full mt-2 w-80 max-w-[calc(100vw-2rem)] bg-gray-900 border border-red-800 rounded-lg shadow-lg py-2 z-50 max-h-[85vh] overflow-y-auto scrollbar-thin scrollbar-track-gray-800 scrollbar-thumb-red-800 hover:scrollbar-thumb-red-700 ${
                    index >= 3 ? 'right-0' : 'left-0'
                  }`}>
                    {slugs.map(slug => {
                      const data = codexDetails[slug];
                      if (!data) return null;
                      
                      return (
                        <Link
                          key={slug}
                          href={`/codex/${slug}`}
                          className={`block px-4 py-2 text-sm transition-colors ${
                            isActive(slug)
                              ? 'bg-red-700 text-red-100 font-semibold'
                              : 'text-gray-300 hover:bg-red-900 hover:text-red-200'
                          }`}
                        >
                          <div className="font-medium">{data.title}</div>
                          <div className="text-xs text-gray-400 mt-1 line-clamp-2">
                            {data.benediction}
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-red-500 hover:text-red-400 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-red-800 py-4">
            {/* Mobile Breadcrumbs */}
            {currentTechInfo && (
              <div className="mb-4 pb-4 border-b border-red-800/50">
                <nav className="flex items-center space-x-2 text-sm text-gray-400">
                  <Link href="/" className="flex items-center hover:text-red-400 transition-colors">
                    <Home size={14} className="mr-1" />
                    Home
                  </Link>
                  <ChevronRight size={14} />
                  <span className="text-red-400 font-medium">{currentTechInfo.category}</span>
                  <ChevronRight size={14} />
                  <span className="text-red-300 font-semibold">{currentTechInfo.title}</span>
                </nav>
              </div>
            )}
            
            <div className="space-y-4">
              {Object.entries(technologyCategories).map(([category, slugs]) => (
                <div key={category}>
                  <button
                    onClick={() => toggleDropdown(category)}
                    className="flex items-center justify-between w-full text-left text-red-400 hover:text-red-300 transition-colors font-mono py-2"
                  >
                    <span className="font-semibold">{category}</span>
                    <ChevronDown 
                      size={16} 
                      className={`transition-transform ${openDropdown === category ? 'rotate-180' : ''}`}
                    />
                  </button>
                  
                  {openDropdown === category && (
                    <div className="ml-4 mt-2 space-y-2 max-h-[70vh] overflow-y-auto scrollbar-thin scrollbar-track-gray-800 scrollbar-thumb-red-800 hover:scrollbar-thumb-red-700">
                      {slugs.map(slug => {
                        const data = codexDetails[slug];
                        if (!data) return null;
                        
                        return (
                          <Link
                            key={slug}
                            href={`/codex/${slug}`}
                            className={`block px-3 py-2 text-sm rounded transition-colors ${
                              isActive(slug)
                                ? 'bg-red-700 text-red-100 font-semibold'
                                : 'text-gray-300 hover:bg-red-900 hover:text-red-200'
                            }`}
                          >
                            <div className="font-medium">{data.title}</div>
                            <div className="text-xs text-gray-400 mt-1">
                              {data.benediction}
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
