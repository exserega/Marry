// Основные функции для свадебного сайта
document.addEventListener('DOMContentLoaded', function() {
    
    // Инициализация всех функций
    initHeaderNavigation();
    initScrollEffects();
    initFormHandling();
    initAnimations();
    initCountdown();
    
    // Навигация в шапке
    function initHeaderNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        const sections = document.querySelectorAll('section[id]');
        
        // Клик по ссылкам навигации
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80; // Учитываем высоту шапки
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
        
        // Активная ссылка при прокрутке
        window.addEventListener('scroll', function() {
            const scrollPos = window.scrollY + 100;
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');
                const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                
                if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                    navLinks.forEach(link => link.classList.remove('active'));
                    if (navLink) navLink.classList.add('active');
                }
            });
        });
    }
    
    // Эффекты при прокрутке
    function initScrollEffects() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);
        
        // Наблюдаем за элементами для анимации
        const animateElements = document.querySelectorAll('.timeline-item, .detail-card, .info-card');
        animateElements.forEach(el => observer.observe(el));
        
        // Параллакс эффект для фоновых слоев
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const layers = document.querySelectorAll('.bg-layer');
            
            layers.forEach((layer, index) => {
                const speed = 0.3 + (index * 0.1);
                const yPos = -(scrolled * speed);
                layer.style.transform = `translateY(${yPos}px)`;
            });
        });
    }
    
    // Обработка формы RSVP
    function initFormHandling() {
        const form = document.getElementById('rsvpForm');
        
        if (form) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Получаем данные формы
                const formData = new FormData(form);
                const data = Object.fromEntries(formData);
                
                // Валидация
                if (!data.fullName || !data.phone || !data.guests) {
                    showNotification('Пожалуйста, заполните все обязательные поля', 'error');
                    return;
                }
                
                // Имитация отправки
                const submitBtn = form.querySelector('.submit-button');
                const buttonText = submitBtn.querySelector('.button-text');
                const originalText = buttonText.textContent;
                
                buttonText.textContent = 'Отправляется...';
                submitBtn.disabled = true;
                
                setTimeout(() => {
                    showNotification('Спасибо! Ваше присутствие подтверждено', 'success');
                    form.reset();
                    buttonText.textContent = originalText;
                    submitBtn.disabled = false;
                }, 2000);
            });
        }
    }
    
    // Анимации
    function initAnimations() {
        // Анимация появления элементов при загрузке
        const heroElements = document.querySelectorAll('.date-badge, .name-line, .title-divider, .hero-subtitle, .hero-stats, .scroll-hint');
        
        heroElements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                el.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, index * 200);
        });
        
        // Анимация счетчика времени
        const statNumbers = document.querySelectorAll('.stat-number');
        statNumbers.forEach(number => {
            const finalValue = parseInt(number.getAttribute('data-target'));
            animateNumber(number, 0, finalValue, 2000);
        });
        
        // Анимация временной шкалы
        const timelineItems = document.querySelectorAll('.timeline-item');
        timelineItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-50px)';
            
            setTimeout(() => {
                item.style.transition = 'all 0.8s ease-out';
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }, 500 + (index * 300));
        });
    }
    
    // Анимация чисел
    function animateNumber(element, start, end, duration) {
        const startTime = performance.now();
        
        function updateNumber(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const current = Math.floor(start + (end - start) * progress);
            element.textContent = current.toString().padStart(2, '0');
            
            if (progress < 1) {
                requestAnimationFrame(updateNumber);
            }
        }
        
        requestAnimationFrame(updateNumber);
    }
    
    // Обратный отсчет до свадьбы
    function initCountdown() {
        const weddingDate = new Date('2025-09-20T18:00:00').getTime();
        
        function updateCountdown() {
            const now = new Date().getTime();
            const distance = weddingDate - now;
            
            if (distance > 0) {
                const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((distance % (1000 * 60)) / 1000);
                
                // Обновляем элементы времени
                const statElements = document.querySelectorAll('.stat-number');
                if (statElements.length >= 2) {
                    statElements[0].textContent = hours.toString().padStart(2, '0');
                    statElements[1].textContent = minutes.toString().padStart(2, '0');
                }
            }
        }
        
        updateCountdown();
        setInterval(updateCountdown, 1000);
    }
    
    // Уведомления
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;
        
        // Стили для уведомления
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.15);
            z-index: 10000;
            transform: translateX(400px);
            transition: transform 0.3s ease;
            max-width: 300px;
        `;
        
        document.body.appendChild(notification);
        
        // Анимация появления
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Кнопка закрытия
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        });
        
        // Автоматическое закрытие
        setTimeout(() => {
            if (document.body.contains(notification)) {
                notification.style.transform = 'translateX(400px)';
                setTimeout(() => {
                    if (document.body.contains(notification)) {
                        document.body.removeChild(notification);
                    }
                }, 300);
            }
        }, 5000);
    }
    
    // Дополнительные эффекты
    function initAdditionalEffects() {
        // Эффект печатания для подзаголовка
        const subtitle = document.querySelector('.hero-subtitle');
        if (subtitle) {
            const text = subtitle.textContent;
            subtitle.textContent = '';
            subtitle.style.borderRight = '2px solid var(--color-accent-2)';
            
            let i = 0;
            const typeWriter = () => {
                if (i < text.length) {
                    subtitle.textContent += text.charAt(i);
                    i++;
                    setTimeout(typeWriter, 50);
                } else {
                    subtitle.style.borderRight = 'none';
                }
            };
            
            setTimeout(typeWriter, 2000);
        }
        
        // Эффект волны для кнопок
        const buttons = document.querySelectorAll('.submit-button');
        buttons.forEach(button => {
            button.addEventListener('click', function(e) {
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    left: ${x}px;
                    top: ${y}px;
                    background: rgba(255,255,255,0.3);
                    border-radius: 50%;
                    transform: scale(0);
                    animation: ripple 0.6s linear;
                    pointer-events: none;
                `;
                
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
        
        // Интерактивность цветных кружков
        const colorCircles = document.querySelectorAll('.color-circle');
        colorCircles.forEach(circle => {
            circle.addEventListener('click', function() {
                // Убираем активный класс у всех кружков
                colorCircles.forEach(c => c.classList.remove('selected'));
                // Добавляем активный класс к выбранному
                this.classList.add('selected');
                
                // Показываем уведомление о выборе цвета
                const colorName = this.getAttribute('title');
                showNotification(`Выбран цвет: ${colorName}`, 'info');
            });
        });
    }
    
    // CSS для анимации волны
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .animate-in {
            animation: slideInUp 0.8s ease-out forwards;
        }
        
        @keyframes slideInUp {
            from {
                opacity: 0;
                transform: translateY(50px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        
        .notification-close {
            background: none;
            border: none;
            color: white;
            font-size: 20px;
            cursor: pointer;
            margin-left: 15px;
        }
        
        .color-circle.selected {
            transform: scale(1.3);
            box-shadow: 0 0 0 3px var(--color-accent-2);
        }
    `;
    document.head.appendChild(style);
    
    // Инициализация дополнительных эффектов
    setTimeout(initAdditionalEffects, 1000);
    
    // Обработка ошибок
    window.addEventListener('error', function(e) {
        console.error('Ошибка:', e.error);
    });
    
    // Оптимизация производительности
    let ticking = false;
    
    function updateOnScroll() {
        // Обновления при прокрутке
        ticking = false;
    }
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateOnScroll);
            ticking = true;
        }
    });
}); 