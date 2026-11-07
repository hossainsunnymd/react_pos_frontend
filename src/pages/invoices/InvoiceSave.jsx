import { NavLink } from "react-router-dom";
import PanelLayout from "../../components/layouts/PanelLayout";
import { useEffect, useState, useReducer } from "react";

const initialState = {
  productForQuantity: false,
  quantity: "1",
  product: {},
  invoice: {
    customer_id: "",
    total: 0,
    discount: 0,
    vat: 0,
    payable: 0,
    products: [],
  },
  invoiceProduct: {
    product_id: "",
    sale_price: "",
    qty: "",
  },

  products: [],
};

const reducer = (state, action) => {
  if (action.type == "OPEN QTY MODAL") {
    return {
      ...state,
      product: action.payload,
      productForQuantity: true,
    };
  }

  if (action.type == "CLOSE QTY MODAL") {
    return {
      ...state,
      productForQuantity: false,
    };
  }

  if (action.type == "ADD QTY") {
    return {
      ...state,
      quantity: action.payload,
    };
  }

  if (action.type == "ADD PRODUCT") {
    const newProduct = {
      ...action.payload,
      qty: Number(state.quantity),
      total: Number(action.payload.price) * Number(state.quantity),
    };
    const data= {
      ...state,
      invoice: {
        ...state.invoice,
        products: [
          ...state.invoice.products,
          {
            product_id: action.payload.id,
            sale_price: Number(action.payload.price) * Number(action.payload.quantity),
            qty: Number(state.quantity),
          },
        ],

        total: state.invoice.products.reduce(
          (acc, item) => acc + item.sale_price,
          0,
        ),
        discount: Number(state.invoice.total) * 0.5,
        vat: Number(state.invoice.total) * 0.15,
        payable: Number(state.invoice.total) + Number(state.invoice.vat) - Number(state.invoice.discount),
      },

      products: [...state.products, newProduct],

      productForQuantity: false,
    };
    console.log(state.invoice.products);
    return data;
  }

  if (action.type == "REMOVE PRODUCT") {
    return {
      ...state,
      products: state.products.filter((item) => item.id !== action.payload),
      invoice: {
        ...state.invoice,
        products: state.invoice.products.filter(
          (item) => item.product_id !== action.payload,
        ),
        total: state.invoice.products.reduce(
          (acc, item) => acc + item.sale_price,
          0,
        ),
        discount: state.total * 0.5,
        vat: state.total * 0.15,
        payable: state.total + state.vat - state.discount,
      },
    };
  }
};

const InvoiceSave = () => {
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadingCustomers, setLoadingCustomers] = useState(true);

  useEffect(() => {
    const fetchCustomers = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch("http://localhost:8000/api/customers", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch customers");
        }

        const res = await response.json();
        if (res.status === true) {
          setCustomers(res.data.data);
        } else {
          throw new Error(res.message);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoadingCustomers(false);
      }
    };
    fetchCustomers();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch("http://localhost:8000/api/products", {
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
        if (res.status === true) {
          setProducts(res.data.data);
        } else {
          throw new Error(res.message);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoadingProducts(false);
      }
    };
    fetchProducts();
  }, []);

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <PanelLayout>
      <div className="content">
        <div className="container-fluid">
          <div className="card p-3 mb-3">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h4 className="mb-1">Create Invoice</h4>
                <p className="text-muted mb-0">
                  Choose a customer and products for this invoice.
                </p>
              </div>
              <NavLink to="/invoices" className="btn btn-outline-secondary">
                Back to Invoices
              </NavLink>
            </div>
          </div>

          <div className="card p-3 mb-3">
            <h5 className="mb-3">Invoice details</h5>
            <div className="row g-3">
              <div className="col-md-4">
                <label htmlFor="invoice-number" className="form-label">
                  Invoice number
                </label>
                <input
                  id="invoice-number"
                  className="form-control"
                  placeholder="Generated automatically"
                  readOnly
                />
              </div>
              <div className="col-md-4">
                <label htmlFor="invoice-date" className="form-label">
                  Invoice date
                </label>
                <input
                  id="invoice-date"
                  className="form-control"
                  type="date"
                  readOnly
                />
              </div>
              <div className="col-md-4">
                <label htmlFor="invoice-status" className="form-label">
                  Status
                </label>
                <input
                  id="invoice-status"
                  className="form-control"
                  value="Draft"
                  readOnly
                />
              </div>
            </div>
          </div>

          <div className="row g-3 mb-3">
            <div className="col-lg-6">
              <section className="card h-100">
                <div className="card-header bg-white d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">Products</h5>
                  <input
                    className="form-control form-control-sm w-auto"
                    placeholder="Search products"
                    aria-label="Search products"
                    readOnly
                  />
                </div>
                <div className="table-responsive">
                  <table className="table table-bordered table-hover align-middle mb-0">
                    <thead className="table-light">
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Product</th>
                        <th scope="col">Price</th>
                        <th scope="col">Stock</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {loadingProducts ? (
                        <tr>
                          <td colSpan="5">Product loading...</td>
                        </tr>
                      ) : (
                        products.map((product) => (
                          <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>{product.qty}</td>
                            <td>
                              <button
                                className="btn btn-sm btn-primary"
                                type="button"
                                onClick={() => {
                                  dispatch({
                                    type: "OPEN QTY MODAL",
                                    payload: product,
                                  });
                                }}
                              >
                                Add
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </section>
            </div>

            <div className="col-lg-6">
              <section className="card h-100">
                <div className="card-header bg-white d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">Customers</h5>
                  <input
                    className="form-control form-control-sm w-auto"
                    placeholder="Search customers"
                    aria-label="Search customers"
                    readOnly
                  />
                </div>
                <div className="table-responsive">
                  <table className="table table-bordered table-hover align-middle mb-0">
                    <thead className="table-light">
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Customer</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {loadingCustomers ? (
                        <tr>
                          <td colSpan="5">Customer loading...</td>
                        </tr>
                      ) : (
                        customers.map((customer) => (
                          <tr key={customer.id}>
                            <td>{customer.id}</td>
                            <td>{customer.name}</td>
                            <td>{customer.phone}</td>
                            <td>
                              <button className="btn btn-sm btn-primary">
                                Select
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </section>
            </div>
          </div>

          <section className="card mb-3">
            <div className="card-header bg-white">
              <h5 className="mb-0">Selected products</h5>
            </div>
            <div className="table-responsive">
              <table className="table table-bordered table-hover align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Product</th>
                    <th scope="col">Unit price</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Discount</th>
                    <th scope="col">Total</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {state.products.length > 0 ? (
                    state.products.map((product) => (
                      <tr key={product.id}>
                        <td>{product.id}</td>
                        <td>{product.name}</td>
                        <td>{product.price}</td>
                        <td>{product.qty}</td>
                        <td>{product.discount}</td>
                        <td>{product.total}</td>
                        <td>
                          <button
                            onClick={() =>
                              dispatch({
                                type: "REMOVE PRODUCT",
                                payload: product.id,
                              })
                            }
                            className="btn btn-sm btn-danger"
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7">No products selected</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="card-body">
              <div className="row justify-content-end">
                <div className="col-md-5 col-lg-4">
                  <div className="d-flex justify-content-between mb-2">
                    <span>Subtotal</span>
                    <span>{state.invoice.total}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span>Discount</span>
                    <span>{state.invoice.discount}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span>VAT</span>
                    <span>{state.invoice.vat}</span>
                  </div>
                  <div className="d-flex justify-content-between border-top pt-2 fw-bold">
                    <span>Payable</span>
                    <span>{state.invoice.payable}</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div className="d-flex justify-content-end gap-2 mb-4">
            <NavLink to="/invoices" className="btn btn-outline-secondary">
              Cancel
            </NavLink>
            <button type="button" className="btn btn-primary" disabled>
              Save Invoice
            </button>
          </div>
        </div>
      </div>
      {state.productForQuantity && (
        <>
          <div className="modal-backdrop fade show" />
          <div
            className="modal fade show d-block"
            role="dialog"
            aria-modal="true"
            aria-labelledby="product-quantity-title"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget)
                dispatch({ type: "CLOSE QTY MODAL" });
            }}
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="product-quantity-title">
                    Add product quantity
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    aria-label="Close"
                    onClick={() => dispatch({ type: "CLOSE QTY MODAL" })}
                  />
                </div>
                <div className="modal-body">
                  <p className="mb-3">
                    <strong>{state.product.name}</strong>
                    <span className="text-muted ms-2">
                      ${Number(state.product.price).toFixed(2)} each
                    </span>
                  </p>
                  <label htmlFor="product-quantity" className="form-label">
                    Quantity
                  </label>
                  <input
                    autoFocus
                    id="product-quantity"
                    className="form-control"
                    type="number"
                    min="1"
                    // max={state.product.qty}
                    step="1"
                    value={state.quantity}
                    onChange={(event) =>
                      dispatch({ type: "ADD QTY", payload: event.target.value })
                    }
                  />
                  <small className="form-text text-muted">
                    Available: {state.product.qty}
                  </small>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => dispatch({ type: "CLOSE QTY MODAL" })}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() =>
                      dispatch({ type: "ADD PRODUCT", payload: state.product })
                    }
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </PanelLayout>
  );
};

export default InvoiceSave;
