import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import PanelLayout from "../../components/layouts/PanelLayout";

const ProductSave = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [categories, setCategories] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    qty: "",
    category_id: "",
  });

  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);

  // Notifications
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

  // Handle Input
  const handleForm = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: null,
    }));
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    const getCategories = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/categories", {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }

        const res = await response.json();

        if (res.status === true) {
          setCategories(res.data.data);
        } else {
          throw new Error(res.message);
        }
      } catch (error) {
        console.error(error);
      }
    };

    getCategories();

    if (id == 0) return;

    const controller = new AbortController();

    const getExistingProduct = async () => {
      setFetching(true);

      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/products/${id}`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
            signal: controller.signal,
          },
        );

        const res = await response.json();

        if (!response.ok || res.status !== true) {
          throw new Error(res.message || "Failed to fetch product");
        }

        setFormData((prev) => ({
          ...prev,
          name: res.data.name || "",
          description: res.data.description || "",
          price: res.data.price || "",
          qty: res.data.qty || "",
          category_id: res.data.category.id || "",
        }));
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error(error);
          errorNotify(error.message);
        }
      } finally {
        if (!controller.signal.aborted) {
          setFetching(false);
        }
      }
    };

    getExistingProduct();

    return () => controller.abort();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    const apiURL =
      id != 0
        ? `http://127.0.0.1:8000/api/products/${id}`
        : "http://127.0.0.1:8000/api/products";

    const method = id != 0 ? "PUT" : "POST";

    setLoading(true);
    setErrors({});

    try {
      const response = await fetch(apiURL, {
        method,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const res = await response.json();

      if (!response.ok) {
        if (response.status === 422) {
          setErrors(res.errors || []);
          return;
        }

        throw new Error(res.message || "Something went wrong");
      }

      if (res.status === true) {
        successNotify(res.message);

        setTimeout(() => {
          navigate("/products");
        }, 1000);
      } else {
        errorNotify(res.message || "Operation failed");
      }
    } catch (error) {
      console.error(error);
      errorNotify(error.message);
    } finally {
      setLoading(false);
    }
  };

  const getError = (field) => {
    const error = errors[field];

    return Array.isArray(error) ? error[0] : error;
  };

  return (
    <PanelLayout>
      <ToastContainer />

      <div className="content">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-12">
              <div className="card w-90 p-4">
                <div className="card-body d-flex justify-content-between align-items-center">
                  <h4>{id != 0 ? "Edit Product" : "Add Product"}</h4>
                </div>

                {fetching ? (
                  <p>Loading Products...</p>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <select
                        name="category_id"
                        onChange={handleForm}
                        value={formData.category_id}
                        className="form-control"
                      >
                        <option value="">Select Category</option>

                        {categories.map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        ))}
                      </select>

                      {getError("category_id") && (
                        <div className="text-danger">
                          {getError("category_id")}
                        </div>
                      )}
                    </div>

                    <div className="mb-3">
                      <input
                        placeholder="Name"
                        className="form-control"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleForm}
                      />

                      {getError("name") && (
                        <div className="text-danger">{getError("name")}</div>
                      )}
                    </div>

                    <div className="mb-3">
                      <input
                        placeholder="description"
                        className="form-control"
                        type="text"
                        name="description"
                        value={formData.description}
                        onChange={handleForm}
                      />

                      {getError("description") && (
                        <div className="text-danger">
                          {getError("description")}
                        </div>
                      )}
                    </div>

                    <div className="mb-3">
                      <input
                        placeholder="price"
                        className="form-control"
                        type="text"
                        name="price"
                        value={formData.price}
                        onChange={handleForm}
                      />

                      {getError("price") && (
                        <div className="text-danger">{getError("price")}</div>
                      )}
                    </div>

                    <div className="mb-3">
                      <input
                        placeholder="Quantity"
                        className="form-control"
                        type="text"
                        name="qty"
                        value={formData.qty}
                        onChange={handleForm}
                      />

                      {getError("qty") && (
                        <div className="text-danger">{getError("qty")}</div>
                      )}
                    </div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="btn w-100 btn-primary"
                    >
                      {loading
                        ? "Please wait..."
                        : id != 0
                          ? "Update Product"
                          : "Add Product"}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PanelLayout>
  );
};

export default ProductSave;
