(function () {
  var toggleBtn = document.querySelector("[data-nav-toggle]");
  var closeBtn = document.querySelector("[data-nav-close]");
  var panel = document.querySelector("[data-mobile-nav]");

  if (!toggleBtn || !panel) return;

  function openNav() {
    panel.classList.add("open");
    document.body.style.overflow = "hidden";
  }
  function closeNav() {
    panel.classList.remove("open");
    document.body.style.overflow = "";
  }

  toggleBtn.addEventListener("click", openNav);
  if (closeBtn) closeBtn.addEventListener("click", closeNav);

  panel.addEventListener("click", function (e) {
    if (e.target === panel) closeNav();
  });

  panel.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", closeNav);
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeNav();
  });
})();

(function () {
  var wrap = document.querySelector("[data-region-switch]");
  if (!wrap) return;
  var toggle = wrap.querySelector("[data-region-toggle]");

  function close() {
    wrap.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  }
  function open() {
    wrap.classList.add("is-open");
    toggle.setAttribute("aria-expanded", "true");
  }

  toggle.addEventListener("click", function (e) {
    e.stopPropagation();
    if (wrap.classList.contains("is-open")) close();
    else open();
  });

  document.addEventListener("click", function (e) {
    if (!wrap.contains(e.target)) close();
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") close();
  });
})();
