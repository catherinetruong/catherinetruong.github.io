function showPopupResume(pdfUrl) {
  console.log("showPopupResume called with:", pdfUrl);
  const modal = document.getElementById('resumeModal');
  const modalIframe = document.getElementById('resumeViewer');
  modalIframe.src = pdfUrl;
  modal.style.display = 'flex';
}

// ===== Dark Mode Toggle =====
const toggleDarkMode = () => {
    const isDark = document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', isDark);

    const toggleBtn = document.getElementById('dark-toggle');
    if (toggleBtn) {
        toggleBtn.innerText = isDark ? '☀️ Light Mode' : '🌙 Dark Mode';
    }
};

// Add a button dynamically if not in HTML yet
const addDarkModeToggle = () => {
    const button = document.createElement('button');
    const isDark = localStorage.getItem('darkMode') === 'true';
    button.innerText = isDark ? '☀️ Light Mode' : '🌙 Dark Mode';
    button.id = 'dark-toggle';
    button.style.position = 'fixed';
    button.style.bottom = '20px';
    button.style.left = '20px';
    button.style.padding = '10px';
    button.style.zIndex = '1000';
    button.style.cursor = 'pointer';
    button.style.background = '#fff';
    button.style.border = '1px solid #ccc';
    button.style.borderRadius = '4px';
    button.style.color = 'gray';
    document.body.appendChild(button);

    button.addEventListener('click', toggleDarkMode);
};


// ===== Smooth Scrolling =====
const enableSmoothScrolling = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
        });
    });
};

// ===== Load Preference from localStorage =====
const loadDarkModePreference = () => {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
    }

    // Update the button text after body class is set
    const toggleBtn = document.getElementById('dark-toggle');
    if (toggleBtn) {
        toggleBtn.innerText = isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode';
    }
};

// ===== Mobile Menu Toggle =====
const initMobileMenu = () => {
    const toggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');

    toggle.addEventListener('click', () => {
        navLinks.classList.toggle('show');
    });

    // Hide menu when link is clicked
    navLinks.querySelectorAll('a').forEach(link =>
        link.addEventListener('click', () => {
        navLinks.classList.remove('show');
        })
    );
};

// ===== Scroll Reveal Animation =====
const initScrollReveal = () => {
    const revealElements = document.querySelectorAll('.reveal');

    const revealOnScroll = () => {
        const triggerBottom = window.innerHeight * 0.85;

        revealElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < triggerBottom) {
            el.classList.add('active');
        }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // initial check
};

//=================================

window.addEventListener('DOMContentLoaded', () => {
    addDarkModeToggle();           // ← adds the button first
    loadDarkModePreference();      // ← updates button text if dark mode is active
    enableSmoothScrolling();
    initMobileMenu();
    initScrollReveal();
});

// ===== Resume Download Tracking =====
const trackResumeDownload = (type) => {
  console.log(`Downloaded ${type} resume`);
  // You can hook this into Google Analytics, Mixpanel, or a backend later
};

// Tab switch logic for Projects section
document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".tab");
  const tabContents = document.querySelectorAll(".project-tab-content");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      // Remove active classes
      tabs.forEach((t) => t.classList.remove("active"));
      tabContents.forEach((c) => c.classList.remove("active"));

      // Add active to clicked tab and corresponding content
      tab.classList.add("active");
      const target = tab.getAttribute("data-tab");
      document.getElementById(target).classList.add("active");
    });
  });
});

// Tab switching logic for projects
document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".tab");
  const contents = document.querySelectorAll(".project-tab-content");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const target = tab.getAttribute("data-tab");

      // Remove active from all tabs and contents
      tabs.forEach(t => t.classList.remove("active"));
      contents.forEach(c => c.classList.remove("active"));

      // Add active to clicked tab and its content
      tab.classList.add("active");
      document.getElementById(target).classList.add("active");
    });
  });
});

/////////

//
const modal = document.getElementById('resumeModal');
const modalIframe = document.getElementById('resumeViewer');
const closeModalBtn = document.getElementById('closeModal');

function showPopupResume(pdfUrl) {
  modalIframe.src = pdfUrl;
  modal.style.display = 'flex';
}

closeModalBtn.onclick = () => {
  modal.style.display = 'none';
  modalIframe.src = ''; // clear to stop loading when closed
};

// Also close modal when clicking outside the iframe
modal.onclick = (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
    modalIframe.src = '';
  }
};
