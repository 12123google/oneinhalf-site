const btn = document.getElementById("diveBtn");

btn.addEventListener("click", () => {
  // make it jump (re-trigger even if clicked fast)
  btn.classList.remove("jump");
  void btn.offsetWidth; // force reflow
  btn.classList.add("jump");

  // turn red
  btn.classList.add("is-red");

  // optional: change text after click (если хочешь — убери)
  btn.querySelector(".btn__text").textContent = "Signal accepted. Proceed.";
});
