LƯU Ý: Figma MCP đang bị giới hạn (rate limit), lần này làm dựa trên ẢNH đính kèm.
vì vậy hãy đọc img từ images/figma/step2.jpg

Trước tiên đọc để nắm quy ước:
- CLAUDE.md
- .claude/rules/css.md
- scss/abstracts/_variable.scss (ưu tiên tái sử dụng biến màu/spacing/font-size có sẵn)
- userApp/become-seller.html (BẮT BUỘC — đây là Step 1, đã có sẵn nút "Continue" trỏ tới href="become-seller-submit.html". PHẢI đặt tên file bước 2 đúng là become-seller-submit.html để khớp link này, không đổi tên khác. Đồng thời copy đúng cấu trúc header, step indicator (chấm tròn số + label "Step x/3"), input/label style để đồng bộ 100% với step 1)

Ảnh đính kèm là frame "52_ Become a Seller - Step 2" (kèm frame 51 Step 1 để đối chiếu, và có frame 53 bị cắt mép — nếu ảnh không đủ rõ frame 53 thì bỏ qua, chỉ làm Step 2).

Tạo mới file userApp/become-seller-submit.html:

1. Header: nút back, tiêu đề "Become a Seller" (giống hệt step 1)

2. Step indicator: copy đúng cấu trúc từ become-seller.html, nhưng đổi trạng thái:
   - Step 1 "Information": đổi từ số "1" (xanh) sang icon dấu tích (✓, xanh) — đã hoàn thành
   - Step 2 "Document": đang active (số "2", nền xanh đậm)
   - (Step 3 nếu có trong file gốc, giữ nguyên trạng thái chưa active)

3. Form nội dung:
   - Row 2 cột: "Document Type" (dropdown, giá trị mẫu "Passport") và "Document Number" (input, giá trị mẫu "A04880444")
   - Row 2 cột: "Issue Date" (input date, "12 March 2023") và "Expire Date" (input date, "13 March 2025")
   - Label "Upload Document (JPEG, PDF & PNG Max. 10MB)" + khối "Choose File" (dashed border, icon ảnh, link "Choose File" màu xanh)
   - Preview file đã chọn: thumbnail nhỏ + tên "Passport.jpg" + dung lượng "2.4 mb" + vài chấm trang trí bên phải (loading dots hoặc decoration, theo đúng ảnh)
   - Label "Company Logo" + khối "Choose File" y hệt cấu trúc trên (dashed border, icon ảnh, link "Choose File")
   - Label "Short Note" + textarea, giá trị mẫu "Check my documents"
   - Checkbox "I agree all terms and condition in ShopO" (đã check mặc định theo ảnh)

4. Menubar dưới cùng (copy đúng cấu trúc "menubar-button" từ become-seller.html):
   - Nút "Previous" (btn-line, outline) → href="become-seller.html" (quay lại step 1)
   - Nút "Submit" (btn-primary, nền xanh navy) → href tạm "#" hoặc trỏ trang tiếp theo nếu bạn biết đích cuối cùng của luồng become seller, nếu không chắc để href="#" và báo tôi

YÊU CẦU KỸ THUẬT:
- Vì không có thông số Figma chính xác: ước lượng spacing theo tỷ lệ ảnh (khung điện thoại = 375px), tái dùng biến trong _variable.scss, so khớp font-size với class typography có sẵn — đặc biệt input/label style PHẢI giống hệt become-seller.html vì đây là cùng 1 form nhiều bước.
- Style bổ sung vào file scss tương ứng với become-seller.html hiện tại (tìm đúng file scss/components/ đang chứa style của become-seller.html, thêm class mới vào đó, không tạo file scss riêng để tránh trùng lặp style input/step-indicator).
- Sau khi sửa SCSS, tự chạy sass compile để cập nhật css/styles.css.
- Chỉ làm phần TĨNH, không cần JS xử lý upload file thật.
- Asset path dùng ../ theo convention userApp.

Sau khi làm xong, liệt kê: (a) giá trị phải tự ước lượng vì ảnh không đủ rõ, (b) tên file scss nào bạn đã thêm style vào (để tái dùng đúng biến/class với step 1), (c) icon nào trong sprite.svg bị thiếu phải tạm dùng SVG inline, (d) nút "Submit" hiện đang trỏ đi đâu vì tôi chưa xác nhận đích cuối luồng.