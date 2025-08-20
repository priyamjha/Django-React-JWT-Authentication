import React, {createContext, useState, useEffect} from "react"; 
import axios from "../axios";


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            fetchUserData(token);
        } else {
            setLoading(false);
        }
        // Fetch user data if token exists
    }, []);

    const fetchUserData = async (token) => {
        try{
            const response = await axios.get('/api/dashboard/');
            setUser(response.data.user);
        }catch (error) {
            console.log(error);
        }finally {
            setLoading(false);
        }  
    }

    const register = async (credentials, navigate) => {
        try{
            const response = await axios.post('/api/register/', credentials);
            console.log(response.data);
            navigate('/login');
        }catch (error) {
            if (error.response && error.response.data) {
                setErrors(error.response.data);
            } else {
                console.error("An unexpected error occurred:", error);
            }
        }finally {
            setLoading(false);
        }  
    }

    const login = async (credentials, navigate) => {
        try{
            const response = await axios.post('/api/login/', credentials);
            const { access, refresh } = response.data;
            localStorage.setItem('token', access);
            localStorage.setItem('refreshToken', refresh);

            axios.defaults.headers.common['Authorization'] = `Bearer ${access}`;
            await fetchUserData(access);
            navigate('/dashboard');
        }catch (error) {
            console.log(error);
        }finally {
            setLoading(false);
        }  
    }

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        delete axios.defaults.headers.common['Authorization'];
        setUser(null);
    }

   

    

    return (
        <AuthContext.Provider value={{ user, loading, errors, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;