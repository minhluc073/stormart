LƯU Ý: Figma MCP đang bị giới hạn (rate limit), lần này làm dựa trên ẢNH đính kèm.
vì vậy hãy đọc img từ images/figma/device.jpg
Trước tiên đọc để nắm quy ước:
- CLAUDE.md
- .claude/rules/css.md
- scss/abstracts/_variable.scss (ưu tiên tái sử dụng biến màu/spacing/font-size có sẵn)
- userApp/profile.html (BẮT BUỘC — dòng có <a href="#" class="profile-item"> chứa <span class="title">Device Management</span> ở khoảng dòng 115-117, sẽ nối link tới đây)
- userApp/change-password.html (tham khảo pattern modal Bootstrap: class="modal fade", modal-dialog modal-dialog-centered, modal-content — dùng cho popup xác nhận xóa device)

Ảnh đính kèm gồm 2 frame CÙNG 1 trang "Device Manager":
- "63_ Device Manager": trang chính, bảng danh sách thiết bị đã đăng nhập
- "64_ Device Delete - Popup": modal xác nhận xóa device, đè lên trang chính

Tạo mới file userApp/device-manager.html:

1. Header: nút back, tiêu đề "Device Manager"

2. Block "My Devices":
   - Label "My Devices" bên trái, badge "5/3 Devices" (nền xanh nhạt, chữ xanh, bo tròn) bên phải
   - Bảng 4 cột: OS | Location | Last session | Actions
     - Dòng 1: "Android v16.2" | "103.26.246.158" | "This device" | (không có nút xóa vì là thiết bị hiện tại)
     - Dòng 2: "macOS Catalina.." | "103.26.246.158" | "22 hours ago" | icon thùng rác đỏ
     - Dòng 3: "macOS Catalina.." | "103.26.246.158" | "1 day ago" | icon thùng rác đỏ
   - Icon thùng rác gắn data-bs-toggle="modal" data-bs-target="#deviceDeleteModal"

3. Block "Need help?" (nền xám nhạt, bo góc): text "Need help?" bên trái, nút "Contact Support" (nền xanh navy) bên phải

4. Modal xác nhận xóa (id="deviceDeleteModal", dùng pattern modal thường như change-password.html):
   - Icon thùng rác đỏ minh họa (kèm vài chấm màu trang trí quanh icon theo ảnh), nút đóng (X, đỏ) góc trên phải
   - Tiêu đề "Are you Sure Remove "macOS Catalina" This device." (bold, canh giữa)
   - Text mô tả bên dưới (canh giữa, xám)
   - 2 nút cạnh nhau: "No" (outline) và "Remove" (nền xanh navy)

YÊU CẦU KỸ THUẬT:
- Vì không có thông số Figma chính xác: ước lượng spacing theo tỷ lệ ảnh (khung điện thoại = 375px), tái dùng biến trong _variable.scss, so khớp font-size với class typography có sẵn.
- Style viết trong scss/components/_device-manager.scss (tạo mới), import đúng thứ tự @use vào scss/main.scss.
- Sau khi sửa SCSS, tự chạy sass compile để cập nhật css/styles.css.
- Chỉ làm phần TĨNH — modal chỉ cần mở được bằng Bootstrap data-attribute có sẵn, chưa cần JS xóa thật.
- Asset path dùng ../ theo convention userApp.

Sau khi tạo xong userApp/device-manager.html, cập nhật link trong userApp/profile.html:
- Tìm dòng <a href="#" class="profile-item"> có chứa <span class="title">Device Management</span>, đổi href="#" thành href="device-manager.html".
- Không sửa các dòng <a href="#"> khác trong file (đó là các mục chưa làm, không thuộc phạm vi yêu cầu này).

Sau khi làm xong, liệt kê: (a) giá trị phải tự ước lượng vì ảnh không đủ rõ, (b) icon nào trong sprite.svg bị thiếu (icon thùng rác, badge, chấm trang trí) phải tạm dùng SVG inline, (c) có đúng thực hiện được việc sửa href trong profile.html hay không.