import React, { useState } from 'react';
import { 
  Wallet, 
  Send, 
  ArrowDownCircle, 
  ArrowUpCircle, 
  ShieldCheck, 
  Check, 
  AlertCircle,
  Building2,
  Lock,
  QrCode,
  RefreshCw
} from 'lucide-react';
import { useMlm } from '../../context/MlmContext';

export const WalletManagementView: React.FC = () => {
  const { 
    language, 
    currentMember, 
    binaryNodes, 
    transferWallet, 
    withdrawWallet, 
    transactions,
    showToast 
  } = useMlm();

  // Tab: 'transfer' | 'withdraw' | 'deposit'
  const [subTab, setSubTab] = useState<'transfer' | 'withdraw' | 'deposit'>('transfer');

  // Transfer Form State
  const [targetCode, setTargetCode] = useState('');
  const [verifiedName, setVerifiedName] = useState<string | null>(null);
  const [transferAmount, setTransferAmount] = useState('');
  const [memo, setMemo] = useState('');
  const [transferPin, setTransferPin] = useState('123456');

  // Withdraw Form State
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [withdrawPin, setWithdrawPin] = useState('123456');

  // Deposit Form State
  const [depositAmount, setDepositAmount] = useState('5000');
  const [showDepositQr, setShowDepositQr] = useState(false);

  const handleVerifyTarget = () => {
    if (!targetCode.trim()) return;
    const code = targetCode.trim().toUpperCase();
    const node = Object.values(binaryNodes).find(n => n.memberCode.toUpperCase() === code);
    if (node) {
      setVerifiedName(node.name);
      showToast(language === 'th' ? `พบสมาชิก: ${node.name}` : `Found: ${node.name}`, 'info');
    } else {
      setVerifiedName(null);
      showToast(language === 'th' ? 'ไม่พบรหัสสมาชิกนี้ในระบบ' : 'Member not found', 'error');
    }
  };

  const handleExecuteTransfer = (e: React.FormEvent) => {
    e.preventDefault();
    const amt = parseFloat(transferAmount);
    if (isNaN(amt) || amt <= 0) {
      showToast(language === 'th' ? 'กรุณาระบุจำนวนเงินที่ต้องการโอน' : 'Invalid amount', 'error');
      return;
    }

    const res = transferWallet(targetCode, amt, memo, transferPin);
    if (res.success) {
      setTargetCode('');
      setVerifiedName(null);
      setTransferAmount('');
      setMemo('');
    } else {
      showToast(res.message, 'error');
    }
  };

  const handleExecuteWithdraw = (e: React.FormEvent) => {
    e.preventDefault();
    const amt = parseFloat(withdrawAmount);
    if (isNaN(amt) || amt <= 0) {
      showToast(language === 'th' ? 'กรุณาระบุจำนวนเงิน' : 'Invalid amount', 'error');
      return;
    }

    const res = withdrawWallet(amt, withdrawPin);
    if (res.success) {
      setWithdrawAmount('');
    } else {
      showToast(res.message, 'error');
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Wallet Balance Hero Card */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 rounded-xl p-6 text-white border border-slate-700 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold uppercase tracking-wider">
            <Wallet className="w-4 h-4" />
            <span>{language === 'th' ? 'กระเป๋าเงินอิเล็กทรอนิกส์ E-Wallet' : 'Electronic Wallet Balance'}</span>
          </div>
          <div className="text-3xl font-bold font-mono text-white tabular-nums">
            ฿{currentMember.walletBalance.toLocaleString('th-TH', { minimumFractionDigits: 2 })}
          </div>
          <p className="text-xs text-slate-400">
            {language === 'th' ? 'ใช้สำหรับสั่งซื้อสินค้า, โอนให้สมาชิกในสายงาน หรือถอนเข้าบัญชีธนาคาร' : 'Use for store orders, member-to-member transfers, or bank withdrawals'}
          </p>
        </div>

        {/* Bank Account Snapshot */}
        <div className="bg-white/10 backdrop-blur-xs p-4 rounded-xl border border-white/10 text-xs space-y-1 min-w-[240px]">
          <div className="flex items-center justify-between text-slate-400">
            <span>{language === 'th' ? 'บัญชีธนาคารผูกรับเงิน' : 'Linked Bank Account'}</span>
            <span className="text-emerald-400 font-semibold">{language === 'th' ? 'ยืนยันแล้ว' : 'Verified'}</span>
          </div>
          <p className="font-bold text-white text-sm">{currentMember.bankAccount.bankName}</p>
          <p className="font-mono text-slate-300">{currentMember.bankAccount.accountNumber}</p>
          <p className="text-[11px] text-slate-400">{currentMember.bankAccount.accountName}</p>
        </div>
      </div>

      {/* Operation Tabs Container */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        
        {/* Sub-tabs header */}
        <div className="flex border-b border-slate-200 bg-slate-50 text-xs font-semibold">
          <button
            onClick={() => setSubTab('transfer')}
            className={`flex-1 py-3 px-4 text-center border-b-2 transition-colors flex items-center justify-center gap-2 ${
              subTab === 'transfer' 
                ? 'border-blue-600 text-blue-700 bg-white' 
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Send className="w-4 h-4" />
            <span>{language === 'th' ? 'โอนเงินให้สมาชิก (Transfer)' : 'Transfer to Member'}</span>
          </button>

          <button
            onClick={() => setSubTab('withdraw')}
            className={`flex-1 py-3 px-4 text-center border-b-2 transition-colors flex items-center justify-center gap-2 ${
              subTab === 'withdraw' 
                ? 'border-emerald-600 text-emerald-700 bg-white' 
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <ArrowDownCircle className="w-4 h-4" />
            <span>{language === 'th' ? 'ถอนเงินเข้าธนาคาร (Withdraw)' : 'Withdraw to Bank'}</span>
          </button>

          <button
            onClick={() => setSubTab('deposit')}
            className={`flex-1 py-3 px-4 text-center border-b-2 transition-colors flex items-center justify-center gap-2 ${
              subTab === 'deposit' 
                ? 'border-indigo-600 text-indigo-700 bg-white' 
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <ArrowUpCircle className="w-4 h-4" />
            <span>{language === 'th' ? 'เติมเงิน E-Wallet (Deposit)' : 'Top-up E-Wallet'}</span>
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6">
          
          {/* TAB 1: TRANSFER TO MEMBER */}
          {subTab === 'transfer' && (
            <form onSubmit={handleExecuteTransfer} className="max-w-xl mx-auto space-y-4 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  {language === 'th' ? 'รหัสสมาชิกผู้รับเงิน (Recipient Member ID):' : 'Recipient Member Code:'}
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="เช่น TH889502"
                    value={targetCode}
                    onChange={(e) => {
                      setTargetCode(e.target.value);
                      setVerifiedName(null);
                    }}
                    className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-mono text-sm uppercase focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  <button
                    type="button"
                    onClick={handleVerifyTarget}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-medium transition-colors"
                  >
                    {language === 'th' ? 'ตรวจสอบชื่อ' : 'Verify'}
                  </button>
                </div>

                {verifiedName && (
                  <div className="mt-2 p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 font-medium flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>{language === 'th' ? 'ชื่อผู้รับ:' : 'Recipient:'} <strong>{verifiedName}</strong></span>
                  </div>
                )}
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  {language === 'th' ? 'จำนวนเงินที่ต้องการโอน (บาท):' : 'Transfer Amount (THB):'}
                </label>
                <input
                  type="number"
                  placeholder="0.00"
                  min="1"
                  max={currentMember.walletBalance}
                  value={transferAmount}
                  onChange={(e) => setTransferAmount(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-mono text-lg font-bold tabular-nums focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <span className="text-[11px] text-slate-400 mt-1 block">
                  {language === 'th' ? `ยอดคงเหลือโอนได้สูงสุด ฿${currentMember.walletBalance.toLocaleString()}` : `Max transferable balance ฿${currentMember.walletBalance.toLocaleString()}`}
                </span>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  {language === 'th' ? 'บันทึกช่วยจำ (Memo):' : 'Memo (Optional):'}
                </label>
                <input
                  type="text"
                  placeholder={language === 'th' ? 'เช่น คืนค่าสินค้า, ช่วยปิดยอด' : 'e.g. Order assistance'}
                  value={memo}
                  onChange={(e) => setMemo(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1 flex items-center justify-between">
                  <span>{language === 'th' ? 'รหัส PIN ธุรกรรม (6 หลัก):' : 'Transaction PIN (6 digits):'}</span>
                  <span className="text-slate-400 text-[10px] font-mono">Demo PIN: 123456</span>
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    maxLength={6}
                    value={transferPin}
                    onChange={(e) => setTransferPin(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-mono text-sm tracking-widest text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold transition-colors shadow-xs"
              >
                {language === 'th' ? 'ยืนยันการโอนเงินทันที' : 'Confirm Transfer Now'}
              </button>
            </form>
          )}

          {/* TAB 2: WITHDRAW TO BANK */}
          {subTab === 'withdraw' && (
            <form onSubmit={handleExecuteWithdraw} className="max-w-xl mx-auto space-y-4 text-xs">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <span className="font-semibold text-slate-700 block text-xs">
                  {language === 'th' ? 'ข้อมูลบัญชีธนาคารรับเงิน (Verified Bank):' : 'Destination Bank Account:'}
                </span>
                <div className="text-slate-900 font-bold text-sm">
                  {currentMember.bankAccount.bankName}
                </div>
                <div className="font-mono text-slate-700">
                  {language === 'th' ? 'เลขที่บัญชี:' : 'Account:'} {currentMember.bankAccount.accountNumber}
                </div>
                <div className="text-slate-500 text-[11px]">
                  {language === 'th' ? 'ชื่อบัญชี:' : 'Name:'} {currentMember.bankAccount.accountName}
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  {language === 'th' ? 'จำนวนเงินที่ต้องการถอน (บาท):' : 'Withdrawal Amount (THB):'}
                </label>
                <input
                  type="number"
                  placeholder="0.00"
                  min="300"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-mono text-lg font-bold tabular-nums focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                />
                <div className="mt-1 flex items-center justify-between text-[11px] text-slate-500">
                  <span>{language === 'th' ? 'ถอนขั้นต่ำ 300 บาท' : 'Min 300 THB'}</span>
                  <span>{language === 'th' ? 'ค่าธรรมเนียมโอนธนาคาร: 30 บาท' : 'Bank fee: 30 THB'}</span>
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1 flex items-center justify-between">
                  <span>{language === 'th' ? 'รหัส PIN ธุรกรรม (6 หลัก):' : 'Transaction PIN (6 digits):'}</span>
                  <span className="text-slate-400 text-[10px] font-mono">Demo PIN: 123456</span>
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    maxLength={6}
                    value={withdrawPin}
                    onChange={(e) => setWithdrawPin(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-mono text-sm tracking-widest text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold transition-colors shadow-xs"
              >
                {language === 'th' ? 'ส่งคำขอถอนเงินเข้าบัญชีธนาคาร' : 'Submit Bank Withdrawal Request'}
              </button>
            </form>
          )}

          {/* TAB 3: DEPOSIT VIA QR */}
          {subTab === 'deposit' && (
            <div className="max-w-md mx-auto text-center space-y-4 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  {language === 'th' ? 'ระบุจำนวนเงินที่ต้องการเติม (บาท):' : 'Top-up Amount (THB):'}
                </label>
                <input
                  type="number"
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-center text-slate-900 font-mono text-xl font-bold tabular-nums focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                <div className="w-40 h-40 bg-white border border-slate-300 rounded-lg mx-auto flex items-center justify-center p-2 shadow-inner">
                  {/* Promptpay SVG Mock */}
                  <svg className="w-36 h-36" viewBox="0 0 100 100" fill="currentColor">
                    <rect x="5" y="5" width="25" height="25" fill="#0f172a" />
                    <rect x="9" y="9" width="17" height="17" fill="#ffffff" />
                    <rect x="13" y="13" width="9" height="9" fill="#0f172a" />

                    <rect x="70" y="5" width="25" height="25" fill="#0f172a" />
                    <rect x="74" y="9" width="17" height="17" fill="#ffffff" />
                    <rect x="78" y="13" width="9" height="9" fill="#0f172a" />

                    <rect x="5" y="70" width="25" height="25" fill="#0f172a" />
                    <rect x="9" y="74" width="17" height="17" fill="#ffffff" />
                    <rect x="13" y="78" width="9" height="9" fill="#0f172a" />

                    <rect x="36" y="15" width="8" height="8" fill="#1e40af" />
                    <rect x="50" y="25" width="8" height="8" fill="#1e40af" />
                    <rect x="40" y="45" width="20" height="20" fill="#1e40af" />
                  </svg>
                </div>

                <div className="text-[11px] text-slate-500">
                  {language === 'th' ? 'สแกน QR PromptPay บัญชี บจก. ออนไลน์ มาร์เก็ตติ้ง คอมมิวนิเคชั่น' : 'Scan via Thai Banking Apps (PromptPay QR)'}
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  showToast(language === 'th' ? 'ระบบจำลองการเติมเงินเข้า E-Wallet สำเร็จ!' : 'Simulated deposit successful', 'success');
                }}
                className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold transition-colors"
              >
                {language === 'th' ? 'จำลองการแจ้งโอนสำเร็จ (+เงินเข้ากระเป๋า)' : 'Simulate Deposit Completion'}
              </button>
            </div>
          )}

        </div>
      </div>

    </div>
  );
};
