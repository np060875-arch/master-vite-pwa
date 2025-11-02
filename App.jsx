
import React, { useState, useEffect, useRef } from "react";

export default function App() {
  const [profile, setProfile] = useState({ ten: "", nickname: "", quocTich: "", tuoi: "18", vaiTro: "Gold Lane", team: "Free Agent" });
  const initialStats = { niemTinDoi:60, cangThang:30, thichNghiMeta:50, kyNang:50, fame:20, noiTieng:20, anti:5, careerSeasons:0, prestige:0, skillPoints:3 };
  const [stats, setStats] = useState(() => JSON.parse(localStorage.getItem('master_stats')) || initialStats);
  const [log, setLog] = useState(() => JSON.parse(localStorage.getItem('master_log')) || [{who:'system', text:'Chào mừng tới MASTER — MLBB Chat Game (Tiếng Việt).'}]);
  const [input, setInput] = useState('');
  const [daBatDau, setDaBatDau] = useState(false);
  const endRef = useRef(null);
  useEffect(()=>{ localStorage.setItem('master_stats', JSON.stringify(stats)); }, [stats]);
  useEffect(()=>{ localStorage.setItem('master_log', JSON.stringify(log)); }, [log]);
  useEffect(()=>{ endRef.current?.scrollIntoView({behavior:'smooth'}); }, [log]);
  function pushLog(w,t){ setLog(l=>[...l,{who:w,text:t,time:new Date().toISOString()}]); }
  function clamp(n){ return Math.max(0,Math.min(100,Math.round(n))); }
  function batDau(){ setDaBatDau(true); pushLog('system','Bắt đầu sự nghiệp.'); }
  function choi(){ if(!daBatDau){ pushLog('system','Bấm Bắt đầu trước.'); return;} const good=Math.random()>0.5; pushLog('play', good? 'Anh hùng!':'Tội đồ!'); setStats(s=>({ ...s, kyNang: clamp(s.kyNang + (good?1:-0.5)), fame: clamp(s.fame + (good?2:0)), anti: clamp(s.anti + (good?0:3)) })); }
  function xuLy(){ const cmd = input.trim().toLowerCase(); setInput(''); if(!cmd) return; if(cmd==='choi') { choi(); return;} if(cmd==='start' || cmd==='batdau') { batDau(); return;} if(cmd==='reset'){ localStorage.clear(); window.location.reload(); } pushLog('player', cmd); }
  return (<div style={{minHeight:'100vh', padding:16}}>
    <header style={{display:'flex', justifyContent:'space-between', marginBottom:12}}><div><h1>MASTER</h1><div style={{fontSize:12}}>MLBB Chat Game - Tiếng Việt</div></div><div style={{textAlign:'right'}}><div>Mùa: {stats.careerSeasons}</div><div>Prestige: {stats.prestige}</div></div></header>
    <section style={{background:'#111827', padding:12, borderRadius:12, marginBottom:12}}>
      {!daBatDau? (<div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:8}}>
        <input placeholder="Tên thật" value={profile.ten} onChange={e=>setProfile({...profile, ten:e.target.value})} />
        <input placeholder="Nickname" value={profile.nickname} onChange={e=>setProfile({...profile, nickname:e.target.value})} />
        <input placeholder="Team" value={profile.team} onChange={e=>setProfile({...profile, team:e.target.value})} />
        <button onClick={batDau}>Bắt đầu</button>
      </div>) : (<div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}><div><b>{profile.nickname||profile.ten||'Tuyển thủ'}</b><div style={{fontSize:12}}>{profile.team} • {profile.vaiTro}</div></div><div><button onClick={choi}>Chơi trận</button></div></div>)}
    </section>
    <section style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:8, marginBottom:12}}>
      <div style={{background:'#0b1220', padding:8, borderRadius:8}}><div style={{fontSize:12}}>Niềm tin đội</div><div>{stats.niemTinDoi}</div></div>
      <div style={{background:'#0b1220', padding:8, borderRadius:8}}><div style={{fontSize:12}}>Căng thẳng</div><div>{stats.cangThang}</div></div>
    </section>
    <main style={{background:'#071028', padding:12, borderRadius:12, minHeight:200, overflow:'auto'}}>
      {log.map((it,i)=>(<div key={i} style={{marginBottom:8}}><div style={{fontSize:11, opacity:0.7}}>{new Date(it.time||Date.now()).toLocaleString()}</div><div>{it.text}</div></div>))}
      <div ref={endRef} />
    </main>
    <footer style={{display:'grid', gridTemplateColumns:'1fr 120px', gap:8, marginTop:12}}>
      <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>{ if(e.key==='Enter') xuLy(); }} placeholder="Lệnh: choi, start, reset..." />
      <button onClick={xuLy}>Gửi</button>
    </footer>
  </div>);
}
