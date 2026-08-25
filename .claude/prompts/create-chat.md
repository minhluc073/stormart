LƯU Ý: Figma MCP đang bị giới hạn (rate limit), lần này làm dựa trên ẢNH đính kèm, không đọc được Figma trực tiếp.
vì vậy hãy đọc img từ images/figma/mess.jpg

Trước tiên đọc để nắm quy ước:
- CLAUDE.md
- .claude/rules/css.md
- scss/abstracts/_variable.scss (bắt buộc — ưu tiên tái sử dụng biến màu, spacing, font-size đã khai báo ở đây thay vì tự tạo giá trị mới)
- userApp/home.html hoặc file có bottom tab bar (Home/Message/Cart/Favorites/Profile) — copy đúng nguyên khối bottom-nav này, không tự viết lại từ đầu
- userApp/cart.html (tham khảo state rỗng d-none, xem cách nó cấu trúc "STATE: empty" để làm tương tự cho Message)

Ảnh đính kèm gồm 2 frame CÙNG 1 route "Message" (tab chính trong bottom-nav):
- "35_ Message - Empty": chưa có hội thoại nào
- "35_ Message - List of chat": danh sách hội thoại

Vì 2 frame có cùng khung sườn (header, bottom-nav giống hệt nhau), tạo MỘT file userApp/message.html, dùng d-none để ẩn/hiện giữa 2 state, theo đúng cách cart.html đang làm với state rỗng.

Vì không có thông số chính xác từ Figma, hãy làm theo cách sau để giảm sai lệch:
1. Ước lượng khoảng cách/kích thước dựa trên TỶ LỆ tương đối trong ảnh (chiều rộng khung điện thoại = 375px chuẩn mobile).
2. So khớp màu sắc với biến đã có trong _variable.scss (màu xanh navy nút tròn Cart ở bottom-nav, badge số...).
3. So khớp font-size/heading với class typography đã có sẵn, không tự đặt giá trị mới.
4. Nếu chi tiết nào trong ảnh không rõ, dùng giá trị hợp lý gần nhất và liệt kê ở cuối.

Nội dung cụ thể:

STATE 1 - "35_ Message - Empty" (hiển thị mặc định, state kia thêm d-none):
- Header: nút back, tiêu đề "Message", icon `...` bên phải
- Illustration rỗng (icon hộp/túi có hiệu ứng lấp lánh xung quanh — dùng SVG đơn giản tạm nếu không có sẵn asset, báo tôi nếu cần ảnh minh họa thật)
- Tiêu đề "No Orders Yet!"
- Text mô tả "Add products you love and they'll show up here." (2 dòng, canh giữa)
- Bottom tab bar: Home, Message (đang active, có icon khác/tô đậm), Cart (nút tròn nổi ở giữa), Favorites, Profile

STATE 2 - "35_ Message - List of chat" (thêm class d-none):
- Header: nút back, tiêu đề "Message", icon `...` bên phải (giống hệt state 1)
- Ô tìm kiếm "Search message..." với icon kính lúp bên trái
- Danh sách hội thoại, mỗi item gồm:
  - Avatar tròn
  - Tên người gửi (bold) + timestamp bên phải (VD "04:00 PM", "May 30", "May 20")
  - Dòng preview tin nhắn cuối (text xám, cắt bớt nếu dài) — 1 vài item có badge số tròn xanh bên phải (unread count)
  - Danh sách người: Cody Fisher, Devon Lane, Jacob Jones, Jane Cooper, Robert Fox, Jerome Bell, Jacob Jones
- Bottom tab bar giống hệt state 1

YÊU CẦU KỸ THUẬT:
- Style viết trong scss/components/_message.scss (tạo mới), import đúng thứ tự @use vào scss/main.scss.
- Sau khi sửa SCSS, tự chạy sass compile để cập nhật css/styles.css.
- Chỉ làm phần TĨNH, chưa cần JS toggle giữa 2 state (tôi tự bật d-none để test).
- Asset path dùng ../ theo đúng convention userApp. Avatar dùng ảnh có sẵn trong images/user/ (kiểm tra thư mục để chọn ảnh phù hợp cho từng người).

Sau khi làm xong, liệt kê ngắn gọn: (a) giá trị nào bạn phải tự ước lượng vì ảnh không đủ rõ, (b) biến/class có sẵn nào đã tái sử dụng được, (c) icon nào trong sprite.svg bị thiếu (nếu có) phải tạm dùng SVG inline.