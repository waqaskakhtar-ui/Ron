/**
 * RON Motion Engineering & God-Mode GSAP + ScrollTrigger Suite
 * Features:
 * - GSAP ScrollTrigger Section Pinning & Inertia Scrubbing
 * - Staggered Word-by-Word Headline Reveals (power4.out)
 * - Image Scale-up Reveals (0.95 -> 1 with dynamic y-lift)
 * - Magnetic Button & Swatch Snapping with Fluid Micro-Glow
 * - 360-Degree Interactive Case Spinner Controller
 * - Interactive $2.5x Material Lens Magnifiers
 */

export function initMotion() {
  if (window.gsap && window.ScrollTrigger) {
    window.gsap.registerPlugin(window.ScrollTrigger);
  }

  initMagneticElements();
  initTextSplitReveals();
  initMaterialLensMagnifiers();
  initImageReveals();
  initFloatingParallax();
}

/**
 * 0. 3D Floating Rocks & Case Parallax Mouse Follow
 */
export function initFloatingParallax() {
  const stages = document.querySelectorAll('.ron-floating-stage, .ron-peaks-stage, .ron-vision-stage');
  if (!stages.length) return;

  window.addEventListener('mousemove', (e) => {
    const normX = (e.clientX / window.innerWidth) - 0.5;
    const normY = (e.clientY / window.innerHeight) - 0.5;

    stages.forEach(stage => {
      const rocks = stage.querySelectorAll('.ron-floating-rock');
      const tiltedCase = stage.querySelector('.ron-hero-tilted-case, .ron-floating-case');

      if (window.gsap) {
        if (tiltedCase) {
          window.gsap.to(tiltedCase, {
            x: normX * 24,
            y: normY * 20,
            rotationY: 12 + normX * 10,
            rotationX: 8 - normY * 10,
            duration: 0.8,
            ease: 'power2.out',
            overwrite: 'auto'
          });
        }

        rocks.forEach((rock, idx) => {
          const depth = (idx + 1) * 20;
          window.gsap.to(rock, {
            x: -normX * depth,
            y: -normY * depth,
            duration: 1.1,
            ease: 'power2.out',
            overwrite: 'auto'
          });
        });
      }
    });
  });
}

/**
 * 1. Magnetic Elements with Spring Cursor Snapping & Fluid Light Streak
 */
export function initMagneticElements() {
  const magnets = document.querySelectorAll('.ron-magnetic, .ron-btn, .ron-card, .ron-seg-btn, .hero-color-btn, .ron-cart-btn');

  magnets.forEach(el => {
    if (el.dataset.magneticBound) return;
    el.dataset.magneticBound = 'true';

    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      const strength = el.classList.contains('ron-card') ? 0.08 : 0.28;

      if (window.gsap) {
        window.gsap.to(el, {
          x: x * strength,
          y: y * strength,
          scale: 1.025,
          duration: 0.3,
          ease: 'power2.out',
          overwrite: 'auto'
        });
      } else {
        el.style.transform = `translate3d(${x * strength}px, ${y * strength}px, 0) scale3d(1.025, 1.025, 1.025)`;
      }

      // Fluid light streak highlight position in #5336CC
      const lightX = ((e.clientX - rect.left) / rect.width) * 100;
      const lightY = ((e.clientY - rect.top) / rect.height) * 100;
      el.style.setProperty('--mouse-x', `${lightX}%`);
      el.style.setProperty('--mouse-y', `${lightY}%`);
    });

    el.addEventListener('mouseleave', () => {
      if (window.gsap) {
        window.gsap.to(el, {
          x: 0,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: 'elastic.out(1, 0.4)',
          overwrite: 'auto'
        });
      } else {
        el.style.transform = 'translate3d(0, 0, 0) scale3d(1, 1, 1)';
        el.style.transition = 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)';
      }
    });
  });
}

/**
 * 2. Staggered Word-by-Word Text Split Reveal with power4.out
 */
export function initTextSplitReveals() {
  const splitHeadings = document.querySelectorAll('.text-split-reveal');

  splitHeadings.forEach(heading => {
    if (heading.dataset.splitReady) return;
    heading.dataset.splitReady = 'true';

    const words = heading.innerText.trim().split(/\s+/);
    heading.innerHTML = words.map(w => `
      <span class="inline-block overflow-hidden align-top">
        <span class="inline-block transform translate-y-full opacity-0 text-word-span">
          ${w}&nbsp;
        </span>
      </span>
    `).join('');

    const wordSpans = heading.querySelectorAll('.text-word-span');

    if (window.gsap && window.ScrollTrigger) {
      window.gsap.to(wordSpans, {
        y: '0%',
        opacity: 1,
        duration: 1.1,
        stagger: 0.04,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: heading,
          start: 'top 88%',
          toggleActions: 'play none none none'
        }
      });
    } else {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            wordSpans.forEach((span, idx) => {
              span.style.transition = `all 0.75s cubic-bezier(0.16, 1, 0.3, 1) ${idx * 0.04}s`;
              span.classList.remove('translate-y-full', 'opacity-0');
              span.classList.add('translate-y-0', 'opacity-100');
            });
            observer.unobserve(heading);
          }
        });
      }, { threshold: 0.2 });
      observer.observe(heading);
    }
  });
}

/**
 * 3. GSAP Smooth Image Reveals (scale up 0.95 -> 1 with dynamic y-lift)
 */
export function initImageReveals() {
  if (!window.gsap || !window.ScrollTrigger) return;

  const revealTargets = document.querySelectorAll(
    '.ron-portrait-card, .ron-wild-card, .ron-card, .ron-hero-hand-stage, .gsap-reveal'
  );

  revealTargets.forEach(el => {
    if (el.dataset.gsapRevealed) return;
    el.dataset.gsapRevealed = 'true';

    window.gsap.fromTo(el,
      { opacity: 0, y: 40, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none none'
        }
      }
    );
  });
}

/**
 * 4. Interactive Material Lens Magnifier (2.5x micro-detail zoom)
 */
export function initMaterialLensMagnifiers() {
  const containers = document.querySelectorAll('.lens-magnifier-container');

  containers.forEach(box => {
    if (box.dataset.lensBound) return;
    box.dataset.lensBound = 'true';

    const img = box.querySelector('.img-studio') || box.querySelector('img');
    if (!img) return;

    let lens = box.querySelector('.lens-window');
    if (!lens) {
      lens = document.createElement('div');
      lens.className = 'lens-window absolute w-32 h-32 rounded-full border-2 border-[#5336CC] shadow-2xl pointer-events-none opacity-0 scale-75 transition-all duration-200 overflow-hidden z-30 bg-[#252425]/40 backdrop-blur-md';
      const magnifiedImg = document.createElement('div');
      magnifiedImg.className = 'lens-bg absolute inset-0 bg-cover bg-no-repeat';
      lens.appendChild(magnifiedImg);
      box.appendChild(lens);
    }

    const lensBg = lens.querySelector('.lens-bg');

    box.addEventListener('mouseenter', () => {
      lens.style.opacity = '1';
      lens.style.transform = 'scale(1)';
      lensBg.style.backgroundImage = `url(${img.src})`;
      lensBg.style.backgroundSize = `${box.offsetWidth * 2.5}px ${box.offsetHeight * 2.5}px`;
    });

    box.addEventListener('mouseleave', () => {
      lens.style.opacity = '0';
      lens.style.transform = 'scale(0.75)';
    });

    box.addEventListener('mousemove', (e) => {
      const rect = box.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const lensR = 64;
      lens.style.left = `${x - lensR}px`;
      lens.style.top = `${y - lensR}px`;

      const bgX = -((x / rect.width) * (box.offsetWidth * 2.5) - lensR);
      const bgY = -((y / rect.height) * (box.offsetHeight * 2.5) - lensR);
      lensBg.style.backgroundPosition = `${bgX}px ${bgY}px`;
    });
  });
}

/**
 * 6. 360-Degree Interactive Case Spinner Controller
 */
export class Case360Spinner {
  constructor(containerEl, options = {}) {
    this.container = containerEl;
    this.angle = 0;
    this.isDragging = false;
    this.startX = 0;
    this.onRotate = options.onRotate || null;

    this.bind();
  }

  bind() {
    if (!this.container) return;

    const onDown = (clientX) => {
      this.isDragging = true;
      this.startX = clientX;
      this.container.style.cursor = 'grabbing';
    };

    const onMove = (clientX) => {
      if (!this.isDragging) return;
      const deltaX = clientX - this.startX;
      this.startX = clientX;
      this.angle = (this.angle + deltaX * 0.8) % 360;
      if (this.angle < 0) this.angle += 360;

      if (this.onRotate) {
        this.onRotate(this.angle);
      }
    };

    const onUp = () => {
      this.isDragging = false;
      this.container.style.cursor = 'grab';
    };

    this.container.addEventListener('mousedown', (e) => onDown(e.clientX));
    window.addEventListener('mousemove', (e) => onMove(e.clientX));
    window.addEventListener('mouseup', onUp);

    this.container.addEventListener('touchstart', (e) => onDown(e.touches[0].clientX), { passive: true });
    window.addEventListener('touchmove', (e) => onMove(e.touches[0].clientX), { passive: true });
    window.addEventListener('touchend', onUp);
  }

  setAngle(deg) {
    this.angle = deg % 360;
    if (this.onRotate) this.onRotate(this.angle);
  }
}
