LƯU Ý: làm dựa trên ẢNH đính kèm (Figma đang chặn).
vì vậy hãy đọc file hình images/figma/startWorking.jpg

QUY TẮC CHUNG: Trước khi code bất kỳ khối UI nào, kiểm tra xem userApp/ hoặc sellerApp/ đã có pattern/class tương tự chưa. Nếu có → BẮT BUỘC tái dùng nguyên class/cấu trúc đó, không viết CSS/HTML mới trùng lặp.

LƯU Ý VỀ ẢNH: ảnh đính kèm có 2 phần, chỉ phần bên PHẢI ("06_ Start Working") là frame cần làm. Phần bên trái là màn hình đăng nhập variant "Sign in to your Seller Account" + link "Become Delivery" — đây CHỈ LÀ NGỮ CẢNH của bước trước đó, KHÔNG PHẢI yêu cầu làm ở lần này, bỏ qua, không tạo file cho phần này (tôi sẽ gửi riêng sau nếu cần).

Trước tiên đọc để nắm quy ước repo:
- CLAUDE.md
- .claude/rules/css.md
- scss/abstracts/_variable.scss
- deliveryApp/home.html (BẮT BUỘC — file đã tạo trước đó, đọc để đồng bộ head/script/màu sắc/menubar-footer với Delivery App)
- userApp/become-seller.html (tham khảo pattern dropdown select đơn giản, và pattern chọn kiểu radio-card có border/badge check góc — kiểm tra xem file này hoặc profile-setting.html/currency.html có sẵn dạng "card lựa chọn có border xanh khi active + badge check tròn góc trên phải" chưa; nếu chưa có pattern này ở đâu trong repo, đây sẽ là component MỚI cần tạo — ghi chú lại trong báo cáo)
- images/icon/ (kiểm tra thư mục này — hiện KHÔNG có icon xe đạp/xe máy/ô tô nào có sẵn. Vì không có Figma để export, dùng SVG inline đơn giản (line-art) cho 3-4 icon phương tiện (Bike/Motorbike/Car/phương tiện thứ 4 bị cắt mép phải trong ảnh — đoán là "Van", ghi chú lại nếu không chắc), KHÔNG thêm vào sprite.svg vì đây là icon nhiều màu (bike xanh dương, motorbike đỏ, car xanh lá — có màu riêng theo loại, khác với icon 1 màu trong sprite.svg hiện tại)

Ảnh đính kèm là frame "06_ Start Working" thuộc Delivery App — trang khai báo trước khi bắt đầu nhận đơn (có thể là bước sau đăng nhập/trước khi vào Home).

NỘI DUNG CHI TIẾT:

1. Header: back trái, tiêu đề "Start Working" giữa.
2. "Service Area" + dropdown/select "Preferred Delivery Area" (chưa chọn giá trị cụ thể, để dạng placeholder).
3. "Vehicle Type": 4 card lựa chọn nằm ngang cùng hàng (Bike / Motorbike / Car / phương tiện thứ 4 bị cắt), mỗi card: icon minh họa phương tiện (mỗi loại 1 màu riêng theo ảnh) + label bên dưới; card "Motorbike" đang được chọn: viền xanh dương đậm bao quanh card + badge tròn nhỏ có dấu check ở góc trên phải card (nền xanh dương, dấu check trắng); các card còn lại: viền xám nhạt, có ô tròn nhỏ trống góc trên phải (chưa chọn, giống radio button rỗng).
4. "Registration Number" + input text "DH LA 31-7530".
5. Bottom fixed button "Start" (btn-dark, full-width) — TĨNH, không cần xử lý logic, có thể để href="home.html" (deliveryApp) làm điểm đến demo.

YÊU CẦU KỸ THUẬT:
1. Tạo file mới deliveryApp/start-working.html, path asset ../ giống convention deliveryApp/home.html.
2. Style viết trong scss/components/_start-working.scss (file mới), import đúng thứ tự trong scss/components/_index.scss.
3. Sau khi sửa SCSS, tự chạy sass compile để cập nhật css/styles.css.
4. Chỉ làm phần TĨNH — 4 card vehicle-type chỉ cần đúng trạng thái active/inactive tĩnh theo ảnh (Motorbike active), không cần JS xử lý chọn đổi qua lại.
5. Vì không có thông số Figma chính xác: ước lượng spacing theo tỷ lệ ảnh (khung điện thoại = 375px), tái dùng biến trong _variable.scss.
6. Không sửa userApp/*.html, không sửa sellerApp/*.html, không sửa deliveryApp/home.html, không sửa vendor css/js.

Sau khi làm xong, liệt kê:
(a) giá trị nào phải tự ước lượng vì ảnh không đủ rõ (đặc biệt tên phương tiện thứ 4 bị cắt mép),
(b) icon phương tiện được tạo bằng SVG inline theo màu nào cho từng loại,
(c) pattern "card lựa chọn có border active + badge check góc" là component hoàn toàn mới hay đã có sẵn ở đâu đó trong repo mà bạn tìm thấy,
(d) nút "Start" hiện đang trỏ đi đâu.