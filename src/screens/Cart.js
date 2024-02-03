import React from 'react'
import { useCart, useDispatchCart } from '../components/ContextReducer'
import trash from "../trash.svg"


export default function Cart() {

    let data = useCart();
    let dispatch = useDispatchCart();
    if (data.length === 0) {
        return (
            <div>
                <div className='m-5 w-100 text-center fs-4'>The Cart is Empty !</div>
            </div>
        )
    }

    const handleCheckOut = async () => {
        try {
            let userEmail = localStorage.getItem('userEmail');
            let responce = await fetch("http://localhost:5001/api/orderData", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    order_data: data,
                    email: userEmail,
                    order_date: new Date().toDateString()
                })
            })
            console.log("Order ", responce)
            if(responce.status === 200){
                dispatch({type: "DROP"})
            }

        } catch (error) {

        }
    }

    let totalPrice = data.reduce((total, food) => total + food.price, 0);

    return (
        <div>
            <div className='container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md'>
                <table className='table table-hover'>
                    <thead className='text-success fs-5'>
                        <tr>
                            <th scope='col'>#</th>
                            <th scope='col'>Name</th>
                            <th scope='col'>Quantity</th>
                            <th scope='col'>Option</th>
                            <th scope='col'>Amount</th>
                            <th scope='col'> </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((food, index) => (
                            <tr>
                                <th scope='row'> {index + 1} </th>
                                <td> {food.name} </td>
                                <td> {food.qty} </td>
                                <td> {food.size} </td>
                                <td> {food.price} </td>
                                <td>
                                    <button type='button' className='btn p-0'>
                                        <img src={trash} style={{ height: "25px" }} alt='delete' onClick={() => { dispatch({ type: "REMOVE", index: index }) }} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div>
                    <h1 className='fs-2'>Total Price : {totalPrice}</h1>
                </div>
                <div>
                    <button className='btn bg-success mt-5' onClick={handleCheckOut}> Check Out </button>
                </div>
            </div>
        </div>
    )
}
