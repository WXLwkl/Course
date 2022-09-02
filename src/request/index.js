import axios from "axios";

let service = axios.create({
    baseURL:"https://gateway-api-ipv6.dushu365.com",
    timeout:5000,
    headers:{
        "Content-Type": "application/json; charset=utf-8",
        "X-DUSHU-APP-ONEID": "OI0uTq0uVGsr7WSQO9ya76xA-HJhOiVrP2u5GZjJvtOn8", 
        "X-DUSHU-APP-VER": "5.20.0",
        "X-DUSHU-APP-LID": "T8cwcyT7yd7JGfN0EulaM2MvcO-rgrsq",
        "X-DUSHU-APP-PLT": "1",
        "X-DUSHU-APP-MUID": "00000000-0000-0000-0000-000000000000",
    }
})

export default service;