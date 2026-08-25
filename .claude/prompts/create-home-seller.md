LƯU Ý: Figma MCP đang bị giới hạn (rate limit), lần này làm dựa trên ẢNH đính kèm.
vì vậy hãy đọc img từ images/figma/seller-home.jpg rồi đọc từ đó.

Trước tiên đọc để nắm quy ước repo:
- CLAUDE.md
- .claude/rules/css.md
- scss/abstracts/_variable.scss (ưu tiên tái sử dụng biến màu/shadow/spacing có sẵn, KHÔNG tự bịa màu mới nếu đã có biến gần đúng)
- icon/sprite.svg (kiểm tra icon nào đã có sẵn: home/homeFill, bag, profit, document, truck, bell, star, plus, trash, arrow-down... — nếu thiếu icon phù hợp (ví dụ icon "order", "wallet", "pending/clock", "box stock") thì dùng SVG inline tạm, KHÔNG tự chế thêm id mới vào sprite.svg)

Đây là trang ĐẦU TIÊN của Seller App (sellerApp/ hiện đang trống — không có file nào để đối chiếu trùng lặp, xác nhận điều này trước khi tạo file mới).

Tham khảo BẮT BUỘC các pattern đã làm ở userApp/ để giữ nhất quán style giữa 2 app:
- userApp/home.html — cấu trúc header (avatar + tên + dòng phụ + icon bell có badge số ở góc phải), block box-title + link "See more/See All" ở góc phải mỗi section, cấu trúc menubar-footer (item + icon svg 2 lớp icon/icon-active, item giữa dạng nút nổi), cách include head/font/css/manifest, cách gọi script cuối file.
- userApp/all-seller.html hoặc all-products.html — pattern card sản phẩm (ảnh, badge trạng thái góc trên trái, rating, sold, giá) để tái dùng cho khối "Top Product Selling" (ở đây badge là "Active" màu xanh lá thay vì % giảm giá, và có thêm 2 nút "Delete" / "Edit" bên dưới card).
- userApp/my-order.html — pattern card đơn hàng (mã đơn, tên sản phẩm x số lượng, giá, badge trạng thái "Processing", ngày) để tái dùng cho khối "Recent Orders" (rút gọn, hiển thị dạng 2 card cạnh nhau trong home, không cần list đầy đủ).

Ảnh đính kèm là frame "10_ Home" (Seller App), gồm các khối theo đúng thứ tự:

1. Header (nền xanh đậm bg-primary-dark, giống style header của userApp nhưng đổi nội dung):
   - Logo tròn 2 màu (đại diện shop) + tên "TrueStyle Store"
   - Icon sao + rating "4.9 (1,234)" ngay dưới/cạnh tên
   - Icon bell bên phải, có badge số thông báo (chấm vàng số "2" theo ảnh)

2. Grid thống kê 2x2 (4 stat-card, mỗi card: icon tròn nền pastel riêng màu + số liệu lớn + label nhỏ):
   - $24,426 — Today Sales (icon ví, nền tím nhạt)
   - 4,426 — Active Orders (icon túi/hộp, nền xanh lá nhạt)
   - 4,426 — Pending Orders (icon đồng hồ/chờ, nền vàng nhạt)
   - 4,426 — Total Stocks (icon hộp/kho, nền hồng nhạt)

3. Section "Recent Orders" + link "See All" góc phải:
   - 2 card đơn hàng cạnh nhau (grid 2 cột), mỗi card:
     - "Order #45821" + icon mũi tên phải
     - Tên sản phẩm x số lượng — giá (VD: "Slim Fit Shirt x 2" — "$420")
     - "Status :" + badge trạng thái (VD "Processing" nền xanh nhạt chữ xanh)
     - "Date :" + ngày (VD "24 Feb 2026")

4. Section "Top Product Selling" + link "See All" góc phải:
   - Grid 2 cột sản phẩm, mỗi card:
     - Ảnh sản phẩm, badge "Active" (nền xanh lá, chữ trắng) góc trên trái
     - Icon nhỏ + số "Sold" và icon nhỏ + số "Stock" cùng 1 dòng
     - Tên sản phẩm (bold)
     - Icon sao + rating (VD "4.8 (379)")
     - 2 nút cạnh nhau: "Delete" (outline đỏ, icon trash) và "Edit" (outline xám/đen, icon edit)

5. Bottom nav (menubar-footer, style giống userApp nhưng đổi label/icon):
   - Home (active, màu xanh) — Order — nút tròn nổi giữa dấu "+" (nền xanh đậm, để chờ hành động thêm sản phẩm/đơn) — Wallet — Profile
   - Dùng đúng cấu trúc <div class="menubar-footer"><div class="inner-bar">... như userApp/home.html, chỉ đổi icon/label, item giữa thay icon cart bằng icon "plus" có sẵn trong sprite.svg

YÊU CẦU KỸ THUẬT:
1. Tạo file mới sellerApp/home.html — dùng path asset dạng ../ (relative), giống convention userApp/ vì cùng độ sâu 1 cấp từ root.
2. Copy đúng cấu trúc <head> (font, bootstrap, styles.css, manifest ../_manifest.json, favicon) và script cuối file như userApp/home.html để nhất quán.
3. Style viết trong file mới scss/components/_seller-home.scss (không viết CSS trực tiếp trong HTML), import vào đúng thứ tự trong scss/components/_index.scss.
4. Ưu tiên tái dùng class/pattern đã có (box-title, btn-view, menubar-footer, card-product, box-user...) nếu style gần giống — chỉ thêm class mới khi thực sự cần khác biệt (VD: stat-card, badge trạng thái).
5. Sau khi sửa SCSS, tự chạy sass compile để cập nhật css/styles.css (sass scss/app.scss css/styles.css).
6. Chỉ làm phần TĨNH — không JS, không xử lý click/toggle/gọi API. Nút "+" giữa menubar chỉ cần là link/anchor tĩnh, không cần mở modal.
7. Không sửa file vendor trong css/ hoặc js/, không sửa bất kỳ file nào trong userApp/ (chỉ đọc tham khảo).
8. Bám sát pixel spacing, radius, màu sắc, font-size theo đúng ảnh — nếu ảnh không đủ rõ để đo chính xác, ước lượng theo tỷ lệ khung điện thoại 375px và dùng biến có sẵn trong _variable.scss gần nhất.

Sau khi làm xong, liệt kê:
(a) giá trị nào phải tự ước lượng vì ảnh không đủ rõ,
(b) block/pattern nào đã tái dùng được từ userApp/ (đặc biệt header, menubar-footer, card-product),
(c) icon nào trong sprite.svg bị thiếu phải tạm dùng SVG inline.