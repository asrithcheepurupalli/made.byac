# made. by ac

A design & development studio. We make brands impossible to ignore, and then,
one weekend, we had to make our own. Turns out being your own client is the
hardest brief in the building.

This is the repository for that brief. It shipped. We're as surprised as you are.

**Live:** [made-by-ac.com](https://made-by-ac.com)

---

## What this is

The studio's own site: one long, deliberate scroll that moves the way we'd want a
brand to sound. Editorial type, a lot of considered whitespace, motion that never
raises its voice, and a cursor that has opinions.

It is not a template. Nothing here was assembled. It was made. which is the whole
point, and also why it took longer than we'll admit.

## The work it shows

Real projects, no invented metrics: Somaa (a full QR dining platform we designed
*and* built), Innovolt, Mithai Maharaja, Telyport, Mr. Snapper, plus the part
where the studio quietly grew a software-and-AI side and started shipping products,
not just decks. There's an `/ai` page for that. It has agents. They behave.

## Running it locally

```bash
npm install
npm run dev
```

A small house rule: this serves on `localhost:3000` by default, which on our
machines is permanently occupied by another tenant. So:

```bash
PORT=3100 npm run dev
```


## The stack

- **React 19** + **Vite 6** + **Tailwind 4**
- **Express** running Vite in middleware mode, with a small set of `/api/*` routes
- **Lenis** for the smooth scroll, because the alternative is rude
- Hosted on **Vercel**; `main` deploys itself, which keeps us honest

## A confession

`package.json` says `"name": "react-example"`. It has said this since the beginning.
We have a whole design system, a brand voice, and a manifesto about the 2% nobody
asks for, and the package is named like a tutorial someone abandoned. We have
decided this is character. We are not changing it. Please don't email us about it.

## House style

Lowercase `made.` with the period — the dot is the logo. We speak as *we*, never
*I*, because a studio is a team and the work is too good to take alone. The palette
is ink, paper, red, and gold; the type is Fraunces, Hanken Grotesk, and Space Mono.
If you're building something adjacent and want it to feel like us, that's a real
design system now, kept elsewhere.

## Say hi

[thebrain@made-by-ac.com](mailto:thebrain@made-by-ac.com)

Have an idea you're not sure is even possible? That's our favourite kind. There's
genuinely nothing to lose, and most of the time, we can.

---

*made. by ac — design experiences people remember.*
