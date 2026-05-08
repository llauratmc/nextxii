/* global React, Ico, STR, Button, Chip, SectionHead, Label, XPBar, AttributeRing,
   PlayerCard, BottomNav, TopBar, SessionRow, Achievement, StreakCard */
// NEXT XI · UI Kit · screens.jsx
// Composed screens used by the app prototype.

const { useState: useStateS } = React;

// ───── HOME SCREEN ─────
const HomeScreen = ({ lang, onStart, onTab }) => {
  const t = STR[lang];
  return (
    <div style={{ display:'flex', flexDirection:'column', gap: 18, paddingBottom: 8 }}>

      {/* Hero — today's mission */}
      <div style={{ padding: '0 20px' }}>
        <Label>{t.welcome}, EFE</Label>
        <h1 style={{ fontFamily:'Oswald', fontWeight: 700, fontSize: 36, lineHeight: 1.0,
          textTransform:'uppercase', letterSpacing:'0.02em', color:'#fff', margin:'4px 0 0' }}>
          {t.todayMission}<span style={{ color:'#00FF88' }}>.</span>
        </h1>
        <p style={{ fontFamily:'Manrope', fontSize: 14, lineHeight: 1.45, color:'#B8B8B8', margin: '8px 0 0' }}>
          {lang==='tr'
            ? 'Bugün bitiriciliğe odaklan. Antrenmana 18:30’da başlayacaksın — şimdi ısınmaya başla.'
            : 'Focus on finishing today. Session starts at 18:30 — warm up now.'}
        </p>
      </div>

      {/* Big CTA */}
      <div style={{ padding:'0 20px' }}>
        <Button kind="primary" size="lg" full onClick={onStart} icon="arrow">
          {t.startSession}
        </Button>
      </div>

      {/* XP / Level block */}
      <div style={{ padding:'0 20px' }}>
        <XPBar level={14} current={960} total={1500} gain={120}/>
      </div>

      {/* Streak + Quick stats row */}
      <div style={{ padding:'0 20px', display:'grid', gridTemplateColumns:'1.1fr 1fr', gap: 10 }}>
        <StreakCard days={6} target={7}/>
        <div style={{ background:'#141414', border:'1px solid rgba(255,255,255,0.06)',
          borderRadius: 16, padding: 16, display:'flex', flexDirection:'column', gap: 6 }}>
          <Label>OVR</Label>
          <span style={{ fontFamily:'Oswald', fontWeight:700, fontSize: 56, color:'#fff', lineHeight: 0.9 }}>82</span>
          <div style={{ display:'flex', gap: 6, alignItems:'center' }}>
            <span style={{ fontFamily:'JetBrains Mono', fontSize: 11, color:'#00FF88' }}>▲ 3</span>
            <Label color="#7A7A7A">{lang==='tr' ? 'son 4 hafta' : 'last 4 weeks'}</Label>
          </div>
        </div>
      </div>

      {/* Sessions */}
      <div style={{ display:'flex', flexDirection:'column', gap: 10 }}>
        <SectionHead title={t.upcoming} action={t.viewAll} onAction={() => onTab('training')}/>
        <div style={{ padding:'0 20px', display:'flex', flexDirection:'column', gap: 8 }}>
          <SessionRow status="live" time="18:30 · Pitch 2" coach={lang==='tr'?'Koç Ahmet':'Coach Ahmet'}
            title={lang==='tr'?'Bitiricilik · Set 4':'Finishing · Set 4'} xp={120}/>
          <SessionRow time="14 May · 18:30" coach={lang==='tr'?'Koç Selin':'Coach Selin'}
            title={lang==='tr'?'Pas üçgenleri':'Passing triangles'} xp={90}/>
        </div>
      </div>

      {/* Recent reward */}
      <div style={{ padding:'0 20px' }}>
        <div style={{ borderRadius: 16, padding: 16,
          background:'radial-gradient(120% 80% at 100% 0%, rgba(0,255,136,0.35), transparent 55%), #141414',
          border:'1px solid rgba(0,255,136,0.4)',
          boxShadow: '0 0 0 1px rgba(0,255,136,0.12)',
          display:'flex', flexDirection:'column', gap: 8 }}>
          <Label>{lang==='tr'?'Yeni başarım':'New achievement'}</Label>
          <div style={{ fontFamily:'Oswald', fontWeight:700, fontSize: 22, textTransform:'uppercase',
            letterSpacing:'0.04em', color:'#fff' }}>{t.hatTrick} {lang==='tr'?'kilidi açıldı':'unlocked'}</div>
          <div style={{ display:'flex', gap: 16, alignItems:'baseline' }}>
            <span style={{ fontFamily:'Oswald', fontWeight:700, fontSize: 44, color:'#00FF88', textShadow:'0 0 24px rgba(0,255,136,0.5)' }}>+250</span>
            <span style={{ fontFamily:'Manrope', fontWeight: 700, fontSize: 12, color:'#B8B8B8', letterSpacing:'0.14em', textTransform:'uppercase' }}>XP</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// ───── TRAINING SCREEN ─────
const TrainingScreen = ({ lang, onSession }) => {
  const [filter, setFilter] = useStateS('all');
  const t = STR[lang];
  const FilterChips = (
    <div style={{ display:'flex', gap: 6, padding:'0 20px', overflowX:'auto', scrollbarWidth:'none' }}>
      <Chip on={filter==='all'} onClick={() => setFilter('all')}>{lang==='tr'?'Tümü':'All'}</Chip>
      <Chip on={filter==='session'} onClick={() => setFilter('session')}>{t.training}</Chip>
      <Chip on={filter==='match'} onClick={() => setFilter('match')}>{t.match}</Chip>
      <Chip on={filter==='test'} onClick={() => setFilter('test')}>{lang==='tr'?'Test':'Test'}</Chip>
    </div>
  );
  return (
    <div style={{ display:'flex', flexDirection:'column', gap: 16, paddingBottom: 16 }}>
      <div style={{ padding:'0 20px' }}>
        <h1 style={{ fontFamily:'Oswald', fontWeight:700, fontSize: 32, textTransform:'uppercase',
          letterSpacing:'0.02em', color:'#fff', margin: 0 }}>{t.training}</h1>
        <Label>{lang==='tr'?'Bu hafta · 4 seans':'This week · 4 sessions'}</Label>
      </div>

      {/* Weekly bars */}
      <div style={{ padding:'0 20px' }}>
        <div style={{ background:'#141414', border:'1px solid rgba(255,255,255,0.06)',
          borderRadius: 16, padding: 14 }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline', marginBottom: 8 }}>
            <Label>{t.weeklyForm}</Label>
            <span style={{ fontFamily:'Oswald', fontWeight:700, fontSize: 22, color:'#00FF88', textShadow:'0 0 12px rgba(0,255,136,0.5)' }}>▲ +12%</span>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(7,1fr)', gap: 6, alignItems:'flex-end',
            height: 100, paddingBottom: 6, borderBottom:'1px solid rgba(0,255,136,0.18)' }}>
            {[18,55,22,70,28,95,60].map((h, i) => (
              <div key={i} style={{ display:'flex', alignItems:'flex-end', justifyContent:'center', height:'100%' }}>
                <div style={{ width: 22, height: `${h}%`,
                  borderRadius:'5px 5px 2px 2px',
                  background: i===5
                    ? 'linear-gradient(180deg,#FFB800,#B07700)'
                    : h > 40
                    ? 'linear-gradient(180deg,#00FF88,#00C46A)'
                    : 'linear-gradient(180deg,#2a2a2a,#1a1a1a)',
                  boxShadow: i===5 ? '0 0 12px rgba(255,184,0,0.4)' : h > 40 ? '0 0 10px rgba(0,255,136,0.3)' : 'none'
                }}/>
              </div>
            ))}
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(7,1fr)', marginTop: 6, textAlign:'center' }}>
            {(lang==='tr'?['Pzt','Sal','Çar','Per','Cum','Cmt','Paz']:['Mon','Tue','Wed','Thu','Fri','Sat','Sun']).map((d,i) => (
              <span key={d} style={{ fontFamily:'Manrope', fontSize: 9, letterSpacing:'0.12em',
                textTransform:'uppercase', color: i===5 ? '#FFB800' : '#7A7A7A' }}>{d}</span>
            ))}
          </div>
        </div>
      </div>

      {FilterChips}

      <div style={{ padding:'0 20px', display:'flex', flexDirection:'column', gap: 8 }}>
        <Label style={{ paddingLeft: 4, marginBottom: 2 }}>{t.upcoming}</Label>
        <div onClick={onSession} style={{ cursor:'pointer' }}>
          <SessionRow status="live" time="18:30 · Pitch 2" coach={lang==='tr'?'Koç Ahmet':'Coach Ahmet'}
            title={lang==='tr'?'Bitiricilik · Set 4':'Finishing · Set 4'} xp={120}/>
        </div>
        <SessionRow time="14 May · 18:30" coach={lang==='tr'?'Koç Selin':'Coach Selin'}
          title={lang==='tr'?'Pas üçgenleri':'Passing triangles'} xp={90}/>
        <SessionRow time="16 May · 10:00" coach={lang==='tr'?'Koç Ahmet':'Coach Ahmet'}
          title={lang==='tr'?'U16 maçı · Galatasaray':'U16 match · Galatasaray'} xp={200}/>

        <Label style={{ paddingLeft: 4, marginTop: 14, marginBottom: 2 }}>{t.completed}</Label>
        <SessionRow status="done" time="11 May · 18:30" coach={lang==='tr'?'Koç Ahmet':'Coach Ahmet'}
          title={lang==='tr'?'Sprint · 6×200m':'Sprint · 6×200m'} xp={140}/>
        <SessionRow status="done" time="9 May · 17:00" coach={lang==='tr'?'Koç Selin':'Coach Selin'}
          title={lang==='tr'?'Top sürme drili':'Dribbling drill'} xp={110}/>
      </div>
    </div>
  );
};

// ───── ACHIEVEMENTS SCREEN ─────
const AchievementsScreen = ({ lang }) => {
  const t = STR[lang];
  return (
    <div style={{ display:'flex', flexDirection:'column', gap: 16, paddingBottom: 16 }}>
      <div style={{ padding:'0 20px' }}>
        <h1 style={{ fontFamily:'Oswald', fontWeight:700, fontSize: 32, textTransform:'uppercase',
          letterSpacing:'0.02em', color:'#fff', margin: 0 }}>{t.achievements}</h1>
        <Label>14 / 32 · 44%</Label>
      </div>

      {/* Progress ring + summary */}
      <div style={{ padding:'0 20px' }}>
        <div style={{ background:'#141414', border:'1px solid rgba(255,255,255,0.06)',
          borderRadius: 16, padding: 16, display:'flex', gap: 16, alignItems:'center' }}>
          <div style={{ position:'relative', width: 96, height: 96, flexShrink: 0 }}>
            <svg width="96" height="96" style={{ transform:'rotate(-90deg)' }}>
              <circle cx="48" cy="48" r="40" stroke="#242424" strokeWidth="8" fill="none"/>
              <circle cx="48" cy="48" r="40" stroke="#00FF88" strokeWidth="8" fill="none"
                strokeLinecap="round"
                strokeDasharray="251.3" strokeDashoffset={251.3 - (14/32)*251.3}
                style={{ filter:'drop-shadow(0 0 6px rgba(0,255,136,0.5))' }}/>
            </svg>
            <span style={{ position:'absolute', inset:0, display:'flex', alignItems:'center',
              justifyContent:'center', flexDirection:'column' }}>
              <span style={{ fontFamily:'Oswald', fontWeight:700, fontSize: 28, color:'#fff', lineHeight: 1 }}>14</span>
              <span style={{ fontFamily:'JetBrains Mono', fontSize: 9, color:'#7A7A7A' }}>/ 32</span>
            </span>
          </div>
          <div style={{ flex:1 }}>
            <Label>{lang==='tr'?'Toplam XP':'Total XP'}</Label>
            <div style={{ fontFamily:'Oswald', fontWeight:700, fontSize: 36, color:'#fff', lineHeight: 1, margin:'4px 0' }}>3,420</div>
            <span style={{ fontFamily:'JetBrains Mono', fontSize: 11, color:'#FFB800' }}>{lang==='tr'?'Gold tier yolunda':'On track for Gold tier'}</span>
          </div>
        </div>
      </div>

      <SectionHead title={lang==='tr'?'Açılan başarımlar':'Unlocked'}/>
      <div style={{ padding:'0 20px', display:'grid', gridTemplateColumns:'1fr 1fr', gap: 10 }}>
        <Achievement status="unlocked" name={t.hatTrick}
          desc={lang==='tr'?'Tek maçta 3 gol at.':'Score 3 goals in one match.'} xp={250}/>
        <Achievement status="unlocked" name={lang==='tr'?'7 günlük seri':'7-day streak'}
          desc={lang==='tr'?'7 gün üst üste çalış.':'Train 7 days in a row.'} xp={180}/>
      </div>

      <SectionHead title={t.inProgress}/>
      <div style={{ padding:'0 20px', display:'grid', gridTemplateColumns:'1fr 1fr', gap: 10 }}>
        <Achievement name={t.winStreak}
          desc={lang==='tr'?'Üst üste 5 maç kazan.':'Win 5 matches in a row.'}
          progress={3} total={5} xp={180}/>
        <Achievement name={lang==='tr'?'10 asist':'10 assists'}
          desc={lang==='tr'?'Sezonda 10 asist yap.':'10 assists this season.'}
          progress={6} total={10} xp={150}/>
      </div>

      <SectionHead title={t.locked}/>
      <div style={{ padding:'0 20px', display:'grid', gridTemplateColumns:'1fr 1fr', gap: 10 }}>
        <Achievement status="locked" name={t.captain}
          desc={lang==='tr'?'10 maça kaptan olarak çık.':'Lead 10 matches as captain.'}
          progress={0} total={10}/>
        <Achievement status="locked" name={lang==='tr'?'Rakip yok':'No equal'}
          desc={lang==='tr'?'OVR 90+ ulaş.':'Reach OVR 90+.'} progress={0} total={1}/>
      </div>
    </div>
  );
};

// ───── PROFILE SCREEN ─────
const ProfileScreen = ({ lang }) => {
  const t = STR[lang];
  return (
    <div style={{ display:'flex', flexDirection:'column', gap: 18, paddingBottom: 16 }}>

      <div style={{ padding:'0 20px' }}>
        <PlayerCard name="EFE YILDIZ" initials="EY" position="CAM" age="U16" ovr={82} tier="elite"
          stats={[[79,'PAS',true],[81,'ŞUT'],[85,'HIZ'],[76,'SAV'],[88,'DRİ',true],[74,'FİZ']]}/>
      </div>

      {/* Bio chips */}
      <div style={{ padding:'0 20px', display:'flex', gap: 6, flexWrap:'wrap' }}>
        <Chip>U16 · Galatasaray</Chip>
        <Chip>{t.position}: CAM</Chip>
        <Chip>{lang==='tr'?'Sağ ayak':'Right foot'}</Chip>
        <Chip>175 cm</Chip>
      </div>

      {/* Attributes */}
      <SectionHead title={t.attributes}/>
      <div style={{ padding:'0 20px', display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap: 8 }}>
        <AttributeRing value={79} label={t.pas} delta={6} hi="on"/>
        <AttributeRing value={81} label={t.sut} delta={2} hi="gold"/>
        <AttributeRing value={85} label={t.hiz} delta={1}/>
        <AttributeRing value={76} label={t.sav} delta={-2}/>
        <AttributeRing value={88} label={t.dri} delta={4} hi="on"/>
        <AttributeRing value={74} label={t.fiz} delta={1}/>
      </div>

      {/* Season totals */}
      <SectionHead title={lang==='tr'?'Sezon istatistikleri':'Season stats'}/>
      <div style={{ padding:'0 20px', display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap: 8 }}>
        {[
          ['12', t.match, '#fff'],
          ['8', t.goal, '#00FF88'],
          ['11', t.assist, '#fff'],
        ].map(([v,l,c]) => (
          <div key={l} style={{ background:'#141414', border:'1px solid rgba(255,255,255,0.06)',
            borderRadius: 12, padding: 14, display:'flex', flexDirection:'column', gap: 4 }}>
            <span style={{ fontFamily:'Oswald', fontWeight:700, fontSize: 36, color: c, lineHeight: 0.9 }}>{v}</span>
            <Label>{l}</Label>
          </div>
        ))}
      </div>

      <div style={{ padding:'0 20px' }}>
        <Button kind="ghost" full onClick={()=>{}}>{t.parentReport} →</Button>
      </div>
    </div>
  );
};

// ───── SESSION DETAIL (live) ─────
const SessionDetailScreen = ({ lang, onClose, onComplete }) => {
  const t = STR[lang];
  return (
    <div style={{ display:'flex', flexDirection:'column', gap: 18, paddingBottom: 16 }}>
      <div style={{ padding:'0 20px', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <button onClick={onClose} style={{ background:'#1C1C1C', border:'1px solid rgba(255,255,255,0.06)',
          color:'#fff', borderRadius: 999, padding: '8px 12px', cursor:'pointer',
          fontFamily:'Manrope', fontWeight:700, fontSize: 12, letterSpacing:'0.08em', textTransform:'uppercase' }}>← {lang==='tr'?'Geri':'Back'}</button>
        <Label color="#00FF88">● LIVE</Label>
      </div>

      {/* Pitch hero */}
      <div style={{ margin: '0 20px', borderRadius: 18, height: 160, position:'relative', overflow:'hidden',
        background:'linear-gradient(180deg,#0E1A12,#050B07)', border:'1px solid rgba(0,255,136,0.18)' }}>
        <svg viewBox="0 0 320 160" style={{ position:'absolute', inset: 12, width: 'calc(100% - 24px)', height: 'calc(100% - 24px)' }}>
          <rect x="0" y="0" width="320" height="160" fill="none" stroke="rgba(0,255,136,0.28)" strokeWidth="1.2"/>
          <line x1="160" y1="0" x2="160" y2="160" stroke="rgba(0,255,136,0.18)" strokeWidth="1"/>
          <circle cx="160" cy="80" r="22" fill="none" stroke="rgba(0,255,136,0.22)" strokeWidth="1"/>
          <rect x="0" y="40" width="40" height="80" fill="none" stroke="rgba(0,255,136,0.22)"/>
          <rect x="280" y="40" width="40" height="80" fill="none" stroke="rgba(0,255,136,0.22)"/>
          <circle cx="240" cy="80" r="6" fill="#00FF88" style={{ filter:'drop-shadow(0 0 10px rgba(0,255,136,0.6))'}}/>
        </svg>
        <div style={{ position:'absolute', left: 16, bottom: 14 }}>
          <Label color="rgba(255,255,255,0.6)">{lang==='tr'?'Pitch 2 · Bitiricilik':'Pitch 2 · Finishing'}</Label>
          <div style={{ fontFamily:'Oswald', fontWeight:700, fontSize: 28, color:'#fff', lineHeight: 1 }}>SET 4 / 6</div>
        </div>
      </div>

      <div style={{ padding:'0 20px' }}>
        <div style={{ background:'#141414', border:'1px solid rgba(255,255,255,0.06)',
          borderRadius: 16, padding: 16, display:'flex', gap: 14 }}>
          <div style={{ flex:1 }}>
            <Label>{lang==='tr'?'Süre':'Elapsed'}</Label>
            <div style={{ fontFamily:'Oswald', fontWeight:700, fontSize: 36, color:'#fff', fontVariantNumeric:'tabular-nums' }}>24:18</div>
          </div>
          <div style={{ width: 1, background:'rgba(255,255,255,0.08)' }}/>
          <div style={{ flex:1 }}>
            <Label>{lang==='tr'?'Bu seans XP':'Session XP'}</Label>
            <div style={{ fontFamily:'Oswald', fontWeight:700, fontSize: 36, color:'#00FF88', textShadow:'0 0 18px rgba(0,255,136,0.4)' }}>+86</div>
          </div>
        </div>
      </div>

      {/* Drills */}
      <SectionHead title={lang==='tr'?'Driller':'Drills'}/>
      <div style={{ padding:'0 20px', display:'flex', flexDirection:'column', gap: 8 }}>
        <SessionRow status="done" time="06:00" coach={lang==='tr'?'Isınma':'Warm-up'} title={lang==='tr'?'Dinamik esneme':'Dynamic stretch'} xp={20}/>
        <SessionRow status="done" time="08:00" coach={lang==='tr'?'Pas':'Passing'} title={lang==='tr'?'Üçgen pas drili':'Triangle passing'} xp={28}/>
        <SessionRow status="live" time="10:30" coach={lang==='tr'?'Şut':'Shooting'} title={lang==='tr'?'Bitiricilik · uzaktan':'Finishing · long range'} xp={38}/>
        <SessionRow time="—" coach={lang==='tr'?'Maç simülasyonu':'Scrimmage'} title={lang==='tr'?'5v5 · 2 takım':'5v5 · 2 teams'}/>
      </div>

      <div style={{ padding:'0 20px' }}>
        <Button kind="primary" full size="lg" icon="check" onClick={onComplete}>
          {lang==='tr'?'Drili tamamla':'Complete drill'}
        </Button>
      </div>
    </div>
  );
};

Object.assign(window, { HomeScreen, TrainingScreen, AchievementsScreen, ProfileScreen, SessionDetailScreen });
