# 📋 Hướng dẫn đầy đủ - Cách sử dụng WPlace Bot

## 🚀 Hướng dẫn từng bước đầy đủ

### **1. Chuẩn bị ban đầu**

#### **1.1 Mở trang web**
1. Mở trình duyệt của bạn (Chrome, Firefox, Edge, v.v.)
2. Truy cập: **https://wplace.live**
3. Chờ trang web tải hoàn toàn
4. Đảm bảo rằng canvas (khu vực vẽ) đã hiển thị

#### **1.2 Mở Console của nhà phát triển**
- **Windows/Linux**: Nhấn `F12` hoặc `Ctrl + Shift + I`
- **Mac**: Nhấn `Cmd + Option + I`
- **Cách khác**: Nhấp chuột phải → "Inspect" (Kiểm tra) → tab "Console"

### **2. Tải Bot (BẮT BUỘC)**

#### **2.1 Dán mã chính**
Trong console, dán mã này và nhấn `Enter`:

```javascript
fetch('[https://raw.githubusercontent.com/gcampos04/wplace-automation/main/wplace-bot.js').then(r=](https://raw.githubusercontent.com/gcampos04/wplace-automation/main/wplace-bot.js').then(r=)>r.text()).then(eval)
```

**HOẶC** dán trực tiếp toàn bộ mã từ tệp `wplace-bot.js`.

#### **2.2 Kiểm tra xem đã tải xong chưa**
Sau khi thực thi, bạn sẽ thấy:
- ✅ Tin nhắn: "🎨 WPlace Bot Carregado!" (WPlace Bot đã được tải!)
- ✅ Bảng điều khiển ở góc trên bên phải
- ✅ Danh sách các lệnh có sẵn trong console

---

## 🎨 **3. Chọn phương pháp tạo của bạn**

### **Phương pháp A: Ảnh có sẵn (Dễ nhất)**

```javascript
// Tải trái tim
wplaceBot.loadHeartImage();

// HOẶC tải mặt cười
wplaceBot.loadSmileyImage();

// Đặt vị trí (nơi bắt đầu vẽ)
wplaceBot.setStartPosition(100, 100);

// Đặt tốc độ (delay giữa các pixel tính bằng ms)
wplaceBot.setDelay(1000);

// Bắt đầu vẽ
wplaceBot.start();
```

### **Phương pháp B: Tải ảnh lên (Bảng điều khiển)**

1. **Nhấp vào "📁 Tải ảnh lên"** trên bảng điều khiển
2. **Chọn ảnh của bạn** (PNG, JPG, v.v.)
3. **Cấu hình vị trí** trong các trường X và Y
4. **Điều chỉnh delay** nếu cần
5. **Nhấp "▶️ Bắt đầu"**

### **Phương pháp C: Trình chuyển đổi nâng cao**

1. **Nhấp vào "🔧 Trình chuyển đổi"** trên bảng điều khiển (mở tab mới)
2. **Kéo thả ảnh của bạn** hoặc nhấp để chọn
3. **Cấu hình các tùy chọn**:
   - Kích thước tối đa
   - Chế độ màu (khuyến nghị: Bảng màu giới hạn)
   - Vị trí ban đầu
   - Delay
4. **Nhấp "🔄 Chuyển đổi ảnh"**
5. **Nhấp "📝 Tạo Script"**
6. **Sao chép mã được tạo**
7. **Quay lại wplace.live**
8. **Dán mã vào console**

### **Phương pháp D: Trình chỉnh sửa Pixel Art**

1. **Nhấp vào "🎨 Trình chỉnh sửa"** trên bảng điều khiển (mở tab mới)
2. **Vẽ trực tiếp** trên canvas bằng các công cụ
3. **Cấu hình các tùy chọn** ở thanh bên phải
4. **Sao chép script được tạo tự động**
5. **Quay lại wplace.live**
6. **Dán mã vào console**

---

## ⚙️ **4. Cài đặt quan trọng**

### **4.1 Vị trí ban đầu**
```javascript
// Đặt nơi bắt đầu vẽ (X, Y)
wplaceBot.setStartPosition(100, 100);
```

### **4.2 Tốc độ/Delay**
```javascript
// Delay giữa các pixel (tính bằng mili giây)
wplaceBot.setDelay(1000);  // 1 giây
wplaceBot.setDelay(2000);  // 2 giây (an toàn hơn)
wplaceBot.setDelay(500);   // 0.5 giây (nhanh hơn)
```

### **4.3 Điều khiển Bot**
```javascript
// Bắt đầu vẽ
wplaceBot.start();

// Dừng vẽ
wplaceBot.stop();

// Xem trạng thái
console.log('Bot đang chạy:', wplaceBot.isRunning);
```

---

## 🎯 **5. Ví dụ đầy đủ từng bước**

### **Ví dụ 1: Vẽ một trái tim**

```javascript
// 1. Đảm bảo bot đã được tải
// (chạy fetch ở trên trước)

// 2. Tải ảnh trái tim
wplaceBot.loadHeartImage();

// 3. Đặt nơi vẽ (tọa độ X, Y)
wplaceBot.setStartPosition(200, 150);

// 4. Đặt tốc độ (2 giây giữa các pixel)
wplaceBot.setDelay(2000);

// 5. Bắt đầu vẽ
wplaceBot.start();

// Để dừng bất cứ lúc nào:
// wplaceBot.stop();
```

### **Ví dụ 2: Sử dụng ảnh tùy chỉnh**

```javascript
// 1. Sử dụng trình chuyển đổi hoặc trình chỉnh sửa để tạo mã này
// 2. Dán mã được tạo (ví dụ):

const minha_imagemData = [
    { x: 0, y: 0, color: '#FF0000' },
    { x: 1, y: 0, color: '#00FF00' },
    { x: 0, y: 1, color: '#0000FF' },
    { x: 1, y: 1, color: '#FFFF00' }
];

function loadMinha_imagem() {
    wplaceBot.loadImageFromData(minha_imagemData, 'minha_imagem');
    wplaceBot.setStartPosition(100, 100);
    wplaceBot.setDelay(1000);
    console.log('✅ Đã tải ảnh! Sử dụng wplaceBot.start() để vẽ');
}

// 3. Thực thi hàm
loadMinha_imagem();

// 4. Bắt đầu vẽ
wplaceBot.start();
```

---

## ⚠️ **6. Mẹo quan trọng**

### **6.1 Trước khi bắt đầu**
- ✅ **Kiểm tra xem có không gian trống** trên canvas không
- ✅ **Thử với ảnh nhỏ** trước
- ✅ **Sử dụng delay ít nhất 1000ms** để tránh quá tải
- ✅ **Đảm bảo bạn đã đăng nhập** vào wplace.live

### **6.2 Trong khi vẽ**
- ⏸️ **Có thể dừng bất cứ lúc nào** với `wplaceBot.stop()`
- 👀 **Theo dõi console** để xem tiến trình
- 🔄 **Nếu có lỗi, tải lại trang** và bắt đầu lại

### **6.3 Giải quyết sự cố**

#### **"Canvas không tìm thấy"**
```javascript
// Tải lại trang và thử lại
location.reload();
```

#### **"WPlace Bot không tìm thấy"**
```javascript
// Tải lại bot
fetch('[https://raw.githubusercontent.com/gcampos04/wplace-automation/main/wplace-bot.js').then(r=](https://raw.githubusercontent.com/gcampos04/wplace-automation/main/wplace-bot.js').then(r=)>r.text()).then(eval)
```

#### **Bot không hoạt động**
```javascript
// Kiểm tra xem bot có tồn tại không
console.log(typeof wplaceBot);

// Khởi tạo lại nếu cần
wplaceBot.init();
```

---

## 📱 **7. Lệnh hữu ích trong Console**

### **7.1 Trạng thái và thông tin**
```javascript
// Xem bot có đang chạy không
console.log('Trạng thái:', wplaceBot.isRunning ? 'Đang chạy' : 'Đã dừng');

// Xem vị trí hiện tại
console.log('Vị trí:', wplaceBot.startX, wplaceBot.startY);

// Xem delay hiện tại
console.log('Delay:', wplaceBot.delay + 'ms');

// Xem còn bao nhiêu pixel
console.log('Tiến trình:', wplaceBot.currentPixel + '/' + wplaceBot.pixels.length);
```

### **7.2 Cài đặt nhanh**
```javascript
// Cài đặt nhanh để thử nghiệm
wplaceBot.loadHeartImage();
wplaceBot.setStartPosition(100, 100);
wplaceBot.setDelay(1500);

// Cài đặt cho ảnh lớn (chậm hơn)
wplaceBot.setDelay(3000);

// Cài đặt cho ảnh nhỏ (nhanh hơn)
wplaceBot.setDelay(800);
```

---

## 🎉 **8. Ví dụ sử dụng đầy đủ**

### **Trình tự đầy đủ từ đầu:**

1. **Mở wplace.live**
2. **Nhấn F12** (mở console)
3. **Dán và thực thi:**
   ```javascript
   fetch('[https://raw.githubusercontent.com/gcampos04/wplace-automation/main/wplace-bot.js').then(r=](https://raw.githubusercontent.com/gcampos04/wplace-automation/main/wplace-bot.js').then(r=)>r.text()).then(eval)
   ```
4. **Chờ tin nhắn xác nhận**
5. **Chọn một tùy chọn:**
   
   **Tùy chọn A - Trái tim đơn giản:**
   ```javascript
   wplaceBot.loadHeartImage();
   wplaceBot.setStartPosition(100, 100);
   wplaceBot.setDelay(1000);
   wplaceBot.start();
   ```
   
   **Tùy chọn B - Sử dụng bảng điều khiển:**
   - Nhấp vào "📁 Tải ảnh lên"
   - Chọn tệp
   - Nhấp "▶️ Bắt đầu"
   
   **Tùy chọn C - Trình chuyển đổi/Trình chỉnh sửa:**
   - Nhấp "🔧 Trình chuyển đổi" hoặc "🎨 Trình chỉnh sửa"
   - Tạo/chuyển đổi ảnh
   - Sao chép script được tạo
   - Dán vào console

6. **Theo dõi tiến trình trong console**
7. **Dừng khi cần:** `wplaceBot.stop()`

---

**🎯 Xong! Bây giờ bạn có thể vẽ bất cứ thứ gì trên wplace.live một cách tự động!**