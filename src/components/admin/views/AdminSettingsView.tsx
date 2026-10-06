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
  ExternalLink
} from 'lucide-react';
import { useMlm } from '../../../context/MlmContext';
import { SystemBranding } from '../../../types/mlm';

export const AdminSettingsView: React.FC = () => {
  const { 
    language, 
    compensationSettings, 
    updateCompensationSettings,
    systemBranding,
    updateSystemBranding,
    resetSystemBranding,
    showToast
  } = useMlm();

  const [activeSubTab, setActiveSubTab] = useState<'branding' | 'compensation' | 'code_guide'>('branding');

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
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-1.5 flex items-center gap-1.5 text-xs font-semibold">
        <button
          type="button"
          onClick={() => setActiveSubTab('branding')}
          className={`flex-1 py-2.5 px-3 rounded-lg flex items-center justify-center gap-2 transition-all cursor-pointer ${
            activeSubTab === 'branding'
              ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-xs font-bold'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <Palette className="w-4 h-4" />
          <span>{language === 'th' ? '1. แก้ไขชื่อ & โลโก้เว็บไซต์ (Name & Logo)' : '1. Website Name & Logo'}</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab('compensation')}
          className={`flex-1 py-2.5 px-3 rounded-lg flex items-center justify-center gap-2 transition-all cursor-pointer ${
            activeSubTab === 'compensation'
              ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-xs font-bold'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <Sliders className="w-4 h-4" />
          <span>{language === 'th' ? '2. แผนการจ่ายผลตอบแทน (Compensation)' : '2. Compensation Plan'}</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab('code_guide')}
          className={`flex-1 py-2.5 px-3 rounded-lg flex items-center justify-center gap-2 transition-all cursor-pointer ${
            activeSubTab === 'code_guide'
              ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-xs font-bold'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <Code className="w-4 h-4" />
          <span>{language === 'th' ? '3. คู่มือแก้ไขในโค้ด (Source Code Guide)' : '3. Source Code Guide'}</span>
        </button>
      </div>

      {/* --- TAB 1: BRANDING & LOGO SETTINGS --- */}
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
                      // Fallback if URL is invalid
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

      {/* --- TAB 2: COMPENSATION PLAN SETTINGS --- */}
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

      {/* --- TAB 3: SOURCE CODE GUIDE --- */}
      {activeSubTab === 'code_guide' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-6 text-xs text-slate-700">
          
          <div className="flex items-center gap-2 pb-3 border-b border-slate-200 text-slate-900">
            <Code className="w-5 h-5 text-indigo-600" />
            <h2 className="text-base font-bold">
              {language === 'th' ? 'คู่มือการแก้ไขชื่อและโลโก้ในไฟล์ซอร์สโค้ด (Source Code Developer Guide)' : 'How to Edit Name & Logo in Source Code Files'}
            </h2>
          </div>

          <p className="leading-relaxed text-slate-600">
            {language === 'th'
              ? 'หากคุณต้องการแก้ไขชื่อเว็บไซต์หรือเปลี่ยนไฟล์โลโก้ถาวรในระดับไฟล์โค้ดของโปรเจกต์ สามารถแก้ไขได้ตามจุดต่างๆ ดังนี้:'
              : 'If you want to permanently update the company name and logo directly within the project repository files, modify the following:'}
          </p>

          {/* Guide Item 1: Mock Data Defaults */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center justify-between font-bold text-slate-900">
              <span className="text-indigo-600 font-mono text-sm">1. /src/data/mockMlmData.ts</span>
              <span className="text-[11px] px-2 py-0.5 rounded bg-slate-200 text-slate-700">ค่าเริ่มต้นแบรนด์</span>
            </div>
            <p className="text-slate-600">
              ค้นหาอ็อบเจกต์ <code className="bg-slate-200 px-1.5 py-0.5 rounded font-mono text-slate-800">DEFAULT_BRANDING</code> เพื่อกำหนดค่าเริ่มต้นเมื่อโหลดเว็บไซต์ครั้งแรก:
            </p>
            <pre className="p-3 bg-slate-900 text-slate-100 rounded-lg font-mono text-[11px] overflow-x-auto">
{`export const DEFAULT_BRANDING: SystemBranding = {
  companyName: 'YOUR COMPANY NAME',       // เช่น 'My MLM Global'
  companyNameTh: 'ชื่อบริษัทภาษาไทย',        // เช่น 'มาย เอ็มแอลเอ็ม โกลบอล'
  portalTitle: 'My MLM Member Portal',
  portalTitleTh: 'ระบบสมาชิกนักธุรกิจ My MLM',
  shortCode: 'MLM',                        // ตัวย่อโลโก้ 2-4 ตัวอักษร
  domainName: 'member.yourdomain.com',
  logoType: 'text',                        // หรือ 'image'
  logoUrl: '/src/assets/images/my_logo.png' // เมื่อใช้ไฟล์รูปภาพ
};`}
            </pre>
          </div>

          {/* Guide Item 2: Placing Logo Image File */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center justify-between font-bold text-slate-900">
              <span className="text-indigo-600 font-mono text-sm">2. /src/assets/images/ (วางไฟล์รูปโลโก้)</span>
              <span className="text-[11px] px-2 py-0.5 rounded bg-slate-200 text-slate-700">ไฟล์รูปภาพ</span>
            </div>
            <p className="text-slate-600">
              คุณสามารถนำไฟล์โลโก้ของคุณ (เช่น <code className="bg-slate-200 px-1 py-0.5 rounded font-mono">company_logo.png</code> หรือ <code className="bg-slate-200 px-1 py-0.5 rounded font-mono">logo.svg</code>) มาวางไว้ในโฟลเดอร์ <code className="bg-slate-200 px-1 py-0.5 rounded font-mono">/src/assets/images/</code> แล้วเรียกใช้ผ่าน URL หรือ Import ใน Header ได้ทันที
            </p>
          </div>

          {/* Guide Item 3: HTML Title & SEO */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center justify-between font-bold text-slate-900">
              <span className="text-indigo-600 font-mono text-sm">3. /index.html</span>
              <span className="text-[11px] px-2 py-0.5 rounded bg-slate-200 text-slate-700">ชื่อแท็บ Browser & SEO</span>
            </div>
            <p className="text-slate-600">
              แก้ไขแท็ก <code className="bg-slate-200 px-1 py-0.5 rounded font-mono">&lt;title&gt;</code> และ <code className="bg-slate-200 px-1 py-0.5 rounded font-mono">&lt;meta&gt;</code> สำหรับการแสดงผลบนแท็บเบราว์เซอร์และการแชร์ลิงก์โซเชียล:
            </p>
            <pre className="p-3 bg-slate-900 text-slate-100 rounded-lg font-mono text-[11px] overflow-x-auto">
{`<title>Your Company MLM Member Portal</title>
<meta name="description" content="Member portal for Your Company MLM" />
<meta property="og:title" content="Your Company MLM Portal" />`}
            </pre>
          </div>

          {/* Guide Item 4: App metadata */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center justify-between font-bold text-slate-900">
              <span className="text-indigo-600 font-mono text-sm">4. /metadata.json</span>
              <span className="text-[11px] px-2 py-0.5 rounded bg-slate-200 text-slate-700">App Manifest</span>
            </div>
            <p className="text-slate-600">
              ไฟล์ระบุข้อมูลแอปพลิเคชันสำหรับ Google AI Studio:
            </p>
            <pre className="p-3 bg-slate-900 text-slate-100 rounded-lg font-mono text-[11px] overflow-x-auto">
{`{
  "name": "Your Company MLM Member Portal",
  "description": "Comprehensive Multi-Level Marketing (MLM) member back-office portal..."
}`}
            </pre>
          </div>

        </div>
      )}

    </div>
  );
};
