import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const SignupPage = () => {
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

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    password_confirmation: "",
  });

  const [errors, setErrors] = useState([]);

  const handleForm = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const submitForm = async (e) => {
    const token = localStorage.getItem("token");

    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:8000/api/signup", {
        method: "POST",
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
        } else {
          errorNotify(res.message);
        }

        return;
      }

      if (res.status === true) {
        successNotify(res.message);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("authUser", JSON.stringify(res.data.user));
        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      }
    } catch (err) {
      errorNotify(err.message);
    }
  };

  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-10 col-lg-10 center-screen">
            <div className="card animated fadeIn w-100 p-3">
              <div className="card-body">
                <h4>Sign Up</h4>
                <hr />
                <form onSubmit={submitForm}>
                  <div className="mb-3">
                    <label>Name</label>
                    <input
                      placeholder="Name"
                      className="form-control"
                      name="name"
                      value={formData.name}
                      onChange={handleForm}
                    />
                    {errors.name && (
                      <div className="text-danger">{errors.name}</div>
                    )}
                  </div>

                  <div className="mb-3">
                    <label>Email Address</label>
                    <input
                      placeholder="Email"
                      type="email"
                      className="form-control"
                      name="email"
                      value={formData.email}
                      onChange={handleForm}
                    />
                    {errors.email && (
                      <div className="text-danger">{errors.email}</div>
                    )}
                  </div>

                  <div className="mb-3">
                    <label>Phone</label>
                    <input
                      placeholder="Phone"
                      type="text"
                      name="phone"
                      className="form-control"
                      value={formData.phone}
                      onChange={handleForm}
                    />
                    {errors.phone && (
                      <div className="text-danger">{errors.phone}</div>
                    )}
                  </div>

                  <div className="mb-3">
                    <label>Password</label>
                    <input
                      placeholder="Password"
                      type="password"
                      name="password"
                      className="form-control"
                      value={formData.password}
                      onChange={handleForm}
                    />
                    {errors.password && (
                      <div className="text-danger">{errors.password}</div>
                    )}
                  </div>

                  <div className="mb-3">
                    <label>Confirm Password</label>
                    <input
                      placeholder="Confirm Password"
                      type="password"
                      className="form-control"
                      name="password_confirmation"
                      value={formData.password_confirmation}
                      onChange={handleForm}
                    />
                  </div>

                  <button type="submit" className="btn btn-primary w-100">
                    Sign Up
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default SignupPage;
