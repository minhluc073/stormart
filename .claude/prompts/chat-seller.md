LƯU Ý: làm dựa trên ẢNH đính kèm (Figma đang chặn).
vì vậy hãy đọc file hình images/figma/messSeller.jpg

QUY TẮC CHUNG: Trước khi code bất kỳ khối UI nào, kiểm tra xem userApp/ hoặc sellerApp/ đã có pattern/class tương tự chưa. Nếu có → BẮT BUỘC tái dùng nguyên class/cấu trúc đó, không viết CSS/HTML mới trùng lặp.

Trước tiên đọc để nắm quy ước repo:
- CLAUDE.md
- .claude/rules/css.md
- userApp/message.html và userApp/message-detail.html (BẮT BUỘC — 2 file này GẦN NHƯ GIỐNG HOÀN TOÀN 2 frame ảnh đính kèm: cùng header "Message" + search, cùng message-item (avatar, tên, thời gian, preview tin nhắn, badge-unread), cùng có sẵn state ẩn "message-empty d-none" phòng trường hợp không có tin nhắn, và message-detail.html đã có sẵn header "user-chat" (avatar + tên "Jonson Roy" + status "On Demand Service"), dropdown-more (nút 3 chấm → "Block"), chat-date "Today", chat bubble 2 chiều, chat-attach hiển thị 2 ảnh kèm dung lượng "1.5 MB", thanh nhập ip-message + btn-attach + btn-photo + nút gửi. ĐÂY LÀ COPY GẦN NHƯ 1:1, chỉ khác phần menubar-footer (bên dưới nêu rõ) — TÁI DÙNG TOÀN BỘ HTML/class, không viết lại logic/markup mới.)
- sellerApp/home.html (BẮT BUỘC — lấy đúng menubar-footer của Seller App: Home / Order / nút "+" tròn nổi giữa / Wallet / Profile, để thay cho menubar-footer hiện có trong userApp/message.html vốn dành cho buyer)

Ảnh đính kèm gồm 2 frame thuộc Seller App:
- "35_ Message- List of chat": trang danh sách chat
- "36_ Message Replay": trang chi tiết 1 đoạn chat

Đây là 2 trang RIÊNG (không phải state của 1 trang), giống hệt cấu trúc userApp/message.html + userApp/message-detail.html (2 file tách biệt), nên cũng tạo 2 file riêng:
- sellerApp/message.html (từ userApp/message.html)
- sellerApp/message-detail.html (từ userApp/message-detail.html)

VIỆC CẦN LÀM (chủ yếu là copy + chỉnh nhỏ, không phải build mới):

**sellerApp/message.html:**
1. Copy nguyên cấu trúc HTML từ userApp/message.html (giữ nguyên state d-none "message-empty" phòng khi cần dùng sau).
2. Danh sách chat: đối chiếu đúng data trong ảnh — Cody Fisher / Devon Lane / Jacob Jones / Jane Cooper / Robert Fox / Jerome Bell / Jacob Jones — nếu khác thứ tự/tên/nội dung/preview so với bản userApp gốc thì sửa lại đúng theo ảnh, avatar dùng lại ảnh có sẵn trong images/user/avatar/.
3. THAY menubar-footer: bỏ menubar-footer kiểu userApp (Home/Order/Wallet/Profile của buyer — kiểm tra xem có khác nhãn/icon không), thay bằng đúng menubar-footer đã dùng trong sellerApp/home.html, tab "Wallet" KHÔNG active vì đây không thuộc nhánh Wallet — không có tab nào active theo đúng ảnh (không có icon nào tô xanh trong ảnh 35), giữ nguyên vậy, không tự ý active tab nào.
4. Link mỗi message-item trỏ tới "message-detail.html" (đường dẫn nội bộ sellerApp, không phải path userApp).
5. Nút back header trỏ về "home.html".

**sellerApp/message-detail.html:**
1. Copy nguyên cấu trúc HTML từ userApp/message-detail.html (header user-chat, dropdown-more Block, chat bubble, chat-attach, thanh nhập).
2. Đối chiếu đúng nội dung hội thoại trong ảnh: "Hello! 👋" / "Is there insurance for car maintenance?" / "Yes, of course. We will you make it easy for you 😊" / 2 ảnh đính kèm "1.5 MB" mỗi ảnh — sửa lại nếu khác nội dung mẫu có sẵn trong bản userApp gốc.
3. Nút back trỏ về "message.html" (sellerApp).
4. KHÔNG có menubar-footer ở trang chat detail (giống đúng userApp/message-detail.html không có, và ảnh 36 cũng không thấy) — xác nhận lại điều này, nếu userApp/message-detail.html có sẵn menubar-footer thì bỏ đi cho khớp ảnh.

YÊU CẦU KỸ THUẬT:
1. Path asset ../ giống convention sellerApp/home.html.
2. Nếu style hiện có trong scss/components/_message.scss đã đủ dùng (rất có thể đủ vì layout gần như giống hệt), CHỈ CẦN chỉnh phần menubar-footer bằng cách tái dùng class .menubar-footer đã có sẵn (không tạo file scss mới cho message trừ khi có phần khác biệt thực sự cần class riêng, ví dụ nếu Seller message-item có style khác buyer thì thêm phần bổ sung nhỏ vào file scss mới scss/components/_message-seller.scss và import sau _message.scss).
3. Sau khi sửa SCSS (nếu có), tự chạy sass compile để cập nhật css/styles.css.
4. Chỉ làm phần TĨNH — dropdown "Block", input tin nhắn chỉ cần đúng markup tĩnh, không xử lý gửi tin nhắn thật.
5. Không sửa userApp/*.html, không sửa các file sellerApp/ đã tạo trước, không sửa vendor css/js.

Sau khi làm xong, liệt kê:
(a) những chỗ nội dung/data khác so với bản mẫu userApp gốc mà bạn đã sửa lại theo đúng ảnh,
(b) xác nhận đã thay đúng menubar-footer Seller App (Home/Order/+/Wallet/Profile) và không tab nào active ở trang message.html,
(c) có cần tạo file scss mới hay chỉ tái dùng nguyên _message.scss.