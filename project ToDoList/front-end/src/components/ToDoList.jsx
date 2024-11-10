import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Modal, Form, Input, DatePicker, List, Card, Checkbox } from 'antd';
import { PlusCircleOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import moment from 'moment';
import './style.css';

const ToDoList = () => {
    const [todos, setTodos] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentTodo, setCurrentTodo] = useState(null);
    const [form] = Form.useForm();

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = () => {
        axios.get('http://localhost:3000/api/todos')
            .then(response => {
                setTodos(response.data);
            })
            .catch(error => {
                console.error("Lỗi khi tải dữ liệu:", error);
                alert("Có lỗi khi tải dữ liệu.");
            });
    };

    const addTodo = (values) => {
        const newTodo = {
            title: values.title,
            description: values.description,
            due_date: values.due_date.format('YYYY-MM-DD HH:mm')
        };

        axios.post('http://localhost:3000/api/todos', newTodo)
            .then(response => {
                fetchTodos();
                setIsModalVisible(false);
                form.resetFields();
            })
            .catch(error => {
                console.error("Lỗi khi thêm dữ liệu:", error);
                alert("Có lỗi khi thêm công việc mới.");
            });
    };

    const updateTodo = (values) => {
        const updatedTodo = {
            title: values.title,
            description: values.description,
            due_date: values.due_date.format('YYYY-MM-DD HH:mm')
        };

        axios.put(`http://localhost:3000/api/todos/${currentTodo.id}`, updatedTodo)
            .then(() => {
                fetchTodos();
                setIsModalVisible(false);
                setIsEditing(false);
                form.resetFields();
            })
            .catch(error => {
                console.error("Lỗi khi cập nhật công việc:", error);
                alert("Có lỗi khi cập nhật công việc.");
            });
    };

    const handleDelete = (id) => {
        axios.delete(`http://localhost:3000/api/todos/${id}`)
            .then(() => {
                setTodos(todos.filter(todo => todo.id !== id));
            })
            .catch(error => {
                console.error("Lỗi khi xóa công việc:", error);
                alert("Có lỗi khi xóa công việc.");
            });
    };

    // const handleCheckboxChange = (todo) => {
    //     const updatedCompletedStatus = !todo.completed;
    
    //     axios.put(`http://localhost:3000/api/todos/${todo.id}`, { completed: updatedCompletedStatus })
    //         .then(() => {
    //             setTodos(todos.map(t => t.id === todo.id ? { ...t, completed: updatedCompletedStatus } : t));
    //         })
    //         .catch(error => {
    //             console.error("Lỗi khi cập nhật trạng thái hoàn thành:", error);
    //             alert("Có lỗi khi cập nhật trạng thái hoàn thành.");
    //         });
    // };

    const handleCheckboxChange = (todo) => {
        const updatedCompletedStatus = !todo.completed;
    
        // Tạo đối tượng mới với tất cả các trường, bao gồm completed
        const updatedTodo = {
            title: todo.title,
            description: todo.description,
            due_date: todo.due_date,  // Giữ nguyên due_date
            completed: updatedCompletedStatus
        };
    
        axios.put(`http://localhost:3000/api/todos/${todo.id}`, updatedTodo)
            .then(() => {
                fetchTodos(); // Lấy lại dữ liệu từ API sau khi cập nhật thành công
            })
            .catch(error => {
                console.error("Lỗi khi cập nhật trạng thái hoàn thành:", error);
                alert("Có lỗi khi cập nhật trạng thái hoàn thành.");
            });
    };
    
    
    
    
    
    
    

    const getStatusColor = (todo) => {
        const isOverdue = moment(todo.due_date).isBefore(moment());
        if (todo.completed) return 'green';
        if (isOverdue) return 'red';
        return 'yellow';
    };
    

    const showAddForm = () => {
        setIsEditing(false);
        form.resetFields();
        setIsModalVisible(true);
    };

    const showEditForm = (todo) => {
        setIsEditing(true);
        setCurrentTodo(todo);
        form.setFieldsValue({
            title: todo.title,
            description: todo.description,
            due_date: moment(todo.due_date)
        });
        setIsModalVisible(true);
    };

    return (
        <div className="ToDoList" style={{ marginLeft: '10px' }}>
            <h1>My work 🎯</h1>
            <Button
                type="primary"
                icon={<PlusCircleOutlined />}
                onClick={showAddForm}
            >
                Add Task
            </Button>

            <List
                grid={{ gutter: 16, column: 1 }}
                dataSource={todos}
                renderItem={todo => (
                    <List.Item key={todo.id}>
                        <Card
                            title={
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <Checkbox
                                        checked={todo.completed}
                                        onChange={() => handleCheckboxChange(todo)}
                                    />
                                    <span style={{ marginLeft: 8 }}>{todo.title}</span>
                                </div>
                            }
                            extra={<Button icon={<EditOutlined />} onClick={() => showEditForm(todo)} />}
                            className={`todo-card ${getStatusColor(todo)}`}
                        >
                            <p>{todo.description}</p>
                            <p>Due: {moment(todo.due_date).format('DD MMM YYYY HH:mm')}</p>
                            <Button
                                danger
                                icon={<DeleteOutlined />}
                                onClick={() => handleDelete(todo.id)}
                            >
                                Delete
                            </Button>
                        </Card>
                    </List.Item>
                )}
            />

            <Modal
                title={isEditing ? 'Edit Task' : 'Add New Task'}
                open={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={isEditing ? updateTodo : addTodo}
                >
                    <Form.Item
                        name="title"
                        label="Title"
                        rules={[{ required: true, message: 'Please input the title!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="description"
                        label="Description"
                        rules={[{ required: true, message: 'Please input the description!' }]}
                    >
                        <Input.TextArea />
                    </Form.Item>

                    <Form.Item
                        name="due_date"
                        label="Due Date"
                        rules={[{ required: true, message: 'Please select the due date!' }]}
                    >
                        <DatePicker showTime format="YYYY-MM-DD HH:mm" />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            {isEditing ? 'Update Task' : 'Add Task'}
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default ToDoList;
