Trước tiên đọc để nắm quy ước repo:
- CLAUDE.md
- .claude/rules/css.md

Dùng Figma MCP đọc file thiết kế:
https://www.figma.com/design/BqaLFE4qHfoF0iTBnts3lV/StorMart-_--eCommerce-App-UI--themesflat---Copy-?node-id=1-3&p=f&t=UVQpUWl4613ASno9-0

Trong page/section "Add cart & Buying Process", có các frame sau cần convert sang HTML tĩnh (chỉ layout + style, KHÔNG cần JS/tương tác):

18_ All Products (có sản phẩm trong giỏ, hiện icon cart có badge)
19_ All Products (biến thể khác, kiểm tra khác biệt với 18 nếu có)
20_ All Products - Empty cart (state "Your Cart is feeling a Little Empty")
21_ Order Confirmation (đầy đủ: shipping address, sản phẩm, payment method, summary, nút Place Order)
22_ Order Placed - Successfully (modal/overlay "Order Placed Successfully" + Track Order/Continue)
23_ Order Confirmation - Add new card (modal nhập thẻ: card holder, số thẻ, expiry, CVV, Save Card Details)
24_ Shipping Address (danh sách địa chỉ)
25_ Shipping Address - No Address Found (empty state)
26_ Add a New Address (form: contact name, phone, country, state, city, zip, address, set as default)

YÊU CẦU QUAN TRỌNG:
1. Trước khi tạo file mới, hãy liệt kê các file .html hiện có trong userApp/ và cho tôi biết file nào đã khớp với frame nào trong 9 frame trên (ví dụ address.html có thể tương ứng frame 24, add-new-address.html tương ứng frame 26...). Chỉ tạo file mới cho những frame KHÔNG có file tương ứng, đặt tên theo đúng convention hiện tại (kebab-case, không viết hoa).
2. Với các frame là "state" của cùng 1 trang (VD: 18/19/20 đều là All Products nhưng khác trạng thái giỏ hàng; 24/25 đều là Shipping Address nhưng khác trạng thái có/không có địa chỉ) — không tạo file riêng cho mỗi state, mà thêm các block tương ứng vào CÙNG 1 file, có thể dùng class ẩn/hiện (d-none) để phân biệt state, tôi sẽ tự toggle sau.
3. Với 22 (Order Placed Successfully) và 23 (Add new card) là modal/overlay — chèn vào đúng file cha (Order Confirmation) dưới dạng modal Bootstrap có sẵn pattern trong repo (kiểm tra file khác đã có modal tương tự để theo đúng cấu trúc, class, id).
4. Style viết theo SCSS partial trong scss/components/ (mỗi UI area 1 file, đúng theo CLAUDE.md), import vào đúng thứ tự trong index/main. Không viết CSS trực tiếp trong HTML.
5. Sau khi sửa SCSS, tự chạy sass compile để cập nhật css/styles.css.
6. Chỉ làm phần TĨNH — không viết JS, không cần xử lý click/toggle/gọi API.
7. Không sửa file vendor trong css/ hoặc js/.
8. Asset path dùng dạng ../ (relative) đúng convention thư mục userApp.

Bám sát pixel spacing, radius, màu sắc, font-size theo đúng ảnh Figma của từng frame.

Lưu ý riêng cho frame 21/22/23:
- Đây là CÙNG 1 trang order-confirmation.html. Frame 22 và 23 chỉ là trang 21 kèm modal đè lên (Order Placed Successfully / Add new card).
- Khối "Shipping Address" (card tên người nhận + SĐT + địa chỉ + mũi tên) chỉ code 1 lần trong file, dùng chung cho cả 3 trạng thái.
- Khối này KHÁC với trang Shipping Address list (frame 24/25) - đó là trang chọn/quản lý địa chỉ riêng, không phải component này.


