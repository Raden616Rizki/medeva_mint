import axios from "axios";

const http = axios.create({
    baseURL: "http://localhost:7007/api/employees",
    headers: {
        "Content-Type": "application/json",
    },
});

const getAll = (params = {}) => {
    return http.get("/", { params });
};

const get = (id) => {
    return http.get(`/${id}`);
};

const create = (data) => {
    return axios.post(
        "http://localhost:8080/api/employees",
        data,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );
};

const update = (id, data) => {
    return axios.put(
        `http://localhost:8080/api/employees/${id}`,
        data,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );
};

export default {
    getAll,
    get,
    create,
    update,
};
