import http from "k6/http";


function generateRandomFullName() {
    const firstNames = ['Alice', 'Bob', 'Charlie', 'Diana', 'Eve'];
    const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones'];
    const randomFirstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const randomLastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    return `${randomFirstName} ${randomLastName}`;
}

export function generateStudent() {
    const name = generateRandomFullName();
    const age = Math.floor(Math.random() * 10) + 18; // Random age between 18 and 27
    const grades = ['A', 'B', 'C', 'D', 'E', 'F'];
    const grade = grades[Math.floor(Math.random() * grades.length)];
    const params = {
        headers: {
            'Content-Type': 'application/json',
            'API_KEY': 'habbe_testar_k6_generate',
        },
    };
    
    return {
        name: name,
        age: age,
        grade: grade
    };
}
// get a student with specific ID
export function getStudentById(id) {
    const BASE_URL = 'https://test-379574553568.us-central1.run.app/student';
    const API_KEY = 'habbe_testar_k6_generate';
    
    const params = {
        headers: {
            'Content-Type': 'application/json',
            'API_KEY': API_KEY,
        },
        tags: { name: "get_student" },
    };

    const response = http.get(`${BASE_URL}/${id}`, params);
    return response.json();
}
// Edit student with specific ID
export function editStudentById(id, studentData) {
    const BASE_URL = 'https://test-379574553568.us-central1.run.app/student';
    const API_KEY = 'habbe_testar_k6_generate';
    
    const params = {
        headers: {
            'Content-Type': 'application/json',
            'API_KEY': API_KEY,
        },
        tags: { name: "edit_student" },
    };

    const payload = JSON.stringify(studentData);
    const response = http.put(`${BASE_URL}/${id}`, payload, params );
    return response.json();
}
// Delete student with specific ID
export function deleteStudentById(id) {
    const BASE_URL = 'https://test-379574553568.us-central1.run.app/student';
    const API_KEY = 'habbe_testar_k6_generate';
    
    const params = {
        headers: {
            'Content-Type': 'application/json',
            'API_KEY': API_KEY,
        },
    };

    const response = http.del(`${BASE_URL}/${id}`, params, { tags: { name: 'delete_student' } });
    return response.json();
    

}
// get all students
export function getAllStudents() {
    const BASE_URL = 'https://test-379574553568.us-central1.run.app/student';
    const API_KEY = 'habbe_testar_k6_generate';
    
    const params = {
        headers: {
            'Content-Type': 'application/json',
            'API_KEY': API_KEY,
        },
    };

    const response = http.get(BASE_URL, params, { tags: { name: 'get_all_students' } });
    return response.json();
}