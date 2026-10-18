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

// Telefon / WhatsApp tıklamaları → GTM dönüşüm olayları.
// AntiClick ziyaretçiyi temiz onaylarsa gönderilir; bot tıklaması dönüşüm sayılmaz
// (AntiClick yüklenemezse olay yine gönderilir). Kod ile tetiklenen (isTrusted=false),
// sayfa açılır açılmaz ya da hiçbir etkileşim olmadan yapılan tıklamalar sayılmaz.
(function () {
  var loadedAt = Date.now();
  var engaged = false;
  ["mousemove", "touchstart", "scroll", "keydown"].forEach(function (t) {
    window.addEventListener(t, function () { engaged = true; }, { passive: true, once: true });
  });

  function pushClean(ev, domEvent) {
    if (domEvent && (!domEvent.isTrusted || !engaged || Date.now() - loadedAt < 3000)) return;
    window.dataLayer = window.dataLayer || [];
    var ac = window.AntiClick;
    if (ac && typeof ac.isClean === "function") {
      ac.isClean().then(function (ok) { if (ok) window.dataLayer.push(ev); });
    } else {
      window.dataLayer.push(ev);
    }
  }

  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest("a[href]");
    if (!a || a.getAttribute("data-cf-trap") === "1") return;
    var href = a.getAttribute("href").toLowerCase();
    if (href.indexOf("tel:") === 0) pushClean({ event: "arama_tiklama" }, e);
    else if (href.indexOf("wa.me") > -1 || href.indexOf("whatsapp.com") > -1) pushClean({ event: "whatsapp_tiklama" }, e);
  }, true);
})();
