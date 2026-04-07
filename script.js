// ========== MOBILE HAMBURGER MENU ==========
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// ========== TESTIMONIAL SLIDER ==========
const testimonials = document.querySelectorAll('.testimonial');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
let currentSlide = 0;

function showSlide(index) {
    testimonials.forEach((slide, i) => {
        slide.classList.remove('active');
        if (i === index) slide.classList.add('active');
    });
}

if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + testimonials.length) % testimonials.length;
        showSlide(currentSlide);
    });
    nextBtn.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % testimonials.length;
        showSlide(currentSlide);
    });
}

// ========== FAQ TOGGLE (INTERACTIVE) ==========
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
        item.classList.toggle('active');
        // Change icon from plus to minus
        const icon = question.querySelector('.faq-toggle i');
        if (item.classList.contains('active')) {
            icon.classList.remove('fa-plus');
            icon.classList.add('fa-minus');
        } else {
            icon.classList.remove('fa-minus');
            icon.classList.add('fa-plus');
        }
    });
});

// ========== CONTACT FORM SUBMISSION (simulated) ==========
const form = document.getElementById('admissionForm');
const statusMsg = document.getElementById('formStatus');

if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value.trim();
        if (name.length < 2) {
            statusMsg.innerHTML = '⚠️ Please enter a valid name.';
            statusMsg.style.color = '#c0392b';
            return;
        }
        statusMsg.innerHTML = '✅ Request sent! Our team will contact you within 24 hours.';
        statusMsg.style.color = '#0b3b2f';
        form.reset();
        setTimeout(() => { statusMsg.innerHTML = ''; }, 5000);
    });
}

// ========== SMOOTH SCROLLING FOR NAV LINKS ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === "#" || targetId === "") return;
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            e.preventDefault();
            targetElement.scrollIntoView({ behavior: 'smooth' });
            if (navLinks.classList.contains('active')) navLinks.classList.remove('active');
        }
    });
});

// ========== FEE PLAN SELECTION ==========
function selectPlan(planName, amount) {
    // Store selected plan in localStorage
    localStorage.setItem('selectedPlan', planName);
    localStorage.setItem('selectedAmount', amount);
    
    // Show confirmation message
    const confirmation = confirm(
        `📚 Al-Zainab Quran Academy\n\n` +
        `You selected: ${planName}\n` +
        `Monthly Fee: $${amount}\n\n` +
        `Click OK to proceed with registration.\n` +
        `We'll contact you within 24 hours.`
    );
    
    if (confirmation) {
        // Scroll to contact form
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
        
        // Auto-fill course selection if possible
        const courseSelect = document.getElementById('course');
        if (courseSelect) {
            courseSelect.value = planName;
        }
        
        // Optional: Send data to Google Analytics or tracking
        console.log(`Plan Selected: ${planName} - $${amount}`);
        
        // Show success toast (optional)
        showToast(`✅ ${planName} selected! Please complete the form below.`);
    }
}

// Optional: Toast notification function
function showToast(message) {
    // Create toast element if it doesn't exist
    let toast = document.querySelector('.toast-notification');
    if (!toast) {
        toast = document.createElement('div');
        toast.className = 'toast-notification';
        document.body.appendChild(toast);
        
        // Add styles for toast
        toast.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: #0b3b2f;
            color: white;
            padding: 12px 24px;
            border-radius: 40px;
            font-size: 14px;
            z-index: 9999;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
            transition: opacity 0.3s ease;
            opacity: 0;
        `;
    }
    
    toast.textContent = message;
    toast.style.opacity = '1';
    
    setTimeout(() => {
        toast.style.opacity = '0';
    }, 3000);
}

// Auto-fill contact form if plan was selected from fee page
document.addEventListener('DOMContentLoaded', function() {
    const savedPlan = localStorage.getItem('selectedPlan');
    const courseSelect = document.getElementById('course');
    
    if (savedPlan && courseSelect && courseSelect.value === 'Select a course') {
        courseSelect.value = savedPlan;
        // Clear after using
        localStorage.removeItem('selectedPlan');
    }
});

// ========== BLOG FUNCTIONALITY ==========

// Blog posts data (simulated database)
const blogPosts = {
    1: {
        title: "10 Proven Tips to Improve Your Quran Recitation",
        date: "April 1, 2025",
        author: "Sr. Fatima Zehra",
        category: "Quran Learning Tips",
        content: `
            <div class="blog-post-detail">
                <h1>10 Proven Tips to Improve Your Quran Recitation</h1>
                <div class="post-meta">
                    <span><i class="fas fa-calendar-alt"></i> April 1, 2025</span>
                    <span><i class="fas fa-user"></i> By Sr. Fatima Zehra</span>
                    <span><i class="fas fa-tag"></i> Quran Learning Tips</span>
                </div>
                <img src="https://images.pexels.com/photos/3768146/pexels-photo-3768146.jpeg?w=800&h=450&fit=crop" alt="Quran Recitation">
                <p>Reciting the Quran beautifully is a goal for every Muslim. Here are 10 proven tips to enhance your recitation:</p>
                <h3>1. Start with Proper Intention (Niyyah)</h3>
                <p>Always begin with sincere intention to please Allah. This transforms your recitation into an act of worship.</p>
                <h3>2. Learn Tajweed Rules Gradually</h3>
                <p>Don't try to learn all rules at once. Start with the basics like Makharij (articulation points) and Sifaat (characteristics of letters).</p>
                <h3>3. Listen to Expert Reciters</h3>
                <p>Listen to renowned Qaris like Sheikh Abdul Basit, Mishary Rashid, or our teachers at Al-Zainab Academy.</p>
                <h3>4. Practice Daily, Even for 15 Minutes</h3>
                <p>Consistency is key. Short daily practice is better than long weekly sessions.</p>
                <h3>5. Record Yourself</h3>
                <p>Recording your recitation helps identify mistakes you might not notice while reciting.</p>
                <h3>6. Get Feedback from Qualified Teachers</h3>
                <p>Our teachers at Al-Zainab Academy provide personalized feedback to help you improve.</p>
                <h3>7. Understand What You Recite</h3>
                <p>Learning the meaning of verses enhances your connection and improves pronunciation.</p>
                <h3>8. Join a Quran Study Circle</h3>
                <p>Group learning provides motivation and accountability.</p>
                <h3>9. Use Technology Wisely</h3>
                <p>Apps like Quran Companion and Ayat can supplement your learning.</p>
                <h3>10. Make Dua for Success</h3>
                <p>Ask Allah to make the Quran easy for you and accept your efforts.</p>
                <p>Ready to improve your recitation? <a href="#contact">Contact us</a> for a free trial class!</p>
            </div>
        `
    },
    // Add more posts similarly (2-7)
};

// Function to open blog post
function openBlogPost(postId) {
    const post = blogPosts[postId];
    if (post) {
        const modal = document.getElementById('quickViewModal');
        const modalContent = document.getElementById('modalContent');
        modalContent.innerHTML = post.content;
        modal.style.display = 'block';
        
        // Add to localStorage for reading later
        localStorage.setItem('lastReadPost', postId);
    }
}

// Quick view function
function quickView(postId) {
    openBlogPost(postId);
}

// Category filtering
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const blogCards = document.querySelectorAll('.blog-card');
    let visibleCount = 6; // Initially show 6 posts
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    
    // Filter functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            
            blogCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
            
            // Reset visible count when filtering
            visibleCount = 6;
            updateVisiblePosts();
        });
    });
    
    // Load more functionality
    function updateVisiblePosts() {
        const visibleCards = Array.from(blogCards).filter(card => card.style.display !== 'none');
        visibleCards.forEach((card, index) => {
            if (index < visibleCount) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
        
        if (visibleCount >= visibleCards.length) {
            loadMoreBtn.style.display = 'none';
        } else {
            loadMoreBtn.style.display = 'inline-block';
        }
    }
    
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => {
            visibleCount += 3;
            updateVisiblePosts();
        });
    }
    
    // Modal close functionality
    const modal = document.getElementById('quickViewModal');
    const closeBtn = document.querySelector('.close-modal');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }
    
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = newsletterForm.querySelector('input').value;
            alert(`Thank you for subscribing! We'll send updates to ${email}`);
            newsletterForm.reset();
        });
    }
    
    // Initialize visible posts
    updateVisiblePosts();
});

// Search functionality (optional)
function searchBlog() {
    const searchTerm = document.getElementById('blogSearch').value.toLowerCase();
    const blogCards = document.querySelectorAll('.blog-card');
    
    blogCards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        const content = card.querySelector('p').textContent.toLowerCase();
        
        if (title.includes(searchTerm) || content.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Share blog post function
function sharePost(postId, platform) {
    const post = blogPosts[postId];
    const url = window.location.href;
    const text = `Check out this article: ${post.title}`;
    
    let shareUrl = '';
    switch(platform) {
        case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
            break;
        case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
            break;
        case 'whatsapp':
            shareUrl = `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`;
            break;
    }
    
    if (shareUrl) {
        window.open(shareUrl, '_blank', 'width=600,height=400');
    }
}

// Add this to your navigation menu update
// Add Blog link to navigation if it doesn't exist (for dynamic updates)
// ========== WEB3FORM HANDLING ==========
const web3Form = document.getElementById('web3Form');
const formStatus = document.getElementById('formStatus');
const submitBtn = document.querySelector('.submit-btn');

if (web3Form) {
    web3Form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Show loading state
        formStatus.className = 'form-status loading';
        formStatus.innerHTML = '<i class="fas fa-spinner"></i> Sending message...';
        formStatus.style.display = 'block';
        submitBtn.disabled = true;
        submitBtn.classList.add('disabled');
        
        // Get form data
        const formData = new FormData(web3Form);
        
        try {
            const response = await fetch(web3Form.action, {
                method: 'POST',
                body: formData
            });
            
            const result = await response.json();
            
            if (result.success) {
                // Success message
                formStatus.className = 'form-status success';
                formStatus.innerHTML = '<i class="fas fa-check-circle"></i> Thank you! We\'ll contact you soon.';
                web3Form.reset();
                
                // Auto-hide success message after 5 seconds
                setTimeout(() => {
                    formStatus.style.display = 'none';
                }, 5000);
            } else {
                // Error message
                formStatus.className = 'form-status error';
                formStatus.innerHTML = '<i class="fas fa-exclamation-circle"></i> Something went wrong. Please try again.';
            }
        } catch (error) {
            // Network error
            formStatus.className = 'form-status error';
            formStatus.innerHTML = '<i class="fas fa-exclamation-circle"></i> Network error. Please check your connection.';
        } finally {
            // Reset button state
            submitBtn.disabled = false;
            submitBtn.classList.remove('disabled');
            
            // Auto-hide error after 5 seconds
            setTimeout(() => {
                if (formStatus.className !== 'form-status success') {
                    formStatus.style.display = 'none';
                }
            }, 5000);
        }
    });
}
