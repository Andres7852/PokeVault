document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');
    if (!form) return;

    const nombre = document.getElementById('nombre');
    const email = document.getElementById('email');
    const mensaje = document.getElementById('mensaje');

    const validateEmail = (str) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str);

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let valid = true;

        if (nombre.value.trim().length < 3) {
            nombre.classList.add('invalid');
            document.getElementById('error-nombre').classList.add('visible');
            valid = false;
        } else {
            nombre.classList.remove('invalid');
            document.getElementById('error-nombre').classList.remove('visible');
        }

        if (!validateEmail(email.value.trim())) {
            email.classList.add('invalid');
            document.getElementById('error-email').classList.add('visible');
            valid = false;
        } else {
            email.classList.remove('invalid');
            document.getElementById('error-email').classList.remove('visible');
        }

        if (mensaje.value.trim().length < 15) {
            mensaje.classList.add('invalid');
            document.getElementById('error-mensaje').classList.add('visible');
            valid = false;
        } else {
            mensaje.classList.remove('invalid');
            document.getElementById('error-mensaje').classList.remove('visible');
        }

        if (valid) {
            alert('¡Solicitud de encargo registrada exitosamente!');
            form.reset();
        }
    });
});