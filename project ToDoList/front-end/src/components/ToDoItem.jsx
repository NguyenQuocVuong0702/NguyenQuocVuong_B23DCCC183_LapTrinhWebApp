import React from 'react';
import moment from 'moment';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import './style.css';

const ToDoItem = ({ id, title, description, dueDate, onDelete, onEdit }) => {
    // Kiểm tra nếu dueDate hợp lệ
    const dueDateFormat = moment(dueDate).isValid() ? moment(dueDate).format('DD MMMM YYYY HH:mm') : 'Ngày không hợp lệ';

    // Kiểm tra nếu title và description hợp lệ
    const titleText = title || 'Tiêu đề không hợp lệ';
    const descriptionText = description || 'Mô tả không hợp lệ';

    return (
        <div className="ToDoItem">
            <input type="checkbox" />
            <div className='ItemContent'>
                <p className='Title'>{titleText}</p>
                <p className='DueDate'>{dueDateFormat}</p>
                <p className='Description'>{descriptionText}</p>
            </div>
            <div className='Action'>
                <EditOutlined onClick={onEdit} /> {/* Chỉ cần gọi onEdit */}
                <DeleteOutlined onClick={() => onDelete(id)} />
            </div>
        </div>
    );
};


export default ToDoItem;





