const formCallingButtons = Array.from(document.querySelectorAll('.trigger-button'));
const formClosingButtons = Array.from(document.querySelectorAll('.trigger-close-button'));
const fixedNavLinks = Array.from(document.querySelectorAll('.fixedNavLink'));
const rightArm = document.querySelector('.right-arm');
const leftArm = document.querySelector('.left-arm');
const registrationFormWrapper = document.querySelector('.registration-form__wrapper');
const aboutLink = document.querySelector('.about-link');
const artistsLink = document.querySelector('.artists-link');
const recordsLink = document.querySelector('.records-link');
const dailyLink = document.querySelector('.daily-link');
const blockOne = document.querySelector('.one');
const blockTwo = document.querySelector('.two');
const blockThree = document.querySelector('.three');
const blockFour = document.querySelector('.four');
const blockFive = document.querySelector('.five');
const musicDisc = document.querySelector('.circleBlock');
const phoneImg = document.querySelector('.phone_image');
const blockThreeDisc = document.querySelector('.section__three__col__r');
const headerBlock = document.querySelector('.uix');
const connectAnimationButton = document.querySelector('.connect-animation-button');
const circleBlock = document.querySelector('.circleBlock');
const blockContactImageContainer = document.querySelector('.block-contacts__image-container');
const blockContactText = document.querySelector('.block-contacts__text');


/////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IPHONE ADDAPTIVE

function isIOSDevice() {
    return !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
}

function iphoneAdaptive(iphoneIndicator) {
  if (!iphoneIndicator) return;
  if (window.outerWidth < 600) {
    musicDisc.classList.add('circleBlock_iphone_adaptive');
    phoneImg.classList.add('phone_image_iphone_adaptive');
    blockContactImageContainer.classList.add('block-contacts__image-container_iphone_adaptive')
    blockContactText.classList.add('block-contacts__text_iphone_adaptive')
  }
}

iphoneAdaptive(isIOSDevice());

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
// DISABLE EMPTY LINKS CLICK

function linksPreventDefault() {
  const links = Array.from(document.querySelectorAll('a[href="#"]'));
  links.forEach(function (el) {
    el.addEventListener("click", function (e) {
      e.preventDefault();
    });
  });
}
linksPreventDefault();

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
// DISABLE HOVER EVENT ON SCROLL

const ENABLE_HOVER_DELAY = 500;  
let timer;

window.addEventListener('scroll', function() {
  const bodyClassList = document.body.classList;
  // clear previous timeout function
  clearTimeout(timer);
    
  if (!bodyClassList.contains('disable-hover')) {
    // add the disable-hover class to the body element
    bodyClassList.add('disable-hover');
  }
        
  timer = setTimeout(function() {
    // remove the disable-hover class after a timeout of 500 millis
    bodyClassList.remove('disable-hover');
  }, ENABLE_HOVER_DELAY);
  
}, false);

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
// SMOTH SCROLL

SmoothScroll({
  animationTime: 600,
  stepSize: 75,
  accelerationDelta: 30,
  accelerationMax: 2,
  keyboardSupport: true,
  arrowScroll: 50,
  pulseAlgorithm: true,
  pulseScale: 4,
  pulseNormalize: 1,
  touchpadSupport: true,
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ANIMATIONS

gsap.registerPlugin(ScrollTrigger);

gsap.registerPlugin(CSSRulePlugin);
const circleBlockBorder = CSSRulePlugin.getRule('.block.three .content .col.r .circleBlock:before');
const connectAnimationButtonBorder = CSSRulePlugin.getRule('.block.three .content .col.r .circleBlock .center:before');
const preloaderTextFilling = CSSRulePlugin.getRule('.preloader__text:before');

class AppAnimations {
  constructor() {

    // gsap.ticker.lagSmoothing(1000, 16);
    // gsap.ticker.fps(30);
    this.fixedNav();
    this.preloaderAnimation();
    this.headerAnimation();
    this.welcomeToNuefAnimation();
    this.connectAnimation();
    this.phoneAnimation();
    this.studioAnimation();

    formCallingButtons.forEach(el => {
      el.addEventListener('click', (e) => {
        this.appearFormAnimation(false);
      })
    })

    formClosingButtons.forEach(el => {
      el.addEventListener('click', (e) => {
        if (e.target.classList.contains('registration-form__wrapper') || e.target.classList.contains('close-icon')) {
          this.appearFormAnimation(true, 0);
        }
      })
    })
  }

  fixedNav() {
    let clickIndicator = false;
    aboutLink.addEventListener('click', () => {
      if (clickIndicator) return;
      clickIndicator = true;

      blockTwo.scrollIntoView({
        behavior: 'smooth'
      });
      fixedNavLinks.forEach(el => {
        el.classList.remove('a')
      })
      aboutLink.classList.add('a')

      if (!aboutLink.classList.contains('a')) return;
      setTimeout(() => {
        clickIndicator = false;
      }, 1500);
    })
    artistsLink.addEventListener('click', () => {
      if (clickIndicator) return;
      clickIndicator = true;

      blockThree.scrollIntoView({
        behavior: 'smooth'
      });
      fixedNavLinks.forEach(el => {
        el.classList.remove('a')
      })
      artistsLink.classList.add('a')

      if (!artistsLink.classList.contains('a')) return;
      setTimeout(() => {
        clickIndicator = false;
      }, 1500);
    })
    recordsLink.addEventListener('click', () => {
      if (clickIndicator) return;
      clickIndicator = true;

      blockFour.scrollIntoView({
        behavior: 'smooth'
      });
      fixedNavLinks.forEach(el => {
        el.classList.remove('a')
      })
      recordsLink.classList.add('a')

      if (!recordsLink.classList.contains('a')) return;
      setTimeout(() => {
        clickIndicator = false;
      }, 1500);
    })
    dailyLink.addEventListener('click', () => {
      if (clickIndicator) return;
      clickIndicator = true;

      blockFive.scrollIntoView({
        behavior: 'smooth'
      });
      fixedNavLinks.forEach(el => {
        el.classList.remove('a')
      })
      dailyLink.classList.add('a')

      if (!dailyLink.classList.contains('a')) return;
      setTimeout(() => {
        clickIndicator = false;
      }, 1500);
    })

    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.7,
    };
    
    function observerCallback(entries, observer) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          fixedNavLinks.forEach(el => {
            el.classList.remove('a')
          })

          if (entry.target.classList.contains('one')) {
            fixedNavLinks.forEach(el => {
              el.classList.remove('a')
            })
          }

          if (entry.target.classList.contains('two')) {
            aboutLink.classList.add('a')
          }

          if (entry.target.classList.contains('three')) {
            artistsLink.classList.add('a')
          }

          if (entry.target.classList.contains('four')) {
            recordsLink.classList.add('a')
          }

          if (entry.target.classList.contains('five')) {
            dailyLink.classList.add('a')
          }
        };
      })
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    observer.observe(blockOne);
    observer.observe(blockTwo);
    observer.observe(blockThree);
    observer.observe(blockFour);
    observer.observe(blockFive);
  }

  appearFormAnimation(regFormIndicator) {
    // registrationFormWrapper.style.top = `${topPosition}vh`
    // setTimeout(() => {
      if (!regFormIndicator) {
        // gsap.to('body', {duration: 0, height: '100vh'})
        gsap.to('.registration-form__wrapper', {duration: .75, autoAlpha: 1})
      } else {
        // gsap.to('body', {duration: 0, height: '100%'})
        gsap.to('.registration-form__wrapper', {duration: .75, autoAlpha: 0})
      }
    // }, 500);
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // PRELOADER ANIMATION
  preloaderAnimation() {
    const preloaderTimeline = gsap.timeline({});

    preloaderTimeline
    // .to('html', {duration: 0, overflowY: 'hidden'}, 0)
    .to('.preloader__image', {duration: 10, rotate: -1080, ease: 'linear'}, 0)
    .to(preloaderTextFilling, {duration: 3.5, width: '100%', ease: 'linear'}, 0)
    .to('.preloader', {duration: 1, autoAlpha: 0, ease: 'linear', delay: 4}, 0)
    .to('html', {duration: 0, overflowY: 'visible', delay: 5}, 0)
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // HEADER ANIMATION
  headerAnimation() {
    const headerTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".one",
        start: "top 0%",
        end: '+=1000px',
        scrub: 1,
        pin: ".one",
      }
    });

    let rotateSides = 40;
    let rotateCenter = 20;
    let rotateCenterBottom = 140;
    let crowdY = '25vh';

    if (window.outerWidth > 2600) {
      crowdY = '15vh';
    }
    
    headerTimeline
    .to('.navigation-top__list', {duration: 2.1, x:'-150%'}, 0)
    .to('.navigation-top__button', {duration: 3.25, x:'250%'}, 0)
    .to('.socials-bottom', {duration: 1.2, autoAlpha: 0}, 0)
    // .to('.crowd', {duration: 2.5, y: '25vh', opacity: 1}, 0)
    .to('.crowd__container', {duration: 2.5, y: crowdY}, 0)
    .to('.header__famous-line', {duration: 2.5, y: 0, opacity: 1}, 0)
    .to('.nuef-collaborations', {duration: 2.5, y: '-160%'}, 0)
    .to('.singer', {duration: 2.5, y: 0, scale: 1}, 0)
    .to('.header__two-lines', {duration: 2.5, y: 0, scale: 1}, 0)
    .to('.smoke', {duration: 2.5, opacity: 1}, 0)
    .to('.spotlight-center', {duration: 3.25, opacity: .35}, 0)

    .to('.spotlights-pink', {duration: 3.25, opacity: 1}, 0)
    .to('.spotlights-white', {duration: 2.5, opacity: 1}, 0)
    .to('.spotlights-white-center', {duration: 2.5, opacity: 1}, 0)
    .to('.spotlight-white-left', {duration: 2.5, y: 0, x: '-82%', rotate: rotateSides }, 0)
    .to('.spotlight-white-center-left', {duration: 2.5, x: '-45%', rotate: rotateCenter }, 0)
    .to('.spotlight-white-center-right', {duration: 2.5, x: '45%', rotate: -rotateCenter }, 0)
    .to('.spotlight-white-right', {duration: 2.5, y: 0, x: '82%', rotate: -rotateSides }, 0)
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // WELCOME TO NUEF ANIMATION
  welcomeToNuefAnimation() {
    const welcomeToNuefTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".one",
        start: "top 0%",
        end: "bottom -100%",
        scrub: 1,
      }
    });

    welcomeToNuefTimeline
    .to('.musicCircle-big', {duration: 5, rotate: 220, ease: 'linear'}, 0)
    .to('.musicCircle-small', {duration: 5, rotate: 220, ease: 'linear'}, 0)
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // CONNECT ANIMATION
  connectAnimation() {
    connectAnimationButton.addEventListener('click', () => {
      connectAnimation();
    })

    let connectAnimationIndicator = 3;
    // let discTop = '50%', discRight = '0%';
    // let discTop = '0%', discRight = '100%';
    let discTop = '0%', discRight = '40vw';

    if (window.outerWidth < 900) {
      // discRight = '-10%';
      discRight = '90%';
    }
    if (window.outerWidth < 700) {
      // discTop = '70%'
      // discTop = '25%'
      discTop = '70%'
    }
    if (window.outerWidth < 600) {
      // discRight = '-20%'
      discRight = '80%'
    }
    if (window.outerWidth < 500) {
      // discRight = '-33%'
      discRight = '75%'
    }
    if (window.outerWidth < 450) {
      // discRight = '-25%'
      discRight = '75%'

      if (isIOSDevice()) {
        // discRight = '-50%'
        discRight = '65%'
      }
    }
    if (window.outerWidth > 2500) {
      // discRight = '-25%'
      discRight = '60vw'
      discTop = '20%'
    }

    function connectAnimation() {
      if (connectAnimationIndicator === 3) {
        gsap.to(connectAnimationButton, {duration: .75, rotate: -180 })
        connectAnimationIndicator = 4;
      } else if (connectAnimationIndicator === 4) {
        gsap.to(connectAnimationButton, {duration: .75, rotate: 0 })
        connectAnimationIndicator = 3;
      }
    }

    const connectAnimationTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".three",
        start: "top 0%",
        end: '+=1500px',
        scrub: 1,
        pin: ".three",
      }
    })

    connectAnimationTimeline
    .to(connectAnimationButton, {duration: .75, rotate: -180, background: 'linear-gradient(90deg, #0400ff 0%, #a40cea 53.13%, #ec0a7a 100%' }, 0)
    .to(circleBlockBorder, {duration: 1, opacity: .2, border: '0.1rem solid #ffffff' }, 0)
    .to(leftArm, {duration: 1, opacity: 1, x: '40%', y: '-20%' }, 0)
    .to(rightArm, {duration: 1, opacity: 1, x: '-40%', y: '20%' }, 0)
    .to('.text-block-three', {duration: 1, autoAlpha: 1 }, 1)
    .to('.spotlight-block-three', {duration: 1, autoAlpha: 1 }, 1)
    .to('.circleBlock__image', {duration: 1, opacity: 1 }, 1)
    .to(connectAnimationButton, {duration: 1.25, rotate: 360, scale: 1, }, 1)
    .to(circleBlock, {duration: 1, scale: 1, opacity: 1 }, 1)
    .to(circleBlockBorder, {duration: 1, opacity: 1, border: '0.75rem solid #ffffff' }, 1)
    // .to('.disc-block-three', {duration: 1.5, x: 0, y: 0, top: discTop, right: discRight }, 1)
    .to('.disc-block-three', {duration: 1.5, x: discRight, y: discTop }, 1)
    .to(leftArm, {duration: 2, y: '-350%', rotate: 45, opacity: 0 }, 1)
    .to(rightArm, {duration: 2, y: '550%', rotate: 55, opacity: 0 }, 1)
    .to('.span-right', {duration: 2, x: 0 }, 1)
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // PHONE ANIMATION
  phoneAnimation() {
    const phoneTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".four",
        start: "top 0%",
        end: '+=1000px',
        scrub: 1,
        pin: ".four",
      }
    });

    phoneTimeline
    .to('.phone-line', {duration: 2, color: '#232323', ease: 'linear', stagger: 1}, 0)
    .to('.phone-line-line', {duration: 2, width: '110%', ease: 'linear', stagger: 1}, 0)
    .to('.waving-text-line-back', {duration: 10, x: '-15%', ease: 'linear'}, 0)
    .to('.waving-text-line-front', {duration: 10, x: '15%', ease: 'linear'}, 0)
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // STUDIO ANIMATION
  studioAnimation() {
    gsap.to('.moving-text-back', {duration: 60, x: '-55%', repeat: -1, yoyo: true, ease: 'linear'})
    gsap.to('.moving-text-front', {duration: 60, x: '55%', repeat: -1, yoyo: true, ease: 'linear'})

    const studioTimeline = gsap.timeline({defaults: {duration: 1.5},
      scrollTrigger: {
        trigger: ".five",
        start: "top 0%",
        end: '+=4000px',
        scrub: 1,
        pin: ".five",
      }
    });

    studioTimeline
    .to('.content-block-five', {duration: 10, filter: 'blur(10px)', opacity: 0, ease: 'linear'}, 0)
    // .to('.content-block-five', {duration: 10, opacity: 0, ease: 'linear'}, 0)
    .to('.footer-block-five', {duration: 5, filter: 'blur(15px)', ease: 'linear'}, 0)
    // .to('.footer-block-five', {duration: 5, ease: 'linear'}, 0)
    .to('.footer-block-five', {duration: 10, y: '-40vh', ease: 'linear'}, 0)
    // .add('studioAppear')
    .to('.studio-block-five', {duration: 20, scale: 1, opacity: 1, ease: 'linear'}, 0)
    .to('.studioGlass-block-five', {duration: 20, opacity: 1, ease: 'linear'}, 0)
    // .to('.content-block-five', {duration: 10, y: '-40vh', ease: 'linear'}, 0)
    // .add('contentToTop')
    .to('.studio-content', {duration: 10, y: '-30vh'})
    .add('studioContentDisappear')
    .to('.footer-block-five', {duration: 10, autoAlpha: 0, ease: 'linear'}, 'studioContentDisappear')
    .to('.studio-content', {duration: 10, autoAlpha: 0, ease: 'linear'}, 'studioContentDisappear')
    .add('blockContactsAppear')
    .to('.block-contacts', {duration: 15, autoAlpha: 1, ease: 'linear'}, 'blockContactsAppear')
    .add('studioDisappear')
    .to('.studio-block-five', {duration: 10, scale: 4, autoAlpha: 0, ease: 'linear'}, 'studioDisappear')
    .to('.studioGlass-block-five', {duration: 10, autoAlpha: 0, ease: 'linear'}, 'studioDisappear')
    .to('.block-contacts', {duration: 15, filter: 'blur(0px)', ease: 'linear'}, 'studioDisappear')
    // .to('.block-contacts', {duration: 15, ease: 'linear'}, 'studioDisappear')
    .to('.block-contacts__image-disc', {duration: 10, x: '20%', rotate: 360, ease: 'linear'})
    
  }
}

new AppAnimations();