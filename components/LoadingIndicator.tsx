import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useLoading } from './LoadingContext';

export default function LoadingIndicator() {
  const { isLoading, setLoading } = useLoading();
  const router = useRouter();

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [router, setLoading]);

  useEffect(() => {
    // Hide loading indicator after initial page load is complete
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500); // Show for at least 1.5 seconds to ensure visibility

    return () => clearTimeout(timer);
  }, [setLoading]);

  if (!isLoading) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="relative w-16 h-16">
        <Image
          src="/images/loading.png"
          alt="Loading..."
          width={64}
          height={64}
          className="animate-pulse"
          style={{
            animation: 'pulse 1.5s ease-in-out infinite'
          }}
        />
      </div>
    </div>
  );
}
