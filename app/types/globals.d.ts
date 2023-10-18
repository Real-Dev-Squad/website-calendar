declare global {
  // Extend the Window interface and add ENV property so that
  // TypeScript recognizes it after we inject it in root.tsx
  interface Window {
    ENV: {
      NODE_ENV: 'development' | 'production' | 'test';
      API_HOST: string;
      GOOGLE_OAUTH: string;
      MICROSOFT_OAUTH: string;
    };
  }
}

// This export statement is needed to make the file a module
// rather than a script. It doesn't actually export anything.
export {};
