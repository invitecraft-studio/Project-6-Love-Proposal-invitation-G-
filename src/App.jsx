import { useEffect, useRef, useState } from 'react'
import p1 from './assets/p1.png'; import p2 from './assets/p2.png'; import p3 from './assets/p3.png'
import c1 from './assets/c1.png'; import c2 from './assets/c2.png'; import c3 from './assets/c3.png'; import c4 from './assets/c4.png'; import c5 from './assets/c5.png'; import c6 from './assets/c6.png'
import p4 from './assets/p4.png'; import p5 from './assets/p5.png'; import p6 from './assets/p6.png'; import p7 from './assets/p7.png'

// ✏️ EDIT HERE. You can also override names via the link: ?from=Sravya&to=Harsha
const Q = new URLSearchParams(location.search)
const CONFIG = {
  from: Q.get('from') || 'Sravya',
  to: Q.get('to') || 'Harsha Vardhan',
  phone: '91XXXXXXXXXX',              // her WhatsApp number, country code first, no + or spaces
  since: '2024-02-14T18:00:00',       // the day you met / became friends
}
const first = CONFIG.to.split(' ')[0]

const LETTER = [
  `Dear ${first},`,
  `Somewhere between the first chai we shared and the last bus we missed on purpose, you became my favourite person. I did not plan it. It happened the way Sankranti mornings happen: quietly, with warmth, until everything felt like home.`,
  `You listen when I talk about nothing. You laugh at my terrible jokes. You say "nenu unnanu" when I am scared, and the world gets smaller and kinder. I have never told you what that means to me.`,
  `So here is the truth, with no filmy dialogues: I love you. I want ordinary days with you, with filter coffee, long drives and your silly playlists. I want the big days too, with my amma and nanna smiling in the front row.`,
  `I am done waiting for the right moment. This is it, and I am asking you today.`,
]
const EVENTS = [
  { img: p4, n: '1', t: 'The Hand', h: 'the day I stopped looking for directions', e: '🤝', d: 'The first time you held my hand in a crowded street, every sound faded. I forgot every direction except yours.', back: 'On the back I wrote: never let go in crowds, or anywhere else.' },
  { img: p5, n: '2', t: 'The Promise', h: 'one pinky, one rainy evening', e: '🤞', d: 'You made a tiny promise with one finger, and you have kept it every single day since. That is how I knew.', back: 'On the back I wrote: pinky promises are the strongest kind.' },
  { img: p6, n: '3', t: 'The Shoulder', h: 'where my worries go to sleep', e: '🌙', d: 'No place is quieter or safer. It is where I rest after every long day, and where I want to rest forever.', back: 'On the back I wrote: home is not a place. It is your shoulder.' },
  { img: p7, n: '4', t: 'The Forever', h: 'a hundred years from now', e: '♾️', d: 'Still side by side, still arguing about who gets the window seat, still choosing each other every morning.', back: 'On the back I wrote: save me the window seat, always.' },
]
const REASONS = [
  [c1, '50% 50%', 'Our red thread', 'They say an invisible red thread ties two hearts that are meant to meet. Mine led me straight to you.'],
  [c2, '50% 50%', 'Two rings, one promise', 'I do not want a grand life. I want a thousand quiet mornings with your hand in mine.'],
  [c3, '50% 50%', 'Every tomorrow', 'Whatever tomorrow brings, I want to face it as your best friend and your forever.'],
  [c4, '50% 50%', 'Walking home to you', 'One day we will walk that aisle together, and I will not stop smiling.'],
  [c5, '50% 100%', 'You make me bloom', 'Every small, gentle thing you do makes my heart open like a flower.'],
  [c6, '50% 50%', 'You see me', 'You notice every little moment of me. That is exactly why I fell for you.'],
]

function useInView(th = 0.25) {
  const ref = useRef(null); const [seen, set] = useState(false)
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { set(true); o.disconnect() } }, { threshold: th })
    ref.current && o.observe(ref.current); return () => o.disconnect()
  }, [th])
  return [ref, seen]
}

function Petals() {
  const c = useRef(null)
  useEffect(() => {
    const cv = c.current, x = cv.getContext('2d'); let raf, w, h
    const size = () => { w = cv.width = innerWidth; h = cv.height = innerHeight }; size(); addEventListener('resize', size)
    const ps = Array.from({ length: 26 }, () => ({ x: Math.random() * w, y: Math.random() * h, r: 4 + Math.random() * 6, s: .4 + Math.random() * .8, a: Math.random() * 6 }))
    const loop = () => {
      x.clearRect(0, 0, w, h)
      ps.forEach(p => { p.y += p.s; p.a += .02; p.x += Math.sin(p.a) * .6; if (p.y > h + 10) { p.y = -10; p.x = Math.random() * w }
        x.save(); x.translate(p.x, p.y); x.rotate(p.a); x.fillStyle = 'rgba(240,160,180,.55)'
        x.beginPath(); x.ellipse(0, 0, p.r, p.r * .6, 0, 0, 7); x.fill(); x.restore() })
      raf = requestAnimationFrame(loop)
    }
    loop(); return () => { cancelAnimationFrame(raf); removeEventListener('resize', size) }
  }, [])
  return <canvas id="petals" ref={c} aria-hidden="true" />
}


function Together() {
  const [t, setT] = useState(Date.now())
  useEffect(() => { const i = setInterval(() => setT(Date.now()), 1000); return () => clearInterval(i) }, [])
  const s = Math.max(0, Math.floor((t - new Date(CONFIG.since)) / 1000))
  const v = [[Math.floor(s / 86400), 'days'], [Math.floor(s / 3600) % 24, 'hours'], [Math.floor(s / 60) % 60, 'mins'], [s % 60, 'secs']]
  return <div className="cd" aria-label="Time since we met">{v.map(([n, l]) => <div key={l}><b>{n}</b><small>{l}</small></div>)}</div>
}

function fmt(t) { const a = t.split('I love you'); return a.length < 2 ? t : <>{a[0]}<mark>I love you</mark>{a[1]}</> }
function Letter() {
  const [ref, seen] = useInView(0.25); const [n, setN] = useState(0)
  const full = LETTER.join('\n')
  useEffect(() => { if (!seen) return; let i
    const to = setTimeout(() => { i = setInterval(() => setN(v => { if (v >= full.length) { clearInterval(i); return v } return v + 2 }), 24) }, 1100)
    return () => { clearTimeout(to); clearInterval(i) } }, [seen, full])
  const typed = full.slice(0, n).split('\n'); const done = n >= full.length
  return (
    <section className="lsec" id="letter">
      <div className="bokeh" aria-hidden="true">{Array.from({ length: 9 }, (_, i) => <span key={i} style={{ left: (i * 11 + 4) % 96 + '%', top: (i * 23 + 8) % 90 + '%', width: 30 + (i % 4) * 22, height: 30 + (i % 4) * 22, animationDelay: i * .8 + 's' }} />)}</div>
      <div className="sec">
        <article className={'paper' + (seen ? ' open' : '')} ref={ref} aria-label="Love letter">
          <span className="pin">♥</span>
          <span className="stamp hand">with love<br />{CONFIG.from} ♥</span>
          <img className="wm" src={p6} alt="" />
          {typed.map((p, i) => i === 0 ? <h2 key={i}>{p}</h2> : <p key={i} className={i === 1 ? 'drop' : ''}>{fmt(p)}</p>)}
          {!done && n > 0 && <span className="pen">✒</span>}
          {done && <p className="sign">Yours, always,<br />{CONFIG.from} ♥</p>}
        </article>
      </div>
    </section>
  )
}
function Divider() {
  return <svg className="div rv" viewBox="0 0 400 44" aria-hidden="true"><path d="M20 22H168M232 22H380" /><path className="hrt" d="M200 38C168 16 176 2 190 4 196 5 200 10 200 13 200 10 204 5 210 4 224 2 232 16 200 38Z" /></svg>
}

function Event({ e }) {
  const [ref, seen] = useInView(0.3); const [on, set] = useState(false)
  return (<div className={'ev' + (seen ? ' in' : '')} ref={ref}>
    <button className={'pol' + (on ? ' on' : '')} onClick={() => set(!on)} aria-label={'Flip photo: ' + e.t}>
      <i className="pf"><span className="tape" /><img src={e.img} alt={e.t} /><span className="cap hand">{e.h}</span></i>
      <i className="pb">{e.back}</i>
    </button>
    <div className="txt"><span className="num">{e.n}</span><p className="hand mood">{e.e} chapter {e.n}</p><h3>{e.t}</h3><p>{e.d}</p><p className="hint hand">tap the photo to read the back ↺</p></div></div>)
}

function Flip({ r }) {
  const [on, set] = useState(false)
  return <button className={'flip tall' + (on ? ' on' : '')} onClick={() => set(!on)} aria-pressed={on}>
    <i className="f"><b className="badge">♥</b><img src={r[0]} alt="" style={{ objectPosition: r[1] }} /><span>{r[2]}</span><small className="tap hand">tap to open my heart</small></i>
    <i className="b"><em className="hand">{r[3]}</em><b className="sig hand">{CONFIG.from} ♥</b></i></button>
}

function Confetti({ run }) {
  const c = useRef(null)
  useEffect(() => {
    if (!run) return
    const cv = c.current, x = cv.getContext('2d'); cv.width = innerWidth; cv.height = innerHeight; let raf
    const em = ['❤️', '💖', '🌸', '💕', '✨']
    const ps = Array.from({ length: 90 }, (_, i) => ({ x: Math.random() * cv.width, y: -Math.random() * cv.height, v: 2 + Math.random() * 3, e: em[i % 5], z: 16 + Math.random() * 22, a: Math.random() * 6 }))
    const loop = () => { x.clearRect(0, 0, cv.width, cv.height)
      ps.forEach(p => { p.y += p.v; p.a += .03; p.x += Math.sin(p.a); x.font = p.z + 'px serif'; x.fillText(p.e, p.x, p.y) })
      if (ps.some(p => p.y < cv.height + 40)) raf = requestAnimationFrame(loop) }
    loop(); return () => cancelAnimationFrame(raf)
  }, [run])
  return <canvas id="confetti" ref={c} aria-hidden="true" />
}

function Game() {
  const [ph, setPh] = useState('idle'); const [hs, setHs] = useState([]); const [sc, setSc] = useState(0); const [t, setT] = useState(25); const id = useRef(0)
  const start = () => { setSc(0); setT(25); setHs([]); setPh('play') }
  useEffect(() => { if (ph !== 'play') return
    const sp = setInterval(() => { const k = ++id.current; setHs(h => [...h.slice(-10), { k, x: 5 + Math.random() * 82, e: Math.random() < .22 ? '💔' : '❤️' }]) }, 620)
    const tm = setInterval(() => setT(v => v - 1), 1000); return () => { clearInterval(sp); clearInterval(tm) } }, [ph])
  useEffect(() => { if (ph !== 'play') return; if (sc >= 12) setPh('win'); else if (t <= 0) setPh('lose') }, [sc, t, ph])
  const hit = h => { setHs(x => x.filter(y => y.k !== h.k)); setSc(s => Math.max(0, s + (h.e === '💔' ? -2 : 1))) }
  return (<section className="game rv">
    <h2>Catch my heart</h2>
    <p>Collect 12 hearts in 25 seconds to unlock a secret note. Avoid the broken ones 💔</p>
    <div className="stats hand"><span>♥ {sc}/12</span><span>⏱ {Math.max(t, 0)}s</span></div>
    <div className="arena">
      {hs.map(h => <button key={h.k} className="fh" style={{ left: h.x + '%' }} onClick={() => hit(h)} aria-label="Catch heart">{h.e}</button>)}
      {ph !== 'play' && <div className="over">
        {ph === 'idle' && <><p className="hand">ready?</p><button className="act yes" onClick={start}>Start the game</button></>}
        {ph === 'lose' && <><p className="hand">so close! My heart is slippery</p><button className="act yes" onClick={start}>Try again</button></>}
        {ph === 'win' && <><p className="hand">You caught my heart! 💌</p><p className="secret">Secret note: I fell for you the day you laughed at my worst joke. I have been falling ever since.</p><a className="act yes" href="#ask">Now, the big question</a></>}
      </div>}
    </div></section>)
}

function Ask({ onYes }) {
  const [tries, setTries] = useState(0); const [pos, setPos] = useState({ x: 0, y: 0 })
  const lines = ['No', 'Are you sure?', 'Think again 🥺', 'Really?', 'Nice try', 'Just say yes!']
  const dodge = e => { e && e.preventDefault && e.preventDefault(); setTries(t => t + 1)
    const w = Math.min(innerWidth - 180, 320); setPos({ x: (Math.random() - .5) * w, y: (Math.random() - .5) * 120 }) }
  return (
    <section className="ask rv" id="ask" style={{ '--bg': `url(${p3})` }}>
      <div className="ask-card">
        <span className="cn c1">❦</span><span className="cn c2">❦</span><span className="cn c3">❦</span><span className="cn c4">❦</span>
        <div className="ringpic"><img src={p1} alt="Proposal illustration" /><b className="sp s1">✦</b><b className="sp s2">✧</b><b className="sp s3">✦</b></div>
        <p className="hand">after every chai, every walk and every late-night talk…</p>
        <h2>Will you be mine, forever?</h2>
        <p className="vow">I promise filter coffee every morning, your side of the blanket, and a lifetime of being your biggest fan.</p>
        <div className="btns">
          <button className="act yes glow" style={{ '--s': 1.07 + tries * .03, fontSize: `${1.1 + Math.min(tries, 6) * .1}rem` }} onClick={onYes}>Yes, forever 💍</button>
          <button className="act no" style={{ transform: `translate(${pos.x}px,${pos.y}px)` }} onMouseEnter={dodge} onTouchStart={dodge} onClick={dodge}>{lines[Math.min(tries, 5)]}</button>
        </div>
        <p className="tiny hand">(psst… the No button is very shy)</p>
      </div>
    </section>
  )
}

export default function App() {
  const [open, setOpen] = useState(false); const [gone, setGone] = useState(false)
  const [yes, setYes] = useState(false); const [pct, setPct] = useState(0)
  useEffect(() => { document.body.style.overflow = gone ? '' : 'hidden' }, [gone])
  useEffect(() => { const f = () => setPct(scrollY / Math.max(1, document.body.scrollHeight - innerHeight) * 100); addEventListener('scroll', f); return () => removeEventListener('scroll', f) }, [])
  useEffect(() => { const o = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) e.target.classList.add('in') }), { threshold: .12 })
    document.querySelectorAll('.rv').forEach(el => o.observe(el)); return () => o.disconnect() }, [])
  const openEnv = () => { setOpen(true); setTimeout(() => setGone(true), 1900) }
  const wa = `https://wa.me/${CONFIG.phone}?text=${encodeURIComponent('Yes, ' + CONFIG.from + '! I love you too ❤️')}`
  return (<>
    <div className="prog" style={{ width: pct + '%' }} />
    <Petals />
    <div className={'gate' + (gone ? ' gone' : '')}>
      {Array.from({ length: 14 }, (_, i) => <span key={i} className="rise" style={{ left: (i * 7 + 3) % 96 + '%', animationDelay: (i * .55) + 's', fontSize: 14 + (i % 4) * 8 + 'px' }}>{i % 3 ? '♥' : '✦'}</span>)}
      <div>
      <p className="hand pre">a letter written only for you</p>
      <button className={'env' + (open ? ' open' : '')} onClick={openEnv} aria-label="Break the seal and open the letter">
        <span className="body" /><span className="addr hand">To my favourite person ♥</span><span className="card" /><span className="flap" /><span className="seal">{CONFIG.from[0]}♥{first[0]}</span>
        {open && Array.from({ length: 16 }, (_, i) => <span key={i} className="bp" style={{ '--dx': Math.cos(i * .8) * (90 + (i % 4) * 40) + 'px', '--dy': -60 - Math.abs(Math.sin(i * .8)) * (110 + (i % 3) * 30) + 'px' }}>{i % 2 ? '🌹' : '🌸'}</span>)}
      </button>
      <h1>A letter for {CONFIG.to}</h1><p className="hand">touch the wax seal to open ♥</p></div></div>
    <header className={'hero' + (gone ? ' go' : '')} style={{ '--bg': `url(${p2})` }}><div className="hero-in">
      <p className="hand from"><span className="beat">♥</span> to the one my heart chose, from your {CONFIG.from}, with every beat of her heart</p>
      <h1>{first}, I have something to tell you</h1>
      <p>Every time I tried to say it in person, my heart beat so loudly that my words ran away. So I wrote it down, from the deepest part of me. Please read it slowly.</p>
      <Together /><a href="#letter">Read my letter</a></div></header>
    <Divider /><Letter /><Divider />
    <section className="story rv"><h2>Little things I keep close</h2>
      <div className="tl">{EVENTS.map(e => <Event key={e.t} e={e} />)}</div></section>
    <section className="why rv"><h2>Why it has always been you</h2><p className="hand" style={{ fontSize: '1.5rem', color: 'var(--rose)' }}>tap a card to open my heart</p>
      <div className="grid">{REASONS.map(r => <Flip key={r[0]} r={r} />)}</div></section>
    <Game />
    <Ask onYes={() => setYes(true)} />
    {yes && <div className="yay" style={{ '--bg': `url(${p2})` }} role="dialog"><div className="box">
      <img src={p1} alt="Proposal illustration" /><h2>He said yes!</h2>
      <p className="hand" style={{ fontSize: '1.8rem' }}>{CONFIG.from}, he said yes. Now go tell your amma!</p>
      <p>{first}, you just made me the happiest girl in Andhra Pradesh. Reply and tell me when you are free for filter coffee.</p>
      <a href={wa} target="_blank" rel="noopener noreferrer">Reply to {CONFIG.from} on WhatsApp</a></div></div>}
    <Confetti run={yes} />
    <footer>Made with love by {CONFIG.from}, for {first}</footer>
  </>)
}
