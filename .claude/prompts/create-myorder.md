LƯU Ý: Figma MCP vẫn đang giới hạn (rate limit), làm dựa trên ẢNH đính kèm.
vì vậy hãy đọc img từ images/figma/my-order.jpg
Trước tiên đọc để nắm quy ước:
- CLAUDE.md
- .claude/rules/css.md
- scss/abstracts/_variable.scss (ưu tiên tái dùng biến màu/spacing/font-size có sẵn)
- userApp/address.html (BẮT BUỘC đọc — tái dùng ĐÚNG cấu trúc tab: class="menu-tab", "tab-link", data-bs-toggle="tab", "tab-content", "tab-pane fade". Không tự viết cơ chế tab mới)
- userApp/cart.html (tham khảo cart-item, state rỗng d-none, header có ô search + icon filter nếu có)

Ảnh đính kèm gồm 3 frame CÙNG 1 trang "My Order":
- "37_ My Order": tab "View All" đang active, có dữ liệu (3 nhóm đơn: Awaiting Delivery, Complete Delivery, Pending Delivery)
- "38_ Empty Order": tab "Cancelled" đang active, rỗng
- "39_ Empty Order": tab "Completed" đang active, có 1 đơn với nút "Review"

Tạo mới file userApp/my-order.html:

1. Header:
   - Nút back
   - Thanh search "Order ID, product or store..." với icon kính lúp bên trái
   - Icon filter (sliders) bên phải

2. Tab bar: View All | Pending | Cancelled | Completed (dùng đúng pattern tab của address.html, tab "View All" active mặc định)

3. Nội dung mỗi tab (tab-pane riêng):
   - TAB "View All": có dữ liệu, các nhóm đơn theo NGÀY (label ngày "Sep 16, 2025" bên phải mỗi nhóm), mỗi nhóm có tiêu đề trạng thái (Awaiting Delivery / Complete Delivery / Pending Delivery), bên dưới là order-item gồm: ảnh sản phẩm, tên, Color/Size, giá, số lượng "x1", và 1 hàng riêng "Click to Check Tracking Details" (icon xe giao hàng + text ngày dự kiến/đã giao + mũi tên `>`)
   - TAB "Pending": để trống nội dung mẫu tạm (chưa có ảnh mẫu), dùng chung cấu trúc order-item như trên nếu cần preview, hoặc để rỗng — bạn quyết định hợp lý, không quan trọng vì không có ảnh mẫu cho tab này
   - TAB "Cancelled": state RỖNG — illustration túi rỗng (giống style empty cart đã làm trước đây trong cart.html, tái dùng icon/asset đó nếu là cùng bộ minh họa), tiêu đề "No Orders Yet!", text mô tả "Add products you love and they'll show up here.", nút "Buy Products" (dark, giống style btn-dark đã dùng)
   - TAB "Completed": có dữ liệu, nhóm "Awaiting Review" (label ngày bên phải), order-item có thêm nút "Review" (outline, góc phải) thay vì hàng tracking

4. Style viết trong scss/components/_my-order.scss (tạo mới), import đúng thứ tự @use vào scss/main.scss.

Vì không có thông số Figma chính xác:
- Ước lượng spacing/kích thước theo tỷ lệ trong ảnh (khung điện thoại = 375px).
- Tái dùng biến màu/spacing đã có trong _variable.scss, đặc biệt màu xanh dương của link tab active, badge, nút outline.
- So khớp font-size với class typography đã có sẵn.
- Nút "Buy Products" và illustration rỗng nên COPY NGUYÊN từ state rỗng đã làm trong cart.html nếu style giống hệt, tránh viết lại từ đầu.

YÊU CẦU KỸ THUẬT:
- Sau khi sửa SCSS, tự chạy sass compile để cập nhật css/styles.css.
- Chỉ làm phần TĨNH, tab chuyển bằng Bootstrap có sẵn (data-bs-toggle="tab"), không cần JS thêm.
- Asset path dùng ../ theo convention userApp. Ảnh sản phẩm dùng ảnh có sẵn trong images/user/product/.

Sau khi làm xong, liệt kê: (a) giá trị phải tự ước lượng vì ảnh không đủ rõ, (b) biến/class/asset nào đã tái dùng được từ cart.html hoặc address.html, (c) icon nào trong sprite.svg bị thiếu phải tạm dùng SVG inline.

sau khi làm xong rồi thì đọc tiếp img review.jpg làm tiếp 40_Write reivew là link từ button review trong Completed và làm popup success ở screen 41_review success luôn popup này bấm từ button Review now của screen 40_Write reivew 