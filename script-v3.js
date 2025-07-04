// JavaScript для третьего варианта - винтажный романтичный стиль
document.addEventListener('DOMContentLoaded', function() {
    
    // Инициализация всех функций
    initVintageEffects();
    initScrollAnimations();
    initRSVPForm();
    initHeartAnimations();
    initSmoothScrolling();
    initPhoneValidation();
    initVintageNotifications();
    
    // Винтажные эффекты
    function initVintageEffects() {
        // Эффект старинной бумаги для карточек
        document.querySelectorAll('.invitation-card, .rsvp-card, .detail-item, .info-item').forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px) rotate(1deg)';
                this.style.boxShadow = '0 10px 40px rgba(44, 24, 16, 0.25)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) rotate(0deg)';
                this.style.boxShadow = '';
            });
        });
        
        // Эффект для декоративных элементов
        document.querySelectorAll('.ornate-divider').forEach(divider => {
            divider.addEventListener('mouseenter', function() {
                const icon = this.querySelector('.divider-icon');
                icon.style.transform = 'scale(1.3) rotate(10deg)';
                icon.style.color = '#d4af37';
            });
            
            divider.addEventListener('mouseleave', function() {
                const icon = this.querySelector('.divider-icon');
                icon.style.transform = 'scale(1) rotate(0deg)';
                icon.style.color = '';
            });
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
                    
                    // Специальная анимация для винтажных элементов
                    if (entry.target.classList.contains('detail-item') || 
                        entry.target.classList.contains('info-item')) {
                        setTimeout(() => {
                            entry.target.style.opacity = '1';
                            entry.target.style.transform = 'translateY(0) scale(1)';
                        }, 200);
                    }
                }
            });
        }, observerOptions);
        
        // Наблюдаем за элементами
        document.querySelectorAll('.detail-item, .info-item, .invitation-card, .rsvp-card').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px) scale(0.95)';
            el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            observer.observe(el);
        });
    }
    
    // Анимации сердечек
    function initHeartAnimations() {
        const hearts = document.querySelectorAll('.heart');
        
        hearts.forEach((heart, index) => {
            // Добавляем случайные движения
            setInterval(() => {
                const randomX = Math.random() * 20 - 10;
                const randomY = Math.random() * 20 - 10;
                const randomScale = 0.8 + Math.random() * 0.4;
                
                heart.style.transform = `rotate(45deg) translate(${randomX}px, ${randomY}px) scale(${randomScale})`;
            }, 3000 + index * 500);
        });
        
        // Эффект при клике на сердечки
        hearts.forEach(heart => {
            heart.addEventListener('click', function() {
                this.style.transform = 'rotate(45deg) scale(1.5)';
                this.style.opacity = '0.8';
                
                setTimeout(() => {
                    this.style.transform = '';
                    this.style.opacity = '';
                }, 500);
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
                    const offsetTop = target.offsetTop - 20;
                    
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
                    showVintageNotification('Пожалуйста, заполните все обязательные поля', 'error');
                    return;
                }
                
                // Показываем уведомление об успехе
                showVintageNotification('Спасибо! Ваше присутствие подтверждено. Мы свяжемся с вами для уточнения деталей.', 'success');
                
                // Очищаем форму
                rsvpForm.reset();
                
                // Винтажная анимация кнопки
                const submitBtn = rsvpForm.querySelector('.submit-btn');
                submitBtn.innerHTML = '<i class="fas fa-heart"></i> Отправлено с любовью!';
                submitBtn.style.background = '#9aa795';
                submitBtn.style.transform = 'scale(1.05)';
                
                setTimeout(() => {
                    submitBtn.innerHTML = '<span>Подтвердить присутствие</span><i class="fas fa-paper-plane"></i>';
                    submitBtn.style.background = '';
                    submitBtn.style.transform = '';
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
    
    // Винтажная система уведомлений
    function initVintageNotifications() {
        // Создаем стили для винтажных уведомлений
        const style = document.createElement('style');
        style.textContent = `
            .vintage-notification {
                position: fixed;
                top: 100px;
                right: 20px;
                background: #fffff0;
                border: 2px solid #d4af37;
                border-radius: 8px;
                padding: 20px;
                box-shadow: 0 4px 20px rgba(44, 24, 16, 0.2);
                z-index: 10000;
                transform: translateX(100%);
                transition: transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                max-width: 350px;
                font-family: 'Crimson Text', serif;
                position: relative;
            }
            
            .vintage-notification::before {
                content: '';
                position: absolute;
                top: -5px;
                left: -5px;
                right: -5px;
                bottom: -5px;
                border: 1px solid #bd908d;
                border-radius: 10px;
                z-index: -1;
            }
            
            .vintage-notification.success {
                border-color: #657362;
            }
            
            .vintage-notification.error {
                border-color: #bd908d;
            }
            
            .vintage-notification-content {
                display: flex;
                align-items: center;
                gap: 15px;
            }
            
            .vintage-notification-icon {
                font-size: 1.5rem;
                color: #d4af37;
            }
            
            .vintage-notification-text {
                color: #2c1810;
                font-size: 0.9rem;
                line-height: 1.4;
            }
            
            .vintage-notification-close {
                position: absolute;
                top: 10px;
                right: 10px;
                background: none;
                border: none;
                color: #5d4037;
                cursor: pointer;
                font-size: 1rem;
                padding: 5px;
                border-radius: 50%;
                transition: all 0.3s ease;
            }
            
            .vintage-notification-close:hover {
                background: #f4c2c2;
                color: #2c1810;
            }
        `;
        document.head.appendChild(style);
    }
    
    // Функция для показа винтажных уведомлений
    function showVintageNotification(message, type = 'info') {
        // Удаляем существующие уведомления
        document.querySelectorAll('.vintage-notification').forEach(n => n.remove());
        
        const notification = document.createElement('div');
        notification.className = `vintage-notification ${type}`;
        notification.innerHTML = `
            <div class="vintage-notification-content">
                <i class="fas ${type === 'success' ? 'fa-heart' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'} vintage-notification-icon"></i>
                <div class="vintage-notification-text">${message}</div>
            </div>
            <button class="vintage-notification-close">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        // Добавляем в DOM
        document.body.appendChild(notification);
        
        // Показываем уведомление
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Обработчик закрытия
        const closeBtn = notification.querySelector('.vintage-notification-close');
        closeBtn.addEventListener('click', () => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 500);
        });
        
        // Автоматическое скрытие
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.transform = 'translateX(100%)';
                setTimeout(() => notification.remove(), 500);
            }
        }, 6000);
    }
    
    // Дополнительные винтажные эффекты
    function initAdditionalVintageEffects() {
        // Эффект для заголовков
        document.querySelectorAll('.section-title').forEach(title => {
            title.addEventListener('mouseenter', function() {
                const after = this.querySelector('::after');
                if (after) {
                    after.style.width = '120px';
                }
            });
            
            title.addEventListener('mouseleave', function() {
                const after = this.querySelector('::after');
                if (after) {
                    after.style.width = '80px';
                }
            });
        });
        
        // Эффект для иконок
        document.querySelectorAll('.detail-icon i, .info-header i').forEach(icon => {
            icon.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.2) rotate(15deg)';
                this.style.color = '#d4af37';
                this.style.transition = 'all 0.3s ease';
            });
            
            icon.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1) rotate(0deg)';
                this.style.color = '';
            });
        });
        
        // Эффект для ссылок
        document.querySelectorAll('.map-link').forEach(link => {
            link.addEventListener('mouseenter', function() {
                this.style.transform = 'translateX(5px)';
                this.style.color = '#d4af37';
            });
            
            link.addEventListener('mouseleave', function() {
                this.style.transform = 'translateX(0)';
                this.style.color = '';
            });
        });
    }
    
    // Инициализация дополнительных эффектов
    initAdditionalVintageEffects();
    
    // Счетчик до свадьбы в винтажном стиле
    function initVintageCountdown() {
        const weddingDate = new Date('2025-09-20T18:00:00');
        
        function updateCountdown() {
            const now = new Date();
            const difference = weddingDate - now;
            
            if (difference > 0) {
                const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
                
                // Можно добавить элемент для отображения счетчика в винтажном стиле
                // const countdownElement = document.querySelector('.vintage-countdown');
                // if (countdownElement) {
                //     countdownElement.innerHTML = `
                //         <div class="countdown-item">
                //             <span class="countdown-number">${days}</span>
                //             <span class="countdown-label">дней</span>
                //         </div>
                //         <div class="countdown-item">
                //             <span class="countdown-number">${hours}</span>
                //             <span class="countdown-label">часов</span>
                //         </div>
                //         <div class="countdown-item">
                //             <span class="countdown-number">${minutes}</span>
                //             <span class="countdown-label">минут</span>
                //         </div>
                //     `;
                // }
            }
        }
        
        updateCountdown();
        setInterval(updateCountdown, 60000); // Обновляем каждую минуту
    }
    
    // Инициализация счетчика
    initVintageCountdown();
    
    // Глобальные функции
    window.showVintageNotification = showVintageNotification;
    
    // Обработка ошибок
    window.addEventListener('error', function(e) {
        console.error('Ошибка на странице:', e.error);
    });
    
    // Улучшенная производительность для винтажных эффектов
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
    
    // Специальный эффект для главной секции
    function initHeroEffects() {
        const heroSection = document.querySelector('.hero-section');
        const ornateFrame = document.querySelector('.ornate-frame');
        
        if (heroSection && ornateFrame) {
            window.addEventListener('scroll', function() {
                const scrolled = window.pageYOffset;
                const rate = scrolled * -0.3;
                
                ornateFrame.style.transform = `translateY(${rate}px)`;
                
                // Эффект параллакса для сердечек
                const hearts = document.querySelectorAll('.heart');
                hearts.forEach((heart, index) => {
                    const speed = (index + 1) * 0.1;
                    heart.style.transform = `rotate(45deg) translateY(${rate * speed}px)`;
                });
            });
        }
    }
    
    // Инициализация эффектов главной секции
    initHeroEffects();
}); 