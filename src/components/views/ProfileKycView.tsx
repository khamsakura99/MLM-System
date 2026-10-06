import React, { useState } from 'react';
import { 
  UserCheck, 
  ShieldCheck, 
  CreditCard, 
  Lock, 
  Check, 
  Building2, 
  Upload, 
  FileCheck,
  Calendar,
  Sparkles,
  Award
} from 'lucide-react';
import { useMlm } from '../../context/MlmContext';

export const ProfileKycView: React.FC = () => {
  const { language, currentMember, showToast } = useMlm();
  const [oldPin, setOldPin] = useState('');
  const [newPin, setNewPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');

  const handleUpdatePin = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPin.length !== 6 || isNaN(Number(newPin))) {
      showToast(language === 'th' ? 'PIN ต้องเป็นตัวเลข 6 หลัก' : 'PIN must be 6 digits', 'error');
      return;
    }
    if (newPin !== confirmPin) {
      showToast(language === 'th' ? 'รหัส PIN ใหม่ไม่ตรงกัน' : 'PINs do not match', 'error');
      return;
    }
    showToast(language === 'th' ? 'เปลี่ยนรหัส PIN ธุรกรรมสำเร็จแล้ว' : 'Transaction PIN updated', 'success');
    setOldPin('');
    setNewPin('');
    setConfirmPin('');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* Title */}
      <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs">
        <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <UserCheck className="w-5 h-5 text-blue-600" />
          <span>{language === 'th' ? 'ข้อมูลสมาชิกและการยืนยันตัวตน KYC (Member Profile & KYC)' : 'Member Profile & Identity Verification'}</span>
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          {language === 'th' 
            ? 'ตรวจสอบข้อมูลประจำตัว บัญชีธนาคารสำหรับรับโอนคอมมิชชั่น และตั้งค่ารหัสความปลอดภัย' 
            : 'Review verified identification, commission payout banking credentials, and transaction security.'}
        </p>
      </div>

      {/* Member ID Digital Business Card */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 rounded-2xl p-6 text-white border border-slate-800 shadow-md relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-radial from-blue-600/10 to-transparent pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-4">
            <img
              src={currentMember.avatarUrl}
              alt={currentMember.fullName}
              referrerPolicy="no-referrer"
              className="w-16 h-16 rounded-full object-cover ring-4 ring-blue-500/40"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold">{currentMember.fullName}</span>
                <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-blue-600 text-white uppercase">
                  {currentMember.rank}
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono mt-0.5">
                MEMBER ID: <span className="text-blue-400 font-bold">{currentMember.memberCode}</span>
              </p>
              <p className="text-[11px] text-slate-400 mt-1">
                {language === 'th' ? 'สังกัดสายงาน:' : 'Direct Team:'} {currentMember.sponsorName} ({currentMember.sponsorCode})
              </p>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-xs p-3.5 rounded-xl border border-white/10 text-xs space-y-1 sm:text-right">
            <span className="text-slate-400 block text-[10px]">{language === 'th' ? 'สถานะเอกสาร KYC' : 'KYC Verification Status'}</span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-500/20 text-emerald-300 rounded font-semibold text-xs border border-emerald-500/30">
              <ShieldCheck className="w-3.5 h-3.5" />
              {language === 'th' ? 'อนุมัติแล้ว (Verified)' : 'Approved & Verified'}
            </span>
            <span className="text-[10px] text-slate-400 block font-mono">
              {language === 'th' ? 'ยืนยันเมื่อ:' : 'Verified on:'} {currentMember.joinDate}
            </span>
          </div>
        </div>
      </div>

      {/* Grid: Personal Details & Bank Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Card 1: Personal Profile */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs space-y-3 text-xs">
          <h3 className="font-bold text-slate-900 pb-2 border-b border-slate-100 flex items-center gap-2 text-sm">
            <span>{language === 'th' ? 'ข้อมูลส่วนตัวสมาชิก' : 'Personal Information'}</span>
          </h3>

          <div className="space-y-2 text-slate-700">
            <div className="flex justify-between py-1 border-b border-slate-50">
              <span className="text-slate-400">{language === 'th' ? 'ชื่อ-นามสกุล:' : 'Full Name:'}</span>
              <span className="font-semibold text-slate-900">{currentMember.fullName}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-50">
              <span className="text-slate-400">{language === 'th' ? 'เลขบัตรประชาชน:' : 'ID Card:'}</span>
              <span className="font-mono">{currentMember.idCardNumber}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-50">
              <span className="text-slate-400">{language === 'th' ? 'เบอร์โทรศัพท์:' : 'Phone:'}</span>
              <span className="font-mono">{currentMember.phone}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-50">
              <span className="text-slate-400">{language === 'th' ? 'อีเมล:' : 'Email:'}</span>
              <span>{currentMember.email}</span>
            </div>
            <div className="py-1">
              <span className="text-slate-400 block mb-0.5">{language === 'th' ? 'ที่อยู่จัดส่ง:' : 'Address:'}</span>
              <span className="text-slate-800">{currentMember.address} {currentMember.province} {currentMember.postcode}</span>
            </div>
          </div>
        </div>

        {/* Card 2: Bank Account & KYC Docs */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs space-y-3 text-xs">
          <h3 className="font-bold text-slate-900 pb-2 border-b border-slate-100 flex items-center gap-2 text-sm">
            <Building2 className="w-4 h-4 text-blue-600" />
            <span>{language === 'th' ? 'บัญชีธนาคารสำหรับรับคอมมิชชั่น' : 'Commission Payout Bank Account'}</span>
          </h3>

          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900">{currentMember.bankAccount.bankName}</span>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-semibold">
                {language === 'th' ? 'ผ่านการตรวจ' : 'Verified'}
              </span>
            </div>
            <p className="font-mono font-bold text-slate-800 text-sm">
              {currentMember.bankAccount.accountNumber}
            </p>
            <p className="text-slate-600">
              {language === 'th' ? 'ชื่อบัญชี:' : 'Account Name:'} {currentMember.bankAccount.accountName}
            </p>
            <p className="text-slate-400 text-[11px]">
              {language === 'th' ? 'สาขา:' : 'Branch:'} {currentMember.bankAccount.branch}
            </p>
          </div>

          <div className="pt-2 border-t border-slate-100 space-y-2">
            <span className="font-semibold text-slate-700 block">
              {language === 'th' ? 'เอกสาร KYC ที่แนบในระบบ:' : 'Uploaded KYC Documents:'}
            </span>
            <div className="flex items-center justify-between p-2 rounded bg-slate-50 border border-slate-200">
              <span className="flex items-center gap-2 text-slate-700 font-medium">
                <FileCheck className="w-4 h-4 text-emerald-600" />
                <span>สำเนาบัตรประชาชน (ID Card Copy)</span>
              </span>
              <span className="text-emerald-600 font-semibold text-[11px]">✓ อนุมัติแล้ว</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded bg-slate-50 border border-slate-200">
              <span className="flex items-center gap-2 text-slate-700 font-medium">
                <FileCheck className="w-4 h-4 text-emerald-600" />
                <span>สำเนาหน้าสมุดบัญชี (Book Bank Copy)</span>
              </span>
              <span className="text-emerald-600 font-semibold text-[11px]">✓ อนุมัติแล้ว</span>
            </div>
          </div>
        </div>

      </div>

      {/* Security: Change Transaction PIN Form */}
      <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs space-y-4">
        <h3 className="font-bold text-slate-900 pb-2 border-b border-slate-100 flex items-center gap-2 text-sm">
          <Lock className="w-4 h-4 text-blue-600" />
          <span>{language === 'th' ? 'ความปลอดภัย & รหัสผ่านทำธุรกรรม (Transaction PIN)' : 'Security & Transaction PIN'}</span>
        </h3>

        <form onSubmit={handleUpdatePin} className="max-w-md space-y-3 text-xs">
          <div>
            <label className="font-semibold text-slate-700 block mb-1">
              {language === 'th' ? 'รหัส PIN เดิม (Current PIN):' : 'Current PIN:'}
            </label>
            <input
              type="password"
              maxLength={6}
              placeholder="123456"
              value={oldPin}
              onChange={(e) => setOldPin(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">
              {language === 'th' ? 'รหัส PIN ใหม่ (6 หลัก):' : 'New 6-digit PIN:'}
            </label>
            <input
              type="password"
              maxLength={6}
              placeholder="ตัวเลข 6 หลัก"
              value={newPin}
              onChange={(e) => setNewPin(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">
              {language === 'th' ? 'ยืนยันรหัส PIN ใหม่อีกครั้ง:' : 'Confirm New PIN:'}
            </label>
            <input
              type="password"
              maxLength={6}
              placeholder="ยืนยันตัวเลข 6 หลัก"
              value={confirmPin}
              onChange={(e) => setConfirmPin(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="py-2 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-semibold transition-colors shadow-2xs"
          >
            {language === 'th' ? 'บันทึกการเปลี่ยน PIN' : 'Save PIN Changes'}
          </button>
        </form>
      </div>

    </div>
  );
};
