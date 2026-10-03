/**
 * Career Photo Studio (สตูดิโอถ่ายรูปอาชีพในฝัน)
 * Interactive Face-in-Hole Camera Game for Early Childhood & Kindergarten
 * Featuring 3D Pixar/Disney Cartoon Face Synthesis & AI Landmark Alignment
 */

(function () {
  'use strict';

  // Fallback career list with pre-calculated face ellipse coordinates
  const DEFAULT_JOBS = [
  {
    "id": "police",
    "title": "ตำรวจ",
    "enTitle": "Police",
    "image": "assets/images/my_job/cards/job_01_police.jpg",
    "width": 296,
    "height": 442,
    "faceX": 164,
    "faceY": 175,
    "radiusX": 71,
    "radiusY": 61,
    "faceRadius": 71
  },
  {
    "id": "doctor",
    "title": "แพทย์",
    "enTitle": "Doctor",
    "image": "assets/images/my_job/cards/job_02_doctor.jpg",
    "width": 296,
    "height": 442,
    "faceX": 121,
    "faceY": 168,
    "radiusX": 69,
    "radiusY": 62,
    "faceRadius": 69
  },
  {
    "id": "nurse",
    "title": "พยาบาล",
    "enTitle": "Nurse",
    "image": "assets/images/my_job/cards/job_03_nurse.jpg",
    "width": 296,
    "height": 442,
    "faceX": 122,
    "faceY": 170,
    "radiusX": 66,
    "radiusY": 61,
    "faceRadius": 66
  },
  {
    "id": "firefighter",
    "title": "นักดับเพลิง",
    "enTitle": "Firefighter",
    "image": "assets/images/my_job/cards/job_04_firefighter.jpg",
    "width": 296,
    "height": 442,
    "faceX": 124,
    "faceY": 165,
    "radiusX": 67,
    "radiusY": 61,
    "faceRadius": 67
  },
  {
    "id": "teacher",
    "title": "ครู",
    "enTitle": "Teacher",
    "image": "assets/images/my_job/cards/job_05_teacher.jpg",
    "width": 296,
    "height": 442,
    "faceX": 141,
    "faceY": 169,
    "radiusX": 67,
    "radiusY": 61,
    "faceRadius": 67
  },
  {
    "id": "chef",
    "title": "พ่อครัว/แม่ครัว",
    "enTitle": "Chef",
    "image": "assets/images/my_job/cards/job_06_chef.jpg",
    "width": 296,
    "height": 488,
    "faceX": 164,
    "faceY": 166,
    "radiusX": 70,
    "radiusY": 63,
    "faceRadius": 70
  },
  {
    "id": "pilot",
    "title": "นักบิน",
    "enTitle": "Pilot",
    "image": "assets/images/my_job/cards/job_07_pilot.jpg",
    "width": 296,
    "height": 488,
    "faceX": 142,
    "faceY": 161,
    "radiusX": 72,
    "radiusY": 62,
    "faceRadius": 72
  },
  {
    "id": "astronaut",
    "title": "นักบินอวกาศ",
    "enTitle": "Astronaut",
    "image": "assets/images/my_job/cards/job_08_astronaut.jpg",
    "width": 296,
    "height": 488,
    "faceX": 127,
    "faceY": 163,
    "radiusX": 69,
    "radiusY": 62,
    "faceRadius": 69
  },
  {
    "id": "navy",
    "title": "ทหารเรือ",
    "enTitle": "Navy",
    "image": "assets/images/my_job/cards/job_09_navy.jpg",
    "width": 296,
    "height": 488,
    "faceX": 115,
    "faceY": 160,
    "radiusX": 69,
    "radiusY": 62,
    "faceRadius": 69
  },
  {
    "id": "soldier",
    "title": "ทหารบก",
    "enTitle": "Soldier",
    "image": "assets/images/my_job/cards/job_10_soldier.jpg",
    "width": 296,
    "height": 488,
    "faceX": 121,
    "faceY": 162,
    "radiusX": 72,
    "radiusY": 63,
    "faceRadius": 72
  },
  {
    "id": "judge",
    "title": "ผู้พิพากษา",
    "enTitle": "Judge",
    "image": "assets/images/my_job/cards/job_11_judge.jpg",
    "width": 296,
    "height": 450,
    "faceX": 156,
    "faceY": 149,
    "radiusX": 68,
    "radiusY": 59,
    "faceRadius": 68
  },
  {
    "id": "lawyer",
    "title": "ทนายความ",
    "enTitle": "Lawyer",
    "image": "assets/images/my_job/cards/job_12_lawyer.jpg",
    "width": 296,
    "height": 450,
    "faceX": 147,
    "faceY": 149,
    "radiusX": 63,
    "radiusY": 60,
    "faceRadius": 63
  },
  {
    "id": "business",
    "title": "นักธุรกิจ",
    "enTitle": "Business",
    "image": "assets/images/my_job/cards/job_13_business.jpg",
    "width": 296,
    "height": 450,
    "faceX": 146,
    "faceY": 152,
    "radiusX": 72,
    "radiusY": 60,
    "faceRadius": 72
  },
  {
    "id": "banker",
    "title": "พนักงานธนาคาร",
    "enTitle": "Banker",
    "image": "assets/images/my_job/cards/job_14_banker.jpg",
    "width": 296,
    "height": 450,
    "faceX": 147,
    "faceY": 153,
    "radiusX": 65,
    "radiusY": 57,
    "faceRadius": 65
  },
  {
    "id": "flight_attendant",
    "title": "พนักงานต้อนรับบนเครื่องบิน",
    "enTitle": "Flight Attendant",
    "image": "assets/images/my_job/cards/job_15_flight_attendant.jpg",
    "width": 296,
    "height": 450,
    "faceX": 150,
    "faceY": 165,
    "radiusX": 68,
    "radiusY": 57,
    "faceRadius": 68
  },
  {
    "id": "baker",
    "title": "นักทำขนม",
    "enTitle": "Baker",
    "image": "assets/images/my_job/cards/job_16_baker.jpg",
    "width": 296,
    "height": 495,
    "faceX": 154,
    "faceY": 170,
    "radiusX": 69,
    "radiusY": 59,
    "faceRadius": 69
  },
  {
    "id": "designer",
    "title": "ดีไซเนอร์เสื้อผ้า",
    "enTitle": "Fashion Designer",
    "image": "assets/images/my_job/cards/job_17_designer.jpg",
    "width": 296,
    "height": 495,
    "faceX": 184,
    "faceY": 175,
    "radiusX": 67,
    "radiusY": 55,
    "faceRadius": 67
  },
  {
    "id": "diver",
    "title": "นักดำน้ำ",
    "enTitle": "Diver",
    "image": "assets/images/my_job/cards/job_18_diver.jpg",
    "width": 296,
    "height": 495,
    "faceX": 159,
    "faceY": 179,
    "radiusX": 70,
    "radiusY": 59,
    "faceRadius": 70
  },
  {
    "id": "rescue",
    "title": "เจ้าหน้าที่กู้ภัย",
    "enTitle": "Rescue",
    "image": "assets/images/my_job/cards/job_19_rescue.jpg",
    "width": 296,
    "height": 495,
    "faceX": 178,
    "faceY": 161,
    "radiusX": 65,
    "radiusY": 56,
    "faceRadius": 65
  },
  {
    "id": "tour_guide",
    "title": "มัคคุเทศก์",
    "enTitle": "Tour Guide",
    "image": "assets/images/my_job/cards/job_20_tour_guide.jpg",
    "width": 296,
    "height": 495,
    "faceX": 143,
    "faceY": 159,
    "radiusX": 63,
    "radiusY": 56,
    "faceRadius": 63
  },
  {
    "id": "postman",
    "title": "พนักงานไปรษณีย์",
    "enTitle": "Postman",
    "image": "assets/images/my_job/cards/job_21_postman.jpg",
    "width": 296,
    "height": 455,
    "faceX": 152,
    "faceY": 162,
    "radiusX": 66,
    "radiusY": 54,
    "faceRadius": 66
  },
  {
    "id": "courier",
    "title": "พนักงานส่งของ",
    "enTitle": "Courier",
    "image": "assets/images/my_job/cards/job_22_courier.jpg",
    "width": 296,
    "height": 455,
    "faceX": 148,
    "faceY": 161,
    "radiusX": 66,
    "radiusY": 53,
    "faceRadius": 66
  },
  {
    "id": "bus_driver",
    "title": "คนขับรถเมล์",
    "enTitle": "Bus Driver",
    "image": "assets/images/my_job/cards/job_23_bus_driver.jpg",
    "width": 296,
    "height": 455,
    "faceX": 123,
    "faceY": 168,
    "radiusX": 68,
    "radiusY": 57,
    "faceRadius": 68
  },
  {
    "id": "taxi_driver",
    "title": "คนขับแท็กซี่",
    "enTitle": "Taxi Driver",
    "image": "assets/images/my_job/cards/job_24_taxi_driver.jpg",
    "width": 296,
    "height": 455,
    "faceX": 129,
    "faceY": 174,
    "radiusX": 70,
    "radiusY": 58,
    "faceRadius": 70
  },
  {
    "id": "train_driver",
    "title": "พนักงานขับรถไฟ",
    "enTitle": "Train Driver",
    "image": "assets/images/my_job/cards/job_25_train_driver.jpg",
    "width": 292,
    "height": 455,
    "faceX": 137,
    "faceY": 170,
    "radiusX": 69,
    "radiusY": 57,
    "faceRadius": 69
  },
  {
    "id": "vet",
    "title": "สัตวแพทย์",
    "enTitle": "Veterinarian",
    "image": "assets/images/my_job/cards/job_26_vet.jpg",
    "width": 296,
    "height": 500,
    "faceX": 168,
    "faceY": 164,
    "radiusX": 68,
    "radiusY": 54,
    "faceRadius": 68
  },
  {
    "id": "pharmacist",
    "title": "เภสัชกร",
    "enTitle": "Pharmacist",
    "image": "assets/images/my_job/cards/job_27_pharmacist.jpg",
    "width": 296,
    "height": 500,
    "faceX": 146,
    "faceY": 168,
    "radiusX": 68,
    "radiusY": 56,
    "faceRadius": 68
  },
  {
    "id": "scientist",
    "title": "นักวิทยาศาสตร์",
    "enTitle": "Scientist",
    "image": "assets/images/my_job/cards/job_28_scientist.jpg",
    "width": 296,
    "height": 500,
    "faceX": 126,
    "faceY": 167,
    "radiusX": 71,
    "radiusY": 57,
    "faceRadius": 71
  },
  {
    "id": "sanitation",
    "title": "พนักงานเก็บขยะ",
    "enTitle": "Sanitation",
    "image": "assets/images/my_job/cards/job_29_sanitation.jpg",
    "width": 296,
    "height": 500,
    "faceX": 126,
    "faceY": 153,
    "radiusX": 67,
    "radiusY": 53,
    "faceRadius": 67
  },
  {
    "id": "gardener",
    "title": "คนสวน",
    "enTitle": "Gardener",
    "image": "assets/images/my_job/cards/job_30_gardener.jpg",
    "width": 292,
    "height": 500,
    "faceX": 121,
    "faceY": 166,
    "radiusX": 69,
    "radiusY": 59,
    "faceRadius": 69
  },
  {
    "id": "farmer",
    "title": "เกษตรกร",
    "enTitle": "Farmer",
    "image": "assets/images/my_job/cards/job_31_farmer.jpg",
    "width": 296,
    "height": 442,
    "faceX": 186,
    "faceY": 169,
    "radiusX": 68,
    "radiusY": 63,
    "faceRadius": 68
  },
  {
    "id": "fisherman",
    "title": "ชาวประมง",
    "enTitle": "Fisherman",
    "image": "assets/images/my_job/cards/job_32_fisherman.jpg",
    "width": 296,
    "height": 442,
    "faceX": 162,
    "faceY": 168,
    "radiusX": 69,
    "radiusY": 63,
    "faceRadius": 69
  },
  {
    "id": "engineer",
    "title": "วิศวกร",
    "enTitle": "Engineer",
    "image": "assets/images/my_job/cards/job_33_engineer.jpg",
    "width": 296,
    "height": 442,
    "faceX": 140,
    "faceY": 166,
    "radiusX": 71,
    "radiusY": 62,
    "faceRadius": 71
  },
  {
    "id": "architect",
    "title": "สถาปนิก",
    "enTitle": "Architect",
    "image": "assets/images/my_job/cards/job_34_architect.jpg",
    "width": 296,
    "height": 442,
    "faceX": 148,
    "faceY": 172,
    "radiusX": 70,
    "radiusY": 60,
    "faceRadius": 70
  },
  {
    "id": "mechanic",
    "title": "ช่างซ่อมรถ",
    "enTitle": "Mechanic",
    "image": "assets/images/my_job/cards/job_35_mechanic.jpg",
    "width": 296,
    "height": 442,
    "faceX": 148,
    "faceY": 170,
    "radiusX": 71,
    "radiusY": 61,
    "faceRadius": 71
  },
  {
    "id": "barber",
    "title": "ช่างตัดผม",
    "enTitle": "Barber",
    "image": "assets/images/my_job/cards/job_36_barber.jpg",
    "width": 296,
    "height": 488,
    "faceX": 166,
    "faceY": 165,
    "radiusX": 72,
    "radiusY": 59,
    "faceRadius": 72
  },
  {
    "id": "artist",
    "title": "จิตรกร",
    "enTitle": "Artist",
    "image": "assets/images/my_job/cards/job_37_artist.jpg",
    "width": 296,
    "height": 488,
    "faceX": 179,
    "faceY": 169,
    "radiusX": 71,
    "radiusY": 59,
    "faceRadius": 71
  },
  {
    "id": "musician",
    "title": "นักดนตรี",
    "enTitle": "Musician",
    "image": "assets/images/my_job/cards/job_38_musician.jpg",
    "width": 296,
    "height": 488,
    "faceX": 149,
    "faceY": 163,
    "radiusX": 71,
    "radiusY": 58,
    "faceRadius": 71
  },
  {
    "id": "reporter",
    "title": "นักข่าว",
    "enTitle": "Reporter",
    "image": "assets/images/my_job/cards/job_39_reporter.jpg",
    "width": 296,
    "height": 488,
    "faceX": 151,
    "faceY": 161,
    "radiusX": 72,
    "radiusY": 60,
    "faceRadius": 72
  },
  {
    "id": "photographer",
    "title": "ช่างภาพ",
    "enTitle": "Photographer",
    "image": "assets/images/my_job/cards/job_40_photographer.jpg",
    "width": 296,
    "height": 488,
    "faceX": 132,
    "faceY": 161,
    "radiusX": 73,
    "radiusY": 60,
    "faceRadius": 73
  }
];

  let jobsList = DEFAULT_JOBS;
  let currentJobIndex = 0;

  // Photo State
  let userRawImage = null;       // Original captured/uploaded Image
  let activePhotoSource = null;  // Currently active image (Real photo)
  let detectedFaceBox = null;    // { x, y, width, height, eyeDistance, eyeCenterX, eyeCenterY, mouthX, mouthY }
  let sampledSkinTone = '#fed7bf';// Sampled skin color
  let currentViewMode = 'standard'; // 'standard' (Real Photo in Hole) | 'banana' (3D Pixar)
  let bananaGeneratedImages = {}; // Cache of generated 3D images by job id: { [jobId]: dataUrl }
  let geminiApiKey = localStorage.getItem('gemini_api_key') || '';
  let aiEngineMode = localStorage.getItem('ai_engine_mode') || 'free'; // 'free' (default) | 'gemini'
  let pendingBananaGeneration = false;

  // Camera stream state
  let activeMediaStream = null;
  let currentFacingMode = 'user'; // 'user' (front) or 'environment' (back)

  // AI BlazeFace model state
  let blazefaceModel = null;
  let blazefaceLoading = false;

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
  const quickToolbar = document.getElementById('quickToolbar');

  // Nano Banana 3D Pixar View Elements
  const bananaResultView = document.getElementById('bananaResultView');
  const bananaResultImg = document.getElementById('bananaResultImg');

  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const careerNameTh = document.getElementById('careerNameTh');
  const careerNameEn = document.getElementById('careerNameEn');
  const careerCounter = document.getElementById('careerCounter');
  const careerSelect = document.getElementById('careerSelect');
  const savePhotoBtn = document.getElementById('savePhotoBtn');

  // Quick toolbar buttons
  const toolBananaBtn = document.getElementById('toolBananaBtn');
  const toolToggleViewBtn = document.getElementById('toolToggleViewBtn');
  const toolRetakeBtn = document.getElementById('toolRetakeBtn');
  const aiStatusBadge = document.getElementById('aiStatusBadge');
  const aiLoadingOverlay = document.getElementById('aiLoadingOverlay');
  const aiLoadingIcon = document.getElementById('aiLoadingIcon');
  const aiLoadingTitle = document.getElementById('aiLoadingTitle');
  const aiLoadingSubtitle = document.getElementById('aiLoadingSubtitle');

  // AI Settings Modal Elements (Free AI & Nano Banana Gemini)
  const apiKeyBtn = document.getElementById('apiKeyBtn');
  const apiKeyModal = document.getElementById('apiKeyModal');
  const closeApiKeyModalBtn = document.getElementById('closeApiKeyModalBtn');
  const optFreeAiCard = document.getElementById('optFreeAiCard');
  const optGeminiCard = document.getElementById('optGeminiCard');
  const engineRadioFree = document.getElementById('engineRadioFree');
  const engineRadioGemini = document.getElementById('engineRadioGemini');
  const geminiKeyGroup = document.getElementById('geminiKeyGroup');
  const geminiApiKeyInput = document.getElementById('geminiApiKeyInput');
  const toggleApiKeyVisibilityBtn = document.getElementById('toggleApiKeyVisibilityBtn');
  const confirmAiEngineBtn = document.getElementById('confirmAiEngineBtn');
  const clearApiKeyBtn = document.getElementById('clearApiKeyBtn');

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
  let lastExportedDataUrl = null;
  let lastExportedFilename = 'my-career.jpeg';

  const nativeCameraInput = document.getElementById('nativeCameraInput');
  const nativeGalleryInput = document.getElementById('nativeGalleryInput');
  const exportCanvas = document.createElement('canvas');
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
        osc.frequency.setValueAtTime(587.33, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.08);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(now);
        osc.stop(now + 0.08);
      } else if (type === 'snap') {
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
        const notes = [523.25, 659.25, 783.99, 1046.50];
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
      console.warn('Audio play error', e);
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
      console.log('Using built-in career list');
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

    careerCardImg.src = job.image;
    careerCardImg.alt = job.title;

    careerNameTh.textContent = job.title;
    careerNameEn.textContent = job.enTitle;
    careerCounter.textContent = `${currentJobIndex + 1} / ${jobsList.length}`;
    careerSelect.value = currentJobIndex;

    // Use precise ellipse radiusX and radiusY with 5% expansion to prevent white gap
    const rx = (job.radiusX || job.faceRadius) * 1.05;
    const ry = (job.radiusY || Math.round((job.radiusX || job.faceRadius) * 0.9)) * 1.05;

    const pctLeft = ((job.faceX - rx) / job.width) * 100;
    const pctTop = ((job.faceY - ry) / job.height) * 100;
    const pctW = ((rx * 2) / job.width) * 100;
    const pctH = ((ry * 2) / job.height) * 100;

    faceHole.style.left = `${pctLeft.toFixed(3)}%`;
    faceHole.style.top = `${pctTop.toFixed(3)}%`;
    faceHole.style.width = `${pctW.toFixed(3)}%`;
    faceHole.style.height = `${pctH.toFixed(3)}%`;

    updateFaceViewState();
    if (activePhotoSource && detectedFaceBox) {
      autoFitFaceToCurrentHole();
    }
  }

  function updateFaceViewState() {
    const job = jobsList[currentJobIndex];
    const hasBananaImg = job && bananaGeneratedImages[job.id];

    if (activePhotoSource) {
      quickToolbar.style.display = 'flex';

      if (hasBananaImg && currentViewMode === 'banana') {
        // Show 3D Pixar View (Generated by Nano Banana)
        if (bananaResultView) {
          bananaResultView.style.display = 'flex';
          bananaResultImg.src = bananaGeneratedImages[job.id];
        }
        careerCardImg.style.visibility = 'hidden';
        faceHole.style.display = 'none';

        if (toolToggleViewBtn) {
          toolToggleViewBtn.style.display = 'inline-flex';
          toolToggleViewBtn.innerHTML = '<span>📸 ดูรูปจริง</span>';
        }
        if (toolBananaBtn) {
          toolBananaBtn.innerHTML = '<span>🍌 สร้างใหม่ (AI)</span>';
        }
        if (aiStatusBadge) {
          aiStatusBadge.innerHTML = '<span class="ai-badge-icon">🍌✨</span><span class="ai-badge-text">3D Pixar AI</span>';
        }
      } else {
        // Show Standard Real Photo in Face Hole View (Auto-fit by AI)
        if (bananaResultView) {
          bananaResultView.style.display = 'none';
        }
        careerCardImg.style.visibility = 'visible';
        faceHole.style.display = 'block';
        faceEmptyState.style.display = 'none';
        faceFilledState.style.display = 'block';
        faceFilledState.classList.add('soft-feathered');

        if (hasBananaImg) {
          if (toolToggleViewBtn) {
            toolToggleViewBtn.style.display = 'inline-flex';
            toolToggleViewBtn.innerHTML = '<span>🍌 ดู 3D Pixar</span>';
          }
          if (toolBananaBtn) {
            toolBananaBtn.innerHTML = '<span>🍌 สร้างใหม่ (AI)</span>';
          }
        } else {
          if (toolToggleViewBtn) {
            toolToggleViewBtn.style.display = 'none';
          }
          if (toolBananaBtn) {
            toolBananaBtn.innerHTML = '<span>🍌 แปลงเป็น 3D Pixar</span>';
          }
        }
        if (aiStatusBadge) {
          aiStatusBadge.innerHTML = '<span class="ai-badge-icon">✨🤖✨</span><span class="ai-badge-text">AI จัดหน้าเข้ากรอบแล้ว</span>';
        }
      }
    } else {
      // Empty state (no photo loaded yet)
      if (bananaResultView) {
        bananaResultView.style.display = 'none';
      }
      careerCardImg.style.visibility = 'visible';
      faceHole.style.display = 'block';
      faceEmptyState.style.display = 'flex';
      faceFilledState.style.display = 'none';
      quickToolbar.style.display = 'none';
    }
  }

  /* =========================================================
     AI Face Detection Engine (Landmarks & Geometry)
     ========================================================= */
  async function initBlazeFace() {
    if (window.blazeface && !blazefaceModel && !blazefaceLoading) {
      try {
        blazefaceLoading = true;
        blazefaceModel = await window.blazeface.load();
        console.log('BlazeFace AI model loaded successfully!');
      } catch (err) {
        console.warn('BlazeFace load error (offline fallback ready):', err);
      } finally {
        blazefaceLoading = false;
      }
    }
  }

  async function detectFace(sourceImg) {
    const natW = sourceImg.naturalWidth || sourceImg.width;
    const natH = sourceImg.naturalHeight || sourceImg.height;

    // Tier 1: BlazeFace AI Model with precise Facial Landmarks
    if (window.blazeface) {
      try {
        if (!blazefaceModel) {
          await initBlazeFace();
        }
        if (blazefaceModel) {
          const predictions = await blazefaceModel.estimateFaces(sourceImg, false);
          if (predictions && predictions.length > 0) {
            const pred = predictions[0];
            const x1 = Math.max(0, pred.topLeft[0]);
            const y1 = Math.max(0, pred.topLeft[1]);
            const x2 = Math.min(natW, pred.bottomRight[0]);
            const y2 = Math.min(natH, pred.bottomRight[1]);
            const w = x2 - x1;
            const h = y2 - y1;

            let eyeDistance = w * 0.35;
            let eyeCenterX = x1 + w * 0.5;
            let eyeCenterY = y1 + h * 0.38;
            let mouthX = x1 + w * 0.5;
            let mouthY = y1 + h * 0.72;
            let isSmiling = false;

            if (pred.landmarks && pred.landmarks.length >= 4) {
              const rightEye = pred.landmarks[0];
              const leftEye = pred.landmarks[1];
              const mouth = pred.landmarks[3];

              eyeDistance = Math.hypot(leftEye[0] - rightEye[0], leftEye[1] - rightEye[1]);
              eyeCenterX = (rightEye[0] + leftEye[0]) / 2;
              eyeCenterY = (rightEye[1] + leftEye[1]) / 2;
              mouthX = mouth[0];
              mouthY = mouth[1];

              // Check smile (distance between mouth and eyes)
              const mouthDist = Math.hypot(mouthX - eyeCenterX, mouthY - eyeCenterY);
              isSmiling = mouthDist > eyeDistance * 0.85;
            }

            return {
              x: x1,
              y: y1,
              width: w,
              height: h,
              eyeDistance: eyeDistance,
              eyeCenterX: eyeCenterX,
              eyeCenterY: eyeCenterY,
              mouthX: mouthX,
              mouthY: mouthY,
              isSmiling: isSmiling,
              method: 'blazeface_landmarks'
            };
          }
        }
      } catch (err) {
        console.warn('BlazeFace estimation error:', err);
      }
    }

    // Tier 2: Browser Native Shape Detection API (FaceDetector)
    if ('FaceDetector' in window) {
      try {
        const detector = new window.FaceDetector({ fastMode: true, maxDetectedFaces: 1 });
        const faces = await detector.detect(sourceImg);
        if (faces && faces.length > 0) {
          const box = faces[0].boundingBox;
          return {
            x: box.x,
            y: box.y,
            width: box.width,
            height: box.height,
            eyeDistance: box.width * 0.35,
            eyeCenterX: box.x + box.width * 0.5,
            eyeCenterY: box.y + box.height * 0.38,
            mouthX: box.x + box.width * 0.5,
            mouthY: box.y + box.height * 0.72,
            isSmiling: true,
            method: 'native_facedetector'
          };
        }
      } catch (err) {
        console.warn('Native FaceDetector error:', err);
      }
    }

    // Tier 3: Pure-JS Computer Vision Face Detector (Skin locus + projection profile)
    try {
      const cvFace = detectFaceCV(sourceImg);
      if (cvFace) return cvFace;
    } catch (err) {
      console.warn('CV detector error:', err);
    }

    // Tier 4: Standard portrait upper-center framing fallback
    const fw = natW * 0.55;
    const fh = natH * 0.55;
    return {
      x: natW * 0.22,
      y: natH * 0.12,
      width: fw,
      height: fh,
      eyeDistance: fw * 0.35,
      eyeCenterX: natW * 0.5,
      eyeCenterY: natH * 0.38,
      mouthX: natW * 0.5,
      mouthY: natH * 0.65,
      isSmiling: true,
      method: 'fallback_portrait'
    };
  }

  function detectFaceCV(sourceImg) {
    const natW = sourceImg.naturalWidth || sourceImg.width;
    const natH = sourceImg.naturalHeight || sourceImg.height;

    const analysisW = 160;
    const analysisH = Math.max(80, Math.round((natH / natW) * analysisW));
    const aCanvas = document.createElement('canvas');
    aCanvas.width = analysisW;
    aCanvas.height = analysisH;
    const actx = aCanvas.getContext('2d');
    actx.drawImage(sourceImg, 0, 0, analysisW, analysisH);

    const imgData = actx.getImageData(0, 0, analysisW, analysisH);
    const data = imgData.data;

    const minScanY = Math.floor(analysisH * 0.05);
    const maxScanY = Math.floor(analysisH * 0.78);

    const projY = new Int32Array(analysisH);
    const projX = new Int32Array(analysisW);
    let skinCount = 0;

    for (let y = minScanY; y < maxScanY; y++) {
      const rowOffset = y * analysisW * 4;
      for (let x = 0; x < analysisW; x++) {
        const idx = rowOffset + x * 4;
        const r = data[idx];
        const g = data[idx + 1];
        const b = data[idx + 2];

        if (r > 75 && g > 35 && b > 20 && r > g && r > b && (r - g) > 10) {
          const total = r + g + b;
          const nr = r / total;
          const ng = g / total;
          if (nr >= 0.35 && nr <= 0.62 && ng >= 0.25 && ng <= 0.40) {
            projY[y]++;
            projX[x]++;
            skinCount++;
          }
        }
      }
    }

    const scaleX = natW / analysisW;
    const scaleY = natH / analysisH;

    if (skinCount < (analysisW * analysisH * 0.02)) {
      return null;
    }

    let maxY = minScanY;
    let maxValY = 0;
    for (let y = minScanY; y < maxScanY; y++) {
      if (projY[y] > maxValY) {
        maxValY = projY[y];
        maxY = y;
      }
    }

    const threshY = maxValY * 0.25;
    let topY = maxY;
    while (topY > minScanY && projY[topY] > threshY) topY--;
    let botY = maxY;
    while (botY < maxScanY && projY[botY] > threshY) botY++;

    let maxX = Math.floor(analysisW / 2);
    let maxValX = 0;
    for (let x = 0; x < analysisW; x++) {
      if (projX[x] > maxValX) {
        maxValX = projX[x];
        maxX = x;
      }
    }

    const threshX = maxValX * 0.25;
    let leftX = maxX;
    while (leftX > 0 && projX[leftX] > threshX) leftX--;
    let rightX = maxX;
    while (rightX < analysisW && projX[rightX] > threshX) rightX++;

    const faceW = Math.max(rightX - leftX, 25) * scaleX;
    const faceH = Math.max(botY - topY, 25) * scaleY;
    const realLeft = leftX * scaleX;
    const realTop = topY * scaleY;

    return {
      x: realLeft,
      y: realTop,
      width: faceW,
      height: faceH,
      eyeDistance: faceW * 0.35,
      eyeCenterX: realLeft + faceW * 0.5,
      eyeCenterY: realTop + faceH * 0.38,
      mouthX: realLeft + faceW * 0.5,
      mouthY: realTop + faceH * 0.72,
      isSmiling: true,
      method: 'cv_skin_projection'
    };
  }

  // Sample skin color from user's cheek region
  function sampleSkinTone(img, box) {
    try {
      const c = document.createElement('canvas');
      c.width = 40;
      c.height = 40;
      const ctx = c.getContext('2d');
      const sx = box.eyeCenterX || (box.x + box.width * 0.5);
      const sy = (box.eyeCenterY || (box.y + box.height * 0.38)) + (box.height * 0.2);
      ctx.drawImage(img, sx - 10, sy - 10, 20, 20, 0, 0, 40, 40);
      const d = ctx.getImageData(15, 15, 10, 10).data;
      let r = 0, g = 0, b = 0, count = 0;
      for (let i = 0; i < d.length; i += 4) {
        r += d[i]; g += d[i+1]; b += d[i+2]; count++;
      }
      r = Math.round(r / count);
      g = Math.round(g / count);
      b = Math.round(b / count);
      // Ensure warm peach tone
      r = Math.min(255, Math.max(220, r));
      g = Math.min(240, Math.max(180, g));
      b = Math.min(225, Math.max(160, b));
      return `rgb(${r}, ${g}, ${b})`;
    } catch (e) {
      return '#fed7bf';
    }
  }

  /* =========================================================
     Nano Banana AI (Google Gemini Image API) Engine
     Creates authentic 3D Disney/Pixar animated characters
     matching Sample Image 3
     ========================================================= */

  // Helper to extract clean JPEG base64 (without data url prefix)
  function getJpegBase64FromImage(img, maxDim = 1024) {
    const c = document.createElement('canvas');
    let w = img.naturalWidth || img.width || 800;
    let h = img.naturalHeight || img.height || 800;
    if (w > maxDim || h > maxDim) {
      if (w > h) {
        h = Math.round((h * maxDim) / w);
        w = maxDim;
      } else {
        w = Math.round((w * maxDim) / h);
        h = maxDim;
      }
    }
    c.width = w;
    c.height = h;
    const ctx = c.getContext('2d');
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(img, 0, 0, w, h);
    const dataUrl = c.toDataURL('image/jpeg', 0.90);
    const commaIdx = dataUrl.indexOf(',');
    return commaIdx >= 0 ? dataUrl.substring(commaIdx + 1) : dataUrl;
  }

  // Generates 3D Disney/Pixar character with 100% Free AI Engine (Pollinations / Flux)
  async function generateWithFreeAI() {
    const currentJob = jobsList[currentJobIndex];

    if (aiLoadingIcon) aiLoadingIcon.textContent = '⚡✨🤖✨🎨';
    if (aiLoadingTitle) aiLoadingTitle.textContent = 'AI ฟรี กำลังสร้างภาพ 3D Pixar...';
    if (aiLoadingSubtitle) aiLoadingSubtitle.textContent = `สร้างตัวละครแอนิเมชันดิสนีย์/พิกซาร์ 3 มิติ ในบทบาท "${currentJob.title}" (${currentJob.enTitle}) 🎈`;
    if (aiLoadingOverlay) aiLoadingOverlay.classList.add('active');

    try {
      const promptText = `cute 3D Disney Pixar animated movie preschool child character, wearing cute detailed authentic preschool ${currentJob.title} (${currentJob.enTitle}) uniform and hat, 3D Pixar CGI render, big adorable eyes, joyful dimpled smile, studio lighting, smooth 3D character design, colorful background, 4k portrait`;

      const seed = Math.floor(Math.random() * 999999);
      const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(promptText)}?width=768&height=768&nologo=true&seed=${seed}&model=flux`;

      const resp = await fetch(url);
      if (!resp.ok) {
        throw new Error(`Free AI server response: ${resp.status}`);
      }
      const blob = await resp.blob();
      const reader = new FileReader();
      const dataUrl = await new Promise((res, rej) => {
        reader.onloadend = () => res(reader.result);
        reader.onerror = rej;
        reader.readAsDataURL(blob);
      });

      // Preload image
      const newImg = new Image();
      await new Promise((res, rej) => {
        newImg.onload = res;
        newImg.onerror = rej;
        newImg.src = dataUrl;
      });

      bananaGeneratedImages[currentJob.id] = dataUrl;
      currentViewMode = 'banana';
      updateFaceViewState();
      playSound('fanfare');

    } catch (err) {
      console.error('Free AI generation failed:', err);
      alert(`⚠️ เกิดข้อผิดพลาดในการสร้างภาพด้วย AI:\n\n${err.message}\n\nกรุณาลองใหม่อีกครั้งครับ`);
    } finally {
      if (aiLoadingOverlay) aiLoadingOverlay.classList.remove('active');
    }
  }

  // Generates 3D Disney/Pixar character with Gemini / Nano Banana API
  async function generateWithNanoBanana() {
    if (!userRawImage) {
      openSourceModal();
      return;
    }

    if (!geminiApiKey || geminiApiKey.trim() === '') {
      openApiKeyModal(true);
      return;
    }

    const currentJob = jobsList[currentJobIndex];

    if (aiLoadingIcon) aiLoadingIcon.textContent = '🍌✨🤖✨🍌';
    if (aiLoadingTitle) aiLoadingTitle.textContent = 'Nano Banana กำลังสร้างภาพ 3D Pixar...';
    if (aiLoadingSubtitle) aiLoadingSubtitle.textContent = `แปลงรูปน้องเป็นตัวละคร 3D Pixar ในบทบาท "${currentJob.title}" (${currentJob.enTitle}) 🎨`;
    if (aiLoadingOverlay) aiLoadingOverlay.classList.add('active');

    try {
      const base64Data = getJpegBase64FromImage(userRawImage, 1024);

      const promptText = `Transform the child in this photo into a cute, high-quality 3D Disney Pixar animated movie preschool character. The character is a cheerful preschool boy/girl with the exact facial features, skin tone, hair style, and joyful facial expression from the photo. Dressed in a complete, authentic, colorful preschool ${currentJob.title} (${currentJob.enTitle}) uniform, with a ${currentJob.title} hat and professional accessories. 3D Pixar CGI render, soft studio lighting, cute big expressive eyes, joyful dimpled smile, vibrant colors, detailed textures, clean colorful background, 4k resolution character portrait.`;

      // Models sequence: Nano Banana 2 & Flash Image family
      const models = [
        'gemini-2.5-flash-image',
        'gemini-3.1-flash-image',
        'gemini-3.1-flash-image-preview'
      ];

      let generatedDataUrl = null;
      let lastErrorMessage = '';

      for (const model of models) {
        try {
          const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(geminiApiKey.trim())}`;
          const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              contents: [{
                parts: [
                  {
                    inlineData: {
                      mimeType: 'image/jpeg',
                      data: base64Data
                    }
                  },
                  {
                    text: promptText
                  }
                ]
              }]
            })
          });

          if (!response.ok) {
            const errJson = await response.json().catch(() => ({}));
            const msg = errJson.error?.message || `HTTP ${response.status} ${response.statusText}`;
            console.warn(`Model ${model} returned error:`, msg);
            lastErrorMessage = msg;

            // Check if this is the Google Free Tier Billing limit: 0 error
            if (msg.includes('limit: 0') || msg.includes('Quota exceeded') || msg.includes('billing')) {
              console.warn('Google Gemini free tier billing limitation detected.');
              if (aiLoadingOverlay) aiLoadingOverlay.classList.remove('active');
              alert('⚠️ Google AI Studio แจ้งเตือน: API Key นี้ยังไม่ได้เปิดใช้ Billing ใน Google Cloud (โควตา limit: 0 สำหรับสร้างรูปภาพ)\n\n✨ ระบบจะสลับไปสร้างภาพ 3D Pixar ด้วย "AI ฟรี (ไม่ต้องใช้ Key)" ให้ทันทีครับ!');
              aiEngineMode = 'free';
              localStorage.setItem('ai_engine_mode', 'free');
              return await generateWithFreeAI();
            }

            continue;
          }

          const resData = await response.json();
          const parts = resData.candidates?.[0]?.content?.parts || [];
          const imgPart = parts.find(p => p.inlineData && p.inlineData.data);

          if (imgPart) {
            const mime = imgPart.inlineData.mimeType || 'image/jpeg';
            generatedDataUrl = `data:${mime};base64,${imgPart.inlineData.data}`;
            console.log(`Successfully generated 3D Pixar character using ${model}!`);
            break;
          } else {
            const textPart = parts.find(p => p.text);
            console.warn(`Model ${model} returned text:`, textPart?.text);
          }
        } catch (callErr) {
          console.warn(`Model ${model} fetch failed:`, callErr);
          lastErrorMessage = callErr.message;
        }
      }

      if (!generatedDataUrl) {
        if (lastErrorMessage.includes('limit: 0') || lastErrorMessage.includes('Quota exceeded') || lastErrorMessage.includes('billing')) {
          if (aiLoadingOverlay) aiLoadingOverlay.classList.remove('active');
          alert('⚠️ Google AI Studio แจ้งเตือน: API Key นี้ยังไม่ได้เปิดใช้ Billing ใน Google Cloud (โควตา limit: 0 สำหรับสร้างรูปภาพ)\n\n✨ ระบบจะสลับไปสร้างภาพ 3D Pixar ด้วย "AI ฟรี (ไม่ต้องใช้ Key)" ให้ทันทีครับ!');
          aiEngineMode = 'free';
          localStorage.setItem('ai_engine_mode', 'free');
          return await generateWithFreeAI();
        }
        throw new Error(lastErrorMessage || 'ไม่พบรูปภาพตอบกลับจาก Nano Banana API กรุณาลองใหม่อีกครั้ง');
      }

      // Preload image to ensure seamless display
      const newImg = new Image();
      await new Promise((res, rej) => {
        newImg.onload = res;
        newImg.onerror = rej;
        newImg.src = generatedDataUrl;
      });

      // Cache by job id and switch view to 3D Pixar
      bananaGeneratedImages[currentJob.id] = generatedDataUrl;
      currentViewMode = 'banana';
      updateFaceViewState();
      playSound('fanfare');

    } catch (err) {
      console.error('Nano Banana generation failed:', err);
      if (err.message && (err.message.includes('limit: 0') || err.message.includes('Quota exceeded') || err.message.includes('billing'))) {
        if (aiLoadingOverlay) aiLoadingOverlay.classList.remove('active');
        alert('⚠️ Google AI Studio แจ้งเตือน: API Key นี้ยังไม่ได้เปิดใช้ Billing ใน Google Cloud (โควตา limit: 0 สำหรับสร้างรูปภาพ)\n\n✨ ระบบจะสลับไปสร้างภาพ 3D Pixar ด้วย "AI ฟรี (ไม่ต้องใช้ Key)" ให้ทันทีครับ!');
        aiEngineMode = 'free';
        localStorage.setItem('ai_engine_mode', 'free');
        return await generateWithFreeAI();
      }
      alert(`⚠️ เกิดข้อผิดพลาดในการเชื่อมต่อ Nano Banana AI:\n\n${err.message}\n\nกรุณาตรวจสอบว่า Google Gemini API Key ของคุณถูกต้อง หรือสลับไปใช้ "AI ฟรี" ในการตั้งค่าครับ`);
    } finally {
      if (aiLoadingOverlay) aiLoadingOverlay.classList.remove('active');
    }
  }

  // Unified 3D Pixar Image Generator
  async function generate3DPixarImage() {
    if (!userRawImage) {
      openSourceModal();
      return;
    }

    if (aiEngineMode === 'gemini') {
      if (!geminiApiKey || geminiApiKey.trim() === '') {
        openApiKeyModal(true);
        return;
      }
      await generateWithNanoBanana();
    } else {
      await generateWithFreeAI();
    }
  }

  /* =========================================================
     Instant Face-Fitting Engine (Real Photo Mode)
     ========================================================= */
  function autoFitFaceToCurrentHole() {
    if (!activePhotoSource || !faceHole) return;

    const holeRect = faceHole.getBoundingClientRect();
    const holeW = holeRect.width || 120;
    const holeH = holeRect.height || 120;

    if (userRawImage && detectedFaceBox) {
      // Natural face alignment using detected facial geometry
      const targetEyeDist = holeW * 0.48;
      const currentEyeDist = detectedFaceBox.eyeDistance || (detectedFaceBox.width * 0.35);
      const scale = targetEyeDist / currentEyeDist;

      const displayW = userRawImage.naturalWidth * scale;
      const displayH = userRawImage.naturalHeight * scale;

      const targetEyeX = holeW * 0.5;
      const targetEyeY = (holeH * 0.5) - (holeH * 0.08);

      const imgLeft = targetEyeX - (detectedFaceBox.eyeCenterX * scale);
      const imgTop = targetEyeY - (detectedFaceBox.eyeCenterY * scale);

      userFaceImg.src = userRawImage.src;
      userFaceImg.style.width = `${displayW}px`;
      userFaceImg.style.height = `${displayH}px`;
      userFaceImg.style.left = `${imgLeft}px`;
      userFaceImg.style.top = `${imgTop}px`;
      userFaceImg.style.transform = 'none';
    } else {
      userFaceImg.src = userRawImage.src;
      userFaceImg.style.width = '100%';
      userFaceImg.style.height = '100%';
      userFaceImg.style.left = '0px';
      userFaceImg.style.top = '0px';
      userFaceImg.style.transform = 'none';
    }
  }

  async function processUserPhoto(loadedImg) {
    if (aiLoadingIcon) aiLoadingIcon.textContent = '✨🤖✨';
    if (aiLoadingTitle) aiLoadingTitle.textContent = 'AI กำลังจัดใบหน้าเข้ากรอบ...';
    if (aiLoadingSubtitle) aiLoadingSubtitle.textContent = 'จัดขนาดและตำแหน่งให้อัตโนมัติ ไม่ต้องปรับเองเลยจ้า 🎈';
    if (aiLoadingOverlay) aiLoadingOverlay.classList.add('active');
    playSound('click');

    userRawImage = loadedImg;
    activePhotoSource = userRawImage;
    currentViewMode = 'standard';
    bananaGeneratedImages = {}; // Reset 3D cache for the new face

    // Detect face landmarks using BlazeFace AI
    try {
      detectedFaceBox = await detectFace(loadedImg);
    } catch (err) {
      console.warn('Face detection error:', err);
      const fw = loadedImg.naturalWidth * 0.55;
      const fh = loadedImg.naturalHeight * 0.55;
      detectedFaceBox = {
        x: loadedImg.naturalWidth * 0.22,
        y: loadedImg.naturalHeight * 0.12,
        width: fw,
        height: fh,
        eyeDistance: fw * 0.35,
        eyeCenterX: loadedImg.naturalWidth * 0.5,
        eyeCenterY: loadedImg.naturalHeight * 0.38,
        mouthX: loadedImg.naturalWidth * 0.5,
        mouthY: loadedImg.naturalHeight * 0.65,
        isSmiling: true
      };
    }

    // Sample user skin tone
    sampledSkinTone = sampleSkinTone(loadedImg, detectedFaceBox);

    await new Promise(r => setTimeout(r, 400));

    if (aiLoadingOverlay) aiLoadingOverlay.classList.remove('active');
    playSound('fanfare');

    updateFaceViewState();
    autoFitFaceToCurrentHole();
  }

  /* =========================================================
     High-Resolution Canvas Export & Download (100% Reliable & No Errors)
     ========================================================= */
  function dataURLtoBlob(dataurl) {
    const parts = dataurl.split(',');
    const mime = parts[0].match(/:(.*?);/)[1];
    const bin = atob(parts[1]);
    const len = bin.length;
    const u8 = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      u8[i] = bin.charCodeAt(i);
    }
    return new Blob([u8], { type: mime });
  }

  async function generateHighResExport() {
    const job = jobsList[currentJobIndex];

    // Case 1: Nano Banana 3D Pixar View Export
    if (currentViewMode === 'banana' && bananaGeneratedImages[job.id]) {
      const bImg = new Image();
      await new Promise((res) => {
        bImg.onload = res;
        bImg.onerror = res;
        bImg.src = bananaGeneratedImages[job.id];
      });

      const outWidth = bImg.naturalWidth || 1024;
      const outHeight = bImg.naturalHeight || 1024;
      exportCanvas.width = outWidth;
      exportCanvas.height = outHeight;
      const ctx = exportCanvas.getContext('2d');
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      // 1. Draw 3D Pixar character image
      ctx.drawImage(bImg, 0, 0, outWidth, outHeight);

      // 2. Add souvenir card bottom bar
      const barHeight = Math.round(outHeight * 0.085);
      const barY = outHeight - barHeight;
      const barGrad = ctx.createLinearGradient(0, barY, 0, outHeight);
      barGrad.addColorStop(0, 'rgba(15, 23, 42, 0)');
      barGrad.addColorStop(0.35, 'rgba(15, 23, 42, 0.75)');
      barGrad.addColorStop(1, 'rgba(15, 23, 42, 0.92)');
      ctx.fillStyle = barGrad;
      ctx.fillRect(0, barY, outWidth, barHeight);

      // Career text badge
      ctx.fillStyle = '#ffffff';
      ctx.font = `bold ${Math.round(outHeight * 0.038)}px Prompt, Mitr, sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
      ctx.shadowBlur = 6;
      ctx.fillText(`อาชีพในฝัน: ${job.title} • ${job.enTitle}`, outWidth / 2, outHeight - (barHeight * 0.42));
      ctx.shadowBlur = 0;

      const dataUrl = exportCanvas.toDataURL('image/jpeg', 0.96);
      const blob = dataURLtoBlob(dataUrl);
      return { dataUrl, blob };
    }

    // Case 2: Standard Face-in-Hole Real Photo Export
    const scaleFactor = 2.5;
    const outWidth = Math.round(job.width * scaleFactor);
    const outHeight = Math.round(job.height * scaleFactor);

    exportCanvas.width = outWidth;
    exportCanvas.height = outHeight;
    const ctx = exportCanvas.getContext('2d');

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    // 1. Draw base career card image from the already-loaded DOM element (zero CORS, zero reload!)
    if (careerCardImg && careerCardImg.naturalWidth > 0) {
      ctx.drawImage(careerCardImg, 0, 0, outWidth, outHeight);
    } else {
      const baseImg = new Image();
      await new Promise((res) => {
        baseImg.onload = res;
        baseImg.onerror = res;
        baseImg.src = job.image;
      });
      ctx.drawImage(baseImg, 0, 0, outWidth, outHeight);
    }

    // 2. Composite face using landmark positioning & feathered mask
    if (activePhotoSource) {
      const cx = job.faceX * scaleFactor;
      const cy = job.faceY * scaleFactor;
      const rx = (job.radiusX || job.faceRadius) * scaleFactor * 1.05;
      const ry = (job.radiusY || Math.round(rx * 0.9)) * scaleFactor * 1.05;

      const pCanvas = document.createElement('canvas');
      pCanvas.width = outWidth;
      pCanvas.height = outHeight;
      const pctx = pCanvas.getContext('2d');
      pctx.imageSmoothingEnabled = true;
      pctx.imageSmoothingQuality = 'high';

      if (userRawImage && detectedFaceBox) {
        const targetEyeDist = (rx * 2) * 0.48;
        const currentEyeDist = detectedFaceBox.eyeDistance || (detectedFaceBox.width * 0.35);
        const exportScale = targetEyeDist / currentEyeDist;

        const drawW = userRawImage.naturalWidth * exportScale;
        const drawH = userRawImage.naturalHeight * exportScale;

        const targetEyeX = cx;
        const targetEyeY = cy - (ry * 2) * 0.08;

        const drawX = targetEyeX - (detectedFaceBox.eyeCenterX * exportScale);
        const drawY = targetEyeY - (detectedFaceBox.eyeCenterY * exportScale);

        pctx.drawImage(userRawImage, drawX, drawY, drawW, drawH);
      } else {
        pctx.drawImage(activePhotoSource, cx - rx, cy - ry, rx * 2, ry * 2);
      }

      // Soft feathered elliptical radial mask (alpha fade from 72% to 99%)
      pctx.globalCompositeOperation = 'destination-in';
      pctx.save();
      pctx.translate(cx, cy);
      pctx.scale(1.0, ry / rx);

      const grad = pctx.createRadialGradient(0, 0, rx * 0.72, 0, 0, rx);
      grad.addColorStop(0, 'rgba(0, 0, 0, 1)');
      grad.addColorStop(0.85, 'rgba(0, 0, 0, 0.95)');
      grad.addColorStop(0.94, 'rgba(0, 0, 0, 0.6)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

      pctx.fillStyle = grad;
      pctx.beginPath();
      pctx.arc(0, 0, rx, 0, Math.PI * 2);
      pctx.fill();
      pctx.restore();

      // Draw feathered face onto the card
      ctx.drawImage(pCanvas, 0, 0);
    }

    const dataUrl = exportCanvas.toDataURL('image/jpeg', 0.96);
    const blob = dataURLtoBlob(dataUrl);

    return { dataUrl, blob };
  }

  /* =========================================================
     Camera Stream & Photo Selection Logic
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

  faceHole.addEventListener('click', () => {
    openSourceModal();
  });

  faceHole.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openSourceModal();
    }
  });

  chooseCameraBtn.addEventListener('click', () => {
    closeSourceModal();
    initAudio();
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      openLiveCameraModal();
    } else {
      nativeCameraInput.click();
    }
  });

  chooseGalleryBtn.addEventListener('click', () => {
    closeSourceModal();
    initAudio();
    nativeGalleryInput.click();
  });

  function handleFileInputChange(e) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (loadEvent) => {
      const img = new Image();
      img.onload = () => {
        processUserPhoto(img);
      };
      img.src = loadEvent.target.result;
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  }

  nativeCameraInput.addEventListener('change', handleFileInputChange);
  nativeGalleryInput.addEventListener('change', handleFileInputChange);

  async function openLiveCameraModal() {
    cameraModal.classList.add('active');
    await startLiveCamera();
  }

  function closeLiveCameraModal() {
    stopLiveCamera();
    cameraModal.classList.remove('active');
  }

  async function startLiveCamera() {
    try {
      const constraints = {
        video: {
          facingMode: currentFacingMode,
          width: { ideal: 1280 },
          height: { ideal: 960 }
        },
        audio: false
      };

      activeMediaStream = await navigator.mediaDevices.getUserMedia(constraints);
      cameraVideo.srcObject = activeMediaStream;
      await cameraVideo.play();
    } catch (err) {
      console.warn('getUserMedia error, falling back to native capture input', err);
      closeLiveCameraModal();
      nativeCameraInput.click();
    }
  }

  function stopLiveCamera() {
    if (activeMediaStream) {
      activeMediaStream.getTracks().forEach(track => track.stop());
      activeMediaStream = null;
    }
    if (cameraVideo) {
      cameraVideo.srcObject = null;
    }
  }

  closeCameraBtn.addEventListener('click', closeLiveCameraModal);
  cancelCameraBtn.addEventListener('click', closeLiveCameraModal);
  cameraModal.addEventListener('click', (e) => {
    if (e.target === cameraModal) closeLiveCameraModal();
  });

  switchCameraBtn.addEventListener('click', async () => {
    initAudio();
    playSound('click');
    currentFacingMode = currentFacingMode === 'user' ? 'environment' : 'user';
    if (activeMediaStream) {
      activeMediaStream.getTracks().forEach(track => track.stop());
    }
    await startLiveCamera();
  });

  snapPhotoBtn.addEventListener('click', () => {
    if (!activeMediaStream || !cameraVideo.videoWidth) return;

    playSound('snap');

    const vWidth = cameraVideo.videoWidth;
    const vHeight = cameraVideo.videoHeight;
    const snapCanvas = document.createElement('canvas');
    snapCanvas.width = vWidth;
    snapCanvas.height = vHeight;
    const snapCtx = snapCanvas.getContext('2d');

    if (currentFacingMode === 'user') {
      snapCtx.translate(vWidth, 0);
      snapCtx.scale(-1, 1);
    }

    snapCtx.drawImage(cameraVideo, 0, 0, vWidth, vHeight);
    closeLiveCameraModal();

    const dataUrl = snapCanvas.toDataURL('image/jpeg', 0.95);
    const img = new Image();
    img.onload = () => {
      processUserPhoto(img);
    };
    img.src = dataUrl;
  });

  /* =========================================================
     Quick Toolbar Event Handlers
     ========================================================= */
  if (toolBananaBtn) {
    toolBananaBtn.addEventListener('click', () => {
      initAudio();
      playSound('click');
      generate3DPixarImage();
    });
  }

  if (toolToggleViewBtn) {
    toolToggleViewBtn.addEventListener('click', () => {
      initAudio();
      playSound('click');
      currentViewMode = currentViewMode === 'banana' ? 'standard' : 'banana';
      updateFaceViewState();
      if (currentViewMode === 'standard') {
        autoFitFaceToCurrentHole();
      }
    });
  }

  if (toolRetakeBtn) {
    toolRetakeBtn.addEventListener('click', () => {
      initAudio();
      playSound('click');
      openSourceModal();
    });
  }

  /* =========================================================
     AI Engine & Settings Modal Handlers
     ========================================================= */
  function updateModalEngineUi() {
    if (aiEngineMode === 'free') {
      if (engineRadioFree) engineRadioFree.checked = true;
      if (optFreeAiCard) optFreeAiCard.classList.add('selected');
      if (optGeminiCard) optGeminiCard.classList.remove('selected');
      if (geminiKeyGroup) geminiKeyGroup.style.display = 'none';
      if (confirmAiEngineBtn) confirmAiEngineBtn.innerHTML = '<span>🚀 ใช้งาน AI ฟรีทันที</span>';
    } else {
      if (engineRadioGemini) engineRadioGemini.checked = true;
      if (optGeminiCard) optGeminiCard.classList.add('selected');
      if (optFreeAiCard) optFreeAiCard.classList.remove('selected');
      if (geminiKeyGroup) geminiKeyGroup.style.display = 'flex';
      if (confirmAiEngineBtn) confirmAiEngineBtn.innerHTML = '<span>💾 บันทึก Gemini Key</span>';
    }
  }

  function openApiKeyModal(fromBananaBtn = false) {
    initAudio();
    playSound('click');
    pendingBananaGeneration = fromBananaBtn;
    if (geminiApiKeyInput) {
      geminiApiKeyInput.value = geminiApiKey || '';
    }
    if (clearApiKeyBtn) {
      clearApiKeyBtn.style.display = geminiApiKey ? 'inline-flex' : 'none';
    }
    updateModalEngineUi();
    if (apiKeyModal) {
      apiKeyModal.classList.add('active');
    }
  }

  function closeApiKeyModal() {
    if (apiKeyModal) {
      apiKeyModal.classList.remove('active');
    }
    pendingBananaGeneration = false;
  }

  if (apiKeyBtn) {
    apiKeyBtn.addEventListener('click', () => openApiKeyModal(false));
  }

  if (closeApiKeyModalBtn) {
    closeApiKeyModalBtn.addEventListener('click', closeApiKeyModal);
  }

  if (apiKeyModal) {
    apiKeyModal.addEventListener('click', (e) => {
      if (e.target === apiKeyModal) closeApiKeyModal();
    });
  }

  if (optFreeAiCard) {
    optFreeAiCard.addEventListener('click', () => {
      initAudio();
      playSound('click');
      aiEngineMode = 'free';
      updateModalEngineUi();
    });
  }

  if (optGeminiCard) {
    optGeminiCard.addEventListener('click', () => {
      initAudio();
      playSound('click');
      aiEngineMode = 'gemini';
      updateModalEngineUi();
      setTimeout(() => {
        if (geminiApiKeyInput) geminiApiKeyInput.focus();
      }, 100);
    });
  }

  if (toggleApiKeyVisibilityBtn && geminiApiKeyInput) {
    toggleApiKeyVisibilityBtn.addEventListener('click', () => {
      if (geminiApiKeyInput.type === 'password') {
        geminiApiKeyInput.type = 'text';
        toggleApiKeyVisibilityBtn.textContent = '🔒';
      } else {
        geminiApiKeyInput.type = 'password';
        toggleApiKeyVisibilityBtn.textContent = '👁️';
      }
    });
  }

  if (confirmAiEngineBtn) {
    confirmAiEngineBtn.addEventListener('click', () => {
      initAudio();
      playSound('click');
      localStorage.setItem('ai_engine_mode', aiEngineMode);

      if (aiEngineMode === 'gemini') {
        const val = geminiApiKeyInput.value.trim();
        if (!val) {
          alert('กรุณากรอกหรือวาง Gemini API Key ก่อนกดบันทึกครับ');
          return;
        }
        geminiApiKey = val;
        localStorage.setItem('gemini_api_key', val);
      }

      if (apiKeyModal) apiKeyModal.classList.remove('active');

      if (pendingBananaGeneration) {
        pendingBananaGeneration = false;
        generate3DPixarImage();
      } else {
        alert(aiEngineMode === 'free' ? '✅ เลือกใช้ AI ฟรีเรียบร้อยแล้วครับ!' : '✅ บันทึก Gemini API Key เรียบร้อยแล้วครับ!');
      }
    });
  }

  if (clearApiKeyBtn && geminiApiKeyInput) {
    clearApiKeyBtn.addEventListener('click', () => {
      initAudio();
      playSound('click');
      geminiApiKey = '';
      localStorage.removeItem('gemini_api_key');
      geminiApiKeyInput.value = '';
      clearApiKeyBtn.style.display = 'none';
      aiEngineMode = 'free';
      localStorage.setItem('ai_engine_mode', 'free');
      updateModalEngineUi();
      alert('ลบ API Key ที่บันทึกไว้เรียบร้อยแล้วครับ (ระบบสลับมาใช้ AI ฟรี)');
    });
  }

  /* =========================================================
     Navigation & Save Buttons
     ========================================================= */
  prevBtn.addEventListener('click', () => {
    initAudio();
    playSound('click');
    displayCareer(currentJobIndex - 1);
  });

  nextBtn.addEventListener('click', () => {
    initAudio();
    playSound('click');
    displayCareer(currentJobIndex + 1);
  });

  window.addEventListener('keydown', (e) => {
    if (cameraModal.classList.contains('active') || sourceModal.classList.contains('active')) return;
    if (e.key === 'ArrowLeft') {
      prevBtn.click();
    } else if (e.key === 'ArrowRight') {
      nextBtn.click();
    }
  });

  savePhotoBtn.addEventListener('click', async () => {
    initAudio();
    playSound('fanfare');

    const origText = savePhotoBtn.innerHTML;
    savePhotoBtn.disabled = true;
    savePhotoBtn.innerHTML = '<span>⏳ กำลังบันทึกภาพ...</span>';

    try {
      const exportResult = await generateHighResExport();
      const downloadUrl = exportResult.dataUrl;
      const blob = exportResult.blob;
      lastExportedBlob = blob;
      lastExportedDataUrl = downloadUrl;

      const job = jobsList[currentJobIndex];
      lastExportedFilename = `อาชีพในฝัน-${job.title}.jpeg`;

      // 1. Try automatic download link for desktop browsers
      try {
        const downloadLink = document.createElement('a');
        downloadLink.href = downloadUrl;
        downloadLink.download = lastExportedFilename;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        setTimeout(() => {
          if (document.body.contains(downloadLink)) {
            document.body.removeChild(downloadLink);
          }
        }, 150);
      } catch (dlErr) {
        console.warn('Auto download click error:', dlErr);
      }

      // 2. Set result image in preview modal
      savedResultImg.src = downloadUrl;

      // 3. Configure share button safely
      try {
        if (navigator.canShare && blob && navigator.canShare({ files: [new File([blob], lastExportedFilename, { type: 'image/jpeg' })] })) {
          shareImageBtn.style.display = 'flex';
        } else {
          shareImageBtn.style.display = 'none';
        }
      } catch (shareErr) {
        shareImageBtn.style.display = 'none';
      }

      // 4. Always show success modal with preview & direct save instructions
      saveSuccessModal.classList.add('active');
    } catch (err) {
      console.error('Save image error:', err);
      try {
        const fallbackUrl = exportCanvas.toDataURL('image/jpeg', 0.95);
        savedResultImg.src = fallbackUrl;
        saveSuccessModal.classList.add('active');
      } catch (fbErr) {
        alert('กรุณาแตะที่รูปค้างไว้เพื่อบันทึกรูปภาพครับ');
      }
    } finally {
      savePhotoBtn.disabled = false;
      savePhotoBtn.innerHTML = origText;
    }
  });

  directDownloadBtn.addEventListener('click', () => {
    if (!lastExportedDataUrl && !lastExportedBlob) return;
    initAudio();
    playSound('click');
    const url = lastExportedDataUrl || URL.createObjectURL(lastExportedBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = lastExportedFilename;
    document.body.appendChild(link);
    link.click();
    setTimeout(() => {
      if (document.body.contains(link)) document.body.removeChild(link);
    }, 150);
  });

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
      console.log('Share dismissed or failed', e);
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

  // Re-fit photo automatically on window resize
  window.addEventListener('resize', () => {
    if (activePhotoSource) {
      autoFitFaceToCurrentHole();
    }
  });

  // Initialize
  initBlazeFace();
  loadCareerList();

})();
