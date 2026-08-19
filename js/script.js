/* =========================================================
   UDAYAN SONGHO — PREMIUM INTERACTIONS
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Bengali numeral helper ---------- */

  const bnDigits = ['০','১','২','৩','৪','৫','৬','৭','৮','৯'];

  const toBn = (value) =>
    String(value).replace(/[0-9]/g, digit => bnDigits[digit]);

  const prefersReduced =
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;


  /* =========================================================
     FOOTER YEAR
     ========================================================= */

  const yearEl = document.getElementById('year');

  if (yearEl) {
    yearEl.textContent = toBn(new Date().getFullYear());
  }


  /* =========================================================
     NAVIGATION
     ========================================================= */

  const nav = document.getElementById('nav');
  const navLinks = document.getElementById('navLinks');
  const navToggle = document.getElementById('navToggle');

  const linkEls = document.querySelectorAll('.nav__link');

  const toTopBtn = document.getElementById('toTop');


  function handleScroll() {

    const scrollY = window.scrollY;

    if (nav) {
      nav.classList.toggle('is-scrolled', scrollY > 35);
    }

    if (toTopBtn) {
      toTopBtn.classList.toggle('is-visible', scrollY > 550);
    }
  }


  /* ---------- Mobile menu ---------- */

  if (navToggle && navLinks) {

    navToggle.addEventListener('click', () => {

      const isOpen =
        navLinks.classList.toggle('is-open');

      navToggle.setAttribute(
        'aria-expanded',
        String(isOpen)
      );

    });


    /* Close menu after clicking link */

    linkEls.forEach(link => {

      link.addEventListener('click', () => {

        navLinks.classList.remove('is-open');

        navToggle.setAttribute(
          'aria-expanded',
          'false'
        );

      });

    });


    /* Close menu when clicking outside */

    document.addEventListener('click', event => {

      if (!navLinks.classList.contains('is-open')) {
        return;
      }

      if (
        !navLinks.contains(event.target) &&
        !navToggle.contains(event.target)
      ) {

        navLinks.classList.remove('is-open');

        navToggle.setAttribute(
          'aria-expanded',
          'false'
        );

      }

    });

  }


  /* =========================================================
     ACTIVE NAVIGATION SECTION
     ========================================================= */

  const sections =
    document.querySelectorAll('section[id]');


  if ('IntersectionObserver' in window) {

    const sectionObserver =
      new IntersectionObserver(

        entries => {

          entries.forEach(entry => {

            if (!entry.isIntersecting) {
              return;
            }

            const sectionId =
              entry.target.id;


            linkEls.forEach(link => {

              const linkTarget =
                link.getAttribute('href');

              link.classList.toggle(
                'is-active',
                linkTarget === `#${sectionId}`
              );

            });

          });

        },

        {
          rootMargin: '-42% 0px -48% 0px'
        }

      );


    sections.forEach(section => {

      sectionObserver.observe(section);

    });

  }


  /* =========================================================
     HERO STAR / SPARK EFFECT
     ========================================================= */

  const heroSky =
    document.getElementById('heroSky');


  if (heroSky && !prefersReduced) {

    const sparkCount =
      window.innerWidth < 600 ? 30 : 58;


    const fragment =
      document.createDocumentFragment();


    for (let i = 0; i < sparkCount; i++) {

      const spark =
        document.createElement('span');


      spark.className = 'spark';


      spark.style.left =
        `${Math.random() * 100}%`;


      spark.style.top =
        `${Math.random() * 78}%`;


      spark.style.animationDelay =
        `${(Math.random() * 4).toFixed(2)}s`;


      spark.style.animationDuration =
        `${(2.5 + Math.random() * 3).toFixed(2)}s`;


      fragment.appendChild(spark);

    }


    heroSky.appendChild(fragment);

  }


  /* =========================================================
     COUNTDOWN
     ========================================================= */

  /*
    নিশীথ কাল
    ৮ নভেম্বর ২০২৬
    ২৩:৩৯ IST
  */

  const target =
    new Date(
      '2026-11-08T23:39:00+05:30'
    ).getTime();


  const cdDays =
    document.getElementById('cdDays');

  const cdHours =
    document.getElementById('cdHours');

  const cdMins =
    document.getElementById('cdMins');

  const cdSecs =
    document.getElementById('cdSecs');

  const cdLabel =
    document.querySelector(
      '.hero__countdown-label'
    );


  function updateCountdown() {

    const difference =
      target - Date.now();


    /* Puja time reached */

    if (difference <= 0) {

      if (cdLabel) {

        cdLabel.textContent =
          'শুভ কালী পুজো! জয় মা কালী 🙏';

      }


      [
        cdDays,
        cdHours,
        cdMins,
        cdSecs
      ].forEach(element => {

        if (element) {
          element.textContent =
            toBn('00');
        }

      });

      return;

    }


    const days =
      Math.floor(
        difference / 86400000
      );


    const hours =
      Math.floor(
        (difference % 86400000) /
        3600000
      );


    const minutes =
      Math.floor(
        (difference % 3600000) /
        60000
      );


    const seconds =
      Math.floor(
        (difference % 60000) /
        1000
      );


    if (cdDays) {
      cdDays.textContent =
        toBn(days);
    }


    if (cdHours) {
      cdHours.textContent =
        toBn(
          String(hours).padStart(2, '0')
        );
    }


    if (cdMins) {
      cdMins.textContent =
        toBn(
          String(minutes).padStart(2, '0')
        );
    }


    if (cdSecs) {
      cdSecs.textContent =
        toBn(
          String(seconds).padStart(2, '0')
        );
    }

  }


  updateCountdown();

  setInterval(
    updateCountdown,
    1000
  );


  /* =========================================================
     SCROLL REVEAL
     ========================================================= */

  const revealElements =
    document.querySelectorAll('.reveal');


  if (
    prefersReduced ||
    !('IntersectionObserver' in window)
  ) {

    revealElements.forEach(element => {

      element.classList.add(
        'is-visible'
      );

    });

  } else {

    const revealObserver =
      new IntersectionObserver(

        entries => {

          entries.forEach(entry => {

            if (!entry.isIntersecting) {
              return;
            }


            entry.target.classList.add(
              'is-visible'
            );


            revealObserver.unobserve(
              entry.target
            );

          });

        },

        {
          threshold: 0.14
        }

      );


    revealElements.forEach(element => {

      revealObserver.observe(element);

    });

  }


  /* =========================================================
     GALLERY DATA
     ========================================================= */

  const galleryData = [

    {
      year: '2025',
      src: 'PHOTO2.PNG',
      caption: 'প্রতিমা নিরঞ্জন'
    },

    {
      year: '2025',
      src: 'PHOTO3.PNG',
      caption: 'সন্ধ্যারতি'
    },

    {
      year: '2025',
      src: 'PHOTO4.PNG',
      caption: 'ভোগ বিতরণ'
    },

    {
      year: '2025',
      src: 'PHOTO5.PNG',
      caption: 'সাংস্কৃতিক সন্ধ্যা'
    },

    {
      year: '2024',
      src: 'PHOTO6.PNG',
      caption: 'প্যান্ডেল সজ্জা'
    },

    {
      year: '2024',
      src: 'PHOTO7.PNG',
      caption: 'শোভাযাত্রা'
    },

    {
      year: '2024',
      src: 'PHOTO8.PNG',
      caption: 'প্রতিমা দর্শন'
    },

    {
      year: '2024',
      src: 'PHOTO9.PNG',
      caption: 'পাড়ার আড্ডা'
    },

    {
      year: '2023',
      src: 'PHOTO10.PNG',
      caption: 'ঢাকের বোল'
    },

    {
      year: '2023',
      src: 'PHOTO11.PNG',
      caption: 'আলোকসজ্জা'
    },

    {
      year: '2023',
      src: 'PHOTO12.PNG',
      caption: 'শিশুদের অনুষ্ঠান'
    },

    {
      year: '2023',
      src: 'PHOTO13.PNG',
      caption: 'মহাপ্রসাদ'
    }

  ];


  /* =========================================================
     RENDER GALLERY
     ========================================================= */

  const galleryGrid =
    document.getElementById(
      'galleryGrid'
    );


  const galleryTabs =
    document.getElementById(
      'galleryTabs'
    );


  function renderGallery() {

    if (!galleryGrid) {
      return;
    }


    galleryGrid.innerHTML = '';


    galleryData.forEach(
      (item, index) => {

        const figure =
          document.createElement(
            'div'
          );


        figure.className =
          'gitem';


        figure.dataset.year =
          item.year;


        figure.dataset.index =
          index;


        figure.tabIndex = 0;


        figure.setAttribute(
          'role',
          'button'
        );


        figure.setAttribute(
          'aria-label',
          `${item.caption}, ${item.year}`
        );


        figure.innerHTML = `

          <img
            src="${item.src}"
            alt="${item.caption} — উদয়ন সংঘ ${item.year}"
            loading="lazy"
          >

          <div class="gitem__overlay">

            <span class="gitem__year">
              ${toBn(item.year)}
            </span>

            <span class="gitem__cap">
              ${item.caption}
            </span>

          </div>

        `;


        figure.addEventListener(
          'click',
          () => openLightbox(index)
        );


        figure.addEventListener(
          'keydown',
          event => {

            if (
              event.key === 'Enter' ||
              event.key === ' '
            ) {

              event.preventDefault();

              openLightbox(index);

            }

          }
        );


        galleryGrid.appendChild(
          figure
        );

      }
    );

  }


  renderGallery();


  /* =========================================================
     GALLERY FILTER
     ========================================================= */

  if (galleryTabs && galleryGrid) {

    galleryTabs.addEventListener(
      'click',
      event => {

        const button =
          event.target.closest(
            '.gtab'
          );


        if (!button) {
          return;
        }


        galleryTabs
          .querySelectorAll('.gtab')
          .forEach(tab => {

            tab.classList.remove(
              'is-active'
            );

            tab.setAttribute(
              'aria-selected',
              'false'
            );

          });


        button.classList.add(
          'is-active'
        );


        button.setAttribute(
          'aria-selected',
          'true'
        );


        const selectedYear =
          button.dataset.year;


        galleryGrid
          .querySelectorAll('.gitem')
          .forEach(item => {

            const show =
              selectedYear === 'all' ||
              item.dataset.year === selectedYear;


            item.classList.toggle(
              'is-hidden',
              !show
            );

          });

      }
    );

  }


  /* =========================================================
     LIGHTBOX
     ========================================================= */

  const lightbox =
    document.getElementById(
      'lightbox'
    );


  const lightboxImg =
    document.getElementById(
      'lightboxImg'
    );


  const lightboxCaption =
    document.getElementById(
      'lightboxCaption'
    );


  let currentIndex = 0;


  function updateLightbox() {

    const item =
      galleryData[currentIndex];


    if (!item || !lightboxImg) {
      return;
    }


    lightboxImg.src =
      item.src;


    lightboxImg.alt =
      item.caption;


    if (lightboxCaption) {

      lightboxCaption.textContent =
        `${item.caption} · ${toBn(item.year)}`;

    }

  }


  function openLightbox(index) {

    if (!lightbox) {
      return;
    }


    currentIndex =
      index;


    updateLightbox();


    lightbox.classList.add(
      'is-open'
    );


    lightbox.setAttribute(
      'aria-hidden',
      'false'
    );


    document.body.style.overflow =
      'hidden';


    document
      .getElementById('lightboxClose')
      ?.focus();

  }


  function closeLightbox() {

    if (!lightbox) {
      return;
    }


    lightbox.classList.remove(
      'is-open'
    );


    lightbox.setAttribute(
      'aria-hidden',
      'true'
    );


    document.body.style.overflow =
      '';

  }


  function nextImage() {

    currentIndex =
      (currentIndex + 1) %
      galleryData.length;


    updateLightbox();

  }


  function previousImage() {

    currentIndex =
      (
        currentIndex -
        1 +
        galleryData.length
      ) %
      galleryData.length;


    updateLightbox();

  }


  document
    .getElementById('lightboxClose')
    ?.addEventListener(
      'click',
      closeLightbox
    );


  document
    .getElementById('lightboxNext')
    ?.addEventListener(
      'click',
      nextImage
    );


  document
    .getElementById('lightboxPrev')
    ?.addEventListener(
      'click',
      previousImage
    );


  if (lightbox) {

    lightbox.addEventListener(
      'click',
      event => {

        if (
          event.target === lightbox
        ) {

          closeLightbox();

        }

      }
    );

  }


  /* ---------- Keyboard controls ---------- */

  document.addEventListener(
    'keydown',
    event => {

      if (
        !lightbox ||
        !lightbox.classList.contains(
          'is-open'
        )
      ) {

        return;

      }


      if (event.key === 'Escape') {
        closeLightbox();
      }


      if (event.key === 'ArrowRight') {
        nextImage();
      }


      if (event.key === 'ArrowLeft') {
        previousImage();
      }

    }
  );


  /* =========================================================
     BACK TO TOP
     ========================================================= */

  if (toTopBtn) {

    toTopBtn.addEventListener(
      'click',
      () => {

        window.scrollTo({

          top: 0,

          behavior:
            prefersReduced
              ? 'auto'
              : 'smooth'

        });

      }
    );

  }


  /* =========================================================
     GLOBAL SCROLL
     ========================================================= */

  window.addEventListener(
    'scroll',
    handleScroll,
    {
      passive: true
    }
  );


  handleScroll();

});