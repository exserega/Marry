// Основной JavaScript для второго варианта свадебного сайта
document.addEventListener('DOMContentLoaded', function() {
    
    // Инициализация всех функций
    initNavigation();
    initScrollAnimations();
    initRSVPForm();
    initParallaxEffects();
    initSmoothScrolling();
    initPhoneValidation();
    
    // Навигация с эффектом прозрачности
    function initNavigation() {
        const navbar = document.querySelector('.navbar');
        
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.boxShadow = 'none';
            }
        });
    }
    
    // Анимации при скролле
    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                    // Специальная анимация для timeline элементов
                    if (entry.target.classList.contains('timeline-item')) {
                        setTimeout(() => {
                            entry.target.style.opacity = '1';
                            entry.target.style.transform = 'translateY(0)';
                        }, 200);
                    }
                }
            });
        }, observerOptions);
        
        // Наблюдаем за элементами
        document.querySelectorAll('.timeline-item, .detail-card, .info-card, .rsvp-form').forEach(el => {
            observer.observe(el);
        });
    }
    
    // Параллакс эффекты
    function initParallaxEffects() {
        const floatingElements = document.querySelectorAll('.floating-element');
        
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.3;
            
            floatingElements.forEach((element, index) => {
                const speed = (index + 1) * 0.2;
                element.style.transform = `translateY(${rate * speed}px) rotate(${scrolled * 0.1}deg)`;
            });
        });
    }
    
    // Плавная прокрутка
    function initSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                
                if (target) {
                    const offsetTop = target.offsetTop - 80; // Учитываем высоту навигации
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    // Обработка RSVP формы
    function initRSVPForm() {
        const rsvpForm = document.getElementById('rsvpForm');
        
        if (rsvpForm) {
            rsvpForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Получаем данные формы
                const formData = new FormData(rsvpForm);
                const fullName = formData.get('fullName');
                const phone = formData.get('phone');
                const guests = formData.get('guests');
                const dietary = formData.get('dietary');
                const message = formData.get('message');
                
                // Валидация
                if (!fullName || !phone || !guests) {
                    showNotification('Пожалуйста, заполните все обязательные поля', 'error');
                    return;
                }
                
                // Показываем уведомление об успехе
                showNotification('Спасибо! Ваше присутствие подтверждено. Мы свяжемся с вами для уточнения деталей.', 'success');
                
                // Очищаем форму
                rsvpForm.reset();
                
                // Анимация кнопки
                const submitBtn = rsvpForm.querySelector('.submit-button');
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Отправлено!';
                submitBtn.style.background = '#9aa795';
                
                setTimeout(() => {
                    submitBtn.innerHTML = '<span>Подтвердить присутствие</span><i class="fas fa-paper-plane"></i>';
                    submitBtn.style.background = '';
                }, 3000);
            });
        }
    }
    
    // Валидация телефона
    function initPhoneValidation() {
        const phoneInput = document.getElementById('phone');
        
        if (phoneInput) {
            phoneInput.addEventListener('input', function(e) {
                let value = e.target.value.replace(/\D/g, '');
                
                if (value.length > 0) {
                    if (value.length <= 3) {
                        value = `+7 (${value}`;
                    } else if (value.length <= 6) {
                        value = `+7 (${value.slice(0, 3)}) ${value.slice(3)}`;
                    } else if (value.length <= 8) {
                        value = `+7 (${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6)}`;
                    } else {
                        value = `+7 (${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 8)}-${value.slice(8, 10)}`;
                    }
                }
                
                e.target.value = value;
            });
        }
    }
    
    // Система уведомлений
    function showNotification(message, type = 'info') {
        // Удаляем существующие уведомления
        document.querySelectorAll('.notification').forEach(n => n.remove());
        
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
                <span>${message}</span>
            </div>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        // Добавляем стили
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? '#657362' : type === 'error' ? '#bd908d' : '#9aa795'};
            color: white;
            padding: 16px 20px;
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            max-width: 350px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 15px;
        `;
        
        // Добавляем в DOM
        document.body.appendChild(notification);
        
        // Показываем уведомление
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Обработчик закрытия
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        });
        
        // Автоматическое скрытие
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.transform = 'translateX(100%)';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
    }
    
    // Дополнительные интерактивные эффекты
    function initInteractiveEffects() {
        // Эффект для карточек
        document.querySelectorAll('.detail-card, .info-card').forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-8px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });
        
        // Эффект для иконок
        document.querySelectorAll('.detail-icon i, .info-header i').forEach(icon => {
            icon.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.2) rotate(10deg)';
                this.style.transition = 'transform 0.3s ease';
            });
            
            icon.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1) rotate(0deg)';
            });
        });
    }
    
    // Инициализация интерактивных эффектов
    initInteractiveEffects();
    
    // Счетчик до свадьбы (опционально)
    function initCountdown() {
        const weddingDate = new Date('2025-09-20T18:00:00');
        
        function updateCountdown() {
            const now = new Date();
            const difference = weddingDate - now;
            
            if (difference > 0) {
                const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
                
                // Можно добавить элемент для отображения счетчика
                // const countdownElement = document.querySelector('.countdown');
                // if (countdownElement) {
                //     countdownElement.innerHTML = `${days} дней, ${hours} часов, ${minutes} минут`;
                // }
            }
        }
        
        updateCountdown();
        setInterval(updateCountdown, 60000); // Обновляем каждую минуту
    }
    
    // Инициализация счетчика
    initCountdown();
    
    // Эффект печатной машинки для заголовка (опционально)
    function initTypewriterEffect() {
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle) {
            const names = heroTitle.querySelectorAll('.name');
            
            names.forEach((name, index) => {
                const text = name.textContent;
                name.textContent = '';
                name.style.opacity = '1';
                
                let i = 0;
                const typeInterval = setInterval(() => {
                    if (i < text.length) {
                        name.textContent += text.charAt(i);
                        i++;
                    } else {
                        clearInterval(typeInterval);
                    }
                }, 150 + (index * 100));
            });
        }
    }
    
    // Инициализация эффекта печатной машинки
    // initTypewriterEffect(); // Раскомментируйте для активации
    
    // Глобальные функции
    window.showNotification = showNotification;
    
    // Обработка ошибок
    window.addEventListener('error', function(e) {
        console.error('Ошибка на странице:', e.error);
    });
    
    // Улучшенная производительность
    let ticking = false;
    
    function updateOnScroll() {
        // Обновляем только при необходимости
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateOnScroll);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);
}); 