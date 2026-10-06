import { 
  MemberProfile, 
  BinaryNode, 
  UnilevelMember, 
  Product, 
  Order, 
  CommissionCycle, 
  WalletTransaction, 
  Announcement 
} from '../types/mlm';

export const PRIMARY_MEMBER: MemberProfile = {
  id: 'usr_001',
  memberCode: 'TH889214',
  fullName: 'กิตติศักดิ์ เจริญสุขสวัสดิ์',
  nickname: 'คุณท็อป (Top)',
  idCardNumber: '1-1020-00894-32-1',
  phone: '089-765-4321',
  email: 'kittisak.omc@gmail.com',
  address: '99/42 หมู่ 5 ถนนรัชดาภิเษก แขวงจตุจักร เขตจตุจักร',
  province: 'กรุงเทพมหานคร',
  postcode: '10900',
  rank: 'Diamond',
  rankBadgeColor: 'from-blue-600 to-indigo-600',
  sponsorCode: 'TH880001',
  sponsorName: 'วรพจน์ ธนบูลย์ (VP Leader)',
  uplineCode: 'TH880001',
  uplineName: 'วรพจน์ ธนบูลย์ (VP Leader)',
  position: 'L',
  personalPv: 3250,
  accumulatedPv: 48600,
  leftLegPv: 285400,
  rightLegPv: 192800,
  leftLegMembers: 148,
  rightLegMembers: 96,
  walletBalance: 84650.00,
  totalEarnings: 428750.00,
  autoshipStatus: 'active',
  autoshipExpireDate: '2026-10-31',
  joinDate: '2024-03-15',
  avatarUrl: '/src/assets/images/mlm_avatar_member_1791310697478.jpg',
  bankAccount: {
    bankName: 'ธนาคารกสิกรไทย (Kasikornbank)',
    bankCode: 'KBANK',
    accountNumber: '045-8-91234-5',
    accountName: 'นาย กิตติศักดิ์ เจริญสุขสวัสดิ์',
    branch: 'สาขา รัชโยธิน',
    isVerified: true
  },
  kycStatus: 'verified',
  transactionPin: '123456'
};

export const ALTERNATIVE_MEMBERS: MemberProfile[] = [
  PRIMARY_MEMBER,
  {
    id: 'usr_002',
    memberCode: 'TH889502',
    fullName: 'ณัชชา ภัทรไพศาล',
    nickname: 'คุณมายด์',
    idCardNumber: '3-1002-00431-11-2',
    phone: '081-234-5678',
    email: 'natcha.pat@omc.th',
    address: '12/88 หมู่บ้านศุภาลัย ถ.แจ้งวัฒนะ ต.คลองเกลือ อ.ปากเกร็ด',
    province: 'นนทบุรี',
    postcode: '11120',
    rank: 'Gold',
    rankBadgeColor: 'from-amber-500 to-yellow-600',
    sponsorCode: 'TH889214',
    sponsorName: 'กิตติศักดิ์ เจริญสุขสวัสดิ์',
    uplineCode: 'TH889214',
    uplineName: 'กิตติศักดิ์ เจริญสุขสวัสดิ์',
    position: 'L',
    personalPv: 1500,
    accumulatedPv: 14200,
    leftLegPv: 84000,
    rightLegPv: 62500,
    leftLegMembers: 42,
    rightLegMembers: 31,
    walletBalance: 19400.00,
    totalEarnings: 82400.00,
    autoshipStatus: 'active',
    autoshipExpireDate: '2026-10-25',
    joinDate: '2024-08-10',
    avatarUrl: '/src/assets/images/mlm_avatar_member_1791310697478.jpg',
    bankAccount: {
      bankName: 'ธนาคารไทยพาณิชย์ (SCB)',
      bankCode: 'SCB',
      accountNumber: '112-2-90123-4',
      accountName: 'น.ส. ณัชชา ภัทรไพศาล',
      branch: 'สาขา แจ้งวัฒนะ',
      isVerified: true
    },
    kycStatus: 'verified',
    transactionPin: '123456'
  },
  {
    id: 'usr_003',
    memberCode: 'TH890118',
    fullName: 'ธนากร สุวรรณสิทธิ์',
    nickname: 'คุณโจ',
    idCardNumber: '1-5099-00124-77-9',
    phone: '095-888-1234',
    email: 'thanakorn.s@gmail.com',
    address: '55/9 ถ.ช้างคลาน อ.เมือง',
    province: 'เชียงใหม่',
    postcode: '50100',
    rank: 'Bronze',
    rankBadgeColor: 'from-amber-700 to-amber-900',
    sponsorCode: 'TH889214',
    sponsorName: 'กิตติศักดิ์ เจริญสุขสวัสดิ์',
    uplineCode: 'TH889502',
    uplineName: 'ณัชชา ภัทรไพศาล',
    position: 'R',
    personalPv: 500,
    accumulatedPv: 1800,
    leftLegPv: 9200,
    rightLegPv: 4500,
    leftLegMembers: 6,
    rightLegMembers: 3,
    walletBalance: 3200.00,
    totalEarnings: 9500.00,
    autoshipStatus: 'warning',
    autoshipExpireDate: '2026-10-12',
    joinDate: '2025-01-15',
    avatarUrl: '/src/assets/images/mlm_avatar_member_1791310697478.jpg',
    bankAccount: {
      bankName: 'ธนาคารกรุงเทพ (BBL)',
      bankCode: 'BBL',
      accountNumber: '240-0-78129-0',
      accountName: 'นาย ธนากร สุวรรณสิทธิ์',
      branch: 'สาขา ช้างคลาน',
      isVerified: true
    },
    kycStatus: 'verified',
    transactionPin: '123456'
  }
];

export const INITIAL_BINARY_NODES: Record<string, BinaryNode> = {
  'TH889214': {
    id: 'TH889214',
    memberCode: 'TH889214',
    name: 'กิตติศักดิ์ เจริญสุขสวัสดิ์',
    rank: 'Diamond',
    position: 'ROOT',
    personalPv: 3250,
    accumulatedPv: 48600,
    leftPv: 285400,
    rightPv: 192800,
    leftMembers: 148,
    rightMembers: 96,
    leftChildId: 'TH889502',
    rightChildId: 'TH889611',
    sponsorCode: 'TH880001',
    sponsorName: 'วรพจน์ ธนบูลย์',
    joinDate: '2024-03-15',
    isActive: true,
    avatarUrl: '/src/assets/images/mlm_avatar_member_1791310697478.jpg'
  },
  // Left subtree level 1
  'TH889502': {
    id: 'TH889502',
    memberCode: 'TH889502',
    name: 'ณัชชา ภัทรไพศาล',
    rank: 'Gold',
    position: 'L',
    personalPv: 1500,
    accumulatedPv: 14200,
    leftPv: 84000,
    rightPv: 62500,
    leftMembers: 42,
    rightMembers: 31,
    leftChildId: 'TH890012',
    rightChildId: 'TH890118',
    sponsorCode: 'TH889214',
    sponsorName: 'กิตติศักดิ์ เจริญสุขฯ',
    joinDate: '2024-08-10',
    isActive: true
  },
  // Right subtree level 1
  'TH889611': {
    id: 'TH889611',
    memberCode: 'TH889611',
    name: 'พงศ์พิสิฐ อัศวเดชา',
    rank: 'Platinum',
    position: 'R',
    personalPv: 2500,
    accumulatedPv: 29800,
    leftPv: 112000,
    rightPv: 78500,
    leftMembers: 58,
    rightMembers: 37,
    leftChildId: 'TH890250',
    rightChildId: 'TH890333',
    sponsorCode: 'TH889214',
    sponsorName: 'กิตติศักดิ์ เจริญสุขฯ',
    joinDate: '2024-09-02',
    isActive: true
  },
  // Left subtree level 2
  'TH890012': {
    id: 'TH890012',
    memberCode: 'TH890012',
    name: 'สุจิตรา มณีรัตน์',
    rank: 'Silver',
    position: 'L',
    personalPv: 1000,
    accumulatedPv: 6400,
    leftPv: 34500,
    rightPv: 28000,
    leftMembers: 18,
    rightMembers: 14,
    leftChildId: 'TH890881',
    rightChildId: 'TH890882',
    sponsorCode: 'TH889502',
    sponsorName: 'ณัชชา ภัทรไพศาล',
    joinDate: '2024-11-19',
    isActive: true
  },
  'TH890118': {
    id: 'TH890118',
    memberCode: 'TH890118',
    name: 'ธนากร สุวรรณสิทธิ์',
    rank: 'Bronze',
    position: 'R',
    personalPv: 500,
    accumulatedPv: 1800,
    leftPv: 9200,
    rightPv: 4500,
    leftMembers: 6,
    rightMembers: 3,
    leftChildId: undefined,
    rightChildId: undefined,
    sponsorCode: 'TH889214',
    sponsorName: 'กิตติศักดิ์ เจริญสุขฯ',
    joinDate: '2025-01-15',
    isActive: true
  },
  // Right subtree level 2
  'TH890250': {
    id: 'TH890250',
    memberCode: 'TH890250',
    name: 'ปรีดา สันติวงศ์',
    rank: 'Gold',
    position: 'L',
    personalPv: 1250,
    accumulatedPv: 16500,
    leftPv: 54000,
    rightPv: 42100,
    leftMembers: 29,
    rightMembers: 22,
    leftChildId: 'TH890910',
    rightChildId: undefined,
    sponsorCode: 'TH889611',
    sponsorName: 'พงศ์พิสิฐ อัศวเดชา',
    joinDate: '2024-10-05',
    isActive: true
  },
  'TH890333': {
    id: 'TH890333',
    memberCode: 'TH890333',
    name: 'กมลชนก วิทยาเวช',
    rank: 'Silver',
    position: 'R',
    personalPv: 1000,
    accumulatedPv: 7200,
    leftPv: 21000,
    rightPv: 18400,
    leftMembers: 11,
    rightMembers: 9,
    leftChildId: undefined,
    rightChildId: undefined,
    sponsorCode: 'TH889611',
    sponsorName: 'พงศ์พิสิฐ อัศวเดชา',
    joinDate: '2024-12-01',
    isActive: true
  },
  // Level 3 sample nodes
  'TH890881': {
    id: 'TH890881',
    memberCode: 'TH890881',
    name: 'อนุชา ฤทธิ์เดช',
    rank: 'Bronze',
    position: 'L',
    personalPv: 600,
    accumulatedPv: 2400,
    leftPv: 4800,
    rightPv: 3200,
    leftMembers: 3,
    rightMembers: 2,
    sponsorCode: 'TH890012',
    sponsorName: 'สุจิตรา มณีรัตน์',
    joinDate: '2025-02-10',
    isActive: true
  },
  'TH890882': {
    id: 'TH890882',
    memberCode: 'TH890882',
    name: 'นภาพร วงศ์ษา',
    rank: 'Member',
    position: 'R',
    personalPv: 250,
    accumulatedPv: 900,
    leftPv: 1200,
    rightPv: 800,
    leftMembers: 1,
    rightMembers: 1,
    sponsorCode: 'TH890012',
    sponsorName: 'สุจิตรา มณีรัตน์',
    joinDate: '2025-03-01',
    isActive: true
  },
  'TH890910': {
    id: 'TH890910',
    memberCode: 'TH890910',
    name: 'ชัชวาลย์ รัตนเมธา',
    rank: 'Silver',
    position: 'L',
    personalPv: 1000,
    accumulatedPv: 5100,
    leftPv: 14000,
    rightPv: 9500,
    leftMembers: 8,
    rightMembers: 5,
    sponsorCode: 'TH890250',
    sponsorName: 'ปรีดา สันติวงศ์',
    joinDate: '2025-01-28',
    isActive: true
  }
};

export const INITIAL_UNILEVEL_MEMBERS: UnilevelMember[] = [
  // G1 (Direct Sponsors)
  {
    id: 'uni_01',
    memberCode: 'TH889502',
    name: 'ณัชชา ภัทรไพศาล',
    generation: 1,
    rank: 'Gold',
    directSponsorCode: 'TH889214',
    directSponsorName: 'กิตติศักดิ์ เจริญสุขฯ',
    personalPv: 1500,
    teamPv: 146500,
    joinDate: '2024-08-10',
    isActive: true
  },
  {
    id: 'uni_02',
    memberCode: 'TH889611',
    name: 'พงศ์พิสิฐ อัศวเดชา',
    generation: 1,
    rank: 'Platinum',
    directSponsorCode: 'TH889214',
    directSponsorName: 'กิตติศักดิ์ เจริญสุขฯ',
    personalPv: 2500,
    teamPv: 190500,
    joinDate: '2024-09-02',
    isActive: true
  },
  {
    id: 'uni_03',
    memberCode: 'TH890118',
    name: 'ธนากร สุวรรณสิทธิ์',
    generation: 1,
    rank: 'Bronze',
    directSponsorCode: 'TH889214',
    directSponsorName: 'กิตติศักดิ์ เจริญสุขฯ',
    personalPv: 500,
    teamPv: 13700,
    joinDate: '2025-01-15',
    isActive: true
  },
  {
    id: 'uni_04',
    memberCode: 'TH890455',
    name: 'ศิริพร บุญเจริญ',
    generation: 1,
    rank: 'Silver',
    directSponsorCode: 'TH889214',
    directSponsorName: 'กิตติศักดิ์ เจริญสุขฯ',
    personalPv: 1200,
    teamPv: 42000,
    joinDate: '2024-11-05',
    isActive: true
  },
  // G2 (Gen 2)
  {
    id: 'uni_05',
    memberCode: 'TH890012',
    name: 'สุจิตรา มณีรัตน์',
    generation: 2,
    rank: 'Silver',
    directSponsorCode: 'TH889502',
    directSponsorName: 'ณัชชา ภัทรไพศาล',
    personalPv: 1000,
    teamPv: 62500,
    joinDate: '2024-11-19',
    isActive: true
  },
  {
    id: 'uni_06',
    memberCode: 'TH890250',
    name: 'ปรีดา สันติวงศ์',
    generation: 2,
    rank: 'Gold',
    directSponsorCode: 'TH889611',
    directSponsorName: 'พงศ์พิสิฐ อัศวเดชา',
    personalPv: 1250,
    teamPv: 96100,
    joinDate: '2024-10-05',
    isActive: true
  },
  {
    id: 'uni_07',
    memberCode: 'TH890333',
    name: 'กมลชนก วิทยาเวช',
    generation: 2,
    rank: 'Silver',
    directSponsorCode: 'TH889611',
    directSponsorName: 'พงศ์พิสิฐ อัศวเดชา',
    personalPv: 1000,
    teamPv: 39400,
    joinDate: '2024-12-01',
    isActive: true
  },
  // G3 (Gen 3)
  {
    id: 'uni_08',
    memberCode: 'TH890881',
    name: 'อนุชา ฤทธิ์เดช',
    generation: 3,
    rank: 'Bronze',
    directSponsorCode: 'TH890012',
    directSponsorName: 'สุจิตรา มณีรัตน์',
    personalPv: 600,
    teamPv: 8000,
    joinDate: '2025-02-10',
    isActive: true
  },
  {
    id: 'uni_09',
    memberCode: 'TH890882',
    name: 'นภาพร วงศ์ษา',
    generation: 3,
    rank: 'Member',
    directSponsorCode: 'TH890012',
    directSponsorName: 'สุจิตรา มณีรัตน์',
    personalPv: 250,
    teamPv: 2000,
    joinDate: '2025-03-01',
    isActive: true
  },
  {
    id: 'uni_10',
    memberCode: 'TH890910',
    name: 'ชัชวาลย์ รัตนเมธา',
    generation: 3,
    rank: 'Silver',
    directSponsorCode: 'TH890250',
    directSponsorName: 'ปรีดา สันติวงศ์',
    personalPv: 1000,
    teamPv: 23500,
    joinDate: '2025-01-28',
    isActive: true
  }
];

export const PRODUCTS: Product[] = [
  {
    id: 'prod_001',
    code: 'OMC-NUTRI-01',
    name: 'OMC Bio-Active Multivitamin & Cordyceps Extract',
    nameTh: 'โอเอ็มซี ไบโอ-แอคทีฟ มัลติวิตามิน พลัส ถั่งเช่าสกัด',
    category: 'health',
    memberPrice: 1250,
    retailPrice: 1850,
    pv: 250,
    stock: 450,
    imageUrl: '/src/assets/images/mlm_product_supplement_1791310634193.jpg',
    description: 'High-purity organic Cordyceps extract combined with 22 essential vitamins to strengthen immunity and cellular vitality.',
    descriptionTh: 'สารสกัดถั่งเช่าแท้ผสานวิตามินรวม 22 ชนิด เสริมสร้างภูมิคุ้มกัน บำรุงร่างกาย ชะลอวัย ระดับพรีเมียม บรรจุ 60 แคปซูล'
  },
  {
    id: 'prod_002',
    code: 'OMC-COLL-02',
    name: 'OMC Pure Marine Collagen Dipeptide 100,000mg',
    nameTh: 'โอเอ็มซี เพียว มารีน คอลลาเจน ไดเปปไทด์ 100,000 มก.',
    category: 'beauty',
    memberPrice: 1450,
    retailPrice: 2150,
    pv: 300,
    stock: 280,
    imageUrl: '/src/assets/images/mlm_product_collagen_1791310650397.jpg',
    description: 'Ultra-low molecular weight marine fish collagen dipeptide for rapid skin dermal absorption, joint health, and radiant glow.',
    descriptionTh: 'คอลลาเจนไดเปปไทด์จากปลาทะเลน้ำลึก โมเลกุลเล็กที่สุด ดูดซึมไว ผิวใส เรียบเนียน ลดเลือนริ้วรอย บำรุงข้อเข่า 1 กล่อง 15 ซอง'
  },
  {
    id: 'prod_003',
    code: 'OMC-COFF-03',
    name: 'OMC Royal Cordyceps & Reishi Arabica Coffee (30-in-1)',
    nameTh: 'โอเอ็มซี กาแฟอาราบิก้าเห็ดหลินจือและถั่งเช่า 30-in-1',
    category: 'beverage',
    memberPrice: 490,
    retailPrice: 750,
    pv: 100,
    stock: 920,
    imageUrl: '/src/assets/images/mlm_product_coffee_1791310665459.jpg',
    description: 'Premium Arabica roast blended with Reishi mushroom, ginseng, and cordyceps. Zero trans fat, zero refined sugar.',
    descriptionTh: 'กาแฟอาราบิก้าแท้เกรดพิเศษ ผสานสารสกัดเห็ดหลินจือ ถั่งเช่า โสมเกาหลี ไม่มีน้ำตาลทราย ไม่มีไขมันทรานส์ รสกลมกล่อม 1 กล่อง 20 ซอง'
  },
  {
    id: 'prod_004',
    code: 'OMC-SERUM-04',
    name: 'OMC Luminescence Golden Stem-Cell Restorative Serum',
    nameTh: 'โอเอ็มซี เซรั่มสเต็มเซลล์ทองคำฟื้นฟูผิวเข้มข้น',
    category: 'beauty',
    memberPrice: 1890,
    retailPrice: 2800,
    pv: 400,
    stock: 180,
    imageUrl: '/src/assets/images/mlm_product_serum_1791310681702.jpg',
    description: 'Nanogold peptide and botanical stem-cell complex designed to restore facial firmness, brighten complexion, and diminish fine lines.',
    descriptionTh: 'เซรั่มฟื้นฟูผิวสูตรอนุภาคทองคำบริสุทธิ์และสเต็มเซลล์พืช บำรุงผิวหน้ากระจ่างใส กระชับรูขุมขน ลดฝ้า กระ จุดด่างดำ ขนาด 30 ml'
  },
  {
    id: 'prod_pkg_01',
    code: 'PKG-BRONZE',
    name: 'Business Starter Pack - Bronze (500 PV)',
    nameTh: 'ชุดสมัครเปิดรหัสธุรกิจ Bronze Package (500 PV)',
    category: 'package',
    memberPrice: 2500,
    retailPrice: 3500,
    pv: 500,
    stock: 100,
    imageUrl: '/src/assets/images/mlm_product_supplement_1791310634193.jpg',
    description: 'Starter franchise package: includes 2x Bio-Active Multivitamins + member welcome kit + back-office license.',
    descriptionTh: 'ชุดเปิดรหัสตำแหน่ง Bronze: ประกอบด้วย Bio-Active Multivitamin 2 ขวด พร้อมคู่มือธุรกิจ และระบบ Backoffice ใช้งานได้ทันที',
    packageRank: 'Bronze'
  },
  {
    id: 'prod_pkg_02',
    code: 'PKG-SILVER',
    name: 'Business Growth Pack - Silver (1,000 PV)',
    nameTh: 'ชุดสมัครเปิดรหัสธุรกิจ Silver Package (1,000 PV)',
    category: 'package',
    memberPrice: 4900,
    retailPrice: 7000,
    pv: 1000,
    stock: 100,
    imageUrl: '/src/assets/images/mlm_product_collagen_1791310650397.jpg',
    description: 'Silver franchise package: includes 2x Collagen + 2x Multivitamin + member rights.',
    descriptionTh: 'ชุดเปิดรหัสตำแหน่ง Silver: ประกอบด้วย คอลลาเจน 2 กล่อง + มัลติวิตามิน 2 ขวด รับสิทธิประโยชน์โบนัสจับคู่สูงสุด 15,000 บาท/วัน',
    packageRank: 'Silver'
  },
  {
    id: 'prod_pkg_03',
    code: 'PKG-GOLD',
    name: 'Executive Leader Pack - Gold (2,500 PV)',
    nameTh: 'ชุดสมัครเปิดรหัสธุรกิจ Gold Package (2,500 PV)',
    category: 'package',
    memberPrice: 11900,
    retailPrice: 17500,
    pv: 2500,
    stock: 100,
    imageUrl: '/src/assets/images/mlm_product_serum_1791310681702.jpg',
    description: 'Gold package: comprehensive product assortment with max daily binary pairing cap 40,000 THB.',
    descriptionTh: 'ชุดเปิดรหัสตำแหน่ง Gold: สินค้าครบเซ็ตระดับพรีเมียม รับสิทธิประโยชน์โบนัสจับคู่สูงสุด 40,000 บาท/วัน + แมชชิ่ง 3 ชั้น',
    packageRank: 'Gold'
  },
  {
    id: 'prod_pkg_04',
    code: 'PKG-DIAMOND',
    name: 'Supreme VIP Pack - Diamond (5,000 PV)',
    nameTh: 'ชุดสมัครเปิดรหัสธุรกิจ Diamond Package (5,000 PV)',
    category: 'package',
    memberPrice: 23500,
    retailPrice: 35000,
    pv: 5000,
    stock: 100,
    imageUrl: '/src/assets/images/mlm_product_coffee_1791310665459.jpg',
    description: 'Ultimate Diamond business license with max pairing limits and All-Sale company profit sharing bonus pool.',
    descriptionTh: 'ชุดเปิดรหัสตำแหน่ง Diamond: สูงสุดแห่งสิทธิประโยชน์ รับโบนัสจับคู่สูงสุด 80,000 บาท/วัน + แมชชิ่ง 5 ชั้น + ส่วนแบ่งกองทุน All-Sale ทั่วโลก',
    packageRank: 'Diamond'
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord_1001',
    orderNumber: 'INV202610-0089',
    date: '2026-10-04 14:22',
    orderType: 'autoship',
    items: [
      {
        productId: 'prod_001',
        productName: 'OMC Bio-Active Multivitamin & Cordyceps Extract',
        quantity: 1,
        memberPrice: 1250,
        pv: 250,
        imageUrl: '/src/assets/images/mlm_product_supplement_1791310634193.jpg'
      }
    ],
    totalAmount: 1250,
    totalPv: 250,
    paymentMethod: 'wallet',
    status: 'shipping',
    trackingNumber: 'TH01928472910B',
    shippingCompany: 'Flash Express',
    shippingAddress: {
      fullName: 'กิตติศักดิ์ เจริญสุขสวัสดิ์',
      phone: '089-765-4321',
      address: '99/42 หมู่ 5 ถนนรัชดาภิเษก แขวงจตุจักร เขตจตุจักร',
      province: 'กรุงเทพมหานคร',
      postcode: '10900'
    }
  },
  {
    id: 'ord_1002',
    orderNumber: 'INV202609-0245',
    date: '2026-09-28 10:15',
    orderType: 'general',
    items: [
      {
        productId: 'prod_002',
        productName: 'OMC Pure Marine Collagen Dipeptide 100,000mg',
        quantity: 2,
        memberPrice: 1450,
        pv: 300,
        imageUrl: '/src/assets/images/mlm_product_collagen_1791310650397.jpg'
      },
      {
        productId: 'prod_003',
        productName: 'OMC Royal Cordyceps Arabica Coffee (30-in-1)',
        quantity: 3,
        memberPrice: 490,
        pv: 100,
        imageUrl: '/src/assets/images/mlm_product_coffee_1791310665459.jpg'
      }
    ],
    totalAmount: 4370,
    totalPv: 900,
    paymentMethod: 'wallet',
    status: 'completed',
    trackingNumber: 'KEX291048821TH',
    shippingCompany: 'KEX Express',
    shippingAddress: {
      fullName: 'กิตติศักดิ์ เจริญสุขสวัสดิ์',
      phone: '089-765-4321',
      address: '99/42 หมู่ 5 ถนนรัชดาภิเษก แขวงจตุจักร เขตจตุจักร',
      province: 'กรุงเทพมหานคร',
      postcode: '10900'
    }
  },
  {
    id: 'ord_1003',
    orderNumber: 'INV202609-0112',
    date: '2026-09-14 16:40',
    orderType: 'autoship',
    items: [
      {
        productId: 'prod_004',
        productName: 'OMC Luminescence Golden Stem-Cell Serum',
        quantity: 1,
        memberPrice: 1890,
        pv: 400,
        imageUrl: '/src/assets/images/mlm_product_serum_1791310681702.jpg'
      }
    ],
    totalAmount: 1890,
    totalPv: 400,
    paymentMethod: 'promptpay',
    status: 'completed',
    trackingNumber: 'TH01884719200A',
    shippingCompany: 'Flash Express',
    shippingAddress: {
      fullName: 'กิตติศักดิ์ เจริญสุขสวัสดิ์',
      phone: '089-765-4321',
      address: '99/42 หมู่ 5 ถนนรัชดาภิเษก แขวงจตุจักร เขตจตุจักร',
      province: 'กรุงเทพมหานคร',
      postcode: '10900'
    }
  }
];

export const COMMISSION_CYCLES: CommissionCycle[] = [
  {
    id: 'cyc_2026_10_01',
    cycleNumber: '2026/10-W1',
    periodName: 'รอบประจำสัปดาห์ 1 - 7 ต.ค. 2026 (Week 1)',
    startDate: '2026-10-01',
    endDate: '2026-10-07',
    breakdown: {
      fastStart: 12500,
      binaryPairing: 28400,
      matching: 9600,
      autoshipPool: 3500,
      allSaleBonus: 5000
    },
    totalGross: 59000,
    withholdingTax: 1770, // 3%
    transferFee: 30,
    netPayout: 57200,
    status: 'pending',
    payoutDate: '2026-10-10'
  },
  {
    id: 'cyc_2026_09_04',
    cycleNumber: '2026/09-W4',
    periodName: 'รอบประจำสัปดาห์ 22 - 30 ก.ย. 2026 (Week 4)',
    startDate: '2026-09-22',
    endDate: '2026-09-30',
    breakdown: {
      fastStart: 18000,
      binaryPairing: 34200,
      matching: 11400,
      autoshipPool: 4200,
      allSaleBonus: 6500
    },
    totalGross: 74300,
    withholdingTax: 2229,
    transferFee: 30,
    netPayout: 72041,
    status: 'paid',
    payoutDate: '2026-10-03'
  },
  {
    id: 'cyc_2026_09_03',
    cycleNumber: '2026/09-W3',
    periodName: 'รอบประจำสัปดาห์ 15 - 21 ก.ย. 2026 (Week 3)',
    startDate: '2026-09-15',
    endDate: '2026-09-21',
    breakdown: {
      fastStart: 9500,
      binaryPairing: 26800,
      matching: 8100,
      autoshipPool: 3100,
      allSaleBonus: 5000
    },
    totalGross: 52500,
    withholdingTax: 1575,
    transferFee: 30,
    netPayout: 50895,
    status: 'paid',
    payoutDate: '2026-09-24'
  },
  {
    id: 'cyc_2026_09_02',
    cycleNumber: '2026/09-W2',
    periodName: 'รอบประจำสัปดาห์ 8 - 14 ก.ย. 2026 (Week 2)',
    startDate: '2026-09-08',
    endDate: '2026-09-14',
    breakdown: {
      fastStart: 14000,
      binaryPairing: 31000,
      matching: 10200,
      autoshipPool: 3800,
      allSaleBonus: 5500
    },
    totalGross: 64500,
    withholdingTax: 1935,
    transferFee: 30,
    netPayout: 62535,
    status: 'paid',
    payoutDate: '2026-09-17'
  }
];

export const INITIAL_TRANSACTIONS: WalletTransaction[] = [
  {
    id: 'tx_901',
    timestamp: '2026-10-04 14:22:10',
    type: 'order_payment',
    amount: -1250,
    balanceAfter: 84650.00,
    description: 'ชำระค่าสินค้า บิลรักษายอด Autoship #INV202610-0089',
    refCode: 'ORD-INV202610-0089'
  },
  {
    id: 'tx_902',
    timestamp: '2026-10-03 09:30:00',
    type: 'commission',
    amount: 72041,
    balanceAfter: 85900.00,
    description: 'โอนผลตอบแทนคอมมิชชั่นรอบ 2026/09-W4 เข้า E-Wallet',
    refCode: 'COM-2026/09-W4'
  },
  {
    id: 'tx_903',
    timestamp: '2026-10-01 16:15:40',
    type: 'transfer_out',
    amount: -5000,
    balanceAfter: 13859.00,
    description: 'โอนเงินให้สมาชิก TH889502 (ณัชชา ภัทรไพศาล)',
    refCode: 'TRF-TH889502',
    targetMemberCode: 'TH889502',
    targetMemberName: 'ณัชชา ภัทรไพศาล'
  },
  {
    id: 'tx_904',
    timestamp: '2026-09-28 10:15:12',
    type: 'order_payment',
    amount: -4370,
    balanceAfter: 18859.00,
    description: 'ชำระค่าสินค้าคำสั่งซื้อทั่วไป #INV202609-0245',
    refCode: 'ORD-INV202609-0245'
  },
  {
    id: 'tx_905',
    timestamp: '2026-09-25 11:00:22',
    type: 'deposit',
    amount: 15000,
    balanceAfter: 23229.00,
    description: 'เติมเงินเข้ากระเป๋า E-Wallet ผ่านระบบ QR PromptPay',
    refCode: 'DEP-PP-994182'
  },
  {
    id: 'tx_906',
    timestamp: '2026-09-24 09:30:00',
    type: 'commission',
    amount: 50895,
    balanceAfter: 8229.00,
    description: 'โอนผลตอบแทนคอมมิชชั่นรอบ 2026/09-W3 เข้า E-Wallet',
    refCode: 'COM-2026/09-W3'
  }
];

export const ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'ann_01',
    title: 'OMC Diamond Summit 2026 - Hokkaido Winter Trip Qualifiers',
    titleTh: 'ทริปท่องเที่ยวสุดเอ็กซ์คลูซีฟ ญี่ปุ่น ฮอกไกโด 5 วัน 4 คืน สำหรับผู้นำ OMC',
    date: '2026-10-02',
    category: 'promotion',
    summary: 'Achieve 150,000 Weak-Leg PV and maintain 2 direct Diamond leaders by Nov 30 to qualify for the luxury Japan tour.',
    summaryTh: 'สะสมคะแนนขาอ่อนครบ 150,000 PV พร้อมสร้าง 2 ไดมอนด์สายตรง ภายใน 30 พ.ย. 2026 บินลัดฟ้าสัมผัสหิมะฮอกไกโดฟรีตลอดการเดินทาง',
    isImportant: true
  },
  {
    id: 'ann_02',
    title: 'New Fast-Start 150% Bonus Enhancement Announced',
    titleTh: 'ประกาศปรับเพิ่มค่าแนะนำ Fast-Start โบนัสพิเศษ 150% ในเดือนตุลาคม',
    date: '2026-09-29',
    category: 'news',
    summary: 'Special campaign for Q4: Fast start bonus increased from 100% to 150% for all Diamond package direct sponsors.',
    summaryTh: 'เพื่อสนับสนุนการขยายงานของสมาชิกในไตรมาสที่ 4 บริษัทปรับเพิ่มค่าแนะนำสายตรงสำหรับแพ็กเกจ Diamond รับเพิ่มเป็น 150% ของ PV ทันที',
    isImportant: false
  },
  {
    id: 'ann_03',
    title: 'System Maintenance & Daily Calculation Notice',
    titleTh: 'แจ้งกำหนดการตัดรอบคำนวณคะแนนประจำวัน และปิดปรับปรุงระบบชั่วคราว',
    date: '2026-09-20',
    category: 'event',
    summary: 'Daily cycle cut-off is 23:59:59 GMT+7. System calculates pairing bonus between 00:00 - 01:00 AM daily.',
    summaryTh: 'ระบบจะตัดรอบคำนวณคะแนนจับคู่และโบนัสประจำวันเวลา 23:59:59 น. ของทุกวัน และอัปเดตยอดเข้ากระเป๋า E-Wallet เวลา 01:00 น.',
    isImportant: false
  }
];
