# AppSlackCloneServer

# SERVER làm 2 nhiệm vụ : REST API  + SOCKET

# API 

- Bao gồm 4 routes chính để xử lý các yêu cầu cụ thể liên quan đến : Thông tin đăng nhập của

 user (/user) , Các channel (/channel) , các Topic (/topic) , các replies của topic (/reply)

-Với route User chúng ta có ENDPOINT CREATE để tạo mới user , ISEXISTUSER để kiểm tra tài khoản đã tồn tại hay chưa , CHECKUSER khi đăng nhập xem user đã chính xác hay chưa , ISLOGIN để kiểm tra JSONTOKEN , GETUSERIMG để lấy ảnh đại diện của user đó

-Với route Channel chúng ta có ENDPOINT CREATE để thực hiện tạo Channel và GETLISTCHANNEL để lấy danh sách các channel đã được tạo

-Với route Topic chúng ta có ENDPOINT GETLISTTOPIC để lấy về danh sách các TOpic đã đăng trong Channel , UPLOADTOCLOUD dùng để tải ảnh vào bộ nhớ tạm thời của SERVER để người dùng lựa chọn những ảnh sẽ đăng lên , CREATE dùng để tạo mới 1 topic , ADDREPLY thực hiện lấy danh sách các phản hồi về TOPIC đó , ATTACHFILE sẽ lấy file ảnh từ phía CLIENT gửi đến và lưu trữ tạm thời vào SERVER

-Với route Reply cuhsng ta có ENDPOINT GETLISTREPLY thực hiện lấy về danh sách các reply của 1 topic , CREATE để thêm vào 1 reply mới , GETREPLYINFO thực hiện xử lý danh sách replies để hiển thị số lượng người reply phản hồi

# SOCKET 

-(/) socket sẽ được lắng nghe ở route chính của SERVER

-Nó sẽ lắng nghe các sự kiện sau: Có một người vừa mới thêm mới 1 channel (phát tín hiệu cho tất cả mọi người trong trang chủ) , một người vừa mới thêm topic vào channel (chỉ phát cho những người đã tham gia vào channel đó) , một người vừa thêm reply vào cho 1 topic (chỉ phát ra cho người tham gia vào topic và channel đó)
