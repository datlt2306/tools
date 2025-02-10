# ĐẶC TẢ CHI TIẾT HỆ THỐNG CRM

---

## **1. Tổng quan**

Hệ thống CRM tập trung vào quản lý công việc, hoạt động giảng dạy, sinh viên và tài liệu theo kỳ học. Hỗ trợ phân quyền cho **Chủ nhiệm bộ môn (CNBM)**, **Trưởng môn (TM)**, và **Giảng viên (GV)**.

---

## **2. Phân quyền người dùng**

| Vai trò  | Quyền hạn                                                                 |
| -------- | ------------------------------------------------------------------------- |
| **Chủ nhiệm bộ môn (CNBM)** | Quản lý toàn bộ bộ môn, duyệt kế hoạch, duyệt hoạt động, phân công GV, xem thống kê tổng.  |
| **Trưởng Môn (TM)**   | Quản lý môn học, phân công GV, tạo đề thi.               |
| **Giảng Viên (GV)**   | Xem công việc được giao, cập nhật hoạt động, upload tài liệu, tạo đề thi. |

---

## **3. Yêu cầu chức năng**

### **3.1. Quản lý công việc**

-   **Giao việc**:
    -   CNBM/TM phân công công việc cho GV (mô tả, deadline, độ ưu tiên).
    -   Tự động thông báo qua email/in-app.
-   **Thống kê cá nhân**:
    -   Dashboard hiển thị tiến độ công việc, tỷ lệ hoàn thành, công việc trễ hạn.

---

### **3.2. Hoạt động chuyên môn**

-   **Giảng dạy**:
    
-   **Xưởng thực hành**:
    

---

### **3.3. Hoạt động sinh viên & giảng dạy**

-   **Seminar/Workshop/Tutor**:
    -   **Thông tin**: Tên, loại hình, thời gian, địa điểm.
    -   **Tài nguyên**: Tài liệu, link tham gia, link khảo sát feedback.
    -   **Nhân sự**: Danh sách GV và sinh viên tham gia.
-   **Phân loại hoạt động**:
    -   Tùy chỉnh loại hình (bắt buộc/tự chọn, online/offline).

---

### **3.4. Quản lý theo kỳ**

-   **Tạo kỳ học**: Tên kỳ, thời gian bắt đầu/kết thúc.
-   **Gắn hoạt động**: Liên kết công việc, hoạt động giảng dạy, seminar với kỳ tương ứng.

---

### **3.5. Quản lý môn học & đề thi**

-   **Tài liệu môn**:
    -   Upload giáo trình, bài giảng, bài tập (định dạng PDF, PPT, Word).
-   **Đề thi**:
    -   **Import kế hoạch thi**: Từ file Excel (ca thi, phòng thi, giám thị).
    -   **Random đề thi**: Tự động trộn câu hỏi từ ngân hàng đề theo môn.

---

### **3.6. Tài liệu chung**

-   Kho lưu trữ tập trung cho biểu mẫu, quy định, báo cáo mẫu.
-   Phân quyền truy cập theo vai trò.

---

### **3.7. Thông báo**

-   Gửi thông báo đa kênh (email, ứng dụng).
-   Tích hợp lịch Google/Outlook để nhắc nhở sự kiện.

---

### **3.8. Thống kê**

-   **Cá nhân**: Hiệu suất GV (số giờ dạy, tỷ lệ hoàn thành công việc).
-   **Tổng quan**:
    -   Thống kê hoạt động theo kỳ, tỷ lệ tham gia seminar, chất lượng đề thi.
    -   Xuất báo cáo dạng PDF/Excel.

---

## **4. Yêu cầu phi chức năng**

-   **Bảo mật**: Xác thực 2 lớp, mã hóa dữ liệu nhạy cảm.
-   **Hiệu năng**: Xử lý cùng lúc 1,000+ người dùng.
-   **Tích hợp**:
-   **UI/UX**: Thiết kế responsive, hỗ trợ mobile.

---

## **5. Mẫu luồng nghiệp vụ**

1. **Tạo đề thi**:  
   GV upload câu hỏi → TM duyệt → Hệ thống random đề → Gắn vào ca thi.
2. **Tổ chức seminar**:  
   CNBM tạo sự kiện → GV đăng ký tham gia → Gửi thông báo → Tổng hợp feedback.

---

## **6. Công nghệ đề xuất**

-   **Backend**: Node.js.
-   **Frontend**: React.js/Refine.
-   **Database**: PostgreSQL/MongoDB.
-   **Cloud**: Cloudinary/VPS
