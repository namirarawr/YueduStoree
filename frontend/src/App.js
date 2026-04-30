import Products from "./pages/Products";

function App(){
  return(
    <div style={{background:"#8735ad", color:"white", minHeight:"100vh", padding: 20}}>
      <h1 style={{color:"rgb(0, 0, 0)"}}>Miwa Store</h1>
    <Products />
    </div>
  );
}

export default App;