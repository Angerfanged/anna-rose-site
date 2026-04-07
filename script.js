document.addEventListener('DOMContentLoaded', () => {
    // --- Intersection Observer for Scroll Reveals ---
    const revealOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, revealOptions);

    document.querySelectorAll('.reveal').forEach(element => {
        revealObserver.observe(element);
    });

    // --- Smooth scroll for nav links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // --- Subtle parallax effect for images on scroll ---
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const images = document.querySelectorAll('.image-wrapper img');
        
        images.forEach(img => {
            const speed = 0.05;
            const yPos = -(scrolled * speed);
            img.style.transform = `scale(1.1) translateY(${yPos}px)`;
        });
    });

    // --- Hero Carousel ---
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    let currentSlideIndex = 0;
    let slideInterval;

    function updateCarousel(index, isManual = false) {
        if (isManual) {
            clearInterval(slideInterval);
        }

        currentSlideIndex = index;

        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        if (slides[currentSlideIndex] && dots[currentSlideIndex]) {
            slides[currentSlideIndex].classList.add('active');
            dots[currentSlideIndex].classList.add('active');
        }
        
        if (isManual) {
            startSlideShow(); // Restart the slideshow after manual interaction
        }
    }

    function startSlideShow() {
        clearInterval(slideInterval); // Clear any existing interval
        slideInterval = setInterval(() => {
            const nextIndex = (currentSlideIndex + 1) % slides.length;
            updateCarousel(nextIndex);
        }, 5000);
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => updateCarousel(index, true));
    });

    // Initial start
    if (slides.length > 0) {
        startSlideShow();
    }

    // --- Image Loading Debugger ---
    // This will help diagnose if images aren't loading due to path issues.
    // It adds a red border to any broken local images and logs an error in the console.
    document.querySelectorAll('img[src^="./graphics/"]').forEach(img => {
        img.addEventListener('error', function(e) {
            const failedSrc = e.target.src;
            this.style.border = '3px solid red';
            this.style.filter = 'grayscale(80%)'; // Make it more obvious
            console.error(`[Image Load Error] Failed to load: ${failedSrc}`);
            console.log('%cDebug Steps:', 'font-weight: bold; color: #007bff;');
            console.log(`1. Verify that a folder named 'graphics' exists in the same directory as your 'index.html' file. The path is case-sensitive.`);
            console.log(`2. Check if the filename '${failedSrc.split('/').pop()}' is spelled correctly inside the 'graphics' folder and has a valid extension (.jpg, .png, etc.).`);
        });
    });
});