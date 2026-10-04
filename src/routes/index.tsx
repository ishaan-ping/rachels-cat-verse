import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowRight, ArrowUpRight, AudioLines, Heart, Maximize2, VolumeX, X } from "lucide-react";
import confetti from "canvas-confetti";
import { Button } from "@/components/ui/button";
import { CatCharacter, RachelPlayer } from "@/components/rachel-illustrations";
import studio from "@/assets/rachel-world.jpg";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Happy Birthday Rachel — A Very Important Cat Universe" },
    { name: "description", content: "A gloriously unnecessary birthday world of cats, art, badminton, and love, made just for Rachel." },
    { property: "og:title", content: "Happy Birthday Rachel 🐈🎨🎂" },
    { property: "og:description", content: "A gloriously unnecessary birthday world of cats, art, badminton, and love, made just for Rachel." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: Index,
});

const cats = [
  { name: "Milo", title: "Professional napper", note: "Working hard? Never heard of it.", answer: "You may pet me.", tone: "ginger" as const },
  { name: "Picasso", title: "Artist (self-appointed)", note: "Has never produced a bad painting. Allegedly.", answer: "I call this one 'no'.", tone: "blue" as const },
  { name: "Sir Meows-a-Lot", title: "Head of opinions", note: "Has a thought about absolutely everything.", answer: "I don't like you. Just kidding. Maybe.", tone: "ink" as const },
  { name: "Badminton Cat", title: "Court invader", note: "Misses every shot with extraordinary confidence.", answer: "Did I win?", tone: "rose" as const },
  { name: "Ginger", title: "Chief of judgment", note: "Probably judging you right now.", answer: "No.", tone: "ginger" as const },
];
const shots = [
  ["FOREHAND SMASH", "A completely reasonable amount of force. 💥"],
  ["BACKHAND", "Not even her dominant hand. 🏸"],
  ["DROP SHOT", "Sneaky. Very sneaky."],
  ["JUMP SMASH", "WHY WAS THAT NECESSARY?"],
  ["DEFENSIVE RETURN", "Of course she got that."],
  ["FINAL SMASH", "RACHEL WINS. Obviously. 🏆"],
];
const achievements = ["Professional Badminton Menace", "Artistic Genius", "Cat Enthusiast", "Cat Whisperer", "Professional Chaos Generator", "Occasionally Funny", "Actually A Really Good Human"];
const memories = [
  ["01 / THE BEGINNING", "The beginning", "This was the beginning of a lot of chaos."],
  ["02 / THE RANDOM MOMENTS", "The random moments", "Somehow the stupid moments became the best ones."],
  ["03 / THE LAUGHS", "The laughs", "An unnecessary amount of laughter."],
  ["04 / THE MEMORIES", "The memories", "The moments you don't realize you'll remember forever."],
];
const qualities = ["Your creativity", "Your love for cats", "Your ridiculous competitiveness", "Your artistic brain", "Your questionable jokes", "The way you make ordinary moments memorable", "The way you see things differently"];

function SectionTitle({ number, eyebrow, title, subtitle }: { number: string; eyebrow: string; title: string; subtitle?: string }) {
  return <div className="section-heading"><div className="section-kicker"><span>{number}</span><span className="line"/><span>{eyebrow}</span></div><h2>{title}</h2>{subtitle && <p>{subtitle}</p>}</div>;
}

function Index() {
  const [entered, setEntered] = useState(false);
  const [loadingStage, setLoadingStage] = useState(0);
  const [selectedCat, setSelectedCat] = useState<number | null>(null);
  const [catClicks, setCatClicks] = useState<Record<number, number>>({});
  const [art, setArt] = useState<number | null>(null);
  const [foundArtCat, setFoundArtCat] = useState(false);
  const [shot, setShot] = useState(-1);
  const [shotCount, setShotCount] = useState(0);
  const [humor, setHumor] = useState(0);
  const [boothSwapped, setBoothSwapped] = useState(false);
  const [hat, setHat] = useState(false);
  const [glasses, setGlasses] = useState(false);
  const [boothChaos, setBoothChaos] = useState(false);
  const [celebrating, setCelebrating] = useState(false);
  const [cakeClicks, setCakeClicks] = useState(0);
  const [paws, setPaws] = useState<string[]>([]);
  const [secretMode, setSecretMode] = useState(false);
  const [event, setEvent] = useState("");
  const [sound, setSound] = useState(false);
  const [trail, setTrail] = useState<{ x: number; y: number; id: number }[]>([]);
  const trailTime = useRef(0);
  const audio = useRef<AudioContext | null>(null);

  useEffect(() => { const id = window.setInterval(() => setLoadingStage(s => Math.min(s + 1, 6)), 520); return () => clearInterval(id); }, []);
  useEffect(() => {
    if (!entered) return;
    let idle: ReturnType<typeof setTimeout>;
    const reset = () => { clearTimeout(idle); idle = setTimeout(() => { setEvent("Rachel? You still there? 🐈"); setTimeout(() => setEvent(""), 4500); }, 11000); };
    const random = setInterval(() => { setEvent(["meow.", "Rachel's cat has entered the website.", "A tiny cat has stolen a paintbrush.", "A shuttlecock is now cat property."][Math.floor(Math.random() * 4)] ?? "meow."); setTimeout(() => setEvent(""), 4200); }, secretMode ? 14000 : 28000);
    window.addEventListener("pointermove", reset); window.addEventListener("keydown", reset); reset();
    return () => { clearTimeout(idle); clearInterval(random); window.removeEventListener("pointermove", reset); window.removeEventListener("keydown", reset); };
  }, [entered, secretMode]);

  function play(frequency = 420) {
    if (!sound) return;
    try { const context = audio.current ?? new AudioContext(); audio.current = context; const oscillator = context.createOscillator(); const gain = context.createGain(); oscillator.type = "sine"; oscillator.frequency.setValueAtTime(frequency, context.currentTime); oscillator.frequency.exponentialRampToValueAtTime(frequency * .7, context.currentTime + .16); gain.gain.setValueAtTime(.055, context.currentTime); gain.gain.exponentialRampToValueAtTime(.001, context.currentTime + .18); oscillator.connect(gain).connect(context.destination); oscillator.start(); oscillator.stop(context.currentTime + .18); } catch { /* Audio is optional. */ }
  }
  function celebrate() { setCelebrating(true); confetti({ particleCount: 180, spread: 120, origin: { y: .6 }, colors: ["#f1999c", "#f4ca6b", "#5675ba", "#b19aca", "#fff9ef"] }); setTimeout(() => confetti({ particleCount: 120, spread: 100, origin: { x: .2, y: .6 } }), 650); play(720); }
  function collect(id: string) { if (paws.includes(id)) return; const next = [...paws, id]; setPaws(next); setEvent(`Paw print found · ${next.length}/6 🐾`); setTimeout(() => setEvent(""), 2800); if (next.length === 6) { setSecretMode(true); setEvent("You unlocked the important version of the website. 🐈"); } play(620); }
  function moveTrail(e: React.PointerEvent<HTMLElement>) { if (e.pointerType === "touch" || Date.now() - trailTime.current < 300) return; trailTime.current = Date.now(); const id = Date.now(); setTrail(t => [...t.slice(-5), { x: e.clientX, y: e.clientY, id }]); setTimeout(() => setTrail(t => t.filter(p => p.id !== id)), 1300); }
  function openCat(i: number) { setSelectedCat(i); setCatClicks(c => ({ ...c, [i]: (c[i] ?? 0) + 1 })); play(370); }
  function takeShot() { setShotCount(n => n + 1); setShot(s => (s + 1) % shots.length); play(180); }

  return <main className={secretMode ? "site secret-mode" : "site"} onPointerMove={moveTrail}>
    {!entered && <div className="loading-screen"><div className="loading-brand">R<span>✳</span>R</div><div className="loading-center"><span className="micro light">A BIRTHDAY EXPERIENCE / EST. RIGHT NOW</span><h1>INITIALIZING<br/><em>RACHEL'S WORLD...</em></h1><div className="loading-steps">{["Loading creativity...", "Loading cats...", "Loading badminton competitiveness...", "Loading questionable humor...", "Loading birthday cake..."].map((text, i) => <span key={text} className={loadingStage > i ? "visible" : ""}><span>✓</span> {text}</span>)}</div>{loadingStage >= 6 && <div className="loading-error"><strong>ERROR: TOO MANY CATS DETECTED.</strong><p>Proceed anyway?</p><div><Button onClick={() => setEntered(true)}>YES <ArrowRight/></Button><Button variant="outline" onClick={() => setEntered(true)}>Obviously.</Button></div></div>}</div><CatCharacter tone="ginger" className="loading-cat"/></div>}

    <header className="site-header"><a href="#top" className="brand" aria-label="Rachel's world home">R<span>✳</span>R <small>THE RACHEL UNIVERSE</small></a><nav aria-label="Main navigation"><a href="#cats">THE CATS</a><a href="#museum">THE ART</a><a href="#badminton">THE GAME</a></nav><Button variant="ghost" size="icon" onClick={() => setSound(s => !s)} title={sound ? "Mute sounds" : "Turn on sounds"} aria-label={sound ? "Mute sounds" : "Turn on sounds"}>{sound ? <AudioLines/> : <VolumeX/>}</Button></header>

    <section id="top" className="hero"><img className="hero-image" src={studio} width={1536} height={1024} alt="Illustrated sunlit artist studio filled with cats, paintings, and a badminton racket"/><div className="hero-wash"/><div className="hero-scribble hero-scribble-one">✳</div><div className="hero-scribble hero-scribble-two">✦</div><div className="hero-content"><span className="micro">AN EXTREMELY IMPORTANT OCCASION · 2026</span><h1>HAPPY<br/>BIRTHDAY<br/><em>RACHEL<span className="hero-star">✳</span></em></h1><div className="hero-bottom"><div><p>Welcome to a completely unnecessary website dedicated to one person.</p><span>Unfortunately, the cats insisted on being involved.</span></div><Button onClick={() => { document.getElementById("profile")?.scrollIntoView({ behavior: "smooth" }); confetti({ particleCount: 55, spread: 70, origin: { y: .65 } }); play(590); }} className="hero-enter" aria-label="Enter Rachel's world">ENTER RACHEL'S WORLD <ArrowDown size={21}/></Button></div></div><div className="hero-side">CAT WORLD / ART WORLD / RACHEL WORLD</div></section>

    <div className="marquee"><div>NOT A NORMAL BIRTHDAY WEBSITE <span>✳</span> CATS × ART × BADMINTON × BIRTHDAY CHAOS <span>✳</span> NOT A NORMAL BIRTHDAY WEBSITE <span>✳</span> CATS × ART × BADMINTON × BIRTHDAY CHAOS <span>✳</span></div></div>

    <section id="profile" className="section profile-section"><SectionTitle number="01" eyebrow="FIELD NOTES" title="WHO IS RACHEL?" subtitle="An ongoing investigation. Results should not be trusted."/><div className="profile-grid"><div className="profile-intro"><div className="profile-doodle">R<span>✳</span></div><p>Artist. Cat person. Competitive force of nature. <em>Occasionally</em> funny.</p><span className="caption">SUBJECT NO. 001 / IMPOSSIBLE TO REPLICATE</span></div><div className="stats">{[["Creativity", "98%", 98], ["Cat obsession", "∞%", 100], ["Badminton competitiveness", "101%", 100], ["Artistic chaos", "97%", 97], ["Humor", "37%", 37], ["Ability to turn anything into art", "104%", 100]].map(([name, value, amount]) => <div className="stat" key={name} onMouseEnter={() => { if (name === "Cat obsession") setEvent("🐈 🐈 🐈 🐈 🐈"); }} onMouseLeave={() => setEvent("")}><div><span>{name}</span><b>{value}</b></div><div className="stat-track"><span style={{ width: `${amount}%` }}/></div></div>)}<p className="footnote">* These results were obtained using absolutely no scientific methodology.</p></div></div><Paw id="profile" collect={collect} found={paws.includes("profile")}/></section>

    <section id="cats" className="section cats-section"><SectionTitle number="02" eyebrow="FELINE DEPARTMENT" title="THE IMPORTANT PART." subtitle="Cats. Obviously."/><div className="cats-grid">{cats.map((cat, i) => <Button variant="ghost" className={`cat-tile cat-tile-${i}`} key={cat.name} onClick={() => openCat(i)}><span className="cat-num">CAT NO. 0{i + 1}</span><CatCharacter tone={cat.tone} className="cat-drawing"/><span className="cat-info"><strong>{cat.name}</strong><small>{cat.title}</small></span><ArrowUpRight className="cat-arrow"/></Button>)}</div><div className="sleeping-cat" aria-hidden="true"><span>Zzz...</span><CatCharacter tone="ginger" className="sleeping-cat-drawing"/></div><p className="section-aside">PLEASE DO NOT FEED THE ARTISTS. THEY ARE ALREADY FED.</p><Paw id="cats" collect={collect} found={paws.includes("cats")}/></section>

    <section id="museum" className="section museum-section"><SectionTitle number="03" eyebrow="THE COLLECTION" title="THE RACHEL ART MUSEUM" subtitle="Curated by Rachel. Supervised by cats."/><div className="art-grid">{["UNTITLED", "ARTIST AT WORK", "THIS IS DEFINITELY ART", "CAT WITH PAINTBRUSH"].map((name, i) => <Button variant="ghost" className={`artwork artwork-${i}`} key={name} onClick={() => { setArt(i); play(530); }}><span className="art-visual"><span className="art-shape art-shape-a"/><span className="art-shape art-shape-b"/><span className="art-shape art-shape-c"/><CatCharacter tone={i === 1 ? "ginger" : "ink"} className="art-cat"/>{i === 1 && <span className="mini-easel">▰</span>}</span><span className="art-meta"><span><small>NO. 0{i + 1} / MIXED MEDIA</small><strong>{name}</strong></span><Maximize2 size={17}/></span></Button>)}</div><div className="curious-cat" aria-hidden="true"><CatCharacter tone="blue" className="curious-cat-drawing"/></div><p className="section-aside">PLEASE LOOK CLOSELY. THE CATS ARE NOT PART OF THE EXHIBITION. PROBABLY.</p><Paw id="museum" collect={collect} found={paws.includes("museum")}/></section>

    <section id="badminton" className="section badminton-section"><SectionTitle number="04" eyebrow="ON THE COURT" title="AND THEN THERE'S BADMINTON." subtitle="Rachel does not play badminton. Rachel competes."/><div className={`court ${shotCount >= 10 && shotCount % 6 === 4 ? "beast-court" : ""}`}><span className="court-label">THE RACHEL INVITATIONAL / EST. FOREVER</span><div className="court-lines"/><div className={`player-wrap ${shot >= 0 ? "swing" : ""}`} key={shotCount}><RachelPlayer action={shot >= 0}/></div><span className={`shuttle ${shot >= 0 ? "shuttle-hit" : ""}`} key={`shuttle-${shotCount}`}>✦</span><div className="score-card"><span>RACHEL</span><strong>{Math.max(shotCount, 0).toString().padStart(2, "0")}</strong><span>EVERYONE ELSE</span><strong>00</strong></div>{shot >= 0 && <div className="shot-result" key={`result-${shotCount}`}><span>SHOT {String(shotCount).padStart(2, "0")}</span><strong>{shots[shot]?.[0] ?? "SMASH"}</strong><small>{shotCount >= 10 ? "Rachel has entered beast mode. " : ""}{shots[shot]?.[1] ?? "Obviously."}</small></div>}{shotCount > 0 && shotCount % 7 === 0 && <div className="court-cat"><CatCharacter tone="ginger" className="w-16"/><span>...meow?</span></div>}</div><div className="court-action"><Button onClick={takeShot}>CLICK TO SEE RACHEL IN ACTION <ArrowRight/></Button><span>{shotCount > 4 ? "You know she's going to win, right?" : "ONE CLICK. ONE VERY COMPETITIVE SHOT."}</span></div><Paw id="badminton" collect={collect} found={paws.includes("badminton")}/></section>

    <section className="section achievement-section"><SectionTitle number="05" eyebrow="THE TROPHY CABINET" title="RACHEL UNLOCKED" subtitle="Some achievements are earned. Others are simply inevitable."/><div className="achievement-grid">{achievements.map((a, i) => <div className="achievement" key={a}><span>{["🏆", "🎨", "🐈", "🐾", "✨", "😂", "❤️"][i]}</span><small>ACHIEVEMENT 0{i + 1}</small><strong>{a}</strong>{i === 2 && <CatCharacter tone="ginger" className="achievement-cat"/>}</div>)}</div></section>

    <section className="section humor-section"><div><SectionTitle number="06" eyebrow="SCIENCE, ALLEGEDLY" title="RACHEL'S HUMOR EVALUATION" subtitle="An independent and totally unbiased assessment."/><span className="humor-stamp">OFFICIAL-ISH</span></div><div className="humor-machine"><span className="micro">TEST SUBJECT: RACHEL / STATUS: QUESTIONABLE</span><div className="humor-value"><span>HUMOR LEVEL</span><strong>{humor >= 5 ? "FUNNY*" : `${37 + Math.min(humor * 3, 15)}%`}</strong></div><div className="stat-track"><span style={{ width: `${37 + Math.min(humor * 3, 15)}%` }}/></div><p>{["Could be worse.", "Slight improvement.", "Scientists remain unconvinced.", "That was almost funny.", "Okay, fine. That one was actually good.", "Rachel is funny. Sometimes."][Math.min(humor, 5)]}</p><Button onClick={() => { setHumor(h => h + 1); play(320); }}>TEST AGAIN <ArrowRight/></Button><CatCharacter tone="ink" className="humor-cat"/><small>* RESULTS DISPUTED BY THE CAT</small></div></section>

    <section className="section memories-section"><SectionTitle number="07" eyebrow="FROM THE STUDIO WALL" title="THE GOOD STUFF" subtitle="A few spaces for the moments worth keeping."/><div className="memory-grid">{memories.map(([label, title, copy], i) => <div className={`memory memory-${i}`} key={title}><div className="memory-photo"><span className="tape"/><span className="memory-placeholder">{["✳", "♡", "✦", "☼"][i]}</span><span className="memory-photo-note">YOUR PHOTO HERE</span></div><span className="memory-label">{label}</span><h3>{title}</h3><p>{copy}</p></div>)}</div><CatCharacter tone="ginger" className="memory-cat"/><Paw id="memories" collect={collect} found={paws.includes("memories")}/></section>

    <section className="section qualities-section"><SectionTitle number="08" eyebrow="A PARTIAL INVENTORY" title="WHY RACHEL IS RACHEL" subtitle="A few things that make the whole thing unmistakably you."/><div className="qualities-cloud">{qualities.map((q, i) => <div className={`quality quality-${i}`} draggable onDragEnd={e => { e.currentTarget.style.transform = `translate(${Math.max(-60, Math.min(60, e.clientX % 100 - 50))}px, ${Math.max(-40, Math.min(40, e.clientY % 80 - 40))}px) rotate(${i % 2 ? 3 : -3}deg)`; }} key={q}><span>{["🎨", "🐈", "🏸", "✨", "😂", "❤️", "🌎"][i]}</span>{q}</div>)}</div></section>

    <section className="section booth-section"><SectionTitle number="09" eyebrow="VERY SERIOUS PORTRAITURE" title="RACHEL + CATS" subtitle="Rachel, Poly, and Imli. The whole crew."/><div className="booth-layout"><div className={`booth-frame ${boothChaos ? "booth-chaos" : ""}`}><div className="booth-sticker top">THE THREE OF THEM ♡</div><span className="booth-decoration">✳</span><div className="booth-people"><div className="booth-cat-wrap" style={{ order: boothSwapped ? 3 : 1 }}><CatCharacter tone="blue" className="booth-cat"/>{hat && <span className="cat-hat">🎩</span>}<span className="booth-name">POLY</span></div><div className="booth-rachel" style={{ order: 2 }}><RachelPlayer/>{glasses && <span className="booth-glasses">🕶️</span>}{hat && <span className="booth-hat">🎩</span>}</div><div className="booth-cat-wrap" style={{ order: boothSwapped ? 1 : 3 }}><CatCharacter tone="ginger" className="booth-cat"/>{hat && <span className="cat-hat">🎩</span>}<span className="booth-name">IMLI</span></div></div><div className="booth-sticker bottom">RACHEL + POLY + IMLI • 2026</div></div><div className="booth-controls"><span className="micro">CUSTOMIZE YOUR MASTERPIECE</span><p>Rachel. Poly. Imli. One extremely important portrait.</p><Button variant="outline" onClick={() => { setBoothSwapped(s => !s); play(410); }}>SWAP POSES 🐈 <ArrowRight/></Button><Button variant="outline" onClick={() => setHat(h => !h)}>{hat ? "REMOVE HAT" : "ADD HAT"} 🎩</Button><Button variant="outline" onClick={() => setGlasses(g => !g)}>{glasses ? "REMOVE SUNGLASSES" : "ADD SUNGLASSES"} 😎</Button><Button onClick={() => { setBoothChaos(c => !c); confetti({ particleCount: 45, spread: 70 }); }}>CHAOS MODE 💥</Button></div></div><Paw id="booth" collect={collect} found={paws.includes("booth")}/></section>

    <section className="quiet-section"><div className="quiet-inner"><span className="micro">A MOMENT WITHOUT THE CATS. MOSTLY.</span><h2>OKAY.<br/><em>ENOUGH CHAOS.</em></h2><div className="quiet-message"><h3>Happy birthday, Rachel. <Heart size={32} fill="currentColor"/></h3><p>I hope you keep creating. Keep making weird things. Keep finding beauty in things other people don't notice.</p><p>Keep competing. Keep laughing. Keep surrounding yourself with cats.</p><p>And most importantly...</p><strong>KEEP BEING YOU.</strong><p>You deserve a year full of things that make you genuinely happy.</p></div><span className="quiet-signature">WITH LOVE, AND AN UNREASONABLE NUMBER OF CATS.</span></div></section>

    <section className="final-section"><div className="final-cat-wrap"><CatCharacter tone="ink" className="final-cat"/><span className="final-bubble">pspspsps...<br/>Wait.</span></div><span className="micro light">ONE LAST THING / THE FINAL CAT</span><h2>OH, YOU THOUGHT<br/>WE WERE <em>DONE?</em></h2><Button onClick={celebrate}>🎂 CELEBRATE RACHEL <ArrowRight/></Button><p>THE CAT INSISTED ON THIS BUTTON.</p></section>

    <footer><span>R<span className="footer-star">✳</span>R</span><p>Made with an unreasonable amount of effort, questionable coding decisions, and a suspicious number of cats.</p><a href="#top">BACK TO THE TOP ↑</a></footer>

    {event && entered && <div className="event-toast" role="status"><CatCharacter tone="ginger" className="w-10"/><span>{event}</span></div>}
    {entered && <div className="roaming-cat" onClick={() => { setEvent("You found me."); setTimeout(() => setEvent(""), 2500); play(350); }} role="button" tabIndex={0} onKeyDown={e => { if (e.key === "Enter") setEvent("You found me."); }} aria-label="Catch the roaming cat"><CatCharacter tone="ink" className="w-20"/></div>}
    {trail.map(p => <span key={p.id} className="cursor-paw" style={{ left: p.x, top: p.y }}>🐾</span>)}
    {selectedCat !== null && <div className="modal-backdrop" onClick={() => setSelectedCat(null)}><div className="cat-modal" role="dialog" aria-modal="true" aria-label={cats[selectedCat]?.name ?? "Cat"} onClick={e => e.stopPropagation()}><Button variant="ghost" size="icon" className="modal-close" onClick={() => setSelectedCat(null)} aria-label="Close"><X/></Button><span className="micro">CAT FILE / 0{selectedCat + 1}</span><CatCharacter tone={cats[selectedCat]?.tone ?? "ink"} className="modal-cat"/><h3>{cats[selectedCat]?.name}</h3><p>{cats[selectedCat]?.note}</p><blockquote>“{(catClicks[selectedCat] ?? 0) >= 4 ? "STOP TOUCHING ME." : cats[selectedCat]?.answer}”</blockquote><Button onClick={() => openCat(selectedCat)}>PET AGAIN <Heart size={16}/></Button></div></div>}
    {art !== null && <div className="modal-backdrop" onClick={() => setArt(null)}><div className="art-modal" role="dialog" aria-modal="true" aria-label="Artwork detail" onClick={e => e.stopPropagation()}><Button variant="ghost" size="icon" className="modal-close" onClick={() => setArt(null)} aria-label="Close"><X/></Button><div className={`artwork artwork-${art} enlarged`}><span className="art-visual"><span className="art-shape art-shape-a"/><span className="art-shape art-shape-b"/><span className="art-shape art-shape-c"/><Button variant="ghost" className="hidden-art-cat" onClick={() => { setFoundArtCat(true); play(710); }} title="Is that a cat?"><CatCharacter tone="ink" className="w-14"/></Button></span></div><div><span className="micro">FROM THE RACHEL ART MUSEUM</span><h3>{["UNTITLED", "ARTIST AT WORK", "THIS IS DEFINITELY ART", "CAT WITH PAINTBRUSH"][art]}</h3><p>{["A beautiful abstract painting. A tiny cat is secretly hiding somewhere inside it.", "The artist has declined to comment on the use of paw prints.", "Nobody understands it. Which means it must be art.", "The cat is painting a painting. Please do not interrupt."][art]}</p>{foundArtCat && <strong className="found-art">You found the secret cat. Rachel would approve. 🐈</strong>}</div></div></div>}
    {celebrating && <div className="celebration" role="dialog" aria-modal="true" aria-label="Happy birthday Rachel"><Button variant="ghost" size="icon" className="celebration-close" onClick={() => setCelebrating(false)} aria-label="Close celebration"><X/></Button><div className="celebration-decor" aria-hidden="true"><span className="celebrate-balloon balloon-one"/><span className="celebrate-balloon balloon-two"/><span className="celebrate-balloon balloon-three"/><span className="celebrate-doodle doodle-one">✳</span><span className="celebrate-doodle doodle-two">✦</span><span className="celebrate-doodle doodle-three">✳</span><span className="celebrate-shuttle">🏸</span><CatCharacter tone="ginger" className="celebrate-cat celebrate-cat-one"/><CatCharacter tone="blue" className="celebrate-cat celebrate-cat-two"/><CatCharacter tone="rose" className="celebrate-cat celebrate-cat-three"/></div><div className="celebration-content"><div className="celebration-sparks">✦ ✳ ✦ ✳ ✦</div><span className="micro">THE VERY IMPORTANT FINALE</span><h2>HAPPY<br/>BIRTHDAY<br/><em>RACHEL!</em></h2><Button variant="ghost" className="cake" onClick={() => { setCakeClicks(c => c + 1); confetti({ particleCount: 40 + cakeClicks * 10, spread: 70 }); play(480 + cakeClicks * 30); }} aria-label="Tap the birthday cake"><span className="cake-candles"><i/><i/><i/></span><span className="cake-top"/><span className="cake-base"/><span className="cake-plate"/>{cakeClicks >= 2 && <span className="cake-extra">✳</span>}{cakeClicks >= 4 && <span className="cake-extra second">✦</span>}</Button><p>{cakeClicks >= 5 ? "TOO MUCH CAKE." : "A year of art, laughter, badminton victories, and all the cats in the world."}</p><span className="celebration-love">♥ HAPPY BIRTHDAY RACHEL ♥</span><small>Made with an unreasonable amount of effort, questionable coding decisions, and a suspicious number of cats.</small></div></div>}
  </main>;
}

function Paw({ id, collect, found }: { id: string; collect: (id: string) => void; found: boolean }) { return <Button variant="ghost" className={`secret-paw ${found ? "found" : ""}`} onClick={() => collect(id)} title="A tiny paw print" aria-label={`Collect paw print in ${id}`}>🐾</Button>; }