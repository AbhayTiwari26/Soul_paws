// Modal functionality
const modals = {
    report: document.getElementById('reportModal'),
    volunteer: document.getElementById('volunteerModal'),
    adopt: document.getElementById('adoptModal')
};

// Open modal function
const openModal = (modalId) => {
    const modal = modals[modalId];
    if (modal) {
        modal.style.display = 'flex';
        setTimeout(() => modal.classList.add('active'), 10);
        document.body.style.overflow = 'hidden';
    }
};

// Close modal function
const closeModal = (modal) => {
    modal.classList.remove('active');
    setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }, 300);
};

// Close modal when clicking outside
Object.values(modals).forEach(modal => {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal(modal);
        }
    });
});

// Close modal when clicking the X button
document.querySelectorAll('.modal-close').forEach(closeBtn => {
    closeBtn.addEventListener('click', () => {
        closeModal(closeBtn.closest('.modal'));
    });
});

// Handle button clicks
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        // Add ripple effect
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        const ripple = document.createElement('div');
        ripple.classList.add('ripple');
        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        
        this.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
        
        // Handle specific button actions
        const text = this.textContent.trim();
        if (text === 'Report Now') {
            openModal('report');
        } else if (text === 'Join as Volunteer') {
            openModal('volunteer');
        } else if (text === 'Adopt Now') {
            openModal('adopt');
        }
    });
});

// Form submission handling
const handleFormSubmit = (formId, successMessage) => {
    const form = document.getElementById(formId);
    const success = form.nextElementSibling;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Simulate form submission
        const submitButton = form.querySelector('button[type="submit"]');
        submitButton.disabled = true;
        submitButton.textContent = 'Submitting...';
        
        setTimeout(() => {
            success.style.display = 'block';
            form.reset();
            submitButton.disabled = false;
            submitButton.textContent = 'Submit';
            
            // Close modal after 2 seconds
            setTimeout(() => {
                closeModal(form.closest('.modal'));
                success.style.display = 'none';
            }, 2000);
        }, 1500);
    });
};

// Initialize form handlers
handleFormSubmit('reportForm');
handleFormSubmit('volunteerForm');
handleFormSubmit('adoptForm');

// Smooth scroll for navigation links
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

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Initialize elements for scroll animations
document.querySelectorAll('.feature-card, .animal-card, .tip-card').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'all 0.6s ease-out';
    observer.observe(element);
});

// Add parallax effect to hero image
window.addEventListener('scroll', () => {
    const heroImage = document.querySelector('.hero-image');
    if (heroImage) {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.3;
        heroImage.style.transform = `translate3d(0px, ${rate}px, 0px)`;
    }
});

// Add hover effect to cards
document.querySelectorAll('.feature-card, .animal-card, .tip-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mobileMenu = document.querySelector('.mobile-menu');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    mobileMenuBtn.innerHTML = mobileMenu.classList.contains('active') ? 
        '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        mobileMenu.classList.remove('active');
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    }
});

// Close mobile menu when clicking a link
mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// Theme Management
const themeOptions = document.querySelectorAll('.theme-option');
const htmlElement = document.documentElement;

// Function to set theme
const setTheme = (theme) => {
    htmlElement.setAttribute('data-theme', theme);
    localStorage.setItem('selected-theme', theme);
    
    // Update active state in dropdown
    themeOptions.forEach(option => {
        option.classList.toggle('active', option.dataset.theme === theme);
    });
};

// Initialize theme from localStorage or default to 'light'
const savedTheme = localStorage.getItem('selected-theme') || 'light';
setTheme(savedTheme);

// Theme option click handlers
themeOptions.forEach(option => {
    option.addEventListener('click', () => {
        const newTheme = option.dataset.theme;
        setTheme(newTheme);
        
        // Show feedback toast
        const themeName = option.textContent.trim();
        showToast(`Theme changed to ${themeName}`);
    });
});

// Toast notification function
const showToast = (message) => {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
        <i class="fas fa-palette"></i>
        <span>${message}</span>
    `;
    
    const container = document.createElement('div');
    container.className = 'toast-container';
    container.appendChild(toast);
    document.body.appendChild(container);
    
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => container.remove(), 300);
    }, 3000);
};

// Feature Card Functionality
document.addEventListener('DOMContentLoaded', () => {
    const featureCards = document.querySelectorAll('.feature-card');
    let activeCard = null;

    // Handle Learn More button clicks
    featureCards.forEach(card => {
        const learnMoreBtn = card.querySelector('.feature-btn');
        const tryFeatureBtn = card.querySelector('.try-feature-btn');
        const details = card.querySelector('.feature-details');
        
        // Initial state
        details.style.transform = 'translateX(100%)';
        
        learnMoreBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleFeatureDetails(card);
        });

        tryFeatureBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            handleFeatureAction(card.dataset.feature);
        });
    });

    // Close feature details when clicking outside
    document.addEventListener('click', (e) => {
        if (activeCard && !activeCard.contains(e.target)) {
            closeFeatureDetails(activeCard);
        }
    });

    // Close feature details with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && activeCard) {
            closeFeatureDetails(activeCard);
        }
    });

    function toggleFeatureDetails(card) {
        if (activeCard && activeCard !== card) {
            closeFeatureDetails(activeCard);
        }
        
        if (card.classList.contains('active')) {
            closeFeatureDetails(card);
        } else {
            openFeatureDetails(card);
        }
    }

    function openFeatureDetails(card) {
        const details = card.querySelector('.feature-details');
        
        // First, position the details
        if (window.innerWidth <= 768) {
            // Mobile view - slide up from bottom
            details.style.transform = 'translate(-50%, 100%)';
        } else {
            // Desktop view - slide from right
            details.style.transform = 'translateX(100%)';
        }
        
        // Force a reflow
        details.offsetHeight;
        
        // Add active class and animate
        card.classList.add('active');
        activeCard = card;
        
        if (window.innerWidth <= 768) {
            details.style.transform = 'translate(-50%, -50%) scale(1)';
            addMobileOverlay();
        } else {
            details.style.transform = 'translateX(0)';
        }
        
        // Reset scroll position
        details.scrollTop = 0;
        
        // Disable body scroll on mobile
        if (window.innerWidth <= 768) {
            document.body.style.overflow = 'hidden';
        }
    }

    function closeFeatureDetails(card) {
        const details = card.querySelector('.feature-details');
        
        if (window.innerWidth <= 768) {
            details.style.transform = 'translate(-50%, 100%)';
            removeMobileOverlay();
        } else {
            details.style.transform = 'translateX(100%)';
        }
        
        card.classList.remove('active');
        activeCard = null;
        
        // Re-enable body scroll
        document.body.style.overflow = '';
    }

    function addMobileOverlay() {
        if (document.querySelector('.feature-overlay')) return;
        
        const overlay = document.createElement('div');
        overlay.className = 'feature-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            z-index: 999;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        document.body.appendChild(overlay);
        
        // Force a reflow
        overlay.offsetHeight;
        
        // Fade in
        overlay.style.opacity = '1';
        
        overlay.addEventListener('click', () => {
            if (activeCard) {
                closeFeatureDetails(activeCard);
            }
        });
    }

    function removeMobileOverlay() {
        const overlay = document.querySelector('.feature-overlay');
        if (overlay) {
            overlay.style.opacity = '0';
            setTimeout(() => overlay.remove(), 300);
        }
    }

    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            if (activeCard) {
                const details = activeCard.querySelector('.feature-details');
                if (window.innerWidth <= 768) {
                    details.style.transform = 'translate(-50%, -50%) scale(1)';
                } else {
                    details.style.transform = 'translateX(0)';
                }
            }
        }, 100);
    });

    function handleFeatureAction(feature) {
        switch (feature) {
            case 'ai-detection':
                showToast('Opening AI Detection...', 'info');
                // Add your AI detection logic here
                break;
            case 'geo-tag':
                if (navigator.geolocation) {
                    showToast('Accessing location...', 'info');
                    navigator.geolocation.getCurrentPosition(
                        position => {
                            showToast('Location detected!', 'success');
                            // Add your location handling logic here
                        },
                        error => {
                            showToast('Please enable location services', 'error');
                        }
                    );
                }
                break;
            case 'ngo-connect':
                showToast('Connecting to nearby NGOs...', 'info');
                // Add your NGO connection logic here
                break;
            case 'foster-adopt':
                showToast('Opening adoption process...', 'info');
                // Add your adoption process logic here
                break;
        }
    }

    // Toast notification function
    function showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `
            <i class="fas fa-${getToastIcon(type)}"></i>
            <span>${message}</span>
        `;
        
        const container = document.querySelector('.toast-container') || createToastContainer();
        container.appendChild(toast);
        
        // Animate in
        requestAnimationFrame(() => {
            toast.style.transform = 'translateX(0)';
            toast.style.opacity = '1';
        });
        
        setTimeout(() => {
            toast.style.transform = 'translateX(100%)';
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    function getToastIcon(type) {
        switch (type) {
            case 'success': return 'check-circle';
            case 'error': return 'exclamation-circle';
            case 'info': return 'info-circle';
            default: return 'info-circle';
        }
    }

    function createToastContainer() {
        const container = document.createElement('div');
        container.className = 'toast-container';
        document.body.appendChild(container);
        return container;
    }
});

// Geolocation and Map Functionality
let map, userMarker, reportMarkers = [], ngoMarkers = [];
let currentPosition = null;

// Initialize map
function initMap() {
    // Default center (will be updated with user's location)
    const defaultCenter = [0, 0];
    
    // Create the map instance
    map = L.map('map-placeholder').setView(defaultCenter, 13);
    
    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Get user's location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => {
                currentPosition = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                
                map.setView([currentPosition.lat, currentPosition.lng], 13);
                
                // Add user marker
                userMarker = L.circleMarker([currentPosition.lat, currentPosition.lng], {
                    radius: 8,
                    fillColor: '#4299E1',
                    color: '#FFFFFF',
                    weight: 2,
                    opacity: 1,
                    fillOpacity: 1
                }).addTo(map);

                // Load nearby reports and NGOs
                loadNearbyReports();
                findNearbyNGOs();
            },
            error => {
                showToast('Please enable location services to see nearby reports and NGOs', 'error');
            }
        );
    }

    // Add click listener for new reports
    map.on('click', event => {
        if (document.getElementById('reportModal').classList.contains('active')) {
            updateReportLocation(event.latlng);
        }
    });
}

// Load nearby reports
function loadNearbyReports() {
    // Simulated report data - replace with actual API call
    const sampleReports = [
        {
            id: 1,
            position: {
                lat: currentPosition.lat + 0.01,
                lng: currentPosition.lng + 0.01
            },
            type: 'urgent',
            title: 'Injured Dog',
            description: 'Medium-sized brown dog with injured paw'
        },
        {
            id: 2,
            position: {
                lat: currentPosition.lat - 0.01,
                lng: currentPosition.lng - 0.01
            },
            type: 'new',
            title: 'Stray Puppies',
            description: 'Three puppies found near the market'
        }
    ];

    // Clear existing markers
    reportMarkers.forEach(marker => map.removeLayer(marker));
    reportMarkers = [];

    // Add new markers
    sampleReports.forEach(report => {
        const marker = L.circleMarker([report.position.lat, report.position.lng], {
            radius: 8,
            fillColor: getReportColor(report.type),
            color: '#FFFFFF',
            weight: 2,
            opacity: 1,
            fillOpacity: 1
        }).addTo(map);

        marker.bindPopup(createReportInfoWindow(report));
        reportMarkers.push(marker);
    });
}

// Find nearby NGOs
function findNearbyNGOs() {
    // Simulated NGO data - replace with actual API call
    const nearbyNGOs = [
        {
            id: 1,
            position: {
                lat: currentPosition.lat + 0.02,
                lng: currentPosition.lng + 0.02
            },
            name: 'Animal Rescue Center',
            contact: '+1 (555) 123-4567',
            distance: '2.3 km'
        },
        {
            id: 2,
            position: {
                lat: currentPosition.lat - 0.02,
                lng: currentPosition.lng + 0.02
            },
            name: 'Pet Care Shelter',
            contact: '+1 (555) 987-6543',
            distance: '2.8 km'
        }
    ];

    // Clear existing NGO markers
    ngoMarkers.forEach(marker => map.removeLayer(marker));
    ngoMarkers = [];

    // Add new NGO markers
    nearbyNGOs.forEach(ngo => {
        const marker = L.circleMarker([ngo.position.lat, ngo.position.lng], {
            radius: 8,
            fillColor: '#805AD5',
            color: '#FFFFFF',
            weight: 2,
            opacity: 1,
            fillOpacity: 1
        }).addTo(map);

        marker.bindPopup(createNGOInfoWindow(ngo));
        ngoMarkers.push(marker);
    });
}

// Helper functions for markers and info windows
function getReportColor(type) {
    const colors = {
        urgent: '#C53030',
        new: '#4299E1',
        'in-progress': '#ED8936',
        resolved: '#48BB78'
    };
    return colors[type] || colors.new;
}

function createReportInfoWindow(report) {
    return `
        <div class="map-info-window">
            <h3>${report.title}</h3>
            <p>${report.description}</p>
            <span class="report-status ${report.type}">${report.type}</span>
            <button class="btn primary small" onclick="viewReportDetails(${report.id})">View Details</button>
        </div>
    `;
}

function createNGOInfoWindow(ngo) {
    return `
        <div class="map-info-window">
            <h3>${ngo.name}</h3>
            <p><i class="fas fa-phone"></i> ${ngo.contact}</p>
            <p><i class="fas fa-map-marker-alt"></i> ${ngo.distance} away</p>
            <button class="btn primary small" onclick="contactNGO(${ngo.id})">Contact</button>
        </div>
    `;
}

// Update report location
function updateReportLocation(latlng) {
    const locationInput = document.getElementById('location');
    
    // Use OpenStreetMap Nominatim for reverse geocoding
    fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latlng.lat}&lon=${latlng.lng}`)
        .then(response => response.json())
        .then(data => {
            locationInput.value = data.display_name;
            // Store coordinates for submission
            locationInput.dataset.lat = latlng.lat;
            locationInput.dataset.lng = latlng.lng;
            showToast('Location updated', 'success');
        })
        .catch(() => {
            locationInput.value = `${latlng.lat.toFixed(6)}, ${latlng.lng.toFixed(6)}`;
            locationInput.dataset.lat = latlng.lat;
            locationInput.dataset.lng = latlng.lng;
            showToast('Location updated', 'success');
        });
}

// Handle report form submission with location
document.getElementById('reportForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = {
        animalType: document.getElementById('animalType').value,
        location: {
            address: document.getElementById('location').value,
            lat: parseFloat(document.getElementById('location').dataset.lat),
            lng: parseFloat(document.getElementById('location').dataset.lng)
        },
        description: document.getElementById('description').value,
        urgency: document.getElementById('urgency').value,
        photo: document.getElementById('photo').files[0]
    };
    
    // Validate location
    if (!formData.location.lat || !formData.location.lng) {
        showToast('Please select a location on the map or use current location', 'error');
        return;
    }
    
    // Disable submit button and show loading state
    const submitButton = this.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    submitButton.textContent = 'Submitting...';
    
    // Add report marker to map
    const marker = L.circleMarker([formData.location.lat, formData.location.lng], {
        radius: 8,
        fillColor: getReportColor(formData.urgency === 'urgent' ? 'urgent' : 'new'),
        color: '#FFFFFF',
        weight: 2,
        opacity: 1,
        fillOpacity: 1
    }).addTo(map);
    
    // Create info window content
    const popupContent = createReportInfoWindow({
        title: `${formData.animalType.charAt(0).toUpperCase() + formData.animalType.slice(1)} Report`,
        description: formData.description,
        type: formData.urgency === 'urgent' ? 'urgent' : 'new'
    });
    
    marker.bindPopup(popupContent);
    reportMarkers.push(marker);
    
    // Add report to the list
    const reportsList = document.querySelector('.reports-scroll');
    const reportCard = document.createElement('div');
    reportCard.className = 'report-card';
    reportCard.innerHTML = `
        <div class="report-image">
            ${formData.photo ? `<img src="${URL.createObjectURL(formData.photo)}" alt="Reported Animal">` : 
            `<img src="https://images.unsplash.com/photo-1548681528-6a5c45b66b42" alt="Default Animal">`}
        </div>
        <div class="report-content">
            <span class="report-status ${formData.urgency === 'urgent' ? 'urgent' : ''}">${formData.urgency}</span>
            <h4>${formData.animalType.charAt(0).toUpperCase() + formData.animalType.slice(1)} Report</h4>
            <p class="report-location"><i class="fas fa-map-marker-alt"></i> ${formData.location.address}</p>
            <p class="report-time"><i class="fas fa-clock"></i> Just now</p>
            <p class="report-description">${formData.description}</p>
            <button class="btn secondary small">View Details</button>
        </div>
    `;
    reportsList.insertBefore(reportCard, reportsList.firstChild);
    
    // Show success message and close modal
    showToast('Report submitted successfully!', 'success');
    closeModal(document.getElementById('reportModal'));
    
    // Reset form and button state
    this.reset();
    submitButton.disabled = false;
    submitButton.textContent = 'Submit Report';
});

// Initialize map when the page loads
window.addEventListener('load', initMap);

// Use current location functionality
document.getElementById('useCurrentLocation').addEventListener('click', function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => {
                const latlng = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                updateReportLocation(latlng);
                map.setView([latlng.lat, latlng.lng], 15);
            },
            error => {
                showToast('Unable to get your location. Please try again or select on map.', 'error');
            }
        );
    } else {
        showToast('Geolocation is not supported by your browser', 'error');
    }
});

// Photo preview functionality
const photoInput = document.getElementById('photo');
const photoPreview = document.getElementById('photoPreview');

photoInput.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            photoPreview.innerHTML = `<img src="${e.target.result}" alt="Preview">`;
            photoPreview.style.display = 'block';
        };
        reader.readAsDataURL(file);
    } else {
        photoPreview.innerHTML = '';
        photoPreview.style.display = 'none';
    }
});

// Connect the "New Report" button in reports list
document.querySelector('.reports-header .btn').addEventListener('click', function() {
    openModal('report');
});

// Handle Adopt button clicks
document.querySelectorAll('.animal-card .btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const card = this.closest('.animal-card');
        const petName = card.querySelector('h3').textContent;
        const petImage = card.querySelector('img').src;
        
        // Update adopt modal with pet details
        const adoptModal = document.getElementById('adoptModal');
        const modalTitle = adoptModal.querySelector('h2');
        modalTitle.textContent = `Adopt ${petName}`;
        
        // Add pet preview to the modal
        const previewDiv = document.createElement('div');
        previewDiv.className = 'pet-preview';
        previewDiv.innerHTML = `
            <img src="${petImage}" alt="${petName}">
            <h4>${petName}</h4>
        `;
        
        // Add or update preview in modal
        const existingPreview = adoptModal.querySelector('.pet-preview');
        if (existingPreview) {
            existingPreview.replaceWith(previewDiv);
        } else {
            adoptModal.querySelector('.modal-content').insertBefore(previewDiv, adoptModal.querySelector('form'));
        }
        
        // Add hidden input for pet name
        let petNameInput = adoptModal.querySelector('#pet-name');
        if (!petNameInput) {
            petNameInput = document.createElement('input');
            petNameInput.type = 'hidden';
            petNameInput.id = 'pet-name';
            adoptModal.querySelector('form').appendChild(petNameInput);
        }
        petNameInput.value = petName;
        
        // Open the modal
        openModal('adopt');
    });
});

// Handle Tips card clicks
document.querySelectorAll('.tip-card').forEach(card => {
    card.addEventListener('click', function() {
        // Get tip content
        const title = this.querySelector('h3').textContent;
        const content = this.querySelector('p').textContent;
        
        // Create and show tip modal
        const tipModal = createTipModal(title, content);
        document.body.appendChild(tipModal);
        
        // Show modal with animation
        setTimeout(() => tipModal.classList.add('active'), 10);
        
        // Add close functionality
        const closeBtn = tipModal.querySelector('.modal-close');
        closeBtn.addEventListener('click', () => {
            tipModal.classList.remove('active');
            setTimeout(() => tipModal.remove(), 300);
        });
        
        // Close on outside click
        tipModal.addEventListener('click', (e) => {
            if (e.target === tipModal) {
                tipModal.classList.remove('active');
                setTimeout(() => tipModal.remove(), 300);
            }
        });
    });
});

// Create tip modal dynamically
function createTipModal(title, content) {
    const modal = document.createElement('div');
    modal.className = 'modal tip-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="modal-close">&times;</span>
            <h2>${title}</h2>
            <div class="tip-content">
                <p>${content}</p>
                <div class="tip-actions">
                    <button class="btn primary share-tip">
                        <i class="fas fa-share"></i> Share Tip
                    </button>
                    <button class="btn secondary save-tip">
                        <i class="fas fa-bookmark"></i> Save for Later
                    </button>
                </div>
            </div>
        </div>
    `;
    
    // Add share functionality
    modal.querySelector('.share-tip').addEventListener('click', () => {
        if (navigator.share) {
            navigator.share({
                title: title,
                text: content,
                url: window.location.href
            })
            .then(() => showToast('Tip shared successfully!', 'success'))
            .catch(() => showToast('Failed to share tip', 'error'));
        } else {
            // Fallback: Copy to clipboard
            navigator.clipboard.writeText(`${title}\n\n${content}`)
                .then(() => showToast('Tip copied to clipboard!', 'success'))
                .catch(() => showToast('Failed to copy tip', 'error'));
        }
    });
    
    // Add save functionality
    modal.querySelector('.save-tip').addEventListener('click', function() {
        const savedTips = JSON.parse(localStorage.getItem('savedTips') || '[]');
        const tipData = { title, content, savedAt: new Date().toISOString() };
        
        // Check if tip is already saved
        const isSaved = savedTips.some(tip => tip.title === title);
        
        if (isSaved) {
            showToast('Tip is already saved!', 'info');
        } else {
            savedTips.push(tipData);
            localStorage.setItem('savedTips', JSON.stringify(savedTips));
            showToast('Tip saved successfully!', 'success');
            
            // Update button state
            this.innerHTML = '<i class="fas fa-check"></i> Saved';
            this.disabled = true;
        }
    });
    
    return modal;
}

// Add styles for pet preview in adopt modal
const style = document.createElement('style');
style.textContent = `
    .pet-preview {
        text-align: center;
        margin-bottom: 20px;
        padding: 15px;
        background: var(--light-gray);
        border-radius: 12px;
    }
    
    .pet-preview img {
        width: 200px;
        height: 200px;
        object-fit: cover;
        border-radius: 10px;
        margin-bottom: 10px;
    }
    
    .pet-preview h4 {
        margin: 0;
        color: var(--text-color);
        font-size: 1.2rem;
    }
    
    .tip-modal .modal-content {
        max-width: 600px;
    }
    
    .tip-content {
        padding: 20px 0;
    }
    
    .tip-actions {
        display: flex;
        gap: 10px;
        margin-top: 20px;
    }
    
    .tip-actions .btn {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
    }
    
    [data-theme="dark"] .pet-preview {
        background: var(--card-bg);
    }
`;
document.head.appendChild(style);

// Rating System
const ratings = {
    tips: JSON.parse(localStorage.getItem('tipRatings') || '{}')
};

// Create star rating component
function createRatingComponent(itemId, type, currentRating = 0, isReadOnly = false) {
    const ratingContainer = document.createElement('div');
    ratingContainer.className = `rating-container ${isReadOnly ? 'readonly' : ''}`;
    
    const starsContainer = document.createElement('div');
    starsContainer.className = 'stars';
    
    const ratingInfo = document.createElement('div');
    ratingInfo.className = 'rating-info';
    
    // Create stars
    for (let i = 1; i <= 5; i++) {
        const star = document.createElement('i');
        star.className = `fas fa-star ${i <= currentRating ? 'active' : ''}`;
        if (!isReadOnly) {
            star.addEventListener('click', () => rateItem(itemId, i, type));
            star.addEventListener('mouseover', () => previewRating(starsContainer, i));
            star.addEventListener('mouseout', () => previewRating(starsContainer, currentRating));
        }
        starsContainer.appendChild(star);
    }
    
    ratingContainer.appendChild(starsContainer);
    ratingContainer.appendChild(ratingInfo);
    updateRatingInfo(ratingContainer, itemId, type);
    
    return ratingContainer;
}

// Rate an item
function rateItem(itemId, rating, type) {
    if (!ratings[type][itemId]) {
        ratings[type][itemId] = { total: 0, count: 0 };
    }
    
    ratings[type][itemId].total += rating;
    ratings[type][itemId].count += 1;
    
    // Save to localStorage
    localStorage.setItem(`${type}Ratings`, JSON.stringify(ratings[type]));
    
    // Update UI
    const container = document.querySelector(`[data-${type}-id="${itemId}"]`);
    if (container) {
        const ratingComponent = container.querySelector('.rating-container');
        if (ratingComponent) {
            updateRatingInfo(ratingComponent, itemId, type);
            previewRating(ratingComponent.querySelector('.stars'), rating);
        }
    }
    
    showToast('Rating submitted successfully!', 'success');
}

// Preview rating on hover
function previewRating(starsContainer, rating) {
    const stars = starsContainer.querySelectorAll('.fa-star');
    stars.forEach((star, index) => {
        star.classList.toggle('active', index < rating);
    });
}

// Update rating information
function updateRatingInfo(container, itemId, type) {
    const info = container.querySelector('.rating-info');
    const itemRatings = ratings[type][itemId];
    
    if (itemRatings && itemRatings.count > 0) {
        const average = (itemRatings.total / itemRatings.count).toFixed(1);
        info.textContent = `${average}/5 (${itemRatings.count} ${itemRatings.count === 1 ? 'rating' : 'ratings'})`;
    } else {
        info.textContent = 'No ratings yet';
    }
}

// Modify tip card creation to include ratings
document.querySelectorAll('.tip-card').forEach((card, index) => {
    const tipTitle = card.querySelector('h3').textContent;
    card.setAttribute('data-tips-id', tipTitle.toLowerCase().replace(/\s+/g, '-'));
    
    const ratingComponent = createRatingComponent(
        tipTitle.toLowerCase().replace(/\s+/g, '-'),
        'tips'
    );
    card.appendChild(ratingComponent);
});

// Add styles for rating system
const ratingStyles = document.createElement('style');
ratingStyles.textContent = `
    .rating-container {
        margin: 15px 0;
        text-align: center;
    }
    
    .stars {
        display: inline-flex;
        gap: 5px;
        margin-bottom: 5px;
    }
    
    .stars .fa-star {
        color: #cbd5e0;
        cursor: pointer;
        transition: all 0.2s ease;
    }
    
    .stars .fa-star:hover,
    .stars .fa-star.active {
        color: #ecc94b;
        transform: scale(1.1);
    }
    
    .rating-container.readonly .stars .fa-star {
        cursor: default;
        transform: none;
    }
    
    .rating-info {
        font-size: 0.9rem;
        color: var(--dark-gray);
    }
    
    [data-theme="dark"] .stars .fa-star {
        color: #4a5568;
    }
    
    [data-theme="dark"] .stars .fa-star:hover,
    [data-theme="dark"] .stars .fa-star.active {
        color: #ecc94b;
    }
    
    [data-theme="dark"] .rating-info {
        color: var(--text-color-muted);
    }
    
    .tip-modal .rating-container {
        margin-top: 20px;
        margin-bottom: 0;
    }
`;
document.head.appendChild(ratingStyles);

// Modify tip modal creation to include ratings
const originalCreateTipModal = createTipModal;
createTipModal = function(title, content) {
    const modal = originalCreateTipModal(title, content);
    const tipId = title.toLowerCase().replace(/\s+/g, '-');
    
    // Add rating component before tip actions
    const tipContent = modal.querySelector('.tip-content');
    const tipActions = modal.querySelector('.tip-actions');
    const ratingComponent = createRatingComponent(tipId, 'tips');
    tipContent.insertBefore(ratingComponent, tipActions);
    
    return modal;
};

// View Details functionality for reports
function viewReportDetails(reportId) {
    // Find report data
    const report = findReportById(reportId);
    if (!report) return;

    // Create and show details modal
    const detailsModal = document.createElement('div');
    detailsModal.className = 'modal details-modal';
    detailsModal.innerHTML = `
        <div class="modal-content">
            <span class="modal-close">&times;</span>
            <div class="details-header">
                <h2>${report.title}</h2>
                <span class="report-status ${report.type}">${report.type}</span>
            </div>
            <div class="details-content">
                <div class="details-image">
                    ${report.image ? 
                        `<img src="${report.image}" alt="${report.title}">` :
                        `<div class="no-image"><i class="fas fa-image"></i><p>No image available</p></div>`
                    }
                </div>
                <div class="details-info">
                    <p><i class="fas fa-map-marker-alt"></i> ${report.location}</p>
                    <p><i class="fas fa-clock"></i> ${report.time}</p>
                    <p class="description">${report.description}</p>
                </div>
                <div class="details-actions">
                    <button class="btn primary" onclick="volunteerForReport(${reportId})">
                        <i class="fas fa-hand-holding-heart"></i> Volunteer to Help
                    </button>
                    <button class="btn secondary" onclick="shareReport(${reportId})">
                        <i class="fas fa-share"></i> Share
                    </button>
                </div>
            </div>
        </div>
    `;

    // Add modal to body
    document.body.appendChild(detailsModal);
    setTimeout(() => detailsModal.classList.add('active'), 10);

    // Add close functionality
    const closeBtn = detailsModal.querySelector('.modal-close');
    closeBtn.addEventListener('click', () => {
        detailsModal.classList.remove('active');
        setTimeout(() => detailsModal.remove(), 300);
    });

    // Close on outside click
    detailsModal.addEventListener('click', (e) => {
        if (e.target === detailsModal) {
            detailsModal.classList.remove('active');
            setTimeout(() => detailsModal.remove(), 300);
        }
    });
}

// Helper function to find report by ID
function findReportById(id) {
    // Predefined reports for different pets
    const reports = {
        1: {
            id: 1,
            title: 'Injured Dog Found',
            type: 'urgent',
            image: 'https://images.unsplash.com/photo-1548681528-6a5c45b66b42',
            location: 'Central Park Area, Near Fountain',
            time: '2 hours ago',
            description: 'Found an injured Golden Retriever with a limping leg. The dog appears to be well-groomed but has no collar. Immediate medical attention needed.\n\n' +
                '• Current Health Status: Injured leg, requires medical attention\n' +
                '• Estimated Age: 3-4 years\n' +
                '• Behavior: Very friendly, responds to basic commands\n' +
                '• Current Location: Taking shelter under park bench\n' +
                '• Food Status: Accepted food from rescuers\n' +
                '• Shelter Status: Temporary shelter needed\n\n' +
                'Additional Observations:\n' +
                'The dog appears to be a lost pet rather than a stray, given its grooming and behavior. However, no microchip was detected in initial scanning.'
        },
        2: {
            id: 2,
            title: 'Mother Cat with Kittens',
            type: 'new',
            image: 'https://images.unsplash.com/photo-1543852786-1cf6624b9987',
            location: 'Behind Wilson Street Mall',
            time: '5 hours ago',
            description: 'Found a mother cat with 4 kittens. They need immediate shelter and care.\n\n' +
                '• Current Health Status: Mother appears healthy, kittens need check-up\n' +
                '• Estimated Age: Mother: 2 years, Kittens: ~3 weeks\n' +
                '• Behavior: Mother is protective but not aggressive\n' +
                '• Current Location: In a cardboard box shelter\n' +
                '• Food Status: Need regular feeding\n' +
                '• Shelter Status: Temporary foster home needed\n\n' +
                'Additional Observations:\n' +
                'The mother cat is taking good care of her kittens but they need a safer environment. All kittens appear active and responsive.'
        },
        3: {
            id: 3,
            title: 'Senior Dog Needs Home',
            type: 'in-progress',
            image: 'https://images.unsplash.com/photo-1543071220-6ee5bf71a54e',
            location: 'Near City Library',
            time: '1 day ago',
            description: 'Senior Labrador found wandering near the library. Very gentle and well-behaved.\n\n' +
                '• Current Health Status: Generally healthy but showing age\n' +
                '• Estimated Age: 8-10 years\n' +
                '• Behavior: Extremely gentle and well-trained\n' +
                '• Current Location: Currently at temporary shelter\n' +
                '• Food Status: Eating well\n' +
                '• Shelter Status: Needs permanent home\n\n' +
                'Additional Observations:\n' +
                'This sweet senior dog appears to be house-trained and knows several commands. Would be perfect for a calm household.'
        }
    };

    // Return the specific report if it exists, otherwise return a generated one
    return reports[id] || {
        id: id,
        title: `New Animal Report #${id}`,
        type: ['urgent', 'new', 'in-progress', 'resolved'][Math.floor(Math.random() * 4)],
        image: 'https://images.unsplash.com/photo-1548681528-6a5c45b66b42',
        location: '123 Street Name, City',
        time: '2 hours ago',
        description: 'New animal found needing assistance...'
    };
}

// Volunteer for a report
function volunteerForReport(reportId) {
    const report = findReportById(reportId);
    
    const volunteerModal = document.createElement('div');
    volunteerModal.className = 'modal volunteer-modal';
    volunteerModal.innerHTML = `
        <div class="modal-content">
            <span class="modal-close">&times;</span>
            <div class="details-header">
                <h2>Volunteer for ${report.title}</h2>
            </div>
            <div class="details-content">
                <form id="volunteerForm" onsubmit="submitVolunteerForm(event, ${reportId})">
                    <div class="form-group">
                        <label>Your Name *</label>
                        <input type="text" name="name" required>
                    </div>
                    <div class="form-group">
                        <label>Phone Number *</label>
                        <input type="tel" name="phone" required>
                    </div>
                    <div class="form-group">
                        <label>Email *</label>
                        <input type="email" name="email" required>
                    </div>
                    <div class="form-group">
                        <label>Available Times</label>
                        <select name="availability" required>
                            <option value="">Select availability</option>
                            <option value="morning">Morning (8AM - 12PM)</option>
                            <option value="afternoon">Afternoon (12PM - 4PM)</option>
                            <option value="evening">Evening (4PM - 8PM)</option>
                            <option value="flexible">Flexible</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>How can you help?</label>
                        <textarea name="message" rows="4" placeholder="Tell us about your experience with animals and how you can help..."></textarea>
                    </div>
                    <button type="submit" class="btn primary">
                        <i class="fas fa-heart"></i> Submit Volunteer Application
                    </button>
                </form>
            </div>
        </div>
    `;

    document.body.appendChild(volunteerModal);
    setTimeout(() => volunteerModal.classList.add('active'), 10);
    setupModalClose(volunteerModal);
}

// Submit volunteer form
function submitVolunteerForm(event, reportId) {
    event.preventDefault();
    const form = event.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    
    // Show loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
    
    // Simulate form submission
    setTimeout(() => {
        showToast('Thank you for volunteering! We will contact you shortly.', 'success');
        
        // Close the modal
        const modal = form.closest('.modal');
        modal.classList.remove('active');
        setTimeout(() => modal.remove(), 300);
    }, 1500);
}

// Share report
function shareReport(reportId) {
    const report = findReportById(reportId);
    
    // Create share data
    const shareData = {
        title: report.title,
        text: `Help needed: ${report.title} - ${report.location}`,
        url: window.location.href
    };

    // Create share modal with options
    const shareModal = document.createElement('div');
    shareModal.className = 'modal share-modal';
    shareModal.innerHTML = `
        <div class="modal-content">
            <span class="modal-close">&times;</span>
            <div class="details-header">
                <h2>Share This Report</h2>
            </div>
            <div class="details-content">
                <div class="share-buttons">
                    <button onclick="shareVia('facebook', ${reportId})" class="btn facebook">
                        <i class="fab fa-facebook"></i> Facebook
                    </button>
                    <button onclick="shareVia('twitter', ${reportId})" class="btn twitter">
                        <i class="fab fa-twitter"></i> Twitter
                    </button>
                    <button onclick="shareVia('whatsapp', ${reportId})" class="btn whatsapp">
                        <i class="fab fa-whatsapp"></i> WhatsApp
                    </button>
                    <button onclick="shareVia('email', ${reportId})" class="btn email">
                        <i class="fas fa-envelope"></i> Email
                    </button>
                </div>
                <div class="share-link">
                    <p>Or copy this link:</p>
                    <div class="copy-link">
                        <input type="text" value="${window.location.href}" readonly>
                        <button onclick="copyLink(this)" class="btn secondary">
                            <i class="fas fa-copy"></i> Copy
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(shareModal);
    setTimeout(() => shareModal.classList.add('active'), 10);
    setupModalClose(shareModal);

    // Try native share first
    if (navigator.share) {
        navigator.share(shareData)
            .then(() => {
                showToast('Shared successfully!', 'success');
                shareModal.remove();
            })
            .catch(() => {
                // If native share fails, modal will stay open with other options
            });
    }
}

// Share via different platforms
function shareVia(platform, reportId) {
    const report = findReportById(reportId);
    const text = encodeURIComponent(`Help needed: ${report.title} - ${report.location}`);
    const url = encodeURIComponent(window.location.href);
    
    let shareUrl;
    switch(platform) {
        case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
            break;
        case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
            break;
        case 'whatsapp':
            shareUrl = `https://wa.me/?text=${text}%20${url}`;
            break;
        case 'email':
            window.location.href = `mailto:?subject=${text}&body=${text}%20${url}`;
            return;
    }
    
    // Open share window
    window.open(shareUrl, '_blank', 'width=600,height=400');
    showToast('Opening share window...', 'info');
}

// Copy link to clipboard
function copyLink(button) {
    const input = button.previousElementSibling;
    input.select();
    document.execCommand('copy');
    
    // Update button text temporarily
    const originalText = button.innerHTML;
    button.innerHTML = '<i class="fas fa-check"></i> Copied!';
    setTimeout(() => {
        button.innerHTML = originalText;
    }, 2000);
    
    showToast('Link copied to clipboard!', 'success');
}

// Add styles for volunteer and share modals
const additionalStyles = document.createElement('style');
additionalStyles.textContent = `
    .volunteer-modal .form-group {
        margin-bottom: 15px;
    }

    .volunteer-modal label {
        display: block;
        margin-bottom: 5px;
        font-weight: 500;
    }

    .volunteer-modal input,
    .volunteer-modal select,
    .volunteer-modal textarea {
        width: 100%;
        padding: 8px;
        border: 1px solid var(--border-color);
        border-radius: 4px;
        font-size: 1em;
    }

    .share-buttons {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
        gap: 10px;
        margin-bottom: 20px;
    }

    .share-buttons .btn {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        padding: 10px;
    }

    .btn.facebook { background: #1877f2; color: white; }
    .btn.twitter { background: #1da1f2; color: white; }
    .btn.whatsapp { background: #25d366; color: white; }
    .btn.email { background: #ea4335; color: white; }

    .share-link {
        margin-top: 20px;
        padding-top: 20px;
        border-top: 1px solid var(--border-color);
    }

    .copy-link {
        display: flex;
        gap: 10px;
    }

    .copy-link input {
        flex-grow: 1;
        padding: 8px;
        border: 1px solid var(--border-color);
        border-radius: 4px;
        font-size: 0.9em;
        background: var(--light-gray);
    }

    [data-theme="dark"] .copy-link input {
        background: var(--card-bg);
        color: var(--text-color);
    }
`;
document.head.appendChild(additionalStyles);

// View Details functionality for NGOs
function contactNGO(ngoId) {
    const ngo = findNGOById(ngoId);
    if (!ngo) return;

    const detailsModal = document.createElement('div');
    detailsModal.className = 'modal details-modal';
    detailsModal.innerHTML = `
        <div class="modal-content">
            <span class="modal-close">&times;</span>
            <div class="details-header">
                <h2>${ngo.name}</h2>
                <span class="ngo-status">Active</span>
            </div>
            <div class="details-content">
                <div class="details-info">
                    <p><i class="fas fa-map-marker-alt"></i> ${ngo.address}</p>
                    <p><i class="fas fa-phone"></i> ${ngo.contact}</p>
                    <p><i class="fas fa-clock"></i> ${ngo.hours}</p>
                    <p class="description">${ngo.description}</p>
                </div>
                <div class="contact-form">
                    <h3>Send Message</h3>
                    <form onsubmit="submitNGOContact(event, ${ngoId})">
                        <input type="text" placeholder="Your Name" required>
                        <input type="email" placeholder="Your Email" required>
                        <textarea placeholder="Your Message" required></textarea>
                        <button type="submit" class="btn primary">Send Message</button>
                    </form>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(detailsModal);
    setTimeout(() => detailsModal.classList.add('active'), 10);

    // Add close functionality
    setupModalClose(detailsModal);
}

// Helper function to find NGO by ID
function findNGOById(id) {
    // Mock data - replace with actual data fetch
    return {
        id: id,
        name: 'Animal Rescue Center',
        address: '456 NGO Street, City',
        contact: '+1 (555) 123-4567',
        hours: 'Mon-Fri: 9AM-5PM',
        description: 'We are dedicated to helping stray animals find loving homes and providing emergency care for injured animals.'
    };
}

// Submit NGO contact form
function submitNGOContact(event, ngoId) {
    event.preventDefault();
    const form = event.target;
    
    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

    // Simulate form submission
    setTimeout(() => {
        showToast('Message sent successfully!', 'success');
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
        form.reset();
        
        // Close modal after success
        const modal = form.closest('.modal');
        modal.classList.remove('active');
        setTimeout(() => modal.remove(), 300);
    }, 1500);
}

// View Details functionality for animal cards
function viewAnimalDetails(animalId) {
    const animal = findAnimalById(animalId);
    if (!animal) return;

    const detailsModal = document.createElement('div');
    detailsModal.className = 'modal details-modal';
    detailsModal.innerHTML = `
        <div class="modal-content">
            <span class="modal-close">&times;</span>
            <div class="details-header">
                <h2>${animal.name}</h2>
                <span class="animal-status ${animal.status}">${animal.status}</span>
            </div>
            <div class="details-content">
                <div class="details-image">
                    <img src="${animal.image}" alt="${animal.name}">
                </div>
                <div class="details-info">
                    <div class="info-grid">
                        <div class="info-item">
                            <i class="fas fa-birthday-cake"></i>
                            <span>Age: ${animal.age}</span>
                        </div>
                        <div class="info-item">
                            <i class="fas fa-venus-mars"></i>
                            <span>Gender: ${animal.gender}</span>
                        </div>
                        <div class="info-item">
                            <i class="fas fa-weight"></i>
                            <span>Size: ${animal.size}</span>
                        </div>
                        <div class="info-item">
                            <i class="fas fa-heart"></i>
                            <span>Health: ${animal.health}</span>
                        </div>
                    </div>
                    <p class="description">${animal.description}</p>
                    <div class="personality-traits">
                        ${animal.traits.map(trait => `
                            <span class="trait"><i class="fas fa-paw"></i> ${trait}</span>
                        `).join('')}
                    </div>
                </div>
                <div class="details-actions">
                    <button class="btn primary" onclick="startAdoption(${animalId})">
                        <i class="fas fa-home"></i> Start Adoption
                    </button>
                    <button class="btn secondary" onclick="sponsorAnimal(${animalId})">
                        <i class="fas fa-gift"></i> Sponsor
                    </button>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(detailsModal);
    setTimeout(() => detailsModal.classList.add('active'), 10);

    // Add close functionality
    setupModalClose(detailsModal);
}

// Helper function to find animal by ID
function findAnimalById(id) {
    // Mock data - replace with actual data fetch
    return {
        id: id,
        name: 'Buddy',
        status: 'available',
        image: 'https://images.unsplash.com/photo-1548681528-6a5c45b66b42',
        age: '2 years',
        gender: 'Male',
        size: 'Medium',
        health: 'Vaccinated',
        description: 'Buddy is a friendly and energetic dog who loves to play and cuddle. He gets along well with other dogs and children.',
        traits: ['Friendly', 'Energetic', 'Good with kids', 'Trained']
    };
}

// Helper function to setup modal close functionality
function setupModalClose(modal) {
    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
        setTimeout(() => modal.remove(), 300);
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            setTimeout(() => modal.remove(), 300);
        }
    });
}

// Add styles for details modals
const detailsStyles = document.createElement('style');
detailsStyles.textContent = `
    .details-modal .modal-content {
        max-width: 800px;
        max-height: 90vh;
        padding: 0;
        border-radius: 12px;
        overflow: hidden;
        display: flex;
        flex-direction: column;
    }

    .details-header {
        padding: 20px;
        background: var(--primary-color);
        color: white;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-shrink: 0;
        position: relative;
        z-index: 1;
    }

    .details-header h2 {
        margin: 0;
        color: white !important;
    }

    .details-content {
        padding: 20px;
        overflow-y: auto;
        flex-grow: 1;
        -webkit-overflow-scrolling: touch;
    }

    /* Custom scrollbar styling */
    .details-content::-webkit-scrollbar {
        width: 8px;
    }

    .details-content::-webkit-scrollbar-track {
        background: var(--light-gray);
        border-radius: 4px;
    }

    .details-content::-webkit-scrollbar-thumb {
        background: var(--primary-color);
        border-radius: 4px;
    }

    .details-content::-webkit-scrollbar-thumb:hover {
        background: var(--primary-color-dark);
    }

    /* Ensure text visibility in sunset theme */
    [data-theme="sunset"] .details-header h2 {
        color: #000000 !important;
        text-shadow: 1px 1px 0 rgba(255, 255, 255, 0.5);
    }

    [data-theme="sunset"] .report-status {
        color: #000000 !important;
        font-weight: 600;
    }

    .details-image {
        margin-bottom: 20px;
        border-radius: 8px;
        overflow: hidden;
    }

    .details-image img {
        width: 100%;
        height: 300px;
        object-fit: cover;
    }

    .no-image {
        height: 200px;
        background: var(--light-gray);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: var(--dark-gray);
    }

    .details-info {
        margin-bottom: 20px;
    }

    .info-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        gap: 15px;
        margin-bottom: 20px;
    }

    .info-item {
        display: flex;
        align-items: center;
        gap: 10px;
    }

    .info-item i {
        color: var(--primary-color);
    }

    .description {
        line-height: 1.6;
        margin: 15px 0;
    }

    .personality-traits {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        margin-top: 15px;
    }

    .trait {
        background: var(--light-gray);
        padding: 5px 10px;
        border-radius: 15px;
        font-size: 0.9em;
        display: flex;
        align-items: center;
        gap: 5px;
    }

    .trait i {
        color: var(--primary-color);
    }

    .details-actions {
        display: flex;
        gap: 10px;
        margin-top: 20px;
    }

    .contact-form {
        margin-top: 20px;
    }

    .contact-form h3 {
        margin-bottom: 15px;
    }

    .contact-form form {
        display: flex;
        flex-direction: column;
        gap: 15px;
    }

    .contact-form input,
    .contact-form textarea {
        padding: 10px;
        border: 1px solid var(--border-color);
        border-radius: 6px;
        font-size: 1em;
    }

    .contact-form textarea {
        height: 120px;
        resize: vertical;
    }

    [data-theme="dark"] .no-image {
        background: var(--card-bg);
        color: var(--text-color-muted);
    }

    [data-theme="dark"] .trait {
        background: var(--card-bg);
    }

    @media (max-width: 768px) {
        .details-actions {
            flex-direction: column;
        }

        .details-image img {
            height: 200px;
        }
    }
`;
document.head.appendChild(detailsStyles);

// Add click handlers to all view details buttons
document.addEventListener('DOMContentLoaded', () => {
    // For reports
    document.querySelectorAll('.report-card .btn').forEach(button => {
        button.addEventListener('click', () => {
            const reportId = button.closest('.report-card').dataset.reportId;
            viewReportDetails(reportId || 1);
        });
    });

    // For animal cards
    document.querySelectorAll('.animal-card .btn').forEach(button => {
        if (button.textContent.includes('View Details')) {
            button.addEventListener('click', () => {
                const animalId = button.closest('.animal-card').dataset.animalId;
                viewAnimalDetails(animalId || 1);
            });
        }
    });
}); 