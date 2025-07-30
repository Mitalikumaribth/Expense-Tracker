import { ToastContainer } from 'react-toastify'
import { Route, Routes, useLocation } from 'react-router-dom'
import { useContext, useEffect } from 'react'
import { AppContext } from './context/AppContext'
import SideBar from './components/SideBar'
import Dashboard from './pages/DashBoard'
import History from './components/History'
import ViewTransactions from './pages/ViewTransaction'
import Income from './pages/Income'
import Expenses from './pages/Expenses'
import IncomeTransactions from './pages/IncomeTransaction'
import ExpenseTransactions from './pages/ExpenseTransaction'
import Login from './pages/Login'
import Register from './pages/Register'
const App = () => {
  const location = useLocation()
  const { token, fetchIncome, fetchExpense } = useContext(AppContext)

  const hideMainLayout = [
    "/view-transactions",
    "/add-income",
    "/add-expense",
    "/incomeTransactions",
    "/expenseTransactions",
    "/login",
    "/register"
  ].includes(location.pathname)

  useEffect(() => {
    if (token) {
      fetchIncome()
      fetchExpense()
    }
  }, [token, location])
  return (
    <div className='w-full flex flex-row'>
      <ToastContainer />
      <SideBar />
      {/* {!hideMainLayout && <SideBar />} */}
      {!hideMainLayout ? (
        <div className='flex flex-row w-full overflow-auto'>
          <div className='flex-1 w-1/2'>
            <Routes>
              <Route path='/' element={<Dashboard />} />
            </Routes>
          </div>
          <div className='flex-2 flex-col md:w-1/3 hidden lg:flex overflow-auto'>
            <Routes>
              <Route path='/' element={<History />} />
            </Routes>
          </div>
        </div>
      ) : (
        <div className='flex-1 max-h-screen w-full overflow-auto'>
          <Routes>
            <Route path='/view-transactions' element={<ViewTransactions />} />
            <Route path='/add-income' element={<Income />} />
            <Route path='/add-expense' element={<Expenses />} />
            <Route path='/incomeTransactions' element={<IncomeTransactions />} />
            <Route path='/expenseTransactions' element={<ExpenseTransactions />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </Routes>
        </div>
      )}
    </div>
  )
}
export default App