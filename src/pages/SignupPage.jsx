const SignupPage = () => {
  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-10 col-lg-10 center-screen">
            <div className="card animated fadeIn w-100 p-3">
              <div className="card-body">
                <h4>Sign Up</h4>
                <hr />
                <form>
                  <div className="mb-3">
                    <label>Name</label>
                    <input
                      v-model="name"
                      placeholder="First Name"
                      className="form-control"
                    />
                    <div className="text-danger">Dynamic</div>
                  </div>

                  <div className="mb-3">
                    <label>Email Address</label>
                    <input
                      v-model="email"
                      placeholder="User Email"
                      type="email"
                      className="form-control"
                    />
                    <div className="text-danger">Dynamic</div>
                  </div>

                  <div className="mb-3">
                    <label>Password</label>
                    <input
                      v-model="password"
                      placeholder="User Password"
                      type="password"
                      className="form-control"
                    />
                    <div className="text-danger">Dynamic</div>
                  </div>

                  <div className="mb-3">
                    <label>Confirm Password</label>
                    <input
                      v-model="password_confirm"
                      placeholder="Confirm Password"
                      type="password"
                      className="form-control"
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
    </>
  );
};

export default SignupPage;
