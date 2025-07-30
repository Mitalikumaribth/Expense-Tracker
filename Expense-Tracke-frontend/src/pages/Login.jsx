import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { AppContext } from "../context/AppContext"
const Login = () => {

    const navigate = useNavigate()
    const { handleLogin } = useContext(AppContext)

    const [isModel, setIsModel] = useState(true)

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    const handleModelClose = () => {
        setIsModel(false)
        navigate('/')
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(formData.password)
        handleLogin(formData.email, formData.password)
        setIsModel(false)
        navigate('/')
    }

    return (
        <>
            {isModel && (
                <div className="fixed inset-0 bg-gray bg-opacity-9 z-50 flex items-center justify-center">
                    <div className="bg-white rounded-lg w-96 p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold">Login</h2>
                            <button onClick={handleModelClose} className="text-gray-600 hover:text-gray-900 text-2xl">
                                &times;
                            </button>
                        </div>
                        <form onSubmit={(e) => handleSubmit(e)} className="space-y-4">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none"
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    required
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none"
                                />
                            </div>
                            <button className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Login</button>
                        </form>
                        <p className="text-sm text-center mt-4">Don&apos;t have a account?{" "}
                            <button onClick={() => navigate('/register')} className="text-blue-500 hover:underline">Register</button>
                        </p>
                    </div>
                </div>
            )

            }
        </>
    )
}

export default Login