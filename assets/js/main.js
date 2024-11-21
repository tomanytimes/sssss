window.addEventListener(
  "load",
  function () {
    let scrolling = false;
    // 스크롤 위치 복원을 수동으로 설정
    history.scrollRestoration = "manual";

    // 페이지 로드 시 상단으로 스크롤
    window.scrollTo(0, 0);

    // GSAP
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother, ScrollToPlugin);

    smoother = ScrollSmoother.create({
      wrapper: "#smooth",
      content: "#content",
      normalizeScroll: false,
      ignoreMobileResize: true,
      smooth: 1,
      effects: true,
      smoothTouch: 0.05,
    });

    // Sec01 Event
    let video = document.getElementById("video");
    if (video.paused) {
      setTimeout(function () {
        video.play();
      }, 100);
    }

    pauseSec = 10;
    setInterval(function () {
      if (Math.floor(video.currentTime) >= pauseSec) video.pause();
    }, 500);

    // Sec02 Event
    gsap
      .timeline({
        scrollTrigger: {
          trigger: ".sec02",
          start: "center center+=30%",
          end: "+=200",
          scrub: 1,
          toggleActions: "play none none resume",
        },
      })
      .from(document.querySelector(".sec02 .hd .pai"), { ease: "power4.easeOut", opacity: 0, y: 80, duration: 1 })
      .from(document.querySelector(".sec02 .hd .hai"), { ease: "power4.easeOut", opacity: 0, y: 80, duration: 1, delay: 0.1 }, "-=40%")
      .from(document.querySelector(".sec02 .bd"), { ease: "power4.easeOut", opacity: 0, y: 80, duration: 1, delay: 0.1 }, "-=40%");

    // sec03

    let sections = gsap.utils.toArray(".sec03 .item");

    function preventScroll(event) {
      event.preventDefault();
      event.stopPropagation();
      return false;
    }

    function disableScroll() {
      window.addEventListener("wheel", preventScroll, { passive: false });
      window.addEventListener("touchmove", preventScroll, { passive: false });
      window.addEventListener("keydown", preventScroll, { passive: false });
    }

    function enableScroll() {
      window.removeEventListener("wheel", preventScroll);
      window.removeEventListener("touchmove", preventScroll);
      window.removeEventListener("keydown", preventScroll);
    }
    // snap to section
    const goToSection = (panel, index) => {
      gsap.to(window, {
        scrollTo: { y: panel, autoKill: false },
        duration: 1,
        ease: "power2.out",
        onStart: disableScroll, // 애니메이션 시작 시 스크롤 차단
        onComplete: enableScroll, // 애니메이션 완료 후 스크롤 허용
      });
    };

    // snap on scroll
    const snapIn = (index) => {
      const tlSnapIn = gsap.timeline();
      sections.forEach((panel, i) => {
        tlSnapIn.to(panel, {
          duration: 1,
          scrollTrigger: {
            markers: true,
            start: "top 93%",
            end: "bottom 7%",
            trigger: panel,
            onEnter: () => goToSection(panel),
            onEnterBack: () => goToSection(panel),
          },
        });
      });
      return tlSnapIn;
    };

    const tl = gsap.timeline();
    const snap = snapIn();
    tl.add(snap);

    // Sec04 Event
    gsap
      .timeline({
        scrollTrigger: {
          trigger: ".sec04",
          start: "center center+=50%",
          end: "+=300",
          scrub: 1,
          toggleActions: "play none none resume",
        },
      })
      .from(document.querySelector(".sec04 .hd .pai"), { ease: "power4.easeOut", opacity: 0, y: 100, duration: 1 })
      .from(document.querySelector(".sec04 .hd .hai"), { ease: "power4.easeOut", opacity: 0, y: 100, duration: 1, delay: 0.1 }, "-=40%")
      .from(document.querySelector(".sec04 .bd"), { ease: "power4.easeOut", opacity: 0, y: 100, duration: 1, delay: 0.1 }, "-=40%");

    // Sec05 Event
    gsap
      .timeline({
        scrollTrigger: {
          trigger: ".sec05",
          start: "center center+=50%",
          end: "+=100",
          scrub: 1,
          toggleActions: "play none none resume",
        },
      })
      .from(document.querySelector(".sec05 .container"), { ease: "power4.easeOut", opacity: 0, y: 100, duration: 1, delay: 0.1 });

    let photoSlide = new Swiper(".sec05 .photoBox .swiper-container", {
      slidesPerView: "auto",
      spaceBetween: 16,
      pagination: {
        el: ".sec05 .photoBox .pagination",
        type: "progressbar",
      },
      breakpoints: {
        720: {
          spaceBetween: 30,
        },
        576: {
          spaceBetween: 24,
        },
      },
    });

    let photoBtn = document.querySelectorAll(".sec05 .photo li");
    let photoCon = document.querySelectorAll(".sec05 .photo-con .modal-con");

    for (let i = 0; i < photoBtn.length; i++) {
      photoBtn[i].addEventListener("click", function () {
        for (let j = 0; j < photoBtn.length; j++) {
          photoBtn[j].classList.remove("on");
          photoCon[j].classList.remove("on");
        }
        photoBtn[i].classList.add("on");
        photoCon[i].classList.add("on");
      });
    }

    // Sec07 Event
    gsap
      .timeline({
        scrollTrigger: {
          trigger: ".sec07",
          start: "top center",
          end: "+=300",
          scrub: 1,
          toggleActions: "play none none resume",
        },
      })
      .from(document.querySelector(".sec07 .hd .pai"), { ease: "power4.easeOut", opacity: 0, y: 100, duration: 1 })
      .from(document.querySelector(".sec07 .hd .hai"), { ease: "power4.easeOut", opacity: 0, y: 100, duration: 1, delay: 0.1 }, "-=40%")
      .from(document.querySelector(".sec07 .bd"), { ease: "power4.easeOut", opacity: 0, y: 100, duration: 1, delay: 0.1 }, "-=40%");

    let tabMenus = document.querySelectorAll(".sec07 .tab-menu li");
    let tabCons = document.querySelectorAll(".sec07 .tab-con li");

    tabMenus.forEach((menu, index) => {
      menu.addEventListener("click", function () {
        tabMenus.forEach((current) => current.classList.remove("on"));
        menu.classList.add("on");

        tabCons.forEach((current) => current.classList.remove("on"));
        tabCons[index].classList.add("on");
      });
    });

    let jnOneSlide = new Swiper(".sec07 .one-swiper", {
      slidesPerView: 1,
      observer: true,
      observeParents: true,
      pagination: {
        el: ".sec07 .one-swiper .pagination",
        clickable: true,
      },
      watchOverflow: true,
    });

    let jnTwoSlide = new Swiper(".sec07 .two-swiper", {
      slidesPerView: 1,
      observer: true,
      observeParents: true,
      pagination: {
        el: ".sec07 .two-swiper .pagination",
        clickable: true,
      },
      watchOverflow: true,
    });

    let jnThreeSlide = new Swiper(".sec07 .three-swiper", {
      slidesPerView: 1,
      observer: true,
      observeParents: true,
      pagination: {
        el: ".sec07 .three-swiper .pagination",
        clickable: true,
      },
      watchOverflow: true,
    });

    $(".sec07 .tab-menu .button01").click(function () {
      jnTwoSlide.slideTo(0, 300, false);
      jnThreeSlide.slideTo(0, 300, false);
    });

    $(".sec07 .tab-menu .button02").click(function () {
      jnOneSlide.slideTo(0, 300, false);
      jnThreeSlide.slideTo(0, 300, false);
    });

    $(".sec07 .tab-menu .button03").click(function () {
      jnOneSlide.slideTo(0, 300, false);
      jnTwoSlide.slideTo(0, 300, false);
    });

    // Sec08 Event
    gsap
      .timeline({
        scrollTrigger: {
          trigger: ".sec08",
          start: "top center",
          end: "+=300",
          scrub: 1,
          toggleActions: "play none none resume",
        },
      })
      .from(document.querySelector(".sec08 .link"), { ease: "power4.easeOut", opacity: 0, x: -100, duration: 1, delay: 0.1 }, "-=80%");

    // Sec09 Event
    gsap
      .timeline({
        scrollTrigger: {
          trigger: ".sec09",
          start: "top center+=30%",
          end: "+=300",
          scrub: 1,
          toggleActions: "play none none resume",
        },
      })
      .from(document.querySelector(".sec09 .hd .pai"), { ease: "power4.easeOut", opacity: 0, y: 100, duration: 1 })
      .from(document.querySelector(".sec09 .hd .hai"), { ease: "power4.easeOut", opacity: 0, y: 100, duration: 1, delay: 0.1 }, "-=80%");

    let sponsorList = gsap.utils.toArray(".sec09 .list li");

    sponsorList.forEach((list) => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: list,
            start: "top center+=30%",
            end: "+=200",
            scrub: 1,
            toggleActions: "play none none resume",
          },
        })
        .from(list, { ease: "power4.easeOut", opacity: 0, y: 100, duration: 1 });
    });

    // Sec10 Event
    $(".sec10 .slider").slick({
      slide: "div",
      slidesToShow: 1,
      arrows: false,
      dots: false,
      infinite: true,
      autoplay: true,
      draggable: false,
      speed: 1500,
      fade: true,
      autoplaySpeed: 1500,
      pauseOnFocus: false,
      pauseOnHover: false,
      pauseOnDotsHover: false,
    });

    $(".sec10 .slider").on("touchcancel touchmove", function () {
      $(this).slick("slickPlay");
    });

    // sec09 이미지 슬라이드
    let options = {
      slidesPerView: 1,
      spaceBetween: 10,
      // loop: true,
      observer: true,
      observeParents: true,
      // mousewheel:true,

      pagination: {
        el: ".sec09 .swiper-container .pagination",
        type: "progressbar",
      },
    };

    const brandSlider = new Swiper(".sec09 .swiper-container", options);

    // Quick
    let quick = document.getElementById("quick");

    gsap
      .timeline({
        scrollTrigger: {
          trigger: ".sec09",
          start: "top top",
          end: "bottom bottom+=30%",
          // markers: true,
          scrub: 1,
          toggleActions: "play none none resume",
        },
      })
      .to(quick, { ease: "power4.easeOut", display: "none", opacity: 0, duration: 0.8 });

    smoother.scrollTop(0);
  },
  false
);
