import { useId } from "react";

export function CatCharacter({ tone = "ink", className = "" }: { tone?: "ink" | "ginger" | "blue" | "rose"; className?: string }) {
  const fur = { ink: "var(--foreground)", ginger: "var(--orange)", blue: "var(--blue)", rose: "var(--rose)" }[tone];
  return <svg viewBox="0 0 120 115" className={className} aria-label="Illustrated cat" role="img" fill="none">
    <path d="M19 71C11 53 17 34 29 20l7 17c15-9 31-9 46 0l8-18c16 20 17 42 8 58 12 2 18 11 17 21H8c-1-13 2-22 11-27Z" fill={fur}/>
    <path d="m28 25 3 17-12 12M90 26 84 43l13 12" fill="var(--rose-light)" opacity=".75"/>
    <ellipse cx="40" cy="64" rx="5" ry="7" fill="var(--background)"/><ellipse cx="79" cy="64" rx="5" ry="7" fill="var(--background)"/>
    <path d="m54 77 6 5 6-5Z" fill="var(--rose)"/><path d="M60 82v5m0 0c-5 5-10 4-13 0m13 0c5 5 10 4 13 0M24 79 3 76m21 9L4 88m92-9 21-3m-21 9 20 3" stroke="var(--background)" strokeWidth="2" strokeLinecap="round"/>
    <path d="M97 94c14-24 24-13 17-2" stroke={fur} strokeWidth="9" strokeLinecap="round"/>
  </svg>;
}

export function RachelPlayer({ action = false }: { action?: boolean }) {
  const id = useId().replace(/:/g, "");
  return <svg viewBox="0 0 320 365" className={`player-svg ${action ? "player-action" : ""}`} role="img" aria-label="Playful illustrated badminton Rachel with a white patterned headscarf, dark hair, nose ring and racket">
    <defs><clipPath id={id}><ellipse cx="158" cy="133" rx="70" ry="88"/></clipPath></defs>
    <ellipse cx="158" cy="346" rx="90" ry="10" fill="var(--foreground)" opacity=".1"/>
    <path d="M104 257 78 331m133-74 31 74" stroke="var(--foreground)" strokeWidth="22" strokeLinecap="round"/>
    <path d="M104 323 69 337m169-14 33 13" stroke="var(--blue)" strokeWidth="13" strokeLinecap="round"/>
    <path d="M77 208c13-19 36-25 81-25 45 0 71 9 86 27l-23 91H97Z" fill="var(--blue)" stroke="var(--foreground)" strokeWidth="4"/>
    <path d="M107 209c22 8 43 11 52 12 24-2 46-8 63-14M111 231h96m-104 20h110m-111 20h106" stroke="var(--background)" strokeWidth="5" opacity=".6"/>
    <path d="M105 220 62 263m157-43 45-56" stroke="var(--skin)" strokeWidth="17" strokeLinecap="round"/>
    <circle cx="60" cy="265" r="11" fill="var(--skin)"/><circle cx="266" cy="158" r="11" fill="var(--skin)"/>
    <path d="m269 157 31-55" stroke="var(--foreground)" strokeWidth="7"/><ellipse cx="297" cy="82" rx="20" ry="33" transform="rotate(27 297 82)" fill="none" stroke="var(--foreground)" strokeWidth="5"/><path d="m283 62 27 40m-31-29 29 31m-20-45 24 36m-31-13 28-18m-24 31 30-17" stroke="var(--foreground)" strokeWidth="1"/>
    <path d="M94 115c-4 83 4 96 24 102l79 1c27-23 27-66 23-103Z" fill="var(--foreground)"/>
    <ellipse cx="158" cy="133" rx="70" ry="88" fill="var(--skin)" stroke="var(--foreground)" strokeWidth="4"/>
    <g clipPath={`url(#${id})`}><path d="M83 106c11-73 39-88 74-88 40 0 72 32 78 84-27-11-48-36-64-48-25 32-52 31-88 52Z" fill="var(--foreground)"/><path d="M89 76c32-27 72-31 133 3l-7-26C183 12 131 13 98 51Z" fill="var(--background)" stroke="var(--foreground)" strokeWidth="3"/><path d="m106 57 14 7m27-25 18 10m21-2 13 11m-88 22 20 7m43-26 17 9" stroke="var(--rose)" strokeWidth="4" strokeLinecap="round"/></g>
    <path d="M106 130q15-11 31-3m43 1q16-9 31 1" stroke="var(--foreground)" strokeWidth="4" strokeLinecap="round"/>
    <ellipse cx="124" cy="141" rx="6" ry="8" fill="var(--foreground)"/><ellipse cx="194" cy="141" rx="6" ry="8" fill="var(--foreground)"/>
    <path d="m159 147-5 18 9 2m-23 23q19 11 38-1" stroke="var(--foreground)" strokeWidth="3" fill="none" strokeLinecap="round"/>
    <circle cx="167" cy="169" r="3" fill="var(--background)" stroke="var(--foreground)" strokeWidth="2"/>
    <path d="M90 161q-10 13 2 24m132-25q11 13-2 24" stroke="var(--foreground)" strokeWidth="4" fill="none"/>
    <circle cx="89" cy="191" r="8" fill="none" stroke="var(--foreground)" strokeWidth="3"/><circle cx="225" cy="191" r="8" fill="none" stroke="var(--foreground)" strokeWidth="3"/>
    <path d="M148 209v15m20-15v15" stroke="var(--skin)" strokeWidth="10"/>
  </svg>;
}