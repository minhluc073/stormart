Trước tiên đọc để nắm quy ước:
- CLAUDE.md
- .claude/rules/css.md
- userApp/profile.html (tham khảo pattern modal Bootstrap: class="modal fade", modal-dialog modal-dialog-centered, modal-content — dùng đúng pattern này, không tự bịa cấu trúc modal khác)
- userApp/cart.html (tham khảo cách viết header, page-width, cart-item... để đồng bộ style sản phẩm trong danh sách)

Dùng Figma MCP đọc file thiết kế:



Tạo mới file userApp/order-confirmation.html (file này chưa tồn tại, dù cart.html đã có link trỏ tới nó qua nút Checkout).

Nội dung trang dựa trên 3 frame:

1. "21_ Order Confirmation" — làm NỘI DUNG CHÍNH của trang, gồm theo đúng thứ tự:

   - Header: nút back, tiêu đề "Order Confirmation"
   - Block "Shipping Address": card có tên người nhận (Jonson Roy #0154), SĐT, địa chỉ, mũi tên `>` bên phải để đổi địa chỉ
   - Block "Products": danh sách 4 sản phẩm, mỗi sản phẩm có ảnh, tên, màu/size, giá gạch/giá sale, nút xóa, bộ đếm số lượng (giống cart-item trong cart.html, tái dùng đúng class đó nếu style khớp)
   - Block "Payment Method": radio chọn giữa 1 thẻ đã lưu (hiện số thẻ ẩn, logo Visa, Expiry Date, ô nhập CVV), "Add new card", "Google Pay", "PayPal"
   - Block "Summary": Item Total, Discount, Subtotal, Promo Codes (có link "Enter"), Shipping Fee
   - Footer cố định dưới: Total tiền bên trái, nút "Place Order" bên phải

2. "22_ Order Placed Successfully" — convert thành 1 MODAL, đặt id="orderPlacedModal":
   - Icon giỏ hàng minh họa, nút đóng (X) góc trên phải
   - Tiêu đề "Order Placed Successfully!"
   - Text mô tả cảm ơn
   - 2 nút: "Track Order" (outline) và "Continue" (dark, primary)

3. "23_ Order Confirmation - Add new card" — convert thành 1 MODAL KHÁC, đặt id="addNewCardModal":
   - Tiêu đề "Add new card" + logo các loại thẻ (Mastercard, Visa, JCB, Amex)
   - Input: Cardholder name, Card Number, Expire Date (MM/YY) + CVV (2 input cùng hàng)
   - Toggle switch "Save Card Details"
   - Nút "Save Card" (dark, full-width)

YÊU CẦU KỸ THUẬT:
- Cả 2 modal đặt trong CÙNG file order-confirmation.html, ngay trước thẻ đóng </body>, theo đúng pattern Bootstrap modal đã dùng trong profile.html.
- Mục "Add new card" trong Payment Method (radio) gắn attribute data-bs-toggle="modal" data-bs-target="#addNewCardModal" để có thể test mở bằng tay (không cần viết JS thêm, Bootstrap tự xử lý vì bootstrap.min.js đã có sẵn trong repo).
- Nút "Place Order" gắn data-bs-toggle="modal" data-bs-target="#orderPlacedModal" để test mở modal thành công.
- Style viết trong scss/components/_order.scss (tạo mới), import vào đúng thứ tự @use trong scss/main.scss.
- Sau khi sửa SCSS, tự chạy sass compile để cập nhật css/styles.css.
- Không sửa cart.html, profile.html, change-password.html — chỉ đọc tham khảo.
- Asset path dùng ../ theo đúng convention userApp.
- Chỉ làm phần TĨNH, giữ nguyên toggle switch ở dạng HTML input checkbox (chưa cần xử lý logic JS lưu trạng thái).

Bám sát pixel spacing, radius, màu sắc, font-size theo đúng 3 frame Figma.