import './styles/style.css';
import Swup from 'swup';
import SwupParallelPlugin from '@swup/parallel-plugin';
import gsap from 'gsap';
import SplitType from 'split-type';

const swup = new Swup({
    plugins: [new SwupParallelPlugin()]
});

function hideText(container) {
  gsap.set(container.querySelectorAll('.h1-gsap, .p-gsap'), { opacity: 0 });
}

function animateText(container) {
  // Animation pour les titres h1
  const h1Elements = container.querySelectorAll('.h1-gsap');
  h1Elements.forEach(element => {
    const splitText = new SplitType(element, { types: 'chars' });
    gsap.set(element, { opacity: 1 });
    gsap.fromTo(splitText.chars, 
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.05,
        stagger: 0.05,
        ease: "power1.inOut",
      }
    );
  });

  // Animation pour les paragraphes
  const pElements = container.querySelectorAll('.p-gsap');
  pElements.forEach(element => {
    const splitText = new SplitType(element, { types: 'lines' });
    
    gsap.set(element, { overflow: 'hidden', opacity: 1 });
    
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
      }
    );
  });
}

// Anime le texte après le chargement initial de la page
document.addEventListener('DOMContentLoaded', () => {
  animateText(document);
});

// Cache le texte du nouveau contenu dès qu'il est inséré
swup.hooks.on('content:insert', () => {
  const nextContainer = document.querySelector('.transition-slide:not(.is-previous-container)');
  const previousContainer = document.querySelector('.transition-slide.is-previous-container');
  
  if (nextContainer) {
    hideText(nextContainer);
    nextContainer.style.zIndex = '2';
  }
  
  if (previousContainer) {
    previousContainer.style.zIndex = '1';
  }
});

// Exécute l'animation après la transition Swup
swup.hooks.on('content:replace', () => {
  const nextContainer = document.querySelector('.transition-slide:not(.is-previous-container)');
  if (nextContainer) {
    hideText(nextContainer);
    setTimeout(() => {
      animateText(nextContainer);
      nextContainer.style.zIndex = '1';
    }, 1700);
  }
  
  // Supprimer les styles z-index inline après la transition
  setTimeout(() => {
    document.querySelectorAll('.transition-slide').forEach(container => {
      container.style.removeProperty('z-index');
    });
  }, 2000); // Ajustez ce délai si nécessaire
});

console.log('test- transi');
