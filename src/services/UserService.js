import axios from "./cutomize-axios";

const fetchAllUser = (selectedPage) => {
    return axios.get(`/api/users?page=${selectedPage}`)
}


const postCreateUser = (name, job) => {
    return axios.post("/api/users", {  name, job  })
} 
export { fetchAllUser, postCreateUser };
