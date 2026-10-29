/**
 * RON Precision Hardware Atelier
 * Ambient Vector Schematics & Interactive Particle Flow Canvas
 * Renders technical 1px CAD wireframes & reactive ultraviolet glow particles
 */

export class AmbientSchematics {
  constructor(canvasId = 'ron-ambient-canvas') {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) {
      this.canvas = document.createElement('canvas');
      this.canvas.id = canvasId;
      this.canvas.className = 'fixed inset-0 pointer-events-none z-0 opacity-80';
      document.body.prepend(this.canvas);
    }
    this.ctx = this.canvas.getContext('2d');
    this.mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2, targetX: window.innerWidth / 2, targetY: window.innerHeight / 2 };
    this.particles = [];
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.time = 0;

    this.init();
  }

  init() {
    this.resize();
    window.addEventListener('resize', () => this.resize(), { passive: true });
    window.addEventListener('mousemove', (e) => {
      this.mouse.targetX = e.clientX;
      this.mouse.targetY = e.clientY;
    }, { passive: true });

    // Generate floating subtle ambient particles
    this.particles = [];
    const count = Math.min(24, Math.floor(this.width / 50));
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        radius: Math.random() * 1.8 + 0.8,
        alpha: Math.random() * 0.3 + 0.1,
        color: Math.random() > 0.5 ? '#5336CC' : '#8B77A4'
      });
    }

    this.loop();
  }

  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width * window.devicePixelRatio;
    this.canvas.height = this.height * window.devicePixelRatio;
    this.canvas.style.width = `${this.width}px`;
    this.canvas.style.height = `${this.height}px`;
    this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
  }

  loop() {
    this.time += 0.015;
    // Smooth mouse damping
    this.mouse.x += (this.mouse.targetX - this.mouse.x) * 0.05;
    this.mouse.y += (this.mouse.targetY - this.mouse.y) * 0.05;

    this.ctx.clearRect(0, 0, this.width, this.height);

    // 1. Draw Subtle Ambient Shifting Gradient Halos (#5336CC into #8B77A4)
    const haloX1 = this.width * 0.2 + Math.sin(this.time * 0.7) * 80 + (this.mouse.x - this.width / 2) * 0.04;
    const haloY1 = this.height * 0.25 + Math.cos(this.time * 0.5) * 60 + (this.mouse.y - this.height / 2) * 0.04;
    const grad1 = this.ctx.createRadialGradient(haloX1, haloY1, 10, haloX1, haloY1, 480);
    grad1.addColorStop(0, 'rgba(83, 54, 204, 0.07)');
    grad1.addColorStop(0.5, 'rgba(139, 119, 164, 0.035)');
    grad1.addColorStop(1, 'rgba(254, 254, 255, 0)');
    this.ctx.fillStyle = grad1;
    this.ctx.fillRect(0, 0, this.width, this.height);

    const haloX2 = this.width * 0.8 + Math.cos(this.time * 0.6) * 100 - (this.mouse.x - this.width / 2) * 0.04;
    const haloY2 = this.height * 0.7 + Math.sin(this.time * 0.4) * 80 - (this.mouse.y - this.height / 2) * 0.04;
    const grad2 = this.ctx.createRadialGradient(haloX2, haloY2, 20, haloX2, haloY2, 540);
    grad2.addColorStop(0, 'rgba(83, 54, 204, 0.06)');
    grad2.addColorStop(0.6, 'rgba(139, 119, 164, 0.03)');
    grad2.addColorStop(1, 'rgba(254, 254, 255, 0)');
    this.ctx.fillStyle = grad2;
    this.ctx.fillRect(0, 0, this.width, this.height);

    // 2. Draw 1px Vector Line Art & Technical Case Schematics
    this.drawTechnicalSchematics();

    // 3. Draw Ambient Floating Precision Nodes
    this.particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = this.width;
      if (p.x > this.width) p.x = 0;
      if (p.y < 0) p.y = this.height;
      if (p.y > this.height) p.y = 0;

      // Distance to mouse for subtle glow connection
      const dx = this.mouse.x - p.x;
      const dy = this.mouse.y - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = p.color;
      this.ctx.globalAlpha = p.alpha;
      this.ctx.fill();

      if (dist < 140) {
        this.ctx.beginPath();
        this.ctx.moveTo(p.x, p.y);
        this.ctx.lineTo(this.mouse.x, this.mouse.y);
        this.ctx.strokeStyle = '#5336CC';
        this.ctx.globalAlpha = (1 - dist / 140) * 0.12;
        this.ctx.lineWidth = 0.8;
        this.ctx.stroke();
      }
    });

    this.ctx.globalAlpha = 1.0;
    requestAnimationFrame(() => this.loop());
  }

  drawTechnicalSchematics() {
    const ctx = this.ctx;
    const offsetX = (this.mouse.x - this.width / 2) * 0.025;
    const offsetY = (this.mouse.y - this.height / 2) * 0.025;

    ctx.save();
    ctx.translate(offsetX, offsetY);
    ctx.strokeStyle = '#8B77A4';
    ctx.lineWidth = 1;
    ctx.globalAlpha = 0.09;

    // Technical Crosshairs & Corner Cad Nodes in Top Left
    const cx1 = 70;
    const cy1 = 120;
    ctx.beginPath();
    ctx.moveTo(cx1 - 20, cy1);
    ctx.lineTo(cx1 + 20, cy1);
    ctx.moveTo(cx1, cy1 - 20);
    ctx.lineTo(cx1, cy1 + 20);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(cx1, cy1, 12, 0, Math.PI * 2);
    ctx.stroke();

    // Schematic Dimensions Line
    ctx.setLineDash([4, 6]);
    ctx.beginPath();
    ctx.moveTo(cx1, cy1 + 30);
    ctx.lineTo(cx1, cy1 + 260);
    ctx.stroke();
    ctx.setLineDash([]);

    // Phone Case Outer Profile Wireframe in Right Area
    const caseW = 280;
    const caseH = 560;
    const caseX = this.width - caseW - 60;
    const caseY = 160;

    if (caseX > 400) {
      // Rounded Case Bevel
      ctx.strokeStyle = '#5336CC';
      ctx.globalAlpha = 0.07;
      this.roundRect(ctx, caseX, caseY, caseW, caseH, 38);
      ctx.stroke();

      // MagSafe Magnetic Array Schematic
      ctx.strokeStyle = '#8B77A4';
      ctx.globalAlpha = 0.09;
      const magX = caseX + caseW / 2;
      const magY = caseY + caseH / 2 - 20;

      ctx.beginPath();
      ctx.arc(magX, magY, 56, 0, Math.PI * 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(magX, magY, 48, 0, Math.PI * 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(magX, magY + 64);
      ctx.lineTo(magX, magY + 92);
      ctx.stroke();

      // Corner Impact Damper Nodes (4 corners)
      const corners = [
        [caseX + 20, caseY + 20],
        [caseX + caseW - 20, caseY + 20],
        [caseX + 20, caseY + caseH - 20],
        [caseX + caseW - 20, caseY + caseH - 20]
      ];
      corners.forEach(([x, y]) => {
        ctx.beginPath();
        ctx.arc(x, y, 6, 0, Math.PI * 2);
        ctx.stroke();
      });
    }

    ctx.restore();
  }

  roundRect(ctx, x, y, width, height, radius) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
  }
}
