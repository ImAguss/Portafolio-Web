document.addEventListener('DOMContentLoaded', function() {
    const backToTopButton = document.createElement('button');
    backToTopButton.id = 'back-to-top';
    backToTopButton.className = 'back-to-top';
    backToTopButton.textContent = '↑';
    backToTopButton.setAttribute('aria-label', 'Volver arriba');
    document.body.appendChild(backToTopButton);

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });

    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            validateForm();
        });

        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
        });
    }

    const toggleTestimoniosBtn = document.getElementById('toggle-testimonios');
    if (toggleTestimoniosBtn) {
        toggleTestimoniosBtn.addEventListener('click', function() {
            const testimonios = document.querySelectorAll('.testimonio');
            const isHidden = testimonios[0].style.display === 'none' || 
                            testimonios[0].style.display === '';
            
            testimonios.forEach((testimonio, index) => {
                if (index === 0) return; // El primero siempre visible
                
                if (isHidden) {
                    testimonio.style.display = 'block';
                    setTimeout(() => {
                        testimonio.style.opacity = '1';
                        testimonio.style.transform = 'translateY(0)';
                    }, 100 * index);
                } else {
                    testimonio.style.opacity = '0';
                    testimonio.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        testimonio.style.display = 'none';
                    }, 300);
                }
            });

            toggleTestimoniosBtn.textContent = isHidden ? 'Mostrar menos testimonios' : 'Mostrar más testimonios';
        });
    }

    // Expandir proyectos al hacer clic
    const proyectos = document.querySelectorAll('.proyecto-3d');
    proyectos.forEach(proyecto => {
        const toggleBtn = proyecto.querySelector('.toggle-detalles');
        const detalles = proyecto.querySelector('.proyecto-detalles');
        
        if (toggleBtn && detalles) {
            toggleBtn.addEventListener('click', function() {
                const isExpanded = detalles.style.display === 'block';
                
                if (isExpanded) {
                    detalles.style.maxHeight = '0';
                    detalles.style.opacity = '0';
                    setTimeout(() => {
                        detalles.style.display = 'none';
                    }, 300);
                    toggleBtn.textContent = '+';
                } else {
                    detalles.style.display = 'block';
                    setTimeout(() => {
                        detalles.style.maxHeight = '200px';
                        detalles.style.opacity = '1';
                    }, 10);
                    toggleBtn.textContent = '−';
                }
            });
        }
    });

    const footer = document.querySelector('footer');
    if (footer) {
        const fechaActual = new Date();
        const opciones = { year: 'numeric', month: 'long', day: 'numeric' };
        const fechaFormateada = fechaActual.toLocaleDateString('es-ES', opciones);
        
        const fechaElement = document.createElement('p');
        fechaElement.className = 'fecha-actual';
        fechaElement.textContent = `Última actualización: ${fechaFormateada}`;
        footer.appendChild(fechaElement);
    }
});

function validateForm() {
    const nombre = document.getElementById('nombre');
    const correo = document.getElementById('correo');
    const mensaje = document.getElementById('mensaje');
    
    let isValid = true;
    
    isValid = validateField(nombre) && isValid;
    isValid = validateField(correo) && isValid;
    isValid = validateField(mensaje) && isValid;
    
    if (isValid) {
        showFormSuccess();
    }
    
    return isValid;
}

// Función para validar un campo individual
function validateField(field) {
    const errorElement = document.getElementById(`${field.id}-error`);
    
    // Crear elemento de error si no existe
    if (!errorElement) {
        const errorSpan = document.createElement('span');
        errorSpan.id = `${field.id}-error`;
        errorSpan.className = 'error-message';
        field.parentNode.appendChild(errorSpan);
    }
    
    const currentErrorElement = document.getElementById(`${field.id}-error`);
    
    if (field.value.trim() === '') {
        currentErrorElement.textContent = 'Este campo es obligatorio';
        field.classList.add('error');
        return false;
    }
    
    if (field.type === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(field.value)) {
            currentErrorElement.textContent = 'Por favor, ingresa un email válido';
            field.classList.add('error');
            return false;
        }
    }
    
    currentErrorElement.textContent = '';
    field.classList.remove('error');
    return true;
}

function showFormSuccess() {
    const form = document.getElementById('contact-form');
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.textContent = '¡Mensaje enviado correctamente! Te contactaré pronto.';
    
    form.reset();
    
    form.parentNode.insertBefore(successMessage, form);
    
    setTimeout(() => {
        successMessage.remove();
    }, 5000);
}
