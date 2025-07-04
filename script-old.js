// Обработка формы регистрации
document.addEventListener('DOMContentLoaded', function() {
    const registrationForm = document.getElementById('registrationForm');
    
    if (registrationForm) {
        registrationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Получаем данные формы
            const formData = new FormData(registrationForm);
            const fullName = formData.get('fullName');
            const phone = formData.get('phone');
            const guests = formData.get('guests');
            const message = formData.get('message');
            
            // Простая валидация
            if (!fullName || !phone || !guests) {
                showNotification('Пожалуйста, заполните все обязательные поля', 'error');
                return;
            }
            
            // В реальном проекте здесь был бы AJAX запрос к серверу
            // Пока что просто показываем уведомление об успехе
            showNotification('Спасибо! Ваше присутствие подтверждено. Мы свяжемся с вами для уточнения деталей.', 'success');
            
            // Очищаем форму
            registrationForm.reset();
        });
    }
    
    // Плавная прокрутка для навигации
    const smoothScroll = function(target) {
        const element = document.querySelector(target);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    };
    
    // Добавляем обработчики для ссылок с якорями
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.getAttribute('href');
            smoothScroll(target);
        });
    });
    
    // Анимация появления элементов при скролле
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
    
    // Наблюдаем за карточками и секциями
    document.querySelectorAll('.detail-card, .tip-card, .welcome-content, .registration-form').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Функция для показа уведомлений
    function showNotification(message, type = 'info') {
        // Создаем элемент уведомления
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Добавляем стили
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 8px;
            color: white;
            font-weight: 500;
            z-index: 1000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 300px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        `;
        
        // Устанавливаем цвет в зависимости от типа
        if (type === 'success') {
            notification.style.background = '#657362';
        } else if (type === 'error') {
            notification.style.background = '#bd908d';
        } else {
            notification.style.background = '#9aa795';
        }
        
        // Добавляем в DOM
        document.body.appendChild(notification);
        
        // Показываем уведомление
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Скрываем через 5 секунд
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 5000);
    }
    
    // Добавляем глобальную функцию для показа уведомлений
    window.showNotification = showNotification;
    
    // Дополнительные эффекты для шапки
    const header = document.querySelector('.header');
    if (header) {
        // Параллакс эффект для шапки
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            const fabricLayers = document.querySelectorAll('.fabric-layer');
            fabricLayers.forEach((layer, index) => {
                const speed = (index + 1) * 0.1;
                layer.style.transform = `translateY(${rate * speed}px)`;
            });
        });
    }
    
    // Анимация для иконок в карточках
    document.querySelectorAll('.detail-card i, .tip-card i').forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotate(5deg)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });
    
    // Валидация телефона
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
}); 