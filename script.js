const galleryItems = [
  { title: "Мем #1", tag: "memes" },
  { title: "Арт #1", tag: "art" },
  { title: "Обложка #1", tag: "covers" },
  { title: "Мем #2", tag: "memes" },
  { title: "Арт #2", tag: "art" },
  { title: "Обложка #2", tag: "covers" },
];

const yearEl = document.getElementById("year");
yearEl.textContent = new Date().getFullYear();

const grid = document.getElementById("galleryGrid");
const filter = document.getElementById("filter");
const search = document.getElementById("search");

function render(items){
  grid.innerHTML = items.map((it) => `
    <article class="tile" data-tag="${it.tag}">
      <div class="tile__img">${it.tag.toUpperCase()}</div>
      <div class="tile__body">
        <span class="tag">${it.tag}</span>
        <p class="tile__title">${it.title}</p>
      </div>
    </article>
  `).join("");
}

function apply(){
  const f = filter.value;
  const q = search.value.trim().toLowerCase();

  const out = galleryItems.filter(it => {
    const okFilter = (f === "all") || (it.tag === f);
    const okQuery = it.title.toLowerCase().includes(q);
    return okFilter && okQuery;
  });

  render(out);
}

filter.addEventListener("change", apply);
search.addEventListener("input", apply);
render(galleryItems);

// Мини-тостики
const toast = document.getElementById("toast");
let toastTimer = null;

function showToast(text){
  toast.textContent = text;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 1600);
}

document.querySelectorAll("[data-toast]").forEach(btn => {
  btn.addEventListener("click", () => showToast(btn.dataset.toast));
});

// Бургер
const burger = document.getElementById("burger");
const nav = document.querySelector(".nav");

burger.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  burger.setAttribute("aria-expanded", String(isOpen));
});


