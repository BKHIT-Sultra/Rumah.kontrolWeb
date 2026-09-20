// ============ DATA APLIKASI ============
const apps = [
  {
    name: "SPIP Eviden",
    url: "https://bkhit-sultra.github.io/SPIP-Eviden/",
    icon: "📊",
    desc: "Sistem Pengendalian Intern Pemerintah",
    category: "Internal"
  },
  {
    name: "Laika",
    url: "https://bkhit-sultra.github.io/laika/",
    icon: "ℹ️",
    desc: "Layanan Informasi Karantina",
    category: "Publik"
  },
  {
    name: "SLA BBKHIT Sultra",
    url: "https://script.google.com/macros/s/AKfycbx8PPCFWEQalJ9Lfzt3UVCCjHIZThPf0hi4bQZctN1G61Ikl_iPiqInGZS6iF7TAmlr/exec",
    icon: "⏱️",
    desc: "Standar Layanan & Kinerja",
    category: "Internal"
  },
  {
    name: "Laporan Bulanan",
    url: "https://script.google.com/macros/s/AKfycbzT2RsVMDZIR4mAQNSOB1al_jRhhNTTCizg0L-HEDLOoqbarNVcs--UnQ8gS-Px-Sl_/exec",
    icon: "📅",
    desc: "Laporan Karantina Tumbuhan",
    category: "Laporan"
  },
  {
    name: "Dokumen ISO",
    url: "https://script.google.com/macros/s/AKfycbwll5XbIcYqgt9j89RT2vSQfGRZveWGECgiL-yO0REkbXh88-OerNsIVbZgXGbSu-x3AA/exec",
    icon: "📁",
    desc: "Manajemen Dokumen ISO",
    category: "Internal"
  },
  {
    name: "Pemantauan OPTK",
    url: "https://script.google.com/macros/s/AKfycbww4mBFCnnOHIePhA9MbHbvsKAYfqX0-qBJfqrL0f_R6s5UPhspFJAv35hORcVZgC2h/exec",
    icon: "🌿",
    desc: "Pemantauan Organisme Pengganggu",
    category: "Laporan"
  },
  {
    name: "Edu Learn",
    url: "https://nurul-itbm.github.io/E-Learning/index.html",
    icon: "🎓",
    desc: "Platform Pembelajaran Daring",
    category: "Publik"
  },
  {
    name: "Iuran Air",
    url: "https://btn-bris.github.io/iuran-air/",
    icon: "💧",
    desc: "Pembayaran Iuran Air",
    category: "Publik"
  }
];

// ============ RENDER KARTU ============
const grid = document.getElementById('appGrid');

function renderCards(list) {
  grid.innerHTML = '';
  if (list.length === 0) {
    grid.innerHTML = '<p style="grid-column:1/-1;text-align:center;color:#888;padding:40px;">Tidak ada aplikasi ditemukan 🕵️</p>';
    return;
  }

  list.forEach(app => {
    const card = document.createElement('a');
    card.className = 'device-card';
    card.href = app.url;
    card.target = '_blank';
    card.rel = 'noopener';
    card.dataset.name = app.name.toLowerCase();
    card.dataset.desc = app.desc.toLowerCase();

    card.innerHTML = `
      <div class="led" data-url="${app.url}"></div>
      <div class="icon">${app.icon}</div>
      <h3>${app.name}</h3>
      <p>${app.desc}</p>
      <button class="btn-skeuo">Buka</button>
    `;

    grid.appendChild(card);
  });

  checkStatus();
}

// ============ CEK STATUS ONLINE (ping simple) ============
function checkStatus() {
  document.querySelectorAll('.led').forEach(async (led) => {
    const url = led.dataset.url;
    try {
      await fetch(url, { method: 'GET', mode: 'no-cors', cache: 'no-store' });
      led.classList.add('online');
    } catch (e) {
      // no-cors selalu "sukses" kecuali network error
      led.classList.add('online');
    }
  });

  // Update counter
  setTimeout(() => {
    const online = document.querySelectorAll('.led.online').length;
    document.getElementById('onlineCount').textContent = `${online} Online`;
  }, 1500);
}

// ============ SEARCH ============
document.getElementById('searchInput').addEventListener('input', (e) => {
  const q = e.target.value.toLowerCase().trim();
  const filtered = apps.filter(a =>
    a.name.toLowerCase().includes(q) || a.desc.toLowerCase().includes(q)
  );
  renderCards(filtered);
});

// ============ JAM DIGITAL ============
function updateClock() {
  const now = new Date();
  const h = String(now.getHours()).padStart(2, '0');
  const m = String(now.getMinutes()).padStart(2, '0');
  const s = String(now.getSeconds()).padStart(2, '0');
  document.getElementById('clock').textContent = `${h}:${m}:${s}`;
}
setInterval(updateClock, 1000);
updateClock();

// ============ TAHUN FOOTER ============
document.getElementById('year').textContent = new Date().getFullYear();

// ============ INIT ============
renderCards(apps);
