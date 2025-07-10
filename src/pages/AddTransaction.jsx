import { useState } from "react";
import axios from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function AddTransaction() {
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("Expense");
  const [category, setCategory] = useState("");
  const [note, setNote] = useState("");
  const [date, setDate] = useState("");
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
      e.preventDefault();
      try {
      const isoDate = new Date(date + "T00:00:00").toISOString();
      await axios.post(
        "/transaction",
        { amount: parseFloat(amount), type, category, note, date:isoDate },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      navigate("/dashboard"); 
    } catch (err) {
      console.error("Error adding transaction", err);
      alert("Failed to add transaction");
    }
  };

  return (
    <div>
      <Navbar/>
      <div className="min-h-screen flex justify-center items-center bg-orange-50 font-display">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-xl shadow-md w-full max-w-md space-y-4"
        >
          <h2 className="text-2xl font-bold text-center text-orange-600">Add Transaction</h2>

          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            className="w-full p-2 border rounded-lg"
          />

          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full p-2 border rounded-lg"
          >
            <option value="Expense">Expense</option>
            <option value="Income">Income</option>
          </select>

          <input
              list="categories"
              placeholder="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              className="w-full p-2 border rounded-lg"
          />
          <datalist id="categories">
          <option value="Food" />
          <option value="Transport" />
          <option value="Rent" />
          <option value="Bills" />
          <option value="Utilities" />
          <option value="Shopping" />
          <option value="Entertainment" />
          <option value="Salary" />
          <option value="Freelancing" />
          <option value="Other" />
          </datalist>

          <input
            type="text"
            placeholder="Note (optional)"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full p-2 border rounded-lg"
          />

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="w-full p-2 border rounded-lg"
          />

          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600"
          >
            Add Transaction
          </button>
        </form>
      </div>
    </div>
  );
}
