/**
 * Thai Consonant Tracing Game Logic (เกมฝึกเขียนตามรอยเส้นประ พยัญชนะไทย ก - ฮ)
 * Version: v1.3.0
 * Features:
 * - Standard Looped Thai Kindergarten Fonts ('Sarabun', 'Noto Sans Thai', 'Krub')
 * - Gray Outline Template matching standard preschool handwriting sheets
 * - Pixel-accurate Glyph Checkpoint Sampling (100% matches genuine Thai letters)
 * - Auto-fitting 100% screen layout (no vertical overflow)
 */

class ThaiTracingGame {
  constructor() {
    this.consonants = typeof THAI_CONSONANTS_DATA !== 'undefined' ? THAI_CONSONANTS_DATA : [];
    this.currentIndex = 0;
    this.mode = 'sequential'; // 'sequential' | 'random'
    this.currentColor = 'rainbow'; // 'rainbow' | hex code
    this.rainbowHue = 0;

    // Checkpoint & Tracing State
    this.checkpoints = [];
    this.passedCheckpointsCount = 0;
    this.isDrawing = false;
    this.lastPoint = null;
    this.userStrokes = []; // Array of strokes: [{ color, points: [{x, y}] }]
    this.currentStroke = null;
    this.isCompleted = false;

    // Animated Demo State
    this.demoRunning = false;
    this.demoAnimId = null;

    // DOM Elements
    this.initDOMElements();
    this.setupCanvas();
    this.bindEvents();

    // Start with first consonant
    this.loadConsonant(this.currentIndex);

    // Re-checkpoints when web fonts are fully loaded
    if (document.fonts) {
      document.fonts.ready.then(() => {
        this.setupCheckpoints(this.consonants[this.currentIndex]);
      });
    }
  }

  initDOMElements() {
    // Canvas & Slate
    this.canvas = document.getElementById('tracingCanvas');
    this.ctx = this.canvas ? this.canvas.getContext('2d') : null;
    this.guideSvg = document.getElementById('guideSvg');

    // Gray Template SVG Text Elements
    this.tplTextBase = document.getElementById('tplTextBase');
    this.tplTextOutline = document.getElementById('tplTextOutline');
    this.tplTextDashed = document.getElementById('tplTextDashed');

    // Markers
    this.startMarker = document.getElementById('startMarker');
    this.startBadge = document.getElementById('startBadge');
    this.startArrow = document.getElementById('startArrow');
    this.demoCursor = document.getElementById('demoCursor');

    // Progress
    this.progressFill = document.getElementById('progressFill');
    this.progressPercentText = document.getElementById('progressPercentText');

    // Navigation & Badges
    this.currentLetterBadge = document.getElementById('currentLetterBadge');
    this.modeBadge = document.getElementById('modeBadge');
    this.btnPrevLetter = document.getElementById('btnPrevLetter');
    this.btnNextLetter = document.getElementById('btnNextLetter');
    this.btnRandomLetter = document.getElementById('btnRandomLetter');
    this.btnModeSeq = document.getElementById('btnModeSeq');
    this.btnModeRand = document.getElementById('btnModeRand');
    this.btnOpenLetterPicker = document.getElementById('btnOpenLetterPicker');

    // Tools
    this.btnDemo = document.getElementById('btnDemo');
    this.btnClear = document.getElementById('btnClear');
    this.btnUndo = document.getElementById('btnUndo');
    this.crayonBtns = document.querySelectorAll('.crayon-btn');

    // Letter Card
    this.cardLetterBadge = document.getElementById('cardLetterBadge');
    this.cardLetterName = document.getElementById('cardLetterName');
    this.cardLetterPhonetic = document.getElementById('cardLetterPhonetic');
    this.cardLetterRhyme = document.getElementById('cardLetterRhyme');
    this.cardMascotImg = document.getElementById('cardMascotImg');
    this.cardMascotFallback = document.getElementById('cardMascotFallback');
    this.fallbackEmoji = document.getElementById('fallbackEmoji');
    this.fallbackLabel = document.getElementById('fallbackLabel');
    this.cardWritingTip = document.getElementById('cardWritingTip');
    this.btnPlaySpeech = document.getElementById('btnPlaySpeech');

    // Modals
    this.letterPickerModal = document.getElementById('letterPickerModal');
    this.btnClosePicker = document.getElementById('btnClosePicker');
    this.letterGrid44 = document.getElementById('letterGrid44');

    this.celebrationModal = document.getElementById('celebrationModal');
    this.celebrationChar = document.getElementById('celebrationChar');
    this.btnNextCelebration = document.getElementById('btnNextCelebration');
    this.btnRetryCelebration = document.getElementById('btnRetryCelebration');

    // Confetti
    this.confettiCanvas = document.getElementById('confettiCanvas');
    this.confettiCtx = this.confettiCanvas ? this.confettiCanvas.getContext('2d') : null;
  }

  setupCanvas() {
    if (!this.canvas || !this.ctx) return;
    // Internal coordinate resolution is fixed at 400x400 square for crisp math
    this.canvasWidth = 400;
    this.canvasHeight = 400;
    this.canvas.width = this.canvasWidth;
    this.canvas.height = this.canvasHeight;
    this.ctx.lineCap = 'round';
    this.ctx.lineJoin = 'round';
  }

  bindEvents() {
    // Drawing Pointer Events
    if (this.canvas) {
      this.canvas.addEventListener('pointerdown', (e) => this.handlePointerDown(e));
      this.canvas.addEventListener('pointermove', (e) => this.handlePointerMove(e));
      this.canvas.addEventListener('pointerup', (e) => this.handlePointerUp(e));
      this.canvas.addEventListener('pointercancel', (e) => this.handlePointerUp(e));
    }

    // Crayons
    this.crayonBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        this.crayonBtns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        this.currentColor = btn.getAttribute('data-color') || 'rainbow';
        if (window.soundManager) window.soundManager.playPop();
      });
    });

    // Tools
    if (this.btnDemo) {
      this.btnDemo.addEventListener('click', () => this.toggleDemo());
    }
    if (this.btnClear) {
      this.btnClear.addEventListener('click', () => {
        this.clearCanvas();
        if (window.soundManager) window.soundManager.playPop();
      });
    }
    if (this.btnUndo) {
      this.btnUndo.addEventListener('click', () => {
        this.undoStroke();
        if (window.soundManager) window.soundManager.playPop();
      });
    }

    // Navigation
    if (this.btnPrevLetter) {
      this.btnPrevLetter.addEventListener('click', () => this.prevLetter());
    }
    if (this.btnNextLetter) {
      this.btnNextLetter.addEventListener('click', () => this.nextLetter());
    }
    if (this.btnRandomLetter) {
      this.btnRandomLetter.addEventListener('click', () => this.randomLetter());
    }

    // Mode Toggle
    if (this.btnModeSeq) {
      this.btnModeSeq.addEventListener('click', () => this.setMode('sequential'));
    }
    if (this.btnModeRand) {
      this.btnModeRand.addEventListener('click', () => this.setMode('random'));
    }

    // Speech Audio
    if (this.btnPlaySpeech) {
      this.btnPlaySpeech.addEventListener('click', () => this.speakCurrentLetter());
    }

    // Letter Picker Modal
    if (this.btnOpenLetterPicker) {
      this.btnOpenLetterPicker.addEventListener('click', () => this.openLetterPicker());
    }
    if (this.btnClosePicker) {
      this.btnClosePicker.addEventListener('click', () => this.closeLetterPicker());
    }
    if (this.letterPickerModal) {
      this.letterPickerModal.addEventListener('click', (e) => {
        if (e.target === this.letterPickerModal) this.closeLetterPicker();
      });
    }

    // Celebration Modal
    if (this.btnNextCelebration) {
      this.btnNextCelebration.addEventListener('click', () => {
        this.closeCelebration();
        this.nextLetter();
      });
    }
    if (this.btnRetryCelebration) {
      this.btnRetryCelebration.addEventListener('click', () => {
        this.closeCelebration();
        this.clearCanvas();
      });
    }

    // Audio Toggle
    const audioBtn = document.getElementById('audioToggleBtn');
    if (audioBtn && window.soundManager) {
      audioBtn.addEventListener('click', () => {
        const isMuted = window.soundManager.toggleSound();
        audioBtn.classList.toggle('active', !isMuted);
      });
    }

    // Window Resize / Orientation
    window.addEventListener('resize', () => {
      this.updateStartMarkerPosition();
    });
  }

  // =========================================================================
  // Consonant Loading & Setup
  // =========================================================================
  loadConsonant(index) {
    if (index < 0 || index >= this.consonants.length) return;
    this.stopDemo();
    this.currentIndex = index;
    const item = this.consonants[index];

    // Update Header & Badge
    if (this.currentLetterBadge) {
      this.currentLetterBadge.innerHTML = `
        <span class="index-badge">${index + 1}/44</span>
        <span>${item.name}</span>
      `;
    }

    // Update Letter Card with Looped Font
    if (this.cardLetterBadge) {
      this.cardLetterBadge.textContent = item.letter;
      this.cardLetterBadge.style.background = `linear-gradient(135deg, ${item.color} 0%, #db2777 100%)`;
    }
    if (this.cardLetterName) {
      this.cardLetterName.textContent = item.name;
    }
    if (this.cardLetterPhonetic) {
      this.cardLetterPhonetic.textContent = `(${item.phonetic})`;
    }
    if (this.cardLetterRhyme) {
      this.cardLetterRhyme.textContent = item.rhyme;
    }
    if (this.cardWritingTip) {
      this.cardWritingTip.innerHTML = `<span>💡</span> <span><strong>วิธีเขียน:</strong> ${item.instruction}</span>`;
    }

    // Mascot Image / 3D Fallback
    if (item.img) {
      if (this.cardMascotImg) {
        this.cardMascotImg.src = item.img;
        this.cardMascotImg.alt = item.name;
        this.cardMascotImg.style.display = 'block';
      }
      if (this.cardMascotFallback) {
        this.cardMascotFallback.style.display = 'none';
      }
    } else {
      if (this.cardMascotImg) {
        this.cardMascotImg.style.display = 'none';
      }
      if (this.cardMascotFallback) {
        this.cardMascotFallback.style.display = 'flex';
      }
      if (this.fallbackEmoji) {
        this.fallbackEmoji.textContent = item.emoji || '✨';
      }
      if (this.fallbackLabel) {
        this.fallbackLabel.textContent = item.name;
      }
    }

    // Update SVG Template Texts (Authentic Looped Letter Glyph)
    if (this.tplTextBase) this.tplTextBase.textContent = item.letter;
    if (this.tplTextOutline) this.tplTextOutline.textContent = item.letter;
    if (this.tplTextDashed) this.tplTextDashed.textContent = item.letter;

    // Position Start Marker Badge and Arrow (at the authentic head circle)
    this.updateStartMarkerPosition();

    // Setup Authentic Glyph Checkpoints
    this.setupCheckpoints(item);

    // Reset Canvas and Tracing State
    this.clearCanvas();
    this.isCompleted = false;

    // Update Prev/Next button disabled state in sequential mode
    if (this.btnPrevLetter) {
      this.btnPrevLetter.style.opacity = (this.mode === 'sequential' && index === 0) ? '0.5' : '1';
      this.btnPrevLetter.style.pointerEvents = (this.mode === 'sequential' && index === 0) ? 'none' : 'auto';
    }
    if (this.btnNextLetter) {
      this.btnNextLetter.style.opacity = (this.mode === 'sequential' && index === this.consonants.length - 1) ? '0.5' : '1';
      this.btnNextLetter.style.pointerEvents = (this.mode === 'sequential' && index === this.consonants.length - 1) ? 'none' : 'auto';
    }
  }

  // Sample Checkpoints directly from the Authentic Thai Font Glyph
  setupCheckpoints(item) {
    this.checkpoints = [];
    this.passedCheckpointsCount = 0;

    try {
      // Offscreen canvas to rasterize the true Thai character glyph
      const offCanvas = document.createElement('canvas');
      offCanvas.width = 400;
      offCanvas.height = 400;
      const offCtx = offCanvas.getContext('2d');
      offCtx.font = "bold 275px 'Sarabun', 'Noto Sans Thai', 'Thonburi', sans-serif";
      offCtx.textAlign = 'center';
      offCtx.textBaseline = 'alphabetic';
      offCtx.fillStyle = '#000000';
      offCtx.fillText(item.letter, 200, 285);

      const imgData = offCtx.getImageData(0, 0, 400, 400);
      const data = imgData.data;

      // Sample a clean grid of points inside the letter's stroke
      const step = 16;
      const rawPoints = [];
      for (let y = 30; y < 380; y += step) {
        for (let x = 30; x < 380; x += step) {
          const idx = (y * 400 + x) * 4;
          if (data[idx + 3] > 60) {
            rawPoints.push({ x, y, passed: false });
          }
        }
      }

      if (rawPoints.length > 0) {
        // Sort points starting near item.startPoint
        const startX = item.startPoint ? item.startPoint.x : 200;
        const startY = item.startPoint ? item.startPoint.y : 150;

        // Path sequencing: nearest neighbor traversal starting from startPoint
        const sorted = [];
        let current = { x: startX, y: startY };
        const remaining = [...rawPoints];

        while (remaining.length > 0) {
          let bestIdx = 0;
          let bestDist = Infinity;
          for (let i = 0; i < remaining.length; i++) {
            const d = Math.hypot(remaining[i].x - current.x, remaining[i].y - current.y);
            if (d < bestDist) {
              bestDist = d;
              bestIdx = i;
            }
          }
          const nextPt = remaining.splice(bestIdx, 1)[0];
          sorted.push(nextPt);
          current = nextPt;
        }

        this.checkpoints = sorted;
      }
    } catch (e) {
      console.warn('Glyph sampling error:', e);
    }

    // Fallback if font was not rendered yet
    if (this.checkpoints.length === 0) {
      const sp = item.startPoint || { x: 200, y: 150 };
      this.checkpoints = [
        { x: sp.x, y: sp.y, passed: false },
        { x: 200, y: 200, passed: false },
        { x: 200, y: 280, passed: false }
      ];
    }

    this.updateProgressBar(0);
  }

  updateStartMarkerPosition() {
    const item = this.consonants[this.currentIndex];
    if (!item || !this.startMarker) return;

    // Coordinate percentage in 400x400 viewBox
    const startX = item.startPoint ? item.startPoint.x : 140;
    const startY = item.startPoint ? item.startPoint.y : 140;

    const leftPercent = (startX / this.canvasWidth) * 100;
    const topPercent = (startY / this.canvasHeight) * 100;

    this.startMarker.style.left = `${leftPercent}%`;
    this.startMarker.style.top = `${topPercent}%`;
    this.startMarker.style.display = 'flex';

    if (this.startArrow) {
      this.startArrow.style.transform = `rotate(${item.startAngle || 0}deg)`;
    }
  }

  // =========================================================================
  // Touch / Pointer Drawing Engine
  // =========================================================================
  getCanvasCoords(e) {
    if (!this.canvas) return { x: 0, y: 0 };
    const rect = this.canvas.getBoundingClientRect();
    const scaleX = this.canvasWidth / rect.width;
    const scaleY = this.canvasHeight / rect.height;
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY
    };
  }

  handlePointerDown(e) {
    this.stopDemo();
    this.isDrawing = true;
    try {
      this.canvas.setPointerCapture(e.pointerId);
    } catch (err) {}

    const pt = this.getCanvasCoords(e);
    this.lastPoint = pt;

    // Determine stroke color
    let strokeColor = this.currentColor;
    if (strokeColor === 'rainbow') {
      this.rainbowHue = (this.rainbowHue + 40) % 360;
      strokeColor = `hsl(${this.rainbowHue}, 90%, 55%)`;
    }

    this.currentStroke = {
      color: strokeColor,
      points: [pt]
    };
    this.userStrokes.push(this.currentStroke);

    // Initial dot
    this.ctx.beginPath();
    this.ctx.arc(pt.x, pt.y, 16, 0, Math.PI * 2);
    this.ctx.fillStyle = strokeColor;
    this.ctx.fill();

    this.checkHitPoints(pt);
  }

  handlePointerMove(e) {
    if (!this.isDrawing || !this.lastPoint) return;
    const pt = this.getCanvasCoords(e);

    let strokeColor = this.currentStroke ? this.currentStroke.color : '#0284c7';
    if (this.currentColor === 'rainbow') {
      this.rainbowHue = (this.rainbowHue + 4) % 360;
      strokeColor = `hsl(${this.rainbowHue}, 90%, 55%)`;
      this.currentStroke.color = strokeColor;
    }

    this.ctx.beginPath();
    this.ctx.moveTo(this.lastPoint.x, this.lastPoint.y);
    this.ctx.lineTo(pt.x, pt.y);
    this.ctx.strokeStyle = strokeColor;
    this.ctx.lineWidth = 30;
    this.ctx.stroke();

    this.lastPoint = pt;
    if (this.currentStroke) {
      this.currentStroke.points.push(pt);
    }

    this.checkHitPoints(pt);
  }

  handlePointerUp(e) {
    if (!this.isDrawing) return;
    this.isDrawing = false;
    this.lastPoint = null;
    this.currentStroke = null;
    try {
      this.canvas.releasePointerCapture(e.pointerId);
    } catch (err) {}
  }

  checkHitPoints(pt) {
    if (this.isCompleted || this.checkpoints.length === 0) return;

    const hitRadius = 36; // generous hit zone for preschool fingers
    let newlyHit = false;

    for (let i = 0; i < this.checkpoints.length; i++) {
      const cp = this.checkpoints[i];
      if (!cp.passed) {
        const dx = pt.x - cp.x;
        const dy = pt.y - cp.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist <= hitRadius) {
          cp.passed = true;
          this.passedCheckpointsCount++;
          newlyHit = true;
        }
      }
    }

    if (newlyHit) {
      const ratio = this.passedCheckpointsCount / this.checkpoints.length;
      this.updateProgressBar(ratio);

      // Check if user completed 70%+ of the consonant template
      if (ratio >= 0.70 && !this.isCompleted) {
        this.onLetterSuccess();
      }
    }
  }

  updateProgressBar(ratio) {
    const percent = Math.min(100, Math.round(ratio * 100));
    if (this.progressFill) {
      this.progressFill.style.width = `${percent}%`;
    }
    if (this.progressPercentText) {
      this.progressPercentText.textContent = `${percent}%`;
    }
  }

  clearCanvas() {
    this.stopDemo();
    if (this.ctx) {
      this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    }
    this.userStrokes = [];
    this.currentStroke = null;
    this.passedCheckpointsCount = 0;
    this.checkpoints.forEach((cp) => (cp.passed = false));
    this.updateProgressBar(0);
    this.isCompleted = false;
    if (this.startMarker) {
      this.startMarker.style.display = 'flex';
    }
  }

  undoStroke() {
    if (this.userStrokes.length === 0) return;
    this.userStrokes.pop();
    this.redrawCanvas();
    this.recalcPassedCheckpoints();
  }

  redrawCanvas() {
    if (!this.ctx) return;
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

    this.userStrokes.forEach((stroke) => {
      if (!stroke.points || stroke.points.length === 0) return;

      if (stroke.points.length === 1) {
        this.ctx.beginPath();
        this.ctx.arc(stroke.points[0].x, stroke.points[0].y, 16, 0, Math.PI * 2);
        this.ctx.fillStyle = stroke.color;
        this.ctx.fill();
        return;
      }

      this.ctx.beginPath();
      this.ctx.moveTo(stroke.points[0].x, stroke.points[0].y);
      for (let i = 1; i < stroke.points.length; i++) {
        this.ctx.lineTo(stroke.points[i].x, stroke.points[i].y);
      }
      this.ctx.strokeStyle = stroke.color;
      this.ctx.lineWidth = 30;
      this.ctx.stroke();
    });
  }

  recalcPassedCheckpoints() {
    this.passedCheckpointsCount = 0;
    this.checkpoints.forEach((cp) => {
      cp.passed = false;
      const hitRadius = 36;
      for (const stroke of this.userStrokes) {
        for (const pt of stroke.points) {
          const dx = pt.x - cp.x;
          const dy = pt.y - cp.y;
          if (Math.sqrt(dx * dx + dy * dy) <= hitRadius) {
            cp.passed = true;
            this.passedCheckpointsCount++;
            return;
          }
        }
      }
    });
    const ratio = this.checkpoints.length ? this.passedCheckpointsCount / this.checkpoints.length : 0;
    this.updateProgressBar(ratio);
  }

  // =========================================================================
  // Animated Demonstration ("▶️ ดูวิธีเขียน")
  // =========================================================================
  toggleDemo() {
    if (this.demoRunning) {
      this.stopDemo();
    } else {
      this.startDemo();
    }
  }

  startDemo() {
    if (!this.demoCursor || this.checkpoints.length === 0) return;
    this.clearCanvas();
    this.demoRunning = true;
    if (this.btnDemo) {
      this.btnDemo.classList.add('demo-active');
      this.btnDemo.innerHTML = `<span>⏹️</span> <span>หยุดดู</span>`;
    }
    this.demoCursor.style.opacity = '1';

    const points = this.checkpoints;
    const duration = 2600; // ms for full stroke
    const startTime = performance.now();

    const animate = (currentTime) => {
      if (!this.demoRunning) return;
      const elapsed = currentTime - startTime;
      const progress = Math.min(1, elapsed / duration);
      const currentIdx = Math.floor(progress * (points.length - 1));
      const pt = points[currentIdx] || points[points.length - 1];

      // Position cursor
      const leftPercent = (pt.x / this.canvasWidth) * 100;
      const topPercent = (pt.y / this.canvasHeight) * 100;
      this.demoCursor.style.left = `${leftPercent}%`;
      this.demoCursor.style.top = `${topPercent}%`;

      // Draw demo guide trace on canvas
      this.ctx.beginPath();
      this.ctx.arc(pt.x, pt.y, 16, 0, Math.PI * 2);
      this.ctx.fillStyle = 'rgba(245, 158, 11, 0.45)';
      this.ctx.fill();

      if (progress < 1) {
        this.demoAnimId = requestAnimationFrame(animate);
      } else {
        // Finished 1 demo loop, loop again after pause
        setTimeout(() => {
          if (this.demoRunning) {
            this.clearCanvas();
            this.startDemo();
          }
        }, 600);
      }
    };

    this.demoAnimId = requestAnimationFrame(animate);
  }

  stopDemo() {
    this.demoRunning = false;
    if (this.demoAnimId) {
      cancelAnimationFrame(this.demoAnimId);
      this.demoAnimId = null;
    }
    if (this.demoCursor) {
      this.demoCursor.style.opacity = '0';
    }
    if (this.btnDemo) {
      this.btnDemo.classList.remove('demo-active');
      this.btnDemo.innerHTML = `<span>▶️</span> <span>ดูวิธีเขียน</span>`;
    }
  }

  // =========================================================================
  // Completion & Celebration
  // =========================================================================
  onLetterSuccess() {
    this.isCompleted = true;
    this.updateProgressBar(1);

    // Audio chime
    if (window.soundManager) {
      window.soundManager.playMatchSuccess();
    }

    // Hide start marker
    if (this.startMarker) {
      this.startMarker.style.display = 'none';
    }

    // Trigger Speech
    setTimeout(() => {
      this.speakCurrentLetter();
    }, 300);

    // Confetti and celebration modal
    this.triggerConfetti();
    setTimeout(() => {
      this.openCelebration();
    }, 700);
  }

  openCelebration() {
    const item = this.consonants[this.currentIndex];
    if (this.celebrationChar) {
      this.celebrationChar.textContent = item.letter;
    }
    if (this.celebrationModal) {
      this.celebrationModal.classList.add('open');
    }
  }

  closeCelebration() {
    if (this.celebrationModal) {
      this.celebrationModal.classList.remove('open');
    }
  }

  triggerConfetti() {
    if (!this.confettiCanvas || !this.confettiCtx) return;
    this.confettiCanvas.width = window.innerWidth;
    this.confettiCanvas.height = window.innerHeight;

    const colors = ['#f43f5e', '#f59e0b', '#10b981', '#06b6d4', '#6366f1', '#ec4899', '#eab308'];
    const particles = [];

    for (let i = 0; i < 90; i++) {
      particles.push({
        x: window.innerWidth * (0.3 + Math.random() * 0.4),
        y: window.innerHeight * 0.45,
        vx: (Math.random() - 0.5) * 14,
        vy: (Math.random() - 0.8) * 16,
        size: Math.random() * 10 + 6,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 10,
        alpha: 1
      });
    }

    let frame = 0;
    const renderConfetti = () => {
      if (frame > 90) {
        this.confettiCtx.clearRect(0, 0, this.confettiCanvas.width, this.confettiCanvas.height);
        return;
      }
      this.confettiCtx.clearRect(0, 0, this.confettiCanvas.width, this.confettiCanvas.height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.38; // gravity
        p.vx *= 0.98;
        p.rotation += p.rotationSpeed;
        p.alpha -= 0.01;

        if (p.alpha > 0) {
          this.confettiCtx.save();
          this.confettiCtx.translate(p.x, p.y);
          this.confettiCtx.rotate((p.rotation * Math.PI) / 180);
          this.confettiCtx.fillStyle = p.color;
          this.confettiCtx.globalAlpha = Math.max(0, p.alpha);
          this.confettiCtx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
          this.confettiCtx.restore();
        }
      });

      frame++;
      requestAnimationFrame(renderConfetti);
    };

    requestAnimationFrame(renderConfetti);
  }

  // =========================================================================
  // Speech & Pronunciation
  // =========================================================================
  speakCurrentLetter() {
    const item = this.consonants[this.currentIndex];
    if (!item) return;

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const textToSpeak = item.speech || `${item.letter} ${item.name}`;
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.lang = 'th-TH';
      utterance.rate = 0.85;
      utterance.pitch = 1.1;

      // Select Thai voice if available
      const voices = window.speechSynthesis.getVoices();
      const thaiVoice = voices.find((v) => v.lang.startsWith('th'));
      if (thaiVoice) utterance.voice = thaiVoice;

      window.speechSynthesis.speak(utterance);
    } else if (window.soundManager) {
      window.soundManager.playPop();
    }
  }

  // =========================================================================
  // Navigation & Mode Switching
  // =========================================================================
  prevLetter() {
    if (this.mode === 'sequential') {
      if (this.currentIndex > 0) {
        this.loadConsonant(this.currentIndex - 1);
        if (window.soundManager) window.soundManager.playPop();
      }
    } else {
      this.randomLetter();
    }
  }

  nextLetter() {
    if (this.mode === 'sequential') {
      if (this.currentIndex < this.consonants.length - 1) {
        this.loadConsonant(this.currentIndex + 1);
        if (window.soundManager) window.soundManager.playPop();
      } else {
        // Cycle to start
        this.loadConsonant(0);
        if (window.soundManager) window.soundManager.playPop();
      }
    } else {
      this.randomLetter();
    }
  }

  randomLetter() {
    if (this.consonants.length <= 1) return;
    let nextIdx = this.currentIndex;
    while (nextIdx === this.currentIndex) {
      nextIdx = Math.floor(Math.random() * this.consonants.length);
    }
    this.loadConsonant(nextIdx);
    if (window.soundManager) window.soundManager.playPop();
  }

  setMode(mode) {
    this.mode = mode;
    if (this.btnModeSeq) this.btnModeSeq.classList.toggle('active', mode === 'sequential');
    if (this.btnModeRand) this.btnModeRand.classList.toggle('active', mode === 'random');
    if (this.modeBadge) {
      this.modeBadge.textContent = mode === 'sequential' ? 'โหมดเรียงตามตัวอักษร 🔤' : 'โหมดสุ่มตัวอักษร 🎲';
    }
    if (this.btnRandomLetter) {
      this.btnRandomLetter.style.display = mode === 'random' ? 'inline-flex' : 'none';
    }
    if (this.btnPrevLetter) {
      this.btnPrevLetter.style.display = mode === 'sequential' ? 'inline-flex' : 'none';
    }
    if (mode === 'random') {
      this.randomLetter();
    }
  }

  // =========================================================================
  // 44-Consonant Grid Picker Modal
  // =========================================================================
  openLetterPicker() {
    if (!this.letterPickerModal || !this.letterGrid44) return;
    this.renderPickerGrid();
    this.letterPickerModal.classList.add('open');
    if (window.soundManager) window.soundManager.playPop();
  }

  closeLetterPicker() {
    if (this.letterPickerModal) {
      this.letterPickerModal.classList.remove('open');
    }
  }

  renderPickerGrid() {
    if (!this.letterGrid44) return;
    this.letterGrid44.innerHTML = '';

    this.consonants.forEach((c, idx) => {
      const itemEl = document.createElement('div');
      itemEl.className = `letter-grid-item ${idx === this.currentIndex ? 'current' : ''}`;
      itemEl.innerHTML = `
        <span class="item-char" style="color: ${c.color}">${c.letter}</span>
        <span class="item-sub">${c.name.split(' ')[1] || c.name}</span>
      `;
      itemEl.addEventListener('click', () => {
        this.loadConsonant(idx);
        this.closeLetterPicker();
        if (window.soundManager) window.soundManager.playPop();
      });
      this.letterGrid44.appendChild(itemEl);
    });
  }
}

// Auto Initialize
window.addEventListener('DOMContentLoaded', () => {
  window.thaiTracingGame = new ThaiTracingGame();
});
