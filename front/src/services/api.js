import axios from "axios";

const token = localStorage.getItem('token');

export default axios.create({
    baseURL: 'http://localhost:8000',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${JSON.parse(token)}`
    },
});

// https://crm-controle-de-cobranca.herokuapp.com
// http://localhost:8000