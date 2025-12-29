// ================== PAGE INTERACTIVITY ==================
document.addEventListener("DOMContentLoaded", () => {

  // --------- DOWNLOAD BUTTON HOVER ---------
  const downloadBtn = document.querySelector('.download-btn');
  const downloadIcon = document.querySelector('.download-icon');
  if (downloadIcon) {
    const downloadInactive = 'images/icons/download_inactive.png';
    const downloadActive = 'images/icons/download_active.png';

    downloadBtn.addEventListener('mouseenter', () => {
      downloadIcon.src = downloadActive;
    });
    downloadBtn.addEventListener('mouseleave', () => {
      downloadIcon.src = downloadInactive;
    });

    // Force download instead of opening in browser
    downloadBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const url = 'CatherineTruong_Software.pdf';
      const link = document.createElement('a');
      link.href = url;
      link.download = 'CatherineTruong_Resume.pdf';
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      setTimeout(() => {
        document.body.removeChild(link);
      }, 100);
    });
  }

  // --------- NAV ITEMS / PAGE SWITCHING ---------
  const navItems = document.querySelectorAll('.nav-item');
  const contentSections = document.querySelectorAll('.content-section');

  if (navItems.length && contentSections.length) {
    // Map section names to icon base names
    const iconMap = {
      'about': 'user',
      'skills': 'skills',
      'experience': 'work_exp',
      'projects': 'projects'
    };

    const navData = Array.from(navItems).map(item => {
      const icon = item.querySelector('.nav-icon');
      const section = item.dataset.section;
      const iconBase = iconMap[section] || 'user';
      const basePath = 'images/icons/';
      const activeSrc = `${basePath}${iconBase}_active.png`;
      const inactiveSrc = `${basePath}${iconBase}_inactive.png`;
      
      return {
        item,
        icon,
        section,
        activeSrc,
        inactiveSrc
      };
    });

    let activeSection = 'about'; // default section

    const updateNavIcons = () => {
      navData.forEach((nav) => {
        const isActive = nav.section === activeSection;
        nav.icon.src = isActive ? nav.activeSrc : nav.inactiveSrc;
        nav.item.classList.toggle('active', isActive);
      });
    };

    const showSection = (sectionId) => {
      contentSections.forEach((section) => {
        section.classList.toggle('active', section.id === sectionId);
      });
    };

    // Initialize
    showSection(activeSection);
    updateNavIcons();

    navItems.forEach((navItem) => {
      const sectionId = navItem.dataset.section;
      
      navItem.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        activeSection = sectionId;
        showSection(sectionId);
        updateNavIcons();
        
        // Smooth scroll to top when switching sections
        const contentBox = document.querySelector('.content-box');
        if (contentBox) {
          contentBox.scrollTo({ top: 0, behavior: 'smooth' });
        }
      });
    });
  }

  // --------- SKILL TAG POPUPS ---------
  const skillTags = document.querySelectorAll('.skill-tag');
  const skillPopup = document.getElementById('skill-popup');
  if (skillTags.length && skillPopup) {
    const popupContent = skillPopup.querySelector('.popup-content');
    const closePopup = skillPopup.querySelector('.close-popup');

    skillTags.forEach(tag => {
      const color = tag.dataset.color;
      tag.style.color = color;
      tag.style.borderColor = color;

      tag.addEventListener('click', () => {
        popupContent.innerHTML = tag.dataset.info;
        skillPopup.style.backgroundColor = color;
        skillPopup.style.display = 'block';
        skillPopup.style.opacity = '1';
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
      });
    });

    const closePopupHandler = () => {
      skillPopup.style.display = 'none';
      document.body.style.overflow = ''; // Restore scrolling
    };

    closePopup.addEventListener('click', closePopupHandler);

    // Close on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && skillPopup.style.display === 'block') {
        closePopupHandler();
      }
    });

    // Close when clicking outside
    skillPopup.addEventListener('click', (e) => {
      if (e.target === skillPopup) {
        closePopupHandler();
      }
    });
  }

  // --------- CONTACT ICONS ---------
  const contactIcons = document.querySelectorAll('.contact-icon');
  contactIcons.forEach(icon => {
    const srcInactive = icon.src;
    const srcActive = srcInactive.replace('_inactive', '_active');

    icon.addEventListener('mouseenter', () => {
      icon.src = srcActive;
    });
    icon.addEventListener('mouseleave', () => {
      icon.src = srcInactive;
    });
  });

  // ================== PROJECT TAG FILTER ==================
  const filterTags = document.querySelectorAll('.filter-tag');
  const projectEntries = document.querySelectorAll('.project-entry');

  if (filterTags.length && projectEntries.length) {
    let activeFilter = 'all';

    filterTags.forEach(tag => {
      tag.addEventListener('click', () => {
        // Update active state
        filterTags.forEach(t => t.classList.remove('active'));
        tag.classList.add('active');
        
        activeFilter = tag.dataset.filter.toLowerCase();
        filterProjects();
      });
    });

    // Filter projects
    function filterProjects() {
      projectEntries.forEach(entry => {
        if (activeFilter === 'all') {
          entry.style.display = 'flex';
          entry.classList.add('fade-in');
        } else {
          const entryTags = entry.dataset.tags.toLowerCase();
          if (entryTags.includes(activeFilter)) {
            entry.style.display = 'flex';
            entry.classList.add('fade-in');
          } else {
            entry.style.display = 'none';
            entry.classList.remove('fade-in');
          }
        }
      });
    }

    // Initialize
    filterProjects();
  }

  // Smooth scroll behavior for all scrollable containers
  const scrollContainers = document.querySelectorAll('.content-box, .skills-container, .experience-container, .projects-container');
  scrollContainers.forEach(container => {
    container.style.scrollBehavior = 'smooth';
  });

  // ================== SCROLL-BASED SIDEBAR HIDE/SHOW ==================
  const sidebar = document.getElementById('sidebar');
  let lastScrollTop = 0;
  const scrollThreshold = 10; // Minimum scroll distance to trigger hide/show

  if (sidebar) {
    const handleScroll = () => {
      // Don't hide/show on mobile when menu is toggled
      if (window.innerWidth <= 768 && sidebar.classList.contains('mobile-open')) {
        return;
      }

      const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
      
      // Only trigger if scrolled enough
      if (Math.abs(currentScroll - lastScrollTop) < scrollThreshold) {
        return;
      }

      if (currentScroll > lastScrollTop && currentScroll > 100) {
        // Scrolling down - hide sidebar
        sidebar.classList.add('sidebar-hidden');
      } else if (currentScroll < lastScrollTop) {
        // Scrolling up - show sidebar
        sidebar.classList.remove('sidebar-hidden');
      }

      lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
    };

    // Throttle scroll events for better performance
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });

    // Show sidebar at the top of the page
    if (window.pageYOffset < 100) {
      sidebar.classList.remove('sidebar-hidden');
    }
  }

  // ================== MOBILE MENU TOGGLE ==================
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');

  if (mobileMenuToggle && sidebar) {
    mobileMenuToggle.addEventListener('click', () => {
      const isExpanded = mobileMenuToggle.getAttribute('aria-expanded') === 'true';
      mobileMenuToggle.setAttribute('aria-expanded', !isExpanded);
      sidebar.classList.toggle('mobile-open');
    });

    // Close mobile menu when clicking a nav item
    navItems.forEach(navItem => {
      navItem.addEventListener('click', (e) => {
        e.stopPropagation();
        if (window.innerWidth <= 768) {
          mobileMenuToggle.setAttribute('aria-expanded', 'false');
          sidebar.classList.remove('mobile-open');
        }
      });
    });

  // --------- EXPERIENCE & PROJECTS EXPAND/COLLAPSE (MOBILE) ---------
  const expandToggles = document.querySelectorAll('.expand-toggle');
  expandToggles.forEach(toggle => {
    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const entry = toggle.closest('.experience-entry, .project-entry');
      const bullets = entry.querySelector('.entry-bullets');
      const pics = entry.querySelector('.entry-pics');
      const tags = entry.querySelector('.project-tags');
      
      const isExpanded = toggle.classList.contains('expanded');
      
      if (isExpanded) {
        // Collapse
        toggle.classList.remove('expanded');
        if (bullets) {
          bullets.classList.remove('mobile-expanded');
          bullets.classList.add('mobile-collapsed');
        }
        if (pics) {
          pics.classList.remove('mobile-expanded');
          pics.classList.add('mobile-collapsed');
        }
        if (tags) {
          tags.classList.remove('mobile-expanded');
          tags.classList.add('mobile-collapsed');
        }
      } else {
        // Expand
        toggle.classList.add('expanded');
        if (bullets) {
          bullets.classList.remove('mobile-collapsed');
          bullets.classList.add('mobile-expanded');
        }
        if (pics) {
          pics.classList.remove('mobile-collapsed');
          pics.classList.add('mobile-expanded');
        }
        if (tags) {
          tags.classList.remove('mobile-collapsed');
          tags.classList.add('mobile-expanded');
        }
      }
    });
  });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
      if (window.innerWidth <= 768 && 
          !sidebar.contains(e.target) && 
          !mobileMenuToggle.contains(e.target) &&
          sidebar.classList.contains('mobile-open')) {
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
        sidebar.classList.remove('mobile-open');
      }
    });
  }

  // --------- LAZY LOADING & SKELETON STATES ---------
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        
        // Handle image load
        img.addEventListener('load', () => {
          img.classList.add('loaded');
          // Hide skeleton
          const skeleton = img.previousElementSibling;
          if (skeleton && skeleton.classList.contains('skeleton')) {
            skeleton.classList.add('hidden');
          }
        }, { once: true });

        // Handle image error
        img.addEventListener('error', () => {
          img.classList.add('loaded'); // Still show it, just without skeleton
          const skeleton = img.previousElementSibling;
          if (skeleton && skeleton.classList.contains('skeleton')) {
            skeleton.classList.add('hidden');
          }
        }, { once: true });

        // If image is already loaded (cached), trigger immediately
        if (img.complete) {
          img.classList.add('loaded');
          const skeleton = img.previousElementSibling;
          if (skeleton && skeleton.classList.contains('skeleton')) {
            skeleton.classList.add('hidden');
          }
        }

        observer.unobserve(img);
      }
    });
  }, {
    rootMargin: '50px' // Start loading 50px before image enters viewport
  });

  lazyImages.forEach(img => {
    imageObserver.observe(img);
  });

  // Handle entry-pics skeletons (they're siblings, not previous)
  const entryPics = document.querySelectorAll('.entry-pics');
  entryPics.forEach(picsContainer => {
    const pics = picsContainer.querySelectorAll('.entry-pic');
    pics.forEach((pic) => {
      // Find the skeleton that comes before this pic
      let skeleton = pic.previousElementSibling;
      while (skeleton && !skeleton.classList.contains('skeleton-pic')) {
        skeleton = skeleton.previousElementSibling;
      }
      
      const handleLoad = () => {
        pic.classList.add('loaded');
        if (skeleton && skeleton.classList.contains('skeleton-pic')) {
          skeleton.classList.add('hidden');
        }
      };

      pic.addEventListener('load', handleLoad, { once: true });
      pic.addEventListener('error', handleLoad, { once: true });

      if (pic.complete) {
        handleLoad();
      }
    });
  });

});