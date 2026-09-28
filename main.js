/* ===== 1. TAHUN OTOMATIS ===== */
document.getElementById("year").textContent = new Date().getFullYear();

/* ===== 2. DARK / LIGHT MODE (tersimpan di localStorage) ===== */
var root = document.documentElement;
var themeBtn = document.getElementById("themeBtn");
if (localStorage.getItem("portfolio-theme") === "light") {
  root.setAttribute("data-theme", "light");
}
function syncThemeIcon() {
  themeBtn.textContent = root.getAttribute("data-theme") === "light" ? "🌙" : "☀️";
}
syncThemeIcon();
themeBtn.addEventListener("click", function () {
  if (root.getAttribute("data-theme") === "light") {
    root.removeAttribute("data-theme");
    localStorage.setItem("portfolio-theme", "dark");
  } else {
    root.setAttribute("data-theme", "light");
    localStorage.setItem("portfolio-theme", "light");
  }
  syncThemeIcon();
});

/* ===== 3. MENU HP ===== */
var hamburger = document.getElementById("hamburger");
var mobileMenu = document.getElementById("mobileMenu");
hamburger.addEventListener("click", function () {
  var open = mobileMenu.classList.toggle("open");
  hamburger.textContent = open ? "✕" : "☰";
});
mobileMenu.querySelectorAll("a").forEach(function (link) {
  link.addEventListener("click", function () {
    mobileMenu.classList.remove("open");
    hamburger.textContent = "☰";
  });
});

/* ===== 4. EFEK SCROLL: navbar, progress, tombol atas, menu aktif ===== */
var header = document.getElementById("header");
var progress = document.getElementById("progress");
var toTop = document.getElementById("toTop");
var sectionIds = ["home", "about", "skills", "projects", "experience", "contact"];
var navAnchors = document.querySelectorAll("[data-nav]");
function onScroll() {
  var y = window.scrollY;
  var max = document.body.scrollHeight - window.innerHeight;
  progress.style.width = (max > 0 ? (y / max) * 100 : 0) + "%";
  header.classList.toggle("scrolled", y > 24);
  toTop.classList.toggle("show", y > 600);
  var current = sectionIds[0];
  sectionIds.forEach(function (id) {
    var el = document.getElementById(id);
    if (el && el.getBoundingClientRect().top - 140 <= 0) current = id;
  });
  if (window.innerHeight + y >= document.body.scrollHeight - 4) {
    current = sectionIds[sectionIds.length - 1];
  }
  navAnchors.forEach(function (a) {
    a.classList.toggle("active", a.getAttribute("href") === "#" + current);
  });
}
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();
toTop.addEventListener("click", function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

/* ===== 5. TEKS BERPUTAR DI HERO ===== */
var words = ["Internet of Things", "Embedded Systems", "Robotics", "Circuit Design"];
var ticker = document.getElementById("ticker");
var wordIndex = 0;
setInterval(function () {
  wordIndex = (wordIndex + 1) % words.length;
  ticker.textContent = words[wordIndex];
}, 2600);

/* ===== 6. MUNCUL SAAT SCROLL ===== */
var revealObserver = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach(function (el) {
  revealObserver.observe(el);
});

/* ===== 7. FILTER SKILLS ===== */
var filterBtns = document.querySelectorAll(".filters button");
var skillCards = document.querySelectorAll("#skillGrid .card");
filterBtns.forEach(function (btn) {
  btn.addEventListener("click", function () {
    filterBtns.forEach(function (b) { b.classList.remove("on"); });
    btn.classList.add("on");
    var cat = btn.getAttribute("data-filter");
    skillCards.forEach(function (card) {
      card.style.display = (cat === "All" || card.getAttribute("data-cat") === cat) ? "" : "none";
    });
  });
});

/* ===== 8. BAR PERSENTASE (data-level="45" → lebar 45%) ===== */
var barObserver = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      var bar = entry.target;
      bar.querySelector("i").style.width = bar.getAttribute("data-level") + "%";
      barObserver.unobserve(bar);
    }
  });
}, { threshold: 0.4 });
document.querySelectorAll(".bar").forEach(function (bar) {
  barObserver.observe(bar);
});

/* ===== 9. MODAL PROJECT ===== */
var projectData = {
  iot: {
    status: "Prototype",
    title: "Smart IoT System",
    body: "Node sensor membaca data suhu, kelembapan, dan status perangkat, lalu mengirimkannya melalui WiFi ke dashboard. Data ditampilkan dalam bentuk grafik sederhana sehingga kondisi lingkungan bisa dipantau kapan saja.",
    points: ["Pembacaan sensor real-time tiap beberapa detik", "Pengiriman data via WiFi ke dashboard web", "Notifikasi sederhana saat nilai melewati batas"]
  },
  home: {
    status: "Concept",
    title: "Smart Home",
    body: "Lampu dan perangkat listrik dikontrol lewat relay yang dikendalikan ESP32. Sensor gerak dan cahaya dipakai agar perangkat bisa menyala otomatis sesuai kondisi ruangan, dengan kontrol manual dari antarmuka web.",
    points: ["Kontrol lampu otomatis berbasis sensor gerak & cahaya", "Modul relay untuk switching perangkat AC", "Panel kontrol manual berbasis web lokal"]
  },
  robot: {
    status: "Experiment",
    title: "Mini Robot",
    body: "Robot beroda dua dengan driver motor dan sensor jarak. Program ditulis dalam C/C++ untuk membaca sensor, menentukan arah gerak, serta menghindari halangan di depannya.",
    points: ["Logika obstacle avoidance dengan sensor ultrasonik", "Kontrol kecepatan motor menggunakan PWM", "Struktur kode modular agar mudah dikembangkan"]
  },
  circuit: {
    status: "Lab Work",
    title: "Electronic Circuit Project",
    body: "Eksperimen rangkaian pada breadboard untuk memahami karakteristik resistor, kapasitor, dioda, dan transistor. Hasil pengukuran dibandingkan dengan perhitungan teori dan simulasi.",
    points: ["Analisis rangkaian seri–paralel dan pembagi tegangan", "Pengukuran dengan multimeter & pembacaan osiloskop", "Dokumentasi skematik dan hasil pengujian"]
  }
};
var modalBg = document.getElementById("modalBg");
function openModal(key) {
  var p = projectData[key];
  if (!p) return;
  document.getElementById("modalStatus").textContent = p.status;
  document.getElementById("modalTitle").textContent = p.title;
  document.getElementById("modalBody").textContent = p.body;
  var list = document.getElementById("modalPoints");
  list.innerHTML = "";
  p.points.forEach(function (text) {
    var li = document.createElement("li");
    li.textContent = text;
    list.appendChild(li);
  });
  modalBg.classList.add("open");
  document.body.style.overflow = "hidden";
}
function closeModal() {
  modalBg.classList.remove("open");
  document.body.style.overflow = "";
}
document.querySelectorAll("[data-project]").forEach(function (btn) {
  btn.addEventListener("click", function () { openModal(btn.getAttribute("data-project")); });
});
document.getElementById("modalClose").addEventListener("click", closeModal);
modalBg.addEventListener("click", function (e) {
  if (e.target === modalBg) closeModal();
});
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") closeModal();
});

/* ===== 10. FORM KONTAK ===== */
var form = document.getElementById("contactForm");
var okMsg = document.getElementById("formOk");
function checkField(errId, isOk, msg) {
  document.getElementById(errId).textContent = isOk ? "" : msg;
  return isOk;
}
form.addEventListener("submit", function (e) {
  e.preventDefault();
  var name = document.getElementById("fName").value.trim();
  var email = document.getElementById("fEmail").value.trim();
  var message = document.getElementById("fMessage").value.trim();
  var valid = true;
  valid = checkField("errName", name.length >= 2, "Nama minimal 2 karakter.") && valid;
  valid = checkField("errEmail", /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email), "Format email belum valid.") && valid;
  valid = checkField("errMessage", message.length >= 10, "Pesan minimal 10 karakter.") && valid;
  if (!valid) return;
  var btn = document.getElementById("sendBtn");
  btn.disabled = true;
  btn.textContent = "Sending...";
  setTimeout(function () {
    btn.disabled = false;
    btn.textContent = "Send Message ✈";
    form.reset();
    okMsg.classList.add("show");
    setTimeout(function () { okMsg.classList.remove("show"); }, 5000);
  }, 1100);
});
