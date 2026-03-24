const { useState, useEffect } = React;

// หมายเหตุ: เมื่อคุณได้ LIFF ID จากหน้า LINE Developers แล้ว 
// ให้เอามาเปลี่ยนตรง "YOUR_LIFF_ID_HERE" นะครับ
const LIFF_ID = "YOUR_LIFF_ID_HERE"; 

function App() {
  const [order, setOrder] = useState([]);
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [loading, setLoading] = useState(true);

  const menuItems = [
    { id: 1, name: "แซนวิชโบราณ", price: 35, icon: "🥪" },
    { id: 2, name: "แซนวิชแฮมชีส", price: 45, icon: "🧀" },
    { id: 3, name: "กาแฟเย็น (พี่หมวย)", price: 40, icon: "☕" },
    { id: 4, name: "ชาไทย", price: 35, icon: "🧋" }
  ];

  useEffect(() => {
    // ฟังก์ชันเชื่อมต่อกับ LINE LIFF
    const initLiff = async () => {
      try {
        await liff.init({ liffId: LIFF_ID });
        if (liff.isLoggedIn()) {
          const profile = await liff.getProfile();
          setName(profile.displayName);
        } else {
          liff.login();
        }
      } catch (err) {
        console.error("LIFF Initialization failed", err);
      } finally {
        setLoading(false);
      }
    };
    
    // ตรวจสอบว่ามีสคริปต์ liff หรือยัง
    const script = document.createElement("script");
    script.src = "https://static.line-scdn.net/liff/edge/2/sdk.js";
    script.onload = initLiff;
    document.head.appendChild(script);
  }, []);

  const addToCart = (item) => {
    setOrder([...order, item]);
  };

  const submitOrder = async () => {
    if (!name || !room || order.length === 0) {
      alert("กรุณากรอกชื่อ หมายเลขห้อง และเลือกอาหารด้วยครับ");
      return;
    }

    const total = order.reduce((sum, item) => sum + item.price, 0);
    const orderDetails = order.map(item => `- ${item.name}`).join("\n");
    
    const message = `🍴 *ออเดอร์ใหม่จากครัวคุณหลวง*\n👤 คุณ: ${name}\n🏢 ห้อง: ${room}\n\nรายการ:\n${orderDetails}\n\n💰 รวมทั้งหมด: ${total} บาท`;

    try {
      if (liff.isInClient()) {
        await liff.sendMessages([{ type: "text", text: message }]);
        alert("ส่งออเดอร์เรียบร้อยแล้วครับ!");
        liff.closeWindow();
      } else {
        alert("แอปจะส่งข้อความได้เมื่อเปิดใน LINE เท่านั้นครับ\n\n" + message);
      }
    } catch (err) {
      alert("เกิดข้อผิดพลาดในการส่งข้อมูลครับ");
    }
  };

  if (loading) return <div className="p-10 text-center">กำลังโหลดระบบครัวคุณหลวง...</div>;

  return (
    <div className="max-w-md mx-auto bg-amber-50 min-h-screen pb-20 shadow-lg font-sans">
      <header className="bg-amber-800 text-white p-6 text-center shadow-md">
        <h1 className="text-2xl font-bold">🏠 ครัวคุณหลวง</h1>
        <p className="text-sm opacity-80">สั่งง่าย ส่งไว ถึงหน้าห้อง</p>
      </header>

      <main className="p-4">
        <section className="bg-white p-4 rounded-xl shadow-sm mb-6">
          <h2 className="font-semibold mb-3 border-b pb-2">📋 ข้อมูลผู้สั่ง</h2>
          <div className="space-y-3">
            <input 
              type="text" placeholder="ชื่อลูกค้า" 
              className="w-full border p-2 rounded-lg bg-gray-50"
              value={name} onChange={(e) => setName(e.target.value)}
            />
            <input 
              type="text" placeholder="หมายเลขห้อง" 
              className="w-full border p-2 rounded-lg bg-gray-50"
              value={room} onChange={(e) => setRoom(e.target.value)}
            />
          </div>
        </section>

        <section className="grid grid-cols-2 gap-3">
          {menuItems.map(item => (
            <button 
              key={item.id} onClick={() => addToCart(item)}
              className="bg-white p-3 rounded-xl shadow-sm hover:shadow-md border-2 border-transparent active:border-amber-500 transition-all"
            >
              <div className="text-3xl mb-1">{item.icon}</div>
              <div className="font-medium text-sm">{item.name}</div>
              <div className="text-amber-700 font-bold">{item.price}.-</div>
            </button>
          ))}
        </section>
      </main>

      <footer className="fixed bottom-0 max-w-md w-full bg-white border-t p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
        <div className="flex justify-between items-center mb-3">
          <span className="font-semibold text-gray-600 text-sm">เลือกแล้ว {order.length} รายการ</span>
          <span className="text-xl font-bold text-amber-900">
            {order.reduce((sum, item) => sum + item.price, 0)} บาท
          </span>
        </div>
        <button 
          onClick={submitOrder}
          className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 rounded-full shadow-lg transition-colors"
        >
          ✅ ยืนยันสั่งอาหาร
        </button>
      </footer>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
