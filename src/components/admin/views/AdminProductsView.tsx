import React, { useState } from 'react';
import { 
  Package, 
  Plus, 
  Search, 
  Edit3, 
  Sparkles, 
  Check, 
  X,
  Layers
} from 'lucide-react';
import { useMlm } from '../../../context/MlmContext';
import { Product } from '../../../types/mlm';

export const AdminProductsView: React.FC = () => {
  const { 
    language, 
    products, 
    addProduct, 
    updateProductStock, 
    showToast 
  } = useMlm();

  const [search, setSearch] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingStockProduct, setEditingStockProduct] = useState<Product | null>(null);
  const [newStockVal, setNewStockVal] = useState('');

  // New Product Form State
  const [newCode, setNewCode] = useState('');
  const [newNameTh, setNewNameTh] = useState('');
  const [newCategory, setNewCategory] = useState<'health' | 'beauty' | 'beverage' | 'package'>('health');
  const [newMemberPrice, setNewMemberPrice] = useState('');
  const [newRetailPrice, setNewRetailPrice] = useState('');
  const [newPv, setNewPv] = useState('');
  const [newStock, setNewStock] = useState('100');

  const filtered = products.filter(p => 
    !search.trim() || 
    p.code.toLowerCase().includes(search.toLowerCase()) || 
    p.nameTh.toLowerCase().includes(search.toLowerCase())
  );

  const handleStockSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingStockProduct) return;
    const val = parseInt(newStockVal, 10);
    if (isNaN(val)) return;
    updateProductStock(editingStockProduct.id, val);
    setEditingStockProduct(null);
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCode.trim() || !newNameTh.trim()) return;

    addProduct({
      code: newCode.trim().toUpperCase(),
      name: newNameTh.trim(),
      nameTh: newNameTh.trim(),
      category: newCategory,
      memberPrice: parseFloat(newMemberPrice) || 1000,
      retailPrice: parseFloat(newRetailPrice) || 1500,
      pv: parseInt(newPv, 10) || 200,
      stock: parseInt(newStock, 10) || 100,
      imageUrl: '/src/assets/images/mlm_product_supplement_1791310634193.jpg',
      description: 'New official product item.',
      descriptionTh: 'สินค้าใหม่ในระบบจัดจำหน่ายอย่างเป็นทางการ'
    });

    setShowAddModal(false);
    setNewCode('');
    setNewNameTh('');
    setNewMemberPrice('');
    setNewRetailPrice('');
    setNewPv('');
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
      
      {/* Header */}
      <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Package className="w-5 h-5 text-indigo-600" />
            <span>{language === 'th' ? 'จัดการแคตตาล็อกสินค้า & สต็อกคงคลัง' : 'Products & Stock Inventory Control'}</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            {language === 'th' ? `พบสินค้าทั้งหมด ${filtered.length} รายการ` : `Showing ${filtered.length} active catalog products`}
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer self-start sm:self-auto shadow-2xs"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>{language === 'th' ? 'เพิ่มสินค้าใหม่' : 'Add New Product'}</span>
        </button>
      </div>

      {/* Filter */}
      <div className="p-4 border-b border-slate-100 bg-slate-50/60">
        <div className="relative max-w-sm">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder={language === 'th' ? 'ค้นหารหัสสินค้า หรือชื่อสินค้า...' : 'Search product code or name...'}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold text-[11px] uppercase tracking-wider">
              <th className="py-2.5 px-4">{language === 'th' ? 'รูปภาพ' : 'Image'}</th>
              <th className="py-2.5 px-4">{language === 'th' ? 'รหัสสินค้า' : 'SKU'}</th>
              <th className="py-2.5 px-4">{language === 'th' ? 'ชื่อสินค้า' : 'Product Name'}</th>
              <th className="py-2.5 px-3">{language === 'th' ? 'หมวดหมู่' : 'Category'}</th>
              <th className="py-2.5 px-3 text-right">{language === 'th' ? 'ราคาสมาชิก' : 'Member Price'}</th>
              <th className="py-2.5 px-3 text-right">{language === 'th' ? 'ราคาปลีก' : 'Retail Price'}</th>
              <th className="py-2.5 px-3 text-right">{language === 'th' ? 'คะแนน PV' : 'PV Points'}</th>
              <th className="py-2.5 px-3 text-right">{language === 'th' ? 'สต็อกคงเหลือ' : 'Stock'}</th>
              <th className="py-2.5 px-4 text-center">{language === 'th' ? 'การจัดการ' : 'Action'}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.map(p => (
              <tr key={p.id} className="hover:bg-slate-50/80 transition-colors h-14">
                <td className="py-2 px-4">
                  <img
                    src={p.imageUrl}
                    alt={p.name}
                    referrerPolicy="no-referrer"
                    className="w-10 h-10 rounded-lg object-cover bg-slate-100 border border-slate-200"
                  />
                </td>
                <td className="py-2 px-4 font-mono font-bold text-slate-900">
                  {p.code}
                </td>
                <td className="py-2 px-4 font-semibold text-slate-900 truncate max-w-[200px]">
                  {p.nameTh}
                </td>
                <td className="py-2 px-3">
                  <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-700 capitalize">
                    {p.category}
                  </span>
                </td>
                <td className="py-2 px-3 text-right font-mono font-bold text-slate-900 tabular-nums">
                  ฿{p.memberPrice.toLocaleString()}
                </td>
                <td className="py-2 px-3 text-right font-mono text-slate-500 tabular-nums">
                  ฿{p.retailPrice.toLocaleString()}
                </td>
                <td className="py-2 px-3 text-right font-mono font-bold text-blue-600 tabular-nums">
                  +{p.pv} PV
                </td>
                <td className="py-2 px-3 text-right font-mono font-bold tabular-nums">
                  <span className={p.stock < 200 ? 'text-amber-600' : 'text-slate-900'}>
                    {p.stock} ชิ้น
                  </span>
                </td>
                <td className="py-2 px-4 text-center">
                  <button
                    onClick={() => {
                      setEditingStockProduct(p);
                      setNewStockVal(p.stock.toString());
                    }}
                    className="px-2.5 py-1 bg-slate-100 hover:bg-indigo-50 text-slate-700 hover:text-indigo-700 rounded text-[11px] font-medium transition-colors cursor-pointer"
                  >
                    {language === 'th' ? 'ปรับสต็อก' : 'Edit Stock'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Stock Modal */}
      {editingStockProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 text-slate-900 shadow-2xl border border-slate-200">
            <h3 className="font-bold text-base mb-1">
              {language === 'th' ? 'ปรับปรุงจำนวนสต็อกสินค้า' : 'Update Stock Quantity'}
            </h3>
            <p className="text-xs text-slate-500 mb-4 truncate font-medium">
              {editingStockProduct.nameTh} ({editingStockProduct.code})
            </p>

            <form onSubmit={handleStockSubmit} className="space-y-4 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  {language === 'th' ? 'จำนวนสต็อกคงเหลือใหม่ (ชิ้น):' : 'New Stock Inventory:'}
                </label>
                <input
                  type="number"
                  min="0"
                  value={newStockVal}
                  onChange={(e) => setNewStockVal(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-mono text-base font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-1 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-bold"
                >
                  {language === 'th' ? 'บันทึกสต็อก' : 'Update'}
                </button>
                <button
                  type="button"
                  onClick={() => setEditingStockProduct(null)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg"
                >
                  {language === 'th' ? 'ยกเลิก' : 'Cancel'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add New Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 text-slate-900 shadow-2xl border border-slate-200">
            <h3 className="font-bold text-base mb-1">
              {language === 'th' ? 'เพิ่มสินค้าใหม่เข้าแคตตาล็อก' : 'Add New Product to Catalog'}
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              {language === 'th' ? 'สินค้าใหม่จะแสดงในร้านค้าสำหรับสมาชิกทันที' : 'The product will be instantly available in the store.'}
            </p>

            <form onSubmit={handleAddSubmit} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    {language === 'th' ? 'รหัสสินค้า (SKU):' : 'SKU Code:'}
                  </label>
                  <input
                    type="text"
                    placeholder="เช่น OMC-HERB-05"
                    value={newCode}
                    onChange={(e) => setNewCode(e.target.value)}
                    className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg font-mono uppercase focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    {language === 'th' ? 'หมวดหมู่:' : 'Category:'}
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="health">Health / อาหารเสริม</option>
                    <option value="beauty">Beauty / ความงาม</option>
                    <option value="beverage">Beverage / เครื่องดื่ม</option>
                    <option value="package">Package / ชุดสมัคร</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  {language === 'th' ? 'ชื่อสินค้าภาษาไทย:' : 'Product Name:'}
                </label>
                <input
                  type="text"
                  placeholder="เช่น โอเอ็มซี ชาเขียวสกัดเข้มข้น"
                  value={newNameTh}
                  onChange={(e) => setNewNameTh(e.target.value)}
                  className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    {language === 'th' ? 'ราคาสมาชิก:' : 'Member Price:'}
                  </label>
                  <input
                    type="number"
                    placeholder="1250"
                    value={newMemberPrice}
                    onChange={(e) => setNewMemberPrice(e.target.value)}
                    className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    {language === 'th' ? 'ราคาปลีก:' : 'Retail Price:'}
                  </label>
                  <input
                    type="number"
                    placeholder="1850"
                    value={newRetailPrice}
                    onChange={(e) => setNewRetailPrice(e.target.value)}
                    className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    {language === 'th' ? 'คะแนน PV:' : 'PV Points:'}
                  </label>
                  <input
                    type="number"
                    placeholder="250"
                    value={newPv}
                    onChange={(e) => setNewPv(e.target.value)}
                    className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  {language === 'th' ? 'สต็อกเริ่มต้น:' : 'Initial Stock:'}
                </label>
                <input
                  type="number"
                  value={newStock}
                  onChange={(e) => setNewStock(e.target.value)}
                  className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-bold"
                >
                  {language === 'th' ? 'บันทึกสินค้าใหม่' : 'Create Product'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
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
