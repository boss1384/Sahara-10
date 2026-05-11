const logo = {
"Liverpool":"https://logo.clearbit.com/liverpoolfc.com",
"Chelsea":"https://logo.clearbit.com/chelseafc.com",
"Arsenal":"https://logo.clearbit.com/arsenal.com",
"Man City":"https://logo.clearbit.com/mancity.com",
"Real Madrid":"https://logo.clearbit.com/realmadrid.com",
"Barcelona":"https://logo.clearbit.com/fcbarcelona.com",
"Bayern":"https://logo.clearbit.com/fcbayern.com",
"Dortmund":"https://logo.clearbit.com/bvb.de",
"PSG":"https://logo.clearbit.com/psg.fr",
"Juventus":"https://logo.clearbit.com/juventus.com"
};

const teams = Object.keys(logo);

/* ================= LIVE MATCHES ================= */
let live = Array.from({length:55}, (_,i)=>({
id:i,
home:teams[Math.floor(Math.random()*teams.length)],
away:teams[Math.floor(Math.random()*teams.length)],
score:`${Math.floor(Math.random()*5)}-${Math.floor(Math.random()*5)}`
}));

/* ================= UPCOMING MATCHES ================= */
let upcoming = Array.from({length:55}, (_,i)=>({
id:i,
home:teams[Math.floor(Math.random()*teams.length)],
away:teams[Math.floor(Math.random()*teams.length)],
time:"Tomorrow "+(10+i%12)+":00"
}));

/* ================= LEAGUES ================= */
const leagues = {
"Premier League":[
"Liverpool vs Chelsea",
"Arsenal vs Man City",
"Man United vs Spurs",
"Newcastle vs Villa",
"Brighton vs West Ham"
],
"Bundesliga":[
"Bayern vs Dortmund",
"Leipzig vs Leverkusen",
"Frankfurt vs Wolfsburg",
"Stuttgart vs Hoffenheim"
],
"Serie A":[
"Inter vs Juventus",
"Milan vs Napoli",
"Roma vs Lazio",
"Atalanta vs Fiorentina"
],
"Ligue 1":[
"PSG vs Marseille",
"Lyon vs Monaco",
"Nice vs Lille",
"Rennes vs Lens"
]
};

/* ================= RENDER LIVE ================= */
function renderLive(){
document.getElementById("tab-0").innerHTML =
live.map(m=>`
<div class="card" onclick="openMatch('LIVE',${m.id})">

<div class="team" onclick="event.stopPropagation();openTeam('${m.home}')">
<img src="${logo[m.home]}">
${m.home}
</div>

<b>${m.score}</b>

<div class="team" onclick="event.stopPropagation();openTeam('${m.away}')">
${m.away}
<img src="${logo[m.away]}">
</div>

</div>
`).join('')
}

/* ================= RENDER UPCOMING ================= */
function renderUpcoming(){
document.getElementById("tab-1").innerHTML =
upcoming.map(m=>`
<div class="card" onclick="openMatch('UPCOMING',${m.id})">
${m.home} vs ${m.away} - ${m.time}
</div>
`).join('')
}

/* ================= RENDER LEAGUES ================= */
function renderLeagues(){
document.getElementById("tab-2").innerHTML =
Object.keys(leagues).map(l=>`
<div class="card" onclick="openLeague('${l}')">
${l}
</div>
`).join('')
}

/* ================= OPEN MATCH ================= */
function openMatch(type,id){
let data = type==="LIVE"?live[id]:upcoming[id]

document.getElementById("modal").classList.remove("hidden")
document.getElementById("title").innerText = type+" Match"

document.getElementById("body").innerHTML = `
<h3>${data.home} vs ${data.away}</h3>
<p><b>${data.score || data.time}</b></p>
`
}

/* ================= OPEN LEAGUE ================= */
function openLeague(name){
document.getElementById("modal").classList.remove("hidden")
document.getElementById("title").innerText = name

document.getElementById("body").innerHTML =
leagues[name].map(m=>`
<div class="card">${m}</div>
`).join('')
}

/* ================= TEAM PROFILE ================= */
function openTeam(team){

let teamLive = live.filter(m=>m.home===team || m.away===team).slice(0,6)
let teamUpcoming = upcoming.filter(m=>m.home===team || m.away===team).slice(0,6)

document.getElementById("modal").classList.remove("hidden")
document.getElementById("title").innerText = team + " Profile"

document.getElementById("body").innerHTML = `

<h3>🔴 Live Matches</h3>
${teamLive.length ? teamLive.map(m=>`
<div class="card">${m.home} vs ${m.away} (${m.score})</div>
`).join('') : "<p>No live matches</p>"}

<h3>⏰ Upcoming Matches</h3>
${teamUpcoming.length ? teamUpcoming.map(m=>`
<div class="card">${m.home} vs ${m.away} (${m.time})</div>
`).join('') : "<p>No upcoming matches</p>"}

<h3>📊 Team Stats</h3>
<div class="card">
Wins: ${Math.floor(Math.random()*25)}<br>
Draws: ${Math.floor(Math.random()*10)}<br>
Losses: ${Math.floor(Math.random()*10)}<br>
Goals: ${Math.floor(Math.random()*60)}
</div>

`
}

/* ================= MODAL CLOSE ================= */
function closeModal(){
document.getElementById("modal").classList.add("hidden")
}

/* ================= TABS ================= */
function showTab(n){
document.querySelectorAll("div[id^='tab']").forEach(t=>t.classList.add("hidden"))
document.getElementById("tab-"+n).classList.remove("hidden")

document.querySelectorAll(".tab-btn").forEach(b=>b.classList.remove("active"))
document.querySelectorAll(".tab-btn")[n].classList.add("active")
}

/* ================= INIT ================= */
renderLive()
renderUpcoming()
renderLeagues()
showTab(0)
