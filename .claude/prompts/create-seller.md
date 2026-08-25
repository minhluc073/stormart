LƯU Ý: Figma MCP đang bị giới hạn (rate limit), lần này làm dựa trên ẢNH đính kèm.
vì vậy hãy đọc img từ images/figma/seller.jpg
Trước tiên đọc để nắm quy ước:
- CLAUDE.md
- .claude/rules/css.md
- scss/abstracts/_variable.scss (ưu tiên tái sử dụng biến màu/spacing/font-size có sẵn)
- userApp/all-seller.html (BẮT BUỘC — đã có sẵn nhiều link href="seller-detail.html" trỏ tới trang chi tiết seller chưa tồn tại. PHẢI đặt tên file đúng là userApp/seller-detail.html để khớp, không đổi tên khác)
- userApp/product-detail.html (BẮT BUỘC — đã có sẵn offcanvas "Share this link via" id="popupShare" với đủ social icon + input link + nút copy. TÁI DÙNG NGUYÊN KHỐI NÀY, chỉ đổi link trong input, không viết lại từ đầu)
- userApp/address.html (tham khảo pattern tab: menu-tab, data-bs-toggle="tab", tab-content, tab-pane)
- userApp/change-password.html (tham khảo pattern modal Bootstrap thường, dùng cho popup "Send a message" vì đây không phải offcanvas như Share)

Ảnh đính kèm gồm 3 frame CÙNG 1 trang "Seller Detail":
- "29_ All Sellers - Empty": trang chính, danh sách sản phẩm của seller (tên frame ghi "Empty" nhưng nội dung ảnh có đầy sản phẩm — cứ theo đúng nội dung thật trong ảnh, không phải trạng thái rỗng)
- "30_ Send a message": popup nhập tin nhắn gửi cho seller, đè lên trang chính
- "31_ Share": popup share link (offcanvas, đã có sẵn pattern trong product-detail.html)

Tạo mới file userApp/seller-detail.html (đúng tên này để khớp link từ all-seller.html):

1. Header:
   - Nút back bên trái
   - Icon share (mũi tên chia sẻ) bên phải, gắn data-bs-toggle="offcanvas" data-bs-target="#popupShare" (đúng attribute như trong product-detail.html)

2. Block thông tin seller:
   - Avatar/logo tròn "TrueStyle Store"
   - Tên shop (bold)
   - Icon calendar + "Join 12 April, 2025"
   - Icon sao + rating "4.9 (1,234)"
   - 2 box thống kê cạnh nhau: "3,587 Products List" (icon áo) và "3,587 Products Sales" (icon túi)

3. Tab bar: "All Products" | "Review" (dùng đúng pattern tab của address.html, "All Products" active mặc định)

4. Nội dung tab "All Products":
   - Dòng "Showing 16 Results" bên trái, dropdown "Short by" bên phải
   - Grid 2 cột sản phẩm: ảnh có badge giảm giá (25%), icon heart (wishlist) góc phải ảnh, tên sản phẩm, rating + số đã bán, giá sale + giá gạch (tái dùng đúng card-product đã có ở all-products.html hoặc file tương tự, không viết lại từ đầu)

5. Nội dung tab "Review": để trống tạm (không có ảnh mẫu, chỉ cần tab-pane rỗng hợp lệ)

6. Nút "Send a Message" cố định dưới cùng (fixed bottom), full-width, nền dark — bấm mở modal "Send a message":
   - Modal id="sendMessageModal" (dùng pattern modal thường như change-password.html, KHÔNG phải offcanvas)
   - Tiêu đề "Send a message"
   - Label "Subject" + dropdown select
   - Label "Write a message" + textarea placeholder "Type message"
   - Checkbox "I agree to the Terms & Conditions & Privacy Policy" (2 link riêng, đã check mặc định theo ảnh)
   - Nút "Send a Message" (dark, full-width)

7. Popup Share: COPY NGUYÊN offcanvas id="popupShare" từ product-detail.html vào cuối file, chỉ đổi link trong input thành link dạng "www.stormart.com/profile/0458..." theo đúng ảnh.

YÊU CẦU KỸ THUẬT:
- Vì không có thông số Figma chính xác: ước lượng spacing theo tỷ lệ ảnh (khung điện thoại = 375px), tái dùng biến trong _variable.scss, so khớp font-size với class typography có sẵn.
- Style viết trong scss/components/_seller-detail.scss (tạo mới), import đúng thứ tự @use vào scss/main.scss.
- Sau khi sửa SCSS, tự chạy sass compile để cập nhật css/styles.css.
- Chỉ làm phần TĨNH — modal/offcanvas chỉ cần mở được bằng Bootstrap data-attribute có sẵn, không cần JS xử lý submit/gửi thật.
- Asset path dùng ../ theo convention userApp. Ảnh sản phẩm/avatar dùng ảnh có sẵn trong images/user/product/ hoặc images/user/.
- KHÔNG sửa product-detail.html, address.html, change-password.html — chỉ đọc tham khảo.
- KHÔNG cần sửa all-seller.html vì link href="seller-detail.html" đã có sẵn từ trước, chỉ cần tạo đúng file đích.

Sau khi làm xong, liệt kê: (a) giá trị phải tự ước lượng vì ảnh không đủ rõ, (b) block/pattern nào đã tái dùng được từ các file khác (đặc biệt popupShare và card-product), (c) icon nào trong sprite.svg bị thiếu phải tạm dùng SVG inline.