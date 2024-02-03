import React, { useEffect, useRef, useState } from 'react'
import { useCart, useDispatchCart } from './ContextReducer';


export default function Card(props) {

    const priceRef =useRef();
    let dispatch = useDispatchCart();
    let data = useCart()
    let options = props.options;
    let priceOptions = options ? Object.keys(options):[];

    const [qty, setQty] = useState(1)
    const [size, setSize] = useState("")
    
    const handleAddToCart = async()=>{
        try{
            let food = [];
            for(const item of data){
                if(item.id === props.foodItem._id){
                    food = item;
                    break;
                }          
            }

            if(food !== 0){
                if(food.size === size){
                    await dispatch({type: "UPDATE", id: props.foodItem._id, price: finalPrice, qty: qty})
                    return
                }
                else if(food.size !== size){
                    await dispatch({
                        type: "ADD", 
                        id: props.foodItem._id, 
                        name: props.foodItem.name, 
                        price: finalPrice,
                        qty: qty,
                        size: size
                    });
                    // console.log(data);
                    return
                }
                return
            }
            
            await dispatch({
                type: "ADD", 
                id: props.foodItem._id, 
                name: props.foodItem.name, 
                price: finalPrice,
                qty: qty,
                size: size
            });
        }
        catch (error) {
            console.log(error);
        }
    }

    let finalPrice = qty * parseInt(options[size]);
    useEffect(()=>{
        setSize(priceRef.current.value)
    },[]);

    return (
        <div>

            <div className="card mt-3" style={{ "width": "18rem", "maxHeight": "360px" }}>
                <img style={{height: "140px", objectFit: "fill"}} src={props.foodItem.img} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title"> {props.foodItem.name} </h5>
                    <p className="card-text">This is some Important text</p>
                    <div className='container w-100'>

                        <select className='m-2 h-100 bg-success' onChange={(e)=>setQty(e.target.value)}>
                            {Array.from(Array(6), (e, i) => {
                                return (
                                    <option key={i + 1} value={i + 1}> {i + 1} </option>
                                )
                            })}
                        </select>
                        <select className='m-2 h-100 bg-success rounded' ref={priceRef} onChange={(e)=>setSize(e.target.value)}>
                            {priceOptions.map((data)=>{
                                return <option key={data} value={data}> {data} </option>
                            })}
                        </select>

                        <div className='d-inline h-100 '>
                            ₹{finalPrice}/-
                        </div>

                    </div>
                    <hr/>

                    <button className='btn btn-success justify-center ms-2' onClick={handleAddToCart}> Add to Cart </button>

                </div>
            </div>

        </div>
    )
}
