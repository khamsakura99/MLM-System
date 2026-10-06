import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Search, 
  Truck, 
  CheckCircle, 
  Clock, 
  ExternalLink,
  ChevronDown,
  Edit2
} from 'lucide-react';
import { useMlm } from '../../../context/MlmContext';
import { Order } from '../../../types/mlm';

export const AdminOrdersView: React.FC = () => {
  const { language, orders, updateOrderStatus, showToast } = useMlm();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Edit Tracking Modal State
  const [editOrder, setEditOrder] = useState<Order | null>(null);
  const [newStatus, setNewStatus] = useState<'paid' | 'shipping' | 'completed'>('shipping');
  const [newTracking, setNewTracking] = useState('');

  const filtered = orders.filter(o => {
    const matchSearch = !search.trim() || 
      o.orderNumber.toLowerCase().includes(search.toLowerCase()) || 
      o.shippingAddress.fullName.toLowerCase().includes(search.toLowerCase()) ||
      (o.trackingNumber && o.trackingNumber.toLowerCase().includes(search.toLowerCase()));
    const matchStatus = statusFilter === 'all' || o.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const handleUpdateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editOrder) return;
    updateOrderStatus(editOrder.id, newStatus, newTracking || editOrder.trackingNumber);
    setEditOrder(null);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
      
      {/* Header */}
      <div className="p-5 border-b border-slate-100 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-indigo-600" />
              <span>{language === 'th' ? 'จัดการคำสั่งซื้อและการจัดส่งพัสดุ' : 'Order Fulfillment Administration'}</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              {language === 'th' ? `พบคำสั่งซื้อทั้งหมด ${filtered.length} รายการ` : `Showing ${filtered.length} customer orders`}
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[220px]">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={language === 'th' ? 'ค้นหาเลขที่บิล, ชื่อผู้รับ หรือเลขพัสดุ...' : 'Search invoice, recipient, or tracking...'}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg text-xs">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-3 py-1 rounded transition-colors ${statusFilter === 'all' ? 'bg-white font-semibold text-slate-900 shadow-2xs' : 'text-slate-600'}`}
            >
              {language === 'th' ? 'ทั้งหมด' : 'All'}
            </button>
            <button
              onClick={() => setStatusFilter('shipping')}
              className={`px-3 py-1 rounded transition-colors ${statusFilter === 'shipping' ? 'bg-white font-semibold text-blue-700 shadow-2xs' : 'text-slate-600'}`}
            >
              {language === 'th' ? 'กำลังจัดส่ง' : 'Shipping'}
            </button>
            <button
              onClick={() => setStatusFilter('completed')}
              className={`px-3 py-1 rounded transition-colors ${statusFilter === 'completed' ? 'bg-white font-semibold text-emerald-700 shadow-2xs' : 'text-slate-600'}`}
            >
              {language === 'th' ? 'จัดส่งสำเร็จ' : 'Completed'}
            </button>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold text-[11px] uppercase tracking-wider">
              <th className="py-2.5 px-4">{language === 'th' ? 'เลขที่คำสั่งซื้อ' : 'Order ID'}</th>
              <th className="py-2.5 px-4">{language === 'th' ? 'วัน-เวลา' : 'Date'}</th>
              <th className="py-2.5 px-4">{language === 'th' ? 'ผู้สั่ง / ผู้รับ' : 'Customer'}</th>
              <th className="py-2.5 px-3">{language === 'th' ? 'ประเภทบิล' : 'Type'}</th>
              <th className="py-2.5 px-3 text-right">{language === 'th' ? 'ยอดเงิน' : 'Amount'}</th>
              <th className="py-2.5 px-3 text-right">{language === 'th' ? 'คะแนน PV' : 'PV'}</th>
              <th className="py-2.5 px-4">{language === 'th' ? 'ขนส่ง / เลขพัสดุ' : 'Tracking'}</th>
              <th className="py-2.5 px-3 text-center">{language === 'th' ? 'สถานะ' : 'Status'}</th>
              <th className="py-2.5 px-4 text-center">{language === 'th' ? 'การจัดการ' : 'Action'}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.map(order => (
              <tr key={order.id} className="hover:bg-slate-50/80 transition-colors h-12">
                <td className="py-2 px-4 font-mono font-bold text-slate-900">
                  {order.orderNumber}
                </td>
                <td className="py-2 px-4 font-mono text-slate-500 text-[11px] whitespace-nowrap">
                  {order.date}
                </td>
                <td className="py-2 px-4 font-medium text-slate-900 truncate max-w-[150px]">
                  {order.shippingAddress.fullName}
                  <span className="block text-[10px] text-slate-400 font-mono">{order.shippingAddress.phone}</span>
                </td>
                <td className="py-2 px-3">
                  <span className="px-1.5 py-0.2 rounded bg-slate-100 text-slate-700 text-[10px] font-medium">
                    {order.orderType.toUpperCase()}
                  </span>
                </td>
                <td className="py-2 px-3 text-right font-mono font-bold text-slate-900 tabular-nums">
                  ฿{order.totalAmount.toLocaleString()}
                </td>
                <td className="py-2 px-3 text-right font-mono font-semibold text-blue-600 tabular-nums">
                  +{order.totalPv.toLocaleString()}
                </td>
                <td className="py-2 px-4">
                  <span className="font-mono text-slate-700 font-medium block">
                    {order.trackingNumber || '-'}
                  </span>
                  <span className="text-[10px] text-slate-400">
                    {order.shippingCompany || 'Flash Express'}
                  </span>
                </td>
                <td className="py-2 px-3 text-center">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    order.status === 'completed'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-blue-50 text-blue-700 border border-blue-200'
                  }`}>
                    {order.status === 'completed' ? (language === 'th' ? 'สำเร็จ' : 'Done') : (language === 'th' ? 'จัดส่ง' : 'Transit')}
                  </span>
                </td>
                <td className="py-2 px-4 text-center">
                  <button
                    onClick={() => {
                      setEditOrder(order);
                      setNewStatus(order.status);
                      setNewTracking(order.trackingNumber || '');
                    }}
                    className="px-2.5 py-1 bg-slate-100 hover:bg-indigo-50 text-slate-700 hover:text-indigo-700 rounded text-[11px] font-medium transition-colors flex items-center justify-center gap-1 mx-auto cursor-pointer"
                  >
                    <Edit2 className="w-3 h-3" />
                    <span>{language === 'th' ? 'อัปเดต' : 'Update'}</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Fulfillment Modal */}
      {editOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 text-slate-900 shadow-2xl border border-slate-200">
            <h3 className="font-bold text-base mb-1">
              {language === 'th' ? 'อัปเดตสถานะการจัดส่งพัสดุ' : 'Update Order Fulfillment'}
            </h3>
            <p className="text-xs text-slate-500 mb-4 font-mono">
              #{editOrder.orderNumber} · {editOrder.shippingAddress.fullName}
            </p>

            <form onSubmit={handleUpdateSubmit} className="space-y-4 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  {language === 'th' ? 'สถานะคำสั่งซื้อ:' : 'Order Status:'}
                </label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value as any)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="shipping">{language === 'th' ? 'กำลังจัดส่ง (In Transit)' : 'In Transit'}</option>
                  <option value="completed">{language === 'th' ? 'จัดส่งสำเร็จเรียบร้อย (Delivered)' : 'Delivered / Completed'}</option>
                  <option value="paid">{language === 'th' ? 'ชำระแล้ว รอแพ็คของ (Pending Pack)' : 'Pending Packing'}</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  {language === 'th' ? 'หมายเลขติดตามพัสดุ (Tracking No):' : 'Tracking Number:'}
                </label>
                <input
                  type="text"
                  placeholder="เช่น TH01928472910B"
                  value={newTracking}
                  onChange={(e) => setNewTracking(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-mono text-slate-900 uppercase focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-1 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-bold"
                >
                  {language === 'th' ? 'บันทึกการจัดส่ง' : 'Save Status'}
                </button>
                <button
                  type="button"
                  onClick={() => setEditOrder(null)}
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
