import {useState,useEffect} from 'react'
import {Q} from './questions'
import './App.css'
const ld=(k,d)=>{try{return JSON.parse(localStorage.getItem(k))??d}catch{return d}}
const sv=(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v))}catch{}}
const T={uz:{brand:"Bayroq Viktorinasi",reg:"Ro'yxatdan o'tish",slogan:"Bayrog'im – iftixorim",back:"Orqaga",fin:"Tugatish",home:"Bosh sahifa",ppl:"Ishtirokchilar",hi:"Salom",intro:"Davlat bayrog'i bo'yicha 10 ta savoldan iborat viktorinada bilimingizni sinab ko'ring!",start:"Viktorinani boshlash",done:"Viktorina yakunlandi!",yours:"Sizning balingiz",ended:"Siz viktorinada qatnashib bo'lgansiz",q:"Savol",ex:"Masalan: ",
facts:["Bayroqimiz 1991-yil 18-noyabrda qabul qilingan","Bayroq eni va uzunligi nisbati 1:2","Ikki ingichka qizil chiziq – hayot tomirlari ramzi","12 ta yulduz va hilol – yangi tong ramzi"],
cols:[["Ko'k","Musaffo osmon va hayot suvi","#0099B5"],["Oq","Tinchlik va poklik","#e9eef0"],["Yashil","Tabiat va yangilanish","#1EB53A"]],
fl:[["tuman","Tuman","Chilonzor"],["mahalla","Mahalla","Bog'ishamol"],["ism","Ism","Aziz"],["fam","Familya","Karimov"],["maktab","Maktab raqami","45"],["sinf","Sinf","7-A"]],tag:"Bilimdon bo'l!"},
ru:{brand:"Викторина о флаге",reg:"Регистрация",slogan:"Мой флаг – моя гордость",back:"Назад",fin:"Завершить",home:"Главная",ppl:"Участники",hi:"Привет",intro:"Проверьте свои знания в викторине из 10 вопросов о Государственном флаге!",start:"Начать викторину",done:"Викторина завершена!",yours:"Ваш балл",ended:"Вы уже приняли участие в викторине",q:"Вопрос",ex:"Например: ",
facts:["Наш флаг принят 18 ноября 1991 года","Соотношение ширины и длины флага 1:2","Две тонкие красные полосы – символ жизненных сил","12 звёзд и полумесяц – символ новой зари"],
cols:[["Синий","Чистое небо и вода жизни","#0099B5"],["Белый","Мир и чистота","#e9eef0"],["Зелёный","Природа и обновление","#1EB53A"]],
fl:[["tuman","Район","Чиланзар"],["mahalla","Махалля","Богишамол"],["ism","Имя","Азиз"],["fam","Фамилия","Каримов"],["maktab","Номер школы","45"],["sinf","Класс","7-А"]],tag:"Будь умным!"}}
const SR=[[8,[66,76,86]],[16,[61,71,81,91]],[24,[56,66,76,86,96]]]
const star=(cx,cy,r)=>{let p='';for(let i=0;i<10;i++){const a=Math.PI/5*i-Math.PI/2,R=i%2?r*.4:r;p+=`${(cx+R*Math.cos(a)).toFixed(1)},${(cy+R*Math.sin(a)).toFixed(1)} `}return p}
const Flag=()=>(<div className="mast"><div className="pole"/><svg className="flag" viewBox="0 0 200 100"><rect width="200" height="32" fill="#0099B5"/><rect y="32" width="200" height="1.4" fill="#CE1126"/><rect y="33.4" width="200" height="33.2" fill="#fff"/><rect y="66.6" width="200" height="1.4" fill="#CE1126"/><rect y="68" width="200" height="32" fill="#1EB53A"/><circle cx="30" cy="16" r="11" fill="#fff"/><circle cx="34.5" cy="16" r="9.6" fill="#0099B5"/>{SR.map(([y,xs])=>xs.map(x=><polygon key={x+'-'+y} points={star(x,y,3.4)} fill="#fff"/>))}</svg></div>)
const BG=[["👧",6,46,26,0],["🎈",16,38,22,6],["⭐",26,30,19,2],["👦",36,48,28,10],["📚",46,38,24,4],["🌙",55,34,21,13],["🏆",64,40,25,8],["🧒",73,46,27,1],["✏️",82,34,20,11],["🕊️",90,42,23,5],["🎓",12,36,30,15],["🧩",58,32,26,17],["🌟",40,28,18,9],["🎉",94,34,29,14]]
const Bg=()=><div className="bg" aria-hidden="true">{BG.map(([e,x,z,d,l])=><span key={x+e} style={{left:x+'%',fontSize:z,animationDuration:d+'s',animationDelay:'-'+l+'s'}}>{e}</span>)}</div>
export default function App(){
const [lang,setLang]=useState(()=>ld('lang','uz')),[dark,setDark]=useState(()=>ld('dark',false))
const [me,setMe]=useState(()=>ld('me',null)),[people,setPeople]=useState(()=>ld('people',[]))
const [v,setV]=useState(me?'main':'home'),[i,setI]=useState(0),[ans,setAns]=useState([]),[score,setScore]=useState(0),[f,setF]=useState(0)
const t=T[lang]
useEffect(()=>{document.documentElement.dataset.t=dark?'n':'d';sv('dark',dark)},[dark])
useEffect(()=>{document.documentElement.lang=lang;sv('lang',lang)},[lang])
useEffect(()=>{if(v!=='home')return;const k=setInterval(()=>setF(x=>(x+1)%4),4000);return()=>clearInterval(k)},[v])
const reg=e=>{e.preventDefault();const d=Object.fromEntries(new FormData(e.target));const u={...d,id:Date.now()};const l=[...people,u];setMe(u);setPeople(l);sv('me',u);sv('people',l);setV('main')}
const pick=k=>{const a=[...ans,k];if(i<9){setAns(a);setI(i+1);return}
const s=a.filter((x,n)=>x===Q[n].a).length*10,u={...me,ball:s},l=people.map(p=>p.id===me.id?u:p);setMe(u);setPeople(l);sv('me',u);sv('people',l);setScore(s);setV('done')}
const tools=<div className="tools"><button className="pill" onClick={()=>setLang(lang==='uz'?'ru':'uz')}>{lang==='uz'?'RU':'UZ'}</button><button className="pill" onClick={()=>setDark(!dark)} aria-label="theme">{dark?'☀️':'🌙'}</button></div>
const played=me&&me.ball!==undefined
return(<div className="app"><Bg/><div className="stripes"/>
<header className="top"><b className="logo">★ {t.brand}</b>
{(v==='home')&&<button className="btn red" onClick={()=>setV('reg')}>{t.reg}</button>}
{(v==='main'||v==='people')&&<nav>{[["main",t.home],["people",t.ppl]].map(([k,l])=><button key={k} className={'tab'+(v===k?' on':'')} onClick={()=>setV(k)}>{l}</button>)}</nav>}
{tools}</header><main>
{v==='home'&&<><section className="hero"><span className="tw s1">★</span><span className="tw s2">★</span><span className="tw s3">★</span><Flag/><h1>{t.slogan}</h1><p key={f} className="fact">{t.facts[f]}</p></section>
<section className="cols">{t.cols.map(([n,d,c])=><div key={n} className="col" style={{'--c':c}}><i/><b>{n}</b><span>{d}</span></div>)}</section></>}
{v==='reg'&&<form className="card" onSubmit={reg}><h2>{t.reg}</h2><div className="grid">{t.fl.map(([n,l,e])=><label key={n}>{l}<input name={n} placeholder={t.ex+e} required maxLength={40}/></label>)}</div>
<button className="btn green">{t.fin}</button><button type="button" className="link" onClick={()=>setV('home')}>← {t.back}</button></form>}
{v==='main'&&<section className="card c"><Flag/><h2>{t.hi}, {me.ism}!</h2><p>{t.intro}</p>
{played?<div className="ended">{t.ended}<div className="score sm">{me.ball}<span>/100</span></div></div>:<button className="btn green big" onClick={()=>{setI(0);setAns([]);setV('test')}}>▶ {t.start}</button>}
<div className="chips"><span>10 {t.q.toLowerCase()}</span><span>O'zbekiston</span><span>{t.tag}</span></div></section>}
{v==='people'&&<section className="card"><h2>{t.ppl} · {people.length}</h2><ul className="list">{people.map((p,n)=><li key={p.id}><em>{n+1}</em><div><b>{p.ism} {p.fam}</b><small>{p.tuman}, {p.mahalla} · №{p.maktab}, {p.sinf}</small></div></li>)}</ul></section>}
{v==='test'&&<section className="card"><div className="dots">{Q.map((_,n)=><i key={n} className={n<i?'d':n===i?'n':''}/>)}</div><small>{t.q} {i+1}/10</small><h3>{Q[i][lang][0]}</h3>
{Q[i][lang].slice(1).map((o,k)=><button key={k} className="opt" onClick={()=>pick(k)}><span>{'ABCD'[k]}</span>{o}</button>)}</section>}
{v==='done'&&<section className="card c"><Flag/><h2>{t.done}</h2><small>{t.yours}</small><div className="score">{score}<span>/100</span></div><button className="btn green big" onClick={()=>setV('main')}>{t.fin}</button></section>}
</main></div>)}
