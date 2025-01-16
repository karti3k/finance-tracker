import { currencyFormatter } from "@/app/lib/utils";
import ExpenseCategoryItem from "@/app/components/ExpenseCategoryItem";

const DUMMY_DATA = [
  {
    id: 1,
    title: "Entertainment",
    color: '#000',
    amount: 500
  },
  {
    id: 2,
    title: "Shopping",
    color: '#fff',
    amount: 2000
  },
  {
    id: 3,
    title: "Fuel",
    color: '#f4f',
    amount: 200
  }
];
export default function Home() {
  return (
    <main className="max-w-5xl px-6 mx-auto">
      <section className="py-3">
      <small className="text-gray-400 text-md">My Balance</small>
      <h2 className="text-4xl font-bold">{currencyFormatter(100000)}</h2>
      </section>

      <section className="flex items-center gap-2 py-3">
        <button className="btn btn-primary">+Expenses</button>
        <button className="btn btn-primary-outline">+Income</button>
      </section>

      {/* Expenses */}
      <section className="py-6">
        <h3 className="text-2xl">My Expenses</h3>
        <div className="flex flex-col gap-4 mt-6">
          {/* Expense Items */}
          {DUMMY_DATA.map(expense => {
            return(
              <ExpenseCategoryItem color={expense.color} title={expense.title} amount={expense.amount}></ExpenseCategoryItem>
            );
          })}
        </div>
      </section>
    </main>
  );
}
