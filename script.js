const btn = document.getElementById("btn");
const counterEl = document.getElementById("counter");
const bar = document.getElementById("bar");
const statusEl = document.getElementById("status");
const dot = document.getElementById("dot");
const line = document.getElementById("line");

let clicks = 0;
let progress = 0;

const lines = [
  "Deploying vibes…",
  "Compiling lore…",
  "Summoning trench energy…",
  "Bishops detected (blocked).",
  "Shipping pixels…",
  "Almost cunstructed…",
  "Ok this is taking longer than expected.",
];

function clamp(n, a, b){ return Math.max(a, Math.min(b, n)); }

btn.addEventListener("click", () => {
  clicks += 1;
  counterEl.textContent = String(clicks);

  // progress grows, but never reaches 100% (meme)
  const inc = 7 + Math.floor(Math.random() * 9);
  progress = clamp(progress + inc, 0, 96);

  bar.style.width = progress + "%";
  statusEl.textContent = `Progress: ${progress}%`;

  const pick = lines[Math.floor(Math.random() * lines.length)];
  line.textContent = pick;

  // flash dot
  dot.classList.remove("ok");
  dot.style.background = "var(--accent)";
  setTimeout(() => {
    dot.style.background = "";
    if (progress >= 80) dot.classList.add("ok");
  }, 120);

  if (progress >= 90 && clicks % 3 === 0) {
    line.textContent = "✅ Certified Cunstruction Moment";
  }
});

// little idle animation
setInterval(() => {
  if (progress < 1) return;
  const wobble = (Math.random() * 2 - 1) * 2;
  bar.style.width = clamp(progress + wobble, 0, 96) + "%";
}, 800);
