LƯU Ý: Figma MCP đang bị giới hạn (rate limit), lần này làm dựa trên ẢNH đính kèm.
vì vậy hãy đọc img từ images/figma/preload.jpg

Trước tiên đọc để nắm quy ước:
- CLAUDE.md
- .claude/rules/css.md
- scss/abstracts/_variable.scss (ưu tiên tái sử dụng biến màu/spacing/font-size có sẵn)
- userApp/home.html (BẮT BUỘC — TÁI DÙNG cấu trúc swiper-container/swiper-wrapper/swiper-slide đã có sẵn, và cấu trúc header/Shop by Category/banner cho mockup slide 1)
- userApp/product-detail.html (BẮT BUỘC — tái dùng cấu trúc ảnh sản phẩm/rating/giá cho mockup slide 2, và tham khảo cách khởi tạo Swiper trong JS)
- userApp/seller-detail.html (tái dùng cấu trúc avatar/rating/tab/grid sản phẩm cho mockup slide 3)
- userApp/sign-in.html (đích đến sau khi rời Onboarding)
- js/main.js hoặc js/carousel.js (xem cách các Swiper khác trong repo được khởi tạo, để viết đúng pattern init mới, không sửa config Swiper của trang khác)

LƯU Ý QUAN TRỌNG: File index.html ở gốc repo là code thừa từ theme mẫu gốc (title vẫn ghi "Jobko - Job Finder Mobile App"), KHÔNG liên quan tới StorMart. KHÔNG sửa, không đụng, không tạo link tới/từ file này.

Ảnh đính kèm gồm 4 frame, thuộc ĐIỂM BẮT ĐẦU của toàn bộ app (không có file nào trong app trỏ tới đây, đây là màn đầu tiên user thấy):
- "01_ Splash Screen": màn hình chờ đầu tiên
- "02_ Onboarding": slide 1/3
- "03_ Onboarding": slide 2/3
- "04_ Onboarding": slide 3/3

LUỒNG ĐIỀU HƯỚNG:
Splash (splash.html) → tự chuyển sau vài giây (mô phỏng tĩnh, không cần JS đếm giờ thật) → Onboarding (onboarding.html, 1 file dùng Swiper autoplay chuyển slide tự động) → bấm "Skip" (góc trên phải, mọi slide) hoặc bấm nút mũi tên tròn (mọi slide) → đều dẫn tới sign-in.html

TẠO 2 FILE:

1. userApp/splash.html:
   - Nền trắng, 2 khối hình tròn màu tím/xanh rất nhạt (blur nhẹ) góc trên phải và dưới trái theo đúng ảnh
   - Giữa màn: logo tròn xanh navy (icon túi/logo StorMart) + text "StorMart." (bold, dấu chấm cuối màu vàng)
   - Không có nút bấm, chỉ là màn tĩnh

2. userApp/onboarding.html:
   - Cố định (không đổi khi chuyển slide): link "Skip" góc trên phải → href="sign-in.html"
   - Cấu trúc Swiper (swiper-container/swiper-wrapper) với 3 swiper-slide, dùng pagination dot có sẵn của Swiper (không tự vẽ dot riêng)
   - Bật autoplay (delay khoảng 3000ms), loop nếu phù hợp — khởi tạo Swiper mới trong file JS phù hợp theo đúng pattern init đã có (function riêng, gọi từ init block cuối main.js theo CLAUDE.md)
   - Nút tròn mũi tên (→) trong MỖI slide đều gắn href="sign-in.html" (không dùng để chuyển slide — Swiper tự lo việc chuyển slide qua autoplay/vuốt)

   NỘI DUNG TỪNG SLIDE:
   - Slide 1: mockup mờ là 1 phần màn Home (header, search bar, Shop by Category, banner — copy từ home.html). Tiêu đề "Easy & Secure Payment". Text "Browse a wide range of products from verified sellers, all in one app."
   - Slide 2: mockup mờ là 1 phần màn product-detail (ảnh sản phẩm "Double-Breasted Trench Coat", icon heart/share, badge đếm ảnh "2/5", rating, giá, swatch màu — copy từ product-detail.html), thêm icon trái tim nhỏ trang trí góc trên trái mockup. Tiêu đề "Smart Shopping Starts here". Text "Find quality products, compare prices, & shop with confidence."
   - Slide 3: mockup mờ là 1 phần màn seller-detail (avatar shop, rating, 2 box thống kê, tab, grid sản phẩm — copy từ seller-detail.html), thêm badge sao "50% OFF" tím góc trên phải mockup và badge "-20%" cam trên 1 sản phẩm. Tiêu đề "Seller profile & list Products.". Text "Set up your store details, add products, and start selling in just a few steps."

YÊU CẦU KỸ THUẬT:
- Vì không có thông số Figma chính xác: ước lượng spacing theo tỷ lệ ảnh (khung điện thoại = 375px), tái dùng biến trong _variable.scss, so khớp font-size với class typography có sẵn.
- Style viết trong scss/components/_onboarding.scss (tạo mới, dùng chung cho cả splash.html và onboarding.html), import đúng thứ tự @use vào scss/main.scss.
- Sau khi sửa SCSS, tự chạy sass compile để cập nhật css/styles.css.
- Mockup mờ (opacity thấp hoặc overlay trắng mờ) chỉ cần copy đủ phần hiển thị trong khung nhỏ theo ảnh, không cần copy 100% toàn trang gốc.
- Asset path dùng ../ theo convention userApp.
- KHÔNG cần nối link TỪ file nào khác TỚI splash.html/onboarding.html — đây là màn khởi đầu.

Sau khi làm xong, liệt kê: (a) giá trị phải tự ước lượng vì ảnh không đủ rõ, (b) đã tái dùng được bao nhiêu từ home.html/product-detail.html/seller-detail.html cho phần mockup, (c) config Swiper autoplay cụ thể (delay bao nhiêu ms, có loop không), (d) icon nào trong sprite.svg bị thiếu phải tạm dùng SVG inline.