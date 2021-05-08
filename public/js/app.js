const App = () => {
  const [products, setproducts] = React.useState([]);
  const [form, setForm] = React.useState({
    name: "",
    price: "",
  });
  
  React.useEffect(() => {
    fetchproducts();
  }, []); // 2nd param jab empty array den to iss useEffect funct  aik baar call hoga
  function fetchproducts() {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        console.log("data:", data);
        setproducts(data);
        //if data is priduct list ,SET PRODUCT
      });
  }

  function handlesubmit(e) {
    e.preventDefault();                             // it is used to prevent the form from autosubmitting like when reload the page it wont submit
    if (!form.name || !form.price) {
      return;
    }                                            // this checks this if these fields are empty or not
  
    // now calling fetch to submit this data
    fetch("/api/products", {
      method: 'POST',
      headers: { "content-type": "application/json" },
      body: JSON.stringify(form)
    })                                        // 1st param is the endpoint where we want to send data
    .then((res) => res.json())
    .then(data => {
      fetchproducts();
      setForm({ name: '', price: '' });
      })//this is for emptying the input 
  }

  function updateform(event, field) {
    setForm({
      ...form,
      [field]: event.target.value,
    });
  }

  function deleteProd(productId) {
    fetch(`/api/products/${productId}`, {
      method: 'DELETE' // PUT , PATCH
  }).then((res) => res.json())
    .then((data) => {
      fetchproducts();
      console.log(data)
  });
  }
  return (
    <>
      <div className="card">
        <div className="card-header">Add a product</div>
        <div className="card-body">
          <form onClick={handlesubmit}>
            <input
              type="text"
              value={form.name}
              onChange={() => updateform(event, "name")} // here the 1st param is the event 'e' and the 2nd is event name
              placeholder="enter product name .."
              className="form-control mt-3"
            />
            <input
              type="text"
              value={form.price}
              onChange={() => updateform(event, "price")} // here the 1st param is the event 'e' and the 2nd is event name
              placeholder="enter product price .."
              className="form-control mt-3"
            />
            <button type="submit" className="btn btn-primary mt-3">
              submit !
            </button>
          </form>
        </div>
      </div>
      <div className="list-group">
        <ul className="list-group-item">
          {products.map((products) => (
            <li
              className="list-group-item d-flex justify-content-between align-items-center "
              key={products.id}
            >
              <div>
                <strong>{products.name}: </strong>${products.price}
              </div>
              <button className="btn-secondary ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  onClick={()=> deleteProd(products.id)}
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-trash-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                </svg>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
