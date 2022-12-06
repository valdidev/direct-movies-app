import axios from "axios";

const jwt = localStorage.getItem("jwt");

export const API = "https://backend-videoclub-modify-production.up.railway.app";

export const httpGet = async (content, target, criteria) => {
    try {
        let res = await axios.get(`${API}/${content}/${target}/${criteria}`, { headers: { "Authorization": "Bearer " + jwt } })
        return res.data;
    } catch (error) {
        console.error(error);
    }
};

export const getUsersAdmin = async (jwt) => {
    let data = await axios.get(`${API}/users/all`, {
        headers: {
            "Authorization":
                "Bearer " + jwt
        },

    })
    return data
}

export const getLoansAdmin = async (jwt) => {
    await axios.get(`${API}/loans/allloans`, {
        headers: {
            "Authorization":
                "Bearer " + jwt
        },


    })
    // return data
}

export function getMyLoansMovies(jwt) {
    return fetch(`${API}/loans/myloans/movies`, {
        headers: {
            Authorization:
                "Bearer " + jwt
        },
    })

        .then((res) => res.json())
}

export function getMyLoansSeries(jwt) {
    return fetch(`${API}/loans/myloans/series`, {
        headers: {
            Authorization:
                "Bearer " + jwt,

        },
    })

        .then((res) => res.json())
}

export const httpGetAdmin = async (content, target) => {
    try {
        let res = await axios.get(`${API}/${content}/${target}`, { headers: { "Authorization": "Bearer " + jwt } })
        return res.data;
    } catch (error) {
        console.error(error);
    }
};