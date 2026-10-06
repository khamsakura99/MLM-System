import React, { useState } from 'react';
import { 
  Sliders, 
  Save, 
  ShieldCheck, 
  Check, 
  Sparkles, 
  Image as ImageIcon, 
  Type, 
  RotateCcw, 
  Code, 
  Globe,
  Building2,
  Palette,
  QrCode,
  CreditCard,
  Wallet,
  ArrowRightLeft,
  Copy,
  ExternalLink
} from 'lucide-react';
import { useMlm } from '../../../context/MlmContext';
import { SystemBranding, CompanyBankSettings } from '../../../types/mlm';

export const AdminSettingsView: React.FC = () => {
  const { 
    language, 
    compensationSettings, 
    updateCompensationSettings,
    systemBranding,
    updateSystemBranding,
    resetSystemBranding,
    companyBankSettings,
    updateCompanyBankSettings,
    resetCompanyBankSettings,
    showToast
  } = useMlm();

  const [activeSubTab, setActiveSubTab] = useState<'branding' | 'bank_qr' | 'compensation' | 'code_guide'>('bank_qr');

  // --- BRANDING FORM STATE ---
  const [companyName, setCompanyName] = useState(systemBranding.companyName);
  const [companyNameTh, setCompanyNameTh] = useState(systemBranding.companyNameTh);
  const [portalTitle, setPortalTitle] = useState(systemBranding.portalTitle);
  const [portalTitleTh, setPortalTitleTh] = useState(systemBranding.portalTitleTh);
  const [shortCode, setShortCode] = useState(systemBranding.shortCode);
  const [domainName, setDomainName] = useState(systemBranding.domainName);
  const [logoType, setLogoType] = useState<'text' | 'image'>(systemBranding.logoType);
  const [logoUrl, setLogoUrl] = useState(systemBranding.logoUrl || '');
  const [themeColor, setThemeColor] = useState<SystemBranding['themeColor']>(systemBranding.themeColor || 'blue');

  // --- BANK & QR TOP-UP FORM STATE ---
  const [bankName, setBankName] = useState(companyBankSettings.bankName);
  const [bankCode, setBankCode] = useState(companyBankSettings.bankCode);
  const [accountNumber, setAccountNumber] = useState(companyBankSettings.accountNumber);
  const [accountName, setAccountName] = useState(companyBankSettings.accountName);
  const [branch, setBranch] = useState(companyBankSettings.branch);
  const [promptPayId, setPromptPayId] = useState(companyBankSettings.promptPayId);
  const [promptPayType, setPromptPayType] = useState(companyBankSettings.promptPayType);
  const [qrCodeType, setQrCodeType] = useState(companyBankSettings.qrCodeType);
  const [customQrImageUrl, setCustomQrImageUrl] = useState(companyBankSettings.customQrImageUrl || '');
  const [minTransferAmount, setMinTransferAmount] = useState(companyBankSettings.minTransferAmount.toString());
  const [minWithdrawAmount, setMinWithdrawAmount] = useState(companyBankSettings.minWithdrawAmount.toString());
  const [transferFeeVal, setTransferFeeVal] = useState(companyBankSettings.transferFee.toString());

  // --- COMPENSATION FORM STATE ---
  const [fastStart, setFastStart] = useState(compensationSettings.fastStartRate.toString());
  const [pairingRate, setPairingRate] = useState(compensationSettings.binaryPairingRate.toString());
  const [capDiamond, setCapDiamond] = useState(compensationSettings.maxDailyCapDiamond.toString());
  const [capGold, setCapGold] = useState(compensationSettings.maxDailyCapGold.toString());
  const [autoshipPv, setAutoshipPv] = useState(compensationSettings.autoshipMinPv.toString());
  const [taxRate, setTaxRate] = useState(compensationSettings.withholdingTaxRate.toString());
  const [transferFee, setTransferFee] = useState(compensationSettings.bankTransferFee.toString());

  // Handle Save Branding
  const handleSaveBranding = (e: React.FormEvent) => {
    e.preventDefault();
    updateSystemBranding({
      companyName: companyName.trim() || 'OMC MLM System',
      companyNameTh: companyNameTh.trim() || companyName.trim(),
      portalTitle: portalTitle.trim() || `${companyName} Portal`,
      portalTitleTh: portalTitleTh.trim() || `ระบบสมาชิก ${companyNameTh}`,
      shortCode: (shortCode.trim() || 'OMC').toUpperCase(),
      domainName: domainName.trim() || 'demomlm.omc.co.th',
      logoType,
      logoUrl: logoUrl.trim(),
      themeColor
    });
  };

  // Handle Save Bank & QR
  const handleSaveBankSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateCompanyBankSettings({
      bankName: bankName.trim(),
      bankCode: bankCode.trim().toUpperCase(),
      accountNumber: accountNumber.trim(),
      accountName: accountName.trim(),
      branch: branch.trim(),
      promptPayId: promptPayId.trim(),
      promptPayType,
      qrCodeType,
      customQrImageUrl: customQrImageUrl.trim(),
      minTransferAmount: parseFloat(minTransferAmount) || 100,
      minWithdrawAmount: parseFloat(minWithdrawAmount) || 300,
      transferFee: parseFloat(transferFeeVal) || 30
    });
  };

  // Apply Bank Preset
  const applyBankPreset = (preset: {
    bankName: string;
    bankCode: string;
    accountNumber: string;
    accountName: string;
    branch: string;
    promptPayId: string;
    promptPayType: 'tax_id' | 'phone';
    qrCodeType: 'generated' | 'custom_image';
    customQrImageUrl?: string;
  }) => {
    setBankName(preset.bankName);
    setBankCode(preset.bankCode);
    setAccountNumber(preset.accountNumber);
    setAccountName(preset.accountName);
    setBranch(preset.branch);
    setPromptPayId(preset.promptPayId);
    setPromptPayType(preset.promptPayType);
    setQrCodeType(preset.qrCodeType);
    setCustomQrImageUrl(preset.customQrImageUrl || '');

    updateCompanyBankSettings({
      ...preset,
      minTransferAmount: parseFloat(minTransferAmount) || 100,
      minWithdrawAmount: parseFloat(minWithdrawAmount) || 300,
      transferFee: parseFloat(transferFeeVal) || 30
    });
  };

  // Handle Quick Presets
  const applyPreset = (preset: {
    companyName: string;
    companyNameTh: string;
    portalTitle: string;
    portalTitleTh: string;
    shortCode: string;
    domainName: string;
    logoType: 'text' | 'image';
    logoUrl?: string;
    themeColor: SystemBranding['themeColor'];
  }) => {
    setCompanyName(preset.companyName);
    setCompanyNameTh(preset.companyNameTh);
    setPortalTitle(preset.portalTitle);
    setPortalTitleTh(preset.portalTitleTh);
    setShortCode(preset.shortCode);
    setDomainName(preset.domainName);
    setLogoType(preset.logoType);
    setLogoUrl(preset.logoUrl || '');
    setThemeColor(preset.themeColor);

    updateSystemBranding(preset);
  };

  // Handle Save Compensation
  const handleSaveCompensation = (e: React.FormEvent) => {
    e.preventDefault();
    updateCompensationSettings({
      fastStartRate: parseFloat(fastStart) || 150,
      binaryPairingRate: parseFloat(pairingRate) || 30,
      maxDailyCapDiamond: parseFloat(capDiamond) || 80000,
      maxDailyCapGold: parseFloat(capGold) || 40000,
      autoshipMinPv: parseInt(autoshipPv, 10) || 250,
      withholdingTaxRate: parseFloat(taxRate) || 3,
      bankTransferFee: parseFloat(transferFee) || 30
    });
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      
      {/* Top Section Nav Tabs */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-1.5 flex flex-wrap items-center gap-1.5 text-xs font-semibold">
        <button
          type="button"
          onClick={() => setActiveSubTab('bank_qr')}
          className={`flex-1 min-w-[140px] py-2.5 px-3 rounded-lg flex items-center justify-center gap-2 transition-all cursor-pointer ${
            activeSubTab === 'bank_qr'
              ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-xs font-bold'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <QrCode className="w-4 h-4" />
          <span>{language === 'th' ? '1. E-Wallet & QR เติมเงิน (Bank & QR)' : '1. Bank & Top-up QR'}</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab('branding')}
          className={`flex-1 min-w-[140px] py-2.5 px-3 rounded-lg flex items-center justify-center gap-2 transition-all cursor-pointer ${
            activeSubTab === 'branding'
              ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-xs font-bold'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <Palette className="w-4 h-4" />
          <span>{language === 'th' ? '2. ชื่อ & โลโก้เว็บไซต์ (Name & Logo)' : '2. Website Name & Logo'}</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab('compensation')}
          className={`flex-1 min-w-[140px] py-2.5 px-3 rounded-lg flex items-center justify-center gap-2 transition-all cursor-pointer ${
            activeSubTab === 'compensation'
              ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-xs font-bold'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <Sliders className="w-4 h-4" />
          <span>{language === 'th' ? '3. แผนรายได้ (Compensation)' : '3. Compensation Plan'}</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab('code_guide')}
          className={`flex-1 min-w-[140px] py-2.5 px-3 rounded-lg flex items-center justify-center gap-2 transition-all cursor-pointer ${
            activeSubTab === 'code_guide'
              ? 'bg-gradient-to-r from-slate-800 to-slate-900 text-white shadow-xs font-bold'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <Code className="w-4 h-4" />
          <span>{language === 'th' ? '4. คู่มือแก้ไขในโค้ด (Code Guide)' : '4. Source Code Guide'}</span>
        </button>
      </div>

      {/* --- TAB 1: BANK & QR TOP-UP SETTINGS --- */}
      {activeSubTab === 'bank_qr' && (
        <div className="space-y-6">
          
          {/* Live QR & Bank Details Preview Banner */}
          <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 rounded-2xl p-6 text-white border border-slate-700 shadow-md">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-3 pb-2 border-b border-slate-800">
              <span className="font-semibold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                {language === 'th' ? 'ตัวอย่างที่สมาชิกจะเห็นในเมนูเติมเงิน E-Wallet (Member View Preview)' : 'Member Top-up View Preview'}
              </span>
              <span className="font-mono text-[11px] text-emerald-300">
                Live Dynamic Card
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Left: Bank Info Card */}
              <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-[11px] text-slate-400 border-b border-slate-800 pb-1">
                  <span className="font-semibold text-slate-300">บัญชีธนาคารบริษัทที่สมาชิกต้องโอนเข้า</span>
                  <span className="font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">{bankCode}</span>
                </div>
                <div className="font-bold text-sm text-white">{bankName}</div>
                <div className="flex items-center justify-between bg-slate-900 p-2.5 rounded-lg border border-slate-800 font-mono">
                  <span className="text-emerald-400 text-base font-bold">{accountNumber}</span>
                  <span className="text-[10px] text-slate-400">คัดลอกได้</span>
                </div>
                <div className="text-[11px] text-slate-300">
                  <div><strong>ชื่อบัญชี:</strong> {accountName}</div>
                  <div><strong>สาขา:</strong> {branch || 'สำนักงานใหญ่'}</div>
                  <div><strong>PromptPay ID:</strong> <span className="font-mono text-emerald-400">{promptPayId}</span> ({promptPayType === 'tax_id' ? 'เลขนิติบุคคล 13 หลัก' : 'เบอร์โทรศัพท์'})</div>
                </div>
              </div>

              {/* Right: QR Code Visual Preview */}
              <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 flex items-center justify-center gap-4 text-center">
                <div className="bg-white p-2 rounded-xl shadow-md w-32 h-32 flex items-center justify-center">
                  {qrCodeType === 'custom_image' && customQrImageUrl.trim() ? (
                    <img
                      src={customQrImageUrl.trim()}
                      alt="Custom QR Preview"
                      className="w-28 h-28 object-contain rounded"
                    />
                  ) : (
                    <div className="relative w-28 h-28 flex flex-col items-center justify-center">
                      <svg className="w-24 h-24" viewBox="0 0 100 100" fill="currentColor">
                        <rect x="5" y="5" width="26" height="26" fill="#0f172a" />
                        <rect x="9" y="9" width="18" height="18" fill="#ffffff" />
                        <rect x="13" y="13" width="10" height="10" fill="#0f172a" />

                        <rect x="69" y="5" width="26" height="26" fill="#0f172a" />
                        <rect x="73" y="9" width="18" height="18" fill="#ffffff" />
                        <rect x="77" y="13" width="10" height="10" fill="#0f172a" />

                        <rect x="5" y="69" width="26" height="26" fill="#0f172a" />
                        <rect x="9" y="73" width="18" height="18" fill="#ffffff" />
                        <rect x="13" y="77" width="10" height="10" fill="#0f172a" />

                        <rect x="36" y="10" width="8" height="8" fill="#1e40af" />
                        <rect x="50" y="20" width="8" height="8" fill="#1e40af" />
                        <rect x="42" y="38" width="16" height="16" fill="#1e40af" />
                        <rect x="68" y="44" width="8" height="8" fill="#0f172a" />
                        <rect x="40" y="68" width="12" height="12" fill="#0f172a" />
                        <rect x="65" y="68" width="8" height="8" fill="#1e40af" />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="px-1 py-0.2 rounded bg-blue-900 text-white font-mono text-[8px] font-bold">
                          THAI QR
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="text-left text-xs space-y-1">
                  <div className="font-bold text-white text-sm">พร้อมเพย์ สแกนจ่าย</div>
                  <div className="text-slate-400 text-[11px]">รองรับทุกแอปธนาคารไทย</div>
                  <div className="font-mono text-emerald-400 font-bold text-base">฿5,000.00</div>
                  <div className="text-[10px] text-slate-500 font-mono">Type: {qrCodeType === 'custom_image' ? 'รูปภาพของคุณ' : 'สร้างอัตโนมัติ'}</div>
                </div>
              </div>

            </div>
          </div>

          {/* Quick Bank Presets */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  {language === 'th' ? '⚡ ธนาคารตัวอย่างยอดนิยม (1-Click Thai Bank Presets)' : '⚡ Quick Bank Presets'}
                </h3>
                <p className="text-[11px] text-slate-500">
                  {language === 'th' ? 'คลิกเลือกธนาคารเพื่อกรอกข้อมูลตัวอย่างทันที' : 'Click to load typical Thai corporate bank profiles'}
                </p>
              </div>
              <button
                type="button"
                onClick={resetCompanyBankSettings}
                className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{language === 'th' ? 'รีเซ็ตค่าเดิม' : 'Reset Defaults'}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <button
                type="button"
                onClick={() => applyBankPreset({
                  bankName: 'ธนาคารกสิกรไทย (Kasikornbank)',
                  bankCode: 'KBANK',
                  accountNumber: '045-8-91234-5',
                  accountName: companyName ? `บริษัท ${companyName} จำกัด` : 'บริษัท โอเอ็มซี ซิสเต็มส์ จำกัด',
                  branch: 'สาขา สยามพารากอน',
                  promptPayId: '0105562018899',
                  promptPayType: 'tax_id',
                  qrCodeType: 'generated'
                })}
                className="p-3 rounded-lg border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/50 text-left transition-all cursor-pointer group"
              >
                <div className="w-7 h-7 rounded bg-emerald-600 text-white font-bold text-xs flex items-center justify-center mb-1.5 group-hover:scale-105 transition-transform">
                  K
                </div>
                <div className="font-bold text-xs text-slate-900">กสิกรไทย (KBANK)</div>
                <div className="text-[10px] text-slate-500">พร้อมเพย์นิติบุคคล 13 หลัก</div>
              </button>

              <button
                type="button"
                onClick={() => applyBankPreset({
                  bankName: 'ธนาคารไทยพาณิชย์ (Siam Commercial Bank)',
                  bankCode: 'SCB',
                  accountNumber: '111-3-45678-9',
                  accountName: companyName ? `บริษัท ${companyName} จำกัด` : 'บริษัท มาย เอ็มแอลเอ็ม จำกัด',
                  branch: 'สาขา รัชโยธิน',
                  promptPayId: '0105564023456',
                  promptPayType: 'tax_id',
                  qrCodeType: 'generated'
                })}
                className="p-3 rounded-lg border border-slate-200 hover:border-purple-500 hover:bg-purple-50/50 text-left transition-all cursor-pointer group"
              >
                <div className="w-7 h-7 rounded bg-purple-700 text-white font-bold text-xs flex items-center justify-center mb-1.5 group-hover:scale-105 transition-transform">
                  SCB
                </div>
                <div className="font-bold text-xs text-slate-900">ไทยพาณิชย์ (SCB)</div>
                <div className="text-[10px] text-slate-500">พร้อมเพย์นิติบุคคล 13 หลัก</div>
              </button>

              <button
                type="button"
                onClick={() => applyBankPreset({
                  bankName: 'ธนาคารกรุงเทพ (Bangkok Bank)',
                  bankCode: 'BBL',
                  accountNumber: '240-0-78129-0',
                  accountName: companyName ? `บริษัท ${companyName} จำกัด` : 'บริษัท เน็ตเวิร์ค อินเตอร์เนชั่นแนล จำกัด',
                  branch: 'สาขา สีลม',
                  promptPayId: '0897654321',
                  promptPayType: 'phone',
                  qrCodeType: 'generated'
                })}
                className="p-3 rounded-lg border border-slate-200 hover:border-blue-500 hover:bg-blue-50/50 text-left transition-all cursor-pointer group"
              >
                <div className="w-7 h-7 rounded bg-blue-800 text-white font-bold text-xs flex items-center justify-center mb-1.5 group-hover:scale-105 transition-transform">
                  BBL
                </div>
                <div className="font-bold text-xs text-slate-900">กรุงเทพ (BBL)</div>
                <div className="text-[10px] text-slate-500">พร้อมเพย์เบอร์มือถือ</div>
              </button>

              <button
                type="button"
                onClick={() => applyBankPreset({
                  bankName: 'ธนาคารกรุงไทย (Krungthai Bank)',
                  bankCode: 'KTB',
                  accountNumber: '002-1-98765-4',
                  accountName: companyName ? `บริษัท ${companyName} จำกัด` : 'บริษัท ซัคเซส กรุ๊ป จำกัด',
                  branch: 'สาขา นานาเหนือ',
                  promptPayId: '0105561098765',
                  promptPayType: 'tax_id',
                  qrCodeType: 'custom_image',
                  customQrImageUrl: 'https://images.unsplash.com/photo-1595079672139-625c58c27944?w=200&auto=format&fit=crop&q=80'
                })}
                className="p-3 rounded-lg border border-slate-200 hover:border-sky-500 hover:bg-sky-50/50 text-left transition-all cursor-pointer group"
              >
                <div className="w-7 h-7 rounded bg-sky-500 text-white font-bold text-xs flex items-center justify-center mb-1.5 group-hover:scale-105 transition-transform">
                  KTB
                </div>
                <div className="font-bold text-xs text-slate-900">กรุงไทย (พร้อมรูป QR กำหนดเอง)</div>
                <div className="text-[10px] text-slate-500">ตัวอย่างใช้ Custom QR Image</div>
              </button>
            </div>
          </div>

          {/* Bank & QR Configuration Form */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="p-5 border-b border-slate-100">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-emerald-600" />
                <span>{language === 'th' ? 'แบบฟอร์มแก้ไขบัญชีธนาคาร & QR Code สำหรับเติมเงิน' : 'Company Bank & QR Top-up Configuration Form'}</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                {language === 'th' 
                  ? 'ข้อมูลนี้จะแสดงในเมนูเติมเงิน E-Wallet, หน้าชำระเงินบิลสินค้า และการสมัครสมาชิกใหม่' 
                  : 'This account info and QR code are displayed in E-Wallet top-ups, checkout drawers, and registrations.'}
              </p>
            </div>

            <form onSubmit={handleSaveBankSettings} className="p-6 space-y-6 text-xs">
              
              {/* Section 1: Bank Information */}
              <div className="space-y-4">
                <h3 className="font-bold text-slate-900 pb-2 border-b border-slate-100 flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-emerald-600" />
                  <span>{language === 'th' ? '1. ข้อมูลบัญชีธนาคารของบริษัท' : '1. Company Official Bank Information'}</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">
                      {language === 'th' ? 'ชื่อธนาคาร (Bank Name):' : 'Bank Name:'}
                    </label>
                    <input
                      type="text"
                      value={bankName}
                      onChange={(e) => setBankName(e.target.value)}
                      placeholder="เช่น ธนาคารกสิกรไทย (Kasikornbank)"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">
                      {language === 'th' ? 'รหัสย่อธนาคาร (Bank Code):' : 'Bank Code:'}
                    </label>
                    <input
                      type="text"
                      value={bankCode}
                      onChange={(e) => setBankCode(e.target.value.toUpperCase())}
                      placeholder="เช่น KBANK, SCB, BBL"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-mono font-bold text-slate-900 uppercase focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">
                      {language === 'th' ? 'เลขที่บัญชีธนาคาร (Account Number):' : 'Bank Account Number:'}
                    </label>
                    <input
                      type="text"
                      value={accountNumber}
                      onChange={(e) => setAccountNumber(e.target.value)}
                      placeholder="เช่น 045-8-91234-5"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-mono font-bold text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">
                      {language === 'th' ? 'ชื่อบัญชีบริษัท (Account Name):' : 'Company Account Name:'}
                    </label>
                    <input
                      type="text"
                      value={accountName}
                      onChange={(e) => setAccountName(e.target.value)}
                      placeholder="เช่น บริษัท โอเอ็มซี ซิสเต็มส์ จำกัด"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      required
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="font-semibold text-slate-700 block mb-1">
                      {language === 'th' ? 'สาขาธนาคาร (Branch):' : 'Bank Branch:'}
                    </label>
                    <input
                      type="text"
                      value={branch}
                      onChange={(e) => setBranch(e.target.value)}
                      placeholder="เช่น สาขา สยามพารากอน หรือ สำนักงานใหญ่"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>
              </div>

              {/* Section 2: PromptPay & QR Settings */}
              <div className="space-y-4 pt-2">
                <h3 className="font-bold text-slate-900 pb-2 border-b border-slate-100 flex items-center gap-2">
                  <QrCode className="w-4 h-4 text-emerald-600" />
                  <span>{language === 'th' ? '2. ตั้งค่าระบบพร้อมเพย์ (PromptPay) & QR Code สำหรับเติมเงิน' : '2. PromptPay & QR Code Setup'}</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">
                      {language === 'th' ? 'หมายเลขพร้อมเพย์ (PromptPay ID):' : 'PromptPay ID:'}
                    </label>
                    <input
                      type="text"
                      value={promptPayId}
                      onChange={(e) => setPromptPayId(e.target.value)}
                      placeholder="เช่น 0105562018899 หรือ 0891234567"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-mono font-bold text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">
                      {language === 'th' ? 'ประเภทของพร้อมเพย์ (PromptPay Type):' : 'PromptPay Type:'}
                    </label>
                    <select
                      value={promptPayType}
                      onChange={(e) => setPromptPayType(e.target.value as 'tax_id' | 'phone')}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      <option value="tax_id">{language === 'th' ? 'เลขนิติบุคคล / เลขประจำตัวผู้เสียภาษี 13 หลัก (Tax ID)' : 'Corporate Tax ID (13 digits)'}</option>
                      <option value="phone">{language === 'th' ? 'เบอร์โทรศัพท์มือถือ (Mobile Phone)' : 'Mobile Phone Number'}</option>
                    </select>
                  </div>
                </div>

                {/* QR Code Format Selection */}
                <div>
                  <label className="font-semibold text-slate-800 block mb-2">
                    {language === 'th' ? 'รูปแบบ QR Code ที่ต้องการให้สมาชิกสแกน (QR Format):' : 'QR Code Display Method:'}
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <label className={`p-4 rounded-xl border-2 flex items-start gap-3 cursor-pointer transition-all ${
                      qrCodeType === 'generated'
                        ? 'border-emerald-600 bg-emerald-50/40 text-emerald-900'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}>
                      <input
                        type="radio"
                        name="qrCodeType"
                        checked={qrCodeType === 'generated'}
                        onChange={() => setQrCodeType('generated')}
                        className="mt-0.5 text-emerald-600"
                      />
                      <div>
                        <div className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                          <QrCode className="w-4 h-4 text-emerald-600" />
                          <span>{language === 'th' ? 'สร้าง QR PromptPay อัตโนมัติ (Dynamic Thai QR)' : 'Auto Generated PromptPay QR'}</span>
                        </div>
                        <p className="text-xs text-slate-500 mt-1">
                          {language === 'th' ? 'ระบบจะสร้าง QR Code อัตโนมัติพร้อมระบุจำนวนเงินที่สมาชิกต้องการเติมทันที' : 'Dynamic QR that updates amount automatically'}
                        </p>
                      </div>
                    </label>

                    <label className={`p-4 rounded-xl border-2 flex items-start gap-3 cursor-pointer transition-all ${
                      qrCodeType === 'custom_image'
                        ? 'border-emerald-600 bg-emerald-50/40 text-emerald-900'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}>
                      <input
                        type="radio"
                        name="qrCodeType"
                        checked={qrCodeType === 'custom_image'}
                        onChange={() => setQrCodeType('custom_image')}
                        className="mt-0.5 text-emerald-600"
                      />
                      <div>
                        <div className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                          <ImageIcon className="w-4 h-4 text-emerald-600" />
                          <span>{language === 'th' ? 'ใช้รูปภาพ QR Code ของคุณเอง (Custom QR Image)' : 'Custom QR Code Image URL'}</span>
                        </div>
                        <p className="text-xs text-slate-500 mt-1">
                          {language === 'th' ? 'นำรูปรหัส QR ที่ดาวน์โหลดจากแอปธนาคารของคุณจริงมาใส่ลิงก์หรือรูปภาพ' : 'Direct URL to your bank-issued official QR image'}
                        </p>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Conditional Custom QR URL input */}
                {qrCodeType === 'custom_image' && (
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                    <label className="font-semibold text-slate-700 block mb-1">
                      {language === 'th' ? 'ลิงก์รูปภาพ QR Code (Custom QR Image URL):' : 'Custom QR Image URL:'}
                    </label>
                    <input
                      type="url"
                      value={customQrImageUrl}
                      onChange={(e) => setCustomQrImageUrl(e.target.value)}
                      placeholder="https://example.com/my-promptpay-qr.jpg หรือ /src/assets/images/qr.png"
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg font-mono text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                    <p className="text-[11px] text-slate-500">
                      {language === 'th' ? 'แนะนำให้ใช้ภาพ QR สี่เหลี่ยมจัตุรัสที่สแกนติดง่าย' : 'Recommended: High resolution square image.'}
                    </p>

                    {customQrImageUrl.trim() && (
                      <div className="pt-2 flex items-center gap-3">
                        <span className="text-slate-600 font-medium">ภาพที่ตรวจพบ:</span>
                        <img
                          src={customQrImageUrl.trim()}
                          alt="Custom QR Preview"
                          className="w-16 h-16 object-contain rounded border border-slate-300 p-1 bg-white"
                        />
                      </div>
                    )}
                  </div>
                )}

              </div>

              {/* Section 3: E-Wallet Transfer & Withdrawal Rules */}
              <div className="space-y-4 pt-2">
                <h3 className="font-bold text-slate-900 pb-2 border-b border-slate-100 flex items-center gap-2">
                  <ArrowRightLeft className="w-4 h-4 text-emerald-600" />
                  <span>{language === 'th' ? '3. กฎเกณฑ์การโอนและถอนเงิน E-Wallet' : '3. E-Wallet Transfer & Withdrawal Rules'}</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">
                      {language === 'th' ? 'ยอดโอนขั้นต่ำระหว่างสมาชิก (บาท):' : 'Min Member-to-Member Transfer:'}
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        value={minTransferAmount}
                        onChange={(e) => setMinTransferAmount(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-mono font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        required
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">THB</span>
                    </div>
                  </div>

                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">
                      {language === 'th' ? 'ยอดถอนเงินขั้นต่ำเข้าบัญชี (บาท):' : 'Min Bank Withdrawal Amount:'}
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        value={minWithdrawAmount}
                        onChange={(e) => setMinWithdrawAmount(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-mono font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        required
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">THB</span>
                    </div>
                  </div>

                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">
                      {language === 'th' ? 'ค่าธรรมเนียมโอนถอนเข้าธนาคาร (บาท):' : 'Bank Withdrawal Fee:'}
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        value={transferFeeVal}
                        onChange={(e) => setTransferFeeVal(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-mono font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        required
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">THB</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Save Button */}
              <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                <span className="text-[11px] text-slate-500">
                  {language === 'th' ? 'บันทึกแล้วจะมีผลต่อหน้าสมาชิกทันที' : 'Settings update active E-Wallet screens immediately'}
                </span>

                <button
                  type="submit"
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
                >
                  <Save className="w-4 h-4" />
                  <span>{language === 'th' ? 'บันทึกข้อมูลธนาคาร & QR เติมเงิน' : 'Save Bank & QR Settings'}</span>
                </button>
              </div>

            </form>
          </div>

        </div>
      )}

      {/* --- TAB 2: BRANDING & LOGO SETTINGS --- */}
      {activeSubTab === 'branding' && (
        <div className="space-y-6">
          
          {/* Live Preview Card */}
          <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-2xl p-6 text-white border border-slate-700 shadow-md">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-3 pb-2 border-b border-slate-800">
              <span className="font-semibold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                {language === 'th' ? 'ตัวอย่างการแสดงผลสดบนแถบเมนู (Live Header Preview)' : 'Live Header Preview'}
              </span>
              <span className="font-mono text-[11px] text-slate-400">
                Auto Updates Everywhere
              </span>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-950/80 p-4 rounded-xl border border-slate-800">
              <div className="flex items-center gap-3">
                {logoType === 'image' && logoUrl.trim() ? (
                  <img
                    src={logoUrl.trim()}
                    alt="Logo Preview"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                    className="w-10 h-10 object-contain rounded-lg bg-white p-1 shadow-md border border-slate-700"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white font-bold text-lg shadow-md tracking-wider">
                    {shortCode || 'OMC'}
                  </div>
                )}

                <div>
                  <h3 className="font-bold text-base text-white leading-tight">
                    {language === 'th' ? (portalTitleTh || 'ระบบสมาชิกนักธุรกิจ') : (portalTitle || 'Member Portal')}
                  </h3>
                  <p className="text-xs text-slate-400 font-mono">
                    {domainName || 'demomlm.omc.co.th'}
                  </p>
                </div>
              </div>

              <div className="text-right text-xs">
                <span className="text-[11px] px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30 font-medium">
                  {companyName}
                </span>
                <p className="text-[11px] text-slate-400 mt-1">
                  {companyNameTh}
                </p>
              </div>
            </div>
          </div>

          {/* Quick 1-Click Brand Presets */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  {language === 'th' ? '⚡ ธีมตัวอย่างสำเร็จรูป (1-Click Presets)' : '⚡ Quick Brand Presets'}
                </h3>
                <p className="text-[11px] text-slate-500">
                  {language === 'th' ? 'คลิกเพื่อทดสอบเปลี่ยนชื่อแบรนด์และโลโก้ทันที' : 'Click to instantly preview alternative company brands'}
                </p>
              </div>
              <button
                type="button"
                onClick={resetSystemBranding}
                className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{language === 'th' ? 'รีเซ็ตค่าเดิม' : 'Reset Defaults'}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <button
                type="button"
                onClick={() => applyPreset({
                  companyName: 'OMC MLM System',
                  companyNameTh: 'โอเอ็มซี ซิสเต็มส์ (ประเทศไทย)',
                  portalTitle: 'OMC Member Portal',
                  portalTitleTh: 'ระบบสมาชิกนักธุรกิจ OMC',
                  shortCode: 'OMC',
                  domainName: 'demomlm.omc.co.th',
                  logoType: 'text',
                  themeColor: 'blue'
                })}
                className="p-3 rounded-lg border border-slate-200 hover:border-blue-500 hover:bg-blue-50/50 text-left transition-all cursor-pointer group"
              >
                <div className="w-7 h-7 rounded bg-blue-600 text-white font-bold text-xs flex items-center justify-center mb-1.5 group-hover:scale-105 transition-transform">
                  OMC
                </div>
                <div className="font-bold text-xs text-slate-900">OMC MLM Standard</div>
                <div className="text-[10px] text-slate-500">demomlm.omc.co.th</div>
              </button>

              <button
                type="button"
                onClick={() => applyPreset({
                  companyName: 'Green Life Global',
                  companyNameTh: 'กรีน ไลฟ์ โกลบอล จำกัด',
                  portalTitle: 'Green Life Member BackOffice',
                  portalTitleTh: 'ระบบสมาชิก กรีน ไลฟ์ โกลบอล',
                  shortCode: 'GLG',
                  domainName: 'member.greenlifeglobal.com',
                  logoType: 'text',
                  themeColor: 'emerald'
                })}
                className="p-3 rounded-lg border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/50 text-left transition-all cursor-pointer group"
              >
                <div className="w-7 h-7 rounded bg-emerald-600 text-white font-bold text-xs flex items-center justify-center mb-1.5 group-hover:scale-105 transition-transform">
                  GLG
                </div>
                <div className="font-bold text-xs text-slate-900">Green Life Global</div>
                <div className="text-[10px] text-slate-500">member.greenlifeglobal.com</div>
              </button>

              <button
                type="button"
                onClick={() => applyPreset({
                  companyName: 'Alpha Diamond Network',
                  companyNameTh: 'อัลฟ่า ไดมอนด์ เน็ตเวิร์ค',
                  portalTitle: 'Alpha Diamond Portal',
                  portalTitleTh: 'ระบบนักธุรกิจ อัลฟ่า ไดมอนด์',
                  shortCode: 'ADN',
                  domainName: 'backoffice.alphadiamond.co',
                  logoType: 'text',
                  themeColor: 'purple'
                })}
                className="p-3 rounded-lg border border-slate-200 hover:border-purple-500 hover:bg-purple-50/50 text-left transition-all cursor-pointer group"
              >
                <div className="w-7 h-7 rounded bg-purple-600 text-white font-bold text-xs flex items-center justify-center mb-1.5 group-hover:scale-105 transition-transform">
                  ADN
                </div>
                <div className="font-bold text-xs text-slate-900">Alpha Diamond Network</div>
                <div className="text-[10px] text-slate-500">backoffice.alphadiamond.co</div>
              </button>

              <button
                type="button"
                onClick={() => applyPreset({
                  companyName: 'Rich Pharma MLM',
                  companyNameTh: 'ริช ฟาร์มา เอ็มแอลเอ็ม',
                  portalTitle: 'Rich Pharma Member System',
                  portalTitleTh: 'ระบบสมาชิก ริช ฟาร์มา',
                  shortCode: 'RPM',
                  domainName: 'member.richpharmagroup.com',
                  logoType: 'image',
                  logoUrl: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=150&auto=format&fit=crop&q=80',
                  themeColor: 'indigo'
                })}
                className="p-3 rounded-lg border border-slate-200 hover:border-indigo-500 hover:bg-indigo-50/50 text-left transition-all cursor-pointer group"
              >
                <div className="w-7 h-7 rounded bg-indigo-600 text-white font-bold text-xs flex items-center justify-center mb-1.5 group-hover:scale-105 transition-transform">
                  RPM
                </div>
                <div className="font-bold text-xs text-slate-900">Rich Pharma (With Image Logo)</div>
                <div className="text-[10px] text-slate-500">member.richpharmagroup.com</div>
              </button>
            </div>
          </div>

          {/* Main Customization Form */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="p-5 border-b border-slate-100">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-indigo-600" />
                <span>{language === 'th' ? 'แบบฟอร์มกำหนดข้อมูลชื่อและโลโก้' : 'Website Name & Logo Customization Form'}</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                {language === 'th' 
                  ? 'เมื่อบันทึกแล้ว ข้อมูลชื่อและโลโก้จะอัปเดตอัตโนมัติบน Header, Sidebar, หน้าล็อกอิน, ใบแจ้งยอด และชื่อหัวเว็บแท็บ Browser' 
                  : 'Changes automatically reflect across navigation bars, login cards, commission slips, and browser tab titles.'}
              </p>
            </div>

            <form onSubmit={handleSaveBranding} className="p-6 space-y-6 text-xs">
              
              {/* Row 1: Logo Type Selector */}
              <div>
                <label className="font-bold text-slate-800 block mb-2">
                  {language === 'th' ? 'รูปแบบโลโก้ที่ต้องการแสดงผล (Logo Format):' : 'Logo Display Format:'}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label className={`p-4 rounded-xl border-2 flex items-start gap-3 cursor-pointer transition-all ${
                    logoType === 'text' 
                      ? 'border-blue-600 bg-blue-50/40 text-blue-900' 
                      : 'border-slate-200 hover:border-slate-300'
                  }`}>
                    <input
                      type="radio"
                      name="logoType"
                      checked={logoType === 'text'}
                      onChange={() => setLogoType('text')}
                      className="mt-0.5 text-blue-600"
                    />
                    <div>
                      <div className="font-bold text-sm flex items-center gap-1.5 text-slate-900">
                        <Type className="w-4 h-4 text-blue-600" />
                        <span>{language === 'th' ? 'โลโก้อักษรย่อ (Badge Monogram)' : 'Text Monogram Badge'}</span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">
                        {language === 'th' ? 'แสดงตัวย่อ 2-4 ตัวอักษร เช่น OMC, GLG, RPM บนพื้นหลังไล่เฉดสีทันสมัย' : 'Displays clean 2-4 letter short code badge with gradient fill'}
                      </p>
                    </div>
                  </label>

                  <label className={`p-4 rounded-xl border-2 flex items-start gap-3 cursor-pointer transition-all ${
                    logoType === 'image' 
                      ? 'border-blue-600 bg-blue-50/40 text-blue-900' 
                      : 'border-slate-200 hover:border-slate-300'
                  }`}>
                    <input
                      type="radio"
                      name="logoType"
                      checked={logoType === 'image'}
                      onChange={() => setLogoType('image')}
                      className="mt-0.5 text-blue-600"
                    />
                    <div>
                      <div className="font-bold text-sm flex items-center gap-1.5 text-slate-900">
                        <ImageIcon className="w-4 h-4 text-blue-600" />
                        <span>{language === 'th' ? 'รูปภาพโลโก้กำหนดเอง (Custom Image Logo)' : 'Custom Image URL Logo'}</span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">
                        {language === 'th' ? 'ใส่ลิงก์ URL ของรูปภาพโลโก้บริษัทของคุณ เช่น ไฟล์ .png, .svg หรือ .webp' : 'Provide direct URL to your corporate logo image file (.png, .svg)'}
                      </p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Conditional Logo Input Details */}
              {logoType === 'text' ? (
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">
                      {language === 'th' ? 'ตัวย่อโลโก้ (Short Code 2-5 ตัวอักษร):' : 'Logo Badge Short Code:'}
                    </label>
                    <input
                      type="text"
                      maxLength={5}
                      value={shortCode}
                      onChange={(e) => setShortCode(e.target.value.toUpperCase())}
                      placeholder="เช่น OMC หรือ RPM"
                      className="w-full max-w-xs px-3 py-2 bg-white border border-slate-300 rounded-lg font-mono font-bold text-slate-900 text-sm uppercase focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">
                      {language === 'th' ? 'ลิงก์รูปภาพโลโก้ (Logo Image URL):' : 'Logo Image URL:'}
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="url"
                        value={logoUrl}
                        onChange={(e) => setLogoUrl(e.target.value)}
                        placeholder="https://example.com/logo.png หรือ /src/assets/images/..."
                        className="flex-1 px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                      />
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1">
                      {language === 'th' 
                        ? 'แนะนำให้ใช้รูปทรงสี่เหลี่ยมจัตุรัส หรือสัดส่วน 1:1 พื้นหลังโปร่งใส (.png)' 
                        : 'Recommended: Square 1:1 aspect ratio with transparent PNG background.'}
                    </p>
                  </div>

                  {logoUrl.trim() && (
                    <div className="flex items-center gap-3 pt-2 border-t border-slate-200">
                      <span className="text-slate-600 font-medium">{language === 'th' ? 'ตัวอย่างภาพที่ตรวจพบ:' : 'Preview:'}</span>
                      <img
                        src={logoUrl.trim()}
                        alt="Logo URL Preview"
                        className="w-10 h-10 object-contain rounded bg-white p-1 border border-slate-300 shadow-2xs"
                      />
                    </div>
                  )}
                </div>
              )}

              {/* Company & Website Names */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    {language === 'th' ? 'ชื่อบริษัท/ระบบ (English Name):' : 'Company / System Name (EN):'}
                  </label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="เช่น OMC MLM System"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    {language === 'th' ? 'ชื่อบริษัทภาษาไทย (Thai Name):' : 'Company Name (TH):'}
                  </label>
                  <input
                    type="text"
                    value={companyNameTh}
                    onChange={(e) => setCompanyNameTh(e.target.value)}
                    placeholder="เช่น โอเอ็มซี ซิสเต็มส์ (ประเทศไทย)"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    {language === 'th' ? 'ชื่อหัวเว็บสมาชิก (Portal Title EN):' : 'Member Portal Title (EN):'}
                  </label>
                  <input
                    type="text"
                    value={portalTitle}
                    onChange={(e) => setPortalTitle(e.target.value)}
                    placeholder="เช่น OMC Member Portal"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    {language === 'th' ? 'ชื่อหัวเว็บสมาชิกภาษาไทย (Portal Title TH):' : 'Member Portal Title (TH):'}
                  </label>
                  <input
                    type="text"
                    value={portalTitleTh}
                    onChange={(e) => setPortalTitleTh(e.target.value)}
                    placeholder="เช่น ระบบสมาชิกนักธุรกิจ OMC"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="font-semibold text-slate-700 block mb-1">
                    {language === 'th' ? 'โดเมนเนม / ที่อยู่เว็บไซต์จำลอง (Domain text):' : 'Displayed Subdomain / Domain Name:'}
                  </label>
                  <div className="relative">
                    <Globe className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={domainName}
                      onChange={(e) => setDomainName(e.target.value)}
                      placeholder="เช่น demomlm.omc.co.th"
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Save Button */}
              <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                <span className="text-[11px] text-slate-500">
                  {language === 'th' ? 'การตั้งค่าจะถูกจัดเก็บและมีผลทันที' : 'Settings save to persistent state instantly'}
                </span>

                <button
                  type="submit"
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
                >
                  <Save className="w-4 h-4" />
                  <span>{language === 'th' ? 'บันทึกชื่อและโลโก้ (Save Changes)' : 'Save Website Branding'}</span>
                </button>
              </div>

            </form>
          </div>

        </div>
      )}

      {/* --- TAB 3: COMPENSATION PLAN SETTINGS --- */}
      {activeSubTab === 'compensation' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
          
          <div className="p-5 border-b border-slate-100">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Sliders className="w-5 h-5 text-indigo-600" />
              <span>{language === 'th' ? 'ตั้งค่าแผนการจ่ายผลตอบแทน (Compensation Plan Settings)' : 'Compensation Plan Configuration'}</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              {language === 'th' 
                ? 'กำหนดสูตรคำนวณ เปอร์เซ็นต์โบนัส และเพดานรายได้สูงสุดสำหรับแต่ละตำแหน่งธุรกิจ' 
                : 'Configure matching multipliers, daily binary income caps, and tax parameters.'}
            </p>
          </div>

          <form onSubmit={handleSaveCompensation} className="p-6 space-y-6 text-xs">
            
            {/* Section 1: Bonus Rates */}
            <div className="space-y-4">
              <h3 className="font-bold text-slate-900 pb-2 border-b border-slate-100">
                {language === 'th' ? '1. อัตราเปอร์เซ็นต์โบนัสหลัก' : '1. Core Bonus Rates'}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    {language === 'th' ? 'โบนัสค่าแนะนำสายตรง Fast Start (% ของ PV):' : 'Fast Start Bonus Rate (% of PV):'}
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={fastStart}
                      onChange={(e) => setFastStart(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-mono font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      required
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold">%</span>
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    {language === 'th' ? 'โบนัสจับคู่ไบนารี่ขาอ่อน Pairing (% ของ PV):' : 'Binary Weak Leg Pairing Rate (% of PV):'}
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={pairingRate}
                      onChange={(e) => setPairingRate(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-mono font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      required
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold">%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 2: Daily Caps */}
            <div className="space-y-4">
              <h3 className="font-bold text-slate-900 pb-2 border-b border-slate-100">
                {language === 'th' ? '2. เพดานรายได้จับคู่ต่อวันสูงสุด (Daily Max Cap)' : '2. Maximum Daily Pairing Income Caps'}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    {language === 'th' ? 'เพดานตำแหน่ง Diamond (บาท/วัน):' : 'Diamond Daily Cap (THB/day):'}
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={capDiamond}
                      onChange={(e) => setCapDiamond(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-mono font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      required
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">THB</span>
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    {language === 'th' ? 'เพดานตำแหน่ง Gold (บาท/วัน):' : 'Gold Daily Cap (THB/day):'}
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={capGold}
                      onChange={(e) => setCapGold(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-mono font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      required
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">THB</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 3: Autoship & Deductions */}
            <div className="space-y-4">
              <h3 className="font-bold text-slate-900 pb-2 border-b border-slate-100">
                {language === 'th' ? '3. เงื่อนไขรักษายอดและการหักภาษี' : '3. Autoship & Statutory Deductions'}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    {language === 'th' ? 'รักษายอดขั้นต่ำ (PV/เดือน):' : 'Autoship PV / Month:'}
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={autoshipPv}
                      onChange={(e) => setAutoshipPv(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-mono font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      required
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">PV</span>
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    {language === 'th' ? 'ภาษีหัก ณ ที่จ่าย (%):' : 'Withholding Tax Rate (%):'}
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      step="0.1"
                      value={taxRate}
                      onChange={(e) => setTaxRate(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-mono font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      required
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">%</span>
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    {language === 'th' ? 'ค่าธรรมเนียมโอนธนาคาร:' : 'Bank Transfer Fee:'}
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={transferFee}
                      onChange={(e) => setTransferFee(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-mono font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      required
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">THB</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="pt-4 border-t border-slate-200 flex justify-end">
              <button
                type="submit"
                className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
              >
                <Save className="w-4 h-4" />
                <span>{language === 'th' ? 'บันทึกการตั้งค่าแผนรายได้' : 'Save Compensation Plan Settings'}</span>
              </button>
            </div>

          </form>

        </div>
      )}

      {/* --- TAB 4: SOURCE CODE GUIDE --- */}
      {activeSubTab === 'code_guide' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-6 text-xs text-slate-700">
          
          <div className="flex items-center gap-2 pb-3 border-b border-slate-200 text-slate-900">
            <Code className="w-5 h-5 text-indigo-600" />
            <h2 className="text-base font-bold">
              {language === 'th' ? 'คู่มือการแก้ไขข้อมูลในไฟล์ซอร์สโค้ด (Source Code Developer Guide)' : 'How to Edit Bank, QR Code & Transfers in Code'}
            </h2>
          </div>

          <p className="leading-relaxed text-slate-600">
            {language === 'th'
              ? 'หากคุณต้องการกำหนดค่าบัญชีธนาคาร, รูปภาพ QR Code หรือตรรกะการโอนเงิน/ถอนเงิน E-Wallet ถาวรในระดับไฟล์โค้ดของโปรเจกต์ สามารถแก้ไขได้ตามจุดต่างๆ ดังนี้:'
              : 'If you want to permanently update bank details, QR code images, and transfer limits directly within the source repository files:'}
          </p>

          {/* Guide Item 1: Bank & QR Mock Data */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center justify-between font-bold text-slate-900">
              <span className="text-emerald-700 font-mono text-sm">1. /src/data/mockMlmData.ts (กำหนดบัญชี & QR เริ่มต้น)</span>
              <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">ค่าเริ่มต้นบัญชีธนาคาร</span>
            </div>
            <p className="text-slate-600">
              ค้นหาอ็อบเจกต์ <code className="bg-slate-200 px-1.5 py-0.5 rounded font-mono text-slate-800">DEFAULT_BANK_SETTINGS</code> เพื่อกำหนดเลขบัญชีธนาคาร และ PromptPay ของบริษัทคุณ:
            </p>
            <pre className="p-3 bg-slate-900 text-slate-100 rounded-lg font-mono text-[11px] overflow-x-auto">
{`export const DEFAULT_BANK_SETTINGS: CompanyBankSettings = {
  bankName: 'ธนาคารกสิกรไทย (Kasikornbank)', // ชื่อธนาคารของคุณ
  bankCode: 'KBANK',                        // รหัสย่อธนาคาร
  accountNumber: '045-8-91234-5',           // เลขที่บัญชีของบริษัทคุณ
  accountName: 'บริษัท ของคุณ จำกัด',          // ชื่อบัญชีบริษัทสำหรับรับเงิน
  branch: 'สาขา สำนักงานใหญ่',
  promptPayId: '0105562018899',             // เลขพร้อมเพย์ (เลขประจำตัวผู้เสียภาษี 13 หลัก หรือเบอร์โทร)
  promptPayType: 'tax_id',                  // หรือ 'phone'
  qrCodeType: 'generated',                  // หรือ 'custom_image'
  customQrImageUrl: '/src/assets/images/my_promptpay_qr.png', // กรณีใช้ภาพจริง
  minTransferAmount: 100,                   // โอนขั้นต่ำระหว่างสมาชิก
  minWithdrawAmount: 300,                   // ถอนขั้นต่ำเข้าบัญชี
  transferFee: 30                           // ค่าธรรมเนียมโอนถอน
};`}
            </pre>
          </div>

          {/* Guide Item 2: Placing Custom QR Image File */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center justify-between font-bold text-slate-900">
              <span className="text-emerald-700 font-mono text-sm">2. /src/assets/images/ (วางไฟล์รูปภาพ QR Code พร้อมเพย์จริง)</span>
              <span className="text-[11px] px-2 py-0.5 rounded bg-slate-200 text-slate-700">ไฟล์รูปภาพ</span>
            </div>
            <p className="text-slate-600">
              หากคุณมีภาพ QR Code จากแอปพลิเคชันธนาคารของคุณ (เช่น บัญชีธนาคารธุรกิจ SCB Business Anywhere หรือ K BIZ):
            </p>
            <ol className="list-decimal pl-5 space-y-1 text-slate-600">
              <li>นำไฟล์รูปภาพมาวางในโฟลเดอร์ <code className="bg-slate-200 px-1 py-0.5 rounded font-mono">/src/assets/images/my_promptpay_qr.png</code></li>
              <li>ในหน้า Admin ตั้งค่า ให้เลือกรูปแบบเป็น <strong>"ใช้รูปภาพ QR Code ของคุณเอง"</strong> แล้วใส่ URL เป็น <code className="bg-slate-200 px-1 py-0.5 rounded font-mono">/src/assets/images/my_promptpay_qr.png</code></li>
            </ol>
          </div>

          {/* Guide Item 3: Transfer & Withdrawal Logic */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center justify-between font-bold text-slate-900">
              <span className="text-indigo-600 font-mono text-sm">3. /src/context/MlmContext.tsx (ฟังก์ชันโอนและถอนเงิน)</span>
              <span className="text-[11px] px-2 py-0.5 rounded bg-indigo-100 text-indigo-800">Business Logic</span>
            </div>
            <p className="text-slate-600">
              ฟังก์ชัน <code className="bg-slate-200 px-1.5 py-0.5 rounded font-mono text-slate-800">transferWallet</code> และ <code className="bg-slate-200 px-1.5 py-0.5 rounded font-mono text-slate-800">withdrawWallet</code> จะตรวจสอบยอดเงินคงเหลือ, รหัส PIN 6 หลัก, ตรวจสอบผู้รับในผังองค์กร และบันทึกลงในรายการเดินบัญชี Ledger โดยอัตโนมัติ
            </p>
          </div>

          {/* Guide Item 4: Real Payment Gateway Integration Note */}
          <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 space-y-2">
            <div className="font-bold text-blue-900 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <span>การเชื่อมต่อ Payment Gateway จริงในอนาคต (Production Integration)</span>
            </div>
            <p className="text-blue-800 leading-relaxed">
              หากต้องการเชื่อมต่อระบบตัดเงินและตรวจจับสลิปอัตโนมัติในระดับ Production สามารถใช้ Webhook และ API ของผู้ให้บริการชำระเงินในไทย เช่น <strong>GB Prime Pay, Omise, 2C2P, หรือ SlipOK</strong> โดยสร้าง Route ฝั่ง Backend ใน <code className="bg-blue-100 px-1 py-0.5 rounded font-mono">/api/payment/webhook</code> เพื่ออัปเดตยอด E-Wallet ให้สมาชิกแบบอัตโนมัติเมื่อลูกค้าสแกน QR เสร็จสิ้น
            </p>
          </div>

        </div>
      )}

    </div>
  );
};
