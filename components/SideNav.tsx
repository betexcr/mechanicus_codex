import Link from 'next/link';
import { useRouter } from 'next/router';
import codexDetails from '../data/codexDetails';

export default function SideNav() {
  const router = useRouter();
  const currentSlug = Array.isArray(router.query.slug) ? router.query.slug[0] : router.query.slug ?? '';

  return (
    <nav className="fixed top-0 left-0 h-full w-64 bg-black border-r border-red-800 p-6 font-mono text-red-400 overflow-y-auto">
      <h2 className="text-2xl font-bold mb-6 text-red-500">⚙️ Codex Menu</h2>
      <ul>
        {Object.entries(codexDetails).map(([slug, data]) => {
          const active = slug === currentSlug;
          return (
            <li key={slug} className="mb-3">
              <Link
                href={`/codex/${slug}`}
                className={`block px-3 py-2 rounded-lg hover:bg-red-900 transition-colors ${
                  active ? 'bg-red-700 font-semibold text-red-100' : 'text-red-400'
                }`}
              >
                {data.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
