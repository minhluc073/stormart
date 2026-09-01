LƯU Ý: làm dựa trên ẢNH đính kèm (Figma đang chặn).
vì vậy hãy đọc img từ images/figma/product-detail-seller.png

Trước tiên đọc để nắm quy ước repo:
- CLAUDE.md
- .claude/rules/css.md
- scss/abstracts/_variable.scss
- sellerApp/home.html và sellerApp/my-product-list.html (2 file đã tạo trước — BẮT BUỘC đọc để giữ nhất quán head/script/style với Seller App)
- userApp/product-detail.html (BẮT BUỘC — trang này gần như GIỐNG HOÀN TOÀN layout của ảnh: swiper ảnh sản phẩm, "300+ Stocks" badge, box-price, variant-picker size (S/M/L/XL/XXL), variant-picker color, "Delivery by 12–14 Feb" + "Secure packaging", tab Overview với "See more" + Features list. TÁI DÙNG NGUYÊN các khối này, chỉ chỉnh lại phần khác biệt nêu dưới, KHÔNG viết lại từ đầu)

Ảnh đính kèm là frame "15_ Product Details (Cloting)" thuộc Seller App — đây là trang xem/sửa chi tiết 1 sản phẩm của seller (không phải trang mua hàng của buyer). Khác biệt so với userApp/product-detail.html cần chỉnh lại:

1. Header: CHỈ có nút back bên trái. KHÔNG có icon wishlist (heart) và icon share bên phải như bản userApp — bỏ hẳn khối "box-btn" đó.

2. Ảnh sản phẩm: vẫn dùng swiper carousel giống product-detail.html, nhưng chỉ số trang hiển thị dạng số "2/5" ở góc dưới phải (không phải dạng dot indicator như bản userApp) — kiểm tra kỹ trong ảnh, nếu không chắc là component nào, tạo class mới ví dụ "swiper-fraction" đặt góc dưới phải ảnh.

3. Nhãn category "Clothing" (chữ nhỏ, xám) ngay trên rating — nếu userApp/product-detail.html không có sẵn dòng này thì thêm mới.

4. Rating "4.8 (379)" + badge "300+ Stocks" (nền xanh lá nhạt, chữ xanh) cùng 1 dòng — TÁI DÙNG class .stock-box có sẵn trong product-detail.html, đổi lại text theo ảnh.

5. Tên sản phẩm "Double-Breasted Trench Coat" (bold, lớn) + box giá "$98.99" gạch ngang / "$79.99" — tái dùng .box-price.

6. Size: tái dùng nguyên variant-picker-item variant-size (S/M/L/XL/XXL), L đang active theo ảnh (nút active tô đen), XXL đang disabled (mờ) — giữ đúng state.

7. Colors: tái dùng nguyên variant-picker-item variant-color (đỏ/xám/xanh lá/vàng), màu xám (gray) đang active/được chọn (viền đen) theo ảnh.

8. Dòng "Delivery by 12–14 Feb" (icon xe tải) + "Secure packaging" (icon dấu hỏi tròn) — tái dùng đúng khối này từ product-detail.html.

9. Section "Overview": đoạn mô tả + link "See more" (màu đỏ/error) + "Features :" list gạch đầu dòng — tái dùng đúng khối tab-pane "overview" từ product-detail.html, KHÔNG cần render các tab khác (Ratings/Reviews) nếu ảnh không thể hiện — chỉ hiển thị phần Overview, không cần tab-link bar nếu ảnh chỉ có 1 section.

10. Bottom fixed bar: 2 nút "Discard" (outline/viền xám nhạt, chữ đen) và "Edit" (nền xanh đậm/primary, có icon edit nhỏ cạnh chữ) — tái dùng khung .menubar-button có sẵn (đang chứa Add to Cart/Buy Now ở bản userApp) nhưng đổi label + màu theo đúng ảnh này (Edit dùng --primary-base hoặc --primary-dark, kiểm tra đúng mã màu gần nhất trong _variable.scss).

YÊU CẦU KỸ THUẬT:
1. Tạo file mới sellerApp/product-details.html, path asset dạng ../ giống convention sellerApp/home.html.
2. Style viết trong scss/components/_product-details-seller.scss (file mới, KHÔNG sửa _product-detail.scss vì đó thuộc userApp), import đúng thứ tự trong scss/components/_index.scss.
3. Sau khi sửa SCSS, tự chạy sass compile để cập nhật css/styles.css.
4. Chỉ làm phần TĨNH — swiper chỉ cần hiển thị đúng slide đầu, không cần xử lý swipe/chuyển ảnh thật, size/color picker không cần JS toggle, chỉ cần đúng state active/disabled tĩnh theo ảnh.
5. Vì không có thông số Figma chính xác: ước lượng spacing theo tỷ lệ ảnh (khung điện thoại = 375px), tái dùng biến trong _variable.scss.
6. Không sửa userApp/product-detail.html hay bất kỳ file userApp/ khác (chỉ đọc tham khảo), không sửa sellerApp/home.html, sellerApp/my-product-list.html, không sửa file vendor trong css/ hoặc js/.
7. Ảnh sản phẩm dùng ảnh có sẵn trong images/user/product/.

Sau khi làm xong, liệt kê:
(a) giá trị nào phải tự ước lượng vì ảnh không đủ rõ,
(b) block/pattern nào đã tái dùng nguyên từ userApp/product-detail.html (nêu rõ % tái dùng vì trang này rất giống),
(c) chỉ số trang ảnh "2/5" bạn xử lý bằng cách nào (class mới hay có sẵn),
(d) icon nào trong sprite.svg bị thiếu phải tạm dùng SVG inline (đặc biệt icon "edit" cho nút Edit).