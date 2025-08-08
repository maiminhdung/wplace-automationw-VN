# WPlace Bot - Tự động hóa Vẽ tranh

Bot để tự động hóa việc tạo các bức vẽ trên trang web wplace.live.

## 🚀 Cách Sử dụng (Từng bước)

### **Bước 1: Chuẩn bị**
1. **Mở** [wplace.live](https://wplace.live) trên trình duyệt
2. **Nhấn** `F12` để mở Console (hoặc Ctrl+Shift+I)
3. **Nhấp** vào tab "Console"

### **Bước 2: Tải Bot** ⚠️ **BẮT BUỘC**
**Dán mã này vào console và nhấn Enter:**
```javascript
fetch('[https://raw.githubusercontent.com/maiminhdung/wplace-automation/main/wplace-bot.js').then(r=](https://raw.githubusercontent.com/maiminhdung/wplace-automation/main/wplace-bot.js').then(r=)>r.text()).then(eval)
```

**Chờ đến khi thấy:**
- ✅ Tin nhắn "🎨 WPlace Bot Carregado!" (WPlace Bot đã được tải!)
- ✅ Bảng điều khiển ở góc trên bên phải

### **Bước 3: Chọn Phương thức của bạn**

#### **🖼️ Lựa chọn A: Tải lên Trực tiếp (Dễ nhất)**
1. Nhấp **"📁 Tải ảnh lên"** trên bảng điều khiển
2. Chọn ảnh của bạn
3. Cấu hình vị trí (X, Y)
4. Nhấp **"▶️ Bắt đầu"**

#### **🔧 Lựa chọn B: Trình chuyển đổi Nâng cao**
1. Nhấp **"🔧 Trình chuyển đổi"** trên bảng điều khiển
2. Kéo thả ảnh của bạn
3. Cấu hình các tùy chọn
4. Tạo và sao chép script
5. Dán vào console

#### **🎨 Lựa chọn C: Trình chỉnh sửa Pixel Art**
1. Nhấp **"🎨 Trình chỉnh sửa"** trên bảng điều khiển
2. Vẽ trực tiếp
3. Sao chép script được tạo
4. Dán vào console

#### **❤️ Lựa chọn D: Thử nghiệm Nhanh**
```javascript
wplaceBot.loadHeartImage();
wplaceBot.setStartPosition(100, 100);
wplaceBot.start();
```

### **Điều khiển Cơ bản**
```javascript
wplaceBot.start();    // Bắt đầu vẽ
wplaceBot.stop();     // Dừng vẽ
wplaceBot.setStartPosition(x, y);  // Đặt vị trí
wplaceBot.setDelay(1000);          // Đặt tốc độ
```

## 🎮 Cách Sử dụng Bot

### Bảng điều khiển

Bot tạo ra một bảng điều khiển ở góc trên bên phải với:

- **Vị trí X/Y**: Xác định nơi bức vẽ sẽ bắt đầu
- **Delay**: Thời gian giữa mỗi pixel (tính bằng mili giây)
- **Các nút ảnh**: Tải các ảnh được định sẵn (Trái tim, Mặt cười)
- **Tải ảnh lên**: Cho phép tải lên ảnh của riêng bạn (PNG, JPG, v.v.)
- **Trình chuyển đổi**: Mở công cụ chuyển đổi ảnh nâng cao
- **Bắt đầu/Dừng**: Điều khiển việc thực thi của bot

### 🖼️ Nhập ảnh của riêng bạn

#### Phương pháp 1: Tải lên Trực tiếp trên Bảng điều khiển
1. Nhấp vào "📁 Tải ảnh lên" trên bảng điều khiển
2. Chọn ảnh của bạn (PNG, JPG, GIF)
3. Ảnh sẽ tự động được thay đổi kích thước và tải lên

#### Phương pháp 2: Trình chuyển đổi Nâng cao
1. Nhấp vào "🔧 Trình chuyển đổi" trên bảng điều khiển hoặc mở `image-converter.html`
2. Kéo thả ảnh của bạn hoặc nhấp để chọn
3. Cấu hình các tùy chọn:
   - **Kích thước tối đa**: Chiều rộng và chiều cao tính bằng pixel
   - **Chế độ màu**: Bảng màu giới hạn, màu đầy đủ hoặc thang độ xám
   - **Vị trí ban đầu**: Nơi bắt đầu vẽ
   - **Delay**: Thời gian giữa mỗi pixel
4. Nhấp vào "🔄 Chuyển đổi ảnh" để xem trước
5. Nhấp vào "📝 Tạo Script" để lấy mã
6. Sao chép và dán script vào console của wplace.live

#### 🆕 Phương pháp 3: Trình chỉnh sửa Pixel Art
1. Nhấp vào "🎨 Trình chỉnh sửa" trên bảng điều khiển hoặc mở `pixel-editor.html`
2. **Vẽ trực tiếp** trên màn hình bằng cách sử dụng:
   - **🖌️ Cọ vẽ**: Vẽ các pixel riêng lẻ
   - **🧽 Tẩy**: Xóa các pixel
   - **🪣 Thùng sơn**: Tô đầy các khu vực
   - **🎯 Công cụ lấy màu**: Chọn các màu hiện có
   - **📏 Đường kẻ**: Vẽ các đường thẳng
   - **⬜ Hình chữ nhật**: Tạo các hình chữ nhật
3. **Cấu hình canvas**: Kích thước, màu sắc, thu phóng
4. **Xem trước trong thời gian thực**: Lưới, thống kê, xem trước
5. **Tự động tạo script** khi bạn vẽ
6. **Xuất** ra nhiều định dạng hoặc lưu dưới dạng PNG

### Lệnh trong Console

```javascript
// Đặt vị trí ban đầu (x, y)
wplaceBot.setStartPosition(100, 100);

// Đặt độ trễ giữa các lần nhấp (tính bằng ms)
wplaceBot.setDelay(2000);

// Tải các ảnh được định sẵn
wplaceBot.loadHeartImage();    // Trái tim 7x7
wplaceBot.loadSmileyImage();   // Mặt cười 7x7

// Tải ảnh từ dữ liệu tùy chỉnh
const minhosPixels = [
    { x: 0, y: 0, color: '#FF0000' },
    { x: 1, y: 0, color: '#00FF00' },
    // ... thêm nhiều pixel khác
];
wplaceBot.loadImageFromData(minhosPixels, 'Ảnh của tôi');

// Tải ảnh từ URL (data URL hoặc URL bên ngoài)
wplaceBot.loadImageFromUrl('data:image/png;base64,...', 50, 50);

// Điều khiển bot
wplaceBot.start();  // Bắt đầu
wplaceBot.stop();   // Dừng
```

## 🎨 Các ảnh có sẵn

### Ảnh được định sẵn

- **❤️ Trái tim**: 7x7 pixel màu đỏ
- **😊 Mặt cười**: 7x7 pixel màu vàng với khuôn mặt cười

### 🆕 Ảnh của riêng bạn

Bây giờ bạn có thể nhập bất kỳ ảnh nào! Bot hỗ trợ:

- **Định dạng**: PNG, JPG, JPEG, GIF
- **Tự động thay đổi kích thước**: Ảnh của bạn được thay đổi kích thước để phù hợp nhất
- **Tối ưu hóa màu sắc**: Chuyển đổi sang các màu có sẵn trên wplace.live
- **Ba chế độ màu**:
  - **Bảng màu giới hạn**: Chỉ sử dụng các màu phổ biến của wplace
  - **Màu đầy đủ**: Giữ lại màu gốc (có thể không khớp chính xác)
  - **Thang độ xám**: Chuyển đổi sang đen trắng

### Cách chuyển đổi ảnh của bạn

1. **Mở Trình chuyển đổi**: Sử dụng `image-converter.html` hoặc nhấp vào nút "🔧 Trình chuyển đổi" trên bảng điều khiển
2. **Nhập ảnh của bạn**: Kéo thả hoặc chọn tệp
3. **Cấu hình các tùy chọn**:
   - Kích thước tối đa (khuyến nghị: 50x50 cho ảnh nhỏ)
   - Chế độ màu (khuyến nghị: Bảng màu giới hạn)
   - Vị trí ban đầu trên canvas
   - Delay giữa các pixel
4. **Xem trước kết quả**: Xem ảnh của bạn sẽ trông như thế nào sau khi được pixel hóa
5. **Tạo Script**: Lấy mã sẵn sàng để sử dụng
6. **Sử dụng trên WPlace**: Dán script vào console của wplace.live

### ⚠️ Mẹo quan trọng

- **Kích thước**: Ảnh quá lớn sẽ mất nhiều thời gian để vẽ
- **Delay**: Sử dụng ít nhất 1000ms giữa các pixel để tránh quá tải
- **Màu sắc**: Chế độ "Bảng màu giới hạn" đảm bảo khả năng tương thích tốt nhất
- **Vị trí**: Kiểm tra xem có đủ không gian trên canvas trước khi bắt đầu không

### Trái tim (7x7)
```
⬜🟥🟥⬜🟥🟥⬜
🟥🟥🟥🟥🟥🟥🟥
🟥🟥🟥🟥🟥🟥🟥
🟥🟥🟥🟥🟥🟥🟥
⬜🟥🟥🟥🟥🟥⬜
⬜⬜🟥🟥🟥⬜⬜
⬜⬜⬜🟥⬜⬜⬜
```

### Mặt cười (7x7)
```
⬜⬜🟨🟨🟨⬜⬜
⬜🟨🟨🟨🟨🟨⬜
🟨🟨⬛🟨⬛🟨🟨
🟨🟨🟨🟨🟨🟨🟨
🟨⬛🟨🟨🟨⬛🟨
⬜🟨⬛⬛⬛🟨⬜
⬜⬜🟨🟨🟨⬜⬜
```

## 🔧 Tạo ảnh của riêng bạn

### Phương pháp Đơn giản

```javascript
// Tạo một mảng màu (ví dụ 7x7)
const minhaImagem = [
    '#FF0000', '#FF0000', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FF0000', '#FF0000',
    '#FF0000', '#FFFFFF', '#FF0000', '#FFFFFF', '#FF0000', '#FFFFFF', '#FF0000',
    // ... tiếp tục cho 49 pixel (7x7)
];

// Tải ảnh
wplaceBot.loadSimpleImage(minhaImagem, 7, 7);
```

### Phương pháp với Emoji

```javascript
const design = [
    '🟦', '🟦', '🟦',
    '🟦', '🟨', '🟦',
    '🟦', '🟦', '🟦'
];

const colorMap = {
    '🟦': '#0000FF',
    '🟨': '#FFFF00'
};

const imageData = design.map(emoji => colorMap[emoji]);
wplaceBot.loadSimpleImage(imageData, 3, 3);
```

## ⚠️ Cảnh báo Quan trọng

1. **Sử dụng có trách nhiệm**: Tôn trọng cộng đồng wplace.live
2. **Delay phù hợp**: Sử dụng delay ít nhất 1000ms để không làm quá tải máy chủ
3. **Kích thước ảnh**: Bắt đầu với ảnh nhỏ (tối đa 10x10)
4. **Tọa độ**: Kiểm tra xem tọa độ của bạn có vượt ra ngoài giới hạn của canvas không

## 🛠️ Các tính năng của Bot

- ✅ Giao diện đồ họa tích hợp
- ✅ Tự động phát hiện canvas
- ✅ Tự động phát hiện bảng màu
- ✅ Tự động chọn màu gần nhất
- ✅ Kiểm soát tốc độ (delay)
- ✅ Các ảnh được định sẵn
- ✅ Hệ thống dừng khẩn cấp
- ✅ Ghi lại chi tiết các hành động

## 🐛 Giải quyết sự cố

### "Canvas không tìm thấy"
- Đảm bảo bạn đang ở trên trang web wplace.live
- Chờ trang web tải hoàn toàn
- Tải lại trang và thử lại

### "Màu không được chọn"
- Trang web có thể đã thay đổi cấu trúc của bảng màu
- Thử chọn màu thủ công trước

### Bot không hoạt động
- Kiểm tra xem có trình chặn script nào không
- Thử tải lại script
- Kiểm tra console để tìm lỗi

## 📝 Giấy phép

Script này được cung cấp "nguyên trạng" cho mục đích giáo dục. Sử dụng với rủi ro của riêng bạn.

## 📁 Các tệp của Dự án

- `wplace-bot.js` - Script chính của bot với tất cả các chức năng
- `wplace-bot-minified.js` - Phiên bản thu gọn của bot
- `image-converter.html` - **🔧 Trình chuyển đổi ảnh web** (Giao diện đầy đủ)
- `pixel-editor.html` - **🆕 Trình chỉnh sửa Pixel Art** (Vẽ trực tiếp trên màn hình!)
- `demo-converter.html` - Trang demo và hướng dẫn
- `custom-images.md` - Ví dụ và hướng dẫn cho ảnh tùy chỉnh
- `README.md` - Tệp này với tất cả các hướng dẫn

## 🆕 Tính năng mới - Trình chỉnh sửa Pixel Art

### 🎨 Trình chỉnh sửa Pixel Art Đầy đủ
Tệp `pixel-editor.html` là một trình chỉnh sửa hoàn chỉnh nơi bạn có thể **vẽ trực tiếp**:

#### **🛠️ Công cụ có sẵn**:
- **🖌️ Cọ vẽ**: Vẽ từng pixel
- **🧽 Tẩy**: Xóa các pixel cụ thể
- **🪣 Thùng sơn**: Tô đầy các khu vực bằng một màu
- **🎯 Công cụ lấy màu**: Chọn các màu hiện có trong bức vẽ
- **📏 Đường kẻ**: Vẽ các đường thẳng hoàn hảo
- **⬜ Hình chữ nhật**: Tạo các hình chữ nhật

#### **🎨 Hệ thống Màu sắc**:
- **Bảng màu 30 màu** được tối ưu hóa cho wplace.live
- **Công cụ chọn màu tùy chỉnh** cho các màu cụ thể
- **Xem trước thời gian thực** của tất cả các màu

#### **📐 Điều khiển Canvas**:
- **Kích thước có thể cấu hình**: Từ 5x5 đến 100x100 pixel
- **Thu phóng có thể điều chỉnh**: Từ 1x đến 5x để có độ chính xác
- **Lưới tùy chọn**: Để xem tốt hơn
- **Lịch sử hoàn chỉnh**: Hoàn tác/Làm lại không giới hạn

#### **📊 Các tính năng Nâng cao**:
- **Nhập ảnh**: Kéo thả các ảnh hiện có
- **Xuất PNG**: Lưu tác phẩm của bạn ở độ phân giải cao
- **Thống kê thời gian thực**: Số pixel, màu sắc, thời gian ước tính
- **Nhiều định dạng script**: Script đầy đủ, hàm hoặc dữ liệu thô

#### **⚡ Tạo tự động**:
- **Script được tạo trong thời gian thực** khi bạn vẽ
- **Ba định dạng đầu ra**:
  - Script đầy đủ sẵn sàng để sử dụng
  - Hàm tùy chỉnh
  - Dữ liệu thô của ảnh
- **Sao chép bằng một cú nhấp chuột** vào clipboard

---

**🎉 Bây giờ bạn có 3 cách khác nhau để tạo vẽ lên wplace.live:**

### 1. 📁 **Tải lên Trực tiếp** - *Nhanh và Đơn giản*
- Nhấp vào "📁 Tải ảnh lên" trên bảng điều khiển
- Chọn bất kỳ ảnh nào
- Sẵn sàng để sử dụng!

### 2. 🔧 **Trình chuyển đổi Nâng cao** - *Nâng cao*
- Nhập bất kỳ định dạng ảnh nào
- Cấu hình kích thước, màu sắc và tối ưu hóa
- Xem trước đầy đủ trước khi tạo
- Nhiều định dạng đầu ra

### 3. 🎨 **Trình chỉnh sửa Pixel Art** - *Tự sáng tạo*
- Vẽ trực tiếp trên màn hình
- Các công cụ chuyên nghiệp (cọ vẽ, thùng sơn, đường kẻ, v.v.)
- Tạo script trong thời gian thực
- Hệ thống màu sắc và thu phóng hoàn chỉnh

**✨ Tất cả các phương pháp đều tạo ra các script sẵn sàng để dán vào console của wplace.live!**