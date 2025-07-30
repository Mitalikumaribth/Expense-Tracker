
import { useContext, useState } from "react"
import {AppContext} from "../context/AppContext"
const Income = () => {
        const {addIncome} = useContext(AppContext)

        const [formData, setFormData] = useState({
            title:"",
            amount:"",
            type:"",
            category:"",
            description:"",
            date:""
        })

        const handleChange =(e)=>{
            const{name, value} =e.target;
            setFormData({...formData,[name]:value})
        }

        const handleSubmit =(e) =>{
            e.preventDefault()
            const amount = Number(formData.amount)
            addIncome(formData.title, amount, formData.category, formData.description, formData.date)
        }
    
    return (
        <div className="mx-auto max-w-2xl md:mt-6 bg-white p-6 rounded-md shadow-md">
            <h1 className="text-2xl font-semibold text-gray-700 mb-4">Add Income</h1>
            <form onSubmit={handleSubmit} className="space-y-0.5">
                <div className="mb-4">
                    <label className="block text-gray-600 mb-2">
                        Title
                    </label>
                    <input 
                    type="text" 
                    name="title" 
                    value={formData.title} 
                    onChange={(e)=>handleChange(e)}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                    placeholder="Enter income title" 
                    required />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-600 mb-2">
                        Amount
                    </label>
                    <input 
                    type="text" 
                    name="amount" 
                    value={formData.amount}  
                    onChange={(e)=>handleChange(e)} 
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                    placeholder="Enter amount" 
                    required />
                </div>
           
                <div className="mb-4">
                    <label className="block text-gray-600 mb-2">Income Type</label>
                    <select 
                    name="type" 
                    value={formData.type} 
                    onChange={(e)=>handleChange(e)} 
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                    required>
                    <option value="" disabled>Select type</option>
                    <option value="salary">Salary</option>
                    <option value="business">Business</option>
                    <option value="investment">Investment</option>
                    <option value="freelance">Freelance</option>
                    <option value="rental">Rental Income</option>
                    <option value="other">Other</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-600 mb-2">Category</label>
                    <select 
                    name="category" 
                    value={formData.category} 
                    onChange={(e)=>handleChange(e)}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                    required>
                        <option value="" disabled>Select Category</option>
                        <option value="monthly-salary">Monthly Salary</option>
                        <option value="dividends">Dividends</option>
                        <option value="consulting">Consulting</option>
                        <option value="real-estate">Real Estate</option>
                        <option value="side-hustle">Side Hustle</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-600 mb-2">
                        Description
                    </label>
                    <textarea 
                    onChange={handleChange}
                    type="text" 
                    value={formData.description} 
                    name="description" 
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                    placeholder="Enter description" 
                    required  
                    rows="3"></textarea>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-600 mb-2">
                        Date
                    </label>
                    <input 
                    type="date" 
                    value={formData.date} name="date" 
                    onChange={(e)=>handleChange(e)}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                    required />
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">Submit</button>
            </form>
            
        </div>
    )
}

export default Income