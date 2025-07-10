import { useState, useEffect } from "react";
import axios from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import { PieChart, Pie, Tooltip, Cell, Legend } from "recharts";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";
import Navbar from "../components/Navbar";


export default function Dashboard() {
   const [username, setUsername] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [groupedExpenses,setGroupExpenses] = useState([]);
  const [groupedMonthly,setGroupedMonthly] = useState([]);
//   const [viewMode, setViewMode] = useState("monthly"); // or 'daily'
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const navigate = useNavigate();


  useEffect(() => {
    async function fetchData() {
      try {
        console.log(month,year);
        const res = await axios.get(`/transaction/monthly?month=${month}&year=${year}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        console.log(res.data.groupedMonthly);
        setUsername(res.data.username || "User");
        setTransactions(res.data.transactions||[]);
        setGroupExpenses(res.data.groupedExpenses||[])
        setGroupedMonthly(res.data.groupedMonthly||[]);
        setTotalIncome(res.data.totalIncome);
        setTotalExpense(res.data.totalExpense);
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
  }, [month, year]);

  return (
    <div>
      <Navbar/>
    <div className="p-4 bg-orange-100 min-h-screen font-display">
      <h2 className="text-2xl font-semibold text-orange-600 mb-4">Hello, {username} 👋</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <SummaryCard label="Income" amount={totalIncome} color="green" />
        <SummaryCard label="Expense" amount={totalExpense} color="red" />
        <SummaryCard label="Balance" amount={totalIncome - totalExpense} color="blue" />
      </div>
        <ExpensePieChart data={groupedExpenses} />
        <BarChartComponent data={groupedMonthly} />

      <div className="flex justify-end mb-4 gap-2">
        <select
          value={month}
          onChange={(e) => setMonth(Number(e.target.value))}
          className="px-2 py-1 rounded border border-orange-400"
        >
          {[...Array(12)].map((_, i) => (
            <option key={i} value={i + 1}>{new Date(0, i).toLocaleString('default', { month: 'short' })}</option>
          ))}
        </select>
        <select
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
          className="px-2 py-1 rounded border border-orange-400"
        >
          {[2024, 2025, 2026].map(y => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>
      </div>

      {/* Transactions List */}
      <div className="space-y-3">
        {transactions.length === 0 ? (
          <p className="text-gray-500 text-center">No transactions found.</p>
        ) : (
          transactions.map(txn => (
            <div key={txn.id} className="bg-white p-4 rounded-xl shadow flex justify-between items-center">
              <div>
                <h3 className="font-semibold">{txn.category}</h3>
                <p className="text-sm text-gray-500">{txn.note || "—"}</p>
              </div>
              <div className={`font-bold ${txn.type === "Income" ? "text-green-600" : "text-red-600"}`}>
                ₹{txn.amount}
              </div>
            </div>
          ))
        )}
      </div>
      <br />
      <div className="space-y-3">

        <button
            onClick={() => navigate("/add")}
            className="mb-4 px-4 py-2 bg-orange-500 text-white rounded-lg shadow hover:bg-orange-600"
            >
            + Add Transaction
        </button>

      </div>
    </div>
    </div>
  );
}

function SummaryCard({ label, amount, color }) {
  const colorClasses = {
    green: "border-green-500 text-green-600",
    red: "border-red-500 text-red-600",
    blue: "border-blue-500 text-blue-600",
  };

  const styles = colorClasses[color] || "border-black-500 text-black-600";

  return (
    <div className={`bg-white p-4 rounded-xl shadow border-l-4 ${styles}`}>
      <h4 className={`font-semibold`}>{label}</h4>
      <p className="text-xl font-bold">₹{amount}</p>
    </div>
  );
}


function ExpensePieChart({ data }) {
  const COLORS = ['#FF8042', '#00C49F', '#FFBB28', '#8884D8', '#FF6666', '#82ca9d'];
  const pieData = data.map(item => ({
    name: item.category,
    value: item._sum.amount
  }));

  return (
    <div className="w-full flex justify-center mb-6">
      {pieData.length === 0 ? (
        <p className="text-gray-500">No expenses to display.</p>
      ) : (
        <PieChart width={350} height={300}>
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
            label
          >
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      )}
    </div>
    
  );
}

function BarChartComponent({ data }) {

    //This converts the numbers to month name for the graph
    const formattedData = data.map(entry => {
    const [year, month] = entry.month.split("-");
    const date = new Date(parseInt(year), parseInt(month) - 1);
    return {
        month: date.toLocaleString("default", { month: "long" , year: "numeric"}), 
        Expense: entry.total
    };
    });


  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={formattedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip contentStyle={{ backgroundColor: "#fff7ed", borderColor: "#f59e0b" }} cursor={{ fill: "#fde68a" }}/>
          <Bar dataKey="Expense" fill="#eda74c" radius={[4, 4, 0, 0]} activeBar={{fill:'#fb923c'}}/>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}


