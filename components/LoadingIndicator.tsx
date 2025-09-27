import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

export default function LoadingIndicator() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleStart = () => setIsLoading(true);
    const handleComplete = () => setIsLoading(false);

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [router]);

  if (!isLoading) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="relative w-8 h-8">
        <Image
          src="/images/loading.png"
          alt="Loading..."
          width={32}
          height={32}
          className="animate-pulse"
          style={{
            animation: 'pulse 1.5s ease-in-out infinite'
          }}
        />
      </div>
    </div>
  );
}
