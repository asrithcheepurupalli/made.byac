import { lazy, Suspense } from 'react';
import { StudioProvider } from "./StudioContext";
import { Site } from "./site/Site";

const Analytics = lazy(() => import('@vercel/analytics/react').then((m) => ({ default: m.Analytics })));

export default function App() {
  return (
    <StudioProvider>
      <Site />
      <Suspense fallback={null}><Analytics /></Suspense>
    </StudioProvider>
  );
}
