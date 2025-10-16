document.addEventListener('DOMContentLoaded', () => {
  const modelo = document.getElementById('Modelo');
  const toggle = document.getElementById('toggle-rotate');
  const hdri = document.getElementById('hdri');
  const personaje = JSON.parse(localStorage.getItem('personaje'));

  if (!personaje) return;

  hdri.addEventListener('change', function() {
    if (this.value === "null") {
      modelo.removeAttribute("skybox-image");
      modelo.style.backgroundColor = "#3C3836";
    } else {
      modelo.setAttribute("skybox-image", this.value);
      modelo.setAttribute("environment-image", this.value);
    }
  });

  if (toggle) {
    toggle.addEventListener('click', () => {
      const isRotating = modelo.hasAttribute('auto-rotate');
      if (isRotating) {
        modelo.removeAttribute('auto-rotate');
        toggle.setAttribute('aria-pressed', 'true');
        toggle.textContent = 'Activar rotación';
      } else {
        modelo.setAttribute('auto-rotate', '');
        toggle.setAttribute('aria-pressed', 'false');
        toggle.textContent = 'Desactivar rotación';
      }
    });
  }

  modelo.src = personaje.modelos[0];
});
