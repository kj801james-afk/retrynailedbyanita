// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}

// Navbar scroll effect
const navbar = document.getElementById('navbar');
if (navbar) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }
    });
}

// Gallery Filter Functionality
const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

if (filterButtons.length > 0 && galleryItems.length > 0) {
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            
            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    item.style.animation = 'fadeInUp 0.6s ease-out';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

// Booking Form Handling
const bookingForm = document.getElementById('bookingForm');
if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(bookingForm);
        const data = Object.fromEntries(formData);
        
        // Basic validation
        if (!data.name || !data.email || !data.phone || !data.service || !data.date || !data.time) {
            showMessage('Please fill in all required fields.', 'error');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            showMessage('Please enter a valid email address.', 'error');
            return;
        }
        
        // Date validation (must be future date)
        const selectedDate = new Date(data.date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (selectedDate < today) {
            showMessage('Please select a future date.', 'error');
            return;
        }
        
        // Show loading state
        const submitBtn = bookingForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Booking...';
        submitBtn.disabled = true;
        
        // Simulate booking process
        setTimeout(() => {
            showMessage('Appointment booked successfully! We will contact you soon to confirm.', 'success');
            bookingForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Contact Form Handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Basic validation
        if (!data.name || !data.email || !data.subject || !data.message) {
            showMessage('Please fill in all required fields.', 'error');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            showMessage('Please enter a valid email address.', 'error');
            return;
        }
        
        // Show loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Simulate sending process
        setTimeout(() => {
            showMessage('Message sent successfully! We will get back to you soon.', 'success');
            contactForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Message display function
function showMessage(message, type) {
    // Remove existing messages
    const existingMessages = document.querySelectorAll('.success, .error');
    existingMessages.forEach(msg => msg.remove());
    
    // Create new message element
    const messageDiv = document.createElement('div');
    messageDiv.className = type;
    messageDiv.textContent = message;
    
    // Insert message at the top of the form
    const form = document.querySelector('form');
    if (form) {
        form.insertBefore(messageDiv, form.firstChild);
        
        // Auto-remove message after 5 seconds
        setTimeout(() => {
            messageDiv.remove();
        }, 5000);
    }
}

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

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.work-item, .gallery-item, .service-item, .testimonial, .feature');
    animateElements.forEach(el => {
        observer.observe(el);
    });
});

// Gallery lightbox functionality (simple implementation)
const galleryImages = document.querySelectorAll('.gallery-item');
galleryImages.forEach(item => {
    item.addEventListener('click', () => {
        const overlay = item.querySelector('.gallery-overlay');
        if (overlay) {
            overlay.style.transform = 'translateY(0)';
        }
    });
});

// Service price calculator (if on services page)
function calculateTotalPrice() {
    const serviceSelect = document.getElementById('service');
    const addonCheckboxes = document.querySelectorAll('input[name="addons"]:checked');
    const nailArtSelect = document.getElementById('nail-art');
    
    if (!serviceSelect) return;
    
    let total = 0;
    
    // Base service price
    const serviceText = serviceSelect.options[serviceSelect.selectedIndex].text;
    const servicePrice = serviceText.match(/\$(\d+)/);
    if (servicePrice) {
        total += parseInt(servicePrice[1]);
    }
    
    // Add-on prices
    addonCheckboxes.forEach(checkbox => {
        const addonText = checkbox.nextElementSibling.textContent;
        const addonPrice = addonText.match(/\+(\$(\d+))/);
        if (addonPrice) {
            total += parseInt(addonPrice[2]);
        }
    });
    
    // Nail art price
    if (nailArtSelect && nailArtSelect.value) {
        const nailArtText = nailArtSelect.options[nailArtSelect.selectedIndex].text;
        const nailArtPrice = nailArtText.match(/\+(\$(\d+))/);
        if (nailArtPrice) {
            total += parseInt(nailArtPrice[2]);
        }
    }
    
    // Display total (you can add a total display element)
    const totalDisplay = document.getElementById('total-price');
    if (totalDisplay) {
        totalDisplay.textContent = `Total: $${total}`;
    }
}

// Add event listeners for price calculation
document.addEventListener('DOMContentLoaded', () => {
    const serviceSelect = document.getElementById('service');
    const addonCheckboxes = document.querySelectorAll('input[name="addons"]');
    const nailArtSelect = document.getElementById('nail-art');
    
    if (serviceSelect) {
        serviceSelect.addEventListener('change', calculateTotalPrice);
    }
    
    addonCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', calculateTotalPrice);
    });
    
    if (nailArtSelect) {
        nailArtSelect.addEventListener('change', calculateTotalPrice);
    }
});

// Form validation helpers
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[\+]?[1-9][\d]{0,15}$/;
    return re.test(phone.replace(/\s/g, ''));
}

// Add real-time validation
document.addEventListener('DOMContentLoaded', () => {
    const emailInputs = document.querySelectorAll('input[type="email"]');
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    
    emailInputs.forEach(input => {
        input.addEventListener('blur', () => {
            if (input.value && !validateEmail(input.value)) {
                input.style.borderColor = '#dc3545';
                showFieldError(input, 'Please enter a valid email address');
            } else {
                input.style.borderColor = '#ddd';
                removeFieldError(input);
            }
        });
    });
    
    phoneInputs.forEach(input => {
        input.addEventListener('blur', () => {
            if (input.value && !validatePhone(input.value)) {
                input.style.borderColor = '#dc3545';
                showFieldError(input, 'Please enter a valid phone number');
            } else {
                input.style.borderColor = '#ddd';
                removeFieldError(input);
            }
        });
    });
});

function showFieldError(input, message) {
    removeFieldError(input);
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;
    errorDiv.style.color = '#dc3545';
    errorDiv.style.fontSize = '0.875rem';
    errorDiv.style.marginTop = '0.25rem';
    input.parentNode.appendChild(errorDiv);
}

function removeFieldError(input) {
    const existingError = input.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
}

// Lazy loading for images (if you add real images later)
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', lazyLoadImages);

// Social media link handlers
document.addEventListener('DOMContentLoaded', () => {
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            // In a real implementation, these would link to actual social media profiles
            showMessage('Social media links would open in a new tab in a real implementation.', 'success');
        });
    });
});

// Map functionality (placeholder)
document.addEventListener('DOMContentLoaded', () => {
    const mapPlaceholder = document.querySelector('.map-placeholder');
    if (mapPlaceholder) {
        mapPlaceholder.addEventListener('click', () => {
            showMessage('This would open Google Maps with directions to our salon.', 'success');
        });
    }
});

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    // Close mobile menu with Escape key
    if (e.key === 'Escape') {
        const navMenu = document.getElementById('nav-menu');
        const hamburger = document.getElementById('hamburger');
        if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    }
});

// Service selection helper for booking form
document.addEventListener('DOMContentLoaded', () => {
    const serviceSelect = document.getElementById('service');
    if (serviceSelect) {
        serviceSelect.addEventListener('change', () => {
            const selectedService = serviceSelect.value;
            const nailArtSelect = document.getElementById('nail-art');
            
            // Enable/disable nail art based on service selection
            if (nailArtSelect) {
                if (selectedService && selectedService !== 'nail-removal') {
                    nailArtSelect.disabled = false;
                } else {
                    nailArtSelect.disabled = true;
                    nailArtSelect.value = '';
                }
            }
        });
    }
});

// Add smooth reveal animation for sections
function revealOnScroll() {
    const reveals = document.querySelectorAll('.hero, .about, .featured-work, .testimonials, .cta');
    
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('fade-in');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);

// Instagram-style Gallery Popup
class GalleryPopup {
    constructor() {
        this.modal = document.getElementById('gallery-modal');
        this.currentIndex = 0;
        this.images = [];
        this.filteredImages = [];
        this.currentCategory = 'all';
        this.startX = 0;
        this.startY = 0;
        this.isDragging = false;
        this.init();
    }

    init() {
        this.collectImages();
        this.bindEvents();
    }

    collectImages() {
        const galleryItems = document.querySelectorAll('.gallery-item');
        this.images = Array.from(galleryItems).map((item, index) => {
            const img = item.querySelector('img');
            const title = item.querySelector('.gallery-overlay h3')?.textContent || 'Nail Art';
            const description = item.querySelector('.gallery-overlay p')?.textContent || 'Beautiful nail design';
            const category = item.getAttribute('data-category');
            
            return {
                src: img.src,
                alt: img.alt,
                title: title,
                description: description,
                category: category,
                index: index
            };
        });
        this.updateFilteredImages();
    }

    updateFilteredImages() {
        if (this.currentCategory === 'all') {
            this.filteredImages = [...this.images];
        } else {
            this.filteredImages = this.images.filter(img => img.category === this.currentCategory);
        }
    }

    bindEvents() {
        // Gallery item clicks
        document.querySelectorAll('.gallery-item').forEach((item, index) => {
            item.addEventListener('click', () => {
                this.openModal(index);
            });
        });

        // Modal controls
        document.getElementById('close-btn').addEventListener('click', () => {
            this.closeModal();
        });

        document.getElementById('prev-btn').addEventListener('click', () => {
            this.previousImage();
        });

        document.getElementById('next-btn').addEventListener('click', () => {
            this.nextImage();
        });

        // Close modal when clicking outside
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.closeModal();
            }
        });

        // Touch/swipe support
        this.modal.addEventListener('touchstart', (e) => {
            this.startX = e.touches[0].clientX;
            this.startY = e.touches[0].clientY;
            this.isDragging = false;
        });

        this.modal.addEventListener('touchmove', (e) => {
            if (!this.startX || !this.startY) return;
            
            const currentX = e.touches[0].clientX;
            const currentY = e.touches[0].clientY;
            const diffX = Math.abs(this.startX - currentX);
            const diffY = Math.abs(this.startY - currentY);
            
            if (diffX > diffY && diffX > 10) {
                this.isDragging = true;
                e.preventDefault();
            }
        });

        this.modal.addEventListener('touchend', (e) => {
            if (!this.isDragging) return;
            
            const endX = e.changedTouches[0].clientX;
            const diffX = this.startX - endX;
            
            if (Math.abs(diffX) > 50) {
                if (diffX > 0) {
                    this.nextImage();
                } else {
                    this.previousImage();
                }
            }
            
            this.startX = 0;
            this.startY = 0;
            this.isDragging = false;
        });

        // Mouse drag support
        this.modal.addEventListener('mousedown', (e) => {
            this.startX = e.clientX;
            this.startY = e.clientY;
            this.isDragging = false;
        });

        this.modal.addEventListener('mousemove', (e) => {
            if (!this.startX || !this.startY) return;
            
            const currentX = e.clientX;
            const currentY = e.clientY;
            const diffX = Math.abs(this.startX - currentX);
            const diffY = Math.abs(this.startY - currentY);
            
            if (diffX > diffY && diffX > 10) {
                this.isDragging = true;
            }
        });

        this.modal.addEventListener('mouseup', (e) => {
            if (!this.isDragging) return;
            
            const endX = e.clientX;
            const diffX = this.startX - endX;
            
            if (Math.abs(diffX) > 50) {
                if (diffX > 0) {
                    this.nextImage();
                } else {
                    this.previousImage();
                }
            }
            
            this.startX = 0;
            this.startY = 0;
            this.isDragging = false;
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (this.modal.style.display === 'block') {
                if (e.key === 'Escape') {
                    this.closeModal();
                } else if (e.key === 'ArrowLeft') {
                    this.previousImage();
                } else if (e.key === 'ArrowRight') {
                    this.nextImage();
                }
            }
        });

        // Filter button changes
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.currentCategory = btn.getAttribute('data-filter');
                this.updateFilteredImages();
            });
        });
    }

    openModal(index) {
        // Find the correct index in filtered images
        const clickedItem = document.querySelectorAll('.gallery-item')[index];
        const category = clickedItem.getAttribute('data-category');
        
        // Update category filter if needed
        if (this.currentCategory !== category) {
            this.currentCategory = category;
            this.updateFilteredImages();
        }
        
        // Find the index in filtered images
        const filteredIndex = this.filteredImages.findIndex(img => img.index === index);
        this.currentIndex = filteredIndex >= 0 ? filteredIndex : 0;
        
        this.updateModal();
        this.modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    closeModal() {
        this.modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    previousImage() {
        this.currentIndex = (this.currentIndex - 1 + this.filteredImages.length) % this.filteredImages.length;
        this.updateModal();
    }

    nextImage() {
        this.currentIndex = (this.currentIndex + 1) % this.filteredImages.length;
        this.updateModal();
    }

    updateModal() {
        const currentImage = this.filteredImages[this.currentIndex];
        if (!currentImage) return;

        // Smooth image transition
        const modalImage = document.getElementById('modal-image');
        modalImage.style.opacity = '0';
        
        setTimeout(() => {
            modalImage.src = currentImage.src;
            modalImage.alt = currentImage.alt;
            modalImage.style.opacity = '1';
        }, 150);

        document.getElementById('modal-image-title').textContent = currentImage.title;
        document.getElementById('modal-image-desc').textContent = currentImage.description;
        document.getElementById('current-image').textContent = this.currentIndex + 1;
        document.getElementById('total-images').textContent = this.filteredImages.length;
        document.getElementById('modal-title').textContent = currentImage.category.charAt(0).toUpperCase() + currentImage.category.slice(1).replace('-', ' ');
        
        // Update thumbnails
        this.updateThumbnails();
    }

    updateThumbnails() {
        const thumbnailContainer = document.getElementById('thumbnail-preview');
        thumbnailContainer.innerHTML = '';
        
        this.filteredImages.forEach((image, index) => {
            const thumbnail = document.createElement('img');
            thumbnail.src = image.src;
            thumbnail.alt = image.title;
            thumbnail.className = `thumbnail ${index === this.currentIndex ? 'active' : ''}`;
            thumbnail.addEventListener('click', () => {
                this.currentIndex = index;
                this.updateModal();
            });
            thumbnailContainer.appendChild(thumbnail);
        });
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize gallery popup
    new GalleryPopup();
    console.log('nailedbyalita website loaded successfully!');
});
