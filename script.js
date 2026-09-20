/* ============================================
   RUMAH DIGITAL BKHIT SULTRA
   Script Utama
   ============================================ */

// ============ DATA APLIKASI ============
const apps = [
  {
    name: "SPIP Eviden",
    url: "https://bkhit-sultra.github.io/SPIP-Eviden/",
    icon: "📊",
    desc: "Sistem Pengendalian Intern",
    color: "navy"
  },
  {
    name: "Laika",
    url: "https://bkhit-sultra.github.io/laika/",
    icon: "ℹ️",
    desc: "Layanan Informasi Karantina",
    color: "steel"
  },
  {
    name: "SLA BBKHIT",
    url: "https://script.google.com/macros/s/AKfycbx8PPCFWEQalJ9Lfzt3UVCCjHIZThPf0hi4bQZctN1G61Ikl_iPiqInGZS6iF7TAmlr/exec",
    icon: "⏱️",
    desc: "Standar Layanan & Kinerja",
    color: "bronze"
  },
  {
    name: "Laporan Bulanan",
    url: "https://script.google.com/macros/s/AKfycbzT2RsVMDZIR4mAQNSOB1al_jRhhNTTCizg0L-HEDLOoqbarNVcs--UnQ8gS-Px-Sl_/exec",
    icon: "📅",
    desc: "Karantina Tumbuhan",
    color: "orange"
  },
  {
    name: "Dokumen ISO",
    url: "https://script.google.com/macros/s/AKfycbwll5XbIcYqgt9j89RT2vSQfGRZveWGECgiL-yO0REkbXh88-OerNsIVbZgXGbSu-x3AA/exec",
    icon: "📁",
    desc: "Manajemen Dokumen ISO",
    color: "navy"
  },
  {
    name: "Pemantauan OPTK",
    url: "https://script.google.com/macros/s/AKfycbww4mBFCnnOHIePhA9MbHbvsKAYfqX0-qBJfqrL0f_R6s5UPhspFJAv35hORcVZgC2h/exec",
    icon: "🌿",
    desc: "Organisme Pengganggu Tumbuhan",
    color: "sage"
  },
  {
    name: "Edu Learn",
    url: "https://nurul-itbm.github.io/E-Learning/index.html",
    icon: "🎓",
    desc: "Pembelajaran Daring",
    color: "bronze"
  },
  {
    name: "Iuran Air",
    url: "https://btn-bris.github.io/iuran-air/",
    icon: "💧",
    desc: "Pembayaran Iuran Air",
    color: "steel"
  },
  {
    name: "Riset Penelitian PDP",
    url: "https://script.google.com/macros/s/AKfycbwudiwV1JpEwTlO75QWon_Uor9IdpGtsmpvu3AC_QnXTpWjThWR3yDLhAb55dvWt7_8/exec",
    icon: "🔬",
    desc: "Riset & Penelitian PDP",
    color: "orange"
  }
];

// ============ ELEMEN DOM ============
const grid = document.getElementById('appGrid');
const searchInput = document.getElementById('searchInput');
const clockEl = document.getElementById('clock');
const yearEl = document.getElementById('year');
const onlineCountEl = document.getElementById('onlineCount');

// ============ RENDER KARTU ============
function renderCards(list) {
  grid.innerHTML = '';

  if (list.length === 0) {
    grid.innerHTML = `
      <p style="
        grid-column: 1 / -1;
        text-align: center;
        color: #8a99b0;
        padding: 40px;
        font-weight: 700;
        letter-spacing: 2px;
        text-transform: uppercase;
        font-size: 12px;
      ">Tidak ada modul ditemukan</p>
    `;
    return;
  }

  list.forEach((app, i) => {
    const card = document.createElement('a');
    card.className = 'clay-card';
    card.href = app.url;
    card.target = '_blank';
    card.rel = 'noopener noreferrer';
    card.style.animationDelay = `${i * 0.05}s`;
    card.setAttribute('aria-label', `Buka ${app.name}`);

    card.innerHTML = `
      <div class="clay-led online"></div>
      <div class="clay-icon ${app.color}">${app.icon}</div>
      <h3>${app.name}</h3>
      <p>${app.desc}</p>
      <button class="clay-btn" type="button">Buka</button>
    `;

    grid.appendChild(card);
  });
}

// ============ SEARCH ============
searchInput.addEventListener('input', (e) => {
  const q = e.target.value.toLowerCase().trim();

  const filtered = apps.filter(a =>
    a.name.toLowerCase().includes(q) ||
    a.desc.toLowerCase().includes(q)
  );

  renderCards(filtered);
});

// ============ JAM DIGITAL ============
function updateClock() {
  const now = new Date();
  const h = String(now.getHours()).padStart(2, '0');
  const m = String(now.getMinutes()).padStart(2, '0');
  const s = String(now.getSeconds()).padStart(2, '0');
  clockEl.textContent = `${h}:${m}:${s}`;
}

setInterval(updateClock, 1000);
updateClock();

// ============ INIT ============
function init() {
  yearEl.textContent = new Date().getFullYear();
  onlineCountEl.textContent = `${apps.length} Online`;
  renderCards(apps);
}

// Jalankan saat DOM siap
document.addEventListener('DOMContentLoaded', init);
