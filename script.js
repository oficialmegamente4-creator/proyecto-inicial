// MENU RESPONSIVO: controla la apertura/cierre del menu en celulares.
const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-menu a");

navToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("is-open");

    navToggle.classList.toggle("is-open", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.forEach((link) => {
    link.addEventListener("click", () => {
        navMenu.classList.remove("is-open");
        navToggle.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
    });
});

// ANIMACIONES AL HACER SCROLL: agrega la clase .is-visible cuando una seccion entra en pantalla.
const revealElements = document.querySelectorAll(".reveal");

const revealOnScroll = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                revealOnScroll.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.15,
    }
);

revealElements.forEach((element) => revealOnScroll.observe(element));

// FORMULARIO: el envío lo gestiona FormSubmit desde el atributo action del formulario.
// La primera vez, FormSubmit pedirá confirmar el correo oficial para activar la receptíon.
