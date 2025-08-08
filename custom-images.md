# 🖼️ Ví dụ về Ảnh Tùy chỉnh

Tệp này chứa các ví dụ về cách sử dụng ảnh đã chuyển đổi trong WPlace Bot, cùng với các phương pháp để tạo ảnh của riêng bạn.

## 🎨 Các phương pháp để Tạo ảnh

### 1. 🆕 Trình chuyển đổi Web Tự động (Khuyến nghị)
- Mở `image-converter.html` trong trình duyệt
- Kéo thả hoặc chọn ảnh của bạn (PNG, JPG, GIF)
- Cấu hình kích thước tối đa và chế độ màu
- Xem trước kết quả trong thời gian thực
- Tạo script sẵn sàng để sử dụng
- Sao chép và dán vào console của wplace.live

### 2. 📁 Tải lên Trực tiếp trên Bảng điều khiển
- Sử dụng nút "📁 Tải ảnh lên" trên bảng điều khiển của bot
- Chọn ảnh của bạn
- Ảnh sẽ được tự động thay đổi kích thước và tải lên

### 3. Phương pháp Thủ công (Cho Pixel Art Đơn giản)

```javascript
// Ví dụ: Chữ thập 5x5
const cruz = [
    '#FFFFFF', '#FFFFFF', '#FF0000', '#FFFFFF', '#FFFFFF',
    '#FFFFFF', '#FFFFFF', '#FF0000', '#FFFFFF', '#FFFFFF', 
    '#FF0000', '#FF0000', '#FF0000', '#FF0000', '#FF0000',
    '#FFFFFF', '#FFFFFF', '#FF0000', '#FFFFFF', '#FFFFFF',
    '#FFFFFF', '#FFFFFF', '#FF0000', '#FFFFFF', '#FFFFFF'
];

wplaceBot.loadSimpleImage(cruz, 5, 5);
```

### 2. Phương pháp với Emoji (Trực quan)

```javascript
// Ví dụ: Hình vuông với chữ X
const design = [
    '🟥', '⬜', '⬜', '⬜', '🟥',
    '⬜', '🟥', '⬜', '🟥', '⬜',
    '⬜', '⬜', '🟥', '⬜', '⬜',
    '⬜', '🟥', '⬜', '🟥', '⬜',
    '🟥', '⬜', '⬜', '⬜', '🟥'
];

const colorMap = {
    '🟥': '#FF0000',
    '⬜': '#FFFFFF'
};

const imageData = design.map(emoji => colorMap[emoji]);
wplaceBot.loadSimpleImage(imageData, 5, 5);
```

### 3. Phương pháp với Chuỗi nhiều dòng

```javascript
// Ví dụ: Mũi tên lên
const arrow = `
⬜⬜🟦⬜⬜
⬜🟦🟦🟦⬜
🟦🟦🟦🟦🟦
⬜⬜🟦⬜⬜
⬜⬜🟦⬜⬜
`.trim().split('\n').join('');

const colors = {
    '🟦': '#0000FF',
    '⬜': '#FFFFFF'
};

const pixels = Array.from(arrow).map(char => colors[char] || '#FFFFFF');
wplaceBot.loadSimpleImage(pixels, 5, 5);
```

## 🔧 Các công cụ Hỗ trợ

### Hàm để Tạo Hình chữ nhật

```javascript
function createRectangle(width, height, color, borderColor = null) {
    const pixels = [];
    
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            // Nếu có viền và đang ở trên viền
            if (borderColor && (x === 0 || x === width-1 || y === 0 || y === height-1)) {
                pixels.push(borderColor);
            } else {
                pixels.push(color);
            }
        }
    }
    
    return pixels;
}

// Sử dụng:
const rect = createRectangle(8, 6, '#FF0000', '#000000');
wplaceBot.loadSimpleImage(rect, 8, 6);
```

### Hàm để Tạo Hình tròn

```javascript
function createCircle(radius, fillColor, bgColor = '#FFFFFF') {
    const size = radius * 2 + 1;
    const pixels = [];
    const center = radius;
    
    for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
            const distance = Math.sqrt((x - center) ** 2 + (y - center) ** 2);
            pixels.push(distance <= radius ? fillColor : bgColor);
        }
    }
    
    return pixels;
}

// Sử dụng:
const circle = createCircle(4, '#00FF00');
wplaceBot.loadSimpleImage(circle, 9, 9);
```

### Hàm để Tạo Văn bản Đơn giản

```javascript
function createText(text, color = '#000000', bgColor = '#FFFFFF') {
    // Phông chữ 3x5 đơn giản
    const font = {
        'A': [
            '⬜🟦⬜',
            '🟦⬜🟦',
            '🟦🟦🟦',
            '🟦⬜🟦',
            '🟦⬜🟦'
        ],
        'B': [
            '🟦🟦⬜',
            '🟦⬜🟦',
            '🟦🟦⬜',
            '🟦⬜🟦',
            '🟦🟦⬜'
        ],
        'C': [
            '⬜🟦🟦',
            '🟦⬜⬜',
            '🟦⬜⬜',
            '🟦⬜⬜',
            '⬜🟦🟦'
        ]
        // Thêm các chữ cái khác nếu cần
    };
    
    const letters = text.toUpperCase().split('');
    const pixels = [];
    
    for (let row = 0; row < 5; row++) {
        for (let letter of letters) {
            if (font[letter]) {
                const line = font[letter][row];
                for (let char of line) {
                    pixels.push(char === '🟦' ? color : bgColor);
                }
            }
            // Khoảng cách giữa các chữ cái
            pixels.push(bgColor);
        }
    }
    
    const width = letters.length * 4 - 1; // 3 + 1 khoảng cách, trừ khoảng cách cuối cùng
    return { pixels, width, height: 5 };
}

// Sử dụng:
const textData = createText('ABC', '#FF0000');
wplaceBot.loadSimpleImage(textData.pixels, textData.width, textData.height);
```

## 🎯 Ví dụ Sẵn có

### Pokéball (8x8)

```javascript
const pokeball = [
    '⬜', '⬜', '🟥', '🟥', '🟥', '🟥', '⬜', '⬜',
    '⬜', '🟥', '🟥', '🟥', '🟥', '🟥', '🟥', '⬜',
    '🟥', '🟥', '🟥', '🟥', '🟥', '🟥', '🟥', '🟥',
    '🟥', '🟥', '🟥', '⚫', '⚫', '🟥', '🟥', '🟥',
    '⬜', '⬜', '⬜', '⚫', '⚫', '⬜', '⬜', '⬜',
    '⬜', '⬜', '⬜', '⬜', '⬜', '⬜', '⬜', '⬜',
    '⬜', '⬜', '⬜', '⬜', '⬜', '⬜', '⬜', '⬜',
    '⬜', '⬜', '⬜', '⬜', '⬜', '⬜', '⬜', '⬜'
];

const pokeColors = {
    '🟥': '#FF0000',
    '⬜': '#FFFFFF', 
    '⚫': '#000000'
};

const pokeData = pokeball.map(emoji => pokeColors[emoji]);
wplaceBot.loadSimpleImage(pokeData, 8, 8);
```

### Cờ Brazil (9x6)

```javascript
const brasilFlag = [
    '🟩', '🟩', '🟩', '🟩', '🟩', '🟩', '🟩', '🟩', '🟩',
    '🟩', '🟩', '🟨', '🟨', '🟨', '🟨', '🟨', '🟩', '🟩',
    '🟩', '🟨', '🟨', '🔵', '🔵', '🔵', '🟨', '🟨', '🟩',
    '🟩', '🟨', '🟨', '🔵', '🔵', '🔵', '🟨', '🟨', '🟩',
    '🟩', '🟩', '🟨', '🟨', '🟨', '🟨', '🟨', '🟩', '🟩',
    '🟩', '🟩', '🟩', '🟩', '🟩', '🟩', '🟩', '🟩', '🟩'
];

const brasilColors = {
    '🟩': '#009B3A',
    '🟨': '#FFDF00',
    '🔵': '#002776'
};

const brasilData = brasilFlag.map(emoji => brasilColors[emoji]);
wplaceBot.loadSimpleImage(brasilData, 9, 6);
```

### Pac-Man (7x7)

```javascript
const pacman = [
    '⬜', '🟨', '🟨', '🟨', '🟨', '🟨', '⬜',
    '🟨', '🟨', '🟨', '🟨', '🟨', '⬜', '⬜',
    '🟨', '🟨', '🟨', '🟨', '⬜', '⬜', '⬜',
    '🟨', '🟨', '🟨', '⬜', '⬜', '⬜', '⬜',
    '🟨', '🟨', '🟨', '🟨', '⬜', '⬜', '⬜',
    '🟨', '🟨', '🟨', '🟨', '🟨', '⬜', '⬜',
    '⬜', '🟨', '🟨', '🟨', '🟨', '🟨', '⬜'
];

const pacColors = {
    '🟨': '#FFFF00',
    '⬜': '#FFFFFF'
};

const pacData = pacman.map(emoji => pacColors[emoji]);
wplaceBot.loadSimpleImage(pacData, 7, 7);
```

## 🛠️ Mẹo Nâng cao

### 1. Chuyển đổi Ảnh Thật sang Pixel Art

```javascript
// Sử dụng hàm này để chuyển đổi một ảnh thành mảng màu
// (cần tải ảnh vào một canvas trước)
function imageToPixelArray(canvas, width, height) {
    const ctx = canvas.getContext('2d');
    const imageData = ctx.getImageData(0, 0, width, height);
    const pixels = [];
    
    for (let i = 0; i < imageData.data.length; i += 4) {
        const r = imageData.data[i];
        const g = imageData.data[i + 1];
        const b = imageData.data[i + 2];
        
        const hex = '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
        pixels.push(hex);
    }
    
    return pixels;
}
```

### 2. Bảng màu Phổ biến

```javascript
const commonColors = {
    'đen': '#000000',
    'trắng': '#FFFFFF',
    'đỏ': '#FF0000',
    'xanh lá': '#00FF00',
    'xanh dương': '#0000FF',
    'vàng': '#FFFF00',
    'hồng đậm': '#FF00FF',
    'xanh lơ': '#00FFFF',
    'cam': '#FFA500',
    'tím': '#800080',
    'hồng': '#FFC0CB',
    'xám': '#808080',
    'nâu': '#8B4513',
    'xanh chanh': '#32CD32',
    'xanh hải quân': '#000080'
};
```

### 3. Xác thực Ảnh Trước khi Sử dụng

```javascript
function validateImage(pixels, width, height) {
    if (pixels.length !== width * height) {
        console.error(`❌ Lỗi: dự kiến ${width * height} pixel, tìm thấy ${pixels.length}`);
        return false;
    }
    
    // Kiểm tra xem tất cả các màu có hợp lệ không
    const invalidColors = pixels.filter(color => !/^#[0-9A-F]{6}$/i.test(color));
    if (invalidColors.length > 0) {
        console.error(`❌ Tìm thấy màu không hợp lệ:`, invalidColors);
        return false;
    }
    
    console.log(`✅ Ảnh hợp lệ: ${width}x${height}`);
    return true;
}

// Sử dụng:
if (validateImage(meuPixels, 8, 8)) {
    wplaceBot.loadSimpleImage(meuPixels, 8, 8);
}
```

## 📝 Mẫu Cơ bản

```javascript
// Mẫu để tạo ảnh của riêng bạn
function createCustomImage() {
    // 1. Xác định thiết kế của bạn (sử dụng emoji để xem tốt hơn)
    const design = [
        '⬜', '⬜', '⬜',
        '⬜', '🟦', '⬜',
        '⬜', '⬜', '⬜'
    ];
    
    // 2. Ánh xạ các màu
    const colorMap = {
        '⬜': '#FFFFFF',
        '🟦': '#0000FF'
    };
    
    // 3. Chuyển đổi sang mảng màu
    const pixels = design.map(emoji => colorMap[emoji] || '#FFFFFF');
    
    // 4. Xác định kích thước
    const width = 3;
    const height = 3;
    
    // 5. Xác thực và tải
    if (validateImage(pixels, width, height)) {
        wplaceBot.loadSimpleImage(pixels, width, height);
        return true;
    }
    
    return false;
}

// Sử dụng hàm
createCustomImage();
```