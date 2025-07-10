// --- Fade-in Animation on Scroll ---
const sections = document.querySelectorAll('.fade-in-section');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
        }
    });
}, {
    threshold: 0.1 
});

sections.forEach(section => {
    observer.observe(section);
});

// --- Infinite Image Carousel ---
const track = document.querySelector('.carousel-track');
if (track) {
    const slides = Array.from(track.children);
    const slideWidth = slides[0].getBoundingClientRect().width;
    
    // Clone slides for infinite loop effect
    slides.forEach(slide => {
        const clone = slide.cloneNode(true);
        track.appendChild(clone);
    });

    let currentPosition = 0;
    // We use requestAnimationFrame for smoother animation than setInterval
    let animationFrameId;

    const moveCarousel = () => {
        currentPosition -= 1; // Speed of the scroll
        
        // If scrolled past the original set of slides, reset to the beginning
        if (Math.abs(currentPosition) >= (slideWidth * slides.length)) {
            currentPosition = 0;
        }
        track.style.transform = `translateX(${currentPosition}px)`;
        
        animationFrameId = requestAnimationFrame(moveCarousel);
    };
    
    // Start the animation
    moveCarousel();
}


// --- Miniquiz Logic ---
const quizForm = document.getElementById('quiz-form');
if (quizForm) {
    quizForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const correctAnswers = {
            q1: 'b',
            q2: 'c',
            q3: 'a'
        };
        
        let score = 0;
        const totalQuestions = Object.keys(correctAnswers).length;
        const resultDiv = document.getElementById('quiz-result');

        const formData = new FormData(quizForm);
        for (let [question, userAnswer] of formData.entries()) {
            if (userAnswer === correctAnswers[question]) {
                score++;
            }
        }
        
        resultDiv.textContent = `You scored ${score} out of ${totalQuestions}!`;
    });
}

// --- Contact Form Submission ---
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    const statusDiv = document.getElementById('form-status');
    const submitBtn = document.getElementById('submit-btn');

    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        const formData = new FormData(contactForm);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            message: formData.get('message')
        };
        
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
        statusDiv.style.display = 'none';

        try {
            const response = await fetch('https://glow-backend-psi.vercel.app/feedback', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                statusDiv.textContent = 'Thank you! Your message has been sent successfully.';
                statusDiv.className = 'success';
                statusDiv.style.display = 'block';
                contactForm.reset();
            } else {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Something went wrong on the server.');
            }

        } catch (error) {
            statusDiv.textContent = `An error occurred: ${error.message}`;
            statusDiv.className = 'error';
            statusDiv.style.display = 'block';
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send Message';
        }
    });
}

const navToggle = document.getElementById('mobile-nav-toggle');
const siteHeader = document.querySelector('.site-header');

// 2. Add an event listener to the button to listen for a 'click'.
navToggle.addEventListener('click', () => {
    // 3. When clicked, add or remove the '.nav-open' class on the header.
    // The CSS uses this class to show or hide the menu.
    siteHeader.classList.toggle('nav-open');

    // For accessibility, toggle the aria-expanded attribute.
    const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', !isExpanded);
});