/**
 * #about-work — Feature cards (fintech-style blue panels).
 */
(function () {
  "use strict";

  var MARK = "data-aileader-about";
  var VER = "21";
  var ILL = "/swensiteam/illustrations/color/";
  var sectionEl = null;
  var lastLang = "";

  var I18N = {
    en: {
      num: "[ 01 / 09 ]",
      enTag: "PRODUCTS",
      label: "PRODUCTS & CAPABILITIES",
      title: "Why AILeader?",
      c1Title: "AI Systems",
      c1Text:
        "Full cycle from research to production: agents, automation, web and studio decks.",
      c2Title: "AI Agents",
      c2Text: "Assistants for ops, CRM and support with Telegram and API integrations.",
      c3Title: "Delivery",
      c3Text: "Stress-tested launches: clear stack, timeline and handoff to your team.",
      c4Title: "AI Presentations",
      c4Text: "Studio decks and pitch materials that look sharp and explain clearly.",
      more: "Read More",
    },
    ru: {
      num: "[ 01 / 09 ]",
      enTag: "PRODUCTS",
      label: "ПРОДУКТЫ И ВОЗМОЖНОСТИ",
      title: "Почему AILeader?",
      c1Title: "AI-системы",
      c1Text:
        "Полный цикл от исследования до продакшена: агенты, автоматизация, веб и студия.",
      c2Title: "AI-агенты",
      c2Text: "Ассистенты для операций, CRM и поддержки. Telegram и API.",
      c3Title: "Поставка",
      c3Text: "Проверенные запуски: понятный стек, сроки и передача команде.",
      c4Title: "AI-презентации",
      c4Text: "Студийные деки и питчи, которые ясно объясняют продукт.",
      more: "Подробнее",
    },
    uz: {
      num: "[ 01 / 09 ]",
      enTag: "PRODUCTS",
      label: "MAHSULOTLAR VA IMKONIYATLAR",
      title: "Nega AILeader?",
      c1Title: "AI-tizimlar",
      c1Text: "Tadqiqotdan prodgacha: agentlar, avtomatlashtirish, web va studiya.",
      c2Title: "AI agentlar",
      c2Text: "Ops, CRM va support uchun yordamchilar. Telegram va API.",
      c3Title: "Yetkazish",
      c3Text: "Aniq stack, muddat va jamoaga topshirish.",
      c4Title: "AI taqdimotlar",
      c4Text: "Studiya decklari va pitch materiallari — aniq va chiroyli.",
      more: "Batafsil",
    },
  };

  // layout: "art-bottom" | "art-top" like the reference
  var CARDS = [
    { title: "c1Title", text: "c1Text", img: "01.webp", href: "#services", layout: "art-bottom" },
    { title: "c2Title", text: "c2Text", img: "02.webp", href: "#services", layout: "art-top" },
    { title: "c3Title", text: "c3Text", img: "03.webp", href: "#process", layout: "art-bottom" },
    { title: "c4Title", text: "c4Text", img: "04.webp", href: "https://ailider.uz/studio/", layout: "art-top" },
  ];

  function getLang() {
    var lang = localStorage.getItem("lang") || "ru";
    return I18N[lang] ? lang : "ru";
  }

  function t() {
    return I18N[getLang()];
  }

  function dotsHtml(active) {
    var html = '<div class="aw-card__dots" aria-hidden="true">';
    for (var i = 0; i < CARDS.length; i++) {
      html += '<span class="aw-card__dot' + (i === active ? " is-on" : "") + '"></span>';
    }
    return html + "</div>";
  }

  function actionsHtml(href) {
    return (
      '<div class="aw-card__actions">' +
      '  <a class="aw-card__btn" href="' +
      href +
      '" data-i18n="more"></a>' +
      '  <a class="aw-card__go" href="' +
      href +
      '" aria-label="more">' +
      '    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">' +
      '      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>' +
      "    </svg>" +
      "  </a>" +
      "</div>"
    );
  }

  function textHtml(c) {
    return (
      '<div class="aw-card__copy">' +
      '  <h3 class="aw-card__title" data-i18n="' +
      c.title +
      '"></h3>' +
      '  <p class="aw-card__text" data-i18n="' +
      c.text +
      '"></p>' +
      "</div>"
    );
  }

  function artHtml(c) {
    return (
      '<div class="aw-card__art">' +
      '  <img src="' +
      ILL +
      c.img +
      "?v=color1" +
      '" alt="" draggable="false" />' +
      "</div>"
    );
  }

  function buildSection() {
    var section = document.createElement("section");
    section.id = "about-work";
    section.className = "aw-section";
    section.setAttribute(MARK, "1");
    section.setAttribute("data-aw-ver", VER);

    var cardsHtml = CARDS.map(function (c, idx) {
      var inner =
        c.layout === "art-top"
          ? artHtml(c) + actionsHtml(c.href) + textHtml(c)
          : textHtml(c) + actionsHtml(c.href) + artHtml(c);

      return (
        '<article class="aw-card aw-card--' +
        c.layout +
        '">' +
        inner +
        dotsHtml(idx) +
        "</article>"
      );
    }).join("");

    section.innerHTML =
      '<div class="aw-inner">' +
      '  <div class="aw-topbar">' +
      '    <span class="aw-mono" data-i18n="num"></span>' +
      '    <span class="aw-mono" data-i18n="enTag"></span>' +
      "  </div>" +
      '  <header class="aw-head">' +
      '    <div class="aw-head__text">' +
      '      <p class="aw-label" data-i18n="label"></p>' +
      '      <h2 class="aw-title" data-i18n="title"></h2>' +
      "    </div>" +
      '    <span class="aw-big--head" aria-hidden="true">01</span>' +
      "  </header>" +
      '  <div class="aw-rule" aria-hidden="true"></div>' +
      '  <div class="aw-cols">' +
      cardsHtml +
      "  </div>" +
      "</div>";
    return section;
  }

  function applyLang() {
    if (!sectionEl) return;
    var lang = getLang();
    if (lang === lastLang) return;
    lastLang = lang;
    var dict = t();
    sectionEl.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      if (dict[key] != null) el.textContent = dict[key];
    });
  }

  function findHeroSection() {
    var home = document.getElementById("home");
    if (home) return home.closest("section") || home;
    var shader = document.getElementById("aileader-hero-shader");
    if (shader) return shader.closest("section") || shader.parentElement;
    return null;
  }

  function isCorrectPlace(el) {
    if (!el || !el.parentNode) return false;
    var services = document.getElementById("services");
    var hero = findHeroSection();
    if (services && el.nextElementSibling === services && el.parentNode === services.parentNode)
      return true;
    if (!services && hero && el.previousElementSibling === hero && el.parentNode === hero.parentNode)
      return true;
    return false;
  }

  function killDrag(root) {
    if (!root || root.getAttribute("data-aw-nodrag") === "1") return;
    root.setAttribute("data-aw-nodrag", "1");
    root.addEventListener(
      "dragstart",
      function (e) {
        e.preventDefault();
        return false;
      },
      true
    );
    root.querySelectorAll("img, a").forEach(function (el) {
      el.setAttribute("draggable", "false");
    });
  }

  function ensurePlacement() {
    var services = document.getElementById("services");
    var hero = findHeroSection();
    if (!services && !hero) return false;

    var existing = document.querySelector("[" + MARK + '="1"]');
    if (
      existing &&
      (!existing.classList.contains("aw-section") || existing.getAttribute("data-aw-ver") !== VER)
    ) {
      existing.remove();
      existing = null;
      sectionEl = null;
      lastLang = "";
    }
    if (existing) sectionEl = existing;
    if (!sectionEl) {
      sectionEl = buildSection();
      lastLang = "";
    }

    if (!isCorrectPlace(sectionEl)) {
      if (services && services.parentNode) {
        services.parentNode.insertBefore(sectionEl, services);
      } else if (hero && hero.parentNode) {
        if (hero.nextSibling) hero.parentNode.insertBefore(sectionEl, hero.nextSibling);
        else hero.parentNode.appendChild(sectionEl);
      } else {
        return false;
      }
    }

    applyLang();
    killDrag(sectionEl);
    return true;
  }

  var tries = 0;
  function boot() {
    if (ensurePlacement()) return;
    tries += 1;
    if (tries < 50) setTimeout(boot, 120);
  }

  setInterval(function () {
    ensurePlacement();
  }, 400);

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
