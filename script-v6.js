// JavaScript для шестого варианта - современный минималистичный стиль с Great Vibes
document.addEventListener('DOMContentLoaded', function() {
    
    // Инициализация всех функций
    initMinimalEffects();
    initScrollAnimations();
    initRSVPForm();
    initNavigation();
    initSmoothScrolling();
    initPhoneValidation();
    initMinimalNotifications();
    initCleanEffects();
    
    // Минималистичные эффекты
    function initMinimalEffects() {
        // Эффект для карточек с минималистичными переходами
        document.querySelectorAll('.detail-card, .info-card, .timeline-content').forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px)';
                this.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.1)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = '';
            });
        });
        
        // Эффект для кнопок с плавными переходами
        document.querySelectorAll('.btn').forEach(btn => {
            btn.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-2px)';
            });
            
            btn.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
        });
        
        // Эффект для иконок с минималистичной анимацией
        document.querySelectorAll('.card-icon i, .info-icon i').forEach(icon => {
            icon.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.2)';
                this.style.transition = 'transform 0.3s ease';
            });
            
            icon.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
            });
        });
        
        // Эффект для минимальных элементов
        document.querySelectorAll('.minimal-element').forEach(element => {
            element.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.1)';
                this.style.borderColor = 'var(--color-accent-2)';
            });
            
            element.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
                this.style.borderColor = '';
            });
        });
    }
    
    // Анимации при скролле с минималистичными переходами
    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                    // Минималистичная анимация для timeline элементов
                    if (entry.target.classList.contains('timeline-item')) {
                        setTimeout(() => {
                            entry.target.style.opacity = '1';
                            entry.target.style.transform = 'translateY(0)';
                        }, 200);
                    }
                    
                    // Анимация для карточек
                    if (entry.target.classList.contains('detail-card') || 
                        entry.target.classList.contains('info-card')) {
                        setTimeout(() => {
                            entry.target.style.opacity = '1';
                            entry.target.style.transform = 'translateY(0)';
                        }, 300);
                    }
                    
                    // Анимация для формы RSVP
                    if (entry.target.classList.contains('rsvp-form')) {
                        setTimeout(() => {
                            entry.target.style.opacity = '1';
                            entry.target.style.transform = 'translateY(0)';
                        }, 400);
                    }
                }
            });
        }, observerOptions);
        
        // Наблюдаем за элементами с начальными стилями
        document.querySelectorAll('.timeline-item, .detail-card, .info-card, .rsvp-form').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }
    
    // Навигация с минималистичными эффектами
    function initNavigation() {
        const navbar = document.querySelector('.navbar');
        const navLinks = document.querySelectorAll('.nav-link');
        
        // Эффект прозрачности при скролле
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.boxShadow = 'none';
            }
        });
        
        // Активная ссылка при скролле
        const sections = document.querySelectorAll('section[id]');
        window.addEventListener('scroll', function() {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (window.scrollY >= (sectionTop - 200)) {
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
        
        // Мобильное меню
        const navToggle = document.querySelector('.nav-toggle');
        const navMenu = document.querySelector('.nav-menu');
        
        if (navToggle && navMenu) {
            navToggle.addEventListener('click', function() {
                navMenu.classList.toggle('active');
                navToggle.classList.toggle('active');
            });
        }
    }
    
    // Плавная прокрутка
    function initSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                
                if (target) {
                    const offsetTop = target.offsetTop - 70;
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    // Обработка RSVP формы с минималистичными уведомлениями
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
                    showMinimalNotification('Пожалуйста, заполните все обязательные поля', 'error');
                    return;
                }
                
                // Показываем уведомление об успехе
                showMinimalNotification('Спасибо! Ваше присутствие подтверждено.', 'success');
                
                // Очищаем форму
                rsvpForm.reset();
                
                // Минималистичная анимация кнопки
                const submitBtn = rsvpForm.querySelector('.submit-btn');
                submitBtn.textContent = 'Отправлено!';
                submitBtn.style.background = 'var(--color-secondary)';
                
                setTimeout(() => {
                    submitBtn.textContent = 'Подтвердить присутствие';
                    submitBtn.style.background = '';
                }, 3000);
            });
        }
    }
    
    // Валидация телефона с форматированием
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
    
    // Минималистичная система уведомлений
    function initMinimalNotifications() {
        // Создаем стили для минималистичных уведомлений
        const style = document.createElement('style');
        style.textContent = `
            .minimal-notification {
                position: fixed;
                top: 100px;
                right: 20px;
                background: var(--color-white);
                border: 1px solid var(--color-border);
                border-radius: var(--border-radius);
                padding: 20px;
                box-shadow: var(--shadow-subtle);
                z-index: 10000;
                transform: translateX(100%);
                transition: transform 0.3s ease;
                max-width: 350px;
                font-family: var(--font-body);
                display: flex;
                align-items: center;
                gap: 15px;
            }
            
            .minimal-notification.success {
                border-left: 3px solid var(--color-primary);
            }
            
            .minimal-notification.error {
                border-left: 3px solid var(--color-accent-2);
            }
            
            .minimal-notification-icon {
                width: 20px;
                height: 20px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 0.8rem;
                color: white;
                flex-shrink: 0;
            }
            
            .minimal-notification.success .minimal-notification-icon {
                background: var(--color-primary);
            }
            
            .minimal-notification.error .minimal-notification-icon {
                background: var(--color-accent-2);
            }
            
            .minimal-notification-text {
                color: var(--color-text);
                font-size: 0.9rem;
                line-height: 1.4;
                flex: 1;
            }
            
            .minimal-notification-close {
                background: none;
                border: none;
                color: var(--color-text-light);
                cursor: pointer;
                font-size: 1rem;
                padding: 5px;
                border-radius: 50%;
                transition: var(--transition);
            }
            
            .minimal-notification-close:hover {
                background: var(--color-lighter);
                color: var(--color-text);
            }
        `;
        document.head.appendChild(style);
    }
    
    // Функция для показа минималистичных уведомлений
    function showMinimalNotification(message, type = 'info') {
        // Удаляем существующие уведомления
        document.querySelectorAll('.minimal-notification').forEach(n => n.remove());
        
        const notification = document.createElement('div');
        notification.className = `minimal-notification ${type}`;
        notification.innerHTML = `
            <div class="minimal-notification-icon">
                <i class="fas ${type === 'success' ? 'fa-check' : type === 'error' ? 'fa-exclamation' : 'fa-info'}"></i>
            </div>
            <div class="minimal-notification-text">${message}</div>
            <button class="minimal-notification-close">
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
        const closeBtn = notification.querySelector('.minimal-notification-close');
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
    
    // Чистые эффекты для минималистичного дизайна
    function initCleanEffects() {
        // Эффект для заголовков с рукописным шрифтом
        document.querySelectorAll('.section-title, .title-main, .brand-text').forEach(title => {
            title.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.02)';
                this.style.transition = 'transform 0.3s ease';
            });
            
            title.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
            });
        });
        
        // Эффект для ссылок
        document.querySelectorAll('.detail-link').forEach(link => {
            link.addEventListener('mouseenter', function() {
                this.style.transform = 'translateX(3px)';
                this.style.color = 'var(--color-primary)';
            });
            
            link.addEventListener('mouseleave', function() {
                this.style.transform = 'translateX(0)';
                this.style.color = '';
            });
        });
        
        // Эффект для социальных ссылок
        document.querySelectorAll('.social-link').forEach(link => {
            link.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-2px) scale(1.05)';
            });
            
            link.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });
        
        // Эффект для полей формы
        document.querySelectorAll('.form-group input, .form-group select, .form-group textarea').forEach(field => {
            field.addEventListener('focus', function() {
                this.parentElement.style.transform = 'translateY(-1px)';
            });
            
            field.addEventListener('blur', function() {
                this.parentElement.style.transform = 'translateY(0)';
            });
        });
    }
    
    // Дополнительные минималистичные эффекты
    function initAdditionalMinimalEffects() {
        // Эффект для декоративных линий
        document.querySelectorAll('.divider-line').forEach(line => {
            line.addEventListener('mouseenter', function() {
                this.style.transform = 'scaleX(1.2)';
                this.style.transition = 'transform 0.3s ease';
            });
            
            line.addEventListener('mouseleave', function() {
                this.style.transform = 'scaleX(1)';
            });
        });
        
        // Эффект для точек
        document.querySelectorAll('.divider-dot, .marker-dot').forEach(dot => {
            dot.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.3)';
                this.style.transition = 'transform 0.3s ease';
            });
            
            dot.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
            });
        });
    }
    
    // Инициализация дополнительных эффектов
    initAdditionalMinimalEffects();
    
    // Счетчик до свадьбы
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
        setInterval(updateCountdown, 60000);
    }
    
    // Инициализация счетчика
    initCountdown();
    
    // Глобальные функции
    window.showMinimalNotification = showMinimalNotification;
    
    // Обработка ошибок
    window.addEventListener('error', function(e) {
        console.error('Ошибка на странице:', e.error);
    });
    
    // Улучшенная производительность
    let ticking = false;
    
    function updateOnScroll() {
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateOnScroll);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);
    
    // Минималистичный эффект для главной секции
    function initHeroEffects() {
        const heroSection = document.querySelector('.hero');
        const heroContent = document.querySelector('.hero-content');
        
        if (heroSection && heroContent) {
            window.addEventListener('scroll', function() {
                const scrolled = window.pageYOffset;
                const rate = scrolled * -0.1;
                
                heroContent.style.transform = `translateY(${rate}px)`;
                
                // Эффект параллакса для минимальных элементов
                const minimalElements = document.querySelectorAll('.minimal-element');
                minimalElements.forEach((element, index) => {
                    const speed = (index + 1) * 0.05;
                    element.style.transform = `translateY(${rate * speed}px)`;
                });
            });
        }
    }
    
    // Инициализация эффектов главной секции
    initHeroEffects();
}); 