/**
 * Career Photo Studio (สตูดิโอถ่ายรูปอาชีพในฝัน)
 * Interactive Face-in-Hole Camera Game for Early Childhood & Kindergarten
 */

(function () {
  'use strict';

  // Fallback career list with pre-calculated face circle coordinates
  // (ensures 100% offline & local file:// functionality even if fetch is blocked)
  const DEFAULT_JOBS = [
    { id: "police", title: "ตำรวจ", enTitle: "Police", image: "assets/images/my_job/cards/job_01_police.jpg", width: 296, height: 442, faceX: 164, faceY: 175, faceRadius: 64 },
    { id: "doctor", title: "แพทย์", enTitle: "Doctor", image: "assets/images/my_job/cards/job_02_doctor.jpg", width: 296, height: 442, faceX: 123, faceY: 168, faceRadius: 68 },
    { id: "nurse", title: "พยาบาล", enTitle: "Nurse", image: "assets/images/my_job/cards/job_03_nurse.jpg", width: 296, height: 442, faceX: 122, faceY: 170, faceRadius: 68 },
    { id: "firefighter", title: "นักดับเพลิง", enTitle: "Firefighter", image: "assets/images/my_job/cards/job_04_firefighter.jpg", width: 296, height: 442, faceX: 124, faceY: 165, faceRadius: 61 },
    { id: "teacher", title: "ครู", enTitle: "Teacher", image: "assets/images/my_job/cards/job_05_teacher.jpg", width: 296, height: 442, faceX: 142, faceY: 170, faceRadius: 62 },
    { id: "chef", title: "พ่อครัว/แม่ครัว", enTitle: "Chef", image: "assets/images/my_job/cards/job_06_chef.jpg", width: 296, height: 488, faceX: 164, faceY: 170, faceRadius: 68 },
    { id: "pilot", title: "นักบิน", enTitle: "Pilot", image: "assets/images/my_job/cards/job_07_pilot.jpg", width: 296, height: 488, faceX: 143, faceY: 163, faceRadius: 68 },
    { id: "astronaut", title: "นักบินอวกาศ", enTitle: "Astronaut", image: "assets/images/my_job/cards/job_08_astronaut.jpg", width: 296, height: 488, faceX: 128, faceY: 165, faceRadius: 68 },
    { id: "navy", title: "ทหารเรือ", enTitle: "Navy", image: "assets/images/my_job/cards/job_09_navy.jpg", width: 296, height: 488, faceX: 119, faceY: 166, faceRadius: 68 },
    { id: "soldier", title: "ทหารบก", enTitle: "Soldier", image: "assets/images/my_job/cards/job_10_soldier.jpg", width: 296, height: 488, faceX: 122, faceY: 162, faceRadius: 74 },

    { id: "judge", title: "ผู้พิพากษา", enTitle: "Judge", image: "assets/images/my_job/cards/job_11_judge.jpg", width: 296, height: 450, faceX: 156, faceY: 150, faceRadius: 70 },
    { id: "lawyer", title: "ทนายความ", enTitle: "Lawyer", image: "assets/images/my_job/cards/job_12_lawyer.jpg", width: 296, height: 450, faceX: 147, faceY: 150, faceRadius: 72 },
    { id: "business", title: "นักธุรกิจ", enTitle: "Business", image: "assets/images/my_job/cards/job_13_business.jpg", width: 296, height: 450, faceX: 146, faceY: 153, faceRadius: 68 },
    { id: "banker", title: "พนักงานธนาคาร", enTitle: "Banker", image: "assets/images/my_job/cards/job_14_banker.jpg", width: 296, height: 450, faceX: 147, faceY: 154, faceRadius: 67 },
    { id: "flight_attendant", title: "พนักงานต้อนรับบนเครื่องบิน", enTitle: "Flight Attendant", image: "assets/images/my_job/cards/job_15_flight_attendant.jpg", width: 296, height: 450, faceX: 149, faceY: 166, faceRadius: 73 },
    { id: "baker", title: "นักทำขนม", enTitle: "Baker", image: "assets/images/my_job/cards/job_16_baker.jpg", width: 296, height: 495, faceX: 153, faceY: 179, faceRadius: 68 },
    { id: "designer", title: "ดีไซเนอร์เสื้อผ้า", enTitle: "Fashion Designer", image: "assets/images/my_job/cards/job_17_designer.jpg", width: 296, height: 495, faceX: 181, faceY: 175, faceRadius: 55 },
    { id: "diver", title: "นักดำน้ำ", enTitle: "Diver", image: "assets/images/my_job/cards/job_18_diver.jpg", width: 296, height: 495, faceX: 159, faceY: 179, faceRadius: 62 },
    { id: "rescue", title: "เจ้าหน้าที่กู้ภัย", enTitle: "Rescue", image: "assets/images/my_job/cards/job_19_rescue.jpg", width: 296, height: 495, faceX: 177, faceY: 161, faceRadius: 57 },
    { id: "tour_guide", title: "มัคคุเทศก์", enTitle: "Tour Guide", image: "assets/images/my_job/cards/job_20_tour_guide.jpg", width: 296, height: 495, faceX: 142, faceY: 160, faceRadius: 68 },

    { id: "postman", title: "พนักงานไปรษณีย์", enTitle: "Postman", image: "assets/images/my_job/cards/job_21_postman.jpg", width: 296, height: 455, faceX: 155, faceY: 167, faceRadius: 74 },
    { id: "courier", title: "พนักงานส่งของ", enTitle: "Courier", image: "assets/images/my_job/cards/job_22_courier.jpg", width: 296, height: 455, faceX: 148, faceY: 162, faceRadius: 68 },
    { id: "bus_driver", title: "คนขับรถเมล์", enTitle: "Bus Driver", image: "assets/images/my_job/cards/job_23_bus_driver.jpg", width: 296, height: 455, faceX: 123, faceY: 172, faceRadius: 70 },
    { id: "taxi_driver", title: "คนขับแท็กซี่", enTitle: "Taxi Driver", image: "assets/images/my_job/cards/job_24_taxi_driver.jpg", width: 296, height: 455, faceX: 129, faceY: 174, faceRadius: 62 },
    { id: "train_driver", title: "พนักงานขับรถไฟ", enTitle: "Train Driver", image: "assets/images/my_job/cards/job_25_train_driver.jpg", width: 292, height: 455, faceX: 137, faceY: 170, faceRadius: 68 },
    { id: "vet", title: "สัตวแพทย์", enTitle: "Veterinarian", image: "assets/images/my_job/cards/job_26_vet.jpg", width: 296, height: 500, faceX: 169, faceY: 170, faceRadius: 68 },
    { id: "pharmacist", title: "เภสัชกร", enTitle: "Pharmacist", image: "assets/images/my_job/cards/job_27_pharmacist.jpg", width: 296, height: 500, faceX: 145, faceY: 172, faceRadius: 68 },
    { id: "scientist", title: "นักวิทยาศาสตร์", enTitle: "Scientist", image: "assets/images/my_job/cards/job_28_scientist.jpg", width: 296, height: 500, faceX: 127, faceY: 178, faceRadius: 68 },
    { id: "sanitation", title: "พนักงานเก็บขยะ", enTitle: "Sanitation", image: "assets/images/my_job/cards/job_29_sanitation.jpg", width: 296, height: 500, faceX: 125, faceY: 153, faceRadius: 58 },
    { id: "gardener", title: "คนสวน", enTitle: "Gardener", image: "assets/images/my_job/cards/job_30_gardener.jpg", width: 292, height: 500, faceX: 121, faceY: 166, faceRadius: 70 },

    { id: "farmer", title: "เกษตรกร", enTitle: "Farmer", image: "assets/images/my_job/cards/job_31_farmer.jpg", width: 296, height: 442, faceX: 181, faceY: 169, faceRadius: 59 },
    { id: "fisherman", title: "ชาวประมง", enTitle: "Fisherman", image: "assets/images/my_job/cards/job_32_fisherman.jpg", width: 296, height: 442, faceX: 162, faceY: 168, faceRadius: 64 },
    { id: "engineer", title: "วิศวกร", enTitle: "Engineer", image: "assets/images/my_job/cards/job_33_engineer.jpg", width: 296, height: 442, faceX: 140, faceY: 167, faceRadius: 75 },
    { id: "architect", title: "สถาปนิก", enTitle: "Architect", image: "assets/images/my_job/cards/job_34_architect.jpg", width: 296, height: 442, faceX: 148, faceY: 168, faceRadius: 68 },
    { id: "mechanic", title: "ช่างซ่อมรถ", enTitle: "Mechanic", image: "assets/images/my_job/cards/job_35_mechanic.jpg", width: 296, height: 442, faceX: 147, faceY: 170, faceRadius: 64 },
    { id: "barber", title: "ช่างตัดผม", enTitle: "Barber", image: "assets/images/my_job/cards/job_36_barber.jpg", width: 296, height: 488, faceX: 165, faceY: 166, faceRadius: 68 },
    { id: "artist", title: "จิตรกร", enTitle: "Artist", image: "assets/images/my_job/cards/job_37_artist.jpg", width: 296, height: 488, faceX: 176, faceY: 170, faceRadius: 59 },
    { id: "musician", title: "นักดนตรี", enTitle: "Musician", image: "assets/images/my_job/cards/job_38_musician.jpg", width: 296, height: 488, faceX: 149, faceY: 163, faceRadius: 68 },
    { id: "reporter", title: "นักข่าว", enTitle: "Reporter", image: "assets/images/my_job/cards/job_39_reporter.jpg", width: 296, height: 488, faceX: 151, faceY: 161, faceRadius: 64 },
    { id: "photographer", title: "ช่างภาพ", enTitle: "Photographer", image: "assets/images/my_job/cards/job_40_photographer.jpg", width: 296, height: 488, faceX: 132, faceY: 162, faceRadius: 70 }
  ];

  let jobsList = DEFAULT_JOBS;
  let currentJobIndex = 0;

  // User photo state
  let userImageSource = null; // Loaded Image object
  let photoTransform = {
    panX: 0,
    panY: 0,
    scale: 1.0,
    mirror: false
  };

  // Dragging state
  let isDragging = false;
  let dragStartX = 0;
  let dragStartY = 0;
  let initialPanX = 0;
  let initialPanY = 0;
  let initialPinchDistance = 0;
  let initialScale = 1.0;

  // Camera stream state
  let activeMediaStream = null;
  let currentFacingMode = 'user'; // 'user' (front) or 'environment' (back)

  // Sound state
  let soundEnabled = true;
  let audioCtx = null;

  // DOM Elements
  const careerCardImg = document.getElementById('careerCardImg');
  const cardBox = document.getElementById('cardBox');
  const faceHole = document.getElementById('faceHole');
  const faceEmptyState = document.getElementById('faceEmptyState');
  const faceFilledState = document.getElementById('faceFilledState');
  const userFaceImg = document.getElementById('userFaceImg');
  const photoClipper = document.getElementById('photoClipper');
  const quickToolbar = document.getElementById('quickToolbar');

  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const careerNameTh = document.getElementById('careerNameTh');
  const careerNameEn = document.getElementById('careerNameEn');
  const careerCounter = document.getElementById('careerCounter');
  const careerSelect = document.getElementById('careerSelect');
  const savePhotoBtn = document.getElementById('savePhotoBtn');

  // Quick toolbar buttons
  const toolZoomInBtn = document.getElementById('toolZoomInBtn');
  const toolZoomOutBtn = document.getElementById('toolZoomOutBtn');
  const toolMirrorBtn = document.getElementById('toolMirrorBtn');
  const toolRetakeBtn = document.getElementById('toolRetakeBtn');

  // Modals
  const sourceModal = document.getElementById('sourceModal');
  const closeSourceModalBtn = document.getElementById('closeSourceModalBtn');
  const chooseCameraBtn = document.getElementById('chooseCameraBtn');
  const chooseGalleryBtn = document.getElementById('chooseGalleryBtn');

  const cameraModal = document.getElementById('cameraModal');
  const cameraVideo = document.getElementById('cameraVideo');
  const closeCameraBtn = document.getElementById('closeCameraBtn');
  const cancelCameraBtn = document.getElementById('cancelCameraBtn');
  const switchCameraBtn = document.getElementById('switchCameraBtn');
  const snapPhotoBtn = document.getElementById('snapPhotoBtn');

  const saveSuccessModal = document.getElementById('saveSuccessModal');
  const closeSaveModalBtn = document.getElementById('closeSaveModalBtn');
  const savedResultImg = document.getElementById('savedResultImg');
  const directDownloadBtn = document.getElementById('directDownloadBtn');
  const shareImageBtn = document.getElementById('shareImageBtn');
  let lastExportedBlob = null;
  let lastExportedFilename = 'my-career.jpeg';

  const nativeCameraInput = document.getElementById('nativeCameraInput');
  const nativeGalleryInput = document.getElementById('nativeGalleryInput');
  const exportCanvas = document.getElementById('exportCanvas');
  const soundToggleBtn = document.getElementById('soundToggleBtn');
  const soundIcon = document.getElementById('soundIcon');

  /* =========================================================
     Audio Engine (Web Audio API Synthesizers)
     ========================================================= */
  function initAudio() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        audioCtx = new AudioContext();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  function playSound(type) {
    if (!soundEnabled) return;
    try {
      initAudio();
      if (!audioCtx) return;

      const now = audioCtx.currentTime;

      if (type === 'click') {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(587.33, now); // D5
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.08); // A5
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(now);
        osc.stop(now + 0.08);
      } else if (type === 'snap') {
        // Camera shutter click + pop
        const osc1 = audioCtx.createOscillator();
        const gain1 = audioCtx.createGain();
        osc1.type = 'triangle';
        osc1.frequency.setValueAtTime(1200, now);
        osc1.frequency.exponentialRampToValueAtTime(300, now + 0.05);
        gain1.gain.setValueAtTime(0.4, now);
        gain1.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
        osc1.connect(gain1);
        gain1.connect(audioCtx.destination);
        osc1.start(now);
        osc1.stop(now + 0.05);

        const osc2 = audioCtx.createOscillator();
        const gain2 = audioCtx.createGain();
        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(600, now + 0.06);
        osc2.frequency.exponentialRampToValueAtTime(120, now + 0.14);
        gain2.gain.setValueAtTime(0.35, now + 0.06);
        gain2.gain.exponentialRampToValueAtTime(0.01, now + 0.14);
        osc2.connect(gain2);
        gain2.connect(audioCtx.destination);
        osc2.start(now + 0.06);
        osc2.stop(now + 0.14);
      } else if (type === 'fanfare') {
        // Cheerful major chord arpeggio
        const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
        notes.forEach((freq, idx) => {
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          const t = now + idx * 0.09;
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, t);
          gain.gain.setValueAtTime(0.25, t);
          gain.gain.exponentialRampToValueAtTime(0.01, t + 0.28);
          osc.connect(gain);
          gain.connect(audioCtx.destination);
          osc.start(t);
          osc.stop(t + 0.28);
        });
      }
    } catch (e) {
      console.warn("Audio play error", e);
    }
  }

  // Load sound setting from localStorage
  const savedSound = localStorage.getItem('career_sound_enabled');
  if (savedSound !== null) {
    soundEnabled = savedSound === 'true';
    if (soundIcon) soundIcon.textContent = soundEnabled ? '🔊' : '🔇';
  }

  if (soundToggleBtn) {
    soundToggleBtn.addEventListener('click', () => {
      soundEnabled = !soundEnabled;
      localStorage.setItem('career_sound_enabled', soundEnabled);
      if (soundIcon) soundIcon.textContent = soundEnabled ? '🔊' : '🔇';
      if (soundEnabled) playSound('click');
    });
  }

  /* =========================================================
     Init & Populate Career Dropdown
     ========================================================= */
  async function loadCareerList() {
    try {
      const res = await fetch('assets/images/my_job/jobs.json');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          jobsList = data;
        }
      }
    } catch (e) {
      console.log("Using built-in career list");
    }

    populateDropdown();
    displayCareer(0);
  }

  function populateDropdown() {
    careerSelect.innerHTML = '';
    jobsList.forEach((job, index) => {
      const opt = document.createElement('option');
      opt.value = index;
      opt.textContent = `${index + 1}. ${job.title} (${job.enTitle})`;
      careerSelect.appendChild(opt);
    });

    careerSelect.addEventListener('change', (e) => {
      initAudio();
      playSound('click');
      displayCareer(parseInt(e.target.value, 10));
    });
  }

  /* =========================================================
     Display Career Card & Align Face Hole
     ========================================================= */
  function displayCareer(index) {
    if (index < 0) index = jobsList.length - 1;
    if (index >= jobsList.length) index = 0;
    currentJobIndex = index;

    const job = jobsList[currentJobIndex];

    // Update image
    careerCardImg.src = job.image;
    careerCardImg.alt = job.title;

    // Update info text
    careerNameTh.textContent = job.title;
    careerNameEn.textContent = job.enTitle;
    careerCounter.textContent = `${currentJobIndex + 1} / ${jobsList.length}`;
    careerSelect.value = currentJobIndex;

    // Calculate sub-pixel percentage coordinates for face hole
    // job.faceX, job.faceY are in natural card image pixels
    const pctLeft = ((job.faceX - job.faceRadius) / job.width) * 100;
    const pctTop = ((job.faceY - job.faceRadius) / job.height) * 100;
    const pctW = ((job.faceRadius * 2) / job.width) * 100;
    const pctH = ((job.faceRadius * 2) / job.height) * 100;

    faceHole.style.left = `${pctLeft.toFixed(3)}%`;
    faceHole.style.top = `${pctTop.toFixed(3)}%`;
    faceHole.style.width = `${pctW.toFixed(3)}%`;
    faceHole.style.height = `${pctH.toFixed(3)}%`;

    // Update visual state (empty vs filled)
    updateFaceViewState();
  }

  function updateFaceViewState() {
    if (userImageSource) {
      faceEmptyState.style.display = 'none';
      faceFilledState.style.display = 'block';
      quickToolbar.style.display = 'flex';
      applyPhotoTransform();
    } else {
      faceEmptyState.style.display = 'flex';
      faceFilledState.style.display = 'none';
      quickToolbar.style.display = 'none';
    }
  }

  /* =========================================================
     User Photo Transform & Interactive Drag / Zoom
     ========================================================= */
  function applyPhotoTransform() {
    if (!userFaceImg) return;
    const mirrorScale = photoTransform.mirror ? -1 : 1;
    userFaceImg.style.transform = `translate(${photoTransform.panX}px, ${photoTransform.panY}px) scale(${photoTransform.scale * mirrorScale}, ${photoTransform.scale})`;
  }

  function resetPhotoPlacement() {
    if (!userImageSource || !faceHole) return;

    // Fit photo into the circular container
    const holeRect = faceHole.getBoundingClientRect();
    const targetDim = holeRect.width || 120;

    // Size the image element so it covers the circle
    const naturalW = userImageSource.naturalWidth || userImageSource.width;
    const naturalH = userImageSource.naturalHeight || userImageSource.height;
    const aspect = naturalW / naturalH;

    let baseW, baseH;
    if (aspect > 1) {
      baseH = targetDim;
      baseW = targetDim * aspect;
    } else {
      baseW = targetDim;
      baseH = targetDim / aspect;
    }

    userFaceImg.style.width = `${baseW}px`;
    userFaceImg.style.height = `${baseH}px`;
    userFaceImg.style.left = `${(targetDim - baseW) / 2}px`;
    userFaceImg.style.top = `${(targetDim - baseH) / 2}px`;

    photoTransform.panX = 0;
    photoTransform.panY = 0;
    photoTransform.scale = 1.0;
    applyPhotoTransform();
  }

  function setUserPhoto(imgElement) {
    userImageSource = imgElement;
    userFaceImg.src = imgElement.src;
    photoTransform.mirror = false;

    // Wait until image is loaded to calculate dimensions
    if (imgElement.complete && imgElement.naturalWidth > 0) {
      updateFaceViewState();
      resetPhotoPlacement();
    } else {
      imgElement.onload = () => {
        updateFaceViewState();
        resetPhotoPlacement();
      };
    }
  }

  // Interactive Drag & Touch Handling inside the Face Circle
  function setupFaceInteraction() {
    function getPointerPos(e) {
      if (e.touches && e.touches.length > 0) {
        return { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
      return { x: e.clientX, y: e.clientY };
    }

    function getPinchDistance(e) {
      if (e.touches && e.touches.length >= 2) {
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        return Math.sqrt(dx * dx + dy * dy);
      }
      return 0;
    }

    // Touch / Mouse Down
    function onPointerDown(e) {
      if (!userImageSource) {
        openSourceModal();
        return;
      }

      if (e.touches && e.touches.length >= 2) {
        // Pinch zoom start
        isDragging = false;
        initialPinchDistance = getPinchDistance(e);
        initialScale = photoTransform.scale;
        return;
      }

      isDragging = true;
      const pos = getPointerPos(e);
      dragStartX = pos.x;
      dragStartY = pos.y;
      initialPanX = photoTransform.panX;
      initialPanY = photoTransform.panY;

      e.preventDefault();
    }

    // Move
    function onPointerMove(e) {
      if (e.touches && e.touches.length >= 2) {
        // Pinch zoom move
        const dist = getPinchDistance(e);
        if (initialPinchDistance > 0 && dist > 0) {
          const ratio = dist / initialPinchDistance;
          photoTransform.scale = Math.min(3.5, Math.max(0.4, initialScale * ratio));
          applyPhotoTransform();
        }
        e.preventDefault();
        return;
      }

      if (!isDragging) return;

      const pos = getPointerPos(e);
      const dx = pos.x - dragStartX;
      const dy = pos.y - dragStartY;

      photoTransform.panX = initialPanX + dx;
      photoTransform.panY = initialPanY + dy;
      applyPhotoTransform();

      e.preventDefault();
    }

    // End
    function onPointerUp() {
      isDragging = false;
    }

    faceHole.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);

    faceHole.addEventListener('touchstart', onPointerDown, { passive: false });
    window.addEventListener('touchmove', onPointerMove, { passive: false });
    window.addEventListener('touchend', onPointerUp);

    // Mouse wheel zoom
    faceHole.addEventListener('wheel', (e) => {
      if (!userImageSource) return;
      e.preventDefault();
      const zoomFactor = e.deltaY < 0 ? 1.08 : 0.92;
      photoTransform.scale = Math.min(3.5, Math.max(0.4, photoTransform.scale * zoomFactor));
      applyPhotoTransform();
    }, { passive: false });
  }

  /* =========================================================
     Quick Toolbar Button Listeners
     ========================================================= */
  if (toolZoomInBtn) {
    toolZoomInBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      initAudio();
      playSound('click');
      photoTransform.scale = Math.min(3.5, photoTransform.scale + 0.15);
      applyPhotoTransform();
    });
  }

  if (toolZoomOutBtn) {
    toolZoomOutBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      initAudio();
      playSound('click');
      photoTransform.scale = Math.max(0.4, photoTransform.scale - 0.15);
      applyPhotoTransform();
    });
  }

  if (toolMirrorBtn) {
    toolMirrorBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      initAudio();
      playSound('click');
      photoTransform.mirror = !photoTransform.mirror;
      applyPhotoTransform();
    });
  }

  if (toolRetakeBtn) {
    toolRetakeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      initAudio();
      playSound('click');
      openSourceModal();
    });
  }

  /* =========================================================
     Navigation (< and >)
     ========================================================= */
  function navigateNext() {
    initAudio();
    playSound('click');
    displayCareer(currentJobIndex + 1);
  }

  function navigatePrev() {
    initAudio();
    playSound('click');
    displayCareer(currentJobIndex - 1);
  }

  prevBtn.addEventListener('click', navigatePrev);
  nextBtn.addEventListener('click', navigateNext);

  // Keyboard navigation
  window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      navigatePrev();
    } else if (e.key === 'ArrowRight') {
      navigateNext();
    }
  });

  // Touch Swipe on Card Box
  let touchStartX = 0;
  let touchStartY = 0;
  cardBox.addEventListener('touchstart', (e) => {
    if (e.touches && e.touches.length === 1) {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    }
  }, { passive: true });

  cardBox.addEventListener('touchend', (e) => {
    if (isDragging) return;
    if (e.changedTouches && e.changedTouches.length === 1) {
      const dx = e.changedTouches[0].clientX - touchStartX;
      const dy = e.changedTouches[0].clientY - touchStartY;
      if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) {
        if (dx < 0) {
          navigateNext();
        } else {
          navigatePrev();
        }
      }
    }
  }, { passive: true });

  /* =========================================================
     Photo Source Selection Modal (Camera vs Gallery)
     ========================================================= */
  function openSourceModal() {
    initAudio();
    playSound('click');
    sourceModal.classList.add('active');
  }

  function closeSourceModal() {
    sourceModal.classList.remove('active');
  }

  closeSourceModalBtn.addEventListener('click', closeSourceModal);
  sourceModal.addEventListener('click', (e) => {
    if (e.target === sourceModal) closeSourceModal();
  });

  chooseCameraBtn.addEventListener('click', () => {
    closeSourceModal();
    initAudio();
    // Try in-app live camera first
    startLiveCamera();
  });

  chooseGalleryBtn.addEventListener('click', () => {
    closeSourceModal();
    initAudio();
    nativeGalleryInput.click();
  });

  /* =========================================================
     Native File Input Handlers (iOS / Android / Desktop)
     ========================================================= */
  function handleSelectedFile(file) {
    if (!file || !file.type.startsWith('image/')) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        setUserPhoto(img);
        playSound('snap');
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  nativeCameraInput.addEventListener('change', (e) => {
    if (e.target.files && e.target.files[0]) {
      handleSelectedFile(e.target.files[0]);
    }
  });

  nativeGalleryInput.addEventListener('change', (e) => {
    if (e.target.files && e.target.files[0]) {
      handleSelectedFile(e.target.files[0]);
    }
  });

  /* =========================================================
     Live Camera Modal Logic (getUserMedia)
     ========================================================= */
  async function startLiveCamera() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      // Fallback directly to native camera input on unsupported browsers
      nativeCameraInput.click();
      return;
    }

    try {
      const constraints = {
        video: {
          facingMode: currentFacingMode,
          width: { ideal: 1280 },
          height: { ideal: 1280 }
        },
        audio: false
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      activeMediaStream = stream;
      cameraVideo.srcObject = stream;
      await cameraVideo.play();

      cameraModal.classList.add('active');
    } catch (err) {
      console.warn("getUserMedia failed or denied, falling back to native capture input", err);
      // Fallback gracefully to native camera capture
      nativeCameraInput.click();
    }
  }

  function stopLiveCamera() {
    if (activeMediaStream) {
      activeMediaStream.getTracks().forEach(track => track.stop());
      activeMediaStream = null;
    }
    cameraModal.classList.remove('active');
  }

  closeCameraBtn.addEventListener('click', stopLiveCamera);
  cancelCameraBtn.addEventListener('click', stopLiveCamera);
  cameraModal.addEventListener('click', (e) => {
    if (e.target === cameraModal) stopLiveCamera();
  });

  // Switch camera (front / back)
  switchCameraBtn.addEventListener('click', async () => {
    initAudio();
    playSound('click');
    currentFacingMode = (currentFacingMode === 'user') ? 'environment' : 'user';
    cameraVideo.style.transform = (currentFacingMode === 'user') ? 'scaleX(-1)' : 'none';
    if (activeMediaStream) {
      activeMediaStream.getTracks().forEach(track => track.stop());
    }
    await startLiveCamera();
  });

  // Snap photo from live video feed
  snapPhotoBtn.addEventListener('click', () => {
    if (!activeMediaStream || !cameraVideo.videoWidth) return;

    playSound('snap');

    const vWidth = cameraVideo.videoWidth;
    const vHeight = cameraVideo.videoHeight;
    const snapCanvas = document.createElement('canvas');
    snapCanvas.width = vWidth;
    snapCanvas.height = vHeight;
    const snapCtx = snapCanvas.getContext('2d');

    // If front camera, mirror image to match what user saw on screen
    if (currentFacingMode === 'user') {
      snapCtx.translate(vWidth, 0);
      snapCtx.scale(-1, 1);
    }

    snapCtx.drawImage(cameraVideo, 0, 0, vWidth, vHeight);
    stopLiveCamera();

    const dataUrl = snapCanvas.toDataURL('image/jpeg', 0.95);
    const img = new Image();
    img.onload = () => {
      setUserPhoto(img);
    };
    img.src = dataUrl;
  });

  /* =========================================================
     High-Resolution Canvas Export & Download ("คมชัดไม่เบรอไม่แตก")
     ========================================================= */
  async function generateHighResExport() {
    const job = jobsList[currentJobIndex];

    // High resolution supersampling factor (2x native card resolution for razor-sharp export)
    const scaleFactor = 2.5;
    const outWidth = Math.round(job.width * scaleFactor);
    const outHeight = Math.round(job.height * scaleFactor);

    exportCanvas.width = outWidth;
    exportCanvas.height = outHeight;
    const ctx = exportCanvas.getContext('2d');

    // Enable highest quality bicubic interpolation
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    // 1. Draw base career card image at high-res
    const baseCardImg = new Image();
    baseCardImg.crossOrigin = 'anonymous';

    await new Promise((resolve) => {
      baseCardImg.onload = resolve;
      baseCardImg.onerror = resolve;
      baseCardImg.src = job.image;
    });

    ctx.drawImage(baseCardImg, 0, 0, outWidth, outHeight);

    // 2. If user photo exists, draw inside face circle cutout
    if (userImageSource && userFaceImg) {
      const cx = job.faceX * scaleFactor;
      const cy = job.faceY * scaleFactor;
      const radius = (job.faceRadius - 1) * scaleFactor;

      // Save state and clip to circular mask
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2, true);
      ctx.closePath();
      ctx.clip();

      // Compute photo placement matching interactive screen view
      const holeRect = faceHole.getBoundingClientRect();
      const holeW = holeRect.width || 120;
      const renderRatio = (radius * 2) / holeW;

      const userImgRect = userFaceImg.getBoundingClientRect();
      const photoCenterX = userImgRect.left + userImgRect.width / 2;
      const photoCenterY = userImgRect.top + userImgRect.height / 2;
      const holeCenterX = holeRect.left + holeRect.width / 2;
      const holeCenterY = holeRect.top + holeRect.height / 2;

      const deltaX = (photoCenterX - holeCenterX) * renderRatio;
      const deltaY = (photoCenterY - holeCenterY) * renderRatio;
      const drawW = userImgRect.width * renderRatio;
      const drawH = userImgRect.height * renderRatio;

      ctx.save();
      ctx.translate(cx + deltaX, cy + deltaY);

      if (photoTransform.mirror) {
        ctx.scale(-1, 1);
      }

      ctx.drawImage(
        userImageSource,
        -drawW / 2,
        -drawH / 2,
        drawW,
        drawH
      );
      ctx.restore();

      ctx.restore(); // restore clipping

      // Draw subtle smooth anti-aliased blend ring around the circle
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.08)';
      ctx.lineWidth = Math.max(2, 1.5 * scaleFactor);
      ctx.stroke();
    }

    // Convert to High-Quality JPEG Blob (0.98 quality)
    return new Promise((resolve) => {
      exportCanvas.toBlob((blob) => {
        resolve(blob);
      }, 'image/jpeg', 0.98);
    });
  }

  savePhotoBtn.addEventListener('click', async () => {
    initAudio();
    playSound('fanfare');

    // Show loading state on button
    const origText = savePhotoBtn.innerHTML;
    savePhotoBtn.disabled = true;
    savePhotoBtn.innerHTML = `<span>⏳ กำลังบันทึกภาพ...</span>`;

    try {
      const blob = await generateHighResExport();
      lastExportedBlob = blob;
      const job = jobsList[currentJobIndex];
      lastExportedFilename = `อาชีพในฝัน-${job.title}.jpeg`;

      const downloadUrl = URL.createObjectURL(blob);

      // Trigger automatic file download
      const downloadLink = document.createElement('a');
      downloadLink.href = downloadUrl;
      downloadLink.download = lastExportedFilename;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);

      // Also display preview modal with share option (helpful for iPhone/iPad users)
      savedResultImg.src = downloadUrl;

      // Check if Web Share API with files is supported (iOS Safari)
      if (navigator.canShare && navigator.canShare({ files: [new File([blob], lastExportedFilename, { type: 'image/jpeg' })] })) {
        shareImageBtn.style.display = 'flex';
      } else {
        shareImageBtn.style.display = 'none';
      }

      saveSuccessModal.classList.add('active');
    } catch (err) {
      console.error("Save image error:", err);
      alert("ขออภัย เกิดข้อผิดพลาดในการบันทึกภาพ กรุณาลองใหม่อีกครั้งครับ");
    } finally {
      savePhotoBtn.disabled = false;
      savePhotoBtn.innerHTML = origText;
    }
  });

  // Re-download button inside preview modal
  directDownloadBtn.addEventListener('click', () => {
    if (!lastExportedBlob) return;
    initAudio();
    playSound('click');
    const url = URL.createObjectURL(lastExportedBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = lastExportedFilename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });

  // Native Web Share button (for iPad/iPhone Camera Roll)
  shareImageBtn.addEventListener('click', async () => {
    if (!lastExportedBlob) return;
    try {
      const file = new File([lastExportedBlob], lastExportedFilename, { type: 'image/jpeg' });
      await navigator.share({
        files: [file],
        title: 'อาชีพในฝันของฉัน',
        text: `ภาพอาชีพในฝัน: ${jobsList[currentJobIndex].title}`
      });
    } catch (e) {
      console.log("Share dismissed or failed", e);
    }
  });

  closeSaveModalBtn.addEventListener('click', () => {
    saveSuccessModal.classList.remove('active');
  });

  saveSuccessModal.addEventListener('click', (e) => {
    if (e.target === saveSuccessModal) {
      saveSuccessModal.classList.remove('active');
    }
  });

  // Re-fit photo on window resize
  window.addEventListener('resize', () => {
    if (userImageSource) {
      resetPhotoPlacement();
    }
  });

  // Initialize
  setupFaceInteraction();
  loadCareerList();

})();
