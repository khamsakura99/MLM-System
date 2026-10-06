import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  MemberProfile, 
  BinaryNode, 
  UnilevelMember, 
  Product, 
  CartItem, 
  Order, 
  CommissionCycle, 
  WalletTransaction, 
  Language, 
  MemberRank,
  UserRole,
  AdminTab,
  WithdrawalRequest,
  CompensationSettings,
  SystemBranding,
  CompanyBankSettings,
  BankAccount
} from '../types/mlm';
import { 
  PRIMARY_MEMBER, 
  ALTERNATIVE_MEMBERS, 
  INITIAL_BINARY_NODES, 
  INITIAL_UNILEVEL_MEMBERS, 
  PRODUCTS, 
  INITIAL_ORDERS, 
  COMMISSION_CYCLES, 
  INITIAL_TRANSACTIONS, 
  ANNOUNCEMENTS,
  INITIAL_WITHDRAWAL_REQUESTS,
  DEFAULT_COMPENSATION_SETTINGS,
  DEFAULT_BRANDING,
  DEFAULT_BANK_SETTINGS
} from '../data/mockMlmData';

export type ActiveTab = 
  | 'dashboard'
  | 'genealogy_binary'
  | 'genealogy_unilevel'
  | 'genealogy_list'
  | 'shop_catalog'
  | 'shop_orders'
  | 'commissions_statements'
  | 'commissions_wallet'
  | 'commissions_ledger'
  | 'registration'
  | 'profile_kyc';

interface Toast {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

interface MlmContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  currentMember: MemberProfile;
  switchMember: (memberId: string) => void;
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  binaryNodes: Record<string, BinaryNode>;
  unilevelMembers: UnilevelMember[];
  products: Product[];
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  updateCartQuantity: (productId: string, delta: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  orders: Order[];
  placeOrder: (orderType: 'topup' | 'autoship' | 'general', paymentMethod: 'wallet' | 'promptpay') => boolean;
  commissionCycles: CommissionCycle[];
  transactions: WalletTransaction[];
  transferWallet: (targetMemberCode: string, amount: number, memo?: string, pin?: string) => { success: boolean; message: string };
  withdrawWallet: (amount: number, pin: string) => { success: boolean; message: string };
  registerNewMember: (data: {
    fullName: string;
    idCardNumber: string;
    phone: string;
    email: string;
    address: string;
    province: string;
    postcode: string;
    sponsorCode: string;
    uplineCode: string;
    position: 'L' | 'R';
    rank: MemberRank;
    packagePv: number;
    packageAmount: number;
    paymentMethod: 'wallet' | 'promptpay';
  }) => { success: boolean; newMemberCode: string; message: string };
  toasts: Toast[];
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  announcements: typeof ANNOUNCEMENTS;
  registrationPreFill: { uplineCode?: string; position?: 'L' | 'R' } | null;
  setRegistrationPreFill: (data: { uplineCode?: string; position?: 'L' | 'R' } | null) => void;
  isAuthenticated: boolean;
  login: (memberCode: string, password?: string, asAdmin?: boolean) => { success: boolean; message: string };
  logout: () => void;
  userRole: UserRole;
  switchRole: (role: UserRole) => void;
  adminTab: AdminTab;
  setAdminTab: (tab: AdminTab) => void;
  withdrawalRequests: WithdrawalRequest[];
  approveWithdrawal: (id: string) => void;
  rejectWithdrawal: (id: string, reason: string) => void;
  compensationSettings: CompensationSettings;
  updateCompensationSettings: (newSettings: Partial<CompensationSettings>) => void;
  updateMemberRank: (memberCode: string, newRank: MemberRank) => void;
  adjustMemberWallet: (memberCode: string, deltaAmount: number, reason: string) => void;
  adjustMemberPv: (memberCode: string, pv: number) => void;
  toggleMemberStatus: (memberCode: string) => void;
  updateOrderStatus: (orderId: string, newStatus: 'paid' | 'shipping' | 'completed', trackingNo?: string) => void;
  calculateNewCommissionCycle: () => void;
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProductStock: (productId: string, newStock: number) => void;
  systemBranding: SystemBranding;
  updateSystemBranding: (newBranding: Partial<SystemBranding>) => void;
  resetSystemBranding: () => void;
  companyBankSettings: CompanyBankSettings;
  updateCompanyBankSettings: (newSettings: Partial<CompanyBankSettings>) => void;
  resetCompanyBankSettings: () => void;
  updateMemberBankAccount: (bank: BankAccount) => void;
  addMemberBankAccount: (bank: Omit<BankAccount, 'id' | 'isVerified'>) => void;
  setPrimaryBankAccount: (accountNumber: string) => void;
}

const MlmContext = createContext<MlmContextType | undefined>(undefined);

export const MlmProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('th');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [userRole, setUserRole] = useState<UserRole>('member');
  const [adminTab, setAdminTab] = useState<AdminTab>('admin_dashboard');
  const [currentMember, setCurrentMember] = useState<MemberProfile>(PRIMARY_MEMBER);
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [binaryNodes, setBinaryNodes] = useState<Record<string, BinaryNode>>(INITIAL_BINARY_NODES);
  const [unilevelMembers, setUnilevelMembers] = useState<UnilevelMember[]>(INITIAL_UNILEVEL_MEMBERS);
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [commissionCycles, setCommissionCycles] = useState<CommissionCycle[]>(COMMISSION_CYCLES);
  const [transactions, setTransactions] = useState<WalletTransaction[]>(INITIAL_TRANSACTIONS);
  const [withdrawalRequests, setWithdrawalRequests] = useState<WithdrawalRequest[]>(INITIAL_WITHDRAWAL_REQUESTS);
  const [compensationSettings, setCompensationSettings] = useState<CompensationSettings>(DEFAULT_COMPENSATION_SETTINGS);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [registrationPreFill, setRegistrationPreFill] = useState<{ uplineCode?: string; position?: 'L' | 'R' } | null>(null);

  // System Branding (Name, Logo, Domain) with local persistence
  const [systemBranding, setSystemBranding] = useState<SystemBranding>(() => {
    try {
      const saved = localStorage.getItem('omc_system_branding');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return DEFAULT_BRANDING;
  });

  const updateSystemBranding = (newBranding: Partial<SystemBranding>) => {
    setSystemBranding(prev => {
      const updated = { ...prev, ...newBranding };
      try {
        localStorage.setItem('omc_system_branding', JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
    showToast(
      language === 'th' ? 'บันทึกข้อมูลชื่อและโลโก้เว็บไซต์เรียบร้อยแล้ว' : 'Website name and logo updated successfully',
      'success'
    );
  };

  const resetSystemBranding = () => {
    setSystemBranding(DEFAULT_BRANDING);
    try {
      localStorage.removeItem('omc_system_branding');
    } catch {
      // ignore
    }
    showToast(
      language === 'th' ? 'รีเซ็ตชื่อและโลโก้กลับสู่ค่าเริ่มต้นแล้ว' : 'Reset branding to defaults',
      'info'
    );
  };

  // Company Bank & QR Code Top-up Settings
  const [companyBankSettings, setCompanyBankSettings] = useState<CompanyBankSettings>(() => {
    try {
      const saved = localStorage.getItem('omc_bank_settings');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return DEFAULT_BANK_SETTINGS;
  });

  const updateCompanyBankSettings = (newSettings: Partial<CompanyBankSettings>) => {
    setCompanyBankSettings(prev => {
      const updated = { ...prev, ...newSettings };
      try {
        localStorage.setItem('omc_bank_settings', JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
    showToast(
      language === 'th' ? 'บันทึกข้อมูลบัญชีธนาคารและ QR เติมเงินเรียบร้อยแล้ว' : 'Bank & QR top-up settings saved successfully',
      'success'
    );
  };

  const resetCompanyBankSettings = () => {
    setCompanyBankSettings(DEFAULT_BANK_SETTINGS);
    try {
      localStorage.removeItem('omc_bank_settings');
    } catch {
      // ignore
    }
    showToast(
      language === 'th' ? 'รีเซ็ตข้อมูลธนาคารและ QR กลับสู่ค่าเริ่มต้นแล้ว' : 'Reset bank & QR settings to defaults',
      'info'
    );
  };

  // Member Customer Bank Account Management
  const updateMemberBankAccount = (newBankAccount: BankAccount) => {
    setCurrentMember(prev => {
      const existingAccounts = prev.bankAccounts || [prev.bankAccount];
      const updatedList = existingAccounts.map(b => 
        b.accountNumber === newBankAccount.accountNumber ? newBankAccount : b
      );
      return {
        ...prev,
        bankAccount: newBankAccount,
        bankAccounts: updatedList
      };
    });
    showToast(
      language === 'th' ? 'อัปเดตข้อมูลบัญชีธนาคารของคุณเรียบร้อยแล้ว' : 'Your bank account has been updated successfully',
      'success'
    );
  };

  const addMemberBankAccount = (newBank: Omit<BankAccount, 'id' | 'isVerified'>) => {
    const bankObj: BankAccount = {
      ...newBank,
      id: `bnk_${Date.now()}`,
      isVerified: true,
      isPrimary: true
    };
    setCurrentMember(prev => {
      const existing = prev.bankAccounts || [prev.bankAccount];
      const updatedList = [bankObj, ...existing.map(b => ({ ...b, isPrimary: false }))];
      return {
        ...prev,
        bankAccount: bankObj,
        bankAccounts: updatedList
      };
    });
    showToast(
      language === 'th' ? `เพิ่มบัญชีธนาคาร ${newBank.bankName} สำเร็จ!` : `Added bank account ${newBank.bankName} successfully!`,
      'success'
    );
  };

  const setPrimaryBankAccount = (accountNumber: string) => {
    setCurrentMember(prev => {
      const existing = prev.bankAccounts || [prev.bankAccount];
      const target = existing.find(b => b.accountNumber === accountNumber);
      if (!target) return prev;
      const updatedList = existing.map(b => ({
        ...b,
        isPrimary: b.accountNumber === accountNumber
      }));
      return {
        ...prev,
        bankAccount: { ...target, isPrimary: true },
        bankAccounts: updatedList
      };
    });
    showToast(
      language === 'th' ? 'ตั้งเป็นบัญชีหลักสำหรับรับโอนเงินเรียบร้อยแล้ว' : 'Set as primary payout bank account',
      'info'
    );
  };

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.title = `${systemBranding.companyName} | ${language === 'th' ? systemBranding.portalTitleTh : systemBranding.portalTitle}`;
    }
  }, [systemBranding, language]);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const login = (memberCode: string, password = '', asAdmin = false): { success: boolean; message: string } => {
    const cleanCode = memberCode.trim().toUpperCase();
    if (!cleanCode) {
      return { 
        success: false, 
        message: language === 'th' ? 'กรุณากรอกรหัสสมาชิก' : 'Please enter member code' 
      };
    }

    if (asAdmin || cleanCode === 'ADMIN' || cleanCode === 'SUPERADMIN') {
      setUserRole('admin');
      setIsAuthenticated(true);
      setAdminTab('admin_dashboard');
      showToast(
        language === 'th'
          ? 'เข้าสู่ระบบผู้ดูแลระบบ (Admin Control Panel) สำเร็จ'
          : 'Welcome to Administrator Control Panel',
        'success'
      );
      return { success: true, message: 'Admin login successful' };
    }

    setUserRole('member');

    // Find in alternative members list
    const foundAlt = ALTERNATIVE_MEMBERS.find(m => m.memberCode.toUpperCase() === cleanCode);
    if (foundAlt) {
      setCurrentMember(foundAlt);
      setIsAuthenticated(true);
      setActiveTab('dashboard');
      showToast(
        language === 'th'
          ? `ยินดีต้อนรับเข้าสู่ระบบ คุณ${foundAlt.fullName}`
          : `Welcome, ${foundAlt.fullName}`,
        'success'
      );
      return { success: true, message: 'Login successful' };
    }

    // Check if member exists in binary nodes (e.g. newly registered downline)
    const foundNode = Object.values(binaryNodes).find(n => n.memberCode.toUpperCase() === cleanCode);
    if (foundNode) {
      const generatedProfile: MemberProfile = {
        id: `usr_${foundNode.memberCode}`,
        memberCode: foundNode.memberCode,
        fullName: foundNode.name,
        idCardNumber: '1-1020-00999-11-2',
        phone: '089-999-8888',
        email: `${foundNode.memberCode.toLowerCase()}@omc.th`,
        address: '99/1 ถ.พหลโยธิน แขวงลาดยาว เขตจตุจักร',
        province: 'กรุงเทพมหานคร',
        postcode: '10900',
        rank: foundNode.rank,
        rankBadgeColor: 'from-blue-600 to-indigo-600',
        sponsorCode: foundNode.sponsorCode,
        sponsorName: foundNode.sponsorName,
        uplineCode: foundNode.sponsorCode,
        uplineName: foundNode.sponsorName,
        position: foundNode.position === 'ROOT' ? 'L' : foundNode.position,
        personalPv: foundNode.personalPv,
        accumulatedPv: foundNode.accumulatedPv,
        leftLegPv: foundNode.leftPv,
        rightLegPv: foundNode.rightPv,
        leftLegMembers: foundNode.leftMembers,
        rightLegMembers: foundNode.rightMembers,
        walletBalance: 5000,
        totalEarnings: 15000,
        autoshipStatus: 'active',
        autoshipExpireDate: '2026-11-30',
        joinDate: foundNode.joinDate,
        avatarUrl: '/src/assets/images/mlm_avatar_member_1791310697478.jpg',
        bankAccount: {
          bankName: 'ธนาคารกสิกรไทย (KBANK)',
          bankCode: 'KBANK',
          accountNumber: '110-2-33456-7',
          accountName: foundNode.name,
          branch: 'สาขา สยามสแควร์',
          isVerified: true
        },
        kycStatus: 'verified',
        transactionPin: '123456'
      };
      setCurrentMember(generatedProfile);
      setIsAuthenticated(true);
      setActiveTab('dashboard');
      showToast(
        language === 'th'
          ? `ยินดีต้อนรับเข้าสู่ระบบ คุณ${foundNode.name}`
          : `Welcome, ${foundNode.name}`,
        'success'
      );
      return { success: true, message: 'Login successful' };
    }

    return {
      success: false,
      message: language === 'th' ? 'ไม่พบรหัสสมาชิกนี้ในระบบ' : 'Invalid member code'
    };
  };

  const switchRole = (role: UserRole) => {
    setUserRole(role);
    showToast(
      language === 'th'
        ? (role === 'admin' ? 'สลับเข้าสู่โหมดผู้ดูแลระบบ (Admin Console)' : 'สลับเข้าสู่ระบบสมาชิกนักธุรกิจ (Member Portal)')
        : (role === 'admin' ? 'Switched to Administrator Console' : 'Switched to Member Portal'),
      'info'
    );
  };

  const approveWithdrawal = (id: string) => {
    setWithdrawalRequests(prev => prev.map(w => w.id === id ? { ...w, status: 'approved', processedDate: new Date().toISOString().replace('T', ' ').substring(0, 16) } : w));
    showToast(language === 'th' ? 'อนุมัติการถอนเงินเรียบร้อยแล้ว' : 'Withdrawal approved', 'success');
  };

  const rejectWithdrawal = (id: string, reason: string) => {
    setWithdrawalRequests(prev => prev.map(w => w.id === id ? { ...w, status: 'rejected', rejectionReason: reason } : w));
    showToast(language === 'th' ? 'ปฏิเสธคำขอถอนเงินแล้ว' : 'Withdrawal rejected', 'info');
  };

  const updateCompensationSettings = (newSettings: Partial<CompensationSettings>) => {
    setCompensationSettings(prev => ({ ...prev, ...newSettings }));
    showToast(language === 'th' ? 'บันทึกการตั้งค่าแผนการจ่ายผลตอบแทนสำเร็จ' : 'Settings updated', 'success');
  };

  const updateMemberRank = (memberCode: string, newRank: MemberRank) => {
    setBinaryNodes(prev => {
      const node = prev[memberCode];
      return node ? { ...prev, [memberCode]: { ...node, rank: newRank } } : prev;
    });
    if (currentMember.memberCode === memberCode) {
      setCurrentMember(prev => ({ ...prev, rank: newRank }));
    }
    showToast(language === 'th' ? `ปรับตำแหน่งสมาชิก ${memberCode} เป็น ${newRank} แล้ว` : `Rank updated for ${memberCode}`, 'success');
  };

  const adjustMemberWallet = (memberCode: string, deltaAmount: number, reason: string) => {
    if (currentMember.memberCode === memberCode) {
      setCurrentMember(prev => ({ ...prev, walletBalance: prev.walletBalance + deltaAmount }));
    }
    const newTx: WalletTransaction = {
      id: `tx_${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      type: deltaAmount >= 0 ? 'deposit' : 'withdraw',
      amount: deltaAmount,
      balanceAfter: (currentMember.memberCode === memberCode ? currentMember.walletBalance + deltaAmount : 50000),
      description: `[Admin Adjustment] ${reason}`,
      refCode: `ADM-${Date.now().toString().slice(-6)}`
    };
    setTransactions(prev => [newTx, ...prev]);
    showToast(language === 'th' ? `ปรับยอดเงิน ${deltaAmount >= 0 ? '+' : ''}${deltaAmount.toLocaleString()} บ. สำเร็จ` : `Wallet adjusted`, 'success');
  };

  const adjustMemberPv = (memberCode: string, pv: number) => {
    setBinaryNodes(prev => {
      const node = prev[memberCode];
      return node ? { ...prev, [memberCode]: { ...node, personalPv: node.personalPv + pv } } : prev;
    });
    if (currentMember.memberCode === memberCode) {
      setCurrentMember(prev => ({ ...prev, personalPv: prev.personalPv + pv, accumulatedPv: prev.accumulatedPv + pv }));
    }
    showToast(language === 'th' ? `ปรับคะแนน PV +${pv.toLocaleString()} ให้กับ ${memberCode} แล้ว` : `PV adjusted`, 'success');
  };

  const toggleMemberStatus = (memberCode: string) => {
    setBinaryNodes(prev => {
      const node = prev[memberCode];
      return node ? { ...prev, [memberCode]: { ...node, isActive: !node.isActive } } : prev;
    });
    showToast(language === 'th' ? `เปลี่ยนสถานะสมาชิก ${memberCode} แล้ว` : `Status updated`, 'info');
  };

  const updateOrderStatus = (orderId: string, newStatus: 'paid' | 'shipping' | 'completed', trackingNo?: string) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus, ...(trackingNo ? { trackingNumber: trackingNo } : {}) } : o));
    showToast(language === 'th' ? `อัปเดตสถานะคำสั่งซื้อ #${orderId} เป็น ${newStatus} แล้ว` : `Order status updated`, 'success');
  };

  const calculateNewCommissionCycle = () => {
    const cycleNum = `2026/10-W${commissionCycles.length + 1}`;
    const newCycle: CommissionCycle = {
      id: `cyc_${Date.now()}`,
      cycleNumber: cycleNum,
      periodName: `รอบคำนวณอัตโนมัติประจำสัปดาห์ (${cycleNum})`,
      startDate: '2026-10-08',
      endDate: '2026-10-14',
      breakdown: {
        fastStart: 24000,
        binaryPairing: 48500,
        matching: 14200,
        autoshipPool: 5800,
        allSaleBonus: 8000
      },
      totalGross: 100500,
      withholdingTax: 3015,
      transferFee: 30,
      netPayout: 97455,
      status: 'pending',
      payoutDate: '2026-10-17'
    };
    setCommissionCycles(prev => [newCycle, ...prev]);
    showToast(language === 'th' ? `ประมวลผลคำนวณยอดโบนัสรอบใหม่สำเร็จ: ${cycleNum}` : `Commission cycle computed: ${cycleNum}`, 'success');
  };

  const addProduct = (product: Omit<Product, 'id'>) => {
    const newProd: Product = { ...product, id: `prod_${Date.now()}` };
    setProducts(prev => [newProd, ...prev]);
    showToast(language === 'th' ? `เพิ่มสินค้า "${product.nameTh}" เรียบร้อยแล้ว` : `Product added`, 'success');
  };

  const updateProductStock = (productId: string, newStock: number) => {
    setProducts(prev => prev.map(p => p.id === productId ? { ...p, stock: newStock } : p));
    showToast(language === 'th' ? `อัปเดตสต็อกสินค้าสำเร็จ` : `Stock updated`, 'success');
  };

  const logout = () => {
    setIsAuthenticated(false);
    showToast(
      language === 'th' ? 'ออกจากระบบเรียบร้อยแล้ว' : 'Logged out successfully',
      'info'
    );
  };

  const switchMember = (memberId: string) => {
    const found = ALTERNATIVE_MEMBERS.find(m => m.id === memberId);
    if (found) {
      setCurrentMember(found);
      showToast(
        language === 'th' 
          ? `สลับไปยังบัญชี ${found.fullName} (${found.rank})` 
          : `Switched to account: ${found.fullName} (${found.rank})`,
        'info'
      );
    }
  };

  const addToCart = (product: Product, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    showToast(
      language === 'th' 
        ? `เพิ่ม "${language === 'th' ? product.nameTh : product.name}" ลงในตะกร้าแล้ว` 
        : `Added "${product.name}" to cart`,
      'success'
    );
  };

  const updateCartQuantity = (productId: string, delta: number) => {
    setCart(prev => {
      return prev
        .map(item => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null);
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const placeOrder = (
    orderType: 'topup' | 'autoship' | 'general',
    paymentMethod: 'wallet' | 'promptpay'
  ): boolean => {
    if (cart.length === 0) return false;

    const totalAmount = cart.reduce((sum, item) => sum + item.product.memberPrice * item.quantity, 0);
    const totalPv = cart.reduce((sum, item) => sum + item.product.pv * item.quantity, 0);

    if (paymentMethod === 'wallet' && currentMember.walletBalance < totalAmount) {
      showToast(
        language === 'th' ? 'ยอดเงินใน E-Wallet ไม่เพียงพอ กรุณาเติมเงิน' : 'Insufficient E-Wallet balance',
        'error'
      );
      return false;
    }

    const orderNumber = `INV${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}-${Math.floor(1000 + Math.random() * 9000)}`;

    const newOrder: Order = {
      id: `ord_${Date.now()}`,
      orderNumber,
      date: new Date().toISOString().replace('T', ' ').substring(0, 16),
      orderType,
      items: cart.map(item => ({
        productId: item.product.id,
        productName: language === 'th' ? item.product.nameTh : item.product.name,
        quantity: item.quantity,
        memberPrice: item.product.memberPrice,
        pv: item.product.pv,
        imageUrl: item.product.imageUrl
      })),
      totalAmount,
      totalPv,
      paymentMethod,
      status: 'shipping',
      trackingNumber: `TH01${Math.floor(1000000000 + Math.random() * 9000000000)}B`,
      shippingCompany: 'Flash Express',
      shippingAddress: {
        fullName: currentMember.fullName,
        phone: currentMember.phone,
        address: currentMember.address,
        province: currentMember.province,
        postcode: currentMember.postcode
      }
    };

    setOrders(prev => [newOrder, ...prev]);

    // Deduct wallet if paid via wallet
    if (paymentMethod === 'wallet') {
      const newBal = currentMember.walletBalance - totalAmount;
      setCurrentMember(prev => ({
        ...prev,
        walletBalance: newBal,
        personalPv: prev.personalPv + totalPv,
        accumulatedPv: prev.accumulatedPv + totalPv,
        autoshipStatus: orderType === 'autoship' ? 'active' : prev.autoshipStatus,
        autoshipExpireDate: orderType === 'autoship' ? '2026-11-30' : prev.autoshipExpireDate
      }));

      const newTx: WalletTransaction = {
        id: `tx_${Date.now()}`,
        timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
        type: 'order_payment',
        amount: -totalAmount,
        balanceAfter: newBal,
        description: `ชำระค่าสินค้า #${orderNumber} (${orderType === 'autoship' ? 'บิลรักษายอด' : 'สั่งซื้อ'})`,
        refCode: `ORD-${orderNumber}`
      };
      setTransactions(prev => [newTx, ...prev]);
    } else {
      // PromptPay
      setCurrentMember(prev => ({
        ...prev,
        personalPv: prev.personalPv + totalPv,
        accumulatedPv: prev.accumulatedPv + totalPv,
        autoshipStatus: orderType === 'autoship' ? 'active' : prev.autoshipStatus,
        autoshipExpireDate: orderType === 'autoship' ? '2026-11-30' : prev.autoshipExpireDate
      }));
    }

    clearCart();
    showToast(
      language === 'th'
        ? `สั่งซื้อสำเร็จ #${orderNumber} รับคะแนน +${totalPv.toLocaleString()} PV`
        : `Order placed #${orderNumber} (+${totalPv.toLocaleString()} PV)`,
      'success'
    );
    return true;
  };

  const transferWallet = (
    targetMemberCode: string,
    amount: number,
    memo?: string,
    pin?: string
  ) => {
    if (amount <= 0) {
      return { success: false, message: language === 'th' ? 'กรุณาระบุจำนวนเงินที่ถูกต้อง' : 'Invalid amount' };
    }
    if (amount > currentMember.walletBalance) {
      return { success: false, message: language === 'th' ? 'ยอดเงินใน E-Wallet ไม่เพียงพอ' : 'Insufficient balance' };
    }
    if (pin && pin !== currentMember.transactionPin) {
      return { success: false, message: language === 'th' ? 'รหัส PIN ธุรกรรมไม่ถูกต้อง' : 'Incorrect PIN' };
    }

    const targetNode = Object.values(binaryNodes).find(n => n.memberCode.toUpperCase() === targetMemberCode.trim().toUpperCase());
    const recipientName = targetNode ? targetNode.name : `สมาชิก ${targetMemberCode}`;

    const newBal = currentMember.walletBalance - amount;
    setCurrentMember(prev => ({ ...prev, walletBalance: newBal }));

    const tx: WalletTransaction = {
      id: `tx_${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      type: 'transfer_out',
      amount: -amount,
      balanceAfter: newBal,
      description: `โอนเงินให้สมาชิก ${targetMemberCode} (${recipientName}) ${memo ? `[${memo}]` : ''}`,
      refCode: `TRF-${targetMemberCode}-${Date.now().toString().slice(-4)}`,
      targetMemberCode,
      targetMemberName: recipientName
    };

    setTransactions(prev => [tx, ...prev]);
    showToast(
      language === 'th'
        ? `โอนเงิน ${amount.toLocaleString()} บาท ไปยัง ${recipientName} สำเร็จ`
        : `Transferred ${amount.toLocaleString()} THB to ${recipientName} successfully`,
      'success'
    );

    return { success: true, message: 'Transfer completed' };
  };

  const withdrawWallet = (amount: number, pin: string) => {
    const fee = 30;
    const totalRequired = amount + fee;
    if (amount < 300) {
      return { success: false, message: language === 'th' ? 'ถอนเงินขั้นต่ำ 300 บาท' : 'Minimum withdrawal is 300 THB' };
    }
    if (totalRequired > currentMember.walletBalance) {
      return { success: false, message: language === 'th' ? 'ยอดเงินไม่พอรวมค่าธรรมเนียม 30 บาท' : 'Insufficient balance including fee' };
    }
    if (pin !== currentMember.transactionPin) {
      return { success: false, message: language === 'th' ? 'รหัส PIN ธุรกรรมไม่ถูกต้อง' : 'Incorrect PIN' };
    }

    const newBal = currentMember.walletBalance - totalRequired;
    setCurrentMember(prev => ({ ...prev, walletBalance: newBal }));

    const tx: WalletTransaction = {
      id: `tx_${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      type: 'withdraw',
      amount: -totalRequired,
      balanceAfter: newBal,
      description: `ถอนเงินเข้าบัญชีธนาคาร ${currentMember.bankAccount.bankName} เลขที่ ${currentMember.bankAccount.accountNumber} (รวมค่าธรรมเนียม ${fee} บ.)`,
      refCode: `WDR-${Date.now().toString().slice(-6)}`
    };

    setTransactions(prev => [tx, ...prev]);
    showToast(
      language === 'th'
        ? `ส่งคำขอถอนเงิน ${amount.toLocaleString()} บาท สำเร็จ (ยอดโอนสุทธิ ${amount.toLocaleString()} บ.)`
        : `Withdrawal request for ${amount.toLocaleString()} THB submitted`,
      'success'
    );

    return { success: true, message: 'Withdrawal processed' };
  };

  const registerNewMember = (data: {
    fullName: string;
    idCardNumber: string;
    phone: string;
    email: string;
    address: string;
    province: string;
    postcode: string;
    sponsorCode: string;
    uplineCode: string;
    position: 'L' | 'R';
    rank: MemberRank;
    packagePv: number;
    packageAmount: number;
    paymentMethod: 'wallet' | 'promptpay';
  }) => {
    if (data.paymentMethod === 'wallet' && currentMember.walletBalance < data.packageAmount) {
      return {
        success: false,
        newMemberCode: '',
        message: language === 'th' ? 'ยอดเงินใน E-Wallet ไม่เพียงพอสำหรับชำระค่าชุดเปิดรหัส' : 'Insufficient wallet balance for starter pack'
      };
    }

    const newCode = `TH89${Math.floor(1000 + Math.random() * 9000)}`;

    const newNode: BinaryNode = {
      id: newCode,
      memberCode: newCode,
      name: data.fullName,
      rank: data.rank,
      position: data.position,
      personalPv: data.packagePv,
      accumulatedPv: data.packagePv,
      leftPv: 0,
      rightPv: 0,
      leftMembers: 0,
      rightMembers: 0,
      sponsorCode: data.sponsorCode,
      sponsorName: data.sponsorCode === currentMember.memberCode ? currentMember.fullName : 'สมาชิกผู้แนะนำ',
      joinDate: new Date().toISOString().split('T')[0],
      isActive: true
    };

    // Update upline node
    setBinaryNodes(prev => {
      const upline = prev[data.uplineCode];
      const updatedUpline = upline ? {
        ...upline,
        leftChildId: data.position === 'L' ? newCode : upline.leftChildId,
        rightChildId: data.position === 'R' ? newCode : upline.rightChildId,
        leftPv: data.position === 'L' ? upline.leftPv + data.packagePv : upline.leftPv,
        rightPv: data.position === 'R' ? upline.rightPv + data.packagePv : upline.rightPv,
        leftMembers: data.position === 'L' ? upline.leftMembers + 1 : upline.leftMembers,
        rightMembers: data.position === 'R' ? upline.rightMembers + 1 : upline.rightMembers
      } : undefined;

      return {
        ...prev,
        [newCode]: newNode,
        ...(updatedUpline ? { [data.uplineCode]: updatedUpline } : {})
      };
    });

    // Add to unilevel
    const newUniMember: UnilevelMember = {
      id: `uni_${Date.now()}`,
      memberCode: newCode,
      name: data.fullName,
      generation: 1,
      rank: data.rank,
      directSponsorCode: data.sponsorCode,
      directSponsorName: currentMember.fullName,
      personalPv: data.packagePv,
      teamPv: data.packagePv,
      joinDate: new Date().toISOString().split('T')[0],
      isActive: true
    };
    setUnilevelMembers(prev => [newUniMember, ...prev]);

    // If paid via wallet, deduct
    if (data.paymentMethod === 'wallet') {
      const newBal = currentMember.walletBalance - data.packageAmount;
      setCurrentMember(prev => ({
        ...prev,
        walletBalance: newBal,
        leftLegPv: data.position === 'L' ? prev.leftLegPv + data.packagePv : prev.leftLegPv,
        rightLegPv: data.position === 'R' ? prev.rightLegPv + data.packagePv : prev.rightLegPv,
        leftLegMembers: data.position === 'L' ? prev.leftLegMembers + 1 : prev.leftLegMembers,
        rightLegMembers: data.position === 'R' ? prev.rightLegMembers + 1 : prev.rightLegMembers
      }));

      const tx: WalletTransaction = {
        id: `tx_${Date.now()}`,
        timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
        type: 'order_payment',
        amount: -data.packageAmount,
        balanceAfter: newBal,
        description: `ชำระค่าชุดเปิดรหัส ${data.rank} ให้แก่สมาชิกใหม่ ${newCode} (${data.fullName})`,
        refCode: `REG-${newCode}`
      };
      setTransactions(prev => [tx, ...prev]);
    } else {
      setCurrentMember(prev => ({
        ...prev,
        leftLegPv: data.position === 'L' ? prev.leftLegPv + data.packagePv : prev.leftLegPv,
        rightLegPv: data.position === 'R' ? prev.rightLegPv + data.packagePv : prev.rightLegPv,
        leftLegMembers: data.position === 'L' ? prev.leftLegMembers + 1 : prev.leftLegMembers,
        rightLegMembers: data.position === 'R' ? prev.rightLegMembers + 1 : prev.rightLegMembers
      }));
    }

    showToast(
      language === 'th'
        ? `ลงทะเบียนสมาชิกใหม่สำเร็จ! รหัส ${newCode} (${data.fullName})`
        : `Enrolled new member successfully! ID ${newCode} (${data.fullName})`,
      'success'
    );

    return {
      success: true,
      newMemberCode: newCode,
      message: 'Registration successful'
    };
  };

  return (
    <MlmContext.Provider
      value={{
        language,
        setLanguage,
        currentMember,
        switchMember,
        activeTab,
        setActiveTab,
        binaryNodes,
        unilevelMembers,
        products,
        cart,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        orders,
        placeOrder,
        commissionCycles,
        transactions,
        transferWallet,
        withdrawWallet,
        registerNewMember,
        toasts,
        showToast,
        announcements: ANNOUNCEMENTS,
        registrationPreFill,
        setRegistrationPreFill,
        isAuthenticated,
        login,
        logout,
        userRole,
        switchRole,
        adminTab,
        setAdminTab,
        withdrawalRequests,
        approveWithdrawal,
        rejectWithdrawal,
        compensationSettings,
        updateCompensationSettings,
        updateMemberRank,
        adjustMemberWallet,
        adjustMemberPv,
        toggleMemberStatus,
        updateOrderStatus,
        calculateNewCommissionCycle,
        addProduct,
        updateProductStock,
        systemBranding,
        updateSystemBranding,
        resetSystemBranding,
        companyBankSettings,
        updateCompanyBankSettings,
        resetCompanyBankSettings,
        updateMemberBankAccount,
        addMemberBankAccount,
        setPrimaryBankAccount
      }}
    >
      {children}
    </MlmContext.Provider>
  );
};

export const useMlm = () => {
  const context = useContext(MlmContext);
  if (!context) {
    throw new Error('useMlm must be used within a MlmProvider');
  }
  return context;
};
