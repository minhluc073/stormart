LƯU Ý: làm dựa trên ẢNH đính kèm (Figma đang chặn).
vì vậy hãy đọc file hình images/figma/all-orders.jpg

QUY TẮC CHUNG: Trước khi code bất kỳ khối UI nào, kiểm tra xem userApp/ hoặc sellerApp/ đã có pattern/class tương tự chưa. Nếu có → BẮT BUỘC tái dùng nguyên class/cấu trúc đó, không viết CSS/HTML mới trùng lặp.

Trước tiên đọc để nắm quy ước repo:
- CLAUDE.md
- .claude/rules/css.md
- scss/abstracts/_variable.scss
- sellerApp/home.html, sellerApp/my-product-list.html (BẮT BUỘC — lấy đúng menubar-footer Seller App, và my-product-list.html đã có sẵn pattern tab 4 mục kiểu "View All/Active/Pending/Rejected" + icon filter/sort góc phải header, tái dùng NGUYÊN cho tab "View All/Active/Pending/Cancel" ở trang này)
- userApp/my-order.html (BẮT BUỘC — có sẵn order-item/order-group pattern gần giống, nhưng khối card cụ thể trong ảnh đơn giản hơn (không có ảnh sản phẩm, chỉ có text: mã đơn, tên sp x số lượng, giá, Status, Date, Customer Name) — ưu tiên tái dùng khối "Order #45821" đã code trong sellerApp/home.html phần "Recent Orders" trước đó (gần giống hệt), chỉ thêm dòng "Customer Name" mới)
- sellerApp/home.html (BẮT BUỘC — khối card "Recent Orders" đã code sẵn gần như đúng 100% với card trong ảnh 24, tái dùng nguyên, chỉ bổ sung thêm dòng "Customer Name :")
- userApp/message.html (BẮT BUỘC — có sẵn state empty "message-empty d-none" với icon SVG "hộp + zzz" khớp gần như y hệt icon "No Orders Yet!" ở frame 24 Empty. TÁI DÙNG NGUYÊN icon SVG này, chỉ đổi text "No Orders Yet!" + mô tả "Add products you love and they'll show up here.")
- userApp/order-confirmation.html (BẮT BUỘC — có sẵn khối "Shipping Address" dạng card với tag/badge nhỏ (billing address/shipping address màu khác nhau) + tên người nhận + SĐT + địa chỉ. TÁI DÙNG NGUYÊN cấu trúc này cho khối "Address Information" ở frame 25/26, chỉ cần 2 card (Billing address tag xanh dương, Shipping address tag xanh lá) đặt trong 1 accordion-section)

Ảnh đính kèm gồm 4 frame, thuộc 2 trang khác nhau:

**Trang 1 — "All Orders" (frame 24 + 24 Empty):** 2 STATE của CÙNG 1 trang (có đơn hàng / trống), dùng d-none để ẩn/hiện giống pattern message-empty, → 1 file sellerApp/all-orders.html.

**Trang 2 — "Order Details" (frame 25 + 26):** frame 25 là trạng thái 3 accordion section đều MỞ (Products Information / Order Summary / Address Information), frame 26 là trạng thái chỉ "Address Information" MỞ còn 2 mục kia ĐÓNG (thu gọn) — đây là 2 STATE của accordion Bootstrap collapse (mở/đóng), không phải 2 trang khác nhau → 1 file sellerApp/order-details.html, mặc định hiển thị đúng state frame 26 (thu gọn, chỉ Address Information mở, vì đây có vẻ là trạng thái mặc định khi vào trang), có thể toggle mở bằng data-bs-toggle="collapse" có sẵn của Bootstrap.

NỘI DUNG CHI TIẾT:

**sellerApp/all-orders.html:**
1. Header: back trái, tiêu đề "All Orders" giữa, icon filter/sort phải (tái dùng từ my-product-list.html).
2. Tab 4 mục: "View All" (active) / "Active" / "Pending" / "Cancel" (tái dùng pattern tab từ my-product-list.html).
3. Tab-pane "View All": list order card (tái dùng khối "Order #45821" từ sellerApp/home.html phần Recent Orders + thêm dòng "Customer Name : Jonson Peter"), badge Status đổi màu theo trạng thái: "Processing" (xanh dương nhạt), "Canceled" (đỏ nhạt) — dùng biến màu có sẵn.
4. Tab-pane trống (ví dụ tab "Pending" hoặc theo đúng ảnh 24 Empty ghi tên frame là "24_ All Orders_ Empty" nhưng bấm tab "Order" active dưới menubar — kiểm tra kỹ trong ảnh xem đây là empty của tab nào, nếu không rõ thì mặc định coi đây là state chung khi KHÔNG có đơn hàng nào, đặt trong 1 div riêng "order-empty d-none" ở cuối, ghi chú trong báo cáo cách bạn xử lý): icon SVG tái dùng từ message-empty, text "No Orders Yet!" + "Add products you love and they'll show up here."
5. Menubar-footer tái dùng từ sellerApp/home.html, tab "Order" active (xanh) theo đúng ảnh.

**sellerApp/order-details.html:**
1. Header: back trái, tiêu đề "Order Details" giữa, icon filter/sort phải (theo ảnh 25/26 đều có icon này ở góc phải header — kiểm tra icon này có tác dụng gì trong ngữ cảnh Order Details, nếu không rõ cứ để tĩnh).
2. 3 accordion-section (Bootstrap collapse), mỗi section có header dạng button (tiêu đề bold + icon chevron xoay theo trạng thái mở/đóng):
   - "Products Information": khi mở, hiển thị list sản phẩm (ảnh, tên "Red Winter Long Jacket", "Color: Gray  Size: M", giá "$59.99", số lượng "x1") — 2 sản phẩm theo ảnh.
   - "Order Summary": khi mở, hiển thị "Order #45821", Customer Name, Date, Status (badge "Complete" xanh lá), Total, Delivery Fee "+$8.00", Discount (Coupon) "-$20.00" (màu đỏ), dòng Subtotal đậm cuối cùng.
   - "Address Information": MẶC ĐỊNH MỞ SẴN theo đúng ảnh 26 (state mặc định của trang) — tái dùng nguyên 2 card Billing address / Shipping address từ order-confirmation.html.
3. KHÔNG có menubar-footer ở trang này (kiểm tra kỹ trong ảnh 25/26 không thấy — xác nhận lại, nếu đúng vậy thì bỏ).

YÊU CẦU KỸ THUẬT:
1. Path asset ../ giống convention sellerApp/home.html.
2. Style viết trong scss/components/_all-orders.scss (cho trang 1) và scss/components/_order-details.scss (cho trang 2), 2 file mới, import đúng thứ tự trong scss/components/_index.scss.
3. Sau khi sửa SCSS, tự chạy sass compile để cập nhật css/styles.css.
4. Chỉ làm phần TĨNH nhưng accordion PHẢI dùng đúng cơ chế Bootstrap collapse có sẵn (data-bs-toggle="collapse" data-bs-target="#...") để mở/đóng hoạt động thật được, vì đây là 2 state khác nhau của cùng UI chứ không phải nội dung tĩnh cố định — không cần JS tùy chỉnh thêm ngoài Bootstrap có sẵn.
5. Vì không có thông số Figma chính xác: ước lượng spacing theo tỷ lệ ảnh (khung điện thoại = 375px), tái dùng biến trong _variable.scss.
6. Không sửa userApp/*.html, không sửa các file sellerApp/ đã tạo trước, không sửa vendor css/js.

Sau khi làm xong, liệt kê:
(a) giá trị nào phải tự ước lượng vì ảnh không đủ rõ,
(b) block/pattern nào tái dùng nguyên (đặc biệt Recent Orders card từ home.html, Address card từ order-confirmation.html, empty icon từ message.html),
(c) icon nào trong sprite.svg bị thiếu phải tạm dùng SVG inline,
(d) cách bạn xử lý state "24_ All Orders_ Empty" thuộc tab nào và có đúng ý đồ thiết kế không,
(e) xác nhận trang order-details.html không có menubar-footer.