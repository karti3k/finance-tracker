"use client";
import { currencyFormatter } from "@/app/lib/utils";
import ExpenseCategoryItem from "@/app/components/ExpenseCategoryItem";
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from "chart.js";
import {Doughnut} from "react-chartjs-2";
import { useState, useRef, useEffect} from "react";
import Modal from "@/app/components/Modal";

// Firebase
import {db} from '@/app/lib/firebase/index'
import {collection, addDoc, doc, getDocs, deleteDoc} from "firebase/firestore"

// icons
import { FaRegTrashAlt } from "react-icons/fa";

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
  const [income, setIncome] = useState([]);
  // console.log(income);
  const [showAddIncome, setShowAddIncome] = useState(false);
  const amountRef = useRef();
  const descriptionRef = useRef();

  //Handler function
  const addIncomeHandler = async(e) => {
    e.preventDefault();

    // the values we need to sumbit to the firestore
    const newIncome = {
      amount: amountRef.current.value,
      description: descriptionRef.current.value,
      createdAt: new Date(),
    };

    const collectionRef = collection(db, 'income');
    try{
      const docSnap = await addDoc(collectionRef, newIncome);
      //update state
      setIncome((prevState)=> {
        return [
        ...prevState,
        {
          id: docSnap.id,
          ...newIncome,
        },
      ];
      })
      
      descriptionRef.current.value="";
      amountRef.current.value="";
    }catch (error){
      console.log(error.message);
    }
    
  }

  const deleteIncomeEntryHandler = async (incomeId) => {
    const docRef = doc(db, "income", incomeId);
    try{
      await deleteDoc(docRef);
      setIncome((prevState)=> {
        return prevState.filter((i)=> i.id !== incomeId);
      })

    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    const getIncomeData = async () => {
      const collectionRef = collection(db, 'income');
      const docSnap = await getDocs(collectionRef);
      
      const data = docSnap.docs.map(doc => {
        return{
          id: doc.id,
          ...doc.data(),
          createdAt: new Date(doc.data().createdAt.toMillis())
        }
      })
      setIncome(data);
    }
    getIncomeData();
  }, [])
  return (
    <>
    {/* Add Income Modal */}
    <Modal show={showAddIncome} onClose={setShowAddIncome}>
      <form onSubmit={addIncomeHandler} className="input-group">
        <div className="input-group">
        <label htmlFor="amount">Income Amount</label>
        <input name="amount" ref={amountRef} type="number" min={0.01} step={0.01} placeholder="Enter income amount" required></input>
        </div>

        <div className="input-group">
        <label htmlFor="description">Description</label>
        <input name="description" ref={descriptionRef} type="text" placeholder="Enter income description" required></input>
        </div>

        <button type="submit" className="btn btn-primary">Add Entry</button>
      </form>

      <div className="flex flex-col gap-4 mt-6">
        <h3 className="text-2xl font-bold">Income History</h3>
        {/* Now let's loop through income entries */}

        {income.map((i)=> {
          return (
            <div className="flex justify-between items-center" key={i.id}>
              <div>
                <p className="font-semibold">{i.description}</p>
                <small className="text-xs">{i.createdAt.toISOString()}</small>
              </div>
              <p className="flex items-center gap-2">{currencyFormatter(i.amount)} 
              <button onClick={()=>{deleteIncomeEntryHandler(i.id)}}>
              <FaRegTrashAlt />
              </button>
              </p>
            </div>
          )
        })}
      </div>
    </Modal>
       
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
