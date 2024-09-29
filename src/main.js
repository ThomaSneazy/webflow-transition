import Swup from 'swup';
import SwupParallelPlugin from '@swup/parallel-plugin';

const swup = new Swup({
    plugins: [new SwupParallelPlugin()],
    animationSelector: '[class*="transition-"]',
    animationScope: 'html'
});

swup.hooks.on('animation:in:start', () => {
    console.log('Animation entrante commence');
    document.documentElement.classList.add('is-changing');
});

swup.hooks.on('animation:out:end', () => {
    console.log('Animation sortante termine');
    document.documentElement.classList.remove('is-changing');
});

console.log('Swup initialisé');
