LƯU Ý: làm dựa trên ẢNH đính kèm (Figma đang chặn).
vì vậy hãy đọc file hình images/figma/becomSeller.jpg

QUY TẮC CHUNG: Trước khi code bất kỳ khối UI nào, kiểm tra xem userApp/ hoặc sellerApp/ đã có pattern/class tương tự chưa. Nếu có → BẮT BUỘC tái dùng nguyên class/cấu trúc đó, không viết CSS/HTML mới trùng lặp.

Trước tiên đọc để nắm quy ước repo:
- CLAUDE.md
- .claude/rules/css.md
- sellerApp/home.html, sellerApp/my-product-list.html (BẮT BUỘC — lấy đúng card-product Delete/Edit, tab View All/Active/Pending/Rejected đã code sẵn)
- userApp/seller-detail.html (BẮT BUỘC — GẦN NHƯ GIỐNG HOÀN TOÀN phần trên của frame 32: header có icon share góc phải, box logo store + tên "TrueStyle Store" + "Join 12 April, 2025", 2 stat-box "Products List"/"Products Sales", khối "Showing 16 Results" + dropdown "Short by" — TÁI DÙNG NGUYÊN các khối này)
- userApp/become-seller.html VÀ userApp/become-seller-submit.html (kiểm tra kỹ trước — 2 file này ĐÃ TRÙNG KHỚP HOÀN TOÀN với frame 33 "Become Seller - Step 2" và frame 34 "Become a Seller - Step 3" về nội dung thực tế, dù TÊN FRAME ghi "Step 2"/"Step 3" nhưng nội dung ảnh cho thấy đây chính là Step 1/3 "Information" (Shop Name, Email, Phone, Country, State, City, Zip Code, Address, Short Bio, Availability) và Step 2/3 "Document" (Document Type, Document Number, Issue Date, Expire Date, Upload Document, Company Logo, Short Note, terms) — giống thêm 1 lần nữa lỗi đặt tên frame trong Figma như đã gặp ở frame "20_ Add Product" trước đó. KHÔNG cần tạo file mới cho 2 frame này — chỉ cần xác nhận lại nội dung 2 file userApp/become-seller.html và userApp/become-seller-submit.html đã khớp đúng ảnh chưa (đối chiếu từng field), nếu có sai khác nhỏ thì báo lại trong phần cuối, KHÔNG tự sửa 2 file này (thuộc userApp).

Ảnh đính kèm frame "32_ All Sellers _ Empty" — LƯU Ý tên frame ghi "Empty" nhưng nội dung thực tế KHÔNG rỗng, đây là trang "My Store" của chính seller (xem trước cửa hàng của mình ở chế độ quản lý, có nút Delete/Edit từng sản phẩm), khác hẳn với trang "seller-detail.html" (là trang buyer xem 1 shop bất kỳ, không có nút Delete/Edit). Bỏ qua tên frame, làm theo đúng NỘI DUNG THẬT trong ảnh, ghi chú lại nghi vấn này trong báo cáo cuối.

TẠO FILE MỚI sellerApp/my-store.html:

1. Header: back trái, nút share (icon share, giữ nguyên offcanvas popupShare nếu muốn tái dùng) bên phải.
2. Box store: logo TrueStyle Store, tên, "Join 12 April, 2025", nút "Edit" (thay vì không có ở seller-detail.html — đây là điểm khác biệt vì đây là view của chính seller, có quyền edit) → href="profile.html" hoặc trang shop-setting nếu có, ghi chú lại nếu chưa rõ đích đến.
3. 2 stat-box: "3,587 Products List" / "3,587 Products Sales" (tái dùng đúng khối stat-box từ seller-detail.html).
4. Tab bar 4 tab "View All / Active / Pending / Rejected" (tái dùng NGUYÊN từ sellerApp/my-product-list.html, không viết lại).
5. "Showing 16 Results" + dropdown "Short by" (tái dùng từ seller-detail.html).
6. Grid 2 cột card sản phẩm (tái dùng NGUYÊN card-product + nút Delete/Edit từ sellerApp/my-product-list.html) — badge trạng thái Active/Pending/Reject theo đúng dữ liệu ảnh.
7. Nút cố định dưới cùng "Add a Product" (btn-dark, full-width) → href="add-product.html".
8. KHÔNG có menubar-footer (kiểm tra kỹ ảnh không thấy, xác nhận lại).

VIỆC CẦN SỬA LẠI FILE CŨ (ngoại lệ được phép):
- Trong sellerApp/my-product-list.html, nút bottom hiện đang ghi "Add new Address" (đã ghi chú nghi vấn ở prompt trước) — nay đã XÁC NHẬN qua frame 32 rằng label ĐÚNG PHẢI LÀ "Add a Product". Sửa lại đúng text này trong sellerApp/my-product-list.html (CHỈ sửa đúng text đó, không đổi gì khác).

YÊU CẦU KỸ THUẬT:
1. Path asset ../ giống convention sellerApp/home.html.
2. Style viết trong scss/components/_my-store.scss (file mới), import đúng thứ tự trong scss/components/_index.scss. Ưu tiên tái dùng class đã có (product-card, menu-tab, stat-box...) không viết trùng lặp.
3. Sau khi sửa SCSS, tự chạy sass compile để cập nhật css/styles.css.
4. Chỉ làm phần TĨNH — tab/dropdown chỉ cần đúng markup Bootstrap có sẵn, không xử lý sort/filter thật.
5. Không sửa userApp/*.html, không sửa file vendor css/js, KHÔNG sửa gì khác trong sellerApp/ ngoài đúng 1 chỗ text "Add a Product" nêu trên.

Sau khi làm xong, liệt kê:
(a) đã sửa text "Add new Address" → "Add a Product" trong my-product-list.html thành công chưa,
(b) đối chiếu nội dung become-seller.html/become-seller-submit.html với frame 33/34 — có field nào sai khác cần tôi xem lại không,
(c) nút "Edit" ở box store đang trỏ đi đâu vì chưa có trang "Shop Setting" thật,
(d) xác nhận trang my-store.html không có menubar-footer.