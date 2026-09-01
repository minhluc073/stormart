LƯU Ý: làm dựa trên ẢNH đính kèm (Figma đang chặn).
vì vậy hãy đọc file hình images/figma/allorder.png rồi đọc từ đó (bỏ qua phần bị cắt ở mép trên cùng ảnh — đó chỉ là icon+tiêu đề phóng to của 1 phần header, không phải nội dung mới, đã có đủ trong 4 khung điện thoại bên dưới).

QUY TẮC CHUNG: Trước khi code bất kỳ khối UI nào, kiểm tra xem userApp/, sellerApp/ hoặc deliveryApp/ đã có pattern/class tương tự chưa. Nếu có → BẮT BUỘC tái dùng nguyên class/cấu trúc đó, không viết CSS/HTML mới trùng lặp.

Trước tiên đọc để nắm quy ước repo:
- CLAUDE.md
- .claude/rules/css.md
- scss/abstracts/_variable.scss
- deliveryApp/home.html (BẮT BUỘC — đã có sẵn khối "Recent Request" với đúng card mẫu: dòng "Pickup" (icon location tròn xanh) + tên điểm lấy hàng + badge thời gian; dòng "Pickup" thứ 2 (thực chất Dropoff) + địa chỉ giao; dòng "Distance"/"Earnings" 2 cột; 2 nút "Decline"/"Accept". TÁI DÙNG NGUYÊN 100% component card này cho tab "View All" và "Decline" ở trang mới.)
- sellerApp/my-product-list.html (BẮT BUỘC — tái dùng pattern header search+filter và pattern 4-tab (menu-tab, nav-tab-item, tab-link, tab-content, tab-pane) cho 4 tab "View All / Active / Complete / Decline" ở trang này)
- userApp/message.html (BẮT BUỘC — tái dùng cơ chế d-none ẩn/hiện 2 state "có dữ liệu / trống" đã áp dụng ở đó, áp dụng tương tự cho state "No Orders Yet!" ở đây — LƯU Ý icon minh họa của empty state ở đây KHÁC với icon "hộp+zzz" của message.html, đây là icon "hộp quà đang mở + tia sáng lấp lánh" — nếu sprite.svg không có icon này, tạo SVG inline mới hoặc dùng ảnh PNG tạm, ghi chú lại trong báo cáo)

Ảnh đính kèm gồm 4 khung điện thoại, TẤT CẢ đều là STATE khác nhau của CÙNG 1 trang "All Request" (dù tên frame trong Figma ghi "24_ All Orders" nhưng tiêu đề thật trong app luôn hiển thị "All Request" ở cả 4 khung — dùng đúng "All Request" làm tiêu đề, ghi chú lại sự khác tên frame/tiêu đề thật này trong báo cáo cuối). CHỈ TẠO 1 FILE DUY NHẤT deliveryApp/all-orders.html, dùng tab-content/tab-pane để chứa cả 4 state, KHÔNG tạo file riêng.

MÔ TẢ CHI TIẾT TỪNG STATE ĐỂ BẠN HIỂU RÕ VÀ DỰNG ĐÚNG:

**Khung 1 — "24_ All Orders" (tab "View All" đang active):**
- Header: back trái, tiêu đề "All Request" giữa, icon filter (3 thanh trượt) bên phải.
- Tab bar 4 tab: "View All" (active, gạch chân xanh) / "Active" / "Complete" / "Decline".
- Nội dung tab-pane "View All": 2 card đơn hàng xếp dọc, MỖI CARD giống HỆT component "Recent Request" đã có ở deliveryApp/home.html (Pickup x2 + Distance/Earnings + nút Decline/Accept màu đỏ nhạt/xanh dương) — đây là các đơn CHƯA nhận (còn có thể Decline hoặc Accept).
- Menubar-footer: Home / Message / nút tròn nổi giữa (icon túi giao hàng) / Wallet (active, xanh) / Profile.

**Khung 2 — "24_ All Orders_ Empty" (cũng ở tab "View All" nhưng không có đơn hàng nào):**
- Cùng header/tab bar như trên, tab "View All" vẫn active.
- Nội dung tab-pane thay bằng state rỗng: icon hộp quà mở + tia sáng lấp lánh (màu xám nhạt), tiêu đề "No Orders Yet!", mô tả "Add products you love and they'll show up here." (LƯU Ý: mô tả này nói về "sản phẩm" — nghe giống bị copy nhầm từ context bán hàng/mua sắm, không hợp lý với ngữ cảnh tài xế nhận đơn giao hàng — CỨ GIỮ ĐÚNG NGUYÊN TEXT NÀY THEO ẢNH vì có thể đây là lỗi/placeholder chưa cập nhật nội dung thật trong Figma, không tự sửa thành câu khác, chỉ ghi chú lại nghi vấn này trong báo cáo cuối), nút "Browse Orders" (btn-dark).
- Đây là state d-none, ẩn mặc định (giống cơ chế message-empty ở message.html), dùng để demo khi tab không có dữ liệu — đặt trong CHÍNH tab-pane "View All" dưới dạng 1 div con ẩn/hiện thay thế cho danh sách card, không tạo tab-pane riêng.

**Khung 3 — "24_ All Orders" (tab "Active" đang active):**
**Khung 3 — "24_ All Orders" (tab "Active" đang active) — CẬP NHẬT phần bản đồ (ĐƠN GIẢN HÓA):**
- Cùng header, tab "Active" active.
- Nội dung tab-pane "Active": 2 card đơn hàng đã được NHẬN (đang giao), mỗi card gồm:
  - Pickup x2 + Distance/Earnings giống cấu trúc card cũ, KHÔNG có 2 nút Decline/Accept.
  - Bên dưới mỗi card nhúng bản đồ bằng iframe Google Maps Embed (không cần API key), dùng URL dạng:
    `https://www.google.com/maps?q=<địa chỉ hoặc toạ độ>&output=embed`
    Ví dụ cụ thể cho 1 card: `<iframe src="https://www.google.com/maps?q=Uttara,Dhaka&output=embed" width="100%" height="160" style="border:0;" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`
    Bo góc iframe theo đúng radius trong ảnh (border-radius qua CSS, không set trong thuộc tính HTML).
  - Nút "Open Navigation" (btn-dark, full-width, icon định vị nhỏ cạnh chữ) ngay dưới map — gắn href TRỎ TỚI CHÍNH ĐỊA ĐIỂM đó trên Google Maps (mở tab/app riêng), dùng URL dạng:
    `https://www.google.com/maps/dir/?api=1&destination=<địa chỉ giao hàng>`
    Ví dụ: `href="https://www.google.com/maps/dir/?api=1&destination=House+12,+Road+8,+Uttara"` + `target="_blank" rel="noopener noreferrer"`.
  - Địa chỉ dùng trong cả iframe và href lấy đúng theo dữ liệu "Pickup"/"Dropoff" hiển thị trong card đó (VD "Green Mart Store" cho pickup, "House 12, Road 8, Uttara" cho dropoff — ưu tiên dùng địa chỉ dropoff làm điểm đến cho nút Open Navigation vì đó là đích tài xế cần tới).

LƯU Ý: đây KHÔNG tính là "viết JS" — chỉ là 1 thẻ <iframe> tĩnh và 1 thẻ <a href> tĩnh, vẫn nằm trong phạm vi "chỉ làm tĩnh" của toàn bộ yêu cầu, không vi phạm quy tắc không viết JS.

**Khung 4 — "24_ All Orders" (tab "Complete" đang active):**
- Cùng header, tab "Complete" active.
- Nội dung tab-pane "Complete": 2 card đơn hàng đã HOÀN THÀNH, mỗi card CHỈ CÓ Pickup x2 + Distance/Earnings, KHÔNG có nút Decline/Accept, KHÔNG có bản đồ, KHÔNG có nút Open Navigation — đơn giản nhất trong 4 state.

Tab "Decline" (không có khung minh họa riêng trong ảnh): dựng tương tự tab "Complete" (list card đơn giản, không nút không map) nhưng dùng cho các đơn đã bị từ chối — nếu không chắc nội dung khác biệt gì so với Complete, cứ dùng cấu trúc giống Complete và ghi chú lại trong báo cáo để tôi xác nhận thêm.

YÊU CẦU KỸ THUẬT:
1. Path asset ../ giống convention deliveryApp/home.html.
2. Style viết trong scss/components/_delivery-all-orders.scss (file mới), import đúng thứ tự trong scss/components/_index.scss. Tái dùng tối đa class đã có (request-card, menu-tab, tab-pane, box-empty...) từ các file đã liệt kê ở trên.
3. Sau khi sửa SCSS, tự chạy sass compile để cập nhật css/styles.css.
4. Chỉ làm phần TĨNH — tab chuyển bằng Bootstrap tab có sẵn (data-bs-toggle="tab"), không xử lý Accept/Decline/Open Navigation thật.
5. Vì không có thông số Figma chính xác: ước lượng spacing theo tỷ lệ ảnh (khung điện thoại = 375px), tái dùng biến trong _variable.scss.
6. Không sửa userApp/*.html, không sửa sellerApp/*.html, không sửa deliveryApp/home.html, không sửa vendor css/js.

Sau khi làm xong, liệt kê:
(a) giá trị nào phải tự ước lượng vì ảnh không đủ rõ,
(b) block/pattern nào tái dùng nguyên (đặc biệt request-card từ home.html, tab pattern từ my-product-list.html),
(c) ảnh bản đồ bạn đã tạo bằng cách nào (SVG minh họa hay ảnh PNG placeholder) vì repo chưa có sẵn asset dạng này,
(d) xác nhận nghi vấn text "Add products you love and they'll show up here." ở state rỗng có hợp lý với ngữ cảnh tài xế không, hay cần đổi lại,
(e) tab "Decline" bạn đã xử lý nội dung ra sao vì ảnh không có khung minh họa riêng cho tab này.