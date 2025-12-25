/* ---------- dasar interaksi ---------- */
document.addEventListener("DOMContentLoaded", () => {
  // OPENING -> show main
  const btnOpen = document.getElementById("btnOpen");
  const opening = document.getElementById("buka-undangan");
  const main = document.getElementById("main");

  btnOpen.addEventListener("click", () => {
    btnOpen.innerText = "Selamat Datang";
    opening.style.transition = "opacity .9s ease";
    opening.style.opacity = "0";
    setTimeout(() => (opening.style.display = "none"), 900);

    // tampilkan main
    main.classList.remove("hidden");
    main.style.opacity = 0;
    main.style.transition = "opacity .9s ease";
    setTimeout(() => (main.style.opacity = 1), 100);
    // scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // nama tamu dari query string ?to=Nama
  const params = new URLSearchParams(window.location.search);
  const nama = params.get("to");
  if (nama) {
    const el = document.querySelector(".nama-tamu");
    if (el) el.textContent = decodeURIComponent(nama);
  }

  // COUNTDOWN ke 30 Jan 2026 19:00
  const target = new Date("2026-01-30T19:00:00").getTime();
  const daysEl = document.getElementById("days");
  const hoursEl = document.getElementById("hours");
  const minutesEl = document.getElementById("minutes");
  const secondsEl = document.getElementById("seconds");

  function updateTimer() {
    const now = Date.now();
    let diff = target - now;
    if (diff < 0) diff = 0;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
    if (daysEl) daysEl.textContent = String(days).padStart(2, "0");
    if (hoursEl) hoursEl.textContent = String(hours).padStart(2, "0");
    if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, "0");
    if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, "0");
  }
  updateTimer();
  setInterval(updateTimer, 1000);

  // FADE-UP ON SCROLL
  const faders = document.querySelectorAll(
    ".fade-up, .gallery-item, .card-ev, .section-penutup .penutup-inner"
  );
  const appearOptions = { threshold: 0.15 };
  const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("show");
      observer.unobserve(entry.target);
    });
  }, appearOptions);
  faders.forEach((f) => appearOnScroll.observe(f));

  // GALLERY LIGHTBOX
  const galleryItems = document.querySelectorAll(".gallery-item");
  const lightbox = document.getElementById("lightbox");
  const lbImg = document.querySelector(".lb-img");
  const lbCaption = document.querySelector(".lb-caption");
  const lbClose = document.querySelector(".lb-close");

  galleryItems.forEach((item) => {
    item.addEventListener("click", () => {
      const img = item.querySelector("img");
      const cap = item.querySelector("figcaption")
        ? item.querySelector("figcaption").textContent
        : "";
      lbImg.src = img.src;
      lbCaption.textContent = cap;
      lightbox.classList.add("active");
      lightbox.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    });
  });
  lbClose.addEventListener("click", closeLB);
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLB();
  });
  function closeLB() {
    lightbox.classList.remove("active");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  // BUTTON TOP
  const btnTop = document.getElementById("btnTop");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 400) btnTop.style.display = "block";
    else btnTop.style.display = "none";
  });
  btnTop.addEventListener("click", () =>
    window.scrollTo({ top: 0, behavior: "smooth" })
  );

  // small animation on gallery images (stagger)
  const imgs = document.querySelectorAll(".gallery-item");
  imgs.forEach((el, i) => {
    el.style.transitionDelay = `${i * 60}ms`;
    el.classList.add("fade-up");
  });
});
// === OPENING HANDLER ===
const btnOpen = document.getElementById("btnOpen");
const opening = document.getElementById("buka-undangan");
const main = document.getElementById("main");

btnOpen.addEventListener("click", () => {
  // efek fade-out halus
  opening.style.transition = "opacity 0.6s ease";
  opening.style.opacity = "0";

  setTimeout(() => {
    // hapus element agar tidak menyisakan ruang kosong
    opening.remove();
    main.classList.remove("hidden");

    // scroll ke paling atas (opsional)
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, 600);
});
document.getElementById("btnOpen").addEventListener("click", function () {
  // Hilangkan halaman opening
  const opening = document.getElementById("buka-undangan");
  opening.style.opacity = "0";

  setTimeout(() => {
    opening.style.display = "none";
    document.getElementById("main").classList.remove("hidden");

    // 🟢 AKTIFKAN SCROLL
    document.body.classList.remove("lock-scroll");
    
    // 🎵 MULAI MUSIK (browser izinkan setelah interaksi user)
    const bgMusic = document.getElementById("bgMusic");
    if (bgMusic) {
      bgMusic.play().catch(err => console.log("Audio play failed:", err));
    }
  }, 600);
});
