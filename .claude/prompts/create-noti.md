LƯU Ý: Figma MCP đang bị giới hạn (rate limit), lần này làm dựa trên ẢNH đính kèm.
vì vậy hãy đọc img từ images/figma/noti.jpg
Trước tiên đọc để nắm quy ước:
- CLAUDE.md
- .claude/rules/css.md
- scss/abstracts/_variable.scss (ưu tiên tái sử dụng biến màu/spacing/font-size có sẵn)
- userApp/home.html (BẮT BUỘC — có icon chuông <span class="box-noti"> ở header, chưa gắn href, sẽ nối link tới đây)
- userApp/cart.html (tham khảo state rỗng d-none, illustration rỗng đã dùng cho empty cart — tái dùng nếu cùng bộ minh họa với "Still No Notification")

Ảnh đính kèm gồm 2 frame CÙNG 1 trang "Notification":
- "46_ Notification": có dữ liệu, nhóm theo "Today", "Yesterday", "Earlier"
- "47_ Empty Notification": trạng thái rỗng "Still No Notification"

Tạo mới file userApp/notification.html, dùng d-none để ẩn/hiện giữa 2 state (giống cách cart.html xử lý state rỗng):

1. Header: nút back, tiêu đề "Notification", 2 icon bên phải (giỏ hàng/túi và icon tròn cài đặt — kiểm tra sprite.svg xem có icon phù hợp, nếu không có báo tôi)

2. STATE 1 - có dữ liệu (hiện mặc định):
   - Nhóm theo label ngày: "Today", "Yesterday", "Earlier"
   - Mỗi notification-item gồm: icon tròn màu (mỗi loại thông báo màu khác nhau: xanh lá cho Order Shipped/Delivered, đỏ nhạt cho Flash Sale, vàng cho Item Back in Stock, xanh dương cho Price Drop/New Collection, đỏ đậm cho Welcome Gift/Order Canceled), tiêu đề (bold, 1 số có emoji 🎉), timestamp bên phải ("2:15 PM"), text mô tả bên dưới (xám, có thể dài 2 dòng)
   - Danh sách mẫu theo đúng ảnh: Order Shipped, Flash Sale Starts Now!, Item Back in Stock, Price Drop Alert, Flash Sale Starts Now!, Welcome Gift Unlocked 🎉, New Collection Alert, Item Back in Stock, Order Delivered, Order Canceled

3. STATE 2 - rỗng (thêm class d-none):
   - Illustration hình chuông có dấu X đỏ (kiểm tra images/ xem có sẵn asset giống bộ minh họa empty cart không, tái dùng nếu style tương tự, không thì dùng SVG tạm)
   - Tiêu đề "Still No Notification"
   - Text "We will update you as soon as we receive information."
   - Nút "Buy Products" (dark, giống btn-dark đã dùng ở nơi khác)

YÊU CẦU KỸ THUẬT:
- Vì không có thông số Figma chính xác: ước lượng spacing theo tỷ lệ ảnh (khung điện thoại = 375px), tái dùng biến trong _variable.scss, so khớp font-size với class typography có sẵn.
- Style viết trong scss/components/_notification.scss (tạo mới), import đúng thứ tự @use vào scss/main.scss.
- Sau khi sửa SCSS, tự chạy sass compile để cập nhật css/styles.css.
- Chỉ làm phần TĨNH, chưa cần JS toggle giữa 2 state.
- Asset path dùng ../ theo convention userApp.

Sau khi tạo xong userApp/notification.html, cập nhật link trong userApp/home.html:
- Tìm khối <span class="box-noti"> chứa icon chuông (svg use #bell, có badge số "2") ở góc phải header. Đổi thành <a href="notification.html" class="box-noti"> (giữ nguyên toàn bộ nội dung svg + badge bên trong).
- KHÔNG đụng vào userApp/all-categories.html.
- KHÔNG nhầm với userApp/notification-setting.html — 2 trang độc lập, không link qua nhau trong yêu cầu này.

Sau khi làm xong, liệt kê: (a) giá trị phải tự ước lượng vì ảnh không đủ rõ, (b) icon nào trong sprite.svg bị thiếu (đặc biệt icon 2 nút header bên phải, và icon từng loại notification) phải tạm dùng SVG inline, (c) có đúng thực hiện được việc sửa href trong home.html hay không.