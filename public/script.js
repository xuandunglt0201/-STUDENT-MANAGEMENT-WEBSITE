document.addEventListener('DOMContentLoaded', function() {
    // Function to fetch all students
    function fetchStudents() {
        fetch('http://127.0.0.1:4046/students')
            .then(response => response.json())
            .then(data => {
                const studentTable = document.getElementById('studentTable');
                const tbody = studentTable.querySelector('tbody');
                tbody.innerHTML = ''; // Clear previous data
    
                data.forEach(student => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${student.id}</td>
                        <td>${student.name}</td>
                        <td>${student.age}</td>
                        <td>${student.grade}</td>
                    `;
                    tbody.appendChild(row);
                });
            })
            .catch(error => {
                console.error('Error fetching students:', error);
            });
    }
    

    // Fetch all students on page load
    fetchStudents();

    // Add Student Form Submission
// Add Student Form Submission
    document.getElementById('addStudentForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const formData = new FormData(this);
        const name = formData.get('name');
        const age = formData.get('age').toString(); // Ensure age is passed as a string
        const grade = formData.get('grade');

        fetch('http://127.0.0.1:4046/add_student', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, age, grade }) // Send data as JSON string
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to add student');
            }
            return response.text();
        })
        .then(message => {
            alert(message);
            fetchStudents(); // Refresh student list
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to add student. Please try again.');
        });
    });


    // Update Student Form Submission
// Update Student Form Submission
    document.getElementById('updateStudentForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const formData = new FormData(this);
        const id = formData.get('id');
        const name = formData.get('name');
        const age = formData.get('age').toString(); // Ensure age is passed as a string
        const grade = formData.get('grade');

        const data = {
            id: id,
            name: name,
            age: age,
            grade: grade
        };

        fetch('http://127.0.0.1:4046/update_student', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to update student');
            }
            return response.text();
        })
        .then(message => {
            alert(message);
            fetchStudents(); // Refresh student list
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to update student. Please try again.');
        });
    });



    // Delete Student Form Submission
// Delete Student Form Submission
    document.getElementById('deleteStudentForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const formData = new FormData(this);
        const id = formData.get('id');

        const data = {
            id: id
        };

        fetch('http://127.0.0.1:4046/delete_student', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to delete student');
            }
            return response.text();
        })
        .then(message => {
            alert(message);
            fetchStudents(); // Refresh student list
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to delete student. Please try again.');
        });
    });

});
