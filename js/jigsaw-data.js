/**
 * Jigsaw Puzzle Data: 4 Seasons for Preschoolers
 * High-resolution artwork: 1536 x 1024
 */
const JIGSAW_SEASONS = [
  {
    id: 'autumn',
    name: 'ฤดูใบไม้ร่วง',
    nameEn: 'Autumn',
    emoji: '🍂',
    badgeColor: '#EA580C',
    bgGradient: 'linear-gradient(135deg, #FFF7ED 0%, #FFEDD5 100%)',
    description: 'จิ๊กซอว์คลาสสิก 4 ชิ้น (มีเขี้ยวล็อก)',
    image: 'assets/images/jigsaw/S__66052234.jpg',
    viewBox: '0 0 1536 1024',
    pieces: [
      {
        id: 0,
        title: 'ชิ้นบน-ซ้าย (เด็กชายใบไม้แดง)',
        path: 'M 14 13 L 769 13 L 769 290 C 740 310, 650 310, 654 370 C 658 430, 740 430, 769 450 L 769 518 L 270 518 C 255 490, 245 424, 200 424 C 155 424, 145 490, 130 518 L 14 518 Z',
        bbox: { minX: 14, minY: 13, width: 755, height: 505 },
        targetCenter: { x: 391, y: 265 }
      },
      {
        id: 1,
        title: 'ชิ้นบน-ขวา (ป้ายข้อความ & ภูเขา)',
        path: 'M 769 13 L 1524 13 L 1524 518 L 1400 518 C 1385 490, 1375 424, 1330 424 C 1285 424, 1275 490, 1260 518 L 769 518 L 769 450 C 740 430, 658 430, 654 370 C 650 310, 740 310, 769 290 Z',
        bbox: { minX: 654, minY: 13, width: 870, height: 505 },
        targetCenter: { x: 1146, y: 265 }
      },
      {
        id: 2,
        title: 'ชิ้นล่าง-ซ้าย (กองใบไม้ & รองเท้า)',
        path: 'M 14 518 L 130 518 C 145 490, 155 424, 200 424 C 245 424, 255 490, 270 518 L 769 518 L 769 650 C 740 670, 650 670, 652 740 C 654 810, 740 810, 769 830 L 769 1010 L 14 1010 Z',
        bbox: { minX: 14, minY: 424, width: 755, height: 586 },
        targetCenter: { x: 391, y: 764 }
      },
      {
        id: 3,
        title: 'ชิ้นล่าง-ขวา (เด็กหญิงใบไม้ทอง)',
        path: 'M 769 518 L 1260 518 C 1275 490, 1285 424, 1330 424 C 1375 424, 1385 490, 1400 518 L 1524 518 L 1524 1010 L 769 1010 L 769 830 C 740 810, 654 810, 652 740 C 650 670, 740 670, 769 650 Z',
        bbox: { minX: 652, minY: 424, width: 872, height: 586 },
        targetCenter: { x: 1146, y: 764 }
      }
    ]
  },
  {
    id: 'summer',
    name: 'ฤดูร้อน',
    nameEn: 'Summer',
    emoji: '☀️',
    badgeColor: '#D97706',
    bgGradient: 'linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)',
    description: 'จิ๊กซอว์ตาราง 6 ชิ้น (ริมหาดแสนสดใส)',
    image: 'assets/images/jigsaw/S__66052232.jpg',
    viewBox: '0 0 1536 1024',
    pieces: [
      {
        id: 0,
        title: 'ชิ้นบน-ซ้าย (ต้นมะพร้าว)',
        path: 'M 20 16 L 518 16 L 518 511 L 20 511 Z',
        bbox: { minX: 20, minY: 16, width: 498, height: 495 },
        targetCenter: { x: 269, y: 263 }
      },
      {
        id: 1,
        title: 'ชิ้นบน-กลาง (พระอาทิตย์ & ป้ายฤดูร้อน)',
        path: 'M 518 16 L 1016 16 L 1016 511 L 518 511 Z',
        bbox: { minX: 518, minY: 16, width: 498, height: 495 },
        targetCenter: { x: 767, y: 263 }
      },
      {
        id: 2,
        title: 'ชิ้นบน-ขวา (ทิวเขา & ร่มหมวก)',
        path: 'M 1016 16 L 1514 16 L 1514 511 L 1016 511 Z',
        bbox: { minX: 1016, minY: 16, width: 498, height: 495 },
        targetCenter: { x: 1265, y: 263 }
      },
      {
        id: 3,
        title: 'ชิ้นล่าง-ซ้าย (เด็กชาย & ลูกบอลชายหาด)',
        path: 'M 20 511 L 518 511 L 518 1006 L 20 1006 Z',
        bbox: { minX: 20, minY: 511, width: 498, height: 495 },
        targetCenter: { x: 269, y: 758 }
      },
      {
        id: 4,
        title: 'ชิ้นล่าง-กลาง (เรือหางยาว & เปลือกหอย)',
        path: 'M 518 511 L 1016 511 L 1016 1006 L 518 1006 Z',
        bbox: { minX: 518, minY: 511, width: 498, height: 495 },
        targetCenter: { x: 767, y: 758 }
      },
      {
        id: 5,
        title: 'ชิ้นล่าง-ขวา (เด็กหญิงชุดดอกไม้)',
        path: 'M 1016 511 L 1514 511 L 1514 1006 L 1016 1006 Z',
        bbox: { minX: 1016, minY: 511, width: 498, height: 495 },
        targetCenter: { x: 1265, y: 758 }
      }
    ]
  },
  {
    id: 'winter',
    name: 'ฤดูหนาว',
    nameEn: 'Winter',
    emoji: '❄️',
    badgeColor: '#2563EB',
    bgGradient: 'linear-gradient(135deg, #DBEAFE 0%, #BFDBFE 100%)',
    description: 'จิ๊กซอว์แถบคลื่น 4 ชิ้น (ดินแดนหิมะ)',
    image: 'assets/images/jigsaw/S__66052236.jpg',
    viewBox: '0 0 1536 1024',
    pieces: [
      {
        id: 0,
        title: 'แถบที่ 1 (ต้นสน & เกล็ดหิมะ)',
        path: 'M 18 16 L 392 16 C 430 200, 440 320, 392 511 C 344 700, 354 850, 392 1006 L 18 1006 Z',
        bbox: { minX: 18, minY: 16, width: 420, height: 990 },
        targetCenter: { x: 205, y: 511 }
      },
      {
        id: 1,
        title: 'แถบที่ 2 (เด็กชายชุดกันหนาวสีน้ำเงิน)',
        path: 'M 392 16 L 768 16 C 810 200, 820 320, 768 511 C 720 700, 730 850, 768 1006 L 392 1006 C 354 850, 344 700, 392 511 C 440 320, 430 200, 392 16 Z',
        bbox: { minX: 344, minY: 16, width: 476, height: 990 },
        targetCenter: { x: 580, y: 511 }
      },
      {
        id: 2,
        title: 'แถบที่ 3 (สโนว์แมน & เด็กหญิงชุดชมพู)',
        path: 'M 768 16 L 1144 16 C 1184 200, 1194 320, 1144 511 C 1100 700, 1110 850, 1144 1006 L 768 1006 C 730 850, 720 700, 768 511 C 820 320, 810 200, 768 16 Z',
        bbox: { minX: 720, minY: 16, width: 474, height: 990 },
        targetCenter: { x: 956, y: 511 }
      },
      {
        id: 3,
        title: 'แถบที่ 4 (กระท่อมไม้กลางหิมะ)',
        path: 'M 1144 16 L 1518 16 L 1518 1006 L 1144 1006 C 1110 850, 1100 700, 1144 511 C 1194 320, 1184 200, 1144 16 Z',
        bbox: { minX: 1100, minY: 16, width: 418, height: 990 },
        targetCenter: { x: 1331, y: 511 }
      }
    ]
  },
  {
    id: 'rainy',
    name: 'ฤดูฝน',
    nameEn: 'Rainy',
    emoji: '🌧️',
    badgeColor: '#0284C7',
    bgGradient: 'linear-gradient(135deg, #E0F2FE 0%, #BAE6FD 100%)',
    description: 'จิ๊กซอว์เรขาคณิต 5 ชิ้น (ตามแนวเส้นประ)',
    image: 'assets/images/jigsaw/S__66052233.jpg',
    viewBox: '0 0 1536 1024',
    pieces: [
      {
        id: 0,
        title: 'ชิ้นบน-ซ้าย (ก้อนเมฆ & ฝนตก)',
        pieceImage: 'assets/images/jigsaw/pieces/rainy_piece_1_cloud_left.png',
        path: 'M 18 13 L 768 13 L 18 340 Z',
        bbox: { minX: 18, minY: 13, width: 750, height: 327 },
        targetCenter: { x: 268, y: 122 }
      },
      {
        id: 1,
        title: 'ชิ้นบน-ขวา (สายรุ้ง & ก้อนเมฆยิ้ม)',
        pieceImage: 'assets/images/jigsaw/pieces/rainy_piece_2_rainbow_right.png',
        path: 'M 768 13 L 1518 13 L 1518 340 Z',
        bbox: { minX: 768, minY: 13, width: 750, height: 327 },
        targetCenter: { x: 1268, y: 122 }
      },
      {
        id: 2,
        title: 'ชิ้นล่าง-ซ้าย (ดอกไม้สีม่วง & หญ้าเขียว)',
        pieceImage: 'assets/images/jigsaw/pieces/rainy_piece_3_flower_left.png',
        path: 'M 18 340 L 280 1010 L 18 1010 Z',
        bbox: { minX: 18, minY: 340, width: 262, height: 670 },
        targetCenter: { x: 105, y: 787 }
      },
      {
        id: 3,
        title: 'ชิ้นล่าง-ขวา (โขดหิน & พุ่มไม้ริมน้ำ)',
        pieceImage: 'assets/images/jigsaw/pieces/rainy_piece_4_rock_right.png',
        path: 'M 1518 340 L 1518 1010 L 1256 1010 Z',
        bbox: { minX: 1256, minY: 340, width: 262, height: 670 },
        targetCenter: { x: 1431, y: 787 }
      },
      {
        id: 4,
        title: 'ชิ้นกลางรูปหกเหลี่ยม (เด็กชายหญิงกางร่ม & ลูกเป็ด)',
        pieceImage: 'assets/images/jigsaw/pieces/rainy_piece_5_center_kids.png',
        path: 'M 768 13 L 1518 340 L 1256 1010 L 280 1010 L 18 340 Z',
        bbox: { minX: 18, minY: 13, width: 1500, height: 997 },
        targetCenter: { x: 768, y: 550 }
      }
    ]
  }
];
