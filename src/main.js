import Swup from 'swup';
import SwupOverlayTheme from '@swup/overlay-theme';
import gsap from 'gsap';
import SplitType from 'split-type';

const swup = new Swup({
    plugins: [new SwupOverlayTheme()]
});

new SwupOverlayTheme({
    direction: 'to-right'
});

function animateText() {
  // Animation pour les titres h1
  const h1Elements = document.querySelectorAll('.h1-gsap');
  h1Elements.forEach(element => {
    const splitText = new SplitType(element, { types: 'chars' });
    gsap.set(splitText.chars, { opacity: 0 });
    gsap.to(splitText.chars, {
      opacity: 1,
      duration: 0.05,
      stagger: 0.05,
      ease: "power1.inOut",
      delay: 0.2 
    });
  });

  const pElements = document.querySelectorAll('.p-gsap');
  pElements.forEach(element => {
    const splitText = new SplitType(element, { types: 'lines' });
    
    gsap.set(element, { overflow: 'hidden' });
    
    splitText.lines.forEach(line => {
      const wrapper = document.createElement('div');
      wrapper.style.overflow = 'hidden';
      line.parentNode.insertBefore(wrapper, line);
      wrapper.appendChild(line);
    });
    
    gsap.fromTo(splitText.lines, 
      { 
        yPercent: 100,
        skewY: 2,
        transformOrigin: "left top"
      },
      { 
        yPercent: 0,
        skewY: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power4.out",
        delay: 0.4 
      }
    );
  });
}

// Exécute l'animation après le chargement initial de la page
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(animateText, 100);
});

// Exécute l'animation après que la transition Swup soit complètement terminée
swup.hooks.on('page:view', () => {
  setTimeout(animateText, 1000); // Augmenté à 1000ms pour laisser plus de temps à la transition
});

console.log('test- transi');
