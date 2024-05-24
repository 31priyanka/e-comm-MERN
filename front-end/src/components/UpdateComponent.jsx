import React, {useEffect } from "react";
import {useParams} from 'react-router-dom'

const UpdateProduct =()=>{
    const [name, setName]= React.useState('');
    const [price, setPrice]= React.useState('');
    const [category, setCategory]= React.useState('');
    const [company, setCompany]= React.useState('');
    const params = useParams();

    useEffect(()=>{
        console.warn(params)
    },[])

    const updateProduct= async () => {
        console.warn(name, price, category, company)

    }

    return (
        <div className="grid-center">
            <h2>Update Product</h2>
            <input type="text" placeholder="Enter Product Name" className="inputBox"
            value={name} onChange={(e)=>{setName(e.target.value)}}
            />

            <input type="text" placeholder="Enter Product Price" className="inputBox"
            value={price} onChange={(e)=>{setPrice(e.target.value)}}
            />
            
            <input type="text" placeholder="Enter Product Category" className="inputBox"
            value={category} onChange={(e)=>{setCategory(e.target.value)}}
            />
            
            <input type="text" placeholder="Enter Product Company" className="inputBox"
            value={company} onChange={(e)=>{setCompany(e.target.value)}}
            />
            
            <button onClick={updateProduct} className="appButton">Update Product</button>
        </div>
    )
}
export default UpdateProduct;