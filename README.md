# 💰 BudgetBase - Frontend

**BudgetBase** is a full-stack expense tracking web application that allows users to add, categorize, and visualize their transactions through pie charts and bar graphs. The app provides a seamless budgeting experience with secure authentication and monthly tracking.

🌐 **Live Demo:** [BudgetBase](https://budget-base.vercel.app/)  

📦 **Frontend Repo:** [Frontend on GitHub](https://github.com/Garuna-A/BudgetBase-Frontend)

🔧 **Backend Repo:** [Backend on GitHub](https://github.com/Garuna-A/BudgetBase-backend)

---

## ⚙️ Key Features

* **Modern & Fast:** Developed with **React** and **Vite** for a highly performance and responsive user experience.
* **Sleek Design:** Styled entirely with **Tailwind CSS**, ensuring a clean, modern, and fully responsive design across all devices.
* **Intuitive Visualizations:** Utilizes **Recharts** to display income and expenses through engaging pie charts and bar graphs.
* **Secure Authentication:** Integrates seamlessly with the backend's **JWT-based authentication** system.
* **Flexible Filtering:** Easily filter and view transactions by specific month and year.
* **Detailed Transaction Entry:** Supports adding notes, categories, and specific dates for each transaction.

---

## 🛠 Tech Stack

* **Framework:** React
* **Build Tool:** Vite
* **Styling:** Tailwind CSS
* **Charting:** Recharts
* **HTTP Client:** Axios
* **Routing:** React Router

---

## 📸 Screenshots
![Dashboard_budget-base vercel app](https://github.com/user-attachments/assets/f45e6e88-5645-489b-a409-fff6c445d010)
![Add_budget-base vercel app](https://github.com/user-attachments/assets/9e4c73ba-6e3c-41e8-a144-61449d06790c)



## ▶️ Demo Video



https://github.com/user-attachments/assets/4e99d5ef-2216-4518-ac8c-fa77aa8d7e6c

▶️[View on Youtube](https://youtu.be/WZ1fwwb3nz4)


---

## Setup & Installation  

### 💻 Frontend Setup

1.  **Clone the frontend repository:**

    ```bash
    git clone https://github.com/Garuna-A/BudgetBase-Frontend.git
    cd BudgetBase-Frontend
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3. **Configure API Base URL**
   
   *Open src/api/axiosInstance.js and change the baseURL to your local backend address if you're testing locally:*
  
    ```bash
    const instance = axios.create({
      baseURL: "http://localhost:5000/api",
    });
    ```

5.  **Run the frontend locally:**

    ```bash
    npm run dev
    ```

Now, navigate to `http://localhost:5173` in your browser to access the BudgetBase application! 

### 🌐 Backend Setup

  The backend is built using Node.js, Express, and PostgreSQL with Prisma ORM.

  Follow the instructions in the [BudgetBase Backend Repository](https://github.com/Garuna-A/BudgetBase-backend) to set up the backend locally.
