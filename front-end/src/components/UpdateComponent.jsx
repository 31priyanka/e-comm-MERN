import React, { useEffect,useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UpdateProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] =useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getProductDetails();
  }, []);

  const getProductDetails = async () => {
    console.log(params);
    let result = await fetch(`http://localhost:9099/product/${params.id}`);
    result = await result.json();
    console.warn(result)
    setName(result.name);
    setPrice(result.price);
    setCategory(result.category);
    setCompany(result.name);
  };

  const updateProduct = async () => {
    console.warn(name, price, category, company)
    let result = await fetch(`http://localhost:9099/product/${params.id}`,{
      method:'Put',
      body: JSON.stringify({name, price, category, company}),
      headers:{
        'content-Type':"application/json"
      }
    });
    result = await result.json()
    console.warn(result)
    navigate('/');
  };

  return (
    <div className="grid-center">
      <h2>Update Product</h2>
      <input
        type="text"
        placeholder="Enter Product Name"
        className="inputBox"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />

      <input
        type="text"
        placeholder="Enter Product Price"
        className="inputBox"
        value={price}
        onChange={(e) => {
          setPrice(e.target.value);
        }}
      />

      <input
        type="text"
        placeholder="Enter Product Category"
        className="inputBox"
        value={category}
        onChange={(e) => {
          setCategory(e.target.value);
        }}
      />

      <input
        type="text"
        placeholder="Enter Product Company"
        className="inputBox"
        value={company}
        onChange={(e) => {
          setCompany(e.target.value);
        }}
      />

      <button onClick={updateProduct} className="appButton">
        Update Product
      </button>
    </div>
  );
};
export default UpdateProduct;
