
/* ===== HERO SLIDESHOW ===== */
const slides = document.querySelectorAll('.hero-slide');
const dots = document.querySelectorAll('.hero-dot');
let current = 0, timer;

function goToSlide(n) {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = (n + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current].classList.add('active');
}

function startAuto() {
    timer = setInterval(() => goToSlide(current + 1), 5000);
}

dots.forEach(dot => {
    dot.addEventListener('click', () => {
        clearInterval(timer);
        goToSlide(+dot.dataset.idx);
        startAuto();
    });
});

startAuto();

/* ===== HEADER SCROLL ===== */
const header = document.getElementById('header');
const fixedBar = document.getElementById('fixedBar');

window.addEventListener('scroll', () => {
    const y = window.scrollY;
    header.classList.toggle('scrolled', y > 50);
    fixedBar.classList.toggle('visible', y > window.innerHeight * 0.6);
});

/* ===== MODAL ===== */
const contactModal = document.getElementById('contactModal');
const langModal = document.getElementById('langModal');

function openModal(modal) { modal.classList.add('active'); document.body.style.overflow = 'hidden'; }
function closeModal(modal) { modal.classList.remove('active'); document.body.style.overflow = ''; }

// All buttons that open contact modal
document.querySelectorAll(
    '.hero-cta, .price-inquire-btn, .compare-cta, .product-inquire, .product-cta, .detail-cta, .final-cta-btn, .fixed-bar-btn, .more-btn'
).forEach(btn => btn.addEventListener('click', () => openModal(contactModal)));

document.getElementById('closeModal').addEventListener('click', () => closeModal(contactModal));
document.getElementById('closeLangModal').addEventListener('click', () => closeModal(langModal));
document.getElementById('langMoreBtn').addEventListener('click', () => openModal(langModal));

// Close on overlay click
[contactModal, langModal].forEach(modal => {
    modal.addEventListener('click', e => { if (e.target === modal) closeModal(modal); });
});

/* ===== WECHAT COPY ===== */
function copyWechat(e) {
    e.preventDefault();
    navigator.clipboard.writeText('yourwechatid').catch(() => {});
    const toast = document.getElementById('toast');
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2500);
}

/* ===== LANGUAGE SWITCH ===== */
const translations = {
    es: {
        'EXCLUSIVE COLLECTION': 'COLECCIÓN EXCLUSIVA',
        'Luxury<br>Within Reach': 'Lujo<br>a tu Alcance',
        'Museum-grade craftsmanship. A fraction of the price.': 'Artesanía de museo. Una fracción del precio.',
        'Retail': 'Minorista', 'Our Price': 'Nuestro Precio',
        'Inquire Now →': 'Consultar →', 'SAVE 90%': 'AHORRA 90%',
        'Get Best Price': 'Obtener Mejor Precio',
        'Contact for Price': 'Contactar por Precio',
        'Get Your Best Price': 'Obtén tu Mejor Precio',
        'Choose how you\'d like to connect:': 'Elige cómo conectarte:',
        'Fastest response': 'Respuesta más rápida',
        'Tap to copy ID': 'Toca para copiar ID',
        'Secure payment via PayPal': 'Pago seguro vía PayPal',
        '⚡ Average response time: under 5 minutes': '⚡ Tiempo de respuesta: menos de 5 minutos'
    },
    th: {
        'EXCLUSIVE COLLECTION': 'คอลเลกชันพิเศษ',
        'Luxury<br>Within Reach': 'ความหรูหรา<br>ที่เข้าถึงได้',
        'Get Best Price': 'รับราคาดีที่สุด',
        'Contact for Price': 'ติดต่อสอบถามราคา'
    },
    ms: {
        'EXCLUSIVE COLLECTION': 'KOLEKSI EKSKLUSIF',
        'Luxury<br>Within Reach': 'Kemewahan<br>Yang Mampu Milik',
        'Get Best Price': 'Dapatkan Harga Terbaik',
        'Contact for Price': 'Hubungi untuk Harga'
    },
    ja: {
        'EXCLUSIVE COLLECTION': '限定コレクション',
        'Luxury<br>Within Reach': '手の届く<br>高級品',
        'Get Best Price': '最安値を取得',
        'Contact for Price': '価格についてお問い合わせ'
    }
};

let currentLang = 'en';

function switchLang(lang) {
    currentLang = lang;
    document.querySelectorAll('.lang-btn').forEach(b => b.classList.toggle('active', b.dataset.lang === lang));

    if (lang === 'en' || lang === 'zh') {
        const attr = 'data-' + lang;
        document.querySelectorAll('[' + attr + ']').forEach(el => {
            const val = el.getAttribute(attr);
            if (val) el.innerHTML = val;
        });
    } else if (translations[lang]) {
        const map = translations[lang];
        document.querySelectorAll('[data-en]').forEach(el => {
            const key = el.getAttribute('data-en');
            if (map[key]) el.innerHTML = map[key];
        });
    }
}

document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => switchLang(btn.dataset.lang));
});

document.querySelectorAll('.lang-option-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        switchLang(btn.dataset.lang);
        closeModal(langModal);
    });
});

/* ===== REVEAL ON SCROLL ===== */
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('visible'), i * 80);
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ===== COUNTER ANIMATION ===== */
function animateCounter(el) {
    const target = +el.dataset.target;
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        el.textContent = Math.floor(current).toLocaleString();
    }, 16);
}

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number').forEach(el => counterObserver.observe(el));

/* ===== ORDERS MODAL ===== */
const ordersModal = document.getElementById('ordersModal');
document.getElementById('openOrdersBtn').addEventListener('click', () => openModal(ordersModal));
document.getElementById('closeOrdersModal').addEventListener('click', () => closeModal(ordersModal));
ordersModal.addEventListener('click', e => { if (e.target === ordersModal) closeModal(ordersModal); });

// Orders modal contact button also opens contact modal
document.querySelector('.orders-contact-btn').addEventListener('click', () => {
    closeModal(ordersModal);
    setTimeout(() => openModal(contactModal), 300);
});


