const btn = document.getElementById("btn");
const counterEl = document.getElementById("counter");
const bar = document.getElementById("bar");
const statusEl = document.getElementById("status");
const dot = document.getElementById("dot");
const line = document.getElementById("line");

let clicks = 0;

// 100 кликов для "победы"
const TARGET = 100;

// Spotify линк
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
];

function clamp(n, a, b) {
  return Math.max(a, Math.min(b, n));
}

/**
 * Рейджбейт-прогресс:
 * 1 клик: 50%
 * 2 клик: 75%
 * 3 клик: 87.5%
 * ...
 * Формула: progress = 100 * (1 - 0.5^clicks)
 * Но мы НЕ даём дойти до 100% до 100 кликов — принудительно держим 99%.
 */
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
}

function showUnlock() {
  // не дублируем кнопку
  if (document.getElementById("unlock")) return;

  const row = document.querySelector(".row");

  const a = document.createElement("a");
  a.id = "unlock";
  a.href = SPOTIFY;
  a.target = "_blank";
  a.rel = "noopener noreferrer";
  a.className = "btn";
  a.textContent = "✅ UNLOCK THE SONG";

  row.appendChild(a);

  line.textContent = "100 clicks. You win. Go listen.";
  statusEl.textContent = "Progress: 100% (finally)";
  bar.style.width = "100%";
  setDot("ok");
}

btn.addEventListener("click", () => {
  clicks += 1;
  counterEl.textContent = String(clicks);

  const progress = calcProgress(clicks);
  bar.style.width = progress + "%";
  statusEl.textContent = `Progress: ${progress}%`;

  // рандом фразы
  line.textContent = lines[Math.floor(Math.random() * lines.length)];

  // flash dot
  setDot("accent");
  setTimeout(() => {
    // после 80% пусть зелёный появляется иногда, но не всегда (ещё больше троллинга)
    if (progress >= 80 && clicks % 2 === 0) setDot("ok");
    else setDot("danger");
  }, 120);

  // мем-строки на определённых кликах
  if (clicks === 1) line.textContent = "50% on first click. Easy.";
  if (clicks === 2) line.textContent = "75% already. Almost done, right?";
  if (clicks === 3) line.textContent = "87.5%. This is totally normal.";
  if (clicks === 10) line.textContent = "You’re still here? Respect.";
  if (clicks === 50) line.textContent = "Halfway to 100 clicks. Progress ≠ reality.";
  if (clicks === 90) line.textContent = "So close. (Not really.)";

  if (clicks >= TARGET) {
    showUnlock();
  }
});

// маленькое дрожание полоски, но только до unlock
setInterval(() => {
  const unlock = document.getElementById("unlock");
  if (unlock) return;

  const p = calcProgress(clicks);
  if (p < 1) return;

  const wobble = (Math.random() * 2 - 1) * 1.2;
  bar.style.width = clamp(p + wobble, 0, 99) + "%";
}, 800);
