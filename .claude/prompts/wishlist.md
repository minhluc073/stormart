LƯU Ý: làm dựa trên ẢNH đính kèm (Figma đang chặn).
vì vậy hãy đọc file hình images/figma/wishlist.png

QUY TẮC CHUNG: Trước khi code bất kỳ khối UI nào, kiểm tra xem userApp/ đã có pattern/class tương tự chưa. Nếu có → BẮT BUỘC tái dùng nguyên class/cấu trúc đó, không viết CSS/HTML mới trùng lặp.

LƯU Ý VỀ APP: Đây là trang thuộc userApp (buyer), KHÔNG phải sellerApp/deliveryApp — nhận biết qua menubar-footer trong ảnh (Home/Message/nút cart tròn nổi giữa/Favorites/Profile) khớp CHÍNH XÁC với footer đã có sẵn trong userApp/home.html.

Trước tiên đọc để nắm quy ước repo:
- CLAUDE.md
- .claude/rules/css.md
- scss/abstracts/_variable.scss
- userApp/home.html (BẮT BUỘC — lấy đúng menubar-footer, hiện tại icon "hearth" (Favorites) đang href="#", CẦN SỬA lại trỏ đúng file mới sẽ tạo. Đồng thời tái dùng class .badge-sale (badge % giảm giá góc trên trái ảnh sản phẩm) đã có sẵn ở đây.)
- userApp/cart.html (BẮT BUỘC — có sẵn pattern "cart-item" layout ngang (ảnh trái, info phải: tên sp, rating+sold, box-price) rất gần với card trong ảnh — TÁI DÙNG khung layout ngang này làm nền cho "wishlist-item", điều chỉnh lại phần bên phải cho khớp ảnh: thêm nút tròn giỏ hàng nhỏ (icon cart) ở góc phải thay vì stepper số lượng như cart.html.)
- userApp/all-products.html (BẮT BUỘC — có sẵn nút "btn-wishlist" (icon trái tim SVG, dùng currentColor, có thể đổi màu đỏ khi active) đặt trên góc ảnh sản phẩm — TÁI DÙNG icon trái tim đỏ nhỏ này cho góc ảnh trong "wishlist-item" ở trang mới, ở đây trái tim luôn ở trạng thái active/đỏ vì đã có trong wishlist. Cũng tái dùng .badge-sale cho badge % giảm giá.)
- userApp/message.html (BẮT BUỘC — tái dùng cơ chế d-none ẩn/hiện 2 state "có dữ liệu / trống" cho state "Your Wishlist is Empty")

Ảnh đính kèm gồm 3 frame:
- "32_ All Wishlist": trang chính có sản phẩm, tiêu đề "All Wishlist", icon list-view/sort góc phải header.
- "33_ All Wishlist _ Empty": CÙNG trang trên nhưng state rỗng — CÙNG 1 FILE với frame 32, dùng d-none, KHÔNG tạo file riêng.
- "34_ Select Wishlist": TRANG RIÊNG, chế độ chọn nhiều sản phẩm để thêm vào giỏ hàng cùng lúc (có checkbox tròn ở mỗi item, thanh tổng tiền + nút "Add to Cart" cố định đáy) — tạo file riêng.

QUAN TRỌNG — cấu trúc file:
- userApp/wishlist.html: chứa cả state có dữ liệu (frame 32) và state rỗng (frame 33).
- userApp/select-wishlist.html: trang chọn nhiều để thêm giỏ hàng (frame 34).
- Icon 3 chấm/list-view ở góc phải header trang wishlist.html → mở/chuyển sang chế độ "Select Wishlist" (href="select-wishlist.html").

NỘI DUNG CHI TIẾT:

**userApp/wishlist.html:**
1. Header: back trái (href="home.html"), tiêu đề "All Wishlist" giữa, icon "list-view"/chọn nhiều bên phải → href="select-wishlist.html".
2. State có dữ liệu (mặc định hiện): list dọc 6 "wishlist-item" (tái dùng khung cart-item), mỗi item:
   - Ảnh sản phẩm (trái), có badge-sale "25%" góc trên trái ảnh, icon trái tim đỏ nhỏ góc trên phải ảnh (btn-wishlist, active).
   - Tên "Vibrant Maxi Dress", rating "4.8 (379)" + " | " + "540 Sold" cùng dòng (tái dùng meta-box từ all-products.html, chỉnh lại có thêm cụm "540 Sold" nối bằng dấu " | " sau rating theo đúng ảnh).
   - box-price: "$59.99" gạch ngang + "$59.99" mới (LƯU Ý: 2 giá trong ảnh giống hệt nhau "$59.99" "$59.99" — có thể là lỗi dữ liệu mẫu trong Figma (giá cũ = giá mới nên không có ý nghĩa giảm giá), giữ đúng nguyên số liệu theo ảnh, ghi chú lại nghi vấn này trong báo cáo).
   - Nút tròn nhỏ icon giỏ hàng (cart) góc phải item, để thêm nhanh sản phẩm đó vào giỏ — TĨNH.
3. State rỗng (d-none mặc định, đặt cùng trong file, id="wishlistEmpty"): icon minh họa áo + trái tim đỏ nhỏ góc (nếu sprite.svg không có sẵn, tạo SVG inline hoặc dùng ảnh PNG tạm, ghi chú lại), tiêu đề "Your Wishlist is Empty", mô tả "Save your favorite items to keep them all in one place.", nút "Browse Products" (btn-dark) href="all-products.html".
4. Menubar-footer: tái dùng từ home.html, SỬA href icon "hearth" từ "#" thành "wishlist.html", tab Favorites active (đang ở đúng trang).

**userApp/select-wishlist.html:**
1. Header: back trái (href="wishlist.html"), tiêu đề "Select Wishlist" giữa, icon 3 chấm (more) bên phải — tĩnh.
2. List 5 wishlist-item (layout giống hệt bản trên, thêm checkbox tròn bên trái ảnh mỗi item): 3 item đầu đã check (nền xanh dương đậm, dấu check trắng), 2 item cuối chưa check (viền tròn xám rỗng) — theo đúng ảnh.
3. Thanh cố định đáy: bên trái "Total $239.97" (bold, lớn) + "(3 Products)" (chữ nhỏ, xám, dòng dưới) — khớp đúng 3 item đã check; bên phải nút "Add to Cart" (btn-dark, icon giỏ hàng nhỏ cạnh chữ).
4. KHÔNG có menubar-footer ở trang này (theo đúng ảnh, xác nhận lại).

YÊU CẦU KỸ THUẬT:
1. Path asset ../ giống convention userApp/home.html (2 file mới cùng thư mục userApp/).
2. Style viết trong scss/components/_wishlist.scss (file mới, dùng chung cho cả 2 file HTML vì cùng nhóm nội dung), import đúng thứ tự trong scss/components/_index.scss.
3. Sau khi sửa SCSS, tự chạy sass compile để cập nhật css/styles.css.
4. Chỉ làm phần TĨNH — checkbox chọn ở select-wishlist.html chỉ cần đúng trạng thái tĩnh theo ảnh (không cần JS tính lại Total khi tick/untick), nút thêm giỏ hàng không xử lý logic thật.
5. Vì không có thông số Figma chính xác: ước lượng spacing theo tỷ lệ ảnh (khung điện thoại = 375px), tái dùng biến trong _variable.scss.
6. Không sửa userApp/cart.html, userApp/all-products.html, không sửa file vendor css/js, KHÔNG sửa gì khác trong userApp/home.html ngoài đúng 1 href "hearth" nêu trên.

Sau khi làm xong, liệt kê:
(a) giá trị nào phải tự ước lượng vì ảnh không đủ rõ,
(b) đã sửa href icon "hearth" trong home.html thành công chưa,
(c) icon minh họa "Your Wishlist is Empty" bạn dùng SVG inline hay ảnh PNG tạm,
(d) xác nhận nghi vấn 2 giá "$59.99"/"$59.99" giống hệt nhau ở mỗi wishlist-item có đúng vậy trong ảnh không.