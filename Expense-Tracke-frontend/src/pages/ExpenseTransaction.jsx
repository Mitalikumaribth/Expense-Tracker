import { useContext } from "react"
import { AppContext } from "../context/AppContext"
import { FiTrash2 } from "react-icons/fi"

const ExpenseTransaction = () => {
    const { ExpenseData, deleteExpense } = useContext(AppContext)

    function handleDelete(id) {
        deleteExpense(id)
    }

    return (
        <div className="max-w-full p-4 mt-14">
            <h1 className="text-3xl font-semibold mb-6 text-start">Expense Transactions</h1>
            <div className="overflow-x-auto pr-8">
                <table className="w-full table-auto border-collapse bg-white shadow-lg rounded-lg">
                    <thead>
                        <tr className="bg-gray-100 text-gray-700 uppercase text-sm">
                            <th className="p-4 text-left">Name</th>
                            <th className="p-4 text-left">Category</th>
                            <th className="p-4 text-left">Date</th>
                            <th className="p-4 text-left">Amount</th>
                            <th className="p-4 text-left">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ExpenseData.map((transaction, index) => (
                            <tr key={index} className="border-b last:border-none hover:bg-gray-50 transition-colors">
                                <td className="pl-3">{transaction.title}</td>
                                <td>{transaction.category}</td>
                                <td>{transaction.date ? (new Date(transaction.date).toLocaleDateString()) : ""}</td>
                                <td className="p-4 text-left text-green-500 font-semibold">${transaction.amount}</td>
                                <td className="p-4 text-left">
                                    <button onClick={() => handleDelete(transaction._id)} className="text-red-500 hover:text-red-700 transition-colors">
                                        <FiTrash2 size={20} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ExpenseTransaction