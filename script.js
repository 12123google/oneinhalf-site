// === 1) ВПИШИ ТУТ ИМЕНА СВОИХ ФАЙЛОВ ИЗ assets/ ===
// Пример: "meme1.jpg", "art2.png", "cover(1).jpg"
const FILES = [
  "meme1.jpg",
  "art1.png",
  "cover1.jpg",
];


// === 2) Правила тегов по названию файла ===
// Если в имени есть "meme" -> memes, "art" -> art, "cover" -> covers, иначе other
function detectTag(filename) {
  const n = filename.toLowerCase();
  if (n.includes("meme")) return "memes";
  if (n.includes("art")) return "art";
  if (n.includes("cover")) return "covers";
  return "other";
}

function prettyTitle(filename) {
  return filename
    .replace(/\.[^/.]+$/, "")
    .replace(/[_-]+/g, " ")
    .trim();
}

const galleryItems = FILES.map((name) => ({
  title: prettyTitle(name),
  tag: detectTag(name),
  img: `assets/${name}`,
}));

const yearEl = document.getElementById("year");
yearEl.textContent = new Date().getFullYear();

const grid = document.getElementById("galleryGrid");
const filter = document.getElementById("filter");
const search = document.getElementById("search");

function render(items) {
  if (!items.length) {
    grid.innerHTML = `
      <div class="card" style="grid-column: 1 / -1;">
        <h3>Ничего не найдено</h3>
        <p class="muted">Либо фильтр слишком жёсткий, либо список FILES пустой.</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = items
    .map(
      (it) => `
    <article class="tile" data-tag="${it.tag}" title="${it.title}">
      <div class="tile__img">
        <img src="${it.img}" alt="${it.title}" loading="lazy" />
      </div>
      <div class="tile__body">
        <span class="tag">${it.tag}</span>
        <p class="tile__title">${it.title}</p>
      </div>
    </article>
  `
    )
    .join("");
}

function apply() {
  const f = filter.value;
  const q = search.value.trim().toLowerCase();

  const out = galleryItems.filter((it) => {
    const okFilter = f === "all" || it.tag === f;
    const okQuery = it.title.toLowerCase().includes(q) || it.tag.includes(q);
    return okFilter && okQuery;
  });

  render(out);
}

filter.addEventListener("change", apply);
search.addEventListener("input", apply);

// Если ты НЕ заполнил FILES — покажем подсказку
if (FILES.length === 0) {
  grid.innerHTML = `
    <div class="card" style="grid-column: 1 / -1;">
      <h3>Галерея пока пустая</h3>
      <p class="muted">
        Открой <b>script.js</b> и в массив <b>FILES</b> впиши имена картинок из папки <b>assets</b>.
        Пример: <code>"meme1.jpg"</code>, <code>"art2.png"</code>.
      </p>
    </div>
  `;
} else {
  render(galleryItems);
}

// Тостики
const toast = document.getElementById("toast");
let toastTimer = null;

function showToast(text) {
  toast.textContent = text;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 1600);
}

document.querySelectorAll("[data-toast]").forEach((btn) => {
  btn.addEventListener("click", () => showToast(btn.dataset.toast));
});

// Бургер меню
const burger = document.getElementById("burger");
const nav = document.getElementById("nav");

burger.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  burger.setAttribute("aria-expanded", String(isOpen));
});

// Авто-фон hero: если есть assets/hero.jpg — поставим как фон
(async function tryHeroBg(){
  const hero = document.querySelector(".hero");
  try{
    const res = await fetch("assets/hero.jpg", { method: "HEAD" });
    if(res.ok){
      hero.classList.add("has-bg");
      hero.style.backgroundImage = `url("assets/hero.jpg")`;
    }
  } catch(e) {
    // тихо игнорим
  }
})();
