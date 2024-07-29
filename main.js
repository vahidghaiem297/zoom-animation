const svg = document.querySelector("#svg-mask");
const img = document.querySelector("#fixed-image");
const maskTitle = document.querySelector(".mask__title");
const chevron = document.querySelector("#inner-mask");

gsap.set(maskTitle, {
    y: chevron.getBoundingClientRect().height / 2
});
gsap.set(chevron, {
    transformOrigin: "center center"
});

//I don't know if I should just get the elements I want to animate and add them to a timeline
// const image1 = document.querySelector('.o-image-1');
// const image2 = document.querySelector('.o-image-2');
// const image3 = document.querySelector('.o-image-3');

//At the moment I am grabbing them all and then looping through them, this feels like it could be done using .batch?
const imageContainers = document.querySelectorAll(".content__image--animate");
imageContainers.forEach(imageContainer => {
    const imageAnim = gsap.to(imageContainer.querySelector('img'), {
        // ease: 'none',
        paused: true,
        yPercent: parseFloat(imageContainer.dataset.offsetY) || 0,
        duration: parseFloat(imageContainer.dataset.scrub) || 0.1
    });

    ScrollTrigger.create({
        animation: imageAnim,
        scrub: true,
        trigger: imageContainer,
        start: "top center",
        end: "bottom top",
        marker: true
    });
});

// Setup a timeline for the Mask and text
var tl = gsap.timeline({
    scrollTrigger: {
        trigger: '.--mask',
        pin: true,
        start: "top top",
        end: '+=925',
        scrub: 0.2,
        pinSpacing: false
    },
    defaults: {
        duration: 2,
        ease: "power3"
    }
}).to(maskTitle, {
    opacity: 0,
    duration: 0.15
}, 0).to(chevron, {
    scale: 35,
    yPercent: -550,
    duration: 4
}, 0);


// Fade in the text
gsap.set(".content__text", {
    y: 50
});

ScrollTrigger.batch(".content__text", {
    interval: 0.2,
    batchMax: 2,
    onEnter: batch => gsap.to(batch, {
        opacity: 1,
        y: 0,
        overwrite: true
    }),
    onLeave: batch => gsap.set(batch, {
        opacity: 0,
        y: -50,
        overwrite: true
    }),
    onEnterBack: batch => gsap.to(batch, {
        opacity: 1,
        y: 0,
        stagger: 0.15,
        overwrite: true
    }),
    onLeaveBack: batch => gsap.set(batch, {
        opacity: 0,
        y: 50,
        overwrite: true
    }),
    start: "top bottom",
    end: "bottom top",
    // markers: true
});

window.addEventListener("load", init);
window.addEventListener("resize", resize);

function init() {
    resize();
}

function resize() {
    tl.progress(0);
    tl.invalidate();
    ScrollTrigger.refresh();
}

ScrollTrigger.addEventListener("refreshInit", () => gsap.set(".content__text", {
    y: 0
}));
