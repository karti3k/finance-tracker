
"use client"
import {createContext, useState, useEffect} from "react";

// Firebase
import { db } from '@/app/lib/firebase/index'
import { collection, addDoc, doc, getDocs, deleteDoc } from "firebase/firestore"

export const financeContext = createContext({
    income: [],
    addIncomeItem: async () => {},
    removeItem: async () => {},
});

export default function FinanceContextProvider({children}){
    const [income, setIncome] = useState([]);

    const addIncomeItem = async (newIncome) => {
        const collectionRef = collection(db, 'income');
        try {
            const docSnap = await addDoc(collectionRef, newIncome);
            //update state
            setIncome((prevState) => {
                return [
                    ...prevState,
                    {
                        id: docSnap.id,
                        ...newIncome,
                    },
                ];
            })

        } catch (error) {
            console.log(error.message);
            throw error;
        }
    };
    const removeIncomeItem = async (incomeId) => {
        const docRef = doc(db, "income", incomeId);
        try {
            await deleteDoc(docRef);
            setIncome((prevState) => {
                return prevState.filter((i) => i.id !== incomeId);
            })

        } catch (error) {
            console.log(error.message);
            throw error;
        }
    };

    const values = {income, addIncomeItem, removeIncomeItem};

    useEffect(() => {
        const getIncomeData = async () => {
            const collectionRef = collection(db, 'income');
            const docSnap = await getDocs(collectionRef);

            const data = docSnap.docs.map(doc => {
                return {
                    id: doc.id,
                    ...doc.data(),
                    createdAt: new Date(doc.data().createdAt.toMillis())
                }
            })
            setIncome(data);
        }
        getIncomeData();
    }, [])

    return <financeContext.Provider value={values}>
        {children}
    </financeContext.Provider>
}