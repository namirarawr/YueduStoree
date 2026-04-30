import { useEffect, useState } from "react";
import axios from "axios";

function Products(){
 const[Products, setProducts] = useState([]);
 const[cart, setCart] = useState([]);
 const[form, setForm] = useState({
  name: "",
  price:"",
  stock: ""
});

// GET PRODUCT
const fetchProducts = () =>{
 axios.get("http://localhost:5000/products")
  .then(res => setProducts(res.data));
};

useEffect(() => {
 fetchProducts();
},[]);

// ADD PRODUCT
const addProduct = () => {
 axios.post("http://localhost:5000/products", form)
  .then(() => {
   fetchProducts();
   setForm({name:"", price:"", stock:""});
  });
};

//CART
const addToCart = (product) => {
 setCart([...cart, product]);
};
const removefromCart = (index) => {
 setCart(cart.filter((_,i) => i !== index));
};

const total = cart.reduce((sum, item) => sum + item.price,0);

return(
 <div>
   {/* {PRODUCT LIST} */}
   <h2>Products MiwaStore</h2>
   {Products.map(p =>(
    <div key={p.id} style={{border:"1px solid #333", margin: 10, padding:10}}>
      <h3>Products : {p.name}</h3>
      <p>Rp. {p.price}</p>
      <p>Stock : {p.stock}</p>

      <button 
        onClick={() => addToCart(p)}
        style={{background: "#b42cdd", color:"white", padding: 5}}
      >
       Add to Cart
      </button>
    </div>
   ))}
    {/*ADD PRODUCT*/}
    <h2>Add Product</h2>

    <input placeholder="Name" value={form.name} 
    onChange={(e) => setForm({...form, name: e.target.value})}/>

    <input placeholder="Price" value={form.price} 
    onChange={(e) => setForm({...form, price: e.target.value})}/>

    <input placeholder="Stock" value={form.stock} 
    onChange={(e) => setForm({...form, stock: e.target.value})}/>

    <button onClick={addProduct}>Add Product</button>

    {/*CART*/}
    <h2>Cart</h2>
    {cart.map((item, index)=>(
      <div key={index}>
        <p>{item.name} - Rp {item.price}</p>
        <button onClick={() => removefromCart(index)}>Remove</button>
      </div>
    ))}
    <h3>Total : Rp {total}</h3>
 </div>
);

}

export default Products;