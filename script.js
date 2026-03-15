/* ============================================================
   script.js — Tanush Portfolio
   Vanilla JS — no frameworks, no build tools required
   ============================================================ */

/* ── 1. Scroll Progress Bar ──────────────────────────────── */
function initProgressBar() {
  const bar = document.getElementById("progress-bar");
  if (!bar) return;

  window.addEventListener(
    "scroll",
    () => {
      const scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      const scrollMax =
        document.documentElement.scrollHeight - window.innerHeight;
      const pct = scrollMax > 0 ? (scrollTop / scrollMax) * 100 : 0;
      bar.style.width = pct + "%";
    },
    { passive: true },
  );
}

/* ── 2. Navbar scroll effect ────────────────────────────── */
function initNavbar() {
  const nav = document.getElementById("navbar");
  const toggle = document.getElementById("nav-toggle");
  const links = document.getElementById("nav-links");

  if (!nav) return;

  // Sticky style on scroll
  window.addEventListener(
    "scroll",
    () => {
      nav.classList.toggle("scrolled", window.scrollY > 40);
    },
    { passive: true },
  );

  // Mobile hamburger
  if (toggle && links) {
    toggle.addEventListener("click", () => {
      links.classList.toggle("open");
      // Animate hamburger → X
      const bars = toggle.querySelectorAll("span");
      const isOpen = links.classList.contains("open");
      if (bars.length === 3) {
        bars[0].style.transform = isOpen
          ? "rotate(45deg) translate(5px, 5px)"
          : "";
        bars[1].style.opacity = isOpen ? "0" : "1";
        bars[2].style.transform = isOpen
          ? "rotate(-45deg) translate(5px, -5px)"
          : "";
      }
    });

    // Close on link click
    links.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        links.classList.remove("open");
        const bars = toggle.querySelectorAll("span");
        bars.forEach((b) => {
          b.style.transform = "";
          b.style.opacity = "1";
        });
      });
    });
  }
}

/* ── 3. Scroll Reveal ────────────────────────────────────── */
function initScrollReveal() {
  const targets = document.querySelectorAll(
    ".reveal, .reveal-left, .reveal-right",
  );
  if (!targets.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          // Only animate once
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
  );

  targets.forEach((el) => observer.observe(el));
}

/* ── 4. Skill Bar Animations ─────────────────────────────── */
function initSkillBars() {
  const bars = document.querySelectorAll(".skill-bar");
  if (!bars.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          const pct = bar.getAttribute("data-pct") || "0";
          // Slight delay before animating
          setTimeout(() => {
            bar.style.width = pct + "%";
          }, 200);
          observer.unobserve(bar);
        }
      });
    },
    { threshold: 0.5 },
  );

  bars.forEach((bar) => observer.observe(bar));
}

/* ── 5. Typewriter Effect ────────────────────────────────── */
function initTypewriter() {
  const el = document.getElementById("hero-typewriter");
  if (!el) return;

  const phrases = [
    "Building Agentic AI Systems",
    "Developing Games",
    "Crafting Intelligent Agents",
    "Writing Clean Code",
    "Pushing the Limits at 14",
  ];

  let phraseIdx = 0;
  let charIdx = 0;
  let deleting = false;
  let pause = false;

  function tick() {
    const current = phrases[phraseIdx];

    if (!deleting) {
      // Typing
      el.textContent = current.slice(0, charIdx + 1);
      charIdx++;
      if (charIdx === current.length) {
        // Pause at end, then start deleting
        pause = true;
        setTimeout(() => {
          pause = false;
          deleting = true;
          requestAnimationFrame(loop);
        }, 1800);
        return;
      }
    } else {
      // Deleting
      el.textContent = current.slice(0, charIdx - 1);
      charIdx--;
      if (charIdx === 0) {
        deleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
      }
    }
  }

  let lastTime = 0;
  function loop(ts) {
    if (pause) return;
    const speed = deleting ? 45 : 80;
    if (ts - lastTime >= speed) {
      tick();
      lastTime = ts;
    }
    requestAnimationFrame(loop);
  }

  requestAnimationFrame(loop);
}

/* ── 6. Particle Canvas ──────────────────────────────────── */
function initParticles() {
  const canvas = document.getElementById("particles-canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  let W, H, particles;

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function makeParticle() {
    return {
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.5 + 0.3,
      dx: (Math.random() - 0.5) * 0.25,
      dy: (Math.random() - 0.5) * 0.25,
      alpha: Math.random() * 0.5 + 0.1,
      hue: Math.random() > 0.5 ? "0,255,170" : "0,212,255",
    };
  }

  function initP() {
    const count = Math.floor((W * H) / 14000);
    particles = Array.from({ length: count }, makeParticle);
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);

    particles.forEach((p) => {
      // Draw particle
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.hue}, ${p.alpha})`;
      ctx.fill();

      // Move
      p.x += p.dx;
      p.y += p.dy;

      // Wrap edges
      if (p.x < -5) p.x = W + 5;
      if (p.x > W + 5) p.x = -5;
      if (p.y < -5) p.y = H + 5;
      if (p.y > H + 5) p.y = -5;
    });

    // Draw connections
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.hypot(dx, dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(0,255,170,${0.08 * (1 - dist / 120)})`;
          ctx.lineWidth = 0.4;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(draw);
  }

  resize();
  initP();
  draw();

  window.addEventListener(
    "resize",
    () => {
      resize();
      initP();
    },
    { passive: true },
  );
}

/* ── 7. Render Projects from data ────────────────────────── */
// Emoji icons per project index
const PROJECT_ICONS = ["🤖", "🎮", "⚡", "🧠", "🔀", "⚙️"];

function renderProjects() {
  const grid = document.getElementById("projects-grid");
  if (!grid || typeof PROJECTS === "undefined") return;

  grid.innerHTML = "";

  PROJECTS.forEach((proj, i) => {
    const delay = i % 3; // stagger delay class
    const icon = PROJECT_ICONS[i % PROJECT_ICONS.length];

    const demoBtn = proj.demo
      ? `<a href="${proj.demo}" target="_blank" rel="noopener" class="project-link" title="Live Demo">↗</a>`
      : "";

    const techHtml = (proj.tech || [])
      .map((t) => `<span class="tech-badge">${t}</span>`)
      .join("");

    const card = document.createElement("article");
    card.className = `project-card reveal delay-${delay + 1}`;
    card.innerHTML = `
      <div class="project-card-top">
        <div class="project-icon">
          ${
            proj.image
              ? `<img src="${proj.image}" alt="${proj.title} logo" style="width:28px;height:28px;object-fit:contain;border-radius:4px;">`
              : icon
          }
        </div>
        <div class="project-links">
          <a href="${proj.github}" target="_blank" rel="noopener" class="project-link" title="GitHub">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
            </svg>
          </a>
          ${demoBtn}
        </div>
      </div>
      <h3 class="project-title">${proj.title}</h3>
      <p class="project-desc">${proj.description}</p>
      <div class="project-tech">${techHtml}</div>
    `;

    grid.appendChild(card);
  });

  // Re-run scroll reveal for the newly added cards
  initScrollReveal();
}

/* ── 8. Animated letter split for hero name ─────────────── */
function initHeroLetters() {
  const el = document.querySelector(".hero-name");
  if (!el) return;
  const text = el.textContent.trim();
  el.innerHTML = text
    .split("")
    .map((ch) => `<span class="letter">${ch === " " ? "&nbsp;" : ch}</span>`)
    .join("");
}

/* ── 9. Custom cursor glow (desktop only) ────────────────── */
function initCursorGlow() {
  if (window.matchMedia("(pointer: coarse)").matches) return; // skip touch
  const glow = document.createElement("div");
  glow.id = "cursor-glow";
  Object.assign(glow.style, {
    position: "fixed",
    width: "300px",
    height: "300px",
    borderRadius: "50%",
    background:
      "radial-gradient(circle, rgba(0,255,170,0.04) 0%, transparent 70%)",
    pointerEvents: "none",
    zIndex: "1",
    transform: "translate(-50%, -50%)",
    transition: "opacity 0.3s",
  });
  document.body.appendChild(glow);

  document.addEventListener(
    "mousemove",
    (e) => {
      glow.style.left = e.clientX + "px";
      glow.style.top = e.clientY + "px";
    },
    { passive: true },
  );
}

/* ── 11. Active nav link on scroll ───────────────────────── */
function initActiveNav() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-links a");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((link) => {
            link.classList.toggle(
              "active",
              link.getAttribute("href") === "#" + entry.target.id,
            );
          });
        }
      });
    },
    { rootMargin: "-40% 0px -55% 0px" },
  );

  sections.forEach((s) => observer.observe(s));
}

/* ── Boot ─────────────────────────────────────────────────── */
document.addEventListener("DOMContentLoaded", () => {
  initProgressBar();
  initNavbar();
  initHeroLetters();
  initTypewriter();
  initParticles();
  initScrollReveal();
  initSkillBars();
  renderProjects();
  initCursorGlow();
  initActiveNav();
});
