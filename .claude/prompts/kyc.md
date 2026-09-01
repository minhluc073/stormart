LƯU Ý: làm dựa trên ẢNH đính kèm (Figma đang chặn).
vì vậy hãy đọc file hình images/figma/kyc.jpg.

QUY TẮC CHUNG: Trước khi code bất kỳ khối UI nào, kiểm tra xem userApp/ hoặc sellerApp/ đã có pattern/class tương tự chưa. Nếu có → BẮT BUỘC tái dùng nguyên class/cấu trúc đó, không viết CSS/HTML mới trùng lặp.

Trước tiên đọc để nắm quy ước repo:
- CLAUDE.md
- .claude/rules/css.md
- sellerApp/home.html, sellerApp/profile.html (BẮT BUỘC — profile.html đã có sẵn menu-item "KYC Verification" trỏ tạm href="#" hoặc tương tự, CẦN SỬA lại href này trỏ đúng tới trang mới sẽ tạo — nêu rõ ở cuối)
- userApp/become-seller-submit.html (BẮT BUỘC — GẦN NHƯ GIỐNG HOÀN TOÀN phần form của frame 29: Document Type / Document Number / Issue Date / Expire Date / "Upload Document (JPEG, PDF & PNG Max. 10MB)" upload-box + Choose File + file preview "Passport.jpg 2.4 mb" + chấm loading, Short Note. TÁI DÙNG NGUYÊN các field này, chỉ bỏ khối "Company Logo" và checkbox "I agree..." vì ảnh 29 không có, đổi 2 nút cuối từ "Previous/Submit" thành "Cancel" (btn-line, viền đỏ chữ đỏ — khác màu btn-line mặc định, kiểm tra lại _variable.scss xem có biến màu error phù hợp không) / "Submit now" (btn-dark).
- userApp/order-confirmation.html hoặc sellerApp/add-product-image.html (BẮT BUỘC — tái dùng khung modal-dialog-centered + box-illustration cho modal "Your KYC documents have been submitted successfully." ở frame 29 (state 2): icon minh họa giấy tờ + kẹp ghim + mũi tên upload trong vòng tròn (nếu sprite.svg không có, tạo SVG inline hoặc dùng ảnh PNG tạm, ghi chú lại), tiêu đề, mô tả "Our team will review your information shortly.", 1 nút duy nhất "That's Nice" (btn-dark, full-width) — không có nút thứ 2.
- sellerApp/order-details.html (tham khảo pattern hiển thị dạng "label : value" từng dòng cho khối Order Summary) — TÁI DÙNG cho trang view-only "KYC Verification" ở frame 31.

Ảnh đính kèm gồm 3 frame:
- "29_ Add KYC" (2 state: form nhập liệu / modal success đè lên — CÙNG 1 FILE, không tách riêng)
- "31_ Add KYC Verification": LƯU Ý tên frame ghi "Add KYC Verification" và tiêu đề trong ảnh ghi "KRY Verification" (rõ ràng lỗi chính tả của "KYC Verification" trong Figma) — dùng đúng "KYC Verification" làm tiêu đề file mới (sửa lỗi chính tả rõ ràng này, khác với các trường hợp mismatch nội dung trước đây cần giữ nguyên, đây chỉ là lỗi gõ 1 chữ cái), ghi chú lại trong báo cáo. Đây là trang XEM trạng thái KYC đã nộp (read-only), khác hẳn trang "Add KYC" (form nhập).

QUAN TRỌNG — cấu trúc file:
- sellerApp/add-kyc.html: trang form nhập KYC + modal success (frame 29, cả 2 state).
- sellerApp/kyc-verification.html: trang xem trạng thái KYC đã nộp (frame 31), read-only.
- Luồng điều hướng: sellerApp/profile.html mục "KYC Verification" → trỏ tới "kyc-verification.html" (giả định user đã có hồ sơ KYC, đây là trạng thái phổ biến hơn để demo). Trong kyc-verification.html, nút "Edit" → trỏ tới "add-kyc.html" (để sửa lại form). Trong add-kyc.html, nút "Submit now" mở modal success, nút "That's Nice" trong modal đóng modal (data-bs-dismiss="modal"), có thể để href tĩnh không cần điều hướng thêm vì chỉ làm tĩnh.

NỘI DUNG CHI TIẾT:

**sellerApp/add-kyc.html:**
1. Header: back trái, tiêu đề "Add KYC", icon 3 chấm (more) bên phải (tĩnh, không cần menu thật).
2. Form (tái dùng field từ become-seller-submit.html): Document Type (dropdown "Passport") + Document Number ("A04880444") cùng dòng 2 cột; Issue Date ("12 March 2023") + Expire Date ("13 March 2025") cùng dòng 2 cột; Upload Document + file preview "Passport.jpg" "2.4 mb"; Short Note (textarea "Master in Law").
3. Bottom menubar-button: "Cancel" (btn-line viền đỏ) href="profile.html", "Submit now" (btn-dark) data-bs-toggle="modal" data-bs-target="#kycSubmittedModal".
4. Modal "kycSubmittedModal": box-illustration (icon giấy tờ/kẹp ghim/mũi tên upload), tiêu đề "Your KYC documents have been submitted successfully.", mô tả "Our team will review your information shortly.", nút "That's Nice" (btn-dark, full-width, data-bs-dismiss="modal").

**sellerApp/kyc-verification.html:**
1. Header: back trái (href="profile.html"), tiêu đề "KYC Verification" (đã sửa chính tả), icon 3 chấm bên phải.
2. Danh sách "label : value" (tái dùng pattern block-info từ order-details.html): "Document Type :" — "Password" (LƯU Ý: ảnh ghi giá trị là "Password" chứ không phải "Passport" như ở form Add KYC — có thể là lỗi nhập liệu trong ảnh mẫu, giữ đúng nguyên "Password" theo ảnh vì đây là dữ liệu demo, ghi chú lại nghi vấn này), "Document No. :" — "A41004511", "Issue Date :" — "12 March, 2023", "Expire Date :" — "13 March, 2033", "Status :" — badge "Approved" (nền xanh lá nhạt, chữ xanh lá).
3. 2 nút cạnh nhau: "Edit" (btn-line, icon edit nhỏ) href="add-kyc.html", "View" (btn-dark, icon eye nhỏ) — kiểm tra kỹ trong ảnh nút "View" dùng để làm gì (có thể xem file tài liệu đã upload) — nếu không rõ đích đến, để href="#" và ghi chú lại.
4. KHÔNG có menubar-footer (theo đúng ảnh).

**Sửa lại sellerApp/profile.html:**
- Cập nhật href của menu-item "KYC Verification" (đã thêm ở prompt trước) từ giá trị tạm thời sang "kyc-verification.html" — CHỈ sửa đúng 1 thuộc tính href này, không đổi gì khác trong file.

YÊU CẦU KỸ THUẬT:
1. Path asset ../ giống convention sellerApp/home.html.
2. Style viết trong scss/components/_kyc-verification.scss (file mới, dùng chung cho cả 2 file HTML), import đúng thứ tự trong scss/components/_index.scss. Ưu tiên tái dùng class có sẵn (upload-box, box-illustration, menubar-button, box-info từ order-details...) không viết trùng lặp.
3. Sau khi sửa SCSS, tự chạy sass compile để cập nhật css/styles.css.
4. Chỉ làm phần TĨNH — modal chỉ cần mở/đóng bằng Bootstrap data-attribute có sẵn, form không xử lý submit thật.
5. Không sửa userApp/*.html, không sửa file vendor css/js, không sửa gì khác trong sellerApp/ ngoài đúng 1 chỗ href nêu trên.

Sau khi làm xong, liệt kê:
(a) đã sửa href "KYC Verification" trong profile.html thành công chưa,
(b) icon nào dùng cho box-illustration modal success (có sẵn trong sprite.svg hay phải tạo SVG inline/PNG tạm),
(c) nghi vấn giá trị "Password" ở Document Type trong trang view — có đúng vậy trong ảnh hay là "Passport" bị đọc nhầm,
(d) nút "View" ở trang kyc-verification.html đang trỏ đi đâu vì chưa rõ đích đến trong ảnh.