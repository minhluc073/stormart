LƯU Ý: Figma MCP đang bị giới hạn (rate limit), lần này làm dựa trên ẢNH đính kèm.
vì vậy hãy đọc img từ images/figma/order-tracking.jpg
Trước tiên đọc để nắm quy ước:
- CLAUDE.md
- .claude/rules/css.md
- scss/abstracts/_variable.scss (ưu tiên tái sử dụng biến màu/spacing/font-size có sẵn — đặc biệt màu đỏ cảnh báo và màu xanh navy nút primary, chắc đã có biến sẵn dùng ở nơi khác)
- userApp/change-password.html (tham khảo pattern modal Bootstrap: class="modal fade", modal-dialog modal-dialog-centered, modal-content)
- userApp/cart.html (tham khảo cart-item / order-item nếu file này có cấu trúc sản phẩm dạng ảnh + tên + color/size + giá + số lượng, tái dùng đúng class đó cho "Packaged items")

Ảnh đính kèm gồm 4 frame CÙNG 1 trang "Order Tracking" (không tách file):
- "42_ Orders Tracking": trạng thái mặc định, timeline chỉ hiện 1 mốc đầu ("In Transit"), có nút "View more"
- "43_ Orders Tracking": timeline đã mở rộng đầy đủ 5 mốc (kết quả sau khi bấm "View more"), không còn nút "View more"
- "44_ Cancel Order": modal "Cancel Order" đè lên trang, được mở từ nút "Returns/ Refunds"
- "45_ Cancel Order - Details": mốc đầu tiên của timeline đổi thành "Order Refund/Cancel" (đỏ) kèm lý do — đây là trạng thái SAU KHI submit modal ở 44

LUỒNG LOGIC (chỉ cần đúng markup tĩnh mô phỏng, không cần JS thật):
1. Trang tải lên → timeline ở dạng collapse (giống 42): mốc đầu "In Transit" hiện đậm/active, 3 mốc giữa bị mờ/ẩn, nút "View more" hiện.
2. Bấm "View more" → timeline mở rộng đủ 5 mốc (giống 43), nút "View more" ẩn đi.
3. Bấm nút "Returns/ Refunds" ở dưới cùng trang → mở modal "Cancel Order" (44).
4. Trong modal: chọn dropdown "Select a Reason", nhập textarea "Additional Information", tick checkbox Terms, bấm "Submit" → đóng modal, mốc đầu tiên của timeline đổi từ "In Transit" (đen) sang "Order Refund/Cancel" (đỏ) kèm lý do đã chọn (giống 45).

Tạo mới file userApp/order-tracking.html:

1. Header: nút back, tiêu đề "Tracking"

2. Banner "Delivery: Oct 18 – 23" (nền xanh nhạt, chữ xanh navy, canh giữa)

3. Block thông tin đơn:
   - Tên sản phẩm "Vibrant Sunset Maxi Dress"
   - "Tracking number: 1Z9999W80307724443" kèm link "Copy" (đỏ) bên phải

4. Timeline (viết đủ 5 mốc theo bản mở rộng 43, xử lý 2 trạng thái bằng class ẩn/hiện):
   - Mốc 1: viết 2 block riêng, mặc định chỉ 1 hiện:
     - Block A (hiện mặc định): "In Transit" (đen, đậm) + "Your package arrived at local airport" + timestamp
     - Block B (thêm class d-none): "Order Refund/Cancel" (đỏ, đậm) + text lý do màu đỏ (ví dụ "Delivery time is too long") + timestamp — dùng để mô phỏng trạng thái 45, tôi tự bật d-none để xem
   - Mốc 2-5: "Package left transit country/region" + timestamp, mốc 2 rõ nét, mốc 3-5 dùng class mờ/nhạt hơn (opacity thấp) để mô phỏng trạng thái collapse ban đầu
   - Sau mốc 2: thêm nút "View more" (border, nhỏ) — object này cùng với việc làm mờ mốc 3-5 nên đặt trong 1 wrapper có thể toggle bằng class d-none, để tôi tự test bằng tay chuyển giữa state 42 (collapse) và 43 (expand)

5. Block địa chỉ: icon nhà + địa chỉ đầy đủ 2 dòng, dòng dưới có số điện thoại ẩn 1 phần

6. Block "Packaged items": card sản phẩm (ảnh, tên, Color/Size, giá, số lượng "x1") — tái dùng đúng style cart-item nếu cart.html có cấu trúc tương tự

7. 2 nút cuối trang: "Add to Cart" (outline) và "Returns/ Refunds" (outline) — nút "Returns/ Refunds" gắn data-bs-toggle="modal" data-bs-target="#cancelOrderModal"

8. Modal "Cancel Order" (id="cancelOrderModal", dùng pattern modal thường như change-password.html):
   - Tiêu đề "Cancel Order" + nút đóng (X, đỏ) góc phải
   - "Refund items": card sản phẩm giống mục 6 (ảnh, tên, Color/Size, giá, "x1")
   - Label "Select a Reason" + dropdown select
   - Label "Additional Information" + textarea placeholder "e.g. Additional details"
   - Checkbox "I agree with the Term and Conditions" (link "Term and Conditions" riêng)
   - Nút "Submit" (nền xanh navy, full-width)

YÊU CẦU KỸ THUẬT:
- Vì không có thông số Figma chính xác: ước lượng spacing theo tỷ lệ ảnh (khung điện thoại = 375px), tái dùng biến trong _variable.scss, so khớp font-size với class typography có sẵn.
- Style viết trong scss/components/_order-tracking.scss (tạo mới), import đúng thứ tự @use vào scss/main.scss.
- Sau khi sửa SCSS, tự chạy sass compile để cập nhật css/styles.css.
- Chỉ làm phần TĨNH — modal chỉ cần mở được bằng Bootstrap data-attribute có sẵn, chưa cần JS xử lý submit thật hay toggle View more thật (tôi tự bật/tắt class d-none để test).
- Asset path dùng ../ theo convention userApp. Ảnh sản phẩm dùng ảnh có sẵn trong images/user/product/.
- KHÔNG sửa change-password.html, cart.html — chỉ đọc tham khảo.

Sau khi làm xong, liệt kê: (a) giá trị phải tự ước lượng vì ảnh không đủ rõ, (b) block/pattern nào đã tái dùng được từ file khác, (c) icon nào trong sprite.svg bị thiếu (icon nhà, timeline dot, copy...) phải tạm dùng SVG inline.

Sau khi tạo xong userApp/order-tracking.html, cập nhật link trong userApp/my-order.html:
- Trong tab-pane "View All", có 3 dòng "Click to Check Tracking Details" (thuộc 3 nhóm Awaiting Delivery, Complete Delivery, Pending Delivery). Sửa mỗi dòng thành thẻ <a href="order-tracking.html"> (nếu hiện đang là div không có href hoặc href="#", đổi thành href="order-tracking.html"; giữ nguyên toàn bộ nội dung/icon/text bên trong, chỉ đổi phần thẻ bọc ngoài hoặc thêm href).
- Nếu userApp/my-order.html chưa tồn tại hoặc không tìm thấy đúng 3 dòng này, báo tôi biết, không tự tạo thêm nội dung vào file đó.
- KHÔNG đụng vào nút "Review" trong tab "Completed" — phần đó sẽ làm ở bước khác sau.