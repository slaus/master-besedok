// Мобильное меню бургер
const burgerMenu = () => {
  const burger = document.querySelector('.burger');
  const menu = document.querySelector('.menu');
  const body = document.querySelector('body');

  burger.addEventListener('click', () => {
      if (!menu.classList.contains('active')) {
          menu.classList.add('active');
          burger.classList.add('active');
          body.classList.add('locked');
      } else {
          menu.classList.remove('active');
          burger.classList.remove('active');
          body.classList.remove('locked');
      }
  });

  window.addEventListener('resize', () => {
      if (window.innerWidth > 991) {
          menu.classList.remove('active');
          burger.classList.remove('active');
          body.classList.remove('locked');
      }
  });
};

burgerMenu();


/** Search */
const search = document.querySelector("#search");
const searchInput = document.querySelector(".header__search-form--input");

search.addEventListener("click", (e) => {
  e.stopPropagation();
  search.classList.toggle("open");
});

document.addEventListener("click", (e) => {
  if (!search.contains(e.target)) {
    search.classList.remove("open");
  }
});

searchInput.addEventListener("click", (e) => {
  e.stopPropagation();
});



/** Calc */
const dropdowns = document.querySelectorAll('.calc__form-dropdown');

  dropdowns.forEach((dropdown) => {
    dropdown.addEventListener('click', (event) => {
      event.preventDefault();
      const target = event.target;
      const group = target.closest('.calc__form-group');

      if (target.tagName === 'A') {
        const selectedText = group.querySelector('.calc__form-selected');
        selectedText.textContent = target.getAttribute('data-value');
        selectedText.classList.add("selected");
        group.querySelector("span").style.display = 'none';
      }
    });
  });


/** Модальное окно */
const getScrollbarWidth = () => {
  const scrollDiv = document.createElement('div');
  scrollDiv.style.visibility = 'hidden';
  scrollDiv.style.overflow = 'scroll';
  scrollDiv.style.width = '100px';
  scrollDiv.style.height = '100px';
  document.body.appendChild(scrollDiv);

  const scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
  document.body.removeChild(scrollDiv);
  return scrollbarWidth;
};

const bindModal = (trigger, modal, close) => {
  trigger = document.querySelectorAll(trigger);
  modal = document.querySelector(modal);
  close = document.querySelector(close);

  const body = document.body;

  const applyPaddingForScrollbar = () => {
    const scrollbarWidth = getScrollbarWidth();
    body.style.paddingRight = `${scrollbarWidth}px`;
  };

  const removePaddingForScrollbar = () => {
    body.style.paddingRight = '';
  };

  trigger.forEach((item) => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      modal.style.display = 'flex';
      body.classList.add('locked');
      applyPaddingForScrollbar();
    });
  });

  close.addEventListener('click', () => {
    modal.style.display = 'none';
    body.classList.remove('locked');
    removePaddingForScrollbar();
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
      body.classList.remove('locked');
      removePaddingForScrollbar();
    }
  });
};

bindModal('.callback', '#callback-modal', '#callback-close');


/** Tabs */
const tabs = (headerSelector, tabSelector, contentSelector, activeClass, display='grid') => {
  const header = document.querySelector(headerSelector),
        tab = document.querySelectorAll(tabSelector),
        content = document.querySelectorAll(contentSelector);
  
        const hideTabContent = () => {
      content.forEach(item => {
          item.style.display = 'none';
      });
      tab.forEach(item => {
          item.classList.remove(activeClass);
      });
  };

  const showTabContent = (i = 0) => {
     content[i].style.display = display;
     tab[i].classList.add(activeClass);
  };

  hideTabContent();
  showTabContent();
  
  header.addEventListener('click', e => {
      const target = e.target;
      if (target.classList.contains(tabSelector.replace(/\./, '')) || 
      target.parentNode.classList.contains(tabSelector.replace(/\./, ''))) {
          tab.forEach((item, i) => {
              if ( target == item || target.parentNode == item ) {
                  hideTabContent();
                  showTabContent(i);
              }
          });
      };
  });
};

tabs( '.projects__buttons' ,'.projects__buttons-item', '.projects__block', 'active');
tabs( '.steps__buttons' ,'.steps__buttons-item', '.steps__block', 'active');



/** Swiper slider */
const swiperSlider = new Swiper('.swiper-slider', {
  slidesPerView: 1,
  loop: true,
  mousewheel: false,
  grabCursor: true,
  autoplay: {
    delay: 15000,
    disableOnInteraction: false,
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  keyboard: {
    enabled: true,
  },
});

const swiperBest = new Swiper('.swiper-best', {
  slidesPerView: 1,
  spaceBetween: 10,
  loop: true,
  mousewheel: false,
  grabCursor: true,
  autoplay: {
    delay: 15000,
    disableOnInteraction: false,
  },
  pagination: {
    el: '.swiper-pagination',
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  keyboard: {
    enabled: true,
  },
  scrollbar: {
    el: '.swiper-scrollbar',
  },
  breakpoints: {
    480: {
      slidesPerView: 1,
      spaceBetween: 10
    },
    577: {
      slidesPerView: 2,
      spaceBetween: 10
    },
    992: {
      slidesPerView: 2,
      spaceBetween: 10
    },
    1200: {
      slidesPerView: 3,
      spaceBetween: 20
    },
  }
});

const swiperIndividual = new Swiper('.swiper-individual', {
  slidesPerView: 1,
  spaceBetween: 10,
  loop: true,
  mousewheel: false,
  grabCursor: true,
  autoplay: {
    delay: 15000,
    disableOnInteraction: false,
  },
  pagination: {
    el: '.swiper-pagination',
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  keyboard: {
    enabled: true,
  },
  scrollbar: {
    el: '.swiper-scrollbar',
  },
  breakpoints: {
    480: {
      slidesPerView: 1,
      spaceBetween: 10
    },
    577: {
      slidesPerView: 2,
      spaceBetween: 10
    },
    992: {
      slidesPerView: 2,
      spaceBetween: 10
    },
    1200: {
      slidesPerView: 3,
      spaceBetween: 20
    },
  }
});

const swiperVideo = new Swiper('.swiper-video', {
  slidesPerView: 1,
  spaceBetween: 10,
  loop: true,
  mousewheel: false,
  grabCursor: true,
  autoplay: {
    delay: 15000,
    disableOnInteraction: false,
  },
  pagination: {
    el: '.swiper-pagination',
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  keyboard: {
    enabled: true,
  },
  scrollbar: {
    el: '.swiper-scrollbar',
  },
  breakpoints: {
    480: {
      slidesPerView: 1,
      spaceBetween: 10
    },
    577: {
      slidesPerView: 2,
      spaceBetween: 10
    },
    992: {
      slidesPerView: 2,
      spaceBetween: 10
    },
    1200: {
      slidesPerView: 3,
      spaceBetween: 20
    },
  }
});

const swiperCert = new Swiper('.swiper-cert', {
  slidesPerView: 1,
  spaceBetween: 10,
  loop: true,
  mousewheel: false,
  grabCursor: true,
  autoplay: {
    delay: 15000,
    disableOnInteraction: false,
  },
  pagination: {
    el: '.swiper-pagination',
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  keyboard: {
    enabled: true,
  },
  scrollbar: {
    el: '.swiper-scrollbar',
  },
  breakpoints: {
    480: {
      slidesPerView: 2,
      spaceBetween: 10
    },
    992: {
      slidesPerView: 3,
      spaceBetween: 10
    },
    1200: {
      slidesPerView: 4,
      spaceBetween: 20
    },
    1450: {
      slidesPerView: 5,
      spaceBetween: 20
    },
  }
});

const swiperTerms = new Swiper('.swiper-gerb', {
  slidesPerView: 1,
  spaceBetween: 10,
  loop: true,
  mousewheel: false,
  grabCursor: true,
  autoplay: {
    delay: 15000,
    disableOnInteraction: false,
  },
  pagination: {
    el: '.swiper-pagination',
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  keyboard: {
    enabled: true,
  },
  scrollbar: {
    el: '.swiper-scrollbar',
  },
  breakpoints: {
    480: {
      slidesPerView: 2,
      spaceBetween: 10
    },
    768: {
      slidesPerView: 4,
      spaceBetween: 10
    },
    992: {
      slidesPerView: 5,
      spaceBetween: 10
    },
    1200: {
      slidesPerView: 6,
      spaceBetween: 20
    },
    1500: {
      slidesPerView: 7,
      spaceBetween: 20
    },
  }
});


/** Mobile swiper */
function initSwipers(swiperSelectors) {
  const isMobile = window.innerWidth <= 1199;

  swiperSelectors.forEach((selector) => {
    const swiperEl = document.querySelector(selector);

    if (!swiperEl) return;

    if (isMobile) {
      if (!swiperEl.classList.contains('swiper-initialized')) {
        swiperEl.classList.add('swiper');
        const swiper = new Swiper(selector, {
          slidesPerView: 1,
          spaceBetween: 10,
          loop: true,
          mousewheel: false,
          grabCursor: true,
          autoplay: {
            delay: 7500,
            disableOnInteraction: false,
          },
          pagination: {
            el: `${selector} .swiper-pagination`,
          },
          navigation: {
            nextEl: `${selector} .swiper-button-next`,
            prevEl: `${selector} .swiper-button-prev`,
          },
          keyboard: {
            enabled: true,
          },
          scrollbar: {
            el: `${selector} .swiper-scrollbar`,
          },
          breakpoints: {
            480: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            577: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            992: {
              slidesPerView: 3,
              spaceBetween: 10,
            },
          },
        });

        swiperEl.swiperInstance = swiper;
      }
    } else {
      if (swiperEl.classList.contains('swiper-initialized')) {
        swiperEl.swiperInstance.destroy(true, true);
        swiperEl.classList.remove('swiper');
        delete swiperEl.swiperInstance;
      }
    }
  });
}

const swiperClasses = ['.swiper-making', '.swiper-project-1', '.swiper-project-2', '.swiper-project-3', '.swiper-project-4', '.swiper-project-5', '.swiper-steps-1', '.swiper-steps-2', '.swiper-other'];

window.addEventListener('load', () => initSwipers(swiperClasses));
window.addEventListener('resize', () => initSwipers(swiperClasses));