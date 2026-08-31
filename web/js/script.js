document.addEventListener("DOMContentLoaded", function () {

    // Load Header
    const headerContainer = document.getElementById("header");

    if (headerContainer) {
        fetch("web/include/header.html")
            .then(response => {
                if (!response.ok) {
                    throw new Error("Header not found");
                }

                return response.text();
            })
            .then(data => {
                headerContainer.innerHTML = data;
            })
            .catch(error => {
                console.error("Header loading error:", error);
            });
    }


    // Load Footer
    const footerContainer = document.getElementById("footerId");

    if (footerContainer) {
        fetch("web/include/footer.html")
            .then(response => {
                if (!response.ok) {
                    throw new Error("Footer not found");
                }

                return response.text();
            })
            .then(data => {
                footerContainer.innerHTML = data;
            })
            .catch(error => {
                console.error("Footer loading error:", error);
            });
    }

});


/* =========================================================
   FILTER ACCORDION
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    document.querySelectorAll(".vx-filter-title").forEach(function (title) {

        title.addEventListener("click", function () {

            const parent = this.parentElement;

            if (parent) {
                parent.classList.toggle("vx-active");
            }

        });

    });

});


/* =========================================================
   FILTER SIDEBAR
========================================================= */

function vxOpenFilter() {

    const sidebar = document.getElementById("vxSidebar");

    if (!sidebar) return;

    sidebar.classList.add("vx-open");
    document.body.style.overflow = "hidden";
}


function vxCloseFilter() {

    const sidebar = document.getElementById("vxSidebar");

    if (!sidebar) return;

    sidebar.classList.remove("vx-open");
    document.body.style.overflow = "auto";
}


/* =========================================================
   CART
========================================================= */

function vxOpenCart() {

    const cart = document.getElementById("vxCart");
    const overlay = document.getElementById("vxCartOverlay");

    if (cart) {
        cart.classList.add("vx-open");
    }

    if (overlay) {
        overlay.classList.add("vx-open");
    }

    document.body.style.overflow = "hidden";
}


function vxCloseCart() {

    const cart = document.getElementById("vxCart");
    const overlay = document.getElementById("vxCartOverlay");

    if (cart) {
        cart.classList.remove("vx-open");
    }

    if (overlay) {
        overlay.classList.remove("vx-open");
    }

    document.body.style.overflow = "auto";
}


/* =========================================================
   SEARCH
========================================================= */

function openSearch() {

    const search = document.getElementById("vxSearch");
    const overlay = document.getElementById("vxOverlay");
    const searchHome = document.getElementById("search-home");

    if (search) {
        search.style.display = "block";
    }

    if (overlay) {
        overlay.style.display = "block";
    }

    if (searchHome) {
        searchHome.style.display = "none";
    }

    document.body.style.overflow = "hidden";
}


function closeSearch() {

    const search = document.getElementById("vxSearch");
    const overlay = document.getElementById("vxOverlay");
    const searchHome = document.getElementById("search-home");

    if (search) {
        search.style.display = "none";
    }

    if (overlay) {
        overlay.style.display = "none";
    }

    if (searchHome) {
        searchHome.style.display = "block";
    }

    document.body.style.overflow = "auto";
}


/* =========================================================
   PASSWORD SHOW / HIDE
========================================================= */

function togglePassword() {

    const pass = document.getElementById("password");
    const icon = document.getElementById("toggleIcon");

    if (!pass || !icon) return;

    if (pass.type === "password") {

        pass.type = "text";

        icon.classList.remove("bi-eye-slash");
        icon.classList.add("bi-eye");

    } else {

        pass.type = "password";

        icon.classList.remove("bi-eye");
        icon.classList.add("bi-eye-slash");

    }
}


/* =========================================================
   MOBILE MENU
========================================================= */

function openMenu() {

    const menu = document.getElementById("header-bottom-menu");

    if (!menu) return;

    menu.style.left = "0";
    document.body.style.overflow = "hidden";
}


function closeMenu() {

    const menu = document.getElementById("header-bottom-menu");

    if (!menu) return;

    menu.style.left = "-100%";
    document.body.style.overflow = "auto";
}


/* =========================================================
   HIM POPUP
========================================================= */

function himOpen() {

    const popup = document.getElementById("himPopup");
    const menu = document.getElementById("header-bottom-menu");

    if (popup) {
        popup.style.display = "flex";
    }

    if (menu) {
        menu.style.left = "-100%";
    }

    document.body.style.overflow = "hidden";
}


function himClose() {

    const popup = document.getElementById("himPopup");

    if (!popup) return;

    popup.style.display = "none";

    document.body.style.overflow = "auto";
}


/* =========================================================
   PRODUCT IMAGE + STORY
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       PRODUCT IMAGE CHANGE
    ===================================================== */

    const mainImage = document.getElementById("pdMainImg");
    const thumbnails = document.querySelectorAll(".pd-thumbs img");

    if (mainImage && thumbnails.length > 0) {

        thumbnails.forEach(function (img) {

            img.addEventListener("click", function () {

                mainImage.src = this.src;

                thumbnails.forEach(function (item) {
                    item.classList.remove("active-thumb");
                });

                this.classList.add("active-thumb");

            });

        });

    }


    /* =====================================================
       STORY SECTION
    ===================================================== */

    const video = document.getElementById("storyVideo");
    const modal = document.getElementById("storyModal");
    const storyName = document.getElementById("storyName");
    const progress = document.getElementById("progress");

    /*
     * If this page doesn't contain Story UI,
     * simply don't initialize it.
     */

    if (!video || !modal || !storyName || !progress) {
        return;
    }


    const stories = [
        [
            "web/image/banner-video1.mp4"
        ],
        [
            "web/image/banner-video2.mp4"
        ],
        [
            "web/image/banner-video1.mp4"
        ],
        [
            "web/image/banner-video2.mp4"
        ],
        [
            "web/image/banner-video1.mp4"
        ]
    ];


    const names = [
        "Store 1",
        "Store 2",
        "Store 3",
        "Store 4",
        "Store 5"
    ];


    let currentUser = 0;
    let currentIndex = 0;


    /* =====================================================
       LOAD STORY
    ===================================================== */

    function loadStory() {

        if (
            !stories[currentUser] ||
            !stories[currentUser][currentIndex]
        ) {
            return;
        }

        const src = stories[currentUser][currentIndex];

        video.pause();

        video.src = src;

        video.load();

        storyName.innerText =
            names[currentUser] || "";


        /* Progress */

        progress.innerHTML = "";

        stories[currentUser].forEach(function (_, i) {

            const bar = document.createElement("div");

            bar.className =
                "zbxr-bar" +
                (i === currentIndex ? " active" : "");

            progress.appendChild(bar);

        });


        /* Play safely */

        if (document.visibilityState === "visible") {

            const playPromise = video.play();

            if (playPromise !== undefined) {

                playPromise.catch(function () {
                    // Browser may block autoplay.
                });

            }

        }

    }


    /* =====================================================
       OPEN STORY
    ===================================================== */

    window.openStory = function (user) {

        if (
            typeof user !== "number" ||
            user < 0 ||
            user >= stories.length
        ) {
            return;
        }

        currentUser = user;
        currentIndex = 0;

        modal.classList.add("active");

        document.body.style.overflow = "hidden";

        loadStory();

    };


    /* =====================================================
       CLOSE STORY
    ===================================================== */

    window.closeStory = function () {

        video.pause();

        video.currentTime = 0;

        modal.classList.remove("active");

        document.body.style.overflow = "auto";

    };


    /* =====================================================
       NEXT STORY
    ===================================================== */

    window.nextStory = function () {

        if (
            currentIndex <
            stories[currentUser].length - 1
        ) {

            currentIndex++;

        } else if (
            currentUser <
            stories.length - 1
        ) {

            currentUser++;

            currentIndex = 0;

        } else {

            window.closeStory();

            return;

        }

        loadStory();

    };


    /* =====================================================
       PREVIOUS STORY
    ===================================================== */

    window.prevStory = function () {

        if (currentIndex > 0) {

            currentIndex--;

        } else if (currentUser > 0) {

            currentUser--;

            currentIndex =
                stories[currentUser].length - 1;

        }

        loadStory();

    };


    /* =====================================================
       VIDEO ENDED
    ===================================================== */

    video.addEventListener("ended", function () {

        window.nextStory();

    });

});


/* =========================================================
   SIZE SELECT
========================================================= */

function pdSelectSize(el) {

    if (!el) return;

    const parent = el.parentElement;

    if (!parent) return;

    const buttons = parent.querySelectorAll("button");

    buttons.forEach(function (btn) {

        btn.classList.remove("active-size");

    });

    el.classList.add("active-size");
}


/* =========================================================
   WISHLIST
========================================================= */

function addwish(el) {

    if (!el) return;

    el.classList.toggle("active");
}


/* =========================================================
   WATCH & BUY SLIDER
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const track = document.getElementById("brijTrack");
    const dotsContainer = document.getElementById("brijDots");

    /*
     * IMPORTANT:
     * If Watch & Buy doesn't exist on this page,
     * stop here.
     */

    if (!track || !dotsContainer) {
        return;
    }


    let cards =
        track.querySelectorAll(".brij-card");


    if (!cards.length) {
        return;
    }


    /* Prevent duplicate initialization */

    if (track.dataset.sliderInitialized === "true") {
        return;
    }

    track.dataset.sliderInitialized = "true";


    /* =====================================================
       CLONE CARDS FOR INFINITE SLIDER
    ===================================================== */

    const originalHTML = track.innerHTML;

    track.insertAdjacentHTML(
        "beforeend",
        originalHTML
    );


    cards =
        track.querySelectorAll(".brij-card");


    const total =
        cards.length / 2;


    if (!total) {
        return;
    }


    let index = 0;
    let interval = null;


    /* =====================================================
       DOTS
    ===================================================== */

    dotsContainer.innerHTML = "";


    for (let i = 0; i < total; i++) {

        const dot =
            document.createElement("span");

        dot.addEventListener("click", function () {

            index = i;

            updateSlider();

            restartAuto();

        });

        dotsContainer.appendChild(dot);

    }


    /* =====================================================
       UPDATE SLIDER
    ===================================================== */

    function updateSlider() {

        if (!cards[0]) return;


        const gap = 15;

        const cardWidth =
            cards[0].offsetWidth + gap;


        track.style.transform =
            `translateX(-${index * cardWidth}px)`;


        /* =================================================
           MOBILE VIDEO CONTROL
        ================================================= */

        cards.forEach(function (card, i) {

            const v =
                card.querySelector("video");


            if (!v) return;

            // if (window.innerWidth <= 10) {

            //     const center =
            //         index + 1;


            //     if (i === center) {

            //         card.classList.add("active");

            //         const playPromise =
            //             v.play();

            //         if (
            //             playPromise !== undefined
            //         ) {

            //             playPromise.catch(
            //                 function () {}
            //             );

            //         }

            //     } else {

            //         card.classList.remove("active");

            //         v.pause();

            //     }

            // } 
            else {

                card.classList.remove("active");

                const playPromise =
                    v.play();

                if (
                    playPromise !== undefined
                ) {

                    playPromise.catch(
                        function () {}
                    );

                }

            }

        });


        /* =================================================
           DOT ACTIVE
        ================================================= */

        const dots =
            dotsContainer.querySelectorAll("span");


        dots.forEach(function (dot, i) {

            dot.classList.toggle(
                "active",
                i === index % total
            );

        });


        /* =================================================
           INFINITE RESET
        ================================================= */

        if (index >= total) {

            setTimeout(function () {

                track.style.transition = "none";

                index = 0;

                track.style.transform =
                    "translateX(0px)";


                /*
                 * Force browser repaint
                 */

                track.offsetHeight;


                setTimeout(function () {

                    track.style.transition =
                        "transform 0.6s ease";

                }, 50);

            }, 600);

        }

    }


    /* =====================================================
       NEXT
    ===================================================== */

    window.nextSlide = function () {

        index++;

        updateSlider();

    };


    /* =====================================================
       PREVIOUS
    ===================================================== */

    window.prevSlide = function () {

        if (index <= 0) {

            index = total - 1;

        } else {

            index--;

        }

        updateSlider();

    };


    /* =====================================================
       AUTO PLAY
    ===================================================== */

    function startAuto() {

        stopAuto();

        interval =
            setInterval(function () {

                window.nextSlide();

            }, 3500);

    }


    function stopAuto() {

        if (interval) {

            clearInterval(interval);

            interval = null;

        }

    }


    function restartAuto() {

        stopAuto();

        startAuto();

    }


    /* =====================================================
       INITIALIZE
    ===================================================== */

    updateSlider();

    startAuto();


    /* =====================================================
       MOUSE EVENTS
    ===================================================== */

    track.addEventListener(
        "mouseenter",
        stopAuto
    );


    track.addEventListener(
        "mouseleave",
        startAuto
    );


    /* =====================================================
       RESIZE
    ===================================================== */

    let resizeTimer;

    window.addEventListener(
        "resize",
        function () {

            clearTimeout(resizeTimer);

            resizeTimer =
                setTimeout(function () {

                    updateSlider();

                }, 150);

        }
    );

});


/* =========================================================
   ADDRESS MODAL
========================================================= */

function openAddressModal() {

    const modal =
        document.getElementById(
            "editAddressModal"
        );


    if (!modal) return;


    modal.classList.add("active");

    document.body.style.overflow =
        "hidden";

}


function closeAddressModal() {

    const modal =
        document.getElementById(
            "editAddressModal"
        );


    if (!modal) return;


    modal.classList.remove("active");

    document.body.style.overflow =
        "auto";

}