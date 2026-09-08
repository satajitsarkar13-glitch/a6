/* ==========================================================================
   SABLE TOTE CREST - INTERACTIVE JAVASCRIPT CONTROLLER
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Sticky Navigation Blur Effect
    const header = document.querySelector('.site-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            header?.classList.add('scrolled');
        } else {
            header?.classList.remove('scrolled');
        }
    });

    // 2. FAQ Accordion Controller
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const headerBtn = item.querySelector('.faq-header');
        headerBtn?.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
                const body = otherItem.querySelector('.faq-body');
                if (body) body.style.maxHeight = null;
            });

            if (!isActive) {
                item.classList.add('active');
                const body = item.querySelector('.faq-body');
                if (body) body.style.maxHeight = body.scrollHeight + 'px';
            }
        });
    });

    // Open first FAQ by default
    if (faqItems.length > 0) {
        faqItems[0].classList.add('active');
        const firstBody = faqItems[0].querySelector('.faq-body');
        if (firstBody) firstBody.style.maxHeight = firstBody.scrollHeight + 'px';
    }

    // 3. Interactive Bespoke Tote Configurator
    const configLeatherBtns = document.querySelectorAll('[data-config-leather]');
    const configHardwareBtns = document.querySelectorAll('[data-config-hardware]');
    const configSizeBtns = document.querySelectorAll('[data-config-size]');
    const summaryLeather = document.getElementById('summary-leather');
    const summaryHardware = document.getElementById('summary-hardware');
    const summarySize = document.getElementById('summary-size');
    const summaryPrice = document.getElementById('summary-price');
    const previewImg = document.getElementById('config-preview-image');

    const prices = {
        size: { 'Grande Atelier Tote': 1850, 'Moyenne Structured Tote': 1550, 'Petite Shopper Tote': 1250 },
        hardware: { '24k Heirloom Gold': 150, 'Burnished Palladium': 100, 'Antiqued Saddle Bronze': 0 }
    };

    let currentConfig = {
        leather: 'Saddle Cognac Full-Grain',
        hardware: '24k Heirloom Gold',
        size: 'Grande Atelier Tote'
    };

    function updateConfigPrice() {
        const base = prices.size[currentConfig.size] || 1850;
        const hw = prices.hardware[currentConfig.hardware] || 0;
        const total = base + hw;
        if (summaryPrice) summaryPrice.textContent = '$' + total.toLocaleString();
    }

    configLeatherBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            configLeatherBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentConfig.leather = btn.dataset.configLeather;
            if (summaryLeather) summaryLeather.textContent = currentConfig.leather;
            
            // Adjust preview image if dataset contains image
            if (btn.dataset.imgSrc && previewImg) {
                previewImg.style.opacity = '0.3';
                setTimeout(() => {
                    previewImg.src = btn.dataset.imgSrc;
                    previewImg.style.opacity = '1';
                }, 200);
            }
        });
    });

    configHardwareBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            configHardwareBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentConfig.hardware = btn.dataset.configHardware;
            if (summaryHardware) summaryHardware.textContent = currentConfig.hardware;
            updateConfigPrice();
        });
    });

    configSizeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            configSizeBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentConfig.size = btn.dataset.configSize;
            if (summarySize) summarySize.textContent = currentConfig.size;
            updateConfigPrice();
        });
    });

    // 4. Contact & Newsletter Form Handlers
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button[type="submit"]');
            if (btn) {
                const originalText = btn.innerHTML;
                btn.innerHTML = 'Submitting...';
                btn.disabled = true;
                setTimeout(() => {
                    btn.innerHTML = 'Thank You! Dispatch Received.';
                    form.reset();
                    setTimeout(() => {
                        btn.innerHTML = originalText;
                        btn.disabled = false;
                    }, 4000);
                }, 800);
            }
        });
    });
});
