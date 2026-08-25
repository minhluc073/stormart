LƯU Ý: Figma MCP đang bị giới hạn (rate limit), lần này làm dựa trên 2 ẢNH đính kèm.
vì vậy hãy đọc img từ images/figma/support1.jpg va images/figma/support2.jpg
Trước tiên đọc để nắm quy ước:
- CLAUDE.md
- .claude/rules/css.md
- scss/abstracts/_variable.scss (ưu tiên tái sử dụng biến màu/spacing/font-size có sẵn)
- userApp/profile.html (BẮT BUỘC — dòng <a href="#" class="profile-item"> chứa <span class="title">Help & Support</span>, sẽ nối link tới đây)
- userApp/message-detail.html (BẮT BUỘC — TÁI DÙNG nguyên cấu trúc header avatar+tên+trạng thái+menu 3 chấm, chat bubble, khối ảnh đính kèm, thanh nhập tin nhắn fixed bottom cho phần "Support Ticket Replay")
- userApp/product-detail.html (tham khảo pattern offcanvas: class="offcanvas offcanvas-bottom", dùng cho popup "Create Ticket")
- userApp/change-password.html (tham khảo pattern modal thường nếu cần)

Ảnh đính kèm gồm 5 frame, thuộc CÙNG 1 luồng "Help & Support" nhưng là các TRANG/THÀNH PHẦN khác nhau:
- "58_ Help & Support": trang chính
- "59_ Questions": trang chi tiết 1 câu hỏi (mở từ nút "Learn more" ở trang 58)
- "60_ Support Ticket": trang danh sách ticket hỗ trợ
- "61_ Create Ticket": bottom sheet/offcanvas đè lên trang 60, mở từ nút "Open new"
- "62_ Support Ticket Replay": trang chi tiết 1 ticket, mở khi bấm vào 1 dòng ticket trong danh sách ở trang 60

LUỒNG ĐIỀU HƯỚNG ĐẦY ĐỦ:
1. profile.html → bấm "Help & Support" → help-support.html (58)
2. help-support.html → bấm "Learn more →" trên 1 câu hỏi → question-detail.html (59)
3. Ở CẢ help-support.html VÀ question-detail.html, có nút tròn nổi (+) góc dưới phải → bấm hiện popup nhỏ 2 dòng: "Previous Ticket" và "Open new"
   - "Previous Ticket" → support-ticket.html (60)
   - "Open new" → (không điều hướng trang, chỉ có ý nghĩa khi đang ở support-ticket.html — xem bước 5)
4. support-ticket.html → bấm vào 1 dòng ticket trong danh sách → support-ticket-detail.html (62)
5. support-ticket.html → nút (+) → "Open new" → mở offcanvas "Create Ticket" (61) ngay trên trang này

TẠO 4 FILE:

1. userApp/help-support.html:
   - Header: nút back, tiêu đề "Help & Support"
   - Card "How Can we Help you?" + text mô tả + ô search "Type your question or search keywords" + 3 icon tròn nhỏ bên dưới (email, phone, globe)
   - Label "Popular Question"
   - Danh sách câu hỏi, mỗi item: icon vuông màu nhạt bên trái (màu khác nhau: vàng, xanh dương nhạt, hồng, tím nhạt), tiêu đề (bold), mô tả ngắn 2 dòng, link "Learn more →" — bọc trong <a href="question-detail.html">
   - Câu hỏi mẫu: "How do I place an order?", "How can I track my order?", "What payment methods are accepted?", "How do I search for a business near me?"
   - Nút tròn nổi (+) fixed góc dưới phải, bấm hiện popup nhỏ: "Previous Ticket" (link tới support-ticket.html) và "Open new" (href="#", không có ý nghĩa ở trang này, để tạm)

2. userApp/question-detail.html:
   - Header: nút back, tiêu đề "Questions"
   - Nội dung bài viết: heading "Adding a photo using the eCommerce", đoạn văn, heading con ("Information We Collect", "How We Use Your Information") kèm bullet list có phần bold đầu dòng ("Personal Information:", "Usage Data:", "Service-Specific Data:")
   - Nút tròn nổi (+) copy nguyên từ trang 1, cùng popup Previous Ticket/Open new

3. userApp/support-ticket.html:
   - Header: nút back, tiêu đề "Support Ticket"
   - Thanh search "Search Listing..." + icon filter bên phải, bấm icon filter hiện dropdown nhỏ "Open" / "Solve"
   - Danh sách ticket, mỗi dòng bọc <a href="support-ticket-detail.html">: tiêu đề (VD "Account Support", "Withdrawals & Finances - Custom Inquiry"), mã "#1325401", thời gian ("2 Days ago", "3 Months ago"), badge trạng thái bên phải (nền xanh lá "Open" hoặc nền xám "Solved")
   - Nút tròn nổi (+), bấm hiện popup 2 dòng: "Previous Ticket" (href="#" hoặc tự trỏ lại trang này, không cần thiết ở đây) và "Open new" — gắn data-bs-toggle="offcanvas" data-bs-target="#createTicketOffcanvas"
   - Offcanvas id="createTicketOffcanvas" (offcanvas-bottom, theo pattern product-detail.html) ở cuối file: tiêu đề "Create Ticket", label "Subject" + dropdown, label "Write a message" + textarea placeholder "Type message", nút "Choose File" (outline, icon file) + tên file mẫu "Screenshot.jpg" bên cạnh, 2 nút cuối: "Cancel" (outline) và "Submit" (nền xanh navy)

4. userApp/support-ticket-detail.html:
   - Copy cấu trúc từ message-detail.html, chỉnh:
     - Header: avatar "Jonson Roy" + "On Demand Service", menu 3 chấm có "End Ticket" (icon X, chữ đỏ) thay vì "Block"
     - Label ngày "Today"
     - Chat bubble trái: "Hello! 👋" (04:21)
     - Chat bubble phải (nền xanh navy): "Is there insurance for car maintenance?" (04:20)
     - Chat bubble trái: "Yes, of course. We will you make it easy for you 😊" (04:21)
     - Khối 2 ảnh đính kèm cạnh nhau, mỗi ảnh badge "1.5 MB" (04:21)
     - Thanh nhập tin nhắn fixed bottom giống hệt message-detail.html, không đổi

YÊU CẦU KỸ THUẬT (áp dụng cho cả 4 file):
- Vì không có thông số Figma chính xác: ước lượng spacing theo tỷ lệ ảnh (khung điện thoại = 375px), tái dùng biến trong _variable.scss, so khớp font-size với class typography có sẵn.
- Style viết trong scss/components/_help-support.scss (tạo mới, dùng chung cả 4 file), import đúng thứ tự @use vào scss/main.scss. Với phần chat trong support-ticket-detail.html, ưu tiên tái dùng/@extend class đã có trong scss/components/_message.scss thay vì viết lại.
- Sau khi sửa SCSS, tự chạy sass compile để cập nhật css/styles.css.
- Chỉ làm phần TĨNH — offcanvas/popup/form chỉ cần đúng markup và mở được bằng Bootstrap data-attribute có sẵn, chưa cần JS xử lý submit/toggle logic thật.
- Asset path dùng ../ theo convention userApp. Ảnh đính kèm dùng ảnh có sẵn trong images/user/.

Sau khi tạo xong, cập nhật link trong userApp/profile.html:
- Tìm dòng <a href="#" class="profile-item"> chứa <span class="title">Help & Support</span>, đổi href="#" thành href="help-support.html".

Sau khi làm xong, liệt kê: (a) giá trị phải tự ước lượng vì ảnh không đủ rõ, (b) đã tái dùng được bao nhiêu từ message-detail.html và product-detail.html, (c) icon nào trong sprite.svg bị thiếu phải tạm dùng SVG inline, (d) có đúng thực hiện được việc sửa href trong profile.html hay không.