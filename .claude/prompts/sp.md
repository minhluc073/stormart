LƯU Ý: làm dựa trên ẢNH đính kèm (Figma đang chặn).
vì vậy hãy đọc file hình images/figma/sp.jpg

QUY TẮC CHUNG: Trước khi code bất kỳ khối UI nào, kiểm tra xem userApp/ hoặc sellerApp/ đã có pattern/class tương tự chưa. Nếu có → BẮT BUỘC tái dùng nguyên class/cấu trúc đó, không viết CSS/HTML mới trùng lặp.

Đây là trường hợp COPY GẦN NHƯ 1:1, không cần đọc thêm ảnh Figma vì đã xác nhận userApp/ có sẵn đủ 5 frame sau:
- "35_ Help & Support" ↔ userApp/help-support.html
- "36_ Questions" ↔ userApp/question-detail.html
- "37_ Support Ticket" ↔ userApp/support-ticket.html (bao gồm cả modal "Create Ticket" ở frame 38, đã có sẵn trong CÙNG file này dưới dạng offcanvas/modal — không phải file riêng)
- "38_ Create Ticket" ↔ chính là modal trong support-ticket.html (xem trên)
- "39_ Support Ticket Replay" ↔ userApp/support-ticket-detail.html

Trước tiên đọc để nắm quy ước repo:
- CLAUDE.md
- .claude/rules/css.md
- sellerApp/home.html, sellerApp/profile.html (BẮT BUỘC — profile.html đã có menu-item "Help & Support" trỏ tạm sang file userApp, CẦN SỬA lại trỏ đúng file sellerApp mới)
- 5 file userApp nêu trên (BẮT BUỘC đọc để copy nguyên cấu trúc, không viết lại từ đầu)

VIỆC CẦN LÀM (chủ yếu copy + chỉnh nhỏ, không phải build mới):

1. Copy nguyên userApp/help-support.html → sellerApp/help-support.html.
   - Nút "+" (fab tròn nổi, đang đè lên khối "Previous Ticket/Open new") → sửa lại 2 link con "Previous Ticket" / "Open new" trỏ sang "support-ticket.html" (sellerApp) thay vì file userApp.
   - Danh sách "Popular Question" mỗi item link "Learn more →" → trỏ sang "question-detail.html" (sellerApp).
   - Nút back trỏ về "profile.html" (sellerApp).

2. Copy nguyên userApp/question-detail.html → sellerApp/question-detail.html.
   - Nút back trỏ về "help-support.html" (sellerApp).
   - Nút "+" (Previous Ticket/Open new) trỏ sang "support-ticket.html" (sellerApp).

3. Copy nguyên userApp/support-ticket.html → sellerApp/support-ticket.html (bao gồm nguyên modal/offcanvas "Create Ticket" đã có sẵn trong file, KHÔNG tách ra file riêng).
   - Nút back trỏ về "help-support.html" (sellerApp).
   - Mỗi ticket-item link trỏ sang "support-ticket-detail.html" (sellerApp).
   - Nút "+" mở modal "Create Ticket" (giữ nguyên cơ chế data-bs-toggle có sẵn).

4. Copy nguyên userApp/support-ticket-detail.html → sellerApp/support-ticket-detail.html.
   - Nút back trỏ về "support-ticket.html" (sellerApp).
   - Nút "End Ticket" giữ nguyên hành vi tĩnh (modal xác nhận nếu bản gốc có sẵn, không thêm mới nếu chưa có).

**Sửa lại sellerApp/profile.html:**
- Cập nhật href menu-item "Help & Support" từ trỏ tạm sang userApp thành "help-support.html" (sellerApp).


YÊU CẦU KỸ THUẬT:
1. Path asset ../ giống convention sellerApp/home.html (đã cùng độ sâu thư mục với userApp nên không cần đổi số lượng ../).
2. Nếu style trong scss/components (file _help-support.scss, _support-ticket.scss... nếu có, kiểm tra tên thật) đã đủ dùng thì KHÔNG cần tạo scss mới — chỉ khi có phần khác biệt thực sự mới thêm 1 file bổ sung nhỏ, import sau file gốc.
3. Nếu có sửa SCSS, tự chạy sass compile để cập nhật css/styles.css.
4. Chỉ làm phần TĨNH — modal/offcanvas chỉ cần giữ nguyên cơ chế Bootstrap có sẵn từ bản gốc.
5. Không sửa bất kỳ file nào trong userApp/, không sửa vendor css/js, không sửa gì khác trong sellerApp/ ngoài đúng 1 href ở profile.html nêu trên.

Sau khi làm xong, liệt kê:
(a) xác nhận cả 4 file mới đã copy đúng 100% nội dung so với bản userApp gốc,
(b) đã sửa href "Help & Support" trong profile.html thành công chưa,
(c) đã tạo scss mới hay chỉ tái dùng nguyên file scss cũ,
(d) tất cả các link nội bộ giữa 4 file mới đã trỏ đúng sang nhau (không còn trỏ nhầm sang userApp/) chưa.