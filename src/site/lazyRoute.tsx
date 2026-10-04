import { lazy, type ComponentType } from "react";

// React.lazy with a handle to warm the chunk early. Once preloaded, the component renders
// synchronously (no Suspense flash), which is what lets a page swap happen cleanly inside a
// view transition.
export function lazyRoute<P extends object>(factory: () => Promise<{ default: ComponentType<P> }>) {
  let Loaded: ComponentType<P> | null = null;
  let p: Promise<unknown> | null = null;
  const load = () => (p ??= factory().then((m) => { Loaded = m.default; return m; }));
  const L = lazy(load as () => Promise<{ default: ComponentType<P> }>);
  const Route = ((props: P) => {
    const C = Loaded;
    return C ? <C {...props} /> : <L {...(props as P)} />;
  }) as ComponentType<P> & { preload: () => Promise<unknown> };
  Route.preload = load;
  return Route;
}
