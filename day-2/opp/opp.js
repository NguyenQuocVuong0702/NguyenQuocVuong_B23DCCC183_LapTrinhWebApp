
class Student {
    constructor(id, name, gender, dob, hometown) {
        this.id = id;
        this.name = name;
        this.gender = gender;
        this.dob = dob;
        this.hometown = hometown;
    }
}

class StudentManager {
    constructor() {
        this.students = this.loadStudents() || [];
    }

    loadStudents() {
        const data = localStorage.getItem('students');
        return data ? JSON.parse(data) : [];
    }

    saveStudents() {
        localStorage.setItem('students', JSON.stringify(this.students));
    }

    addStudent(student) {
        this.students.push(student);
        this.saveStudents();
        this.render();
    }

    editStudent(index, student) {
        this.students[index] = student;
        this.saveStudents();
        this.render();
    }

    deleteStudent(index) {
        this.students.splice(index, 1);
        this.saveStudents();
        this.render();
    }

    render() {
        const tableBody = document.querySelector('#studentTable tbody');
        tableBody.innerHTML = '';
        this.students.forEach((student, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${student.id}</td>
                <td>${student.name}</td>
                <td>${student.gender}</td>
                <td>${student.dob}</td>
                <td>${student.hometown}</td>
                <td>
                    <button onclick="editStudent(${index})">Sửa</button>
                    <button onclick="deleteStudent(${index})">Xoá</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    }
}

const manager = new StudentManager();
manager.render();

function showAddStudentForm() {
    document.getElementById('studentForm').style.display = 'block';
    document.getElementById('studentFormContent').reset();
}

function closeForm() {
    document.getElementById('studentForm').style.display = 'none';
}

function saveStudent() {
    const id = document.getElementById('id').value;
    const name = document.getElementById('name').value;
    const gender = document.getElementById('gender').value;
    const dob = document.getElementById('dob').value;
    const hometown = document.getElementById('hometown').value;

    const student = new Student(id, name, gender, dob, hometown);

    if (editingIndex !== null) {
        manager.editStudent(editingIndex, student);
        editingIndex = null;
    } else {
        manager.addStudent(student);
    }

    closeForm();
}

let editingIndex = null;

function editStudent(index) {
    const student = manager.students[index];
    document.getElementById('id').value = student.id;
    document.getElementById('name').value = student.name;
    document.getElementById('gender').value = student.gender;
    document.getElementById('dob').value = student.dob;
    document.getElementById('hometown').value = student.hometown;

    editingIndex = index;
    showAddStudentForm();
}

function deleteStudent(index) {
    manager.deleteStudent(index);
}
