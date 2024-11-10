const mysql = require('mysql2');

// Cấu hình kết nối MySQL
const db = mysql.createConnection({
    host: 'LocalHost',     // Thay đổi nếu cần
    user: 'root',          // Thay đổi nếu cần
    password: '',          // Thay đổi nếu cần
    database: 'todolist_app' // Tên cơ sở dữ liệu
});

// Kết nối tới MySQL
db.connect((err) => {
    if (err) {
        console.error('Kết nối tới database thất bại: ' + err.stack);
        return;
    }
    console.log('Kết nối tới database thành công');
});

module.exports = db;