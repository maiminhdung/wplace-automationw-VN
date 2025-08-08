/**
 * Bot để tự động hóa việc vẽ tranh trên wplace.live
 * Hướng dẫn:
 * 1. Mở trang web wplace.live trên trình duyệt
 * 2. Mở Console của nhà phát triển (F12 > Console)
 * 3. Dán script này vào và nhấn Enter
 * 4. Cấu hình ảnh và vị trí bắt đầu của bạn
 * 5. Chạy bot
 */

class WPlaceBot {
    constructor() {
        this.isRunning = false;
        this.delay = 1000; // Độ trễ giữa các lần nhấp tính bằng ms
        this.currentPixel = 0;
        this.pixels = [];
        this.startX = 0;
        this.startY = 0;
        this.canvas = null;
        this.colorPalette = [];
        this.selectedColor = '#000000';
    }

    // Khởi tạo bot
    init() {
        console.log('🎨 WPlace Bot đã được khởi tạo!');
        this.findCanvas();
        this.findColorPalette();
        this.createControlPanel();
    }

    // Tìm canvas của wplace
    findCanvas() {
        // Tìm kiếm các bộ chọn có thể của canvas
        const possibleSelectors = [
            'canvas',
            '#canvas',
            '.canvas',
            '[data-testid="canvas"]',
            'canvas[width]',
            'canvas[height]'
        ];

        for (const selector of possibleSelectors) {
            const element = document.querySelector(selector);
            if (element) {
                this.canvas = element;
                console.log('✅ Đã tìm thấy Canvas:', selector);
                return;
            }
        }

        console.error('❌ Không tìm thấy Canvas. Hãy chắc chắn rằng bạn đang ở trên wplace.live');
    }

    // Tìm bảng màu
    findColorPalette() {
        // Tìm kiếm các phần tử có thể là màu
        const colorElements = document.querySelectorAll('[style*="background-color"], .color, [data-color], .palette-color');
        
        colorElements.forEach(element => {
            const bgColor = window.getComputedStyle(element).backgroundColor;
            if (bgColor && bgColor !== 'rgba(0, 0, 0, 0)') {
                this.colorPalette.push({
                    element: element,
                    color: bgColor
                });
            }
        });

        console.log(`✅ Đã tìm thấy ${this.colorPalette.length} màu trong bảng màu`);
    }

    // Chuyển đổi màu RGB sang HEX
    rgbToHex(rgb) {
        const result = rgb.match(/\d+/g);
        if (!result) return '#000000';
        
        const [r, g, b] = result.map(num => parseInt(num));
        return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    }

    // Tìm màu gần nhất trong bảng màu
    findClosestColor(targetColor) {
        if (this.colorPalette.length === 0) return null;

        let closestColor = this.colorPalette[0];
        let minDistance = Infinity;

        // Chuyển đổi màu mục tiêu sang RGB
        const target = this.hexToRgb(targetColor);
        if (!target) return closestColor;

        this.colorPalette.forEach(paletteColor => {
            const rgb = this.rgbStringToObject(paletteColor.color);
            if (rgb) {
                const distance = Math.sqrt(
                    Math.pow(target.r - rgb.r, 2) +
                    Math.pow(target.g - rgb.g, 2) +
                    Math.pow(target.b - rgb.b, 2)
                );

                if (distance < minDistance) {
                    minDistance = distance;
                    closestColor = paletteColor;
                }
            }
        });

        return closestColor;
    }

    // Chuyển đổi HEX sang RGB
    hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }

    // Chuyển đổi chuỗi RGB sang đối tượng
    rgbStringToObject(rgb) {
        const result = rgb.match(/\d+/g);
        if (!result || result.length < 3) return null;
        
        return {
            r: parseInt(result[0]),
            g: parseInt(result[1]),
            b: parseInt(result[2])
        };
    }

    // Chọn một màu trong bảng màu
    selectColor(color) {
        const closestColor = this.findClosestColor(color);
        if (closestColor && closestColor.element) {
            closestColor.element.click();
            this.selectedColor = color;
            console.log(`🎨 Đã chọn màu: ${color}`);
            return true;
        }
        return false;
    }

    // Nhấp vào một vị trí cụ thể trên canvas
    clickCanvas(x, y) {
        if (!this.canvas) return false;

        const rect = this.canvas.getBoundingClientRect();
        const canvasX = x + rect.left;
        const canvasY = y + rect.top;

        // Tạo các sự kiện chuột
        const events = ['mousedown', 'mouseup', 'click'];
        
        events.forEach(eventType => {
            const event = new MouseEvent(eventType, {
                bubbles: true,
                cancelable: true,
                clientX: canvasX,
                clientY: canvasY,
                button: 0
            });
            this.canvas.dispatchEvent(event);
        });

        console.log(`🖱️ Đã nhấp vào (${x}, ${y})`);
        return true;
    }

    // Tải một ảnh đơn giản (mảng màu)
    loadSimpleImage(imageData, width, height) {
        this.pixels = [];
        
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const index = y * width + x;
                if (index < imageData.length) {
                    this.pixels.push({
                        x: x,
                        y: y,
                        color: imageData[index]
                    });
                }
            }
        }

        console.log(`📷 Đã tải ảnh: ${width}x${height} pixel (${this.pixels.length} pixel)`);
    }

    // Ví dụ về ảnh đơn giản - một trái tim nhỏ
    loadHeartImage() {
        const heart = [
            '⬜', '🟥', '🟥', '⬜', '🟥', '🟥', '⬜',
            '🟥', '🟥', '🟥', '🟥', '🟥', '🟥', '🟥',
            '🟥', '🟥', '🟥', '🟥', '🟥', '🟥', '🟥',
            '🟥', '🟥', '🟥', '🟥', '🟥', '🟥', '🟥',
            '⬜', '🟥', '🟥', '🟥', '🟥', '🟥', '⬜',
            '⬜', '⬜', '🟥', '🟥', '🟥', '⬜', '⬜',
            '⬜', '⬜', '⬜', '🟥', '⬜', '⬜', '⬜'
        ];

        const colorMap = {
            '🟥': '#FF0000',
            '⬜': '#FFFFFF'
        };

        const imageData = heart.map(emoji => colorMap[emoji] || '#FFFFFF');
        this.loadSimpleImage(imageData, 7, 7);
    }

    // Ví dụ về ảnh - mặt cười
    loadSmileyImage() {
        const smiley = [
            '⬜', '⬜', '🟨', '🟨', '🟨', '⬜', '⬜',
            '⬜', '🟨', '🟨', '🟨', '🟨', '🟨', '⬜',
            '🟨', '🟨', '⬛', '🟨', '⬛', '🟨', '🟨',
            '🟨', '🟨', '🟨', '🟨', '🟨', '🟨', '🟨',
            '🟨', '⬛', '🟨', '🟨', '🟨', '⬛', '🟨',
            '⬜', '🟨', '⬛', '⬛', '⬛', '🟨', '⬜',
            '⬜', '⬜', '🟨', '🟨', '🟨', '⬜', '⬜'
        ];

        const colorMap = {
            '🟨': '#FFFF00',
            '⬛': '#000000',
            '⬜': '#FFFFFF'
        };

        const imageData = smiley.map(emoji => colorMap[emoji] || '#FFFFFF');
        this.loadSimpleImage(imageData, 7, 7);
    }

    // Bắt đầu bot
    async start() {
        if (this.isRunning) {
            console.log('⚠️ Bot đang chạy rồi!');
            return;
        }

        if (this.pixels.length === 0) {
            console.log('⚠️ Vui lòng tải ảnh trước!');
            return;
        }

        this.isRunning = true;
        this.currentPixel = 0;
        console.log('🚀 Bot đã bắt đầu!');

        while (this.isRunning && this.currentPixel < this.pixels.length) {
            const pixel = this.pixels[this.currentPixel];
            const x = this.startX + pixel.x;
            const y = this.startY + pixel.y;

            // Chọn màu
            if (this.selectColor(pixel.color)) {
                // Đợi một chút để màu được chọn
                await this.sleep(200);
                
                // Nhấp vào canvas
                this.clickCanvas(x, y);
                
                console.log(`✅ Đã đặt pixel ${this.currentPixel + 1}/${this.pixels.length} tại (${x}, ${y})`);
            }

            this.currentPixel++;
            
            // Đợi trước khi đặt pixel tiếp theo
            await this.sleep(this.delay);
        }

        this.isRunning = false;
        console.log('✅ Bot đã hoàn thành!');
    }

    // Dừng bot
    stop() {
        this.isRunning = false;
        console.log('⏹️ Bot đã dừng!');
    }

    // Hàm chờ
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Đặt vị trí bắt đầu
    setStartPosition(x, y) {
        this.startX = x;
        this.startY = y;
        console.log(`📍 Đã đặt vị trí bắt đầu: (${x}, ${y})`);
    }

    // Đặt độ trễ giữa các lần nhấp
    setDelay(ms) {
        this.delay = ms;
        console.log(`⏱️ Đã đặt độ trễ: ${ms}ms`);
    }

    // Tải ảnh từ dữ liệu pixel
    loadImageFromData(pixelData, name = 'Ảnh tùy chỉnh') {
        if (!Array.isArray(pixelData)) {
            console.error('❌ Dữ liệu ảnh phải là một mảng các đối tượng {x, y, color}');
            return false;
        }

        // Xác thực định dạng dữ liệu
        const isValidData = pixelData.every(pixel => 
            typeof pixel === 'object' && 
            typeof pixel.x === 'number' && 
            typeof pixel.y === 'number' && 
            typeof pixel.color === 'string'
        );

        if (!isValidData) {
            console.error('❌ Định dạng không hợp lệ. Mỗi pixel phải có {x, y, color}');
            return false;
        }

        this.pixels = pixelData.slice(); // Sao chép dữ liệu
        console.log(`✅ Đã tải ${name}: ${pixelData.length} pixel`);
        
        // Tính toán kích thước của ảnh
        const maxX = Math.max(...pixelData.map(p => p.x));
        const maxY = Math.max(...pixelData.map(p => p.y));
        console.log(`📐 Kích thước: ${maxX + 1}x${maxY + 1} pixel`);
        
        // Đếm số màu duy nhất
        const uniqueColors = [...new Set(pixelData.map(p => p.color))];
        console.log(`🎨 Số màu duy nhất: ${uniqueColors.length}`);

        return true;
    }

    // Tải ảnh từ URL dữ liệu (data URL)
    async loadImageFromUrl(imageUrl, maxWidth = 50, maxHeight = 50) {
        try {
            console.log('🔄 Đang tải ảnh từ URL...');
            
            const img = new Image();
            img.crossOrigin = 'anonymous';
            
            return new Promise((resolve, reject) => {
                img.onload = () => {
                    try {
                        const pixelData = this.processImageToPixels(img, maxWidth, maxHeight);
                        this.loadImageFromData(pixelData, 'Ảnh từ URL');
                        resolve(true);
                    } catch (error) {
                        reject(error);
                    }
                };
                
                img.onerror = () => {
                    reject(new Error('Lỗi khi tải ảnh từ URL'));
                };
                
                img.src = imageUrl;
            });
        } catch (error) {
            console.error('❌ Lỗi khi tải ảnh:', error);
            return false;
        }
    }

    // Xử lý ảnh HTML thành dữ liệu pixel
    processImageToPixels(img, maxWidth, maxHeight) {
        // Tính toán kích thước giữ nguyên tỷ lệ
        const scale = Math.min(maxWidth / img.width, maxHeight / img.height);
        const width = Math.floor(img.width * scale);
        const height = Math.floor(img.height * scale);

        // Tạo canvas tạm thời
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = width;
        canvas.height = height;

        // Vẽ ảnh đã thay đổi kích thước
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(img, 0, 0, width, height);

        // Lấy dữ liệu pixel
        const imageData = ctx.getImageData(0, 0, width, height);
        const data = imageData.data;

        const pixels = [];
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const index = (y * width + x) * 4;
                const r = data[index];
                const g = data[index + 1];
                const b = data[index + 2];
                const a = data[index + 3];

                // Bỏ qua các pixel trong suốt
                if (a < 128) continue;

                const color = '#' + [r, g, b].map(x => {
                    const hex = x.toString(16);
                    return hex.length === 1 ? '0' + hex : hex;
                }).join('');

                pixels.push({ x, y, color });
            }
        }

        return pixels;
    }

    // Tạo bảng điều khiển
    createControlPanel() {
        // Xóa bảng điều khiển cũ nếu tồn tại
        const existingPanel = document.getElementById('wplace-bot-panel');
        if (existingPanel) {
            existingPanel.remove();
        }

        const panel = document.createElement('div');
        panel.id = 'wplace-bot-panel';
        panel.style.cssText = `
            position: fixed;
            top: 10px;
            right: 10px;
            background: #2c2c2c;
            color: white;
            padding: 15px;
            border-radius: 8px;
            font-family: Arial, sans-serif;
            font-size: 12px;
            z-index: 10000;
            width: 250px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.3);
        `;

        panel.innerHTML = `
            <h3 style="margin: 0 0 10px 0; color: #4CAF50;">🎨 WPlace Bot</h3>
            <div style="margin-bottom: 10px;">
                <label>Vị trí X: <input type="number" id="startX" value="100" style="width: 60px;"></label>
                <label>Vị trí Y: <input type="number" id="startY" value="100" style="width: 60px;"></label>
            </div>
            <div style="margin-bottom: 10px;">
                <label>Delay (ms): <input type="number" id="delay" value="1000" style="width: 80px;"></label>
            </div>
            <div style="margin-bottom: 10px;">
                <button id="loadHeart" style="margin-right: 5px; margin-bottom: 5px;">❤️ Trái tim</button>
                <button id="loadSmiley" style="margin-bottom: 5px;">😊 Mặt cười</button>
            </div>
            <div style="margin-bottom: 10px;">
                <input type="file" id="imageInput" accept="image/*" style="display: none;">
                <button id="loadCustom" style="background: #FF9800; color: white; border: none; padding: 6px 10px; border-radius: 4px; margin-right: 5px; margin-bottom: 5px; font-size: 11px;">📁 Tải ảnh lên</button>
                <button id="openConverter" style="background: #9C27B0; color: white; border: none; padding: 6px 10px; border-radius: 4px; margin-right: 5px; margin-bottom: 5px; font-size: 11px;">🔧 Trình chuyển đổi</button>
                <button id="openEditor" style="background: #E91E63; color: white; border: none; padding: 6px 10px; border-radius: 4px; margin-bottom: 5px; font-size: 11px;">🎨 Trình chỉnh sửa</button>
            </div>
            <div style="margin-bottom: 10px;">
                <button id="startBot" style="background: #4CAF50; color: white; border: none; padding: 8px 12px; border-radius: 4px; margin-right: 5px;">▶️ Bắt đầu</button>
                <button id="stopBot" style="background: #f44336; color: white; border: none; padding: 8px 12px; border-radius: 4px;">⏹️ Dừng</button>
            </div>
            <div id="status" style="font-size: 11px; color: #ccc;">
                Trạng thái: Sẵn sàng
            </div>
        `;

        document.body.appendChild(panel);

        // Các trình lắng nghe sự kiện
        document.getElementById('startX').addEventListener('input', (e) => {
            this.setStartPosition(parseInt(e.target.value) || 0, this.startY);
        });

        document.getElementById('startY').addEventListener('input', (e) => {
            this.setStartPosition(this.startX, parseInt(e.target.value) || 0);
        });

        document.getElementById('delay').addEventListener('input', (e) => {
            this.setDelay(parseInt(e.target.value) || 1000);
        });

        document.getElementById('loadHeart').addEventListener('click', () => {
            this.loadHeartImage();
            document.getElementById('status').textContent = 'Trạng thái: Đã tải trái tim';
        });

        document.getElementById('loadSmiley').addEventListener('click', () => {
            this.loadSmileyImage();
            document.getElementById('status').textContent = 'Trạng thái: Đã tải mặt cười';
        });

        document.getElementById('startBot').addEventListener('click', () => {
            this.start();
            document.getElementById('status').textContent = 'Trạng thái: Đang chạy...';
        });

        document.getElementById('stopBot').addEventListener('click', () => {
            this.stop();
            document.getElementById('status').textContent = 'Trạng thái: Đã dừng';
        });

        document.getElementById('loadCustom').addEventListener('click', () => {
            document.getElementById('imageInput').click();
        });

        document.getElementById('imageInput').addEventListener('change', async (e) => {
            if (e.target.files.length > 0) {
                const file = e.target.files[0];
                try {
                    document.getElementById('status').textContent = 'Trạng thái: Đang tải ảnh...';
                    
                    const reader = new FileReader();
                    reader.onload = async (event) => {
                        try {
                            await this.loadImageFromUrl(event.target.result, 50, 50);
                            document.getElementById('status').textContent = 'Trạng thái: Ảnh đã được tải!';
                        } catch (error) {
                            console.error('Lỗi khi xử lý ảnh:', error);
                            document.getElementById('status').textContent = 'Trạng thái: Lỗi khi tải ảnh';
                        }
                    };
                    reader.readAsDataURL(file);
                } catch (error) {
                    console.error('Lỗi khi đọc tệp:', error);
                    document.getElementById('status').textContent = 'Trạng thái: Lỗi khi đọc tệp';
                }
            }
        });

        document.getElementById('openConverter').addEventListener('click', () => {
            const converterPath = window.location.origin + window.location.pathname.replace(/[^/]*$/, '') + 'image-converter.html';
            window.open(converterPath, '_blank');
        });

        document.getElementById('openEditor').addEventListener('click', () => {
            const editorPath = window.location.origin + window.location.pathname.replace(/[^/]*$/, '') + 'pixel-editor.html';
            window.open(editorPath, '_blank');
        });
    }
}

// Khởi tạo bot
const wplaceBot = new WPlaceBot();
wplaceBot.init();

// Các lệnh có sẵn trong console:
console.log(`
🎨 WPlace Bot đã được tải! 

Các lệnh có sẵn:
- wplaceBot.setStartPosition(x, y) - Đặt vị trí bắt đầu
- wplaceBot.setDelay(ms) - Đặt độ trễ giữa các lần nhấp  
- wplaceBot.loadHeartImage() - Tải ảnh trái tim
- wplaceBot.loadSmileyImage() - Tải ảnh mặt cười
- wplaceBot.loadImageFromData(pixelData, name) - Tải ảnh từ dữ liệu
- wplaceBot.loadImageFromUrl(url, maxWidth, maxHeight) - Tải ảnh từ URL
- wplaceBot.start() - Bắt đầu bot
- wplaceBot.stop() - Dừng bot

🔧 Trình chuyển đổi ảnh:
Sử dụng bảng điều khiển hoặc mở image-converter.html để chuyển đổi ảnh của riêng bạn!

Hoặc sử dụng bảng điều khiển đã xuất hiện ở góc trên bên phải!
`);