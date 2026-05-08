/* global React */
// NEXT XI · UI Kit · components.jsx
// Atoms + small composites used across screens.
// Loaded after React + Babel, before screens.jsx.

const { useState, useEffect, useRef } = React;

// ───── ICONS — 24px, 1.75 stroke, currentColor ─────
const Ico = ({ name, size = 24, fill = 'none' }) => {
  const stroke = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.75, strokeLinecap: 'round', strokeLinejoin: 'round' };
  const paths = {
    home:    <path {...stroke} d="M3 11 12 4l9 7v9a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1v-9Z"/>,
    pitch:   <g {...stroke}><circle cx="12" cy="12" r="9"/><path d="M12 3v18M3 12h18"/></g>,
    trophy:  <path {...stroke} d="M5 4h14v4a7 7 0 0 1-14 0V4ZM9 18h6v3H9zM12 15v3"/>,
    user:    <g {...stroke}><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></g>,
    bolt:    <path {...stroke} d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z"/>,
    flame:   <path fill="currentColor" d="M12 2c1 4-2 5-2 9a4 4 0 0 0 8 0c0-3-3-3-3-7 3 1 5 4 5 8a8 8 0 0 1-16 0c0-5 5-7 8-10Z"/>,
    shield:  <path {...stroke} d="M12 3 4 6v6c0 5 3 8 8 9 5-1 8-4 8-9V6l-8-3Z"/>,
    ball:    <g {...stroke}><circle cx="12" cy="12" r="9"/><path d="m9 9 6 6M15 9l-6 6"/></g>,
    check:   <path {...stroke} d="m3 12 5 5L21 4"/>,
    chev:    <path {...stroke} d="m9 6 6 6-6 6"/>,
    chevDown:<path {...stroke} d="m6 9 6 6 6-6"/>,
    arrow:   <path {...stroke} d="M5 12h14m-6-6 6 6-6 6"/>,
    plus:    <path {...stroke} d="M12 5v14M5 12h14"/>,
    bell:    <g {...stroke}><path d="M6 9a6 6 0 1 1 12 0v4l2 3H4l2-3V9Z"/><path d="M10 19a2 2 0 0 0 4 0"/></g>,
    settings:<g {...stroke}><circle cx="12" cy="12" r="3"/><path d="M19 12a7 7 0 0 0-.1-1.2l2-1.6-2-3.4-2.4.7a7 7 0 0 0-2-1.2L14 3h-4l-.5 2.3a7 7 0 0 0-2 1.2L5.1 5.8l-2 3.4 2 1.6A7 7 0 0 0 5 12a7 7 0 0 0 .1 1.2l-2 1.6 2 3.4 2.4-.7a7 7 0 0 0 2 1.2L10 21h4l.5-2.3a7 7 0 0 0 2-1.2l2.4.7 2-3.4-2-1.6Z"/></g>,
    play:    <path fill="currentColor" d="M7 4v16l13-8L7 4Z"/>,
    clock:   <g {...stroke}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></g>,
    activity:<path {...stroke} d="M3 12h4l3-7 4 14 3-7h4"/>,
    whistle: <g {...stroke}><path d="M12 20a8 8 0 0 0 8-8 8 8 0 1 0-16 0c0 4 4 6 4 9l4-1Z"/><path d="M16 8 9 14"/></g>,
    lock:    <g {...stroke}><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></g>,
    locale:  <g {...stroke}><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></g>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={{ display: 'block' }}>
      {paths[name]}
    </svg>
  );
};

// ───── Localization helper ─────
const STR = {
  tr: {
    home:'Ana sayfa', training:'Antrenman', achievements:'Başarımlar', profile:'Profil',
    todayMission:'Bugünkü hedef', startSession:'Antrenmana başla', viewReport:'Raporu gör',
    weeklyForm:'Bu haftaki form', level:'Seviye', xp:'XP', nextLevel:'Sonraki seviyeye',
    streak:'Seri', daysInRow:'gün üst üste', sessions:'Antrenmanlar', upcoming:'Yaklaşan',
    completed:'Tamamlandı', overall:'Genel · OVR', attributes:'Özellikler',
    pas:'Pas', sut:'Şut', hiz:'Hız', sav:'Savunma', dri:'Dribbling', fiz:'Fizik',
    coach:'Koç', team:'Takım', position:'Pozisyon', age:'Yaş', match:'Maç',
    unlocked:'Açıldı', locked:'Kilitli', inProgress:'Devam ediyor',
    parentReport:'Veli raporu', attendance:'Katılım', minutes:'Dakika',
    leaderboard:'Sıralama', viewAll:'Tümünü gör', hatTrick:'Hat Trick',
    winStreak:'Galibiyet serisi', captain:'Kaptan', moves:'Top sürme', signOut:'Çıkış yap',
    welcome:'Hoş geldin', earnedXP:'kazandın', goal:'Gol', assist:'Asist',
  },
  en: {
    home:'Home', training:'Training', achievements:'Achievements', profile:'Profile',
    todayMission:"Today's mission", startSession:'Start session', viewReport:'View report',
    weeklyForm:'Weekly form', level:'Level', xp:'XP', nextLevel:'To next level',
    streak:'Streak', daysInRow:'days in row', sessions:'Sessions', upcoming:'Upcoming',
    completed:'Completed', overall:'Overall · OVR', attributes:'Attributes',
    pas:'Passing', sut:'Shooting', hiz:'Pace', sav:'Defending', dri:'Dribbling', fiz:'Physical',
    coach:'Coach', team:'Team', position:'Position', age:'Age', match:'Match',
    unlocked:'Unlocked', locked:'Locked', inProgress:'In progress',
    parentReport:'Parent report', attendance:'Attendance', minutes:'Minutes',
    leaderboard:'Leaderboard', viewAll:'View all', hatTrick:'Hat Trick',
    winStreak:'Win Streak', captain:'Captain', moves:'Dribbling', signOut:'Sign out',
    welcome:'Welcome', earnedXP:'earned', goal:'Goal', assist:'Assist',
  },
};

// ───── ATOMS ─────
const Button = ({ kind = 'primary', children, onClick, full, icon, size = 'md' }) => {
  const base = {
    fontFamily: 'Manrope, system-ui', fontWeight: 700, letterSpacing: '0.04em',
    textTransform: 'uppercase', border: 'none', cursor: 'pointer',
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
    borderRadius: 12, transition: 'all 180ms cubic-bezier(0.22,1,0.36,1)',
    width: full ? '100%' : undefined,
  };
  const sizing = size === 'lg'
    ? { padding: '16px 22px', fontSize: 14 }
    : size === 'sm'
    ? { padding: '8px 12px', fontSize: 11 }
    : { padding: '12px 18px', fontSize: 13 };
  const styles = {
    primary: { background: '#00FF88', color: '#001A0E', boxShadow: '0 0 0 1px rgba(0,255,136,0.5), 0 12px 24px -12px rgba(0,255,136,0.35)' },
    secondary: { background: '#1C1C1C', color: '#fff', border: '1px solid rgba(255,255,255,0.10)' },
    ghost: { background: 'transparent', color: '#fff', border: '1px solid rgba(255,255,255,0.10)' },
  };
  return (
    <button onClick={onClick} style={{ ...base, ...sizing, ...styles[kind] }}
      onMouseDown={e => e.currentTarget.style.transform='scale(0.97)'}
      onMouseUp={e => e.currentTarget.style.transform='scale(1)'}
      onMouseLeave={e => e.currentTarget.style.transform='scale(1)'}>
      {children}
      {icon && <Ico name={icon} size={16}/>}
    </button>
  );
};

const Chip = ({ children, on, color, onClick }) => (
  <button onClick={onClick} style={{
    padding: '7px 14px', borderRadius: 999, border: '1px solid',
    fontFamily: 'Manrope', fontWeight: 600, fontSize: 12,
    background: on ? (color || '#00FF88') : '#1C1C1C',
    color: on ? '#001A0E' : '#B8B8B8',
    borderColor: on ? 'transparent' : 'rgba(255,255,255,0.06)',
    cursor: 'pointer', transition: 'all 180ms',
    whiteSpace: 'nowrap', flexShrink: 0,
  }}>{children}</button>
);

const SectionHead = ({ title, action, onAction }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '0 20px' }}>
    <span style={{ fontFamily: 'Oswald', fontWeight: 600, fontSize: 16, textTransform: 'uppercase',
      letterSpacing: '0.06em', color: '#fff' }}>{title}</span>
    {action && <span onClick={onAction} style={{ fontFamily: 'Manrope', fontWeight: 700, fontSize: 11,
      letterSpacing: '0.14em', textTransform: 'uppercase', color: '#7A7A7A', cursor: 'pointer' }}>{action} →</span>}
  </div>
);

const Label = ({ children, color = '#7A7A7A', style }) => (
  <span style={{ fontFamily: 'Manrope', fontWeight: 700, fontSize: 10,
    letterSpacing: '0.14em', textTransform: 'uppercase', color, ...style }}>{children}</span>
);

// ───── XP BAR ─────
const XPBar = ({ level = 14, current = 960, total = 1500, gain }) => {
  const pct = (current / total) * 100;
  const t = window.NXT_T || STR.tr;
  return (
    <div style={{ background: '#141414', border: '1px solid rgba(255,255,255,0.06)',
      borderRadius: 16, padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
          <Label>{t.level}</Label>
          <span style={{ fontFamily: 'Oswald', fontWeight: 700, fontSize: 48, color: '#fff', lineHeight: 0.9, fontVariantNumeric: 'tabular-nums' }}>
            {level}<span style={{ color: '#00FF88', textShadow: '0 0 24px rgba(0,255,136,0.45)' }}>.</span>
          </span>
        </div>
        <span style={{ fontFamily: 'JetBrains Mono', fontSize: 11, color: '#7A7A7A' }}>
          {t.nextLevel} <b style={{ color: '#fff', fontFamily: 'Oswald', fontWeight: 700, fontSize: 16 }}>{total-current}</b> XP
        </span>
      </div>
      <div style={{ height: 12, background: '#242424', borderRadius: 999, overflow: 'hidden',
        border: '1px solid rgba(255,255,255,0.06)', position: 'relative' }}>
        <div style={{ height: '100%', width: `${pct}%`, borderRadius: 999,
          background: 'linear-gradient(90deg,#00C46A,#00FF88)',
          boxShadow: '0 0 16px rgba(0,255,136,0.55)' }}/>
      </div>
      {gain != null && (
        <div style={{ display:'flex', alignItems:'center', gap: 8 }}>
          <span style={{ fontFamily:'Oswald', fontWeight:700, fontSize:22, color:'#00FF88', textShadow:'0 0 14px rgba(0,255,136,0.5)' }}>+{gain} XP</span>
          <span style={{ fontFamily:'Manrope', fontSize:12, color:'#7A7A7A' }}>{t.earnedXP}</span>
        </div>
      )}
    </div>
  );
};

// ───── ATTRIBUTE RING ─────
const AttributeRing = ({ value, label, delta, hi }) => {
  const r = 28, c = 2 * Math.PI * r;
  const off = c - (value / 99) * c;
  const color = hi === 'gold' ? '#FFB800' : hi === 'on' ? '#00FF88' : '#fff';
  return (
    <div style={{ background:'#141414', border:'1px solid rgba(255,255,255,0.06)',
      borderRadius: 12, padding: '10px 6px', display:'flex', flexDirection:'column',
      alignItems:'center', gap: 4 }}>
      <div style={{ position:'relative', width: 64, height: 64 }}>
        <svg width="64" height="64" style={{ transform:'rotate(-90deg)' }}>
          <circle cx="32" cy="32" r={r} stroke="rgba(255,255,255,0.08)" strokeWidth="5" fill="none"/>
          <circle cx="32" cy="32" r={r} stroke={color} strokeWidth="5" fill="none"
            strokeLinecap="round" strokeDasharray={c} strokeDashoffset={off}
            style={{ filter: hi==='on' ? 'drop-shadow(0 0 4px rgba(0,255,136,0.6))' : undefined }}/>
        </svg>
        <span style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center',
          fontFamily:'Oswald', fontWeight:700, fontSize: 22, color, textShadow: hi==='on' ? '0 0 10px rgba(0,255,136,0.4)' : 'none' }}>{value}</span>
      </div>
      <Label>{label}</Label>
      {delta != null && (
        <span style={{ fontFamily:'JetBrains Mono', fontSize: 10,
          color: delta > 0 ? '#00FF88' : '#FF3B30' }}>
          {delta > 0 ? '▲' : '▼'} {Math.abs(delta)}
        </span>
      )}
    </div>
  );
};

Object.assign(window, { Ico, STR, Button, Chip, SectionHead, Label, XPBar, AttributeRing });
