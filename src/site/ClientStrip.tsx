// A quiet line of the clients the work on this site was made for, drawn from the work archive.
const CLIENTS = [
  ["Ramachandra Ortho Care", "/work/ramachandra-ortho"],
  ["Innovolt", "/work/innovolt"],
  ["Mithai Maharaja", "/work/mithai-maharaja"],
  ["Telyport", "/work"],
  ["Mr. Snapper International", "/work"],
] as const;

export function ClientStrip() {
  return (
    <section aria-label="Clients" className="bg-paper border-y border-ink/10">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10 py-6 flex flex-wrap items-center gap-x-8 gap-y-3">
        <span className="label text-[10px] text-ink/55">We have made work for</span>
        {CLIENTS.map(([n, h]) => (
          <a key={n} href={h} className="font-display text-lg md:text-xl text-ink/80 hover:text-red transition-colors">{n}</a>
        ))}
      </div>
    </section>
  );
}
