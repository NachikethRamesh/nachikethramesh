// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelector(link.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Project data for modals
const projectData = {
    daveslinkshare: {
        title: "Dave's Linkshare",
        subtitle: "Link Management Platform",
        description: "A comprehensive link sharing and management platform that allows users to organize, share, and track their important links. Built with modern web technologies to provide a seamless user experience.",
        techStack: ["JavaScript", "Node.js", "MongoDB", "Express"],
        images: [
            "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop"
        ],
        video: null,
        liveLink: "#",
        githubLink: "#"
    },
    mhustle: {
        title: "MHustle",
        subtitle: "Productivity & Side Hustle App",
        description: "An innovative application designed to help entrepreneurs and side hustlers manage their projects, track income, and stay organized. Features include task management, income tracking, and goal setting.",
        techStack: ["React", "Firebase", "Tailwind CSS", "Chart.js"],
        images: [
            "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=600&h=400&fit=crop"
        ],
        video: null,
        liveLink: "#",
        githubLink: "#"
    },
    projectthree: {
        title: "Project Three",
        subtitle: "Coming Soon",
        description: "This exciting project is currently in development. Stay tuned for updates on this innovative solution that combines cutting-edge technology with user-centered design.",
        techStack: ["React", "Python", "AWS", "PostgreSQL"],
        images: [
            "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=400&fit=crop",
            "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop"
        ],
        video: null,
        liveLink: "#",
        githubLink: "#"
    }
};

// Modal functionality
const modal = document.getElementById('projectModal');
const modalContent = document.getElementById('modalContent');
const modalClose = document.getElementById('modalClose');
const portfolioItems = document.querySelectorAll('.portfolio-item');

// Open modal with project data
function openModal(projectKey) {
    const project = projectData[projectKey];
    if (!project) return;

    let mediaHTML = '';
    
    // Add images
    if (project.images && project.images.length > 0) {
        project.images.forEach(img => {
            mediaHTML += `<img src="${img}" alt="${project.title} screenshot" loading="lazy">`;
        });
    }
    
    // Add video if exists
    if (project.video) {
        mediaHTML += `<video controls src="${project.video}" poster=""></video>`;
    }

    modalContent.innerHTML = `
        <div class="modal-header">
            <h2 class="modal-title">${project.title}</h2>
            <p class="modal-subtitle">${project.subtitle}</p>
        </div>
        
        <p class="modal-description">${project.description}</p>
        
        ${mediaHTML ? `
        <div class="modal-section">
            <h3 class="modal-section-title">Screenshots & Media</h3>
            <div class="modal-media-grid">
                ${mediaHTML}
            </div>
        </div>
        ` : ''}
        
        <div class="modal-section">
            <h3 class="modal-section-title">Technologies Used</h3>
            <div class="modal-tech-stack">
                ${project.techStack.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
            </div>
        </div>
        
        <div class="modal-links">
            <a href="${project.liveLink}" class="modal-link" target="_blank">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                    <polyline points="15 3 21 3 21 9"/>
                    <line x1="10" y1="14" x2="21" y2="3"/>
                </svg>
                View Live
            </a>
            <a href="${project.githubLink}" class="modal-link secondary" target="_blank">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                </svg>
                View Code
            </a>
        </div>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close modal
function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// Event listeners for portfolio items
portfolioItems.forEach(item => {
    item.addEventListener('click', () => {
        const projectKey = item.dataset.project;
        openModal(projectKey);
    });
});

// Close modal events
modalClose.addEventListener('click', closeModal);

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
    }
});
