document.addEventListener('DOMContentLoaded', function() {

    console.log("Alcami Full Page Script Loaded.");

    // --- Mobile Menu Toggle ---
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navWrapper = document.querySelector('.nav-wrapper');
    const body = document.body;

    if (menuToggle && navWrapper) {
        menuToggle.addEventListener('click', () => {
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', !isExpanded);
            body.classList.toggle('mobile-menu-open'); // Toggle class on body

            // Optional: Trap focus (basic implementation)
            // Consider a more robust library for full accessibility
            if (body.classList.contains('mobile-menu-open')) {
                // Focus first focusable element in nav
                const firstFocusable = navWrapper.querySelector('a, button');
                 if(firstFocusable) firstFocusable.focus();
            }
        });

        // Close menu if clicking outside of it on wider screens where overlay isn't full
        document.addEventListener('click', (event) => {
            const isClickInsideNav = navWrapper.contains(event.target);
            const isClickOnToggle = menuToggle.contains(event.target);

            if (!isClickInsideNav && !isClickOnToggle && body.classList.contains('mobile-menu-open')) {
                menuToggle.setAttribute('aria-expanded', 'false');
                body.classList.remove('mobile-menu-open');
            }
        });

         // Close menu on Escape key press
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && body.classList.contains('mobile-menu-open')) {
                menuToggle.setAttribute('aria-expanded', 'false');
                body.classList.remove('mobile-menu-open');
                menuToggle.focus(); // Return focus to the toggle button
            }
        });
    }

    // --- Product Tabs Functionality ---
    const tabLinks = document.querySelectorAll('.tab-link');
    const tabContents = document.querySelectorAll('.tab-content');

    if (tabLinks.length > 0 && tabContents.length > 0) {
        tabLinks.forEach(tab => {
            tab.addEventListener('click', () => {
                const targetTab = tab.getAttribute('data-tab');

                // Update active tab link
                tabLinks.forEach(link => link.classList.remove('active'));
                tab.classList.add('active');

                // Update active tab content
                tabContents.forEach(content => {
                    if (content.id === targetTab) {
                        content.classList.add('active');
                    } else {
                        content.classList.remove('active');
                    }
                });
            });
        });
    }

    // --- FAQ Accordion Functionality ---
    const faqItems = document.querySelectorAll('.faq-item');
    const faqPlusIconSrc = 'images/faq-plus.svg'; // Store paths
    const faqMinusIconSrc = 'images/faq-minus.svg'; // Assumes you have a minus icon

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const icon = item.querySelector('.faq-icon');

        if (question && answer && icon) { // Check if elements exist
            question.addEventListener('click', () => {
                const isOpen = item.classList.contains('active');

                // Optional: Close other open FAQs for single-open accordion behavior
                // faqItems.forEach(otherItem => {
                //     if (otherItem !== item && otherItem.classList.contains('active')) {
                //         otherItem.classList.remove('active');
                //         otherItem.querySelector('.faq-answer').style.maxHeight = null;
                //         otherItem.querySelector('.faq-answer').style.opacity = '0';
                //         const otherIcon = otherItem.querySelector('.faq-icon');
                //         if (otherIcon) otherIcon.src = faqPlusIconSrc;
                //     }
                // });

                // Toggle current item
                item.classList.toggle('active');

                if (item.classList.contains('active')) {
                    // Set max-height to scrollHeight for smooth transition
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                    answer.style.opacity = '1'; // Fade in
                    icon.src = faqMinusIconSrc; // Change to minus icon
                    // icon.style.transform = 'rotate(135deg)'; // Use if only using plus icon
                } else {
                    answer.style.maxHeight = null; // Collapse
                     answer.style.opacity = '0'; // Fade out
                    icon.src = faqPlusIconSrc; // Change back to plus icon
                    // icon.style.transform = 'rotate(0deg)'; // Use if only using plus icon
                }
            });
        }
    });

    // --- Simple Product Image Switcher (Example) ---
    const productThumbnails = document.querySelectorAll('.product-thumbnails img');
    const mainProductImage = document.getElementById('mainProductImage');

    if (productThumbnails.length > 0 && mainProductImage) {
        productThumbnails.forEach(thumbnail => {
            thumbnail.addEventListener('click', () => {
                // Update main image source
                mainProductImage.src = thumbnail.src.replace('-thumbnail', '-white-pouch'); // Adjust logic based on your filenames
                mainProductImage.alt = thumbnail.alt; // Update alt text

                // Update selected thumbnail style
                productThumbnails.forEach(t => t.classList.remove('selected'));
                thumbnail.classList.add('selected');
            });
             // Add keyboard accessibility
             thumbnail.addEventListener('keydown', (event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault(); // Prevent default spacebar scroll
                    thumbnail.click(); // Trigger click event
                }
            });
            thumbnail.setAttribute('tabindex', '0'); // Make thumbnails focusable
        });
    }


    // --- Footer Current Year ---
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // --- Placeholder for other JS ---
    // Add event listener for search icon click
    // Add event listeners for add-to-cart buttons (requires cart logic)
    // Add form validation for newsletter (more robust validation needed)

}); // End DOMContentLoaded