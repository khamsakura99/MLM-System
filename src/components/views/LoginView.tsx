import React, { useState } from 'react';
import { 
  Lock, 
  User, 
  ShieldCheck, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  RotateCw,
  HelpCircle,
  ExternalLink
} from 'lucide-react';
import { useMlm } from '../../context/MlmContext';
import { ALTERNATIVE_MEMBERS } from '../../data/mockMlmData';

export const LoginView: React.FC = () => {
  const { language, setLanguage, login, showToast } = useMlm();

  const [memberCode, setMemberCode] = useState('TH889214');
  const [password, setPassword] = useState('123456');
  const [showPassword, setShowPassword] = useState(false);
  const [captchaInput, setCaptchaInput] = useState('8492');
  const [captchaCode, setCaptchaCode] = useState('8492');
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showForgotModal, setShowForgotModal] = useState(false);

  const generateNewCaptcha = () => {
    const code = Math.floor(1000 + Math.random() * 9000).toString();
    setCaptchaCode(code);
    setCaptchaInput(code); // convenient auto-match for demo
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (captchaInput.trim() !== captchaCode) {
      setErrorMessage(language === 'th' ? 'รหัสความปลอดภัย (Security Code) ไม่ถูกต้อง' : 'Security captcha code incorrect');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const res = login(memberCode, password);
      setIsLoading(false);
      if (!res.success) {
        setErrorMessage(res.message);
      }
    }, 400);
  };

  const handleQuickLogin = (code: string) => {
    setMemberCode(code);
    setPassword('123456');
    setCaptchaInput(captchaCode);
    setErrorMessage('');
    login(code, '123456');
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col justify-between selection:bg-blue-600 selection:text-white relative overflow-hidden">
      
      {/* Background radial accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-blue-600/15 via-indigo-600/5 to-transparent blur-3xl pointer-events-none" />

      {/* Top Bar with Brand & Language Toggle */}
      <header className="relative z-10 max-w-6xl w-full mx-auto px-4 sm:px-6 py-4 flex items-center justify-between border-b border-slate-800/80">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white font-bold text-lg shadow-md tracking-wider">
            OMC
          </div>
          <div>
            <h1 className="font-bold text-base tracking-tight text-white leading-tight">
              OMC Member Portal
            </h1>
            <p className="text-[11px] text-slate-400 font-mono leading-none">
              demomlm.omc.co.th/member
            </p>
          </div>
        </div>

        {/* Language selector */}
        <div className="flex items-center bg-slate-800 rounded-lg p-0.5 border border-slate-700">
          <button
            type="button"
            onClick={() => setLanguage('th')}
            className={`px-2.5 py-1 text-xs font-semibold rounded transition-colors ${
              language === 'th' 
                ? 'bg-blue-600 text-white' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            ภาษาไทย
          </button>
          <button
            type="button"
            onClick={() => setLanguage('en')}
            className={`px-2.5 py-1 text-xs font-semibold rounded transition-colors ${
              language === 'en' 
                ? 'bg-blue-600 text-white' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            English
          </button>
        </div>
      </header>

      {/* Main Login Card Center View */}
      <main className="relative z-10 flex-1 flex items-center justify-center p-4 sm:p-6 my-6">
        <div className="w-full max-w-md bg-white text-slate-900 rounded-2xl shadow-2xl border border-slate-200/80 overflow-hidden">
          
          {/* Card Top Banner */}
          <div className="p-6 pb-5 bg-gradient-to-b from-slate-50 to-white border-b border-slate-100 text-center">
            <div className="w-12 h-12 bg-blue-600 text-white font-bold text-xl rounded-xl mx-auto flex items-center justify-center mb-3 shadow-md">
              OMC
            </div>
            <h2 className="text-lg font-bold text-slate-900">
              {language === 'th' ? 'เข้าสู่ระบบสมาชิกนักธุรกิจ' : 'Member BackOffice Login'}
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              {language === 'th' 
                ? 'ระบบบริหารจัดการสมาชิกและผังองค์กรเครือข่าย' 
                : 'Multi-Level Marketing Network Management Portal'}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLoginSubmit} className="p-6 space-y-4 text-xs">
            
            {/* Error banner if any */}
            {errorMessage && (
              <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
                ⚠️ {errorMessage}
              </div>
            )}

            {/* Member ID Input */}
            <div>
              <label className="font-semibold text-slate-700 block mb-1">
                {language === 'th' ? 'รหัสสมาชิก (Member ID / Username):' : 'Member ID / Username:'}
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="เช่น TH889214"
                  value={memberCode}
                  onChange={(e) => setMemberCode(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-mono text-sm uppercase focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="font-semibold text-slate-700 block mb-1">
                {language === 'th' ? 'รหัสผ่าน (Password):' : 'Password:'}
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Captcha Security Code */}
            <div>
              <label className="font-semibold text-slate-700 block mb-1">
                {language === 'th' ? 'รหัสความปลอดภัย (Security Code):' : 'Security Verification Code:'}
              </label>
              <div className="flex gap-2 items-center">
                <input
                  type="text"
                  maxLength={4}
                  value={captchaInput}
                  onChange={(e) => setCaptchaInput(e.target.value)}
                  className="w-28 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-center font-mono text-base font-bold tracking-widest text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                
                {/* Visual Captcha Box */}
                <div 
                  onClick={generateNewCaptcha}
                  className="flex-1 py-2 px-3 bg-gradient-to-r from-slate-800 to-indigo-900 text-white rounded-lg flex items-center justify-between cursor-pointer select-none border border-slate-700 shadow-inner"
                  title="คลิกเพื่อสุ่มรหัสความปลอดภัยใหม่"
                >
                  <span className="font-mono text-base font-black tracking-widest text-emerald-400 italic">
                    {captchaCode}
                  </span>
                  <RotateCw className="w-3.5 h-3.5 text-slate-400 hover:text-white" />
                </div>
              </div>
            </div>

            {/* Remember & Forgot options */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-slate-600">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                <span>{language === 'th' ? 'จดจำรหัสสมาชิก' : 'Remember ID'}</span>
              </label>

              <button
                type="button"
                onClick={() => setShowForgotModal(true)}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                {language === 'th' ? 'ลืมรหัสผ่าน?' : 'Forgot Password?'}
              </button>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer"
            >
              {isLoading ? (
                <span>{language === 'th' ? 'กำลังตรวจสอบสิทธิ์...' : 'Verifying Credentials...'}</span>
              ) : (
                <>
                  <span>{language === 'th' ? 'เข้าสู่ระบบ (Sign In)' : 'Sign In to Portal'}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            {/* 1-Click Demo Accounts Quick Bar */}
            <div className="pt-3 border-t border-slate-100">
              <span className="text-[11px] font-semibold text-slate-400 block mb-2 text-center uppercase tracking-wider">
                {language === 'th' ? '⚡ ทดสอบเข้าสู่ระบบทันที (1-Click Demo Accounts)' : '⚡ 1-Click Demo Test Accounts'}
              </span>

              <div className="grid grid-cols-3 gap-2">
                {ALTERNATIVE_MEMBERS.map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => handleQuickLogin(m.memberCode)}
                    className="p-2 rounded-lg bg-slate-50 hover:bg-blue-50 hover:border-blue-300 border border-slate-200 text-center transition-colors group cursor-pointer"
                  >
                    <div className="font-mono font-bold text-slate-800 group-hover:text-blue-700 text-[11px]">
                      {m.memberCode}
                    </div>
                    <div className="text-[10px] text-slate-500 font-medium">
                      {m.rank}
                    </div>
                  </button>
                ))}
              </div>
            </div>

          </form>

        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 max-w-6xl w-full mx-auto px-4 sm:px-6 py-4 text-center text-[11px] text-slate-500 border-t border-slate-800/80 space-y-1">
        <p>
          ระบบสมาชิกจำลองตามโครงสร้าง OMC MLM System · สงวนลิขสิทธิ์ บริษัท ออนไลน์ มาร์เก็ตติ้ง คอมมิวนิเคชั่น จำกัด
        </p>
        <p className="font-mono text-[10px] text-slate-600">
          demomlm.omc.co.th · SSL 256-Bit Encrypted Data Protection
        </p>
      </footer>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 text-slate-900 shadow-2xl border border-slate-200 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mx-auto">
              <HelpCircle className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-slate-900">
              {language === 'th' ? 'คำแนะนำการกู้คืนรหัสผ่าน' : 'Password Recovery'}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {language === 'th'
                ? 'สำหรับระบบทดสอบ Demo ท่านสามารถเข้าสู่ระบบด้วยรหัสผ่าน "123456" หรือคลิกปุ่ม 1-Click Demo Accounts ด้านล่างเพื่อเข้าใช้งานได้ทันที'
                : 'For this demo system, default password is "123456" or click any 1-Click Demo button to sign in directly.'}
            </p>
            <div className="pt-2">
              <button
                onClick={() => setShowForgotModal(false)}
                className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold"
              >
                {language === 'th' ? 'เข้าใจแล้ว ปิดหน้าต่าง' : 'Got it, Close'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
