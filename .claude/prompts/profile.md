LƯU Ý: làm dựa trên ẢNH đính kèm (Figma đang chặn).
vì vậy hãy đọc file hình images/figma/profileSeller.jpg

QUY TẮC CHUNG: Trước khi code bất kỳ khối UI nào, kiểm tra xem userApp/ hoặc sellerApp/ đã có pattern/class tương tự chưa. Nếu có → BẮT BUỘC tái dùng nguyên class/cấu trúc đó, không viết CSS/HTML mới trùng lặp.

Trước tiên đọc để nắm quy ước repo:
- CLAUDE.md
- .claude/rules/css.md
- sellerApp/home.html (BẮT BUỘC — lấy đúng menubar-footer Seller App, tab "Profile" active)
- userApp/profile.html (BẮT BUỘC — GẦN NHƯ GIỐNG HOÀN TOÀN frame 30: có sẵn header "Profile", box-profile (avatar + name "Kristin Watson" + mail + box-edit link tới profile-setting.html), box-become_seller (ảnh shop + tiêu đề "Become a Seller Today" + text + mũi tên) — TÁI DÙNG NGUYÊN component box-become_seller này cho card "TrueStyle Store" ở frame 30 (chỉ đổi ảnh, tiêu đề, mô tả, thêm nút "Edit" text thay vì icon mũi tên). Danh sách menu profile-item bên dưới cũng gần như trùng khớp: Profile Setting/My Orders/Notification Settings/Help & Support/Device Management/Multi-Language/Multi-Currency/Privacy Policy/Terms of Condition/App Info/Password & Security/Delete Account/Logout — TÁI DÙNG NGUYÊN, chỉ CẦN THÊM 3 mục mới không có trong bản userApp: "Shop Setting", "KYC Verification" (chèn ngay sau Profile Setting), và "Message" (chèn sau My Orders) — icon cho 3 mục mới lấy trong sprite.svg (shop dùng lại icon gần giống "bag" hoặc "hanger", KYC dùng icon "badgeCheck" hoặc "document", Message dùng icon "message" có sẵn), đồng thời modal Logout (id="logout") cũng tái dùng NGUYÊN.
- userApp/profile-setting.html (BẮT BUỘC — GẦN NHƯ GIỐNG HOÀN TOÀN frame 31: avatar lớn giữa trang có icon camera edit, First Name/Last Name 2 cột, Email Address, Phone Number (select-phone với dropdown cờ quốc gia usa1/vn/fr), Country (select-flag dropdown), State, City + Zip Code 2 cột, Address, 2 nút cuối "Discard"/nút submit — TÁI DÙNG NGUYÊN TOÀN BỘ, chỉ đổi nút submit cuối từ label hiện có sang "Updated" theo đúng ảnh nếu khác, và cập nhật đúng dữ liệu mẫu theo ảnh: "Jonson"/"Roy", "codylee@gmail.com", "707 797 0462", "United States", State/City/Zip Code còn placeholder "State/ Province" (chưa nhập), Address còn placeholder "Street, house, apartment/unit" (chưa nhập))

Ảnh đính kèm gồm 2 frame RIÊNG (không phải state), giống hệt cấu trúc 2 file userApp trên → tạo 2 file:
- sellerApp/profile.html (từ userApp/profile.html)
- sellerApp/profile-setting.html (từ userApp/profile-setting.html)

VIỆC CẦN LÀM:

**sellerApp/profile.html:**
1. Copy nguyên cấu trúc từ userApp/profile.html.
2. box-profile: avatar + tên "Kristin Watson" + mail "kristinwatson@gmail.com" + box-edit "Edit" → link tới "profile-setting.html" (sellerApp).
3. Thay box-become_seller thành card "TrueStyle Store": logo store (dùng ảnh logo mẫu có sẵn hoặc placeholder), tiêu đề "TrueStyle Store", mô tả "Add Products & start selling.", nút "Edit" bên phải (thay vì icon mũi tên như bản gốc — theo đúng ảnh 30 có chữ "Edit" kèm icon nhỏ) → link tới trang shop-setting (nếu chưa có file này, để href="#" và ghi chú trong báo cáo, KHÔNG tự tạo thêm file ngoài phạm vi yêu cầu).
4. Danh sách menu: tái dùng nguyên toàn bộ profile-item, CHÈN THÊM "Shop Setting" (sau Profile Setting), "KYC Verification" (sau Shop Setting), "Message" (sau My Orders, link tới "message.html" đã tạo trước). Các mục còn lại (Notification Settings, Help & Support, Device Management, Multi-Language, Multi-Currency, Privacy Policy, Terms of Condition, App Info, Password & Security, Delete Account, Logout) giữ NGUYÊN href/text/icon từ bản gốc, chỉ cần các link nội bộ vẫn có thể tạm trỏ về file userApp tương ứng (VD href="../userApp/help-support.html") NẾU sellerApp chưa có file riêng — ghi chú rõ trong báo cáo những link nào đang tạm trỏ sang userApp để xử lý sau.
5. Modal Logout (id="logout"): tái dùng nguyên 100%.
6. Menubar-footer: tái dùng từ sellerApp/home.html, tab "Profile" active.

**sellerApp/profile-setting.html:**
1. Copy nguyên cấu trúc từ userApp/profile-setting.html, cập nhật đúng data mẫu theo ảnh 31 (First Name "Jonson", Last Name "Roy", Email "codylee@gmail.com", Phone "707 797 0462", Country "United States", nút submit cuối label "Updated").
2. Nút back trỏ về "profile.html" (sellerApp).

YÊU CẦU KỸ THUẬT:
1. Path asset ../ giống convention sellerApp/home.html.
2. Nếu class trong scss/components (file _profile.scss nếu có, kiểm tra tên thật) đã đủ style cho cả 2 file mới thì KHÔNG cần tạo scss mới, chỉ thêm phần bổ sung nhỏ (3 icon menu mới, style card TrueStyle Store nếu khác box-become_seller) vào 1 file mới scss/components/_profile-seller.scss, import sau file gốc.
3. Sau khi sửa SCSS (nếu có), tự chạy sass compile để cập nhật css/styles.css.
4. Chỉ làm phần TĨNH — modal Logout chỉ cần mở/đóng bằng Bootstrap có sẵn, form không xử lý submit thật.
5. Không sửa userApp/*.html, không sửa các file sellerApp/ đã tạo trước, không sửa vendor css/js.

Sau khi làm xong, liệt kê:
(a) đã copy % bao nhiêu nguyên vẹn từ profile.html/profile-setting.html,
(b) icon nào dùng cho "Shop Setting"/"KYC Verification"/"Message" trong sprite.svg,
(c) những menu-item nào đang tạm trỏ href sang file userApp/ vì sellerApp chưa có trang tương ứng (để tôi biết cần làm thêm những trang nào),
(d) link "Edit" của card TrueStyle Store đang trỏ đi đâu.