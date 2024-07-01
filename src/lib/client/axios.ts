import axios from "axios";

const AxiosClient = axios.create({
  headers:{
    "Accept": "application/json",
    "Content-Type": "application/json",
  },
  baseURL: process.env.NEXT_PUBLIC_BACKEND_API_URL
});

const setToken = (token: string) => {
  AxiosClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

const bodyform = (body: Object)=>{
    const bodyFormData: any = new FormData();
    for(const [key, value] of Object.entries(body)) {
        bodyFormData.append(key, value)
    }
    return bodyFormData
}

export { AxiosClient, setToken, bodyform };
