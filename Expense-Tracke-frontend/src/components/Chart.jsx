// import {LIne} from 'react-chartjs-2'
// import { Chart as chartjs , CategoryScale, LinearScale, PointElement,LineElement, Title, Tooltip, Legend, Filler} from "chart.js";
// import { callback } from 'chart.js/helpers';
// chartjs.register( CategoryScale, LinearScale, PointElement,LineElement, Title, Tooltip, Legend, Filler)
// const Chart = ({IncomeData, ExpenseData}) => {
//     const Chart =({IncomeData, ExpenseData}) =>{
//     const getMonthYear = (date)=>{
//         const newDate = new Date(date)
//         const options =  {year: 'numeric', month:'short'}
//         return newDate.toLocaleDateString('en-US',options)
//     }
//     const labels=[
//         ...new Set([
//             ...IncomeData.map(item => getMonthYear(item.date)),
//             ...ExpenseData.map(item => getMonthYear(item.date))
//         ])
//     ]
//     const incomeAmounts = labels.map(label=>{
//         return IncomeData.filter(item => getMonthYear(item.date) ===label).reduce((sum,item)=>sum+parseFloat(item.amount),0)
//     }
//     )
//     const expenseAmounts = labels.map(label=>{
//         return ExpenseData.filter(item => getMonthYear(item.date) ===label).reduce((sum,item)=>sum+parseFloat(item.amount),0)
//     }
//     )

//     const data ={
//         labels,
//         datasets:[
//             {
//                 label:"Income",
//                 data:incomeAmounts,
//                 borderColor:"rgba(75,192,192,1)",
//                 backgroundColor:"rgba(75,192,192,0.2)"
//                 fill:true,
//                 tension:0.4
//             },
//             {
//                 label:"Income",
//                 data:incomeAmounts,
//                 borderColor:"rgba(255,99,132,1)",
//                 backgroundColor:"rgba(255,99,132,0.2)"
//                 fill:true,
//                 tension:0.4
//             },

//         ]
//     }
// }

// const options ={
//     responsive:true,
//     maintainAspectRatio:false,
//     plugins:{
//         title:{
//         display:true,
//         text:"Income vs Expense"
//     },
//     legend:{
//         position: "top"
//     },
//     tooltip:{
//         callback:{
//             label:function (context){
//                 const label = context.dataset.label || ""
//                 const value = context.row
//                 return `${label}: $${value.toLocaleDateString()}`
//             }
//         }
//     }
// },
// scales:{
//     x:{
//         beginAtZero:true,
//     },
//     y:{
//         beginAtZero:true,
//         ticks:{
//             callback: function(value){
//                 return `$${value}`
//             }
//         }
//     }
// }
// }
//     return (
//         <div className='p-6 flex flex-col'>
//             <h1 className='text-3xl font-semibold mb-4'>All Transaction</h1>
//             <div className='rounded-lg md:max-w-full h-96'>
//                 <Line data={data} options={options}/>
//             </div>
//         </div>
//     )
// }

// export default Chart

import { Line } from 'react-chartjs-2'
import { Chart as chartjs, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from "chart.js";
chartjs.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const Chart = ({ IncomeData, ExpenseData }) => {
    const getMonthYear = (date) => {
        const newDate = new Date(date);
        const options = { year: 'numeric', month: 'short' };
        return newDate.toLocaleDateString('en-US', options);
    };

    const labels = [
        ...new Set([
            ...IncomeData.map(item => getMonthYear(item.date)),
            ...ExpenseData.map(item => getMonthYear(item.date))
        ])
    ];

    const incomeAmounts = labels.map(label => {
        return IncomeData
            .filter(item => getMonthYear(item.date) === label)
            .reduce((sum, item) => sum + parseFloat(item.amount), 0);
    });

    const expenseAmounts = labels.map(label => {
        return ExpenseData
            .filter(item => getMonthYear(item.date) === label)
            .reduce((sum, item) => sum + parseFloat(item.amount), 0);
    });

    const data = {
        labels,
        datasets: [
            {
                label: "Income",
                data: incomeAmounts,
                borderColor: "rgba(75,192,192,1)",
                backgroundColor: "rgba(75,192,192,0.2)",
                fill: true,
                tension: 0.4
            },
            {
                label: "Expense",
                data: expenseAmounts,
                borderColor: "rgba(255,99,132,1)",
                backgroundColor: "rgba(255,99,132,0.2)",
                fill: true,
                tension: 0.4
            }
        ]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: true,
                text: "Income vs Expense"
            },
            legend: {
                position: "top"
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        const label = context.dataset.label || "";
                        const value = context.parsed.y;
                        return `${label}: $${value}`;
                    }
                }
            }
        },
        scales: {
            x: {
                beginAtZero: true,
            },
            y: {
                beginAtZero: true,
                ticks: {
                    callback: function (value) {
                        return `$${value}`;
                    }
                }
            }
        }
    };

    return (
        <div className='p-6 flex flex-col'>
            <h1 className='text-3xl font-semibold mb-4'>All Transaction</h1>
            <div className='rounded-lg md:max-w-full h-96'>
                <Line data={data} options={options} />
            </div>
        </div>
    );
};

export default Chart;