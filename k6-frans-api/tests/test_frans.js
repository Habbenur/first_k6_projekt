import http from 'k6/http';
import { sleep } from 'k6';

const BASE_URL = 'https://test-379574553568.us-central1.run.app';
const API_KEY = 'habbe_testar_k6';

const params = {
    headers: {
        'Content-Type': 'application/json',
        'api_key': API_KEY,
    },
}

export const options = {
    // Define the number of iterations for the test
    iterations: 3,
};

export function add_student() {
    // Create student to the /frans endpoint
    const payload = JSON.stringify({
        "name": "Test Student",
        "age": 20,
        "grade" : "A"
    });

    const response = http.post(`${BASE_URL}/student`, payload, params);

    console.log(response);
    
    // Sleep for a short duration to simulate user think time
    sleep(1);
}

// export default function () {
    // Make a GET request to the /frans endpoint
//    const response = http.get(`${BASE_URL}/student`, params);

//    console.log(response);
    
    // Sleep for a short duration to simulate user think time
//   sleep(1);
//}

export default function () {
    // Edit student to the /frans endpoint
    add_student();
    const payload = JSON.stringify({
        "name": "Test Student Edited",
        "age": 21,
        "grade" : "A+",
        "ID": 5
    });

    const response = http.put(`${BASE_URL}/student/5`, payload, params);

    console.log(response);
}

