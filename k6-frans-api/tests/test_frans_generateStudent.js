import http from 'k6/http';
import { editStudentById, generateStudent, getStudentById, deleteStudentById } from "./generateStudent.js";
import { check, sleep } from "k6";

const BASE_URL = 'https://test-379574553568.us-central1.run.app/student'; 
const API_KEY = 'habbe_testar_k6_generate';

const params = {
    headers: {
        'Content-Type': 'application/json',
        'API_KEY': API_KEY,
    },
    tags: { name: "create_student" },
    
};

export const options = {
    iterations: 3,
    thresholds: {
        'http_req_duration{name:create_student}': ['p(95)<200'],
        'http_req_duration{name:get_student}': ['p(95)<200'],
        'http_req_duration{name:edit_student}': ['p(95)<200'],
        'http_req_duration{name:delete_student}': ['p(95)<200'],
    }
};

export default function () {
    const studentData = generateStudent();
    const payload = JSON.stringify(studentData);

    const response = http.post(BASE_URL, payload, params, { tags: { name: 'create_student' } });
    console.log(`Created student: ${response.body}`);
    sleep(1);

    // get a student with specific ID
    const getResponse = getStudentById(1);
    console.log(`Got student with ID 1: ${JSON.stringify(getResponse)}`);
    sleep(1);

    // Edit student with specific ID
    const editPayload = editStudentById(3, {
        name: 'Edited Student',
        age: 25,
        grade: 'B'
    }, { tags: { name: 'edit_student' } });
    console.log(`Edited student with ID 3: ${JSON.stringify(editPayload)}`);
    sleep(1);

    // Delete student with specific ID
    const deleteResponse = deleteStudentById(10);
    console.log(`Deleted student with ID 10: ${JSON.stringify(deleteResponse)}`);

    sleep(1);

}   

