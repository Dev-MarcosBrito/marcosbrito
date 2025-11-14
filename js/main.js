/**
 * main.js - Funcionalidades do portfólio
 * Menu mobile, carrossel de projetos, validação de formulário e interações
 */

// Verificar se JavaScript está habilitado
document.documentElement.classList.remove('no-js');
document.documentElement.classList.add('js-enabled');

// ============================================
// MENU MOBILE - Menu sempre visível, sem hambúrguer
// ============================================
(function initMobileMenu() {
    const navLinks = document.getElementById('nav-links');
    
    if (!navLinks) return;

    // Adicionar atributos ARIA
    navLinks.setAttribute('role', 'navigation');
    navLinks.setAttribute('aria-label', 'Menu principal');
})();

// ============================================
// CARROSSEL DE PROJETOS
// ============================================
(function initProjectsCarousel() {
    const projectsContent = document.querySelector('.projects-content');
    if (!projectsContent) return;

    // Adicionar atributos de acessibilidade
    projectsContent.setAttribute('role', 'region');
    projectsContent.setAttribute('aria-label', 'Carrossel de projetos');
    projectsContent.setAttribute('tabindex', '0');

    // Criar botões de navegação
    const carouselControls = document.createElement('div');
    carouselControls.className = 'carousel-controls';
    carouselControls.setAttribute('role', 'group');
    carouselControls.setAttribute('aria-label', 'Controles do carrossel');

    const prevBtn = document.createElement('button');
    prevBtn.className = 'carousel-btn';
    prevBtn.setAttribute('aria-label', 'Projeto anterior');
    prevBtn.textContent = '← Anterior';
    prevBtn.id = 'carousel-prev';

    const nextBtn = document.createElement('button');
    nextBtn.className = 'carousel-btn';
    nextBtn.setAttribute('aria-label', 'Próximo projeto');
    nextBtn.textContent = 'Próximo →';
    nextBtn.id = 'carousel-next';

    // Criar indicadores de posição
    const scrollIndicator = document.createElement('div');
    scrollIndicator.className = 'projects-scroll-indicator';
    scrollIndicator.setAttribute('role', 'tablist');
    scrollIndicator.setAttribute('aria-label', 'Indicadores de posição do carrossel');

    // Adicionar elementos ao DOM
    carouselControls.appendChild(prevBtn);
    carouselControls.appendChild(nextBtn);
    projectsContent.parentNode.insertBefore(carouselControls, projectsContent.nextSibling);
    projectsContent.parentNode.insertBefore(scrollIndicator, carouselControls.nextSibling);

    const cards = Array.from(projectsContent.querySelectorAll('.projects-card'));
    if (cards.length === 0) return;

    let currentIndex = 0;
    let isDragging = false;
    let startX;
    let scrollLeft;
    let touchStartX;
    
    // Inicializar indicadores de posição
    function initScrollIndicators() {
        scrollIndicator.innerHTML = '';
        const visibleCount = getVisibleCardsCount();
        const indicatorCount = Math.ceil(cards.length / visibleCount);
        
        for (let i = 0; i < indicatorCount; i++) {
            const dot = document.createElement('button');
            dot.className = 'scroll-dot';
            dot.setAttribute('role', 'tab');
            dot.setAttribute('aria-label', `Ir para o grupo de projetos ${i + 1}`);
            dot.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
            dot.setAttribute('data-index', i);
            
            dot.addEventListener('click', () => {
                scrollToIndex(i);
            });
            
            scrollIndicator.appendChild(dot);
        }
        
        updateIndicators();
    }
    
    // Atualizar indicadores ativos
    function updateIndicators() {
        const dots = scrollIndicator.querySelectorAll('.scroll-dot');
        const visibleCount = getVisibleCardsCount();
        const currentIndicator = Math.floor(currentIndex / visibleCount);
        
        dots.forEach((dot, index) => {
            const isSelected = index === currentIndicator;
            dot.setAttribute('aria-selected', isSelected);
            dot.classList.toggle('active', isSelected);
        });
    }
    
    // Rolar para um índice específico
    function scrollToIndex(index) {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const visibleCount = getVisibleCardsCount();
        const firstCard = cards[0];
        if (!firstCard) return;
        
        const cardWidth = firstCard.offsetWidth;
        const gap = parseInt(window.getComputedStyle(projectsContent).gap) || 24;
        const cardWithGap = cardWidth + gap;
        
        currentIndex = Math.min(Math.max(0, index * visibleCount), cards.length - 1);
        const scrollPosition = currentIndex * cardWithGap;
        
        projectsContent.scrollTo({
            left: scrollPosition,
            behavior: prefersReducedMotion ? 'auto' : 'smooth'
        });
        
        updateButtons();
        updateIndicators();
    }
    
    // Calcular quantos cards são visíveis por vez
    function getVisibleCardsCount() {
        const containerWidth = projectsContent.offsetWidth;
        const firstCard = cards[0];
        if (!firstCard) return 3;
        
        const cardWidth = firstCard.offsetWidth;
        const gap = parseInt(window.getComputedStyle(projectsContent).gap) || 24;
        const cardsPerView = Math.max(1, Math.floor((containerWidth + gap) / (cardWidth + gap)));
        return Math.min(cardsPerView, 3); // Máximo 3 cards por view
    }

    // Função para atualizar visibilidade dos botões
    function updateButtons() {
        const visibleCount = getVisibleCardsCount();
        const maxIndex = Math.max(0, cards.length - visibleCount);
        prevBtn.disabled = currentIndex <= 0;
        nextBtn.disabled = currentIndex >= maxIndex;
    }

    // Função para rolar para o próximo grupo de cards
    function scrollToGroup(direction) {
        const visibleCount = getVisibleCardsCount();
        
        if (direction === 'next') {
            scrollToIndex(Math.floor(currentIndex / visibleCount) + 1);
        } else {
            scrollToIndex(Math.max(0, Math.floor(currentIndex / visibleCount) - 1));
        }
    }

    // Event listeners dos botões
    prevBtn.addEventListener('click', () => scrollToGroup('prev'));
    nextBtn.addEventListener('click', () => scrollToGroup('next'));

    // Mouse events para arrastar
    function handleMouseDown(e) {
        isDragging = true;
        projectsContent.style.cursor = 'grabbing';
        startX = e.pageX - projectsContent.offsetLeft;
        scrollLeft = projectsContent.scrollLeft;
        projectsContent.style.scrollSnapType = 'none';
    }
    
    function handleMouseLeave() {
        isDragging = false;
        projectsContent.style.cursor = 'grab';
        projectsContent.style.scrollSnapType = 'x mandatory';
        snapToNearestCard();
    }
    
    function handleMouseUp() {
        isDragging = false;
        projectsContent.style.cursor = 'grab';
        projectsContent.style.scrollSnapType = 'x mandatory';
        snapToNearestCard();
    }
    
    function handleMouseMove(e) {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - projectsContent.offsetLeft;
        const walk = (x - startX) * 1.5; // Ajuste da sensibilidade do arraste
        projectsContent.scrollLeft = scrollLeft - walk;
    }
    
    // Touch events
    function handleTouchStart(e) {
        touchStartX = e.touches[0].clientX;
        projectsContent.style.scrollSnapType = 'none';
    }
    
    function handleTouchMove(e) {
        if (!touchStartX) return;
        
        const touchX = e.touches[0].clientX;
        const diff = touchStartX - touchX;
        
        // Evitar rolagem vertical durante o arraste horizontal
        if (Math.abs(diff) > 5) {
            e.preventDefault();
        }
        
        projectsContent.scrollLeft += diff;
        touchStartX = touchX;
    }
    
    function handleTouchEnd() {
        touchStartX = null;
        projectsContent.style.scrollSnapType = 'x mandatory';
        snapToNearestCard();
    }
    
    // Ajustar o scroll para o card mais próximo
    function snapToNearestCard() {
        const firstCard = cards[0];
        if (!firstCard) return;
        
        const cardWidth = firstCard.offsetWidth;
        const gap = parseInt(window.getComputedStyle(projectsContent).gap) || 24;
        const cardWithGap = cardWidth + gap;
        
        const scrollPosition = projectsContent.scrollLeft;
        currentIndex = Math.round(scrollPosition / cardWithGap);
        
        // Garantir que o índice esteja dentro dos limites
        currentIndex = Math.max(0, Math.min(currentIndex, cards.length - 1));
        
        const snapPosition = currentIndex * cardWithGap;
        
        projectsContent.scrollTo({
            left: snapPosition,
            behavior: 'smooth'
        });
        
        updateButtons();
        updateIndicators();
    }
    
    // Atualizar índice baseado no scroll
    function handleScroll() {
        if (isDragging) return;
        
        const scrollPosition = projectsContent.scrollLeft;
        const firstCard = cards[0];
        if (!firstCard) return;
        
        const cardWidth = firstCard.offsetWidth;
        const gap = parseInt(window.getComputedStyle(projectsContent).gap) || 24;
        const cardWithGap = cardWidth + gap;
        
        // Usar Math.round para determinar o card mais próximo
        const newIndex = Math.round(scrollPosition / cardWithGap);
        
        if (newIndex !== currentIndex && newIndex >= 0 && newIndex < cards.length) {
            currentIndex = newIndex;
            updateButtons();
            updateIndicators();
        }
    }
    
    // Adicionar event listeners
    projectsContent.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    projectsContent.addEventListener('mouseleave', handleMouseLeave);
    
    // Touch events
    projectsContent.addEventListener('touchstart', handleTouchStart, { passive: true });
    projectsContent.addEventListener('touchmove', handleTouchMove, { passive: false });
    projectsContent.addEventListener('touchend', handleTouchEnd, { passive: true });
    projectsContent.addEventListener('scroll', handleScroll, { passive: true });
    
    // Inicializar
    function init() {
        initScrollIndicators();
        updateButtons();
        handleResize();
    }
    
    // Ocultar botões em telas muito pequenas (carrossel funciona por scroll)
    function handleResize() {
        const isMobile = window.innerWidth <= 768;
        carouselControls.style.display = isMobile ? 'none' : 'flex';
        
        // Recalcular indicadores em caso de redimensionamento
        initScrollIndicators();
        updateButtons();
    }
    
    // Inicializar e adicionar listener de redimensionamento
    init();
    window.addEventListener('resize', () => {
        clearTimeout(window.resizingTimer);
        window.resizingTimer = setTimeout(handleResize, 250);
    });
})();

// ============================================
// ANIMAÇÕES HOVER
// ============================================
(function initHoverAnimations() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) return; // Não aplicar animações se o usuário prefere movimento reduzido

    // Cards de projetos já têm hover no CSS, mas podemos adicionar interatividade extra
    const cards = document.querySelectorAll('.projects-card, .about-content, .skills-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });
})();

// ============================================
// VALIDAÇÃO DE FORMULÁRIO
// ============================================
(function initFormValidation() {
    const form = document.querySelector('.form-contact');
    if (!form) return;

    const nameInput = form.querySelector('.campo-form');
    const messageTextarea = form.querySelector('.text-form');
    const submitBtn = form.querySelector('button');

    // Criar elemento para mensagens
    let messageEl = document.createElement('div');
    messageEl.className = 'form-message';
    messageEl.setAttribute('role', 'alert');
    messageEl.setAttribute('aria-live', 'polite');
    form.appendChild(messageEl);

    // Adicionar labels se não existirem (checagem corrigida)
    if (nameInput && !(nameInput.previousElementSibling && nameInput.previousElementSibling.tagName === 'LABEL')) {
        const nameLabel = document.createElement('label');
        nameLabel.textContent = 'Nome';
        nameLabel.setAttribute('for', 'contact-name');
        nameInput.id = 'contact-name';
        nameInput.parentNode.insertBefore(nameLabel, nameInput);
    }

    if (messageTextarea && !(messageTextarea.previousElementSibling && messageTextarea.previousElementSibling.tagName === 'LABEL')) {
        const messageLabel = document.createElement('label');
        messageLabel.textContent = 'Mensagem';
        messageLabel.setAttribute('for', 'contact-message');
        messageTextarea.id = 'contact-message';
        messageTextarea.parentNode.insertBefore(messageLabel, messageTextarea);
    }

    // Validação em tempo real
    function validateField(field, minLength = 3) {
        const value = field.value.trim();
        if (value.length < minLength) {
            field.setAttribute('aria-invalid', 'true');
            return false;
        }
        field.setAttribute('aria-invalid', 'false');
        return true;
    }

    if (nameInput) {
        nameInput.addEventListener('blur', () => validateField(nameInput, 3));
        nameInput.setAttribute('required', 'true');
    }

    if (messageTextarea) {
        messageTextarea.addEventListener('blur', () => validateField(messageTextarea, 10));
        messageTextarea.setAttribute('required', 'true');
    }

    // Submissão do formulário
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Validar campos
        const isNameValid = nameInput ? validateField(nameInput, 3) : true;
        const isMessageValid = messageTextarea ? validateField(messageTextarea, 10) : true;

        if (!isNameValid || !isMessageValid) {
            messageEl.className = 'form-message error';
            messageEl.textContent = 'Por favor, preencha todos os campos corretamente.';
            messageEl.style.display = 'block';
            return;
        }

        // Preparar mensagem para WhatsApp
        const name = nameInput.value.trim();
        const message = messageTextarea.value.trim();
        const whatsappNumber = '5547989298761'; // número do rodapé
        const whatsappMessage = encodeURIComponent(`Olá Marcos! Meu nome é ${name}. ${message}`);
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

        // Abrir WhatsApp
        window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

        // Mostrar mensagem de sucesso
        messageEl.className = 'form-message success';
        messageEl.textContent = 'Redirecionando para o WhatsApp...';
        messageEl.style.display = 'block';

        // Limpar formulário
        form.reset();
        nameInput.setAttribute('aria-invalid', 'false');
        messageTextarea.setAttribute('aria-invalid', 'false');

        // Ocultar mensagem após 5 segundos
        setTimeout(() => {
            messageEl.style.display = 'none';
        }, 5000);
    });
})();

// ============================================
// SCROLL SUAVE PARA LINKS DE ÂNCORA
// ============================================
(function initSmoothScroll() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: prefersReducedMotion ? 'auto' : 'smooth'
                });
            }
        });
    });
})();

// ============================================
// LAZY LOADING DE IMAGENS
// ============================================
(function initLazyLoading() {
    if ('loading' in HTMLImageElement.prototype) {
        // Navegador suporta lazy loading nativo
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            img.addEventListener('load', function() {
                this.style.opacity = '1';
            });
        });
    } else {
        // Fallback para navegadores antigos
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[loading="lazy"]').forEach(img => {
            imageObserver.observe(img);
        });
    }
})();

// ============================================
// BOTÃO VOLTAR AO TOPO
// ============================================
(function initBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');
    if (!backToTopBtn) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const scrollThreshold = 300; // Aparecer após 300px de scroll

    function toggleBackToTop() {
        if (window.scrollY > scrollThreshold) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    }

    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: prefersReducedMotion ? 'auto' : 'smooth'
        });
    });

    window.addEventListener('scroll', toggleBackToTop);
    toggleBackToTop(); // Verificar estado inicial
})();

// ============================================
// INDICADOR DE PROGRESSO DE SCROLL
// ============================================
(function initScrollProgress() {
    const scrollProgress = document.querySelector('.scroll-progress');
    if (!scrollProgress) return;

    function updateScrollProgress() {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const scrollableHeight = documentHeight - windowHeight;
        const progress = (scrollTop / scrollableHeight) * 100;
        
        scrollProgress.style.width = `${Math.min(100, Math.max(0, progress))}%`;
        scrollProgress.setAttribute('aria-valuenow', Math.round(progress));
    }

    window.addEventListener('scroll', updateScrollProgress);
    updateScrollProgress(); // Atualizar estado inicial
})();

// ============================================
// ANIMAÇÕES DE ENTRADA (FADE-IN)
// ============================================
(function initFadeInAnimations() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
        // Se o usuário prefere movimento reduzido, mostrar tudo imediatamente
        document.querySelectorAll('.fade-in-section').forEach(section => {
            section.classList.add('is-visible');
        });
        return;
    }

    const fadeInSections = document.querySelectorAll('.fade-in-section');
    if (fadeInSections.length === 0) return;

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeInSections.forEach(section => {
        observer.observe(section);
    });
})();

// ============================================
// MENU ATIVO - DESTACAR SEÇÃO ATUAL
// ============================================
(function initActiveMenu() {
    const navLinks = document.querySelectorAll('.nav-bar a[href^="#"]');
    const sections = document.querySelectorAll('section[id]');
    
    if (navLinks.length === 0 || sections.length === 0) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function setActiveLink() {
        let current = '';
        const scrollPosition = window.scrollY + 150; // Offset para considerar o header

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    // Usar throttle para melhor performance
    let ticking = false;
    function onScroll() {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                setActiveLink();
                ticking = false;
            });
            ticking = true;
        }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    setActiveLink(); // Definir estado inicial
})();
