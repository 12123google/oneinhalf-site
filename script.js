(function () {
  const btn = document.getElementById("btn");
  const counterEl = document.getElementById("counter");
  const bar = document.getElementById("bar");
  const statusEl = document.getElementById("status");
  const dot = document.getElementById("dot");
  const line = document.getElementById("line");

  // If any of these is null, file links or IDs are wrong
  if (!btn || !counterEl || !bar || !statusEl || !dot || !line) {
    console.error("UnderCunstruction: missing elements. Check IDs and file names.");
    return;
  }

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

  const clamp = (n, a, b) => Math.max(a, Math.min(b, n));

  btn.addEventListener("click", () => {
    clicks += 1;
    counterEl.textContent = String(clicks);

    const inc = 7 + Math.floor(Math.random() * 9);
    progress = clamp(progress + inc, 0, 96);

    bar.style.width = progress + "%";
    statusEl.textContent = `Progress: ${progress}%`;

    line.textContent = lines[Math.floor(Math.random() * lines.length)];

    dot.classList.remove("ok");
    dot.style.background = "var(--accent)";
    setTimeout(() => {
      dot.style.background = "";
      if (progress >= 80) dot.classList.add("ok");
    }, 140);

    if (progress >= 90 && clicks % 3 === 0) {
      line.textContent = "✅ Certified Cunstruction Moment";
    }
  });

  // tiny idle wobble
  setInterval(() => {
    if (progress < 1) return;
    const wobble = (Math.random() * 2 - 1) * 2;
    bar.style.width = clamp(progress + wobble, 0, 96) + "%";
  }, 900);
})();
