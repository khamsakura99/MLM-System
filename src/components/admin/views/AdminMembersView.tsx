import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Award, 
  Wallet, 
  Sparkles, 
  ShieldCheck, 
  ShieldAlert, 
  Edit3, 
  Plus, 
  Minus,
  Check,
  X
} from 'lucide-react';
import { useMlm } from '../../../context/MlmContext';
import { MemberRank, BinaryNode } from '../../../types/mlm';

export const AdminMembersView: React.FC = () => {
  const { 
    language, 
    binaryNodes, 
    updateMemberRank, 
    adjustMemberWallet, 
    adjustMemberPv, 
    toggleMemberStatus,
    showToast 
  } = useMlm();

  const [search, setSearch] = useState('');
  const [selectedRank, setSelectedRank] = useState<string>('all');

  // Action Modals State
  const [rankModalNode, setRankModalNode] = useState<BinaryNode | null>(null);
  const [newRankVal, setNewRankVal] = useState<MemberRank>('Diamond');

  const [walletModalNode, setWalletModalNode] = useState<BinaryNode | null>(null);
  const [walletAmount, setWalletAmount] = useState('');
  const [walletNote, setWalletNote] = useState('');

  const [pvModalNode, setPvModalNode] = useState<BinaryNode | null>(null);
  const [pvAmount, setPvAmount] = useState('');

  const allMembers = Object.values(binaryNodes);

  const filtered = allMembers.filter(m => {
    const matchSearch = !search.trim() || 
      m.memberCode.toLowerCase().includes(search.toLowerCase()) || 
      m.name.toLowerCase().includes(search.toLowerCase());
    const matchRank = selectedRank === 'all' || m.rank === selectedRank;
    return matchSearch && matchRank;
  });

  const ranks: MemberRank[] = ['Member', 'Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond', 'Crown Diamond'];

  const handleRankSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rankModalNode) return;
    updateMemberRank(rankModalNode.memberCode, newRankVal);
    setRankModalNode(null);
  };

  const handleWalletSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!walletModalNode) return;
    const amt = parseFloat(walletAmount);
    if (isNaN(amt)) return;
    adjustMemberWallet(walletModalNode.memberCode, amt, walletNote || 'Admin Wallet Adjustment');
    setWalletModalNode(null);
    setWalletAmount('');
    setWalletNote('');
  };

  const handlePvSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pvModalNode) return;
    const pv = parseInt(pvAmount, 10);
    if (isNaN(pv)) return;
    adjustMemberPv(pvModalNode.memberCode, pv);
    setPvModalNode(null);
    setPvAmount('');
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
      
      {/* Header and Controls */}
      <div className="p-5 border-b border-slate-100 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Users className="w-5 h-5 text-indigo-600" />
              <span>{language === 'th' ? 'จัดการสมาชิกและตำแหน่งทางธุรกิจ' : 'Member & Rank Administration'}</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              {language === 'th' ? `พบสมาชิกทั้งหมด ${filtered.length} รหัสในฐานข้อมูลระบบ` : `Showing ${filtered.length} registered members`}
            </p>
          </div>
        </div>

        {/* Filter bar */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[220px]">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={language === 'th' ? 'ค้นหารหัส TH... หรือชื่อสมาชิก' : 'Search code or name...'}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <select
            value={selectedRank}
            onChange={(e) => setSelectedRank(e.target.value)}
            className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">{language === 'th' ? 'ทุกตำแหน่ง (All Ranks)' : 'All Ranks'}</option>
            {ranks.map(r => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Members Directory Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold text-[11px] uppercase tracking-wider">
              <th className="py-2.5 px-4">{language === 'th' ? 'รหัสสมาชิก' : 'Member Code'}</th>
              <th className="py-2.5 px-4">{language === 'th' ? 'ชื่อ-นามสกุล' : 'Full Name'}</th>
              <th className="py-2.5 px-3">{language === 'th' ? 'ตำแหน่ง' : 'Rank'}</th>
              <th className="py-2.5 px-3 text-right">{language === 'th' ? 'PV ส่วนตัว' : 'Personal PV'}</th>
              <th className="py-2.5 px-3 text-right">{language === 'th' ? 'PV ซ้าย' : 'Left PV'}</th>
              <th className="py-2.5 px-3 text-right">{language === 'th' ? 'PV ขวา' : 'Right PV'}</th>
              <th className="py-2.5 px-4">{language === 'th' ? 'ผู้แนะนำ' : 'Sponsor'}</th>
              <th className="py-2.5 px-3 text-center">{language === 'th' ? 'สถานะ' : 'Status'}</th>
              <th className="py-2.5 px-4 text-center">{language === 'th' ? 'การจัดการ' : 'Actions'}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.map(member => (
              <tr key={member.id} className="hover:bg-slate-50/80 transition-colors h-12">
                <td className="py-2 px-4 font-mono font-bold text-indigo-700">
                  {member.memberCode}
                </td>
                <td className="py-2 px-4 font-medium text-slate-900 truncate max-w-[160px]">
                  {member.name}
                </td>
                <td className="py-2 px-3">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
                    {member.rank}
                  </span>
                </td>
                <td className="py-2 px-3 text-right font-mono font-semibold text-slate-800 tabular-nums">
                  {member.personalPv.toLocaleString()}
                </td>
                <td className="py-2 px-3 text-right font-mono text-slate-600 tabular-nums">
                  {member.leftPv.toLocaleString()}
                </td>
                <td className="py-2 px-3 text-right font-mono text-slate-600 tabular-nums">
                  {member.rightPv.toLocaleString()}
                </td>
                <td className="py-2 px-4 text-slate-600 truncate max-w-[130px]">
                  {member.sponsorName}
                </td>
                <td className="py-2 px-3 text-center">
                  <span className={`inline-flex items-center gap-1 text-[11px] font-semibold ${
                    member.isActive ? 'text-emerald-700' : 'text-slate-400'
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${member.isActive ? 'bg-emerald-500' : 'bg-slate-400'}`} />
                    {member.isActive ? 'Active' : 'Suspended'}
                  </span>
                </td>
                <td className="py-2 px-4 text-center">
                  <div className="flex items-center justify-center gap-1.5">
                    {/* Change Rank button */}
                    <button
                      onClick={() => {
                        setRankModalNode(member);
                        setNewRankVal(member.rank);
                      }}
                      className="p-1.5 bg-slate-100 hover:bg-indigo-50 text-slate-700 hover:text-indigo-700 rounded transition-colors cursor-pointer"
                      title={language === 'th' ? 'ปรับตำแหน่ง' : 'Change Rank'}
                    >
                      <Award className="w-3.5 h-3.5" />
                    </button>

                    {/* Adjust Wallet button */}
                    <button
                      onClick={() => {
                        setWalletModalNode(member);
                        setWalletAmount('');
                      }}
                      className="p-1.5 bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 rounded transition-colors cursor-pointer"
                      title={language === 'th' ? 'เติม/หักเงิน E-Wallet' : 'Adjust Wallet'}
                    >
                      <Wallet className="w-3.5 h-3.5" />
                    </button>

                    {/* Adjust PV button */}
                    <button
                      onClick={() => {
                        setPvModalNode(member);
                        setPvAmount('');
                      }}
                      className="p-1.5 bg-slate-100 hover:bg-purple-50 text-slate-700 hover:text-purple-700 rounded transition-colors cursor-pointer"
                      title={language === 'th' ? 'เติมคะแนน PV' : 'Add PV'}
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                    </button>

                    {/* Toggle Active/Ban */}
                    <button
                      onClick={() => toggleMemberStatus(member.memberCode)}
                      className={`p-1.5 rounded transition-colors cursor-pointer ${
                        member.isActive 
                          ? 'bg-slate-100 hover:bg-red-50 text-slate-600 hover:text-red-600' 
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                      title={member.isActive ? (language === 'th' ? 'ระงับชั่วคราว' : 'Suspend') : (language === 'th' ? 'เปิดใช้งาน' : 'Activate')}
                    >
                      {member.isActive ? <X className="w-3.5 h-3.5" /> : <Check className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal 1: Adjust Rank */}
      {rankModalNode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 text-slate-900 shadow-2xl border border-slate-200">
            <h3 className="font-bold text-base mb-1">
              {language === 'th' ? 'ปรับเปลี่ยนตำแหน่งทางธุรกิจ' : 'Adjust Member Business Rank'}
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              {rankModalNode.name} ({rankModalNode.memberCode})
            </p>

            <form onSubmit={handleRankSubmit} className="space-y-4 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  {language === 'th' ? 'เลือกตำแหน่งใหม่:' : 'Select New Rank:'}
                </label>
                <select
                  value={newRankVal}
                  onChange={(e) => setNewRankVal(e.target.value as MemberRank)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {ranks.map(r => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>

              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-1 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-bold"
                >
                  {language === 'th' ? 'บันทึกการปรับตำแหน่ง' : 'Update Rank'}
                </button>
                <button
                  type="button"
                  onClick={() => setRankModalNode(null)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg"
                >
                  {language === 'th' ? 'ยกเลิก' : 'Cancel'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal 2: Adjust Wallet */}
      {walletModalNode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 text-slate-900 shadow-2xl border border-slate-200">
            <h3 className="font-bold text-base mb-1">
              {language === 'th' ? 'ปรับยอดเงิน E-Wallet' : 'Adjust Member E-Wallet'}
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              {walletModalNode.name} ({walletModalNode.memberCode})
            </p>

            <form onSubmit={handleWalletSubmit} className="space-y-4 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  {language === 'th' ? 'จำนวนเงิน (+ เพื่อเติม, - เพื่อหัก):' : 'Amount (+ to credit, - to debit):'}
                </label>
                <input
                  type="number"
                  placeholder="เช่น 5000 หรือ -2000"
                  value={walletAmount}
                  onChange={(e) => setWalletAmount(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-mono text-base font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  {language === 'th' ? 'เหตุผลการปรับปรุง:' : 'Adjustment Reason:'}
                </label>
                <input
                  type="text"
                  placeholder={language === 'th' ? 'เช่น โบนัสโปรโมชั่นพิเศษ' : 'e.g. Special promotional bonus'}
                  value={walletNote}
                  onChange={(e) => setWalletNote(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>

              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-bold"
                >
                  {language === 'th' ? 'บันทึกยอดเงิน' : 'Update Wallet'}
                </button>
                <button
                  type="button"
                  onClick={() => setWalletModalNode(null)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg"
                >
                  {language === 'th' ? 'ยกเลิก' : 'Cancel'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal 3: Adjust PV */}
      {pvModalNode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 text-slate-900 shadow-2xl border border-slate-200">
            <h3 className="font-bold text-base mb-1">
              {language === 'th' ? 'เพิ่มคะแนน PV ส่วนตัว' : 'Credit Personal PV Points'}
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              {pvModalNode.name} ({pvModalNode.memberCode}) · ปัจจุบัน {pvModalNode.personalPv.toLocaleString()} PV
            </p>

            <form onSubmit={handlePvSubmit} className="space-y-4 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  {language === 'th' ? 'จำนวน PV ที่ต้องการเพิ่ม:' : 'PV Points to Add:'}
                </label>
                <input
                  type="number"
                  placeholder="เช่น 500"
                  value={pvAmount}
                  onChange={(e) => setPvAmount(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-mono text-base font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>

              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-1 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg font-bold"
                >
                  {language === 'th' ? 'เพิ่มคะแนน PV ทันที' : 'Credit PV'}
                </button>
                <button
                  type="button"
                  onClick={() => setPvModalNode(null)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg"
                >
                  {language === 'th' ? 'ยกเลิก' : 'Cancel'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
