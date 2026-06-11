import { StudioProvider } from "./StudioContext";
import { Site } from "./site/Site";

export default function App() {
  return (
    <StudioProvider>
      <Site />
    </StudioProvider>
  );
}
