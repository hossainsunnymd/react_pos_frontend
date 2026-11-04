import { NavLink } from "react-router-dom";
import { useState } from "react";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [error, setError] = useState("");

  const handleFormInput = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));

    setError("");
  };

  const submitForm = async (e) => {
    e.preventDefault();

    setErrors({});
    setError("");

    try {
      const response = await fetch("http://127.0.0.1:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      const res = await response.json();

      if (!response.ok) {
        if (response.status === 422) {
          setErrors(res.errors || {});
        } else {
          setError(res.message || "Something went wrong!");
        }

        return;
      }

      if (res.status === true) {
        console.log("Login successful", res.data);
      } else {
        setError(res.message || "Login failed");
      }
    } catch (err) {
      console.error(err);
      setError("Server connection failed!");
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-7 col-lg-6 center-screen">
          <div className="card w-90 p-4">
            <div className="card-body">
              <form onSubmit={submitForm}>
                <h4>SIGN IN</h4>
                <br />

                <input
                  placeholder="User Email"
                  className="form-control"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleFormInput}
                />

                {errors.email && (
                  <span className="text-danger">{errors.email[0]}</span>
                )}

                <br />

                <input
                  placeholder="User Password"
                  className="form-control"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleFormInput}
                />

                {errors.password && (
                  <span className="text-danger">{errors.password[0]}</span>
                )}

                <br />

                {error && <div className="alert alert-danger">{error}</div>}

                <button className="btn w-100 btn-primary">Login</button>
              </form>

              <hr />

              <div className="float-end mt-3">
                <NavLink to="/signup">Sign up</NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
