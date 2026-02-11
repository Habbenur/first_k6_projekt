import http from 'k6/http';
import {sleep} from 'k6';

const BASE_URL = 'https://test-379574553568.us-central1.run.app/student'
const API_KEY = 'habbe_testar_k6_copy';

export const options = {
    // Define the number of iterations for the test
    iterations: 3,
    thresholds: {
        'http_req_duration{name:create_student}': ['p(95)<200'],
        'http_req_duration{name:get_student}': ['p(95)<200'],
        'http_req_duration{name:edit_student}': ['p(95)<200'],
        'http_req_duration{name:delete_student}': ['p(95)<200'],
        'http_req_duration{name:get_all_students}': ['p(95)<200'],
    }

};

const params = {
    headers: {
        'Content-Type': 'application/json',
        'API_KEY': API_KEY,
    },
};

// Below function is the "main" function.
// Don't change name export default function()
export default function () {

    const headers = {
        'Content-Type': 'application/json',
        'API_KEY': API_KEY,
    }

    const payload = JSON.stringify({
        name: 'Test Student Copy',
        age: 38,
        grade: 'VG'
    });
    const response = http.post(BASE_URL, payload, {headers, tags: {name: "create_student"}})
    // Get a student with specific ID
    const getResponse = http.get(`${BASE_URL}/3`, {headers, tags: {name: "get_student"}})
    // Edit student to the /frans endpoint
    const editPayload = JSON.stringify({
        name: 'Test Student Copy Edited',
        age: 39,
        grade: 'G',
        ID: 3
    });
    // Edit student with specific ID
    const editResponse = http.put(`${BASE_URL}/3`, editPayload, {headers, tags: {name: "edit_student"}})
    
    // Delete student from the /frans endpoint

    const deleteResponse = http.del(`${BASE_URL}/5`, null, {headers, tags: {name: "delete_student"}})

    // Get all students
    const getAllResponse = http.get(BASE_URL, {headers, tags: {name: "get_all_students"}})

    console.log(response)
    console.log(getResponse)
    console.log(editResponse)
    console.log(deleteResponse)
    console.log(getAllResponse)
    sleep(1)
}
 