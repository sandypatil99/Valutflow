// ========== Quik Heal App ========== 

document.addEventListener('DOMContentLoaded', function() {
    console.log('✓ Quik Heal app initialized');
    
    initializeBackToTopButton();
    initializeFormValidation();
    initializeNavbarScroll();
    initializeSmoothScroll();
});

// ========== Back to Top Button ==========
function initializeBackToTopButton() {
    const backToTopBtn = document.getElementById('backToTop');
    if (!backToTopBtn) return;

    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    backToTopBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ========== Navbar Scroll Effect ==========
function initializeNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// ========== Form Validation ==========
function initializeFormValidation() {
    const forms = document.querySelectorAll('.needs-validation');
    
    if (forms.length === 0) return;

    forms.forEach(form => {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            
            if (!form.checkValidity()) {
                event.stopPropagation();
                form.classList.add('was-validated');
                return false;
            }
            
            // Form is valid
            form.classList.add('was-validated');
            
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerText;
            
            submitBtn.innerText = '✓ Success!';
            submitBtn.disabled = true;
            submitBtn.classList.remove('btn-primary');
            submitBtn.classList.add('btn-success');
            
            // Reset form after 2 seconds
            setTimeout(() => {
                submitBtn.innerText = originalText;
                submitBtn.disabled = false;
                submitBtn.classList.add('btn-primary');
                submitBtn.classList.remove('btn-success');
                form.reset();
                form.classList.remove('was-validated');
            }, 2000);
            
            return false;
        }, false);

        // Real-time validation
        const inputs = form.querySelectorAll('.form-control');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateInput(this);
            });

            input.addEventListener('input', function() {
                if (form.classList.contains('was-validated')) {
                    validateInput(this);
                }
            });
        });
    });
}

// Validate individual input
function validateInput(input) {
    const value = input.value.trim();
    let isValid = true;

    // Required field check
    if (input.hasAttribute('required') && value === '') {
        isValid = false;
    }

    // Email validation
    if (input.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        isValid = emailRegex.test(value);
    }

    // Phone validation
    if (input.type === 'tel' && value) {
        const phoneRegex = /^[0-9\-\+\s\(\)]{10,}$/;
        isValid = phoneRegex.test(value);
    }

    // Update visual feedback
    if (isValid && value) {
        input.classList.remove('is-invalid');
        input.classList.add('is-valid');
    } else if (!isValid && value) {
        input.classList.add('is-invalid');
        input.classList.remove('is-valid');
    } else {
        input.classList.remove('is-invalid', 'is-valid');
    }

    return isValid;
}

// ========== Smooth Scroll for Navigation Links ==========
function initializeSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip modal triggers
            if (this.hasAttribute('data-bs-toggle')) {
                return;
            }

            if (href !== '#' && href !== '') {
                e.preventDefault();
                const targetElement = document.querySelector(href);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });

                    // Close mobile menu
                    const navbarCollapse = document.querySelector('.navbar-collapse');
                    if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                        const navbarToggler = document.querySelector('.navbar-toggler');
                        if (navbarToggler) navbarToggler.click();
                    }
                }
            }
        });
    });
}

// ========== Console Message ==========
console.log('%c🚀 Quik Heal - Modern Analytics Platform', 'font-size: 16px; color: #667eea; font-weight: bold;');
