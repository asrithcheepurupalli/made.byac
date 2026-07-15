import { Analytics } from '@vercel/analytics/react';
import { StudioProvider } from "./StudioContext";
import { Site } from "./site/Site";

export default function App() {
  return (
    <StudioProvider>
      <Site />
      <Analytics />
    </StudioProvider>
  );
}
