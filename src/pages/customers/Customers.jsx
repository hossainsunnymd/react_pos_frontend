import { useEffect,useState } from "react";
import { NavLink } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import PanelLayout from "../../components/layouts/PanelLayout";

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  const successNotify = (msg) => {
    toast.success(msg, {
      closeButton: true,
      className: "border border-green-500 rounded-lg",
    });
  };

  const errorNotify = (msg) => {
    toast.error(msg, {
      closeButton: true,
      className: "border border-red-500 rounded-lg",
    });
  };


  useEffect(() => {
    const fetchCustomers = async () => {
        const token = localStorage.getItem('token');
      try {
        const response = await fetch("http://127.0.0.1:8000/api/customers",{
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }

        const res = await response.json();
        console.log(res);
        if (res.status === true) {
          setCustomers(res.data.data);
          setLoading(false);
        } else {
          throw new Error(res.message);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchCustomers();
  }, []);

  const handleDelete=async (id)=>{
    if(confirm('Are you sure to delete this customer?')){
      const token =localStorage.getItem('token');

      try{
        const response =await fetch(`http://127.0.0.1:8000/api/customers/${id}`,{
          method:"DELETE",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const res=await response.json();
        if(!response.ok){
          throw new Error(res.message);
        }

        if(res.status==true){
          successNotify(res.message);
            setCustomers((prevCustomers) => prevCustomers.filter((customer) => customer.id !== id));
        }else{
          throw new Error(res.message);

        }

      }catch(err){
        errorNotify(err.message);
        console.error(err.message);
      }

    }
  }

  return (
    <PanelLayout>
      <ToastContainer />
      <div className="content">
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-md-12">
              <div className="card p-3">
                <div className="d-flex justify-content-between align-items-center">
                  <h4>Customers</h4>

                  <NavLink to={`/customers/${0}`} className="btn btn-sm btn-dark">Add Customer</NavLink>
                </div>
              </div>

              <div className="card mt-3">
                <div className="table-responsive">
                  <table className="table table-bordered table-hover align-middle mb-0">
                    <thead className="table-light">
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Address</th>
                        <th>Action</th>
                      </tr>
                    </thead>

                    <tbody>
                {customers.length > 0 ? (
                  customers.map((customer) => (
                    <tr key={customer.id}>
                      <td>{customer.id}</td>
                      <td>{customer.name}</td>
                      <td>{customer.phone}</td>
                      <td>{customer.address}</td>
                      <td>
                        <NavLink to={`/customers/${customer.id}`} className="btn btn-sm btn-primary me-1">
                          Edit
                        </NavLink>

                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => handleDelete(customer.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center py-3">
                      {loading === true ? "Loading...": "No customers found"}
                    </td>
                  </tr>
                )}
              </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PanelLayout>
  );
};

export default Customers;
