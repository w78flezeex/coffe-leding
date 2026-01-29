// Таймер
function startCountdown() {
    const end = Date.now() + 24 * 60 * 60 * 1000;
    
    function tick() {
        const diff = Math.max(0, end - Date.now());
        const h = String(Math.floor(diff / 3600000)).padStart(2, '0');
        const m = String(Math.floor((diff % 3600000) / 60000)).padStart(2, '0');
        const s = String(Math.floor((diff % 60000) / 1000)).padStart(2, '0');
        
        document.getElementById('countdown').textContent = `${h}:${m}:${s}`;
    }
    
    tick();
    setInterval(tick, 1000);
}

// Табы меню
function initTabs() {
    const tabs = document.querySelectorAll('.tab');
    const grids = {
        coffee: document.getElementById('coffee'),
        desserts: document.getElementById('desserts')
    };
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            const target = tab.dataset.tab;
            Object.entries(grids).forEach(([key, grid]) => {
                grid.classList.toggle('hidden', key !== target);
            });
        });
    });
}

// Модалка городов
function initCitiesModal() {
    const modal = document.getElementById('citiesModal');
    const openBtn = document.getElementById('openCities');
    const closeBtn = document.getElementById('closeCities');
    
    openBtn.addEventListener('click', () => {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    
    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', e => {
        if (e.target === modal) closeModal();
    });
    
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Модалка заказа
function initOrderModal() {
    const modal = document.getElementById('orderModal');
    const closeBtn = document.getElementById('closeOrder');
    const details = document.getElementById('orderDetails');
    
    document.querySelectorAll('.btn-add').forEach(btn => {
        btn.addEventListener('click', () => {
            const card = btn.closest('.card');
            const name = card.querySelector('h3').textContent;
            const price = card.querySelector('.price').textContent;
            
            details.textContent = `${name} — ${price}`;
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            // Ripple на кнопке
            btn.style.transform = 'scale(0.9)';
            setTimeout(() => btn.style.transform = '', 150);
        });
    });
    
    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', e => {
        if (e.target === modal) closeModal();
    });
    
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Плавный скролл
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            e.preventDefault();
            const target = document.querySelector(a.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

// Анимация появления карточек
function initCardAnimations() {
    const cards = document.querySelectorAll('.card');
    
    const observer = new IntersectionObserver(entries => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, i * 50);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(card);
    });
}

// Клавиша Escape закрывает модалки
function initEscapeClose() {
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal.active').forEach(m => {
                m.classList.remove('active');
                document.body.style.overflow = '';
            });
        }
    });
}

// Старт
document.addEventListener('DOMContentLoaded', () => {
    startCountdown();
    initTabs();
    initCitiesModal();
    initOrderModal();
    initSmoothScroll();
    initCardAnimations();
    initEscapeClose();
});
