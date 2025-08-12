
document.addEventListener('DOMContentLoaded', () => {
    const menuIcon = document.getElementById('menu-icon');
    const navbar = document.querySelector('.navbar');
    
    menuIcon.addEventListener('click', () => {
        navbar.classList.toggle('active');
        menuIcon.classList.toggle('bx-x');
        menuIcon.classList.toggle('bx-menu');
    });


    document.querySelectorAll('.navbar a').forEach(link => {
        link.addEventListener('click', () => {
            navbar.classList.remove('active');
            menuIcon.classList.add('bx-menu');
            menuIcon.classList.remove('bx-x');
        });
    });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

const texts = [
    "Front-End Web Developer",
    "Hardware and Software Maintenance",
    "Video Editor"
];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingSpeed = 100;
const deletingSpeed = 50;
const delayBetween = 2000;

function type() {
    const multipleText = document.querySelector('.multiple-text');
    const currentText = texts[textIndex];

    if (!isDeleting) {
        multipleText.textContent = currentText.substring(0, charIndex);
        charIndex++;
        if (charIndex > currentText.length) {
            isDeleting = true;
            setTimeout(type, delayBetween);
        } else {
            setTimeout(type, typingSpeed);
        }
    } else {
        multipleText.textContent = currentText.substring(0, charIndex);
        charIndex--;
        if (charIndex < 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            setTimeout(type, 500);
        } else {
            setTimeout(type, deletingSpeed);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(type, 1000);
});

document.querySelector('.contact form').addEventListener('submit', function (e) {
    e.preventDefault();
    
    const form = this;
    const fullName = form.querySelector('input[placeholder="Full Name"]').value.trim();
    const email = form.querySelector('input[placeholder="Email Address"]').value.trim();
    const phone = form.querySelector('input[placeholder="Phone Number"]').value.trim();
    const subject = form.querySelector('input[placeholder="Email Subject"]').value.trim();
    const message = form.querySelector('textarea[placeholder="Your Message"]').value.trim();
    
    let errors = [];
    
    if (fullName.length < 2) {
        errors.push("Full Name must be at least 2 characters long.");
    }
    

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        errors.push("Please enter a valid email address.");
    }
    
    const phoneRegex = /^\+?\d{7,15}$/;
    if (phone && !phoneRegex.test(phone)) {
        errors.push("Please enter a valid phone number (7-15 digits, optional + prefix).");
    }
    if (subject.length < 3) {
        errors.push("Email Subject must be at least 3 characters long.");
    }

    if (message.length < 10) {
        errors.push("Message must be at least 10 characters long.");
    }
    
    const errorContainer = document.createElement('div');
    errorContainer.className = 'error-messages';
    errorContainer.style.color = 'red';
    errorContainer.style.marginBottom = '1rem';
    
    const existingErrors = form.querySelector('.error-messages');
    if (existingErrors) {
        existingErrors.remove();
    }
    
    if (errors.length > 0) {
        errorContainer.innerHTML = errors.join('<br>');
        form.prepend(errorContainer);
    } else {
        alert('Form submitted successfully! (This is a simulation)');
        form.reset();
        
        window.location.href = 'mailto:yabumiki202@gmail.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(message);
    }
});

document.querySelectorAll('.contact input, .contact textarea').forEach(input => {
    input.addEventListener('input', function () {
        if (this.value.trim() !== '') {
            this.style.borderColor = '#3a86ff';
        } else {
            this.style.borderColor = '#ccc';
        }
    });
});