import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchFail, fetchStart, loginSuccess } from "../features/authSlice";



const useAuthCall = () => {
    const dispatch = useDispatch()
const navigate = useNavigate()
    const login = async (userInfo)=>{
        const BASE_URL = "https://12101.fullstack.clarusway.com"
        dispatch(fetchStart())
        try {
            const { data} = await axios.post(`${BASE_URL}/account/auth/login/`, userInfo)
            dispatch(loginSuccess(data))
            navigate("/stock")
        } catch (error) {
            dispatch(fetchFail)
            console.log(error);
        }
    }
return {login}
    }

export default useAuthCall