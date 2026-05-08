/* global React, Ico, STR, Button, Chip, SectionHead, Label */
// NEXT XI · v2 — Refined Home + Parent Dashboard + Onboarding/Settings
// Premium-football direction: less glow, tighter hierarchy, structured.

const { useState: useS2, useEffect: useE2 } = React;

// ────────────────────────────────────────────────────────────
// TIER SYSTEM (canonical XP bands + OVR bands)
// ────────────────────────────────────────────────────────────
const TIERS = [
  { key:'bronze', min:0,    max:999,  color:'#C28A4B', label:'BRONZE' },
  { key:'silver', min:1000, max:2499, color:'#D4D4D4', label:'SILVER' },
  { key:'gold',   min:2500, max:4999, color:'#FFB800', label:'GOLD'   },
  { key:'elite',  min:5000, max:7999, color:'#00FF88', label:'ELITE'  },
  { key:'legend', min:8000, max:Infinity, color:'#B26BFF', label:'LEGEND' },
];
const tierFor = (xp) => TIERS.find(t => xp <= t.max) || TIERS[0];
const nextTierOf = (xp) => {
  const i = TIERS.findIndex(t => xp <= t.max);
  return TIERS[Math.min(i + 1, TIERS.length - 1)];
};
const ovrBand = (ovr, lang) => {
  const map = lang==='tr'
    ? [[60,'Başlangıç'],[70,'Gelişen'],[80,'İleri'],[90,'Elit']]
    : [[60,'Beginner'],[70,'Developing'],[80,'Advanced'],[90,'Elite']];
  return map.reverse().find(([n]) => ovr >= n)?.[1] || map[0][1];
};

// ────────────────────────────────────────────────────────────
// SHARED PRIMITIVES
// ────────────────────────────────────────────────────────────
const Card = ({ children, style }) => (
  <div style={{
    background:'#141414', border:'1px solid rgba(255,255,255,0.06)',
    borderRadius: 16, padding: 16, ...style
  }}>{children}</div>
);

const TierBadge = ({ tier, size='md' }) => {
  const s = size === 'sm' ? { h: 18, fs: 9, px: 8 } : { h: 22, fs: 10, px: 10 };
  return (
    <span style={{
      display:'inline-flex', alignItems:'center', gap: 6,
      height: s.h, padding: `0 ${s.px}px`, borderRadius: 999,
      background: 'rgba(255,255,255,0.04)',
      border: `1px solid ${tier.color}40`,
      color: tier.color,
      fontFamily:'Manrope', fontWeight: 800, fontSize: s.fs,
      letterSpacing: '0.16em', textTransform:'uppercase',
    }}>
      <span style={{ width: 5, height: 5, borderRadius: 999, background: tier.color }}/>
      {tier.label}
    </span>
  );
};

const Avatar = ({ initials, size = 48, ring }) => (
  <div style={{
    width: size, height: size, borderRadius: '50%',
    background:'linear-gradient(135deg,#1f1f1f,#0c0c0c)',
    border: ring ? `2px solid ${ring}` : '1px solid rgba(255,255,255,0.10)',
    display:'flex', alignItems:'center', justifyContent:'center',
    fontFamily:'Oswald', fontWeight: 700, fontSize: size * 0.36,
    color:'#fff', letterSpacing: '0.04em', flexShrink: 0,
  }}>{initials}</div>
);

// ────────────────────────────────────────────────────────────
// COMPACT PLAYER CARD — Home hero (less neon, more structured)
// ────────────────────────────────────────────────────────────
const HomePlayerCard = ({ name, initials, position, age, ovr, xp, lang }) => {
  const tier = tierFor(xp);
  const next = nextTierOf(xp);
  const band = ovrBand(ovr, lang);
  return (
    <Card style={{ padding: 0, overflow:'hidden' }}>
      {/* Top row: avatar + identity + OVR */}
      <div style={{ display:'flex', alignItems:'center', gap: 14, padding: 16,
        borderBottom:'1px solid rgba(255,255,255,0.06)' }}>
        <Avatar initials={initials} size={56} ring={tier.color}/>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display:'flex', alignItems:'center', gap: 8, marginBottom: 4 }}>
            <TierBadge tier={tier} size="sm"/>
            <span style={{ fontFamily:'JetBrains Mono', fontSize: 10, color:'#7A7A7A' }}>{position} · {age}</span>
          </div>
          <div style={{ fontFamily:'Oswald', fontWeight:700, fontSize: 22, lineHeight: 1.05,
            textTransform:'uppercase', letterSpacing:'0.02em', color:'#fff',
            whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{name}</div>
        </div>
        <div style={{ textAlign:'right' }}>
          <div style={{ fontFamily:'Manrope', fontWeight: 700, fontSize: 9,
            letterSpacing:'0.18em', textTransform:'uppercase', color:'#7A7A7A' }}>OVR</div>
          <div style={{ fontFamily:'Oswald', fontWeight: 700, fontSize: 40,
            color:'#fff', lineHeight: 0.95 }}>{ovr}</div>
          <div style={{ fontFamily:'Manrope', fontWeight: 600, fontSize: 9,
            letterSpacing:'0.14em', textTransform:'uppercase', color: tier.color }}>{band}</div>
        </div>
      </div>
      {/* Bottom row: XP rail to next tier */}
      <div style={{ padding: 14, display:'flex', flexDirection:'column', gap: 8 }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline' }}>
          <span style={{ fontFamily:'Manrope', fontWeight: 700, fontSize: 10,
            letterSpacing:'0.16em', textTransform:'uppercase', color:'#7A7A7A' }}>
            {lang==='tr' ? `${next.label}'A` : `TO ${next.label}`}
          </span>
          <span style={{ fontFamily:'JetBrains Mono', fontSize: 11, color:'#fff' }}>
            {xp.toLocaleString()} <span style={{ color:'#4A4A4A' }}>/ {next.min.toLocaleString()} XP</span>
          </span>
        </div>
        <div style={{ height: 6, borderRadius: 3, background:'#242424', overflow:'hidden', position:'relative' }}>
          <div style={{
            position:'absolute', left: 0, top: 0, bottom: 0,
            width: `${Math.min(100, ((xp - tier.min) / (next.min - tier.min)) * 100)}%`,
            background: `linear-gradient(90deg, ${tier.color}, ${next.color})`,
            borderRadius: 3,
          }}/>
        </div>
      </div>
    </Card>
  );
};

// ────────────────────────────────────────────────────────────
// QUICK ACTION — 4-tile grid
// ────────────────────────────────────────────────────────────
const QuickAction = ({ icon, label, sub, accent, onClick }) => (
  <button onClick={onClick} style={{
    background:'#141414', border:'1px solid rgba(255,255,255,0.06)',
    borderRadius: 14, padding: 14, cursor:'pointer',
    display:'flex', flexDirection:'column', alignItems:'flex-start', gap: 10,
    color:'#fff', textAlign:'left', minHeight: 88, transition:'transform 120ms',
  }}
  onMouseDown={e => e.currentTarget.style.transform='scale(0.98)'}
  onMouseUp={e => e.currentTarget.style.transform='scale(1)'}
  onMouseLeave={e => e.currentTarget.style.transform='scale(1)'}>
    <div style={{ width: 30, height: 30, borderRadius: 8,
      background: accent ? 'rgba(0,255,136,0.10)' : '#1C1C1C',
      color: accent ? '#00FF88' : '#fff',
      display:'flex', alignItems:'center', justifyContent:'center',
      border: accent ? '1px solid rgba(0,255,136,0.25)' : '1px solid rgba(255,255,255,0.06)' }}>
      <Ico name={icon} size={16}/>
    </div>
    <div>
      <div style={{ fontFamily:'Manrope', fontWeight: 700, fontSize: 13, color:'#fff' }}>{label}</div>
      {sub && <div style={{ fontFamily:'Manrope', fontWeight: 500, fontSize: 11, color:'#7A7A7A', marginTop: 2 }}>{sub}</div>}
    </div>
  </button>
);

// ────────────────────────────────────────────────────────────
// HOME V2 — refined player home
// ────────────────────────────────────────────────────────────
const HomeScreenV2 = ({ lang, onStart, onTab }) => {
  const t = STR[lang];
  return (
    <div style={{ display:'flex', flexDirection:'column', gap: 18, paddingBottom: 12 }}>

      {/* Greeting */}
      <div style={{ padding:'4px 20px 0' }}>
        <Label>{t.welcome}, EFE</Label>
        <h1 style={{ fontFamily:'Oswald', fontWeight:700, fontSize: 28, lineHeight: 1.0,
          textTransform:'uppercase', letterSpacing:'0.02em', color:'#fff', margin:'4px 0 0' }}>
          {lang==='tr' ? 'Bugün antrenman var' : 'Training day'}
        </h1>
      </div>

      {/* Player card — primary identity */}
      <div style={{ padding:'0 20px' }}>
        <HomePlayerCard name="EFE YILDIZ" initials="EY" position="CAM" age="U16"
          ovr={82} xp={3420} lang={lang}/>
      </div>

      {/* Today's training — single focused card */}
      <div style={{ padding:'0 20px' }}>
        <Card style={{ padding: 0, overflow:'hidden' }}>
          <div style={{ display:'flex', alignItems:'center', gap: 12, padding: '14px 16px 12px' }}>
            <div style={{ width: 6, height: 36, borderRadius: 3, background:'#00FF88' }}/>
            <div style={{ flex: 1 }}>
              <Label>{lang==='tr' ? 'Bugün · 18:30' : 'Today · 18:30'}</Label>
              <div style={{ fontFamily:'Oswald', fontWeight:700, fontSize: 20,
                textTransform:'uppercase', letterSpacing:'0.02em', color:'#fff', marginTop: 2 }}>
                {lang==='tr' ? 'Bitiricilik · Set 4' : 'Finishing · Set 4'}
              </div>
            </div>
            <span style={{ fontFamily:'JetBrains Mono', fontSize: 11, color:'#00FF88' }}>+120 XP</span>
          </div>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between',
            padding: '10px 16px', borderTop:'1px solid rgba(255,255,255,0.06)',
            background:'rgba(255,255,255,0.015)' }}>
            <span style={{ fontFamily:'Manrope', fontSize: 12, color:'#B8B8B8' }}>
              {lang==='tr' ? 'Koç Ahmet · Pitch 2' : 'Coach Ahmet · Pitch 2'}
            </span>
            <Button kind="primary" size="sm" onClick={onStart} icon="arrow">
              {lang==='tr' ? 'Başla' : 'Start'}
            </Button>
          </div>
        </Card>
      </div>

      {/* Quick actions — 2x2 grid */}
      <div style={{ padding:'0 20px' }}>
        <SectionHead title={lang==='tr' ? 'Hızlı erişim' : 'Quick actions'}/>
      </div>
      <div style={{ padding:'0 20px', display:'grid', gridTemplateColumns:'1fr 1fr', gap: 10 }}>
        <QuickAction icon="trophy" accent
          label={lang==='tr' ? 'Antrenmana başla' : 'Start training'}
          sub={lang==='tr' ? 'Bugünkü drill' : "Today's drill"}
          onClick={onStart}/>
        <QuickAction icon="chart"
          label={lang==='tr' ? 'Gelişimimi gör' : 'View progress'}
          sub={lang==='tr' ? 'Stat & form' : 'Stats & form'}
          onClick={() => onTab('profile')}/>
        <QuickAction icon="lightning"
          label={lang==='tr' ? 'Drill kütüphanesi' : 'Drill library'}
          sub={lang==='tr' ? '24 drill' : '24 drills'}/>
        <QuickAction icon="medal"
          label={t.achievements}
          sub={lang==='tr' ? '14 / 32' : '14 / 32'}
          onClick={() => onTab('achievements')}/>
      </div>

      {/* Weekly challenge */}
      <div style={{ padding:'0 20px' }}>
        <SectionHead title={lang==='tr' ? 'Haftalık görev' : 'Weekly challenge'}/>
      </div>
      <div style={{ padding:'0 20px' }}>
        <Card>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap: 12 }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily:'Oswald', fontWeight:700, fontSize: 18,
                textTransform:'uppercase', letterSpacing:'0.02em', color:'#fff' }}>
                {lang==='tr' ? '5 antrenman tamamla' : 'Complete 5 sessions'}
              </div>
              <div style={{ fontFamily:'Manrope', fontSize: 12, color:'#B8B8B8', marginTop: 4 }}>
                {lang==='tr' ? 'Bu haftayı tam katılımla bitir.' : 'Finish the week with full attendance.'}
              </div>
            </div>
            <div style={{ textAlign:'right', flexShrink: 0 }}>
              <span style={{ fontFamily:'JetBrains Mono', fontSize: 11, color:'#FFB800' }}>+300 XP</span>
              <div style={{ fontFamily:'JetBrains Mono', fontSize: 10, color:'#7A7A7A', marginTop: 2 }}>
                {lang==='tr' ? '2 gün kaldı' : '2 days left'}
              </div>
            </div>
          </div>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center',
            marginTop: 14, marginBottom: 6 }}>
            <span style={{ fontFamily:'Manrope', fontWeight: 700, fontSize: 10,
              letterSpacing:'0.14em', textTransform:'uppercase', color:'#7A7A7A' }}>
              {lang==='tr' ? 'İlerleme' : 'Progress'}
            </span>
            <span style={{ fontFamily:'JetBrains Mono', fontSize: 11, color:'#fff' }}>3 / 5</span>
          </div>
          <div style={{ height: 5, borderRadius: 3, background:'#242424', overflow:'hidden' }}>
            <div style={{ height:'100%', width:'60%', background:'#FFB800', borderRadius: 3 }}/>
          </div>
        </Card>
      </div>

      {/* Mini leaderboard */}
      <div style={{ padding:'0 20px' }}>
        <SectionHead title={t.leaderboard}
          action={t.viewAll}/>
      </div>
      <div style={{ padding:'0 20px' }}>
        <Card style={{ padding: 6 }}>
          {[
            { rank:1, name:'Mert K.', xp:4280, you:false, tier: tierFor(4280) },
            { rank:2, name:'Efe Y.',  xp:3420, you:true,  tier: tierFor(3420) },
            { rank:3, name:'Burak A.', xp:3105, you:false, tier: tierFor(3105) },
          ].map((p) => (
            <div key={p.rank} style={{
              display:'flex', alignItems:'center', gap: 12, padding: '10px 12px',
              borderRadius: 10,
              background: p.you ? 'rgba(0,255,136,0.06)' : 'transparent',
              border: p.you ? '1px solid rgba(0,255,136,0.20)' : '1px solid transparent',
            }}>
              <span style={{ fontFamily:'Oswald', fontWeight: 700, fontSize: 18,
                color: p.rank===1 ? '#FFB800' : '#7A7A7A', width: 22, textAlign:'center' }}>
                {p.rank}
              </span>
              <Avatar initials={p.name.split(' ').map(s=>s[0]).join('')} size={32} ring={p.tier.color}/>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily:'Manrope', fontWeight: 700, fontSize: 13,
                  color: p.you ? '#00FF88' : '#fff' }}>
                  {p.name} {p.you && <span style={{ fontSize: 10, color:'#00FF88', marginLeft: 4 }}>· {lang==='tr'?'Sen':'You'}</span>}
                </div>
                <div style={{ fontFamily:'JetBrains Mono', fontSize: 10, color:'#7A7A7A' }}>U16 · CAM</div>
              </div>
              <span style={{ fontFamily:'JetBrains Mono', fontSize: 12, color:'#fff' }}>{p.xp.toLocaleString()}</span>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
};

// ────────────────────────────────────────────────────────────
// PARENT DASHBOARD — structured, NOT gamified
// ────────────────────────────────────────────────────────────
const ParentDashboardScreen = ({ lang }) => {
  const child = { name:'EFE YILDIZ', initials:'EY', position:'CAM', age:'U16', ovr: 82, xp: 3420 };
  const tier = tierFor(child.xp);
  const band = ovrBand(child.ovr, lang);
  return (
    <div style={{ display:'flex', flexDirection:'column', gap: 18, paddingBottom: 16 }}>

      {/* Greeting */}
      <div style={{ padding:'4px 20px 0' }}>
        <Label>{lang==='tr' ? 'Hoş geldiniz' : 'Welcome'}</Label>
        <h1 style={{ fontFamily:'Oswald', fontWeight:700, fontSize: 26,
          textTransform:'uppercase', letterSpacing:'0.02em', color:'#fff', margin:'4px 0 0' }}>
          {lang==='tr' ? 'Çocuğunuzun gelişimi' : "Your child's progress"}
        </h1>
      </div>

      {/* Child overview — minimal, no glow */}
      <div style={{ padding:'0 20px' }}>
        <Card>
          <div style={{ display:'flex', alignItems:'center', gap: 14 }}>
            <Avatar initials={child.initials} size={64}/>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily:'Oswald', fontWeight:700, fontSize: 22,
                textTransform:'uppercase', letterSpacing:'0.02em', color:'#fff' }}>
                {child.name}
              </div>
              <div style={{ fontFamily:'Manrope', fontSize: 12, color:'#B8B8B8', marginTop: 2 }}>
                {child.age} · {child.position} · Galatasaray
              </div>
            </div>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap: 12,
            marginTop: 16, paddingTop: 14, borderTop:'1px solid rgba(255,255,255,0.06)' }}>
            <div>
              <Label>{lang==='tr' ? 'Seviye' : 'Tier'}</Label>
              <div style={{ marginTop: 6 }}><TierBadge tier={tier}/></div>
            </div>
            <div>
              <Label>XP</Label>
              <div style={{ fontFamily:'Oswald', fontWeight:700, fontSize: 22, color:'#fff', marginTop: 2 }}>
                {child.xp.toLocaleString()}
              </div>
            </div>
            <div>
              <Label>OVR</Label>
              <div style={{ display:'flex', alignItems:'baseline', gap: 6, marginTop: 2 }}>
                <span style={{ fontFamily:'Oswald', fontWeight:700, fontSize: 22, color:'#fff' }}>{child.ovr}</span>
                <span style={{ fontFamily:'Manrope', fontWeight: 600, fontSize: 9,
                  letterSpacing:'0.14em', textTransform:'uppercase', color:'#B8B8B8' }}>{band}</span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Weekly report */}
      <div style={{ padding:'0 20px' }}>
        <SectionHead title={lang==='tr' ? 'Haftalık rapor' : 'Weekly report'}
          action={lang==='tr' ? 'PDF' : 'PDF'}/>
      </div>
      <div style={{ padding:'0 20px' }}>
        <Card>
          {/* Attendance */}
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline' }}>
            <Label>{lang==='tr' ? 'Katılım' : 'Attendance'}</Label>
            <span style={{ fontFamily:'JetBrains Mono', fontSize: 12, color:'#fff' }}>4 / 4</span>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(7,1fr)', gap: 4, marginTop: 8 }}>
            {[1,1,1,0,1,0,0].map((v,i) => (
              <div key={i} style={{ height: 6, borderRadius: 2,
                background: v ? '#00FF88' : '#242424' }}/>
            ))}
          </div>

          {/* Improvement indicators */}
          <div style={{ marginTop: 16, display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap: 10 }}>
            {[
              [lang==='tr'?'Katılım':'Attendance',  '+8%',  '#00FF88'],
              [lang==='tr'?'Çaba':'Effort',         '+12%', '#00FF88'],
              [lang==='tr'?'Form':'Form',           '+3%',  '#00FF88'],
            ].map(([l,v,c]) => (
              <div key={l} style={{ background:'#1C1C1C', borderRadius: 10, padding: 10 }}>
                <Label>{l}</Label>
                <div style={{ fontFamily:'Oswald', fontWeight:700, fontSize: 20, color: c, marginTop: 2 }}>{v}</div>
              </div>
            ))}
          </div>

          {/* Coach summary */}
          <div style={{ marginTop: 16, paddingTop: 14, borderTop:'1px solid rgba(255,255,255,0.06)' }}>
            <Label>{lang==='tr' ? 'Koç notu' : 'Coach note'}</Label>
            <div style={{ display:'flex', gap: 12, marginTop: 8 }}>
              <Avatar initials="KA" size={36}/>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily:'Manrope', fontWeight: 700, fontSize: 12, color:'#fff' }}>
                  {lang==='tr' ? 'Koç Ahmet' : 'Coach Ahmet'} <span style={{ color:'#7A7A7A', fontWeight: 500 }}>· {lang==='tr'?'Bu hafta':'This week'}</span>
                </div>
                <div style={{ fontFamily:'Manrope', fontSize: 13, color:'#B8B8B8', marginTop: 4, lineHeight: 1.45 }}>
                  {lang==='tr'
                    ? 'Efe bu hafta bitiricilik çalışmasında belirgin gelişme gösterdi. Pas seçiminde daha sakin.'
                    : 'Efe showed clear progress in finishing this week. Calmer with passing decisions.'}
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Coach feedback inbox */}
      <div style={{ padding:'0 20px' }}>
        <SectionHead title={lang==='tr' ? 'Koç geri bildirimi' : 'Coach feedback'}
          action={lang==='tr' ? 'Tümü' : 'All'}/>
      </div>
      <div style={{ padding:'0 20px', display:'flex', flexDirection:'column', gap: 8 }}>
        {[
          { c:'KA', name:lang==='tr'?'Koç Ahmet':'Coach Ahmet', when:lang==='tr'?'2 saat önce':'2h ago',
            t:lang==='tr'?'Bitiricilik · Set 4':'Finishing · Set 4',
            note:lang==='tr'?'Pas üçgenleri çok daha temiz. Aferin.':'Triangle passing much cleaner. Well done.' },
          { c:'SK', name:lang==='tr'?'Koç Selin':'Coach Selin', when:lang==='tr'?'Dün':'Yesterday',
            t:lang==='tr'?'Sprint · 6×200m':'Sprint · 6×200m',
            note:lang==='tr'?'Toparlanma süresinde gelişim var.':'Recovery time improving.' },
        ].map((m, i) => (
          <Card key={i} style={{ padding: 14 }}>
            <div style={{ display:'flex', gap: 12 }}>
              <Avatar initials={m.c} size={36}/>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline', gap: 8 }}>
                  <span style={{ fontFamily:'Manrope', fontWeight: 700, fontSize: 12, color:'#fff' }}>{m.name}</span>
                  <span style={{ fontFamily:'JetBrains Mono', fontSize: 10, color:'#7A7A7A' }}>{m.when}</span>
                </div>
                <div style={{ fontFamily:'Manrope', fontWeight: 600, fontSize: 11,
                  letterSpacing:'0.04em', color:'#7A7A7A', marginTop: 2 }}>{m.t}</div>
                <div style={{ fontFamily:'Manrope', fontSize: 13, color:'#B8B8B8', marginTop: 6, lineHeight: 1.45 }}>{m.note}</div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Performance summary */}
      <div style={{ padding:'0 20px' }}>
        <SectionHead title={lang==='tr' ? 'Performans özeti' : 'Performance summary'}/>
      </div>
      <div style={{ padding:'0 20px' }}>
        <Card>
          <Label>{lang==='tr' ? 'Güçlü yönler' : 'Strengths'}</Label>
          <div style={{ display:'flex', flexDirection:'column', gap: 8, marginTop: 8 }}>
            {(lang==='tr'
              ? ['Driblingde top kontrolü', 'Hız ve sprint toparlanması', 'Top istemede pozisyon']
              : ['Ball control on the dribble', 'Pace & sprint recovery', 'Positioning when receiving'])
              .map((s, i) => (
                <div key={i} style={{ display:'flex', gap: 10, alignItems:'flex-start' }}>
                  <div style={{ width: 18, height: 18, borderRadius: 999,
                    background:'rgba(0,255,136,0.10)', border:'1px solid rgba(0,255,136,0.30)',
                    color:'#00FF88', display:'flex', alignItems:'center', justifyContent:'center', flexShrink: 0 }}>
                    <Ico name="check" size={11}/>
                  </div>
                  <span style={{ fontFamily:'Manrope', fontSize: 13, color:'#fff', lineHeight: 1.4 }}>{s}</span>
                </div>
              ))}
          </div>
          <div style={{ height: 1, background:'rgba(255,255,255,0.06)', margin: '14px 0' }}/>
          <Label>{lang==='tr' ? 'Geliştirilecek alanlar' : 'Improvement areas'}</Label>
          <div style={{ display:'flex', flexDirection:'column', gap: 8, marginTop: 8 }}>
            {(lang==='tr'
              ? ['Savunma geçişlerinde geri dönüş', 'Sol ayakla bitiricilik']
              : ['Tracking back in defensive transition', 'Finishing with weak foot'])
              .map((s, i) => (
                <div key={i} style={{ display:'flex', gap: 10, alignItems:'flex-start' }}>
                  <div style={{ width: 18, height: 18, borderRadius: 999,
                    background:'rgba(255,184,0,0.10)', border:'1px solid rgba(255,184,0,0.30)',
                    color:'#FFB800', display:'flex', alignItems:'center', justifyContent:'center', flexShrink: 0 }}>
                    <Ico name="arrow" size={11}/>
                  </div>
                  <span style={{ fontFamily:'Manrope', fontSize: 13, color:'#fff', lineHeight: 1.4 }}>{s}</span>
                </div>
              ))}
          </div>
        </Card>
      </div>

      {/* Media */}
      <div style={{ padding:'0 20px' }}>
        <SectionHead title={lang==='tr' ? 'Fotoğraf & video' : 'Photos & video'}
          action={lang==='tr' ? 'Tümü' : 'All'}/>
      </div>
      <div style={{ padding:'0 20px', display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap: 8 }}>
        {[
          { kind:'video', t:'01:24', tint:'linear-gradient(135deg,#0E1A12,#050B07)' },
          { kind:'photo', tint:'linear-gradient(135deg,#1a1a1a,#0a0a0a)' },
          { kind:'photo', tint:'linear-gradient(135deg,#1f1f1f,#0c0c0c)' },
        ].map((m, i) => (
          <div key={i} style={{ aspectRatio:'1 / 1', borderRadius: 12,
            background: m.tint, border:'1px solid rgba(255,255,255,0.06)',
            position:'relative', overflow:'hidden' }}>
            {/* faint pitch lines */}
            <svg viewBox="0 0 100 100" preserveAspectRatio="none"
              style={{ position:'absolute', inset: 0, width:'100%', height:'100%', opacity: 0.5 }}>
              <rect x="6" y="6" width="88" height="88" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="0.6"/>
              <circle cx="50" cy="50" r="14" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="0.6"/>
            </svg>
            {m.kind === 'video' && (
              <>
                <div style={{ position:'absolute', inset: 0, display:'flex', alignItems:'center', justifyContent:'center' }}>
                  <div style={{ width: 32, height: 32, borderRadius: '50%',
                    background:'rgba(0,0,0,0.6)', border:'1px solid rgba(255,255,255,0.4)',
                    display:'flex', alignItems:'center', justifyContent:'center' }}>
                    <div style={{ width: 0, height: 0, marginLeft: 3,
                      borderTop:'5px solid transparent', borderBottom:'5px solid transparent',
                      borderLeft:'8px solid #fff' }}/>
                  </div>
                </div>
                <span style={{ position:'absolute', bottom: 6, right: 6,
                  fontFamily:'JetBrains Mono', fontSize: 9, color:'#fff',
                  background:'rgba(0,0,0,0.6)', padding:'2px 5px', borderRadius: 4 }}>{m.t}</span>
              </>
            )}
          </div>
        ))}
      </div>

      <div style={{ padding:'0 20px' }}>
        <Button kind="ghost" full onClick={()=>{}}>
          {lang==='tr' ? 'Tüm raporları gör' : 'View all reports'} →
        </Button>
      </div>
    </div>
  );
};

// ────────────────────────────────────────────────────────────
// ONBOARDING — language picker
// ────────────────────────────────────────────────────────────
const OnboardingScreen = ({ onPick, current }) => (
  <div style={{ display:'flex', flexDirection:'column', height:'100%', padding: 24,
    justifyContent:'space-between' }}>
    {/* Brand */}
    <div style={{ paddingTop: 24 }}>
      <div style={{ width: 56, height: 56, borderRadius: 14,
        background:'#0B0B0B', border:'1px solid rgba(0,255,136,0.35)',
        display:'flex', alignItems:'center', justifyContent:'center',
        marginBottom: 32 }}>
        <span style={{ fontFamily:'Oswald', fontWeight: 700, fontSize: 24, color:'#00FF88',
          letterSpacing:'0.02em' }}>XI</span>
      </div>
      <div style={{ fontFamily:'Manrope', fontWeight: 700, fontSize: 11,
        letterSpacing:'0.18em', textTransform:'uppercase', color:'#7A7A7A' }}>NEXT XI</div>
      <h1 style={{ fontFamily:'Oswald', fontWeight: 700, fontSize: 38, lineHeight: 1.0,
        textTransform:'uppercase', letterSpacing:'0.02em', color:'#fff', margin:'10px 0 12px' }}>
        Choose your<br/>language<span style={{ color:'#00FF88' }}>.</span>
      </h1>
      <div style={{ fontFamily:'Manrope', fontSize: 14, color:'#B8B8B8', lineHeight: 1.45 }}>
        Dilini seç. You can change this anytime in Settings.
      </div>
    </div>

    {/* Choices */}
    <div style={{ display:'flex', flexDirection:'column', gap: 10, flex: 1, justifyContent:'center' }}>
      {[
        { code:'tr', name:'Türkçe',  sub:'Varsayılan' },
        { code:'en', name:'English', sub:'Default' },
      ].map(l => (
        <button key={l.code} onClick={() => onPick(l.code)} style={{
          background: current===l.code ? 'rgba(0,255,136,0.06)' : '#141414',
          border: `1px solid ${current===l.code ? 'rgba(0,255,136,0.40)' : 'rgba(255,255,255,0.06)'}`,
          borderRadius: 14, padding: 16, cursor:'pointer', textAlign:'left',
          display:'flex', alignItems:'center', justifyContent:'space-between',
        }}>
          <div>
            <div style={{ fontFamily:'Oswald', fontWeight: 700, fontSize: 20,
              textTransform:'uppercase', letterSpacing:'0.04em',
              color: current===l.code ? '#00FF88' : '#fff' }}>{l.name}</div>
            <div style={{ fontFamily:'Manrope', fontSize: 11, color:'#7A7A7A',
              letterSpacing:'0.10em', textTransform:'uppercase', marginTop: 2 }}>{l.sub}</div>
          </div>
          {current===l.code && (
            <div style={{ width: 24, height: 24, borderRadius: 999, background:'#00FF88',
              color:'#001A0E', display:'flex', alignItems:'center', justifyContent:'center' }}>
              <Ico name="check" size={14}/>
            </div>
          )}
        </button>
      ))}
    </div>

    <Button kind="primary" full size="lg" onClick={() => onPick(current)} icon="arrow">
      {current==='tr' ? 'Devam et' : 'Continue'}
    </Button>
  </div>
);

// ────────────────────────────────────────────────────────────
// SETTINGS SHEET — language switcher (bottom sheet)
// ────────────────────────────────────────────────────────────
const SettingsSheet = ({ open, onClose, lang, setLang, role, setRole }) => {
  if (!open) return null;
  return (
    <div style={{ position:'absolute', inset: 0, zIndex: 30 }}>
      <div onClick={onClose} style={{ position:'absolute', inset: 0,
        background:'rgba(0,0,0,0.5)', backdropFilter:'blur(4px)' }}/>
      <div style={{ position:'absolute', left: 0, right: 0, bottom: 0,
        background:'#141414', borderRadius:'20px 20px 0 0',
        border:'1px solid rgba(255,255,255,0.06)',
        padding: 20, paddingBottom: 28,
        display:'flex', flexDirection:'column', gap: 16,
        boxShadow:'0 -24px 60px -24px rgba(0,0,0,0.95)' }}>
        <div style={{ width: 36, height: 4, borderRadius: 2, background:'rgba(255,255,255,0.18)',
          margin:'0 auto' }}/>
        <div style={{ fontFamily:'Oswald', fontWeight: 700, fontSize: 22,
          textTransform:'uppercase', letterSpacing:'0.02em', color:'#fff' }}>
          {lang==='tr' ? 'Ayarlar' : 'Settings'}
        </div>

        {/* Language */}
        <div>
          <Label>{lang==='tr' ? 'Dil' : 'Language'}</Label>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap: 8, marginTop: 8 }}>
            {[['tr','Türkçe'],['en','English']].map(([code,name]) => (
              <button key={code} onClick={() => setLang(code)} style={{
                padding:'12px 14px', borderRadius: 10, cursor:'pointer',
                background: lang===code ? 'rgba(0,255,136,0.06)' : '#1C1C1C',
                border:`1px solid ${lang===code ? 'rgba(0,255,136,0.40)' : 'rgba(255,255,255,0.06)'}`,
                color: lang===code ? '#00FF88' : '#fff',
                fontFamily:'Manrope', fontWeight: 700, fontSize: 13, textAlign:'left',
              }}>{name}</button>
            ))}
          </div>
        </div>

        {/* Role switch */}
        <div>
          <Label>{lang==='tr' ? 'Görünüm' : 'View'}</Label>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap: 8, marginTop: 8 }}>
            {[
              ['player', lang==='tr'?'Oyuncu':'Player'],
              ['parent', lang==='tr'?'Veli':'Parent'],
            ].map(([code,name]) => (
              <button key={code} onClick={() => setRole(code)} style={{
                padding:'12px 14px', borderRadius: 10, cursor:'pointer',
                background: role===code ? 'rgba(0,255,136,0.06)' : '#1C1C1C',
                border:`1px solid ${role===code ? 'rgba(0,255,136,0.40)' : 'rgba(255,255,255,0.06)'}`,
                color: role===code ? '#00FF88' : '#fff',
                fontFamily:'Manrope', fontWeight: 700, fontSize: 13, textAlign:'left',
              }}>{name}</button>
            ))}
          </div>
        </div>

        <div style={{ height: 1, background:'rgba(255,255,255,0.06)' }}/>

        <button onClick={onClose} style={{
          padding:'14px', borderRadius: 12, background:'#1C1C1C',
          border:'1px solid rgba(255,255,255,0.10)', color:'#fff',
          fontFamily:'Manrope', fontWeight: 700, fontSize: 13,
          letterSpacing:'0.06em', textTransform:'uppercase', cursor:'pointer',
        }}>{lang==='tr' ? 'Kapat' : 'Close'}</button>
      </div>
    </div>
  );
};

Object.assign(window, {
  TIERS, tierFor, nextTierOf, ovrBand,
  HomeScreenV2, ParentDashboardScreen, OnboardingScreen, SettingsSheet,
  TierBadge, Avatar, Card, HomePlayerCard,
});
