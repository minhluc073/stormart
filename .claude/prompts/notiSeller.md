LƯU Ý: làm dựa trên ẢNH đính kèm (Figma đang chặn).
vì vậy hãy đọc file hình images/figma/notiSeller.jpg 

QUY TẮC CHUNG: Trước khi code bất kỳ khối UI nào, kiểm tra xem userApp/ hoặc sellerApp/ đã có pattern/class tương tự chưa. Nếu có → BẮT BUỘC tái dùng nguyên class/cấu trúc đó, không viết CSS/HTML mới trùng lặp.

Trước tiên đọc để nắm quy ước repo:
- CLAUDE.md
- .claude/rules/css.md
- userApp/notification.html (BẮT BUỘC — file này GẦN NHƯ GIỐNG HOÀN TOÀN 2 frame ảnh đính kèm, kể cả 2 state đã có sẵn:
  - State 1 "notificationData" (mặc định hiện): notification-group theo "Today/Yesterday/Earlier", mỗi item có icon-circle theo type (type-shipped icon truck, type-sale icon..., type-stock icon bag, type-price icon profit, type-gift...) + tiêu đề + mô tả + giờ — ĐÚNG 100% nội dung mẫu trong ảnh 27 (Order Shipped, Flash Sale Starts Now!, Item Back in Stock, Price Drop Alert, Welcome Gift Unlocked 🎉, New Collection Alert, Order Delivered, Order Canceled...).
  - State 2 "notificationEmpty" (đang d-none): icon chuông + badge dấu X, tiêu đề "Still No Notification", mô tả "We will update you as soon as we receive information.", và có 1 nút "Buy Products" — ĐÚNG khớp ảnh 28 NHƯNG ảnh 28 KHÔNG có nút "Buy Products" nào cả (vì seller không mua hàng), nên BỎ nút này khi copy sang, chỉ giữ icon + tiêu đề + mô tả.
  ĐÂY LÀ COPY GẦN NHƯ 1:1, không viết lại từ đầu.)
- sellerApp/message-detail.html hoặc sellerApp/message.html (tham khảo cách đã tách file trước đó để đồng bộ head/script)

Ảnh đính kèm gồm 2 frame CÙNG 1 trang "Notification" thuộc Seller App, là 2 STATE (có dữ liệu / trống) → CHỈ TẠO 1 FILE sellerApp/notification.html, dùng đúng cơ chế d-none có sẵn (id="notificationData" / id="notificationEmpty") y như bản gốc.

VIỆC CẦN LÀM:
1. Copy nguyên cấu trúc HTML từ userApp/notification.html sang sellerApp/notification.html, đổi path asset (đã cùng convention ../ nên chỉ cần giữ nguyên nếu độ sâu thư mục giống nhau).
2. Header: giữ nguyên nút back trái, tiêu đề "Notification" giữa. Bên phải có 2 icon: icon "bag" (túi) và icon "settings" (bánh răng, SVG inline có sẵn trong bản gốc) — kiểm tra kỹ trong ảnh 27/28 xem 2 icon này có đúng ý nghĩa "bag" (giỏ hàng — có hợp lý với Seller App không, vì seller không có giỏ hàng để mua) hay thực ra trong Figma là icon khác (ví dụ "mark all as read", "archive"...). Nếu không chắc, cứ giữ đúng 2 icon hiện có (bag + settings) như bản mẫu, và ghi chú lại nghi vấn này trong báo cáo cuối.
3. Nội dung notification-group: đối chiếu đúng dữ liệu trong ảnh 27, gần như giống hệt bản mẫu userApp — nếu có khác biệt nhỏ về text/thời gian thì sửa lại đúng theo ảnh.
4. State empty: giữ nguyên icon chuông + badge X, đổi/giữ đúng text "Still No Notification" / "We will update you as soon as we receive information.", XÓA nút "Buy Products" (btn-dark) vì ảnh 28 không có nút nào.
5. KHÔNG thấy menubar-footer trong cả 2 frame ảnh — xác nhận lại, bản userApp/notification.html vốn cũng không có sẵn menubar-footer, giữ nguyên không thêm vào.

YÊU CẦU KỸ THUẬT:
1. Nếu style trong scss/components/_notification.scss (nếu có, kiểm tra tên file thật trong repo) đã đủ dùng thì KHÔNG cần tạo file scss mới, chỉ cần đảm bảo import đã có sẵn áp dụng đúng cho path sellerApp. Nếu cấu trúc SCSS của repo tách theo path (chỉ áp dụng cho userApp) thì tạo thêm file mới tối giản scss/components/_notification-seller.scss chỉ chứa phần khác biệt (nếu có), import sau file gốc.
2. Sau khi sửa SCSS (nếu có), tự chạy sass compile để cập nhật css/styles.css.
3. Chỉ làm phần TĨNH — giữ nguyên d-none toggle thủ công như bản gốc (tôi tự đổi để xem 2 state), không cần JS xử lý thêm.
4. Không sửa userApp/*.html, không sửa các file sellerApp/ đã tạo trước, không sửa vendor css/js.

Sau khi làm xong, liệt kê:
(a) đã copy 100% từ notification.html hay có phần nào phải viết mới,
(b) đã xóa nút "Buy Products" ở state empty chưa,
(c) nghi vấn 2 icon "bag" + "settings" ở header có đúng ý nghĩa cho Seller App không, hay cần đổi thành icon khác.