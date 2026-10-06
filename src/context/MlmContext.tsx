import React, { createContext, useContext, useState } from 'react';
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
  MemberRank 
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
  ANNOUNCEMENTS 
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
  login: (memberCode: string, password?: string) => { success: boolean; message: string };
  logout: () => void;
}

const MlmContext = createContext<MlmContextType | undefined>(undefined);

export const MlmProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('th');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [currentMember, setCurrentMember] = useState<MemberProfile>(PRIMARY_MEMBER);
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [binaryNodes, setBinaryNodes] = useState<Record<string, BinaryNode>>(INITIAL_BINARY_NODES);
  const [unilevelMembers, setUnilevelMembers] = useState<UnilevelMember[]>(INITIAL_UNILEVEL_MEMBERS);
  const [products] = useState<Product[]>(PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [commissionCycles] = useState<CommissionCycle[]>(COMMISSION_CYCLES);
  const [transactions, setTransactions] = useState<WalletTransaction[]>(INITIAL_TRANSACTIONS);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [registrationPreFill, setRegistrationPreFill] = useState<{ uplineCode?: string; position?: 'L' | 'R' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const login = (memberCode: string, password = ''): { success: boolean; message: string } => {
    const cleanCode = memberCode.trim().toUpperCase();
    if (!cleanCode) {
      return { 
        success: false, 
        message: language === 'th' ? 'กรุณากรอกรหัสสมาชิก' : 'Please enter member code' 
      };
    }

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
        logout
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
