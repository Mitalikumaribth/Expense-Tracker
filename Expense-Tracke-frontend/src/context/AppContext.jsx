
// [AppContext.jsx](http:_vscodecontentref_/12)

import { createContext, useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import cookie from 'js-cookie'
import axios from 'axios'
import { toast } from 'react-toastify'
import { jwtDecode } from "jwt-decode"
export const AppContext = createContext()

const AppContextProvider = ({ children }) => {
    const navigate = useNavigate()
    const [ExpenseData, setExpenseData] = useState([])
    const [IncomeData, setIncomeData] = useState([])
    const [token, setToken] = useState(Boolean(cookie.get("token")))

    //backend url
    const backendUrl = 'http://localhost:4000'
    const utoken = cookie.get('token')
    // console.log(utoken)

    //FetchIncome
    const fetchIncome = async () => {
        try {

            // new line
            const utoken = cookie.get('token')
            // console.log(utoken)
            if (!utoken) return;

            const decodedToken = jwtDecode(utoken)
            // console.log(decodedToken)
            const userId = decodedToken?.id

            if (!userId) {
                return;
            }

            const { data } = await axios.get(`${backendUrl}/api/user/get-income`, {
                headers: {
                    Authorization: `Bearer ${utoken}`
                }
            })

            console.log(data, "qqq")
            if (data.success) {
                setIncomeData(data.data)
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    const deleteIncome = async (id) => {
        try {
            const decodedToken = jwtDecode(utoken)
            // console.log(decodedToken)
            const userId = decodedToken?.id

            if (!userId) {
                return;
            }
            console.log(id)
            await axios.delete(`${backendUrl}/api/user/delete-income/${id}`, {
                headers: {
                    Authorization: `Bearer ${utoken}`
                }
            })
            fetchIncome()
        } catch (error) {
            console.log(error)
        }
    }

    //fetchExpense
    const fetchExpense = async () => {
        try {

            // new line
            const utoken = cookie.get('token')
            if (!utoken) return;


            const decodedToken = jwtDecode(utoken);
            const userId = decodedToken?.id

            if (!userId) {
                return
            }

            const { data } = await axios.get(`${backendUrl}/api/user/get-expense`, {
                headers: {
                    Authorization: `Bearer ${utoken}`
                }
            })
            if (data.success) {
                setExpenseData(data.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const deleteExpense = async (id) => {
        try {
            const decodedToken = jwtDecode(utoken)
            // console.log(decodedToken)
            const userId = decodedToken?.id

            if (!userId) {
                return;
            }
            console.log(id)
            await axios.delete(`${backendUrl}/api/user/delete-expense/${id}`, {
                headers: {
                    Authorization: `Bearer ${utoken}`
                }
            })
            fetchExpense()
        } catch (error) {
            console.log(error)
        }
    }

    //addIncome
    const addIncome = async (title, amount, category, description, date) => {
        try {
            const { data } = await axios.post(`${backendUrl}/api/user/add-income`, { title, amount, category, description, date }, {
                headers: {
                    Authorization: `Bearer ${utoken}`
                }
            })
            console.log(data)
            if (data.success) {
                toast.success(data.message)
                fetchIncome()
                navigate('/')
            }
        } catch (error) {
            console.log(error)
        }
    }

    //addExpense
    const addExpense = async (title, amount, category, description, date) => {
        try {
            const { data } = await axios.post(`${backendUrl}/api/user/add-expense`, { title, amount, category, description, date }, {
                headers: {
                    Authorization: `Bearer ${utoken}`
                }
            })
            if (data.success) {
                toast.success(data.message)
                fetchExpense()
                navigate('/')
            }
        } catch (error) {
            console.log(error)
        }
    }

    //Register 
    const handleRegister = async (name, email, password) => {
        try {
            const { data } = await axios.post(`${backendUrl}/api/user/register`, { name, email, password }, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            if (data.success) {
                cookie.set("token", data.token, { expires: 7 })
                setToken(true)
                fetchIncome()
                fetchExpense()
                toast.success(data.message || "Register Successfull")
                navigate('/')
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    //login
    const handleLogin = async (email, password) => {
        try {
            const { data } = await axios.post(`${backendUrl}/api/user/login`, { email, password }, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            if (data.success) {
                cookie.set("token", data.token, { expires: 7 })
                setToken(true)
                fetchIncome()
                fetchExpense()
                toast.success(data.message || "Login Successfull")
                navigate('/')
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    //useEffect
    useEffect(() => {
        fetchIncome()
        fetchExpense()
    }, [])

    useEffect(() => {
        if (token) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${cookie.get("token")}`
        } else {
            delete axios.defaults.headers.common["Authorization"]
        }
    }, [token])

    //value
    const values = {
        backendUrl,
        handleRegister,
        handleLogin,
        fetchIncome,
        fetchExpense,
        addExpense,
        addIncome,
        IncomeData,
        ExpenseData,
        token,
        setToken,
        deleteIncome,
        deleteExpense
    }

    return <AppContext.Provider value={values}>
        {children}
    </AppContext.Provider>
}

export default AppContextProvider   