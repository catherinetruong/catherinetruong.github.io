// ================== PAGE INTERACTIVITY ==================
document.addEventListener("DOMContentLoaded", () => {

  // --------- DOWNLOAD BUTTON HOVER ---------
  const downloadBtnImg = document.querySelector('.download-btn img');
  if (downloadBtnImg) {
    const downloadInactive = 'images/download_inactive.png';
    const downloadActive = 'images/download_active.png';

    downloadBtnImg.addEventListener('mouseenter', () => downloadBtnImg.src = downloadActive);
    downloadBtnImg.addEventListener('mouseleave', () => downloadBtnImg.src = downloadInactive);
  }

  // --------- NAV ITEMS / PAGE SWITCHING ---------
  const navItems = document.querySelectorAll('.nav-item');
  const contentSections = document.querySelectorAll('.content-section');

  if (navItems.length && contentSections.length) {
    const navData = Array.from(navItems).map(item => ({
      item,
      img: item.querySelector('img'),
      activeSrc: item.querySelector('img').src,
      inactiveSrc: item.dataset.altImage
    }));

    let activeIndex = 0; // default section

    const updateNavIcons = () => {
      navData.forEach((nav, index) => {
        nav.img.src = (index === activeIndex) ? nav.activeSrc : nav.inactiveSrc;
      });
    };

    contentSections.forEach((section, i) => section.classList.toggle('active', i === activeIndex));
    updateNavIcons();

    navData.forEach((nav, index) => {
      nav.item.addEventListener('mouseenter', () => {
        if (index !== activeIndex) nav.img.src = nav.inactiveSrc;
      });
      nav.item.addEventListener('mouseleave', updateNavIcons);

      nav.item.addEventListener('click', () => {
        activeIndex = index;
        contentSections.forEach((section, i) => section.classList.toggle('active', i === activeIndex));
        updateNavIcons();
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
        skillPopup.style.opacity = 1;
      });
    });

    closePopup.addEventListener('click', () => {
      skillPopup.style.display = 'none';
    });
  }

  // --------- CONTACT ICONS ---------
  const contactItems = document.querySelectorAll('.contact-item img');
  contactItems.forEach(img => {
    const srcInactive = img.src;
    const srcActive = srcInactive.replace('_inactive', '_active');

    img.addEventListener('mouseenter', () => img.src = srcActive);
    img.addEventListener('mouseleave', () => img.src = srcInactive);

    img.addEventListener('click', () => {
      if (img.alt.includes('LinkedIn')) {
        window.open('https://www.linkedin.com/in/catherinedaitruong', '_blank');
      } else if (img.alt.includes('Email')) {
        window.location.href = 'mailto:catherinedaitruong@gmail.com';
      }
    });
  });

  // ================== PROJECT TAG FILTER ==================
  const tagButtons = document.querySelectorAll('.tag-button');
  const projectCards = document.querySelectorAll('.project-card');
  const viewAllButton = document.querySelector('#view-all');

  if (tagButtons.length && projectCards.length && viewAllButton) {
    const activeTags = new Set();

    tagButtons.forEach(button => {
      button.addEventListener('click', () => {
        const tag = button.dataset.tag;

        // Skip "View All" (handled below)
        if (button.id === 'view-all') return;

        // Deselect "View All" if active
        viewAllButton.classList.remove('active');

        // Toggle tag state
        if (activeTags.has(tag)) {
          activeTags.delete(tag);
          button.classList.remove('active');
        } else {
          activeTags.add(tag);
          button.classList.add('active');
        }

        filterProjects();
      });
    });

    // "View All" resets everything
    viewAllButton.addEventListener('click', () => {
      activeTags.clear();
      tagButtons.forEach(btn => btn.classList.remove('active'));
      viewAllButton.classList.add('active');
      showAllProjects();
    });

    // Filter projects (OR logic)
    function filterProjects() {
      if (activeTags.size === 0) {
        showAllProjects();
        return;
      }

      projectCards.forEach(card => {
        const projectTags = card.dataset.tags.split(',').map(tag => tag.trim().toLowerCase());
        const matches = [...activeTags].some(tag => projectTags.includes(tag.toLowerCase()));

        if (matches) {
          card.style.display = 'flex';
          card.classList.add('fade-in');
        } else {
          card.style.display = 'none';
          card.classList.remove('fade-in');
        }
      });
    }

    // Show all projects
    function showAllProjects() {
      projectCards.forEach(card => {
        card.style.display = 'flex';
        card.classList.add('fade-in');
      });
    }

    // Initialize
    showAllProjects();
  }

});
