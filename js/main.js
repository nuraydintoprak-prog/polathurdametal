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
