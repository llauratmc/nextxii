/* global React, Ico, STR, Button, Chip, SectionHead, Label */
// NEXT XI · UI Kit · components-2.jsx
// Larger composites — PlayerCard, BottomNav, SessionRow, Achievement, Streak.

const { useState: useStateB } = React;

// ───── PLAYER CARD ─────
const PlayerCard = ({ name='E. Yıldız', initials='EY', position='CAM', age='U16', ovr=82, tier='elite', stats }) => {
  const tints = {
    elite:  { halo:'rgba(0,255,136,0.35)',  bd:'rgba(0,255,136,0.45)',  num:'#00FF88', glow:'rgba(0,255,136,0.5)' },
    gold:   { halo:'rgba(255,184,0,0.35)',  bd:'rgba(255,184,0,0.5)',   num:'#FFB800', glow:'rgba(255,184,0,0.5)' },
    silver: { halo:'rgba(212,212,212,0.3)', bd:'rgba(212,212,212,0.4)', num:'#D4D4D4', glow:'rgba(255,255,255,0.3)' },
    legend: { halo:'rgba(178,107,255,0.4)', bd:'rgba(178,107,255,0.5)', num:'#D4B0FF', glow:'rgba(178,107,255,0.5)' },
  }[tier];
  return (
    <div style={{
      borderRadius: 20, padding: '16px 18px',
      background: `radial-gradient(120% 60% at 50% -20%, ${tints.halo}, transparent 55%), linear-gradient(180deg,#1a1a1a 0%,#0d0d0d 100%)`,
      border: `1px solid ${tints.bd}`,
      boxShadow: `0 0 0 1px ${tints.bd.replace('0.5','0.18').replace('0.45','0.12').replace('0.4','0.18').replace('0.3','0.12')}, 0 24px 60px -24px rgba(0,0,0,0.95)`,
      color: '#fff', display:'flex', flexDirection:'column', gap: 10,
    }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
        <span style={{ fontFamily:'Oswald', fontWeight:700, fontSize: 64, lineHeight: 0.9, color: tints.num,
          textShadow: `0 0 24px ${tints.glow}` }}>{ovr}</span>
        <div style={{ textAlign:'right', fontFamily:'Oswald', fontWeight:700, letterSpacing:'0.06em' }}>
          <div style={{ fontSize: 20, color: 'rgba(255,255,255,0.85)' }}>{position}</div>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', letterSpacing:'0.14em' }}>{age}</div>
        </div>
      </div>
      <div style={{ width:'100%', aspectRatio: 1, borderRadius: 14,
        background: 'radial-gradient(60% 60% at 50% 30%, #2c2c2c, transparent 70%), linear-gradient(180deg,#1f1f1f,#111)',
        display:'flex', alignItems:'center', justifyContent:'center',
        fontFamily:'Oswald', fontSize: 88, fontWeight:700,
        border:'1px solid rgba(255,255,255,0.06)' }}>{initials}</div>
      <div style={{ fontFamily:'Oswald', fontWeight:700, fontSize: 24, letterSpacing:'0.04em',
        textTransform:'uppercase', textAlign:'center' }}>{name}</div>
      {stats && (
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:'4px 8px',
          paddingTop: 8, borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          {stats.map(([v,l,up]) => (
            <div key={l} style={{ display:'flex', gap:4, alignItems:'baseline' }}>
              <span style={{ fontFamily:'Oswald', fontWeight:700, fontSize:18, color: up?'#00FF88':'#fff' }}>{v}</span>
              <span style={{ fontFamily:'Manrope', fontWeight:700, fontSize:9, letterSpacing:'0.12em', color:'rgba(255,255,255,0.55)' }}>{l}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// ───── BOTTOM NAV ─────
const BottomNav = ({ tab, setTab }) => {
  const t = window.NXT_T || STR.tr;
  const items = [
    { id:'home', label:t.home, ico:'home' },
    { id:'training', label:t.training, ico:'pitch' },
    { id:'achievements', label:t.achievements, ico:'trophy', badge:true },
    { id:'profile', label:t.profile, ico:'user' },
  ];
  return (
    <div style={{ background:'rgba(11,11,11,0.92)', backdropFilter:'blur(18px) saturate(140%)',
      borderTop:'1px solid rgba(255,255,255,0.10)', padding:'8px 6px 24px',
      display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap: 2 }}>
      {items.map(it => {
        const on = tab === it.id;
        return (
          <button key={it.id} onClick={() => setTab(it.id)} style={{
            background: on ? 'rgba(0,255,136,0.08)' : 'transparent', border: 'none',
            borderRadius: 12, padding: '8px 4px', cursor:'pointer',
            display:'flex', flexDirection:'column', alignItems:'center', gap: 4,
            color: on ? '#00FF88' : '#7A7A7A', position:'relative',
          }}>
            <span style={{ filter: on ? 'drop-shadow(0 0 8px rgba(0,255,136,0.6))' : 'none' }}>
              <Ico name={it.ico} size={24}/>
            </span>
            {it.badge && (
              <span style={{ position:'absolute', top: 6, right: 'calc(50% - 18px)', width: 7, height: 7,
                background:'#FF5C2E', borderRadius:'50%', boxShadow:'0 0 8px rgba(255,92,46,0.6)' }}/>
            )}
            <span style={{ fontFamily:'Manrope', fontWeight:600, fontSize: 9, letterSpacing:'0.14em',
              textTransform:'uppercase', color: on ? '#fff' : '#7A7A7A' }}>{it.label}</span>
          </button>
        );
      })}
    </div>
  );
};

// ───── TOP BAR ─────
const TopBar = ({ title, lang, setLang, onMenu }) => (
  <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between',
    padding: '4px 20px 12px' }}>
    <span style={{ fontFamily:'Oswald', fontWeight:700, fontSize: 22, letterSpacing:'0.04em',
      color:'#fff', textTransform:'uppercase' }}>
      {title || (<><span style={{ fontWeight: 500 }}>NEXT</span><span style={{ color:'#00FF88', marginLeft:4 }}>XI</span></>)}
    </span>
    <div style={{ display:'flex', gap: 8, alignItems:'center' }}>
      <button onClick={() => setLang(lang === 'tr' ? 'en' : 'tr')} style={{
        background:'#1C1C1C', border:'1px solid rgba(255,255,255,0.06)', color:'#B8B8B8',
        borderRadius: 999, padding: '4px 10px', fontFamily:'JetBrains Mono', fontSize: 11, cursor:'pointer',
        display:'inline-flex', alignItems:'center', gap: 4
      }}><Ico name="locale" size={12}/> {lang.toUpperCase()}</button>
      <button onClick={onMenu} style={{
        background:'#1C1C1C', border:'1px solid rgba(255,255,255,0.06)', color:'#B8B8B8',
        width: 36, height: 36, borderRadius: 999, cursor:'pointer', display:'inline-flex',
        alignItems:'center', justifyContent:'center'
      }}><Ico name="bell" size={18}/></button>
    </div>
  </div>
);

// ───── SESSION ROW ─────
const SessionRow = ({ time, title, coach, xp, status }) => {
  const isDone = status === 'done';
  const isLive = status === 'live';
  return (
    <div style={{ background:'#141414', border:'1px solid rgba(255,255,255,0.06)',
      borderRadius: 14, padding: '12px 14px', display:'flex', gap: 12, alignItems:'center' }}>
      <div style={{ width: 44, height: 44, borderRadius: 12,
        background: isLive ? 'rgba(0,255,136,0.12)' : isDone ? '#1C1C1C' : 'rgba(79,141,255,0.10)',
        color: isLive ? '#00FF88' : isDone ? '#7A7A7A' : '#4F8DFF',
        display:'flex', alignItems:'center', justifyContent:'center', flexShrink: 0,
        boxShadow: isLive ? '0 0 16px rgba(0,255,136,0.3)' : 'none' }}>
        <Ico name={isLive ? 'play' : isDone ? 'check' : 'clock'} size={20}/>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily:'Manrope', fontWeight: 700, fontSize: 14, color:'#fff' }}>{title}</div>
        <div style={{ display:'flex', gap: 8, alignItems:'center', marginTop: 2 }}>
          <Label color="#7A7A7A">{time}</Label>
          <span style={{ width: 3, height: 3, borderRadius: '50%', background:'#4A4A4A' }}/>
          <Label color="#7A7A7A" style={{ letterSpacing:'0.06em' }}>{coach}</Label>
        </div>
      </div>
      <div style={{ textAlign:'right' }}>
        {xp != null ? (
          <div style={{ fontFamily:'Oswald', fontWeight:700, fontSize: 18, color: isDone ? '#7A7A7A' : '#00FF88' }}>
            {isDone ? '+' : ''}{xp}<span style={{ fontSize: 10, marginLeft: 2, color:'#7A7A7A' }}>XP</span>
          </div>
        ) : null}
        {isLive && <Label color="#00FF88">Live</Label>}
      </div>
    </div>
  );
};

// ───── ACHIEVEMENT CARD ─────
const Achievement = ({ name, desc, status, progress, total, xp }) => {
  const unlocked = status === 'unlocked';
  const locked = status === 'locked';
  return (
    <div style={{ background:'#141414', borderRadius: 14, padding: 14,
      border: unlocked ? '1px solid rgba(0,255,136,0.4)' : '1px solid rgba(255,255,255,0.06)',
      boxShadow: unlocked ? '0 0 0 1px rgba(0,255,136,0.18) inset, 0 0 24px rgba(0,255,136,0.18)' : 'none',
      opacity: locked ? 0.55 : 1, filter: locked ? 'grayscale(0.6)' : 'none',
      display:'flex', flexDirection:'column', gap: 8, height: '100%' }}>
      <div style={{
        width: 44, height: 50,
        clipPath: 'polygon(50% 0,100% 22%,100% 78%,50% 100%,0 78%,0 22%)',
        background: unlocked ? 'linear-gradient(180deg,#00FF88,#00C46A)'
                  : locked ? 'linear-gradient(180deg,#2a2a2a,#1a1a1a)'
                  : 'linear-gradient(180deg,#FFB800,#B07700)',
        boxShadow: unlocked ? '0 0 24px rgba(0,255,136,0.45)' : 'none',
        display:'flex', alignItems:'center', justifyContent:'center',
        color: unlocked ? '#001A0E' : locked ? '#666' : '#1a1100'
      }}><Ico name={locked ? 'lock' : 'trophy'} size={22}/></div>
      <div style={{ fontFamily:'Oswald', fontWeight:700, fontSize: 14, textTransform:'uppercase',
        letterSpacing:'0.02em', color:'#fff', lineHeight: 1.1 }}>{name}</div>
      <div style={{ fontFamily:'Manrope', fontSize: 11, color:'#7A7A7A', lineHeight: 1.35 }}>{desc}</div>
      {!unlocked && progress != null && (
        <div style={{ marginTop:'auto' }}>
          <div style={{ height: 4, background:'#242424', borderRadius: 999, overflow:'hidden' }}>
            <div style={{ height:'100%', width: `${(progress/total)*100}%`, background: locked ? '#4A4A4A' : '#00FF88', boxShadow: locked ? 'none' : '0 0 8px rgba(0,255,136,0.5)' }}/>
          </div>
          <div style={{ display:'flex', justifyContent:'space-between', marginTop: 4 }}>
            <span style={{ fontFamily:'JetBrains Mono', fontSize: 10, color:'#B8B8B8' }}>{progress}/{total}</span>
            {xp && <span style={{ fontFamily:'JetBrains Mono', fontSize: 10, color:'#7A7A7A' }}>+{xp} XP</span>}
          </div>
        </div>
      )}
      {unlocked && (
        <div style={{ marginTop:'auto', display:'flex', justifyContent:'space-between' }}>
          <span style={{ fontFamily:'Manrope', fontWeight:700, fontSize: 10, letterSpacing:'0.14em', textTransform:'uppercase', color:'#00FF88' }}>UNLOCKED</span>
          {xp && <span style={{ fontFamily:'JetBrains Mono', fontSize: 10, color:'#7A7A7A' }}>+{xp} XP</span>}
        </div>
      )}
    </div>
  );
};

// ───── STREAK CARD ─────
const StreakCard = ({ days = 6, target = 7 }) => {
  const t = window.NXT_T || STR.tr;
  return (
    <div style={{ borderRadius: 16, padding: 16,
      background:'radial-gradient(120% 80% at 0% 100%, rgba(255,92,46,0.45), transparent 55%), #141414',
      border:'1px solid rgba(255,92,46,0.45)', display:'flex', flexDirection:'column', gap: 10 }}>
      <Label color="#7A7A7A">{t.streak}</Label>
      <div style={{ display:'flex', alignItems:'baseline', gap: 12 }}>
        <span style={{ fontFamily:'Oswald', fontWeight:700, fontSize: 56, lineHeight: 0.9, color:'#FF5C2E', textShadow:'0 0 24px rgba(255,92,46,0.55)' }}>{days}</span>
        <span style={{ fontFamily:'Oswald', fontWeight:600, fontSize: 14, textTransform:'uppercase',
          letterSpacing:'0.06em', color:'#fff' }}>{t.daysInRow}</span>
      </div>
      <div style={{ display:'flex', gap: 4, marginTop: 4 }}>
        {Array.from({length: target}).map((_, i) => (
          <div key={i} style={{ flex: 1, height: 6, borderRadius: 999,
            background: i < days ? '#FF5C2E' : '#242424',
            boxShadow: i < days ? '0 0 8px rgba(255,92,46,0.5)' : 'none' }}/>
        ))}
      </div>
    </div>
  );
};

Object.assign(window, { PlayerCard, BottomNav, TopBar, SessionRow, Achievement, StreakCard });
