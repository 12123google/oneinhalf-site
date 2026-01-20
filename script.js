const btn = document.getElementById("btn");
const counterEl = document.getElementById("counter");
const bar = document.getElementById("bar");
const statusEl = document.getElementById("status");
const dot = document.getElementById("dot");
const line = document.getElementById("line");

let clicks = 0;
const TARGET = 100;

const SPOTIFY =
  "https://open.spotify.com/track/72Iohx1KbhJR49FlNfJwWA?si=0239ac23cf2440dd";

const lines = [
  "Deploying vibes…",
  "Compiling lore…",
  "Summoning trench energy…",
  "Bishops detected (blocked).",
  "Shipping pixels…",
  "Almost cunstructed…",
  "Ok this is taking longer than expected.",
  "Progress is a lie.",
  "Trust the process (don’t).",
];

function clamp(n, a, b) {
  return Math.max(a, Math.min(b, n));
}

// Рейджбейт формула: 50%, 75%, 87.5%...
function calcProgress(clicks) {
  const raw = 100 * (1 - Math.pow(0.5, clicks));
  const capped = clicks >= TARGET ? 100 : Math.min(raw, 99);
  return Math.floor(capped);
}

function setDot(mode) {
  dot.classList.remove("ok");
  dot.style.background = "";

  if (mode === "ok") dot.classList.add("ok");
  if (mode === "accent") dot.style.background = "var(--accent)";
  if (mode === "danger") dot.style.background = "var(--danger)";
}

function showUnlock() {
  if (document.getElementById("unlock")) return;

  const row = document.querySelector(".row");

  const a = document.createElement("a");
  a.id = "unlock";
  a.href = SPOTIFY;
  a.target = "_blank";
  a.rel = "noopener noreferrer";
  a.className = "btn";
  a.textContent = "🔓 UNLOCK THE SONG";

  row.appendChild(a);

  line.textContent = "100 clicks. You win. Go listen.";
  statusEl.textContent = "Progress: 100% (finally)";
  bar.style.width = "100%";
  setDot("ok");
}

let changeEvery = 20 + Math.floor(Math.random() * 11); // 20–30

btn.addEventListener("click", () => {
  clicks += 1;
  counterEl.textContent = String(clicks);

  const progress = calcProgress(clicks);
  bar.style.width = progress + "%";
  statusEl.textContent = `Progress: ${progress}%`;

  // Текст меняется не каждый раз
  if (clicks % changeEvery === 0) {
    line.textContent = lines[Math.floor(Math.random() * lines.length)];
    changeEvery = 20 + Math.floor(Math.random() * 11); // новый интервал
  }

  // Мемные точки
  if (clicks === 1) line.textContent = "50% on first click. Easy.";
  if (clicks === 2) line.textContent = "75% already. Almost done, right?";
  if (clicks === 3) line.textContent = "87.5%. This is totally normal.";
  if (clicks === 10) line.textContent = "You’re still here? Respect.";
  if (clicks === 50) line.textContent = "Halfway to 100 clicks. Progress ≠ reality.";
  if (clicks === 90) line.textContent = "So close. (Not really.)";

  // Мигание точки
  setDot("accent");
  setTimeout(() => {
    if (progress >= 80 && clicks % 2 === 0) setDot("ok");
    else setDot("danger");
  }, 120);

  if (clicks >= TARGET) {
    showUnlock();
  }
});

// Лёгкое дрожание полоски до анлока
setInterval(() => {
  if (document.getElementById("unlock")) return;

  const p = calcProgress(clicks);
  if (p < 1) return;

  const wobble = (Math.random() * 2 - 1) * 1.2;
  bar.style.width = clamp(p + wobble, 0, 99) + "%";
}, 800);
