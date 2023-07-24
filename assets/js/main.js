import { gsap } from 'gsap';

document.addEventListener("DOMContentLoaded", function () {
  const tl = gsap.timeline({ defaults: { duration: .22 } });
  const containerBars = document.querySelector(".bars");
  const barArray = document.querySelectorAll('.bars .bar');
  const mainContentHeight = document.querySelector('.main__content').clientHeight;

  // * We dynamically calculate the item's movement distance for the animation
  const yDistance = parseFloat((mainContentHeight / 2) - (barArray[0].clientHeight / 2)).toFixed(2);

  // * This variable triggers the first animation
  let firstLaunch = true;
  const tween = tl.to('.bar:nth-child(2)', { scale: 0 }, { scale: 1 })
    .fromTo('.bar:first-child', { y: 0 }, { y: yDistance }, "<")
    .fromTo('.bar:last-child', { y: 0 }, { y: -yDistance }, "<")
    .fromTo('.bar:nth-child(2)', { display: 'block' }, { display: 'none' })
    .fromTo('.bar:first-child', { rotateZ: 0 }, { rotateZ: 45 })
    .fromTo('.bar:last-child', { rotateZ: 0 }, { rotateZ: 135 }, "<")
    .pause();

  // * Bars click event
  containerBars.addEventListener("click", function () {
    if(!tween.isActive()) {
      // * Only reverse the direction if the tween is not active
      firstLaunch || tween.reversed() ? tween.play() : tween.reverse();
      firstLaunch = false;
    }
  });
});
