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

  // Dual-Layer Parallax Scroll Effect and Interactive Spotlight for Hero Sections
  var heroSections = document.querySelectorAll(".hero, .solutions-hero, .page-hero");
  heroSections.forEach(function (heroSec) {
    var heroBg = heroSec.querySelector(".hero-parallax-bg");
    var speed = heroBg ? (parseFloat(heroBg.getAttribute("data-speed")) || 0.2) : 0.2;
    var ticking = false;

    function updateParallax() {
      var scrolled = window.pageYOffset || document.documentElement.scrollTop;
      var heroHeight = heroSec.offsetHeight;
      if (scrolled <= heroHeight + 200 && heroBg) {
        var bgOffset = scrolled * speed;
        heroBg.style.transform = "translate3d(0, " + bgOffset + "px, 0)";
      }
      ticking = false;
    }

    if (heroBg) {
      window.addEventListener("scroll", function () {
        if (!ticking) {
          window.requestAnimationFrame(updateParallax);
          ticking = true;
        }
      }, { passive: true });
      updateParallax();
    }

    // Interactive Mouse Spotlight & Responsive Neural Illumination
    var mouseTicking = false;
    var mouseX = 0;
    var mouseY = 0;

    function updateMouseSpotlight() {
      heroSec.style.setProperty("--mouse-x", mouseX + "px");
      heroSec.style.setProperty("--mouse-y", mouseY + "px");
      mouseTicking = false;
    }

    heroSec.addEventListener("mousemove", function (e) {
      var rect = heroSec.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
      if (!mouseTicking) {
        window.requestAnimationFrame(updateMouseSpotlight);
        mouseTicking = true;
      }
    }, { passive: true });

    heroSec.addEventListener("mouseleave", function () {
      heroSec.style.setProperty("--mouse-x", "50%");
      heroSec.style.setProperty("--mouse-y", "40%");
    });
  });

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

  // Interactive Comparison Cards (Traditional Automation vs Enterprise Agentic AI)
  var cardTraditional = document.getElementById("cardTraditional");
  var cardAgentic = document.getElementById("cardAgentic");
  var compareGrid = document.getElementById("compareGrid");

  function selectCompareCard(cardToSelect, isUserClick) {
    if (!cardTraditional || !cardAgentic) return;
    var isTrad = cardToSelect === cardTraditional;

    if (isTrad) {
      cardTraditional.classList.add("is-active", "is-selected");
      cardTraditional.setAttribute("aria-pressed", "true");
      cardAgentic.classList.remove("is-active", "is-selected");
      cardAgentic.setAttribute("aria-pressed", "false");
      if (compareGrid) {
        compareGrid.classList.add("traditional-focused");
        compareGrid.classList.remove("agentic-focused");
      }
    } else {
      cardAgentic.classList.add("is-active", "is-selected");
      cardAgentic.setAttribute("aria-pressed", "true");
      cardTraditional.classList.remove("is-active", "is-selected");
      cardTraditional.setAttribute("aria-pressed", "false");
      if (compareGrid) {
        compareGrid.classList.add("agentic-focused");
        compareGrid.classList.remove("traditional-focused");
      }
    }
  }

  function triggerCardRipple(e, card) {
    var host = card.querySelector(".card-ripple-host") || card;
    var rect = card.getBoundingClientRect();
    var ripple = document.createElement("span");
    ripple.className = "card-click-ripple";
    var size = Math.max(rect.width, rect.height) * 1.5;
    ripple.style.width = size + "px";
    ripple.style.height = size + "px";
    var clientX = (e && typeof e.clientX === "number") ? e.clientX : (rect.left + rect.width / 2);
    var clientY = (e && typeof e.clientY === "number") ? e.clientY : (rect.top + 70);
    ripple.style.left = (clientX - rect.left - size / 2) + "px";
    ripple.style.top = (clientY - rect.top - size / 2) + "px";
    host.appendChild(ripple);
    setTimeout(function () {
      if (ripple.parentNode) ripple.parentNode.removeChild(ripple);
    }, 700);
  }

  if (cardTraditional && cardAgentic) {
    cardTraditional.addEventListener("click", function (e) {
      triggerCardRipple(e, cardTraditional);
      selectCompareCard(cardTraditional, true);
    });

    cardTraditional.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        triggerCardRipple(null, cardTraditional);
        selectCompareCard(cardTraditional, true);
      }
    });

    cardAgentic.addEventListener("click", function (e) {
      triggerCardRipple(e, cardAgentic);
      selectCompareCard(cardAgentic, true);
    });

    cardAgentic.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        triggerCardRipple(null, cardAgentic);
        selectCompareCard(cardAgentic, true);
      }
    });
  }

  // Executive homepage persona selector: surface the most relevant outcomes first.
  var cxoRoleButtons = document.querySelectorAll(".cxo-role-button");
  var outcomeGrid = document.querySelector(".executive-outcomes-grid");
  var outcomeCards = Array.prototype.slice.call(document.querySelectorAll("[data-outcome-card]"));
  var roleStatus = document.querySelector(".executive-role-status");

  if (cxoRoleButtons.length && outcomeGrid && outcomeCards.length) {
    cxoRoleButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        var selectedRole = button.getAttribute("data-cxo-role");
        var roleLabel = button.textContent.trim();

        cxoRoleButtons.forEach(function (roleButton) {
          var isSelected = roleButton === button;
          roleButton.classList.toggle("is-active", isSelected);
          roleButton.setAttribute("aria-pressed", String(isSelected));
        });

        outcomeCards.sort(function (first, second) {
          var firstMatches = first.getAttribute("data-personas").split(/\s+/).indexOf(selectedRole) !== -1;
          var secondMatches = second.getAttribute("data-personas").split(/\s+/).indexOf(selectedRole) !== -1;
          return Number(secondMatches) - Number(firstMatches);
        });

        outcomeCards.forEach(function (card) {
          var isPriority = card.getAttribute("data-personas").split(/\s+/).indexOf(selectedRole) !== -1;
          card.classList.toggle("is-priority", isPriority);
          outcomeGrid.appendChild(card);
        });

        if (roleStatus) {
          roleStatus.textContent = "Showing priorities for " + roleLabel + " leaders.";
        }
      });
    });
  }

  // ROI calculator uses clearly labeled planning assumptions, not a guaranteed result.
  var roiCalculator = document.getElementById("roiCalculator");
  var roiTeamSize = document.getElementById("roiTeamSize");
  var roiBudget = document.getElementById("roiBudget");
  var roiCurrency = document.getElementById("roiCurrency");
  var roiHours = document.getElementById("roiHours");
  var roiValue = document.getElementById("roiValue");
  var roiError = document.getElementById("roiError");

  if (roiCalculator && roiTeamSize && roiBudget && roiCurrency && roiHours && roiValue && roiError) {
    function updateRoiEstimate() {
      var teamSize = Number(roiTeamSize.value);
      var monthlyBudget = Number(roiBudget.value);
      var isValid = roiTeamSize.value !== "" && roiBudget.value !== "" &&
        Number.isFinite(teamSize) && Number.isFinite(monthlyBudget) &&
        teamSize >= 1 && teamSize <= 100000 &&
        monthlyBudget >= 0 && monthlyBudget <= 1000000000000;

      if (!isValid) {
        roiHours.textContent = "—";
        roiValue.textContent = "—";
        roiError.textContent = "Enter a team size from 1 to 100,000 and a budget from 0 to 1,000,000,000,000.";
        return;
      }

      roiError.textContent = "";
      roiHours.textContent = new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(teamSize * 4) + " hrs";
      roiValue.textContent = new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: roiCurrency.value,
        maximumFractionDigits: 0
      }).format(monthlyBudget * 0.1);
    }

    [roiTeamSize, roiBudget, roiCurrency].forEach(function (input) {
      input.addEventListener("input", updateRoiEstimate);
      input.addEventListener("change", updateRoiEstimate);
    });
    updateRoiEstimate();
  }

  // Agentic workflow demo: a front-end simulation of an agent running three tasks.
  // It is illustrative only; no live AI backend is connected.
  var wf = document.getElementById("agentWorkflow");
  if (wf) {
    var svgNS = "http://www.w3.org/2000/svg";
    var particleLayer = document.getElementById("wfParticles");
    var tip = document.getElementById("wfTip");
    var stage = wf.querySelector(".wf-stage");
    var svg = wf.querySelector(".wf-svg");
    var summary = document.getElementById("wfSummary");
    var toggle = document.getElementById("wfToggle");
    var reduceMotionWf = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    var info = {
      agent: { title: "AI Agent", text: "Plans the workflow, calls each tool in order and checks every result before moving on.", meta: "Orchestrator · human approval on key steps" },
      fetch: { title: "Fetching Data", text: "Collects account and firmographic records from connected business systems.", meta: "CRM · ERP · Data Lake",
        steps: ["Connecting to CRM, ERP & Data Lake", "Fetching account records", "Validating & normalizing fields", "Data collection complete"] },
      resolve: { title: "Resolving CRM Entities", text: "Matches duplicate or conflicting company records and merges them into one clean profile.", meta: "CRM · company registries",
        steps: ["Loading CRM entities", "Matching names, domains & addresses", "Merging duplicate profiles", "Entities matched"] },
      audit: { title: "Auditing Suppliers", text: "Checks supplier contracts, certifications and sanctions lists, and flags risks for review.", meta: "Contracts · certifications · sanctions lists",
        steps: ["Loading supplier list", "Checking contract terms", "Screening sanctions & certifications", "Audit complete"] },
      complete: { title: "Task Complete", text: "Results are written back and every step is logged for review.", meta: "Audit trail saved" }
    };
    var order = ["fetch", "resolve", "audit"];
    var TASK_MS = 3600;

    function nodeFor(key) { return svg.querySelector('.wf-node[data-task="' + key + '"]'); }
    function rowFor(key) { return wf.querySelector('.wf-row[data-task="' + key + '"]'); }
    function edge(id) { return svg.querySelector('[data-edge="' + id + '"]'); }

    // Particles travel along an SVG path; positions come from getPointAtLength.
    var particles = [];
    function spawnParticles(pathEl, green) {
      var len = pathEl.getTotalLength();
      for (var i = 0; i < 3; i++) {
        var dot = document.createElementNS(svgNS, "circle");
        dot.setAttribute("r", "4");
        dot.setAttribute("class", "wf-particle" + (green ? " is-green" : ""));
        particleLayer.appendChild(dot);
        particles.push({ el: dot, path: pathEl, len: len, offset: i / 3 });
      }
    }
    function clearParticles() {
      particles.forEach(function (p) { p.el.remove(); });
      particles = [];
    }

    var state, taskIndex, taskStart, holdUntil, paused = false, pausedAt = 0, lastFrame = 0;

    function setRow(key, cls, statusText, stepText, pct) {
      var row = rowFor(key);
      row.classList.remove("is-running", "is-done");
      if (cls) row.classList.add(cls);
      row.querySelector(".wf-row-status").textContent = statusText;
      row.querySelector(".wf-row-step").textContent = stepText;
      row.querySelector(".wf-row-bar span").style.width = pct + "%";
    }
    function setRing(key, pct) {
      nodeFor(key).querySelector(".wf-ring").style.strokeDashoffset = String(100 - pct);
    }

    function reset() {
      clearParticles();
      order.forEach(function (key) {
        nodeFor(key).classList.remove("is-running", "is-done");
        edge("in-" + key).classList.remove("is-active", "is-done");
        edge("out-" + key).classList.remove("is-active", "is-done");
        setRow(key, "", "Queued", "Waiting for agent", 0);
        setRing(key, 0);
      });
      nodeFor("complete").classList.remove("is-done");
      summary.classList.remove("is-done");
      taskIndex = -1;
      startNextTask(performance.now());
    }

    function startNextTask(now) {
      clearParticles();
      taskIndex++;
      if (taskIndex >= order.length) {
        nodeFor("complete").classList.add("is-done");
        summary.textContent = "✓ All 3 tasks complete · results logged for review";
        summary.classList.add("is-done");
        state = "hold";
        holdUntil = now + 3200;
        return;
      }
      var key = order[taskIndex];
      state = "running";
      taskStart = now;
      nodeFor(key).classList.add("is-running");
      edge("in-" + key).classList.add("is-active");
      spawnParticles(edge("in-" + key), false);
      summary.textContent = "Agent running task " + (taskIndex + 1) + " of 3: " + info[key].title + "…";
    }

    function finishTask(key, now) {
      nodeFor(key).classList.remove("is-running");
      nodeFor(key).classList.add("is-done");
      edge("in-" + key).classList.remove("is-active");
      edge("in-" + key).classList.add("is-done");
      edge("out-" + key).classList.add("is-done");
      setRow(key, "is-done", "Complete ✓", info[key].steps[3], 100);
      setRing(key, 100);
      clearParticles();
      spawnParticles(edge("out-" + key), true);
      state = "handoff";
      holdUntil = now + 700;
    }

    function frame(now) {
      if (!paused) {
        if (state === "running") {
          var key = order[taskIndex];
          var pct = Math.min(100, ((now - taskStart) / TASK_MS) * 100);
          var step = info[key].steps[Math.min(2, Math.floor(pct / 34))];
          setRow(key, "is-running", "Running", step, pct);
          setRing(key, pct);
          if (pct >= 100) finishTask(key, now);
        } else if (state === "handoff" && now >= holdUntil) {
          startNextTask(now);
        } else if (state === "hold" && now >= holdUntil) {
          reset();
        }
        var t = now / 1400;
        particles.forEach(function (p) {
          var pt = p.path.getPointAtLength(((t + p.offset) % 1) * p.len);
          p.el.setAttribute("cx", pt.x);
          p.el.setAttribute("cy", pt.y);
        });
      }
      lastFrame = now;
      requestAnimationFrame(frame);
    }

    // Reduced motion: show the finished state and let people explore with hover/tap.
    function showStaticComplete() {
      order.forEach(function (key) {
        nodeFor(key).classList.add("is-done");
        edge("in-" + key).classList.add("is-done");
        edge("out-" + key).classList.add("is-done");
        setRow(key, "is-done", "Complete ✓", info[key].steps[3], 100);
        setRing(key, 100);
      });
      nodeFor("complete").classList.add("is-done");
      summary.textContent = "✓ All 3 tasks complete · results logged for review";
      summary.classList.add("is-done");
      toggle.hidden = true;
    }

    toggle.addEventListener("click", function () {
      var now = performance.now();
      paused = !paused;
      if (paused) {
        pausedAt = now;
      } else {
        // Shift timers so the task resumes where it stopped.
        var gap = now - pausedAt;
        taskStart += gap;
        holdUntil += gap;
      }
      toggle.textContent = paused ? "Play" : "Pause";
      toggle.setAttribute("aria-pressed", String(paused));
    });

    // Details on hover, keyboard focus or tap.
    function showTip(key) {
      var n = nodeFor(key);
      var d = info[key];
      if (!n || !d) return;
      var box = n.querySelector(".wf-body").getBoundingClientRect();
      var host = stage.getBoundingClientRect();
      tip.querySelector(".wf-tip-title").textContent = d.title;
      tip.querySelector(".wf-tip-text").textContent = d.text;
      tip.querySelector(".wf-tip-meta").textContent = d.meta;
      var x = box.left + box.width / 2 - host.left;
      x = Math.max(110, Math.min(host.width - 110, x));
      tip.style.left = x + "px";
      tip.style.top = (box.top - host.top) + "px";
      tip.hidden = false;
      svg.querySelectorAll(".wf-node").forEach(function (el) { el.classList.toggle("is-hover", el === n); });
    }
    function hideTip() {
      tip.hidden = true;
      svg.querySelectorAll(".wf-node").forEach(function (el) { el.classList.remove("is-hover"); });
    }
    svg.querySelectorAll(".wf-node").forEach(function (n) {
      var key = n.getAttribute("data-task");
      n.addEventListener("mouseenter", function () { showTip(key); });
      n.addEventListener("mouseleave", hideTip);
      n.addEventListener("focus", function () { showTip(key); });
      n.addEventListener("blur", hideTip);
      n.addEventListener("click", function (e) { e.stopPropagation(); showTip(key); });
      n.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); showTip(key); }
      });
    });
    wf.querySelectorAll(".wf-row-btn").forEach(function (btn) {
      var key = btn.getAttribute("data-task");
      btn.addEventListener("mouseenter", function () { showTip(key); });
      btn.addEventListener("mouseleave", hideTip);
      btn.addEventListener("focus", function () { showTip(key); });
      btn.addEventListener("blur", hideTip);
      btn.addEventListener("click", function () { showTip(key); });
    });
    document.addEventListener("click", function (e) {
      if (!wf.contains(e.target)) hideTip();
    });

    if (reduceMotionWf) {
      showStaticComplete();
    } else {
      reset();
      requestAnimationFrame(frame);
    }
  }

  // Glass icons pop up as they scroll into view, then float at slightly different times.
  var glassIcons = document.querySelectorAll(".gi");
  if (glassIcons.length) {
    glassIcons.forEach(function (icon, i) {
      if (!icon.style.getPropertyValue("--gi-float")) {
        icon.style.setProperty("--gi-float", "-" + ((i * 0.7) % 4.2).toFixed(1) + "s");
      }
    });
    if ("IntersectionObserver" in window) {
      document.documentElement.classList.add("gi-anim");
      var giObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("gi-in");
            giObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.2 });
      glassIcons.forEach(function (icon) { giObserver.observe(icon); });
    }
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
