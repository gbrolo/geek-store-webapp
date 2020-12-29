import React, { lazy, Suspense } from 'react';

const loadable = (importFunc, { fallback = null } = { fallback: null }) => {
  const LazyComponent = lazy(importFunc);
  const isSSR = typeof window === "undefined";

  return props => (
    <>
      {
        !isSSR &&
        <Suspense fallback={fallback}>
          <LazyComponent {...props} />
        </Suspense>
      }
    </>
  );
};

export default loadable;
