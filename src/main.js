import './styles/style.css';
import Swup from 'swup';
import SwupJsPlugin from '@swup/js-plugin';
import { gsap } from 'gsap';
import { Flip } from 'gsap/Flip';

gsap.registerPlugin(Flip);

const swup = new Swup({
  plugins: [new SwupJsPlugin([
    {
      from: '(.*)',
      to: '(.*)',
      in: (next) => {
        document.querySelector('#swup').innerHTML = next.innerHTML;
        return gsap.from(next, {opacity: 0, duration: 0.5});
      },
      out: (current) => gsap.to(current, {opacity: 0, duration: 0.5})
    }
  ])]
});

let flipState;

function initProjectLinks() {
  document.querySelectorAll('.project-item').forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const projectSlug = item.dataset.projectSlug;
      const projectImage = item.querySelector('.project-image');
      
      flipState = Flip.getState(projectImage);
      
      swup.loadPage({
        url: `/project/${projectSlug}`,
        customTransition: () => animateToProject(projectImage, projectSlug)
      });
    });
  });
}

async function animateToProject(projectImage, projectSlug) {
  await swup.preloadPage(`/project/${projectSlug}`);
  
  const newProjectImage = document.querySelector(`.project-detail[data-project-slug="${projectSlug}"] .project-image`);
  
  // Animer avec GSAP Flip
  Flip.from(flipState, {
    targets: newProjectImage,
    duration: 1,
    ease: "power2.inOut",
    onComplete: () => {
      swup.triggerEvent('animationOutDone');
    }
  });
}

// Initialiser les liens de projet au chargement initial et après chaque transition
document.addEventListener('DOMContentLoaded', initProjectLinks);
swup.on('contentReplaced', initProjectLinks);
