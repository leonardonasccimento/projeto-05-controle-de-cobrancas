import axios from "axios";

const token = localStorage.getItem('token');

export default axios.create({
    baseURL: 'https://controle-de-cobrancas.herokuapp.com',
    // timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${JSON.parse(token)}`
    },
});

// https://controle-de-cobrancas.herokuapp.com
// http://localhost:8000