import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import PanelLayout from "../../components/layouts/PanelLayout";


const Products = () => {
  const [products, setProducts] = useState([]);
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
    const fetchCategories = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch("http://127.0.0.1:8000/api/products", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const res = await response.json();

       console.log(res);

        if (res.status === true) {
          setProducts(res.data.data);
          setLoading(false);
        } else {
          throw new Error(res.message);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategories();
  }, []);

  const handleDelete = async (id) => {
    if (confirm("Are you sure to delete this product?")) {
      const token = localStorage.getItem("token");

      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/products/${id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          },
        );
        const res = await response.json();
        if (!response.ok) {
          throw new Error(res.message);
        }

        if (res.status == true) {
          successNotify(res.message);
          setProducts((prevProducts) =>
            prevProducts.filter((product) => product.id !== id),
          );
        } else {
          throw new Error(res.message);
        }
      } catch (err) {
        errorNotify(err.message);
        console.error(err.message);
      }
    }
  };

  return (
    <PanelLayout>
      <ToastContainer />
      <div className="content">
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-md-12">
              <div className="card p-3">
                <div className="d-flex justify-content-between align-items-center">
                  <h4>Products</h4>

                  <NavLink
                    to={`/products/${0}`}
                    className="btn btn-sm btn-dark"
                  >
                    Add Product
                  </NavLink>
                </div>
              </div>

              <div className="card mt-3">
                <div className="table-responsive">
                  <table className="table table-bordered table-hover align-middle mb-0">
                    <thead className="table-light">
                      <tr>
                        <th>ID</th>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Qty</th>
                        <th>Action</th>
                      </tr>
                    </thead>

                    <tbody>
                      {products.length > 0 ? (
                        products.map((product) => (
                          <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.image && (<img src={product.image}  style={{width: "50px", height: "50px"}} alt="img"/>)}</td>
                            <td>{product.name}</td>
                            <td>{product.category.name}</td>
                            <td>{product.description}</td>
                            <td>{product.price}</td>
                            <td>{product.qty}</td>
                            <td>
                              <NavLink
                                to={`/products/${product.id}`}
                                className="btn btn-sm btn-primary me-1"
                              >
                                Edit
                              </NavLink>

                              <button
                                className="btn btn-sm btn-danger"
                                onClick={() => handleDelete(product.id)}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="7" className="text-center py-3">
                            {loading === true
                              ? "Loading..."
                              : "No products found"}
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

export default Products;
