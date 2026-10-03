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
  let userPixarImage = null;     // 3D Pixar/Disney style cartoon face Image
  let activePhotoSource = null;  // Currently active image (Pixar by default)
  let detectedFaceBox = null;    // { x, y, width, height, eyeDistance, eyeCenterX, eyeCenterY, mouthX, mouthY }
  let sampledSkinTone = '#fed7bf';// Sampled skin color
  let pixarStyleEnabled = true;  // Default ON for 3D Pixar Look!

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

  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const careerNameTh = document.getElementById('careerNameTh');
  const careerNameEn = document.getElementById('careerNameEn');
  const careerCounter = document.getElementById('careerCounter');
  const careerSelect = document.getElementById('careerSelect');
  const savePhotoBtn = document.getElementById('savePhotoBtn');

  // Quick toolbar buttons
  const toolCartoonBtn = document.getElementById('toolCartoonBtn');
  const toolRetakeBtn = document.getElementById('toolRetakeBtn');
  const aiStatusBadge = document.getElementById('aiStatusBadge');
  const aiLoadingOverlay = document.getElementById('aiLoadingOverlay');

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
    if (activePhotoSource) {
      faceEmptyState.style.display = 'none';
      faceFilledState.style.display = 'block';
      quickToolbar.style.display = 'flex';

      faceFilledState.classList.add('soft-feathered');

      if (toolCartoonBtn) {
        if (pixarStyleEnabled) {
          toolCartoonBtn.classList.add('active-toggle');
          toolCartoonBtn.textContent = '🎨 หน้า 3D การ์ตูน (เปิดอยู่)';
        } else {
          toolCartoonBtn.classList.remove('active-toggle');
          toolCartoonBtn.textContent = '📷 ภาพถ่ายจริง';
        }
      }
    } else {
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
     3D Pixar/Disney Cartoon Face Synthesis Engine
     (Creates a genuine animated cartoon face matching Sample Image 3)
     ========================================================= */
  function generatePixarFaceImage(sourceImg, faceBox, skinColor) {
    const dim = 400;
    const canvas = document.createElement('canvas');
    canvas.width = dim;
    canvas.height = dim;
    const ctx = canvas.getContext('2d');

    const cx = dim / 2;
    const cy = dim / 2;
    const rx = dim * 0.46;
    const ry = dim * 0.48;

    // 1. 3D Spherical Porcelain Cartoon Skin
    ctx.save();
    ctx.beginPath();
    ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
    ctx.clip();

    const skinGrad = ctx.createRadialGradient(cx - rx * 0.25, cy - ry * 0.3, rx * 0.1, cx, cy, rx * 1.1);
    skinGrad.addColorStop(0, '#fff4ea');     // Specular sunlight highlight
    skinGrad.addColorStop(0.35, skinColor || '#fed7bf'); // Sampled skin tone
    skinGrad.addColorStop(0.82, '#e8b293');  // Subsurface scattering
    skinGrad.addColorStop(1, '#c99274');     // 3D edge occlusion shadow
    ctx.fillStyle = skinGrad;
    ctx.fill();

    // 2. 3D Rosy Blushing Cheeks
    const leftCheekX = cx - rx * 0.52;
    const rightCheekX = cx + rx * 0.52;
    const cheekY = cy + ry * 0.14;
    const cheekR = rx * 0.34;

    function drawCheek(x, y) {
      const grad = ctx.createRadialGradient(x, y, 0, x, y, cheekR);
      grad.addColorStop(0, 'rgba(255, 110, 110, 0.45)');
      grad.addColorStop(0.65, 'rgba(255, 130, 130, 0.20)');
      grad.addColorStop(1, 'rgba(255, 130, 130, 0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(x, y, cheekR, 0, Math.PI * 2);
      ctx.fill();
    }
    drawCheek(leftCheekX, cheekY);
    drawCheek(rightCheekX, cheekY);

    // 3. Pixar 3D Living Eyes (Large, expressive, dual specular reflection)
    const eyeSpacing = rx * 0.45;
    const eyeY = cy - ry * 0.12;
    const eyeW = rx * 0.33;
    const eyeH = ry * 0.39;

    function drawPixarEye(eyeX, isLeft) {
      ctx.save();

      // Eye White (Sclera)
      ctx.beginPath();
      ctx.ellipse(eyeX, eyeY, eyeW, eyeH, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#f8fafd';
      ctx.fill();

      // Soft top eyelid shadow
      const eyeShadow = ctx.createLinearGradient(eyeX, eyeY - eyeH, eyeX, eyeY + eyeH);
      eyeShadow.addColorStop(0, 'rgba(40, 20, 10, 0.18)');
      eyeShadow.addColorStop(0.35, 'rgba(40, 20, 10, 0)');
      ctx.fillStyle = eyeShadow;
      ctx.fill();

      // Iris clipping
      ctx.clip();

      // Large Cartoon Iris
      const irisR = eyeW * 0.80;
      const irisX = eyeX;
      const irisY = eyeY + eyeH * 0.05;

      const irisGrad = ctx.createRadialGradient(irisX, irisY - irisR * 0.4, irisR * 0.1, irisX, irisY, irisR);
      irisGrad.addColorStop(0, '#1c0c05'); // Dark chocolate top
      irisGrad.addColorStop(0.6, '#4a210d');
      irisGrad.addColorStop(0.9, '#8c4217'); // Warm amber glow bottom
      irisGrad.addColorStop(1, '#2d1408');

      ctx.fillStyle = irisGrad;
      ctx.beginPath();
      ctx.arc(irisX, irisY, irisR, 0, Math.PI * 2);
      ctx.fill();

      // Deep Black Pupil
      const pupilR = irisR * 0.52;
      ctx.fillStyle = '#0a0502';
      ctx.beginPath();
      ctx.arc(irisX, irisY, pupilR, 0, Math.PI * 2);
      ctx.fill();

      // Pixar Glare: Primary crisp specular glare at 10 o'clock
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(irisX - pupilR * 0.44, irisY - pupilR * 0.44, pupilR * 0.40, 0, Math.PI * 2);
      ctx.fill();

      // Secondary soft highlight at 4 o'clock
      ctx.fillStyle = 'rgba(255, 255, 255, 0.70)';
      ctx.beginPath();
      ctx.arc(irisX + pupilR * 0.48, irisY + pupilR * 0.46, pupilR * 0.20, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();

      // Upper Eyelash / Lid Line (Disney-style thick stroke)
      ctx.save();
      ctx.strokeStyle = '#221109';
      ctx.lineWidth = 4.2;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.arc(eyeX, eyeY + eyeH * 0.08, eyeW * 1.05, Math.PI * 1.15, Math.PI * 1.85);
      ctx.stroke();
      ctx.restore();

      // Pixar Eyebrow
      ctx.save();
      const browY = eyeY - eyeH * 1.15;
      ctx.strokeStyle = '#32190e';
      ctx.lineWidth = 4.0;
      ctx.lineCap = 'round';
      ctx.beginPath();
      const browTilt = isLeft ? -0.1 : 0.1;
      ctx.arc(eyeX, browY + 10, eyeW * 1.1, Math.PI * 1.25 + browTilt, Math.PI * 1.75 + browTilt);
      ctx.stroke();
      ctx.restore();
    }

    drawPixarEye(cx - eyeSpacing, true);
    drawPixarEye(cx + eyeSpacing, false);

    // 4. Pixar 3D Button Nose
    const noseX = cx;
    const noseY = cy + ry * 0.14;
    const noseR = rx * 0.15;

    // Nose base soft shadow
    ctx.save();
    const noseShadow = ctx.createRadialGradient(noseX, noseY + noseR * 0.8, 0, noseX, noseY + noseR * 0.8, noseR * 1.3);
    noseShadow.addColorStop(0, 'rgba(160, 80, 50, 0.28)');
    noseShadow.addColorStop(1, 'rgba(160, 80, 50, 0)');
    ctx.fillStyle = noseShadow;
    ctx.beginPath();
    ctx.arc(noseX, noseY + noseR * 0.8, noseR * 1.3, 0, Math.PI * 2);
    ctx.fill();

    // Nose tip 3D sphere
    const noseGrad = ctx.createRadialGradient(noseX - noseR * 0.3, noseY - noseR * 0.3, noseR * 0.1, noseX, noseY, noseR);
    noseGrad.addColorStop(0, '#ffffff'); // tip highlight
    noseGrad.addColorStop(0.35, '#fec9aa');
    noseGrad.addColorStop(0.85, '#e59d79');
    noseGrad.addColorStop(1, '#c57c57');
    ctx.fillStyle = noseGrad;
    ctx.beginPath();
    ctx.arc(noseX, noseY, noseR, 0, Math.PI * 2);
    ctx.fill();

    // Nostril soft arcs
    ctx.strokeStyle = 'rgba(140, 60, 35, 0.35)';
    ctx.lineWidth = 2.2;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.arc(noseX - noseR * 1.1, noseY + noseR * 0.2, noseR * 0.6, Math.PI * 0.7, Math.PI * 1.4);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(noseX + noseR * 1.1, noseY + noseR * 0.2, noseR * 0.6, Math.PI * 1.6, Math.PI * 2.3);
    ctx.stroke();
    ctx.restore();

    // 5. Pixar Cute Smile (with dimples and soft rosy lower lip)
    const mouthY = cy + ry * 0.44;
    const mouthW = rx * 0.44;

    ctx.save();
    ctx.strokeStyle = '#6e271a';
    ctx.lineWidth = 3.6;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(cx - mouthW, mouthY - 3);
    ctx.quadraticCurveTo(cx, mouthY + ry * 0.20, cx + mouthW, mouthY - 3);
    ctx.stroke();

    // Cute Dimple creases at corners
    ctx.strokeStyle = 'rgba(120, 45, 30, 0.45)';
    ctx.lineWidth = 2.4;
    ctx.beginPath();
    ctx.arc(cx - mouthW - 1, mouthY - 2, 4.5, Math.PI * 0.3, Math.PI * 0.9);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(cx + mouthW + 1, mouthY - 2, 4.5, Math.PI * 0.1, Math.PI * 0.7);
    ctx.stroke();

    // Soft lower lip highlight
    const lipGrad = ctx.createLinearGradient(cx, mouthY + 2, cx, mouthY + ry * 0.15);
    lipGrad.addColorStop(0, 'rgba(235, 100, 100, 0.48)');
    lipGrad.addColorStop(1, 'rgba(235, 100, 100, 0)');
    ctx.fillStyle = lipGrad;
    ctx.beginPath();
    ctx.ellipse(cx, mouthY + ry * 0.09, mouthW * 0.65, ry * 0.07, 0, 0, Math.PI);
    ctx.fill();

    ctx.restore();
    ctx.restore();

    // Create Image element from canvas
    const img = new Image();
    img.src = canvas.toDataURL('image/jpeg', 0.96);
    return img;
  }

  /* =========================================================
     Instant Face-Fitting Engine
     ========================================================= */
  function autoFitFaceToCurrentHole() {
    if (!activePhotoSource || !faceHole) return;

    const holeRect = faceHole.getBoundingClientRect();
    const holeW = holeRect.width || 120;
    const holeH = holeRect.height || 120;

    if (pixarStyleEnabled && userPixarImage) {
      // The 3D Pixar face is rendered square (dim x dim) centered at (cx, cy)
      // Fitting it exactly into the oval cutout:
      userFaceImg.src = userPixarImage.src;
      userFaceImg.style.width = `${holeW}px`;
      userFaceImg.style.height = `${holeH}px`;
      userFaceImg.style.left = '0px';
      userFaceImg.style.top = '0px';
      userFaceImg.style.transform = 'none';
    } else if (userRawImage && detectedFaceBox) {
      // Raw photo fitting: landmark alignment
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
    }
  }

  async function processUserPhoto(loadedImg) {
    if (aiLoadingOverlay) aiLoadingOverlay.classList.add('active');
    playSound('click');

    userRawImage = loadedImg;

    // 1. Detect face landmarks using multi-tier AI
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

    // 2. Sample user's skin tone
    sampledSkinTone = sampleSkinTone(loadedImg, detectedFaceBox);

    // 3. Generate 3D Pixar Cartoon Face matching Sample Image 3
    try {
      userPixarImage = generatePixarFaceImage(loadedImg, detectedFaceBox, sampledSkinTone);
      await new Promise((res) => {
        if (userPixarImage.complete) res();
        else {
          userPixarImage.onload = res;
          userPixarImage.onerror = res;
        }
      });
    } catch (err) {
      console.warn('Pixar face generation error:', err);
      userPixarImage = loadedImg;
    }

    activePhotoSource = pixarStyleEnabled ? userPixarImage : userRawImage;

    await new Promise(r => setTimeout(r, 450));

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

      if (pixarStyleEnabled && userPixarImage) {
        // Draw 3D Pixar face to fit the cutout ellipse
        pctx.drawImage(userPixarImage, cx - rx, cy - ry, rx * 2, ry * 2);
      } else if (userRawImage && detectedFaceBox) {
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
  if (toolCartoonBtn) {
    toolCartoonBtn.addEventListener('click', () => {
      initAudio();
      playSound('click');
      pixarStyleEnabled = !pixarStyleEnabled;
      activePhotoSource = pixarStyleEnabled ? userPixarImage : userRawImage;
      updateFaceViewState();
      autoFitFaceToCurrentHole();
    });
  }

  if (toolRetakeBtn) {
    toolRetakeBtn.addEventListener('click', () => {
      openSourceModal();
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
