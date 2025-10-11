# 💬 Chat Realtime Group 11

**Chat Realtime Group 11** là ứng dụng chat thời gian thực được xây dựng bằng **Node.js (Express + Socket.IO)** cho backend  
và **React + Vite** cho frontend.  
Dự án được đóng gói bằng **Docker**, serve bằng **Nginx**, và triển khai tự động (CI/CD) lên **AWS EC2** qua **GitHub Actions**.

---

## 🚀 Công nghệ sử dụng

### 🔧 Backend
- Node.js 20 (Express)
- Socket.IO (realtime chat)
- MongoDB Atlas
- AWS SQS (optional queue)
- Docker

### 🎨 Frontend
- React 19 + Vite 7
- Socket.IO Client
- Nginx (serve static build + proxy Socket.IO)

### ☁️ DevOps
- Docker & Docker Compose
- Nginx Reverse Proxy
- GitHub Actions (CI/CD → EC2)

---

## 🏗️ Cấu trúc thư mục

```
chat-realtime-group11/
├─ backend/
│  ├─ src/
│  ├─ Dockerfile
│  ├─ .env
│  └─ package.json
│
├─ frontend/
│  ├─ src/
│  ├─ Dockerfile
│  ├─ nginx.conf
│  └─ package.json
│
├─ docker-compose.yml
└─ .github/
   └─ workflows/
      └─ deploy.yml
```

## ⚙️ Chạy thử ở local (development)
### 1️⃣ Clone project
- git clone https://github.com/<your-username>/chat-realtime-group11.git
- cd chat-realtime-group11
### 2️⃣ Cài Docker (và Docker Compose)
- Windows / Mac: Docker Desktop

- Ubuntu / EC2:

sudo yum install docker.io docker-compose -y
### 3️⃣ Chạy toàn bộ project
- docker compose up -d --build
### 4️⃣ Truy cập
- Frontend: http://localhost:5173

- Backend API: http://localhost:3000

- Socket.IO: ws://localhost:3000/socket.io

## ⚙️ Deploy lên EC2 bằng Docker & Nginx
### 1️⃣ SSH vào EC2
- ssh -i your-key.pem ec2-user@<EC2_PUBLIC_IP>
### 2️⃣ Clone project (hoặc pull cập nhật)
- git clone https://github.com/<your-username>/chat-realtime-group11.git
- cd chat-realtime-group11
### 3️⃣ Build & chạy Docker Compose
- docker compose up -d --build
### 4️⃣ Mở port trong AWS Security Group
```
Type	     Port	Source
HTTP	     80	    0.0.0.0/0
Custom TCP	 3000	0.0.0.0/0
```
### 5️⃣ Truy cập web
- http://<EC2_PUBLIC_IP>
## 🤖 CI/CD với GitHub Actions
### Tự động deploy khi push lên nhánh deploy
- File workflow: **.github/workflows/deploy.yml**

- Secrets cần có trong GitHub repo:
```
Name	      Example Value
EC2_HOST	  13.239.232.220
EC2_USER	  ec2-user
PROJECT_DIR	  /home/ec2-user/chat-realtime-group11
EC2_KEY	      (nội dung file .pem)
```
- Mỗi khi push:
**git push origin deploy** 

→ GitHub sẽ tự SSH vào EC2 và chạy:
- docker compose down
- docker compose up -d --build



## 🧠 Thông tin hệ thống
```
Thành phần	    Port	Mô tả
Frontend	    80	   React + Nginx
Backend	        3000   Express + Socket.IO
MongoDB Atlas	 —	   Database cloud
EC2 Instance	 —	   AWS Linux host
GitHub Actions	 —	   CI/CD Pipeline
```

## ✨ Thành viên nhóm 11
```
Họ tên	             Vai trò
Trần Minh Quang	     Backend
Nguyễn Đức Vĩ	     Frontend
Vũ Thành Đạt	     DevOps 
```

## ❤️ Ghi chú
#### Khi thay đổi code, chỉ cần git push origin deploy → GitHub Actions tự động deploy.

#### Khi cần khởi động lại thủ công:

- docker compose down && docker compose up -d

#### Khi thay đổi file .env, nhớ rebuild lại container backend.

# © 2025 Group 11 — Chat Realtime MERN Project with AWS EC2 & GitHub Actions


---





