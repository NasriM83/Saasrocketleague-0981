import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowRight, Check, CheckCheck, ChevronRight, Crosshair, CalendarDays, MessageSquare, Zap, ShieldCheck, Mail, LoaderCircle, X, Swords, Radio, Clock3, CircleCheck, SlidersHorizontal, LockKeyhole } from "lucide-react";
import { FaDiscord } from "react-icons/fa";
import { useJoinWaitlist } from "../queries/waitlist";

function Brand({ small = false }: { small?: boolean }) {
  return <a href="/" className={`brand ${small ? "brand-small" : ""}`} aria-label="ScrimSync home"><span className="brand-icon"><Zap size={22} fill="currentColor" strokeWidth={1.4} /></span><span>Scrim<span className="brand-sync">Sync</span></span></a>;
}

function ProductPreview() {
  const [format, setFormat] = useState("BO5");
  const [slot, setSlot] = useState("20:00");
  const [confirmed, setConfirmed] = useState(false);
  return <div className="preview-wrap">
    <div className="orbital orbital-one" /><div className="orbital orbital-two" />
    <div className="floating-label"><span className="status-dot" /> YOUR NEXT SCRIM, SORTED.</div>
    <div className="product-window">
      <div className="window-bar"><div className="window-dots"><i /><i /><i /></div><span>scrimsync / matchmaking</span><span className="preview-tag">PREVIEW</span></div>
      <div className="product-content">
        <div className="product-title"><div><span className="overline">YOUR PRACTICE. ON AUTOPILOT.</span><h3>Find your next opponent</h3></div><span className="live-pill"><Radio size={12} /> Live queue</span></div>
        <div className="filter-row"><span><span className="blue-dot" /> Europe <ChevronRight size={12} /></span><span>3v3 Standard <ChevronRight size={12} /></span><span><SlidersHorizontal size={12} /> ±100 MMR</span></div>
        <div className="match-panel">
          <div className="match-panel-top"><span><Crosshair size={13} /> BALANCED MATCH FOUND</span><span className="match-score">98% match</span></div>
          <div className="teams"><div className="team"><div className="team-logo team-blue"><ShieldCheck size={29} /></div><strong>Velocity</strong><span>1,650 MMR</span><small>YOUR TEAM</small></div><div className="versus"><span>VS</span><div className="versus-line" /></div><div className="team"><div className="team-logo team-orange"><Swords size={28} /></div><strong>Aftershock</strong><span>1,710 MMR</span><small>OPPONENT</small></div></div>
          <div className="mmr-line"><span /><span /></div><div className="match-meta"><span><Check size={12} /> Only 60 MMR apart</span><span>EU · 3v3</span></div>
        </div>
        <div className="schedule-heading"><span><CalendarDays size={15} /> Lock in a time</span><div className="format-toggle" aria-label="Match format">{["BO5", "BO7"].map(value => <button key={value} className={format === value ? "selected" : ""} onClick={() => { setFormat(value); setConfirmed(false); }} aria-pressed={format === value}>{value}</button>)}</div></div>
        <div className="slot-row"><span>THU, NOV 12 <small>CET</small></span><div>{["19:00", "20:00", "21:00"].map(time => <button key={time} className={slot === time ? "selected" : ""} aria-pressed={slot === time} onClick={() => { setSlot(time); setConfirmed(false); }}>{time}</button>)}</div></div>
        <button className={`confirm-button ${confirmed ? "confirmed" : ""}`} onClick={() => setConfirmed(!confirmed)}>{confirmed ? <><CheckCheck size={16} /> Sample scrim confirmed · {slot}</> : <><LockKeyhole size={14} /> Confirm scrim <ArrowRight size={15} /></>}</button>
        <div className="product-bottom"><ShieldCheck size={12} /> Both captains confirm. No more maybes.</div>
      </div>
    </div>
    <div className="notification"><span className="discord-icon"><FaDiscord size={23} /></span><div><div className="notification-title">ScrimSync Bot <span>BOT</span><small>just now</small></div><p>{confirmed ? `Scrim confirmed! ${format} vs Aftershock at ${slot}.` : "Scrim locked in. Time to hit the field."} <span className="notification-check"><CheckCheck size={13} /></span></p><span className="notification-foot">Lobby details delivered. Zero back-and-forth.</span></div></div>
    <div className="preview-caption"><span /> Interactive product preview · sample teams</div>
  </div>;
}

function WaitlistForm() {
  const [email, setEmail] = useState("");
  const mutation = useJoinWaitlist();
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    mutation.mutate({ email });
  }
  return <div id="waitlist" className="waitlist-block">
    {mutation.isSuccess ? <output className="success-message"><CircleCheck size={22} /><span><strong>{mutation.data.alreadyJoined ? "You’re already on the list." : "You’re on the list. Let’s get competitive."}</strong><span>We’ll email you when ScrimSync is ready to launch.</span></span></output> : <form onSubmit={submit} className="waitlist-form"><div className="email-field"><Mail size={18} /><input type="email" aria-label="Email address" placeholder="Enter your email address" required maxLength={254} value={email} onChange={event => { setEmail(event.target.value); if (mutation.isError) mutation.reset(); }} autoComplete="email" /></div><button className="primary-button" disabled={mutation.isPending}>{mutation.isPending ? <><LoaderCircle className="spin" size={17} /> Joining…</> : <>Join the Waitlist <ArrowRight size={17} /></>}</button></form>}
    {mutation.isError && <p role="alert" className="form-error">We couldn’t save your email. Please try again.</p>}
    <p className="form-note"><ShieldCheck size={13} /> Free to join. No spam. Just better scrims.</p>
  </div>;
}

function DiscordDialog({ close }: { close: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => { const dialog = ref.current; dialog?.showModal(); return () => dialog?.close(); }, []);
  return <dialog ref={ref} className="discord-dialog" aria-labelledby="discord-title" onCancel={close}><button className="dialog-close" aria-label="Close dialog" onClick={close}><X size={20} /></button><span className="dialog-icon"><FaDiscord size={32} /></span><span className="overline">GOOD TEAMS STAY CONNECTED</span><h2 id="discord-title">Discord is next up.</h2><p>Discord login and our community server will be available at launch. Join the waitlist to be first in the lobby.</p><button className="primary-button" onClick={() => { close(); document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth", block: "center" }); setTimeout(() => document.querySelector<HTMLInputElement>("input[type=email]")?.focus(), 350); }}>Get early access <ArrowRight size={17} /></button></dialog>;
}

export default function Landing() {
  const [discordOpen, setDiscordOpen] = useState(false);
  return <div className="site-shell min-h-screen antialiased">
    <header className="navbar page-width"><Brand /><nav aria-label="Main navigation"><a href="#features" className="nav-link">Built for captains</a><span className="nav-divider" /><button className="discord-button" onClick={() => setDiscordOpen(true)}><FaDiscord size={18} /><span>Login with Discord</span><ArrowRight size={14} /></button></nav></header>
    <main>
      <section className="hero page-width" aria-labelledby="hero-title">
        <div className="hero-copy"><div className="eyebrow"><span className="status-dot" /> LESS ADMIN. MORE GAME TIME.<span className="early-badge">EARLY ACCESS</span></div><h1 id="hero-title">Stop wasting time<br className="desktop-break" /> in LFG channels.<br /><span>Automate your<br className="desktop-break" /> RL scrims.</span></h1><p className="hero-description">The ultimate 3v3 scrim scheduling platform for team captains. Find opponents, filter by MMR, and sync directly with Discord.</p><WaitlistForm /><div className="hero-benefits"><span><Check size={14} /> Built for 3v3</span><span><Check size={14} /> Captain-first</span><span><Check size={14} /> Discord-native</span></div></div>
        <ProductPreview />
      </section>
      <div className="utility-strip page-width"><span className="utility-label">YOUR TIME BELONGS ON THE FIELD.</span><div><span><Crosshair size={17} /> Balanced opponents</span><span><Clock3 size={17} /> Less scheduling chaos</span><span><FaDiscord size={18} /> All roads lead to Discord</span></div></div>
      <section id="features" className="features page-width" aria-labelledby="features-title"><div className="section-heading"><div><span className="overline">THE CAPTAIN’S UNFAIR ADVANTAGE</span><h2 id="features-title">Your next scrim. Minus the chaos.</h2></div><p>Three things between you and better practice.<br />We take care of all of them.</p></div>
        <div className="feature-grid">
          <article className="feature-card"><div className="feature-card-top"><span className="feature-icon blue"><Crosshair size={21} /></span><span className="feature-number">01 / MATCH</span></div><h3>Precision Matchmaking</h3><p>Filter opposing teams by ±100 MMR to guarantee balanced practice. Less searching. More meaningful games.</p><div className="feature-visual precision"><div><span>YOUR TEAM</span><strong>1,650 <small>MMR</small></strong></div><div className="range-track"><i /><span><Crosshair size={14} /></span><i /></div><div><span>YOUR SWEET SPOT</span><strong className="blue-text">1,550 — 1,750</strong></div></div><span className="feature-bottom"><Check size={13} /> Practice that actually pushes you</span></article>
          <article className="feature-card"><div className="feature-card-top"><span className="feature-icon orange"><CalendarDays size={21} /></span><span className="feature-number">02 / SCHEDULE</span></div><h3>Double-Validation Scheduling</h3><p>An interactive timeline to propose and lock in BO5 or BO7 slots seamlessly. Both captains agree. Everyone shows up.</p><div className="feature-visual mini-schedule"><div className="mini-times"><span>19:00</span><span>20:00</span><span>21:00</span></div><div className="timeline-block"><span /><div><CalendarDays size={13} /> BO5 scrim <span><CheckCheck size={13} /> Confirmed</span></div><span /></div><div className="mini-captains"><span><Check size={11} /> You confirmed</span><span><Check size={11} /> Opponent confirmed</span></div></div><span className="feature-bottom"><Check size={13} /> A handshake, not a guessing game</span></article>
          <article className="feature-card"><div className="feature-card-top"><span className="feature-icon blue"><MessageSquare size={21} /></span><span className="feature-number">03 / SYNC</span></div><h3>Automated Discord DMs</h3><p>Match requests, confirmations, and lobby details sent directly via bot. Keep your team in the loop, without lifting a finger.</p><div className="feature-visual mini-discord"><span className="mini-discord-logo"><FaDiscord size={21} /></span><div><strong>ScrimSync <span>BOT</span></strong><p>Your scrim is confirmed.</p><span>Lobby: Velocity vs Aftershock</span><div><span><LockKeyhole size={10} /> Details sent privately</span><CheckCheck size={13} /></div></div></div><span className="feature-bottom"><Check size={13} /> Your workflow. Your Discord.</span></article>
        </div>
      </section>
      <section className="closing-cta page-width"><div><span className="overline">PLAY MORE. CHASE LESS.</span><h2>Built for the captain.<br />Better for the whole team.</h2></div><a className="primary-button" href="#waitlist">Get early access <ArrowRight size={17} /></a></section>
    </main>
    <footer className="footer page-width"><div><Brand small /><span>© {new Date().getFullYear()} ScrimSync. All rights reserved.</span></div><button onClick={() => setDiscordOpen(true)}><FaDiscord size={17} /> Join our Discord <ArrowRight size={14} /></button><p>Not affiliated with Psyonix or Epic Games.</p></footer>
    {discordOpen && <DiscordDialog close={() => setDiscordOpen(false)} />}
  </div>;
}