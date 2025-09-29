import { createContext, useContext, useState, ReactNode } from 'react';

interface LoadingContextType {
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
  addLoading: () => void;
  removeLoading: () => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export function LoadingProvider({ children }: { children: ReactNode }) {
  const [loadingCount, setLoadingCount] = useState(1); // Start with 1 for initial load

  const setLoading = (loading: boolean) => {
    setLoadingCount(loading ? 1 : 0);
  };

  const addLoading = () => {
    setLoadingCount(prev => prev + 1);
  };

  const removeLoading = () => {
    setLoadingCount(prev => Math.max(0, prev - 1));
  };

  const isLoading = loadingCount > 0;

  return (
    <LoadingContext.Provider value={{ isLoading, setLoading, addLoading, removeLoading }}>
      {children}
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
}
