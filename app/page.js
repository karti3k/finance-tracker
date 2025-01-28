"use client";
import { currencyFormatter } from "@/app/lib/utils";
import ExpenseCategoryItem from "@/app/components/ExpenseCategoryItem";
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from "chart.js";
import {Doughnut} from "react-chartjs-2";
import { useState } from "react";
import AddIncomeModal from "@/app/components/Modals/AddIncomeModal";

ChartJS.register(ArcElement, Tooltip, Legend);

const DUMMY_DATA = [
  {
    id: 1,
    title: "Entertainment",
    color: '#000',
    total: 500
  },
  {
    id: 2,
    title: "Shopping",
    color: '#fff',
    total: 2000
  },
  {
    id: 3,
    title: "Fuel",
    color: '#f4f',
    total: 200
  }
];

export default function Home() {
  // console.log(income);
  const [showAddIncome, setShowAddIncome] = useState(false);


  return (
    <>
    {/* Add income modal */}
    <AddIncomeModal show={showAddIncome} onClose={setShowAddIncome} />
       
    <main className="max-w-5xl px-6 mx-auto">
      <section className="py-3">
      <small className="text-gray-400 text-md">My Balance</small>
      <h2 className="text-4xl font-bold">{currencyFormatter(100000)}</h2>
      </section>

      <section className="flex items-center gap-2 py-3">
        <button className="btn btn-primary">+Expenses</button>
        <button onClick={()=>{setShowAddIncome(true);}} className="btn btn-primary-outline">+Income</button>
      </section>

      {/* Expenses */}
      <section className="py-6">
        <h3 className="text-2xl">My Expenses</h3>
        <div className="input-group mt-6">
          {/* Expense Items */}
          {DUMMY_DATA.map((expense) => {
            return(
              <ExpenseCategoryItem key={expense.id} color={expense.color} title={expense.title} total={expense.total}></ExpenseCategoryItem>
            );
          })}
        </div>
      </section>

      {/* Chart section */}
      <section className="py-6 flex flex-col items-center">
          <h3 className="text-2xl w-full text-left">Stats</h3>
          <div className="w-[350px] h-[350px] mx-auto">
            <Doughnut
            data={{
              labels: DUMMY_DATA.map((expense)=> expense.title),
              datasets: [
                {
                  label: "Expenses",
                  data: DUMMY_DATA.map((expense)=> expense.total),
                  backgroundColor: DUMMY_DATA.map((expense)=>expense.color),
                  borderColor: ["#18181b"],
                  borderwidth: 5,
                }
              ]
            }}>

            </Doughnut>
          </div>
      </section>
    </main>
    </>
  );
}
