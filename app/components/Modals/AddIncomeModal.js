import { useRef, useEffect, useContext } from 'react'
import { currencyFormatter } from "@/app/lib/utils";
import Modal from "@/app/components/Modal";
import { financeContext } from '@/app/lib/store/finance-context';

// icons
import { FaRegTrashAlt } from "react-icons/fa";

function AddIncomeModal({ show, onClose }) {

    const amountRef = useRef();
    const descriptionRef = useRef();
    const {income, addIncomeItem, removeIncomeItem} = useContext(financeContext);
    //Handler function
    const addIncomeHandler = async (e) => {
        e.preventDefault();

        // the values we need to sumbit to the firestore
        const newIncome = {
            amount: amountRef.current.value,
            description: descriptionRef.current.value,
            createdAt: new Date(),
        };

        try {await addIncomeItem(newIncome);
            descriptionRef.current.value = "";
        amountRef.current.value = "";
        } catch(error){console.log(error.message);} 
        
    }

    const deleteIncomeEntryHandler = async (incomeId) => {
        try{
            await removeIncomeItem(incomeId);
        }catch(error){
            console.log(error.message);
        }
    }

    return (
        <Modal show={show} onClose={onClose}>
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

                {income.map((i) => {
                    return (
                        <div className="flex justify-between items-center" key={i.id}>
                            <div>
                                <p className="font-semibold">{i.description}</p>
                                <small className="text-xs">{i.createdAt.toISOString()}</small>
                            </div>
                            <p className="flex items-center gap-2">{currencyFormatter(i.amount)}
                                <button onClick={() => { deleteIncomeEntryHandler(i.id) }}>
                                    <FaRegTrashAlt />
                                </button>
                            </p>
                        </div>
                    )
                })}
            </div>
        </Modal>
    )
}

export default AddIncomeModal;