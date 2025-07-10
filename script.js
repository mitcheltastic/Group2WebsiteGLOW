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
document.addEventListener('DOMContentLoaded', function () {
  const navToggle = document.getElementById('mobile-nav-toggle');  // the hamburger button
  const navLinks = document.querySelector('.nav-links');           // the menu list

  // When the hamburger is clicked, toggle the menu
  navToggle.addEventListener('click', function () {
    const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
    
    // Show or hide menu
    navToggle.setAttribute('aria-expanded', !isExpanded);
    navLinks.setAttribute('data-visible', !isExpanded);

    // ✅ Add this: toggle CSS classes for animation
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('open');
  });

  // When any link is clicked, close the mobile menu (only on mobile)
  const links = document.querySelectorAll('.nav-link'); // selects all nav links

  links.forEach(link => {
    link.addEventListener('click', function () {
      if (window.innerWidth < 768) {
        navToggle.setAttribute('aria-expanded', 'false');
        navLinks.setAttribute('data-visible', 'false');

        // ✅ Also remove classes on close
        navToggle.classList.remove('active');
        navLinks.classList.remove('open');
      }
    });
  });
});


document.addEventListener('DOMContentLoaded', () => {

  // This is a modern way to detect when an element enters the screen
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      // If the element is on screen
      if (entry.isIntersecting) {
        // Add the .is-visible class to trigger the animation
        entry.target.classList.add('is-visible');
      }
    });
  });

  // Find the element we want to animate
  const animatedSection = document.querySelector('.fade-in-section');

  // If the element exists on the page, tell the observer to watch it
  if (animatedSection) {
    observer.observe(animatedSection);
  }

});

document.addEventListener('DOMContentLoaded', () => {

    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            // Prevent the form from submitting the default way
            event.preventDefault();

            // Add the 'loading' class and disable the button
            submitBtn.classList.add('loading');
            submitBtn.disabled = true;

            // Simulate a 2-second delay for sending the message
            setTimeout(() => {
                // Remove the 'loading' class and re-enable the button
                submitBtn.classList.remove('loading');
                submitBtn.disabled = false;

                // Show a success message
                formStatus.classList.add('success');
                formStatus.textContent = 'Your message has been sent successfully!';

                // Optional: clear the form fields
                contactForm.reset();

                // Optional: hide the success message after a few seconds
                setTimeout(() => {
                    formStatus.classList.remove('success');
                    formStatus.textContent = '';
                }, 5000);

            }, 2000);
        });
    }
    
    // ... your other JavaScript code can go here ...

});