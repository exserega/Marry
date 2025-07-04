// Обратный отсчет до свадьбы
function updateCountdown() {
    const weddingDate = new Date('September 20, 2025 18:00:00').getTime();
    const now = new Date().getTime();
    const distance = weddingDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');

    if (distance < 0) {
        document.querySelector('.countdown-section').innerHTML = '<h2 class="countdown-title">Свадьба состоялась!</h2>';
    }
}

// Обновляем отсчет каждую секунду
setInterval(updateCountdown, 1000);
updateCountdown();

// Плавная прокрутка для навигации
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Активная навигация при прокрутке
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Анимация появления элементов при прокрутке
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Наблюдаем за элементами для анимации
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.timeline-item, .detail-card, .info-card, .rsvp-form');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Интерактивность цветов дресс-кода
document.querySelectorAll('.color-circle').forEach(circle => {
    circle.addEventListener('click', function() {
        // Убираем выделение со всех кружков
        document.querySelectorAll('.color-circle').forEach(c => {
            c.style.transform = 'scale(1)';
            c.style.boxShadow = 'none';
        });
        
        // Выделяем выбранный
        this.style.transform = 'scale(1.3)';
        this.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.3)';
        
        // Показываем уведомление
        showNotification(`Выбран цвет: ${this.getAttribute('title')}`);
    });
});

// Функция показа уведомлений
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--primary-green);
        color: white;
        padding: 1rem 2rem;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Обработка формы RSVP
document.getElementById('rsvpForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);
    
    // Здесь можно добавить отправку данных на сервер
    console.log('RSVP данные:', data);
    
    // Показываем уведомление об успешной отправке
    showNotification('Спасибо! Ваше присутствие подтверждено.');
    
    // Очищаем форму
    this.reset();
});

// Анимация фона
function animateBackground() {
    const layers = document.querySelectorAll('.bg-layer');
    layers.forEach((layer, index) => {
        layer.style.animationDelay = `${index * 2}s`;
    });
}

// Запускаем анимацию фона
animateBackground();

// Эффект параллакса для фона
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const layers = document.querySelectorAll('.bg-layer');
    
    layers.forEach((layer, index) => {
        const speed = (index + 1) * 0.5;
        layer.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Анимация появления шапки при прокрутке
let lastScrollTop = 0;
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        // Прокрутка вниз
        header.style.transform = 'translateY(-100%)';
    } else {
        // Прокрутка вверх
        header.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop;
});

// Добавляем CSS переменные в JavaScript для уведомлений
document.documentElement.style.setProperty('--primary-green', '#657362'); 