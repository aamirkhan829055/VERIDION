// Veridion LLP — site interactions (mobile nav + booking modal)
document.addEventListener("DOMContentLoaded", function () {
  // Mobile nav toggle
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      links.classList.toggle("is-open");
    });
    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { links.classList.remove("is-open"); });
    });
  }

  // Booking modal (Calendly / SavvyCal placeholder)
  var overlay = document.getElementById("bookingModal");
  var openers = document.querySelectorAll("[data-open-booking]");
  var closers = document.querySelectorAll("[data-close-booking]");

  openers.forEach(function (btn) {
    btn.addEventListener("click", function () {
      if (overlay) {
        overlay.classList.add("is-open");
        document.body.style.overflow = "hidden";
      }
    });
  });
  closers.forEach(function (btn) {
    btn.addEventListener("click", closeModal);
  });
  if (overlay) {
    overlay.addEventListener("click", function (e) {
      if (e.target === overlay) closeModal();
    });
  }
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeModal();
  });
  function closeModal() {
    if (overlay) {
      overlay.classList.remove("is-open");
      document.body.style.overflow = "";
    }
  }

  // Duplicate marquee content for seamless infinite scroll
  document.querySelectorAll(".marquee-track").forEach(function (track) {
    track.innerHTML += track.innerHTML;
  });

  // Highlight active nav link based on current page
  var path = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach(function (a) {
    var href = a.getAttribute("href").split("#")[0];
    if (href === path || (href === "index.html" && path === "")) {
      a.classList.add("active");
    }
  });

  // Dual-Layer Parallax Scroll Effect for Hero Background (0.2x speed)
  var heroBg = document.querySelector(".hero-parallax-bg");
  var heroSec = document.querySelector(".hero");
  if (heroBg && heroSec) {
    var ticking = false;
    var speed = parseFloat(heroBg.getAttribute("data-speed")) || 0.2;

    function updateParallax() {
      var scrolled = window.pageYOffset || document.documentElement.scrollTop;
      var heroHeight = heroSec.offsetHeight;
      if (scrolled <= heroHeight + 200) {
        var bgOffset = scrolled * speed;
        heroBg.style.transform = "translate3d(0, " + bgOffset + "px, 0)";
      }
      ticking = false;
    }

    window.addEventListener("scroll", function () {
      if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
      }
    }, { passive: true });

    // Initial positioning
    updateParallax();
  }

  // Intersection Observer for Parallax Scroll Reveal Sections
  var revealElements = document.querySelectorAll(".split-reveal-section, .final-conversion-section, .reveal-on-scroll");
  if (revealElements.length && "IntersectionObserver" in window) {
    var sectionObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in-view");
        }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });
    revealElements.forEach(function (sec) {
      sectionObserver.observe(sec);
    });
  } else {
    revealElements.forEach(function (sec) {
      sec.classList.add("is-in-view");
    });
  }

  // Role Switcher Logic for 7-Layer Stack
  var roleTabs = document.querySelectorAll(".role-tab");
  var roleDescs = document.querySelectorAll(".role-desc");

  if (roleTabs.length > 0 && roleDescs.length > 0) {
    roleTabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        // Remove active class from all tabs
        roleTabs.forEach(function (t) { t.classList.remove("active"); });
        // Add active class to clicked tab
        this.classList.add("active");

        var selectedRole = this.getAttribute("data-role");

        // Update all role descriptions
        roleDescs.forEach(function (desc) {
          var newText = desc.getAttribute("data-" + selectedRole);
          if (newText) {
            desc.innerHTML = "<strong>" + selectedRole.toUpperCase() + " View:</strong> " + newText;
          }
        });
      });
    });
  }
});
