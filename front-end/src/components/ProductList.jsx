import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    let result = await fetch("http://localhost:9099/products");
    result = await result.json();
    setProducts(result);
  };

  const deleteProduct = async (id) => {
    let result = await fetch(`http://localhost:9099/product/${id}`, {
      method: "Delete",
    });
    result = await result.json();
    if (result) {
      getProducts();
    }
  };

  const searchHandle = async (event) => {
    console.warn(event.target.value)
    let key = event.target.value;
    if (key) {
      let result = await fetch(`http://localhost:9099/search/${key}`);
      result = await result.json();
      if (result) {
        setProducts(result);
      }
    }else{
      getProducts()
    }
  };

  return (
    <div className="product-list">
      <h2>Product List</h2>
      <input
        type="text"
        className="search-product-box"
        placeholder="Search Product"
        onChange={searchHandle}
      />
      <ul>
        <li>
          <b>S. No</b>
        </li>
        <li>
          <b>Name</b>
        </li>
        <li>
          <b>Price</b>
        </li>
        <li>
          <b>Category</b>
        </li>
        <li>
          <b>Company</b>
        </li>
        <li>
          <b>Operation</b>
        </li>
      </ul>
      {
      products.length>0 ? products.map((item, index) => 
        <ul key={item._id}>
          <li>{index + 1}</li>
          <li>{item.name}</li>
          <li>$ {item.price}</li>
          <li>{item.category}</li>
          <li>{item.company}</li>
          <li>
            <button onClick={() => deleteProduct(item._id)}>Delete</button>
            <Link to={"/update/" + item._id}>Update</Link>
          </li>
        </ul>
      )
      : <h3>No Result Found</h3>
    }
    </div>
  );
};

export default ProductList;
