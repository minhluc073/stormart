LƯU Ý: làm dựa trên ẢNH đính kèm (Figma đang chặn).
vì vậy hãy đọc file hình images/figma/homedelivery.png

QUY TẮC CHUNG: Trước khi code bất kỳ khối UI nào, kiểm tra xem userApp/ hoặc sellerApp/ đã có pattern/class tương tự chưa. Nếu có → BẮT BUỘC tái dùng nguyên class/cấu trúc đó, không viết CSS/HTML mới trùng lặp. Chỉ tạo class mới khi thực sự không có gì tương tự.

Đây là APP THỨ 3 của dự án: "deliveryApp" (giao diện tài xế giao hàng) — hiện thư mục deliveryApp/ CHƯA TỒN TẠI, đây là trang đầu tiên được tạo, giống hệt tình huống lúc bắt đầu sellerApp/home.html trước đây. Xác nhận lại điều này (deliveryApp/ trống) trước khi tạo file mới.

Trước tiên đọc để nắm quy ước repo:
- CLAUDE.md
- .claude/rules/css.md
- scss/abstracts/_variable.scss
- sellerApp/home.html (BẮT BUỘC — đây là file gần nhất về Ý TƯỞNG bố cục (header dashboard + stat-card 2x2 + box-title/See All + card-list + menubar-footer), TÁI DÙNG cấu trúc/class chung này (box-title, btn-view, stat-card, menubar-footer) làm khung xương cho trang deliveryApp/home.html, dù nội dung cụ thể khác)
- userApp/my-order.html (tham khảo pattern order-item dạng list cho khối "Earnings History")
- userApp/product-detail.html (tham khảo cấu trúc swiper — dùng cho khối "Recent Request" vì trong ảnh có 2 card cạnh nhau, card thứ 2 bị cắt ở mép phải, cho thấy đây là 1 carousel/swiper ngang chứ không phải grid tĩnh — dùng swiper.js đã có sẵn trong project theo đúng cách khởi tạo ở product-detail.html)
- icon/sprite.svg (kiểm tra icon có sẵn: truck, location, bell, user, home/homeFill... Với các icon KHÔNG có sẵn (delivery-box, wallet, decline/x-circle, accept/check-circle, clock nhỏ, pickup pin, dropoff pin...), dùng SVG inline tạm, KHÔNG tự thêm id mới vào sprite.svg vì không có Figma export)

Ảnh đính kèm là frame "10_ Home" thuộc Delivery App, gồm các khối theo đúng thứ tự:

1. Header (nền xanh navy đậm, giống tông màu header sellerApp/home.html):
   - Avatar tài xế (ảnh tròn, có chấm trạng thái online màu xanh dương ở góc) + tên "Sam Charam"
   - Dòng dưới: icon ví nhỏ + "$424 (Available)" (chữ xanh lá nhạt)
   - Icon bell bên phải, có badge chấm vàng thông báo

2. Grid thống kê 2x2 (tái dùng NGUYÊN pattern stat-card từ sellerApp/home.html, chỉ đổi icon/số liệu):
   - 26 — Active Orders (icon hộp, nền xanh lá nhạt)
   - 1,234 — Total Orders (icon hộp khác, nền cam nhạt)
   - $524 — Today Earning (icon ví, nền tím nhạt)
   - $52,400.00 — Total Earning (icon túi tiền, nền hồng nhạt)

3. Section "Recent Request" + link "See All" góc phải:
   - Swiper ngang các card đơn giao hàng, mỗi card gồm:
     - Dòng "Pickup" (icon location tròn xanh) + tên địa điểm ("Green Mart Store") + badge thời gian bên phải (icon đồng hồ nhỏ + "10:00", nền đỏ nhạt)
     - Dòng "Pickup" thứ 2 thực chất là "Dropoff" (icon vị trí/mũi tên khác, tông vàng) + địa chỉ giao ("House 12, Road 8, Uttara") — kiểm tra kỹ trong ảnh xem đây có đúng là 2 label khác nhau (Pickup/Dropoff) hay cả 2 đều ghi "Pickup" do lỗi hiển thị, giữ đúng theo ảnh và ghi chú lại nếu nghi ngờ nhãn thứ 2 bị sai.
     - Dòng chia 2 cột: "Distance" — "2.7 KM" | "Earnings" — "$12.00"
     - 2 nút cạnh nhau: "Decline" (outline đỏ nhạt, icon x) / "Accept" (nền xanh dương đậm, icon check)

4. Section "Earnings History" + link "See All" góc phải:
   - List item (tái dùng pattern order-item từ my-order.html): "Order #8472" + badge "Paid" (xanh lá) cùng dòng, số tiền "Commission $120" bên phải (chữ xanh dương, bold); dòng dưới tên khách "Karim Ahmed" + địa chỉ "Gulshan, Dhaka"; dòng cuối "Feb 18, 2026 · 3:45 PM" bên trái, "Total: $850" bên phải — lặp lại 2 item theo ảnh.

5. Bottom menubar-footer (tái dùng cấu trúc từ sellerApp/home.html, đổi nhãn/icon):
   - Home (active, xanh) — Message — nút tròn nổi giữa (icon túi giao hàng/delivery bag) — Wallet — Profile

YÊU CẦU KỸ THUẬT:
1. Tạo file mới deliveryApp/home.html — path asset dạng ../ (relative), cùng độ sâu thư mục với sellerApp/userApp.
2. Copy đúng cấu trúc <head> (font, bootstrap, styles.css, manifest ../_manifest.json, favicon) và script cuối file (bao gồm swiper.js nếu dùng) như sellerApp/home.html để nhất quán.
3. Style viết trong file mới scss/components/_delivery-home.scss, import vào đúng thứ tự trong scss/components/_index.scss.
4. Ưu tiên tái dùng class/pattern đã có (box-title, btn-view, menubar-footer, stat-card, order-item) — chỉ thêm class mới khi cần khác biệt thật sự (VD: request-card, badge-time).
5. Sau khi sửa SCSS, tự chạy sass compile để cập nhật css/styles.css.
6. Chỉ làm phần TĨNH — swiper chỉ cần hiển thị đúng card đầu + phần card thứ 2 bị cắt mép theo ảnh (không cần xử lý swipe thật), nút Decline/Accept không cần xử lý logic.
7. Không sửa file vendor trong css/ hoặc js/, không sửa bất kỳ file nào trong userApp/ hoặc sellerApp/ (chỉ đọc tham khảo).
8. Bám sát pixel spacing, radius, màu sắc, font-size theo đúng ảnh.

Sau khi làm xong, liệt kê:
(a) giá trị nào phải tự ước lượng vì ảnh không đủ rõ,
(b) block/pattern nào tái dùng được từ sellerApp/home.html và userApp/my-order.html,
(c) icon nào phải tạm dùng SVG inline vì sprite.svg chưa có,
(d) xác nhận lại nghi vấn nhãn "Pickup" bị lặp lại 2 lần trong 1 card — có đúng vậy trong ảnh hay dòng thứ 2 phải là "Dropoff".