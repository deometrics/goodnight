function randomNumber(max){
    let value = Math.floor(Math.random() * max);
    return value;
} 
document.querySelectorAll('.stars').forEach(star => {
    star.style.margin = randomNumber(5) + '% ' + randomNumber(0) + ' '  + randomNumber(5) + '% ' + randomNumber(100) + '% ';
    star.style.transform = `scale(${randomNumber(125)/100})`;
    star.style.background= `rgb(${randomNumber(255)}, 125, 255, ${randomNumber(10)/10})`
});

var Intro = anime({
    targets: 'body',
    opacity: [0,1],
    duration: 1000,
    delay: 500,
    easing: "easeInQuad"
 });

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

var wavesIntro = anime({
    targets: '#gentle-wave',
    translateY: [200,0],
    duration: 2000,
    delay: 1000,
    easing: 'easeOutQuint',
});

var sunAnimation = anime({
    targets: '.sun',
    scale: [1,1],
    translateY: '300vh',
    opacity: [1,0],
    autoplay: false,
 });

 var moonAnimation = anime({
    targets: '.moon',
    scale: [0,1.7],
    translateY: ['200vh', '-80vh'],
    'box-shadow' : ['0rem 0rem 0rem 0rem #7A79B1', '3rem 1.5rem 0rem 0rem #ffffff'],
    autoplay: false,
 });

var wavesAnimation = anime({
    targets: '.parallax',
    translateY: [0, 0],
    translateX: 200,
    fill: '#fff',
    duration: anime.stagger(750),
    autoplay: false,
 });

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
 
var starsAnimation = anime({
    targets: '.stars',
    filter: [
        {value: "brightness(4)" },
        {value: "brightness(1)"}
    ],
    autoplay: false,
});

var textWrapper = document.querySelector('.introText .letters');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

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

(function () {
    var scroll = new LocomotiveScroll({
        el: document.querySelector('[data-scroll-container]'),
        smooth: true
    });

    scroll.on('scroll', (args) => {
        if(typeof args.currentElements['waves'] === 'object') {
            let progress = args.currentElements['waves'].progress;
            wavesAnimation.seek(progress * 100)
            starsAnimation.seek(progress * 100)
            sunAnimation.seek(progress * 100)
            moonAnimation.seek(progress * 100)
        }
    });

    var textWrapper2 = document.querySelector('.goodmorningText .goodmorningletters');
    textWrapper2.innerHTML = textWrapper2.textContent.replace(/\S/g, "<span class='goodmorningLetter'>$&</span>");

    var goodMorningAnimation = anime.timeline({loop: false});

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







