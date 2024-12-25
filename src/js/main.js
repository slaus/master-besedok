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
            body.classList.add('open');
        } else {
            menu.classList.remove('active');
            burger.classList.remove('active');
            body.classList.remove('locked');
            body.classList.remove('open');
        }
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 991) {
            menu.classList.remove('active');
            burger.classList.remove('active');
            body.classList.remove('locked');
            body.classList.remove('open');
        }
    });
};

burgerMenu();



/** Catalog menu */
const catalog = document.querySelector("#catalog");
const menu = document.querySelector(".catalog__menu");

catalog.addEventListener("click", (e) => {
    e.preventDefault();
    catalog.classList.toggle("active");
    menu.classList.toggle("active");
});

const catalogItems = document.querySelectorAll('.catalog__item-parent');

catalogItems.forEach((item) => {
    const link = item.querySelector('a.catalog__item-link');
    const span = item.querySelector('a.catalog__item-link span');

    if (span) {
        span.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();

            const submenu = item.querySelector('.submenu');

            if (submenu.classList.contains('active')) {
                submenu.classList.remove('active');
                item.classList.remove('active');
            } else {
                catalogItems.forEach((otherItem) => {
                    const otherSubmenu = otherItem.querySelector('.submenu');
                    if (otherSubmenu) {
                        otherSubmenu.classList.remove('active');
                    }
                    otherItem.classList.remove('active');
                });

                submenu.classList.add('active');
                item.classList.add('active');
            }
        });
    }

    link.addEventListener('click', (e) => {
        if (e.target === span) {
            e.preventDefault();
        } else {
            window.location.href = link.href;
        }
    });

    const submenuLinks = item.querySelectorAll('.submenu__item-link');
    submenuLinks.forEach((submenuLink) => {
        submenuLink.addEventListener('click', (e) => {
            e.stopPropagation();
            window.location.href = submenuLink.href;
        });
    });
});



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
try {
    const tabs = (headerSelector, tabSelector, contentSelector, activeClass, display = 'grid') => {
        const header = document.querySelector(headerSelector);
        if (!header) {
            return;
        }
        const tab = document.querySelectorAll(tabSelector),
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
                    if (target == item || target.parentNode == item) {
                        hideTabContent();
                        showTabContent(i);
                    }
                });
            };
        });
    };

    tabs('.projects__buttons', '.projects__buttons-item', '.projects__block', 'active');
    tabs('.steps__buttons', '.steps__buttons-item', '.steps__block', 'active');
    tabs('.params__buttons', '.params__buttons-item', '.params__block', 'active', 'flex');
} catch (error) { }


/** Show active item */
const activeItem = (trigger) => {
    const parentBlock = document.querySelector(trigger);
    if (!parentBlock) return;

    const items = parentBlock.querySelectorAll("a");
    items.forEach((item) => {
        item.addEventListener("click", (e) => {
            e.preventDefault();
            items.forEach((el) => el.classList.remove("active"));
            e.target.classList.add("active");
        });
    });
};

try {
    activeItem("#show");
    activeItem("#perelink");
} catch (error) { }


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
        768: {
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
    slidesPerView: 2,
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

const swiperIndividualAbout = new Swiper('.swiper-individual-about', {
    slidesPerView: 2,
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
        1450: {
            slidesPerView: 4,
            spaceBetween: 20
        },
    }
});

const swiperServices = new Swiper('.swiper-services', {
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
        768: {
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
        768: {
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

const swiperProduct = new Swiper('.swiper-product', {
    slidesPerView: 2,
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
            slidesPerView: 3,
            spaceBetween: 5
        },
        577: {
            slidesPerView: 3,
            spaceBetween: 10
        },
        992: {
            slidesPerView: 3,
            spaceBetween: 10
        },
        1200: {
            slidesPerView: 3,
            spaceBetween: 20
        },
    }
});

const swiperCert = new Swiper('.swiper-cert', {
    slidesPerView: 2,
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
    slidesPerView: 2,
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
                    slidesPerView: 2,
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
                            slidesPerView: 2,
                            spaceBetween: 10,
                        },
                        768: {
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

const swiperClasses = ['.swiper-advantage', '.swiper-project-1', '.swiper-project-2', '.swiper-project-3', '.swiper-project-4', '.swiper-project-5', '.swiper-steps-1', '.swiper-steps-2', '.swiper-other'];

window.addEventListener('load', () => initSwipers(swiperClasses));
window.addEventListener('resize', () => initSwipers(swiperClasses));

/** */
function magicSwipers(swiperSelectors) {
    const isMobile = window.innerWidth <= 991;

    swiperSelectors.forEach((selector) => {
        const swiperEl = document.querySelector(selector);

        if (!swiperEl) return;

        if (isMobile) {
            if (!swiperEl.classList.contains('swiper-initialized')) {
                swiperEl.classList.add('swiper');
                const swiper = new Swiper(selector, {
                    slidesPerView: 1,
                    spaceBetween: 0,
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
                        768: {
                            slidesPerView: 2,
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

const forClasses = ['.swiper-product-video'];

window.addEventListener('load', () => magicSwipers(forClasses));
window.addEventListener('resize', () => magicSwipers(forClasses));


/** Phone mask */
try {
    const phoneMask = (trigger) => {
        document.querySelectorAll(trigger).forEach((item) => {
            item.addEventListener("input", function (e) {
                let input = e.target;
                let value = input.value.replace(/\D/g, "");

                if (value === "") {
                    input.value = "";
                    return;
                }

                let formattedValue = "+7 (";

                if (value.length > 1) {
                    formattedValue += value.substring(1, 4);
                }
                if (value.length >= 5) {
                    formattedValue += ") " + value.substring(4, 7);
                }
                if (value.length >= 8) {
                    formattedValue += "-" + value.substring(7, 9);
                }
                if (value.length >= 10) {
                    formattedValue += "-" + value.substring(9, 11);
                }

                input.value = formattedValue;
            });
        });
    };

    phoneMask(".phone_mask");
} catch (error) { }


/** Dragging */
const dragging = (trigger, size) => {
    const draggingWrapper = document.querySelectorAll(trigger);

    const enableDragScroll = (tabsItem) => {
        let isDragging = false;
        let startX;
        let scrollLeft;

        const onMouseDown = (e) => {
            isDragging = true;
            tabsItem.classList.add('dragging');
            startX = e.pageX - tabsItem.offsetLeft;
            scrollLeft = tabsItem.scrollLeft;
        };

        const onTouchStart = (e) => {
            isDragging = true;
            tabsItem.classList.add('dragging');
            startX = e.touches[0].pageX - tabsItem.offsetLeft;
            scrollLeft = tabsItem.scrollLeft;
        };

        const onMouseMove = (e) => {
            if (!isDragging) return;
            e.preventDefault();
            const x = e.pageX - tabsItem.offsetLeft;
            const walk = (x - startX) * 2;
            tabsItem.scrollLeft = scrollLeft - walk;
        };

        const onTouchMove = (e) => {
            if (!isDragging) return;
            const x = e.touches[0].pageX - tabsItem.offsetLeft;
            const walk = (x - startX) * 2;
            tabsItem.scrollLeft = scrollLeft - walk;
        };

        const onMouseUpOrLeave = () => {
            isDragging = false;
            tabsItem.classList.remove('dragging');
        };

        tabsItem.addEventListener('mousedown', onMouseDown);
        tabsItem.addEventListener('touchstart', onTouchStart);
        tabsItem.addEventListener('mousemove', onMouseMove);
        tabsItem.addEventListener('touchmove', onTouchMove);
        tabsItem.addEventListener('mouseup', onMouseUpOrLeave);
        tabsItem.addEventListener('mouseleave', onMouseUpOrLeave);
        tabsItem.addEventListener('touchend', onMouseUpOrLeave);

        return () => {
            tabsItem.removeEventListener('mousedown', onMouseDown);
            tabsItem.removeEventListener('touchstart', onTouchStart);
            tabsItem.removeEventListener('mousemove', onMouseMove);
            tabsItem.removeEventListener('touchmove', onTouchMove);
            tabsItem.removeEventListener('mouseup', onMouseUpOrLeave);
            tabsItem.removeEventListener('mouseleave', onMouseUpOrLeave);
            tabsItem.removeEventListener('touchend', onMouseUpOrLeave);
        };
    };

    let cleanupFunctions = [];

    const checkScreenSize = () => {
        if (window.innerWidth <= size) {
            draggingWrapper.forEach((tabsItem) => {
                if (!tabsItem.classList.contains('drag-enabled')) {
                    const cleanup = enableDragScroll(tabsItem);
                    cleanupFunctions.push(cleanup);
                    tabsItem.classList.add('drag-enabled');
                }
            });
        } else {
            cleanupFunctions.forEach((cleanup) => cleanup());
            cleanupFunctions = [];
            draggingWrapper.forEach((tabsItem) => {
                tabsItem.classList.remove('drag-enabled');
            });
        }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
};

dragging('.tabs__wrapper', 767);
dragging('.perelink__wrapper', 1199);
dragging('.params__wrapper', 1499);


/** Dropdown */
const dropdownMenu = (trigger, dropdownGroup, dropdownSelected) => {
    const sortLinks = document.querySelectorAll(trigger);

    sortLinks.forEach((link) => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            event.stopPropagation();

            const target = event.target;
            const group = target.closest(dropdownGroup);

            const selectedText = group.querySelector(dropdownSelected);
            selectedText.textContent = target.getAttribute('data-value');

            /*selectedText.classList.add("selected");*/

            group.querySelector("span").style.display = 'none';

            const newUrl = target.getAttribute('href');
            window.history.pushState({}, '', newUrl);
        });
    });
};

try {
    dropdownMenu('.dropdown-menu a', '.dropdown-group', '.dropdown-selected');
} catch (error) { }



/** Range price */
try {
    const rangeInput = document.querySelectorAll(".range__input input"),
        priceInput = document.querySelectorAll(".range__price input"),
        range = document.querySelector(".range__slider .range__progress");

    let priceGap = 1000;

    priceInput.forEach((input) => {
        input.addEventListener("input", (e) => {
            let minPrice = parseInt(priceInput[0].value),
                maxPrice = parseInt(priceInput[1].value);

            if (maxPrice - minPrice >= priceGap && maxPrice <= rangeInput[1].max) {
                if (e.target.className === "input-min") {
                    rangeInput[0].value = minPrice;
                    range.style.left = ((minPrice - rangeInput[0].min) / (rangeInput[0].max - rangeInput[0].min)) * 100 + "%";
                } else {
                    rangeInput[1].value = maxPrice;
                    range.style.right = 100 - ((maxPrice - rangeInput[1].min) / (rangeInput[1].max - rangeInput[1].min)) * 100 + "%";
                }
            }
        });

        input.addEventListener("blur", (e) => {
            let minPrice = parseInt(priceInput[0].value),
                maxPrice = parseInt(priceInput[1].value);

            if (e.target.className === "input-min") {
                if (minPrice < rangeInput[0].min) {
                    priceInput[0].value = rangeInput[0].min;
                    rangeInput[0].value = rangeInput[0].min;
                    range.style.left = "0%";
                } else if (minPrice >= maxPrice) {
                    priceInput[0].value = maxPrice - priceGap;
                    rangeInput[0].value = maxPrice - priceGap;
                    range.style.left = ((maxPrice - priceGap - rangeInput[0].min) / (rangeInput[0].max - rangeInput[0].min)) * 100 + "%";
                }
            } else if (e.target.className === "input-max") {
                if (maxPrice > rangeInput[1].max) {
                    priceInput[1].value = rangeInput[1].max;
                    rangeInput[1].value = rangeInput[1].max;
                    range.style.right = "0%";
                } else if (maxPrice <= minPrice) {
                    priceInput[1].value = minPrice + priceGap;
                    rangeInput[1].value = minPrice + priceGap;
                    range.style.right = 100 - ((minPrice + priceGap - rangeInput[1].min) / (rangeInput[1].max - rangeInput[1].min)) * 100 + "%";
                }
            }
        });
    });

    rangeInput.forEach((input) => {
        input.addEventListener("input", (e) => {
            let minVal = parseInt(rangeInput[0].value),
                maxVal = parseInt(rangeInput[1].value);

            if (maxVal - minVal < priceGap) {
                if (e.target.className === "range-min") {
                    rangeInput[0].value = maxVal - priceGap;
                } else {
                    rangeInput[1].value = minVal + priceGap;
                }
            } else {
                priceInput[0].value = minVal;
                priceInput[1].value = maxVal;

                range.style.left = ((minVal - rangeInput[0].min) / (rangeInput[0].max - rangeInput[0].min)) * 100 + "%";
                range.style.right = 100 - ((maxVal - rangeInput[1].min) / (rangeInput[1].max - rangeInput[1].min)) * 100 + "%";
            }
        });
    });

    document.getElementById("showButton").addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();

        const minPrice = document.querySelector(".input-min").value;
        const maxPrice = document.querySelector(".input-max").value;

        const url = `?price1=${minPrice}&price2=${maxPrice}`;

        window.location.href = url;
    });
} catch (error) { }


/** Open filter */
const openFilter = (trigger) => {
    const filterElement = document.querySelector(trigger);
    const filterBlock = document.querySelector(".filter__block");

    filterElement.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        filterBlock.classList.toggle("active");
    });

    document.addEventListener("click", (e) => {
        if (!filterBlock.contains(e.target) && !filterElement.contains(e.target)) {
            filterBlock.classList.remove("active");
        }
    });
};

try {
    openFilter("#filter");
} catch (error) { }


/** Format price */
const formatNumberWithSpaces = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};

const formatPrices = (trigger) => {
    const priceElements = document.querySelectorAll(trigger);
    priceElements.forEach(element => {
        const rawNumber = element.textContent.trim();
        if (!isNaN(rawNumber)) {
            element.textContent = formatNumberWithSpaces(rawNumber);
        }
    });
};

formatPrices(".format-price");


/** Total order */
try {
    const totalOrder = document.querySelector("#totalOrder");
    let total = 0;

    const totalSum = () => {
        const prices = document.querySelectorAll(".payment__item-info--price span");
        prices.forEach((item) => {
            const price = +item.textContent.trim().replace(/\s/g, '');
            total += price;
        });
        totalOrder.innerText = formatNumberWithSpaces(total);
    };

    totalSum();
} catch (error) { }

/** To top button */
const toTopButton = document.getElementById('to-top-button');

window.addEventListener('scroll', function () {
    if (window.scrollY > 1000) {
        toTopButton.style.display = 'flex';
    } else {
        toTopButton.style.display = 'none';
    }
});

toTopButton.addEventListener('click', function () {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

/** Fixed menu on scroll */
const navbar = document.getElementById('navbar');
const header = document.querySelector('.header');

window.addEventListener('scroll', function () {
    if (window.scrollY > header.offsetHeight) {
        document.querySelector("body").style.marginTop = `${header.offsetHeight - 5}px`;
        navbar.classList.add("fixed");
    } else {
        document.querySelector("body").style.marginTop = `0`;
        navbar.classList.remove("fixed");
    }
});

/** Padding under Swiper */
const swiperContainer = document.querySelectorAll('.swiper');
swiperContainer.forEach((item) => {
    if (
        item &&
        item.querySelector('.swiper-button-next') &&
        item.querySelector('.swiper-button-prev')
    ) {
        item.classList.add('swiper-with-buttons');
    }
});


/** Change image from thumb in product page */
try {
    const imagesCover = document.querySelector("#imageCover");
    const imagesThumb = document.querySelectorAll(".product__images-thumb");
    imagesThumb.forEach((item) => {
        item.addEventListener("click", (e) => {
            e.preventDefault();
            const imageSrc = item.querySelector("img").src;
            const imageAlt = item.querySelector("img").getAttribute('alt');
            imagesCover.src = imageSrc;
            imagesCover.setAttribute("alt", imageAlt)
        });
    });
} catch (error) { }


try {
    const accordion = () => {
        const items = document.querySelectorAll('.faq__desc-item--question')
        items.forEach(item => {
            item.addEventListener('click', () => {
                const parent = item.parentNode
                if (parent.classList.contains('open')) {
                    parent.classList.remove('open')
                } else {
                    document
                        .querySelectorAll('.faq__desc-item')
                        .forEach(child => child.classList.remove('open'))
                    parent.classList.add('open')
                }
            })
        })
    };

    accordion();
} catch (error) { }


/** Gallery into modal */
try {
const galleryInModal = (classButton, idModal, galleryItem, classImage) => {

	const galleryItems = document.querySelectorAll(classButton);
	const modal = document.getElementById(idModal);
	const modalImage = document.getElementById("modalImage");
	const nextImage = document.getElementById("next-image");
	const prevImage = document.getElementById("prev-image");
    const body = document.querySelector("body");
	let currentIndex = 0;

	galleryItems.forEach((item, index) => {
	  item.addEventListener("click", function (event) {
		event.preventDefault();
		currentIndex = index;
		openModal(currentIndex);
	  });
	});

	const openModal = (index) => {
      body.classList.add('locked');
	  modal.style.display = "flex";
	  modalImage.src = galleryItems[index].closest(galleryItem).querySelector(classImage).src;

	  const closeButton = document.querySelector(".close");
	  closeButton.addEventListener("click", function () {
		closeModal();
	  });

	  window.onclick = function (event) {
		if (event.target === modal) {
		  closeModal();
		}
	  };

	  window.addEventListener("keydown", function (event) {
		if (event.key === "ArrowLeft") {
		  showPreviousImage();
		} else if (event.key === "ArrowRight") {
		  showNextImage();
		}
	  });

	  prevImage.addEventListener("click", function (event) {
		event.preventDefault();
		showPreviousImage();
	  });

	  nextImage.addEventListener("click", function (event) {
		event.preventDefault();
		showNextImage();
	  });
	};

	const closeModal = () => {
	  modal.style.display = "none";
      body.classList.remove('locked');
	};

	const showPreviousImage = () => {
	  currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
	  modalImage.src = galleryItems[currentIndex].closest(galleryItem).querySelector(classImage).src;
	};

	const showNextImage = () => {
	  currentIndex = (currentIndex + 1) % galleryItems.length;
	  modalImage.src = galleryItems[currentIndex].closest(galleryItem).querySelector(classImage).src;
	};
};

/** класс кнопки открытия картинки, id модального окна, класс элемента галереи, класс картинки элемента галереи */
galleryInModal(".gallery__item-img", "galleryModal", ".gallery__item", ".gallery__item-img img");
} catch (error) {}