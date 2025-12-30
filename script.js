        // Actors data
        const actors = [
            { name: "Ajay Devgon", file: "../voices/ajay devgon.mp3" },
            { name: "Shah Rukh Khan", file: "../voices/SRK.mp3" },
            { name: "Amrish puri", file: "amrish puri.mp3" },
            { name: "gaur gopal das", file: "gaur gopal das.mp3" },
            { name: "Nana patekar", file: "nana patekhar.mp3" },
            { name: "Ranbir Kapoor", file: "ranbir.mp3" },
            { name: "Sunny deol", file: "sunny deol.mp3" },
            { name: "Hrithik Roshan", file: "hrithik.mp3" },
            { name: "Aamir Khan", file: "aamir.mp3" },
            { name: "Rajkummar Rao", file: "rajkummar.mp3" }
        ];

        const AUDIO_BASE_URL = "https://ansh3721.github.io/harsh_portfolio/voices/";

        // DOM Elements
        const header = document.getElementById('header');
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const mobileMenu = document.getElementById('mobileMenu');
        const mimicryToggle = document.getElementById('mimicryToggle');
        const mimicryGrid = document.getElementById('mimicryGrid');
        const contactForm = document.getElementById('contactForm');
        const yearSpan = document.getElementById('year');

        // Set current year
        yearSpan.textContent = new Date().getFullYear();

        // Header scroll effect
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });

        // Mobile menu toggle
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking a link
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
            });
        });

        // Mimicry toggle
        let mimicryExpanded = false;
        mimicryToggle.addEventListener('click', () => {
            mimicryExpanded = !mimicryExpanded;
            mimicryGrid.classList.toggle('active', mimicryExpanded);
            mimicryToggle.innerHTML = mimicryExpanded 
                ? `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 0.5rem;"><path d="m18 15-6-6-6 6"/></svg> Hide Mimicry`
                : `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 0.5rem;"><circle cx="12" cy="18" r="4"/><path d="M12 2v10"/><path d="m4.93 10.93 1.41 1.41"/><path d="M2 18h2"/><path d="M20 18h2"/><path d="m19.07 10.93-1.41 1.41"/><path d="M22 22H2"/><path d="m16 6-4 4-4-4"/></svg> Show Mimicry`;
        });

        // Generate actor cards
        let currentlyPlaying = null;
        let currentAudio = null;

        actors.forEach((actor, index) => {
            const card = document.createElement('div');
            card.className = 'actor-card';
            card.innerHTML = `
                <h3 class="font-display">${actor.name}</h3>
                <button class="play-btn" data-index="${index}">
                    <svg class="play-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><polygon points="6 3 20 12 6 21 6 3"/></svg>
                    <svg class="pause-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" style="display: none;"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
                </button>
                <audio src="${AUDIO_BASE_URL}${actor.file}" preload="none"></audio>
            `;
            mimicryGrid.appendChild(card);
        });

        // Play/Pause functionality
        mimicryGrid.addEventListener('click', (e) => {
            const playBtn = e.target.closest('.play-btn');
            if (!playBtn) return;

            const index = parseInt(playBtn.dataset.index);
            const card = playBtn.closest('.actor-card');
            const audio = card.querySelector('audio');
            const playIcon = playBtn.querySelector('.play-icon');
            const pauseIcon = playBtn.querySelector('.pause-icon');

            // If clicking the same button that's playing
            if (currentlyPlaying === index) {
                audio.pause();
                playBtn.classList.remove('playing');
                playIcon.style.display = 'block';
                pauseIcon.style.display = 'none';
                currentlyPlaying = null;
                currentAudio = null;
                return;
            }

            // Stop any currently playing audio
            if (currentAudio) {
                currentAudio.pause();
                currentAudio.currentTime = 0;
                const prevBtn = mimicryGrid.querySelectorAll('.play-btn')[currentlyPlaying];
                if (prevBtn) {
                    prevBtn.classList.remove('playing');
                    prevBtn.querySelector('.play-icon').style.display = 'block';
                    prevBtn.querySelector('.pause-icon').style.display = 'none';
                }
            }

            // Play new audio
            audio.play();
            playBtn.classList.add('playing');
            playIcon.style.display = 'none';
            pauseIcon.style.display = 'block';
            currentlyPlaying = index;
            currentAudio = audio;

            // Reset when audio ends
            audio.onended = () => {
                playBtn.classList.remove('playing');
                playIcon.style.display = 'block';
                pauseIcon.style.display = 'none';
                currentlyPlaying = null;
                currentAudio = null;
            };
        });

        // Contact form submission
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        });

        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
