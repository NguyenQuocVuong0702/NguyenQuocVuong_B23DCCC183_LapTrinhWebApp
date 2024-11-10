const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');  // Thêm thư viện cors
const todoRoutes = require('./routes/todoRoutes');

const app = express();
const port = 3000;

// Cấu hình CORS
app.use(cors({
    origin: 'http://localhost:3001', // Cho phép frontend từ localhost:3001
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Các phương thức được phép
    allowedHeaders: ['Content-Type', 'Authorization'], // Các header được phép
}));

app.use(bodyParser.json()); // Giúp parse dữ liệu JSON
app.use('/api', todoRoutes); // Sử dụng các route đã định nghĩa

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
