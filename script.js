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

    const tituloProgramador = document.querySelector('.proyectos-programador h3');
    if (tituloProgramador) {
        tituloProgramador.style.cursor = 'pointer';
        tituloProgramador.classList.add('toggle-proyectos');
        
        const listaProyectos = document.querySelector('.proyectos-programador .lista-proyectos');
        if (listaProyectos) {
          listaProyectos.style.opacity = '0';
          listaProyectos.style.maxHeight = '0';
          listaProyectos.style.display = 'none';

            tituloProgramador.addEventListener('click', function() {
                const isHidden = listaProyectos.style.display === 'none';
                
                if (isHidden) {
                    listaProyectos.style.display = 'block';
                    setTimeout(() => {
                        listaProyectos.style.opacity = '1';
                        listaProyectos.style.maxHeight = '1000px';
                    }, 10);
                } else {
                    listaProyectos.style.opacity = '0';
                    listaProyectos.style.maxHeight = '0';
                    setTimeout(() => {
                        listaProyectos.style.display = 'none';
                    }, 300);
                }
            });
        }
    }

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

function validateField(field) {
    const errorElement = document.getElementById(`${field.id}-error`);
    
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
