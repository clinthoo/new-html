const navLinks = document.querySelectorAll('nav a');
const sections = document.querySelectorAll('main section[id]');
const contactIcons = document.querySelectorAll('.contact-icon');

function updateActiveLink() {
    const currentPosition = window.scrollY + window.innerHeight / 2;

    sections.forEach(section => {
        const top = section.offsetTop;
        const bottom = top + section.offsetHeight;
        const link = document.querySelector(`nav a[href="#${section.id}"]`);

        if (!link) return;

        if (currentPosition >= top && currentPosition < bottom) {
            navLinks.forEach(item => item.classList.remove('active'));
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveLink);
window.addEventListener('load', updateActiveLink);

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.forEach(item => item.classList.remove('active'));
        link.classList.add('active');
    });
});

contactIcons.forEach(icon => {
    icon.addEventListener('click', event => {
        const rect = icon.getBoundingClientRect();
        const ripple = document.createElement('span');
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;

        ripple.className = 'ripple';
        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;

        icon.appendChild(ripple);
        setTimeout(() => ripple.remove(), 650);
    });
});
