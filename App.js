import React, { useState, useEffect } from 'react';
import { ShoppingCart, ChevronRight, Plus, Minus, X, Clock, CheckCircle2, Loader2, Coffee, UtensilsCrossed, Beer, ChevronLeft, Info, Home, AlertCircle } from 'lucide-react';

// หมายเลข LIFF ID จาก LINE Developers Console
const LIFF_ID = "YOUR_LIFF_ID_HERE"; 
const SCRIPT_URL = "YOUR_GOOGLE_APPS_SCRIPT_URL_HERE";

const App = () => {
  const [view, setView] = useState('menu');
  const [activeCategory, setActiveCategory] = useState('sandwich');
  const [selectedItem, setSelectedItem] = useState(null);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({ name: '', roomNumber: '', time: '', note: '' });
  const [showError, setShowError] = useState(null);
  const [isLiffReady, setIsLiffReady] = useState(false);

  // Initialize LIFF
  useEffect(() => {
    const initLiff = async () => {
      try {
        if (window.liff) {
          await window.liff.init({ liffId: LIFF_ID });
          setIsLiffReady(true);
        }
      } catch (error) {
        console.error("LIFF Initialization failed", error);
      }
    };
    initLiff();
  }, []);

  const extraOptions = [
    { id: 'crab', label: 'ปูอัด+ไข่กุ้ง', price: 5 },
    { id: 'pork', label: 'หมูหยอง', price: 5 },
    { id: 'sausage', label: 'ไส้กรอก', price: 5 },
    { id: 'bologna', label: 'โบโลน่า', price: 5 },
    { id: 'corn', label: 'คอร์นสลัด', price: 5 },
  ];

  const [itemOptions, setItemOptions] = useState({
    size: 'XL',
    selectedExtras: []
  });

  const menus = {
    sandwich: [
      { id: 1, name: 'ไส้กรอก+โบโลน่า+ไข่ดาว', description: 'เครื่องแน่นจัดเต็ม เลือกขนาดและเพิ่มไส้พิเศษได้ตามใจชอบ', image: 'https://human-white-pdserlloro.edgeone.app/20.jpg' },
      { id: 2, name: 'ไก่หยองพริกเผา+ไข่ดาว', description: 'ไก่หยองเกรดเอคลุกน้ำพริกเผารสเข้มข้น ท็อปด้วยไข่ดาวสดใหม่', image: 'https://human-white-pdserlloro.edgeone.app/21.jpg' },
      { id: 3, name: 'ปูอัด+ไข่กุ้ง+โบโลน่า', description: 'ปูอัดฉีกผสมไข่กุ้งเคี้ยวกรุบ และโบโลน่าแผ่นหนานุ่ม', image: 'https://human-white-pdserlloro.edgeone.app/22.jpg' },
      { id: 4, name: 'คอร์นสลัด+โบโลน่า', description: 'ข้าวโพดหวานสลัดรสละมุน ตัดรสด้วยโบโลน่าพริกหรือธรรมดา', image: 'https://human-white-pdserlloro.edgeone.app/23.jpg' },
      { id: 5, name: 'คอร์นสลัด+ไข่ดาว', description: 'เมนูยอดฮิตสำหรับคนชอบความนุ่มนวล ข้าวโพดหวานและไข่ดาวทอด', image: 'https://human-white-pdserlloro.edgeone.app/24.jpg' }
    ],
    drink: [
      { id: 101, name: 'อเมริกาโน่', price: 35, description: 'กาแฟดำรสเข้มข้น หอมกรุ่น สดชื่นเย็นชื่นใจ', image: 'https://corresponding-ivory-q2zxljjfbp.edgeone.app/2.jpg' },
      { id: 102, name: 'อเมริกาโน่ส้ม', price: 35, description: 'กาแฟดำผสมน้ำส้ม สดชื่นลงตัว', image: 'https://corresponding-ivory-q2zxljjfbp.edgeone.app/3.jpg' },
      { id: 103, name: 'อเมริกาโน่น้ำผึ้งมะนาว', price: 35, description: 'ความเปรี้ยวหวานที่เข้ากับกาแฟเข้มๆ', image: 'https://corresponding-ivory-q2zxljjfbp.edgeone.app/4.jpg' },
      { id: 104, name: 'อเมริกาโน่น้ำมะพร้าว', price: 35, description: 'หอมหวานละมุนจากน้ำมะพร้าวแท้', image: 'https://corresponding-ivory-q2zxljjfbp.edgeone.app/5.jpg' },
      { id: 105, name: 'อเมริกาโน่คาราเมล', price: 35, description: 'กาแฟดำเพิ่มความหอมหวานจากคาราเมล', image: 'https://corresponding-ivory-q2zxljjfbp.edgeone.app/6.jpg' },
      { id: 106, name: 'เอสเพรสโซ่', price: 35, description: 'เข้มข้นถึงใจ สไตล์คอกาแฟ', image: 'https://corresponding-ivory-q2zxljjfbp.edgeone.app/7.jpg' },
      { id: 107, name: 'มอคค่า', price: 35, description: 'ส่วนผสมที่ลงตัวของกาแฟและโกโก้', image: 'https://corresponding-ivory-q2zxljjfbp.edgeone.app/8.jpg' },
      { id: 108, name: 'ลาเต้', price: 35, description: 'กาแฟรสนุ่มผสมนมสด', image: 'https://corresponding-ivory-q2zxljjfbp.edgeone.app/9.jpg' },
      { id: 109, name: 'คาราเมลมัคคิอาโต้', price: 35, description: 'หอมหวานคาราเมล แยกชั้นสวยงาม', image: 'https://corresponding-ivory-q2zxljjfbp.edgeone.app/10.jpg' },
      { id: 110, name: 'คาปูชิโน่', price: 35, description: 'กาแฟฟองนุ่มละมุนลิ้น', image: 'https://corresponding-ivory-q2zxljjfbp.edgeone.app/11.jpg' },
      { id: 111, name: 'ชานมเย็น', price: 30, description: 'ชาไทยสีส้ม หอมมันสไตล์ไทยแท้', image: 'https://corresponding-ivory-q2zxljjfbp.edgeone.app/12.jpg' },
      { id: 112, name: 'ชาเขียวนม', price: 30, description: 'ชาเขียวคัดสรรอย่างดี หอมนุ่ม', image: 'https://corresponding-ivory-q2zxljjfbp.edgeone.app/13.jpg' },
      { id: 113, name: 'โกโก้เย็น', price: 30, description: 'โกโก้เข้มข้น หวานมันกำลังดี', image: 'https://corresponding-ivory-q2zxljjfbp.edgeone.app/14.jpg' },
      { id: 114, name: 'นม(ชมพู)เย็น', price: 30, description: 'เมนูยอดฮิต สีสวย หอมหวานเย็นชื่นใจ', image: 'https://corresponding-ivory-q2zxljjfbp.edgeone.app/15.jpg' },
      { id: 115, name: 'ชามะนาว', price: 30, description: 'เปรี้ยวหวานสดชื่น ดับกระหาย', image: 'https://corresponding-ivory-q2zxljjfbp.edgeone.app/16.jpg' },
      { id: 116, name: 'ชานมนมโอ๊ต', price: 35, description: 'ชาไทยหอมๆ ผสมนมโอ๊ตเพื่อสุขภาพ', image: 'https://corresponding-ivory-q2zxljjfbp.edgeone.app/17.jpg' },
      { id: 117, name: 'ชาเขียวนมโอ๊ต', price: 35, description: 'ชาเขียวนุ่มๆ เข้ากันได้ดีกับนมโอ๊ต', image: 'https://corresponding-ivory-q2zxljjfbp.edgeone.app/18.jpg' },
      { id: 118, name: 'โกโก้นมโอ๊ต', price: 35, description: 'โกโก้เข้มข้นที่ใช้นมโอ๊ตแทนนมวัว', image: 'https://corresponding-ivory-q2zxljjfbp.edgeone.app/19.jpg' },
      { id: 119, name: 'กาแฟนมโอ๊ต', price: 35, description: 'ลาเต้นมโอ๊ต หอมมัน ทางเลือกคนรักสุขภาพ', image: 'https://corresponding-ivory-q2zxljjfbp.edgeone.app/20.jpg' }
    ]
  };

  const calculateItemPrice = (item, options) => {
    if (activeCategory === 'drink') return item.price;
    let basePrice = options.size === 'XL' ? 50 : 30;
    let extraPrice = options.selectedExtras.length * 5;
    return basePrice + extraPrice;
  };

  const toggleExtra = (extraId) => {
    setItemOptions(prev => {
      const isSelected = prev.selectedExtras.includes(extraId);
      if (isSelected) {
        return { ...prev, selectedExtras: prev.selectedExtras.filter(id => id !== extraId) };
      } else {
        return { ...prev, selectedExtras: [...prev.selectedExtras, extraId] };
      }
    });
  };

  const addToCart = (product) => {
    const finalPrice = calculateItemPrice(product, itemOptions);
    const extrasKey = [...itemOptions.selectedExtras].sort().join(',');
    const cartIdPrefix = activeCategory === 'sandwich' ? 'sand' : 'drink';
    const cartItemId = `${cartIdPrefix}-${product.id}-${itemOptions.size}-${extrasKey}`;

    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.cartId === cartItemId);
      if (existingItem) {
        return prevCart.map(item =>
          item.cartId === cartItemId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { 
        ...product, 
        cartId: cartItemId, 
        quantity: 1, 
        price: finalPrice,
        category: activeCategory,
        options: activeCategory === 'sandwich' ? { ...itemOptions } : null 
      }];
    });
    
    setItemOptions({ size: 'XL', selectedExtras: [] });
    setView('menu');
  };

  const updateQuantity = (cartId, delta) => {
    setCart(prevCart => {
      return prevCart.map(item => {
        if (item.cartId === cartId) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : item;
        }
        return item;
      });
    });
  };

  const removeFromCart = (cartId) => {
    setCart(cart.filter(item => item.cartId !== cartId));
  };

  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleSubmitOrder = async () => {
    if (!customerInfo.name || !customerInfo.time) {
      setShowError("กรุณากรอกชื่อและเวลาที่ต้องการรับสินค้า");
      return;
    }

    setLoading(true);
    const orderId = "KL-" + Math.random().toString(36).substr(2, 9).toUpperCase(); 
    
    // สร้างสรุปรายการสำหรับส่งไป Database
    const itemsSummary = cart.map(i => {
      let optText = "";
      if (i.options && i.category === 'sandwich') {
        const extraNames = i.options.selectedExtras.map(id => extraOptions.find(opt => opt.id === id)?.label).filter(Boolean);
        const extraString = extraNames.length > 0 ? `+พิเศษ:${extraNames.join(',')}` : '';
        optText = ` [${i.options.size}${extraString}]`;
      }
      return `${i.name}${optText} (x${i.quantity})`;
    }).join(", ");

    // สร้างสรุปรายการแบบสวยๆ สำหรับส่งเข้า LINE Chat
    const chatMessage = `📋 ออเดอร์ใหม่: ${orderId}\n` +
                        `👤 ลูกค้า: ${customerInfo.name}\n` +
                        `🏠 หมายเลขห้อง: ${customerInfo.roomNumber || '-'}\n` +
                        `⏰ เวลารับ: ${customerInfo.time} น.\n` +
                        `------------------\n` +
                        cart.map(i => {
                          let opt = i.category === 'sandwich' ? `(${i.options.size})` : '';
                          return `• ${i.name} ${opt} x ${i.quantity}`;
                        }).join('\n') +
                        `\n------------------\n` +
                        `💰 ยอดรวม: ${totalPrice} บาท\n` +
                        `📝 หมายเหตุ: ${customerInfo.note || '-'}`;

    const orderData = {
      orderId: orderId,
      customerName: customerInfo.name,
      roomNumber: customerInfo.roomNumber || '-',
      items: itemsSummary,
      totalPrice: totalPrice,
      orderType: 'รับเองที่ร้านกาแฟพี่หมวย',
      pickupTime: customerInfo.time,
      address: customerInfo.note || '-'
    };

    try {
      // 1. ส่งข้อมูลไป Google Sheets
      await fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });

      // 2. ส่งข้อความเข้าแชท LINE (ถ้าเปิดผ่าน LINE Browser)
      if (window.liff && window.liff.isInClient()) {
        await window.liff.sendMessages([
          {
            type: 'text',
            text: chatMessage
          }
        ]);
      }

      setLoading(false);
      setView('success');
    } catch (error) {
      console.error("Error submitting order:", error);
      setShowError("เกิดข้อผิดพลาดในการส่งข้อมูล กรุณาลองใหม่อีกครั้ง");
      setLoading(false);
    }
  };

  const renderIcon = (image, name) => {
    if (image.startsWith('http') || image.includes('/')) {
      return (
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover rounded-2xl" 
          onError={(e) => { e.target.src = 'https://via.placeholder.com/150?text=Food'; }}
        />
      );
    }
    return <span className="text-4xl">{image}</span>;
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800 pb-24">
      {/* Header */}
      <header className="bg-orange-500 text-white p-6 rounded-b-[40px] shadow-lg sticky top-0 z-50">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-black tracking-tight">ครัวคุณหลวง</h1>
            <p className="text-xs opacity-90 font-light text-orange-100 italic">แซนวิชไส้ทะลัก & เครื่องดื่มเย็นชื่นใจ</p>
          </div>
          <div className="bg-white/20 p-2.5 rounded-2xl relative active:scale-90 transition-transform" onClick={() => setView('cart')}>
            <ShoppingCart size={24} className="text-white" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-white text-orange-600 text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold shadow-md">
                {totalItems}
              </span>
            )}
          </div>
        </div>
      </header>

      {/* Error Modal */}
      {showError && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 w-full max-w-xs shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="flex flex-col items-center text-center">
              <div className="bg-red-50 text-red-500 p-4 rounded-full mb-4">
                <AlertCircle size={32} />
              </div>
              <p className="font-bold text-gray-900">{showError}</p>
              <button 
                onClick={() => setShowError(null)}
                className="mt-6 w-full bg-orange-500 text-white py-3 rounded-2xl font-bold shadow-lg shadow-orange-100"
              >
                เข้าใจแล้ว
              </button>
            </div>
          </div>
        </div>
      )}

      <main className="p-4">
        {view === 'menu' && (
          <div className="animate-in fade-in duration-500">
            <div className="flex gap-2 mb-6 bg-gray-100 p-1.5 rounded-2xl">
              <button 
                onClick={() => setActiveCategory('sandwich')}
                className={`flex-1 py-3 rounded-xl flex items-center justify-center gap-2 font-bold text-sm transition-all ${activeCategory === 'sandwich' ? 'bg-white text-orange-600 shadow-sm' : 'text-gray-400'}`}
              >
                <UtensilsCrossed size={18} /> แซนวิช
              </button>
              <button 
                onClick={() => setActiveCategory('drink')}
                className={`flex-1 py-3 rounded-xl flex items-center justify-center gap-2 font-bold text-sm transition-all ${activeCategory === 'drink' ? 'bg-white text-orange-600 shadow-sm' : 'text-gray-400'}`}
              >
                <Beer size={18} /> เครื่องดื่ม
              </button>
            </div>

            <h2 className="text-lg font-bold px-1 text-gray-800 mb-4 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-orange-500 rounded-full"></span>
              {activeCategory === 'sandwich' ? 'เลือกเมนูแซนวิช' : 'เลือกเมนูเครื่องดื่ม'}
            </h2>

            <div className="grid grid-cols-1 gap-4">
              {menus[activeCategory].map((item) => (
                <div key={item.id} className="bg-white rounded-3xl p-4 shadow-sm border border-gray-100 flex gap-4 active:scale-95 transition-transform" onClick={() => { setSelectedItem(item); setView('detail'); }}>
                  <div className="w-24 h-24 bg-orange-50 rounded-2xl flex items-center justify-center shadow-inner shrink-0 overflow-hidden">
                    {renderIcon(item.image, item.name)}
                  </div>
                  <div className="flex-1 flex flex-col justify-between py-1">
                    <div>
                      <h3 className="font-bold text-sm leading-tight text-gray-900">{item.name}</h3>
                      <p className="text-[10px] text-gray-400 mt-1 line-clamp-2">{item.description}</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-orange-600 font-bold text-lg">
                        {activeCategory === 'sandwich' ? '30 - 50.-' : `${item.price}.-`}
                      </span>
                      <div className="bg-orange-500 text-white p-1.5 rounded-xl shadow-md"><Plus size={18} /></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {view === 'detail' && selectedItem && (
          <div className="animate-in slide-in-from-bottom duration-400 pb-10">
            <button onClick={() => setView('menu')} className="mb-6 flex items-center gap-2 text-gray-400 font-bold text-sm">
              <ChevronLeft size={20} /> กลับไปหน้าเมนู
            </button>

            <div className="bg-white p-8 rounded-[40px] shadow-sm border border-gray-100">
              <div className="w-48 h-48 mx-auto bg-orange-50 rounded-[40px] flex items-center justify-center mb-8 drop-shadow-xl overflow-hidden text-7xl">
                {renderIcon(selectedItem.image, selectedItem.name)}
              </div>
              <h2 className="text-2xl font-black mb-2 text-gray-900 leading-tight">{selectedItem.name}</h2>
              <p className="text-gray-400 text-sm mb-8 leading-relaxed font-medium">{selectedItem.description}</p>

              {activeCategory === 'sandwich' && (
                <div className="space-y-8">
                  <div className="space-y-3">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">เลือกขนาด (Size)</p>
                    <div className="grid grid-cols-2 gap-3">
                      <button 
                        onClick={() => setItemOptions({...itemOptions, size: 'S'})}
                        className={`p-4 rounded-3xl border-2 transition-all flex flex-col items-center gap-1 ${itemOptions.size === 'S' ? 'border-orange-500 bg-orange-50 text-orange-600' : 'border-gray-100 text-gray-400'}`}
                      >
                        <span className="font-black text-lg text-inherit">Size S</span>
                        <span className="text-xs opacity-70">สามเหลี่ยม (30.-)</span>
                      </button>
                      <button 
                        onClick={() => setItemOptions({...itemOptions, size: 'XL'})}
                        className={`p-4 rounded-3xl border-2 transition-all flex flex-col items-center gap-1 ${itemOptions.size === 'XL' ? 'border-orange-500 bg-orange-50 text-orange-600' : 'border-gray-100 text-gray-400'}`}
                      >
                        <span className="font-black text-lg text-inherit">Size XL</span>
                        <span className="text-xs opacity-70">ไส้ทะลัก (50.-)</span>
                      </button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">เพิ่มไส้พิเศษ (ไส้ละ 5.-)</p>
                    <div className="grid grid-cols-1 gap-2">
                      {extraOptions.map((option) => (
                        <label 
                          key={option.id}
                          className={`flex justify-between items-center p-4 rounded-2xl border-2 transition-all cursor-pointer ${itemOptions.selectedExtras.includes(option.id) ? 'border-orange-200 bg-orange-50 text-orange-700' : 'border-gray-50 text-gray-500'}`}
                          onClick={(e) => {
                            e.preventDefault();
                            toggleExtra(option.id);
                          }}
                        >
                          <div className="flex items-center gap-3">
                             <div className={`w-5 h-5 rounded-md border flex items-center justify-center ${itemOptions.selectedExtras.includes(option.id) ? 'bg-orange-500 border-orange-500' : 'border-gray-300'}`}>
                                {itemOptions.selectedExtras.includes(option.id) && <CheckCircle2 size={14} className="text-white" />}
                             </div>
                             <span className="font-bold text-sm">{option.label}</span>
                          </div>
                          <span className="text-xs font-black">+5.-</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-10 pt-6 border-t border-gray-50 flex items-center justify-between">
                <div className="flex flex-col">
                   <p className="text-[10px] font-black text-gray-300 uppercase">ราคาสุทธิ</p>
                   <p className="text-3xl font-black text-orange-600 leading-none mt-1">{calculateItemPrice(selectedItem, itemOptions)}.-</p>
                </div>
                <button 
                  onClick={() => addToCart(selectedItem)}
                  className="bg-orange-500 text-white px-8 py-5 rounded-[24px] font-black text-lg shadow-xl shadow-orange-100 active:scale-95 transition-all flex items-center gap-2"
                >
                  <Plus size={24} /> เพิ่มลงตะกร้า
                </button>
              </div>
            </div>
          </div>
        )}

        {view === 'cart' && (
          <div className="space-y-6 animate-in slide-in-from-right duration-300">
            <h2 className="text-xl font-bold flex items-center gap-2 px-1 text-gray-800"><ShoppingCart /> ตะกร้าของคุณ</h2>
            
            {cart.length === 0 ? (
               <div className="text-center py-20 bg-white rounded-[40px] border border-dashed border-gray-200">
                  <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300">
                    <ShoppingCart size={40} />
                  </div>
                  <p className="text-gray-400 font-medium">ยังไม่มีรายการสั่งซื้อ</p>
                  <button onClick={() => setView('menu')} className="mt-4 text-orange-500 font-bold px-6 py-2 bg-orange-50 rounded-full">เลือกเมนูเลย</button>
               </div>
            ) : (
              <>
                <div className="space-y-3">
                  {cart.map((item) => (
                    <div key={item.cartId} className="bg-white p-4 rounded-3xl shadow-sm flex flex-col gap-3 border border-gray-50">
                      <div className="flex justify-between items-start">
                        <div className="flex gap-4 items-center">
                          <span className="w-14 h-14 bg-gray-50 flex items-center justify-center rounded-2xl overflow-hidden shrink-0 text-3xl">
                            {renderIcon(item.image, item.name)}
                          </span>
                          <div>
                            <p className="text-sm font-bold text-gray-900 leading-tight">{item.name}</p>
                            {item.options && item.category === 'sandwich' && (
                              <div className="flex flex-wrap gap-1 mt-1">
                                <span className="text-[10px] bg-gray-100 px-2 py-0.5 rounded-full text-gray-500 font-bold">Size: {item.options.size}</span>
                                {item.options.selectedExtras.map(id => (
                                  <span key={id} className="text-[10px] bg-orange-50 px-2 py-0.5 rounded-full text-orange-600 font-bold">
                                    +{extraOptions.find(opt => opt.id === id)?.label}
                                  </span>
                                ))}
                              </div>
                            )}
                            <p className="text-xs text-orange-500 font-bold mt-1">{(item.price * item.quantity)}.-</p>
                          </div>
                        </div>
                        <button onClick={() => removeFromCart(item.cartId)} className="text-gray-300 p-2"><X size={20} /></button>
                      </div>
                      
                      <div className="flex justify-end items-center gap-4 pt-3 border-t border-gray-50">
                        <div className="flex items-center gap-4 bg-gray-100 rounded-2xl p-1 px-2">
                          <button onClick={() => updateQuantity(item.cartId, -1)} className="text-gray-400 hover:text-orange-500 p-1"><Minus size={14} /></button>
                          <span className="text-sm font-black w-4 text-center">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.cartId, 1)} className="text-orange-500 p-1"><Plus size={14} /></button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-white p-6 rounded-[32px] shadow-sm space-y-4 border border-orange-50">
                  <div className="bg-orange-50 p-4 rounded-2xl flex items-start gap-4 border border-orange-100 mb-2">
                    <Coffee className="text-orange-500 shrink-0" size={24} />
                    <div>
                        <p className="text-sm font-bold text-orange-800">รับที่ร้านกาแฟพี่หมวย</p>
                        <p className="text-[10px] text-orange-600 leading-tight mt-1">
                          *รบกวนมารับสินค้าตามเวลานัดหมายนะคะ
                        </p>
                    </div>
                  </div>

                  <div className="space-y-4 pt-2">
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-gray-400 uppercase ml-1">ชื่อลูกค้า</label>
                      <input 
                        type="text" 
                        placeholder="กรุณากรอกชื่อของคุณ" 
                        className="w-full p-4 bg-gray-50 rounded-2xl border-none text-sm focus:ring-2 focus:ring-orange-500 outline-none"
                        value={customerInfo.name}
                        onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
                      />
                    </div>
                    
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-gray-400 uppercase ml-1">หมายเลขห้อง</label>
                      <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-2xl">
                        <Home size={18} className="text-gray-400" />
                        <input 
                          type="text" 
                          placeholder="ระบุหมายเลขห้อง (ถ้ามี)" 
                          className="bg-transparent border-none text-sm flex-1 text-gray-800 focus:outline-none"
                          value={customerInfo.roomNumber}
                          onChange={(e) => setCustomerInfo({...customerInfo, roomNumber: e.target.value})}
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-gray-400 uppercase ml-1">เวลามารับสินค้า</label>
                      <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-2xl">
                        <Clock size={18} className="text-gray-400" />
                        <input 
                          type="time" 
                          className="bg-transparent border-none text-sm flex-1 text-gray-800 focus:outline-none font-bold"
                          value={customerInfo.time}
                          onChange={(e) => setCustomerInfo({...customerInfo, time: e.target.value})}
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-gray-400 uppercase ml-1">หมายเหตุ</label>
                      <textarea 
                        placeholder="เช่น หวานน้อย, แยกน้ำแข็ง..." 
                        className="w-full p-4 bg-gray-50 rounded-2xl border-none text-sm h-20 focus:ring-2 focus:ring-orange-500 outline-none"
                        value={customerInfo.note}
                        onChange={(e) => setCustomerInfo({...customerInfo, note: e.target.value})}
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-orange-600 text-white p-8 rounded-[40px] shadow-2xl shadow-orange-200">
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex flex-col">
                      <span className="opacity-70 text-[10px] font-black uppercase tracking-widest text-orange-100">Total Price</span>
                      <span className="text-4xl font-black tracking-tighter">{totalPrice}.-</span>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-bold opacity-70">รวม {totalItems} รายการ</p>
                    </div>
                  </div>
                  <button 
                    disabled={loading || cart.length === 0}
                    onClick={handleSubmitOrder}
                    className="w-full bg-white text-orange-600 py-5 rounded-[24px] font-black text-xl shadow-xl active:scale-95 transition-all flex items-center justify-center gap-3"
                  >
                    {loading ? <Loader2 className="animate-spin" /> : <>ยืนยันออเดอร์ <ChevronRight /></>}
                  </button>
                </div>
              </>
            )}
          </div>
        )}

        {view === 'success' && (
          <div className="flex flex-col items-center justify-center py-20 text-center animate-in zoom-in duration-500 px-6">
            <div className="bg-green-100 text-green-500 p-8 rounded-[40px] mb-8 shadow-sm">
              <CheckCircle2 size={70} />
            </div>
            <h2 className="text-3xl font-black text-gray-900 leading-tight">บันทึกออเดอร์แล้ว!</h2>
            <p className="text-sm text-gray-500 mt-4 leading-relaxed font-medium">รบกวนมารับสินค้าที่ร้านกาแฟพี่หมวยตามเวลานัดหมายนะคะ</p>
            
            <div className="mt-10 bg-white p-6 rounded-[32px] border border-gray-100 w-full shadow-sm text-left">
              <p className="text-xl font-black text-gray-800">☕ ร้านกาแฟพี่หมวย</p>
              <div className="mt-4 pt-4 border-t border-gray-50 text-xs space-y-2">
                <p className="flex justify-between text-gray-500"><span>ชื่อผู้สั่ง:</span> <span className="text-gray-900 font-bold">{customerInfo.name}</span></p>
                <p className="flex justify-between text-gray-500"><span>หมายเลขห้อง:</span> <span className="text-gray-900 font-bold">{customerInfo.roomNumber || '-'}</span></p>
                <p className="flex justify-between text-gray-500"><span>เวลานัดรับ:</span> <span className="text-gray-900 font-bold">{customerInfo.time} น.</span></p>
                <p className="flex justify-between text-gray-500 pt-2 border-t border-dashed border-gray-100"><span>ยอดรวมทั้งสิ้น:</span> <span className="text-orange-600 font-black text-lg">{totalPrice}.-</span></p>
              </div>
            </div>

            <button 
               onClick={() => {
                 if (window.liff && window.liff.isInClient()) {
                   window.liff.closeWindow(); // ปิดหน้าจอแล้วกลับไปที่แชท
                 } else {
                   setSelectedItem(null); 
                   setCart([]); 
                   setView('menu');
                 }
               }} 
               className="mt-12 text-orange-600 font-black border-b-4 border-orange-500 pb-1 text-lg"
            >
              สั่งออเดอร์ใหม่ / กลับไปที่แชท
            </button>
          </div>
        )}
      </main>

      {/* Mini Cart Button */}
      {view === 'menu' && totalItems > 0 && (
        <div className="fixed bottom-6 left-4 right-4 animate-in slide-in-from-bottom duration-500">
          <button 
            onClick={() => setView('cart')}
            className="w-full bg-orange-600 text-white p-5 rounded-[30px] shadow-2xl flex justify-between items-center ring-8 ring-white/50"
          >
            <div className="flex items-center gap-4">
               <div className="bg-white/20 p-2.5 rounded-2xl"><ShoppingCart size={22} /></div>
               <span className="font-black text-lg leading-none">{totalItems} รายการ</span>
            </div>
            <div className="flex items-center gap-3 bg-white/10 p-2 px-4 rounded-2xl">
               <span className="font-black text-xl">{totalPrice}.-</span>
               <ChevronRight size={20} />
            </div>
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
