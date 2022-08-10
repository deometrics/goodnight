// creates a random number between 0 and (max)
function randomNumber(max){
    let value = Math.floor(Math.random() * max);
    return value;
} 

// gives each div with the id "star" a random margin, scale and background colour, so the stars are randomly generated every time you load the page.
document.querySelectorAll('.stars').forEach(star => {
    star.style.margin = randomNumber(5) + '% ' + randomNumber(0) + ' '  + randomNumber(5) + '% ' + randomNumber(100) + '% ';
    star.style.transform = `scale(${randomNumber(125)/100})`;
    star.style.background= `rgb(${randomNumber(255)}, 125, 255, ${randomNumber(10)/10})`
});

//fades in the page
var Intro = anime({
    targets: 'body',
    opacity: [0,1],
    duration: 1000,
    delay: 500,
    easing: "easeInQuad"
 });

//intro bounce animation for the sun element
var sunIntro = anime.timeline({loop: false});
sunIntro
  .add({
    targets: '.sun',
    scale: [0.3,1],
    opacity: [0,1],
    translateZ: 0,
    easing: "easeOutBounce",
    duration: 1000,
    delay: 1700
});

//intro slide-in animation for the waves
var wavesIntro = anime({
    targets: '#gentle-wave',
    translateY: [200,0],
    duration: 2000,
    delay: 1000,
    easing: 'easeOutQuint',
});

//sun scrolling animation
var sunAnimation = anime({
    targets: '.sun',
    scale: [1,1],
    translateY: '300vh',
    opacity: [1,0],
    autoplay: false,
 });

//moon scrolling animation
 var moonAnimation = anime({
    targets: '.moon',
    scale: [0,1.7],
    translateY: ['200vh', '-80vh'],
    'box-shadow' : ['0rem 0rem 0rem 0rem #7A79B1', '3rem 1.5rem 0rem 0rem #ffffff'],
    autoplay: false,
 });

//waves side scrolling animation
var wavesAnimation = anime({
    targets: '.parallax',
    translateY: [0, 0],
    translateX: 200,
    fill: '#fff',
    duration: anime.stagger(750),
    autoplay: false,
 });

//stars intro pop animation, staggered for each star
var starsIntroAnimation = anime.timeline({loop: false});
starsIntroAnimation
  .add({
    targets: '.stars',
    opacity: [0,1],
    translateZ: 0,
    easing: "easeOutBounce",
    duration: 500,
    delay: anime.stagger(30, {start: 2000})
});

 //changes brightness of all stars as you scroll down the page
var starsAnimation = anime({
    targets: '.stars',
    filter: [
        {value: "brightness(4)" },
        {value: "brightness(1)"}
    ],
    autoplay: false,
});

//wraps each letter in the introtext class in a span, so each letter can be animated separately
var textWrapper = document.querySelector('.introText .letters');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

//animates both the word and each letter of the text "good night." using the stagger function
var goodNightAnimation = anime.timeline({loop: false});
goodNightAnimation
  .add({
    targets: '.introText .letter',
    scale: [0.3,1],
    opacity: [0,1],
    translateZ: 0,
    easing: "easeOutBounce",
    duration: 800,
    delay: anime.stagger(30, {start:4000})
});

//locomotive scroll declaration/initialization
(function () {
    var scroll = new LocomotiveScroll({
        el: document.querySelector('[data-scroll-container]'),
        smooth: true,
        mobile: {
            breakpoint: 0,
            smooth: true
        },
        tablet: {
            breakpoint: 0,
            smooth: true
        }
    });

//grabs scroll progress/position (a decimal value) from the 'waves' data-scroll-id, turns it in to a percentage, and then uses that percentage to control the timeline of the waves, sun, stars and moon animations
    scroll.on('scroll', (args) => {
        if(typeof args.currentElements['waves'] === 'object') {
            let progress = args.currentElements['waves'].progress;
            wavesAnimation.seek(progress * 100)
            starsAnimation.seek(progress * 100)
            sunAnimation.seek(progress * 100)
            moonAnimation.seek(progress * 100)
        }
    });

//wraps each letter in the goodmorningText class in a span, so each letter can be animated separately
    var textWrapper2 = document.querySelector('.goodmorningText .goodmorningletters');
    textWrapper2.innerHTML = textWrapper2.textContent.replace(/\S/g, "<span class='goodmorningLetter'>$&</span>");

    var goodMorningAnimation = anime.timeline({loop: false});

//animates both the word and each letter of the text "good morning." using the stagger function
    scroll.on('call', func => {
        if(func == "goodmorning"){
            goodMorningAnimation
            .add({
                targets: '.goodmorningText .goodmorningLetter',
                scale: [0.3,1],
                opacity: [0,1],
                translateZ: 0,
                easing: "easeOutBounce",
                duration: 1000,
                delay: anime.stagger(30, {start:1000}),
            });
        }
    });

//makes both instances of text clikcable, which smoothly scrolls to the other instance to text.
    const target = document.querySelector('#scrollTarget');
    const nightEvent = document.querySelector('.content')
    const dayEvent = document.querySelector('.goodmorning')


    nightEvent.addEventListener('click', () =>{
        scroll.scrollTo(target, {
            duration: 3000,
            easing: [0.42, 0.0, 0.58, 1.0]
        });
    });
    dayEvent.addEventListener('click', () =>{
        scroll.scrollTo('top', {
            duration: 3000,
            easing: [0.42, 0.0, 0.58, 1.0]
        });
    });
})();







