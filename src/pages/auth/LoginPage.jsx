import { NavLink,useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useState } from "react";

const LoginPage = () => {

  const navigate = useNavigate();
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

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleFormInput = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const submitForm = async (e) => {

    e.preventDefault();
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
          setErrors(res.errors || []);
          return;
        } else {
          throw new Error(res.message);
        }
      }

      if (res.status === true) {
        successNotify(res.message);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("authUser", JSON.stringify(res.data.user));
        setTimeout(() => {
          navigate("/dashboard");
        },1000)
      } else {
        errorNotify(res.message);
      }
    } catch (err) {
      console.error(err);
      errorNotify(err);
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
      <ToastContainer />
    </div>
  );
};

export default LoginPage;
