$(document).ready(function () {
  $(".reviews__slider").slick({
    dots: true,
    autoplay: false,
    speed: 1000,
    infinite: true,
    prevArrow:
      '<button type="button" class="slick-prev"><svg width="35" height="35" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M34.83 18.601H5.125l14.27 14.341-1.641 1.65L.68 17.435 17.756.275l1.642 1.65L5.125 16.268H34.83v2.333Z" fill="#333"/></svg></button>',
    nextArrow:
      '<button type="button" class="slick-next"><svg width="35" height="35" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#a)"><path fill-rule="evenodd" clip-rule="evenodd" d="M34.15 17.435 17.073 34.594l-1.642-1.65 14.27-14.34H0V16.27h29.705L15.432 1.925l1.641-1.65 17.076 17.16Z" fill="#333"/></g><defs><clipPath id="a"><path fill="#fff" d="M0 0h35v35H0z"/></clipPath></defs></svg></button>',
    responsive: [
      {
        breakpoint: 769,
        settings: {
          arrows: false,
        },
      },
    ],
  });

  Fancybox.bind("[data-fancybox]", {});

  (function initHeaderAndMenu() {
    const header = document.querySelector(".header__top");
    const menuLinks = document.querySelectorAll('.menu__list-a[href^="#"]');
    const sections = document.querySelectorAll("section[id]");
    const menuBtn = document.querySelector(".menu__btn");
    const menuList = document.querySelector(".menu__list");

    if (!header || !menuBtn || !menuList) return;

    let lastScrollTop = 0;
    let isMobileMenuOpen = false;

    function handleHeaderBackground() {
      if (window.scrollY > 50) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    }

    function handleHeaderOnScroll() {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;

      if (isMobileMenuOpen && scrollTop > lastScrollTop) {
        closeMobileMenu();
      }

      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;

      handleHeaderBackground();
    }

    function closeMobileMenu() {
      menuBtn.classList.remove("active");
      menuList.classList.remove("active");
      document.body.classList.remove("menu-open");
      isMobileMenuOpen = false;
    }

    function openMobileMenu() {
      menuBtn.classList.add("active");
      menuList.classList.add("active");
      document.body.classList.add("menu-open");
      isMobileMenuOpen = true;
    }

    menuBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      if (menuBtn.classList.contains("active")) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });

    document.addEventListener("click", function (e) {
      if (
        isMobileMenuOpen &&
        !menuList.contains(e.target) &&
        !menuBtn.contains(e.target)
      ) {
        closeMobileMenu();
      }
    });

    menuLinks.forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault();

        const targetID = this.getAttribute("href");
        const target = document.querySelector(targetID);
        if (!target) return;

        const headerHeight = header.offsetHeight;

        const position =
          target.getBoundingClientRect().top +
          window.pageYOffset -
          headerHeight -
          10;

        window.scrollTo({
          top: position,
          behavior: "smooth",
        });

        closeMobileMenu();
      });
    });

    function activateMenu() {
      let scrollPosition = window.scrollY + header.offsetHeight + 50;

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionID = section.getAttribute("id");

        if (
          scrollPosition >= sectionTop &&
          scrollPosition < sectionTop + sectionHeight
        ) {
          menuLinks.forEach((link) => {
            link.classList.remove("active");

            if (link.getAttribute("href") === `#${sectionID}`) {
              link.classList.add("active");
            }
          });
        }
      });
    }

    function createScrollTopButton() {
      const oldBtn = document.querySelector(".scroll-top");
      if (oldBtn) oldBtn.remove();

      const scrollTopBtn = document.createElement("button");
      scrollTopBtn.className = "scroll-top";
      scrollTopBtn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="50px" height="50px" viewBox="0 0 50 50">
                <path style="stroke:none;fill-rule:evenodd;fill:#9c9c9c;fill-opacity:1;"
                    d="M 35.210938 25.84375 C 34.601562 26.453125 33.613281 26.453125 33 25.84375 L 26.5625 19.390625 L 26.5625 35.9375 C 26.5625 36.796875 25.863281 37.5 25 37.5 C 24.136719 37.5 23.4375 36.796875 23.4375 35.9375 L 23.4375 19.390625 L 17 25.84375 C 16.386719 26.453125 15.398438 26.453125 14.789062 25.84375 C 14.179688 25.21875 14.179688 24.234375 14.789062 23.625 L 23.625 14.78125 C 24 14.40625 24.515625 14.296875 25 14.390625 C 25.484375 14.296875 26 14.40625 26.375 14.78125 L 35.210938 23.625 C 35.820312 24.234375 35.820312 25.21875 35.210938 25.84375 Z M 25 0 C 11.191406 0 0 11.1875 0 25 C 0 38.8125 11.191406 50 25 50 C 38.808594 50 50 38.8125 50 25 C 50 11.1875 38.808594 0 25 0 Z M 25 0" />
            </svg>
        `;

      document.body.appendChild(scrollTopBtn);

      scrollTopBtn.addEventListener("click", () => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      });

      window.addEventListener("scroll", () => {
        if (window.scrollY > 600) {
          scrollTopBtn.classList.add("visible");
        } else {
          scrollTopBtn.classList.remove("visible");
        }
      });
    }

    const oldBtnUp = document.querySelector(".btn-up");
    if (oldBtnUp) oldBtnUp.remove();

    handleHeaderBackground();
    handleHeaderOnScroll();
    activateMenu();
    createScrollTopButton();

    window.addEventListener("scroll", () => {
      handleHeaderOnScroll();
      activateMenu();
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 768 && isMobileMenuOpen) {
        closeMobileMenu();
      }
    });
  })();
});
