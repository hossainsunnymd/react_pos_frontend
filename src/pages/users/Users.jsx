import { useEffect,useState } from "react";
import PanelLayout from "../../components/layouts/PanelLayout";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
        const token = localStorage.getItem('token');
      try {
        const response = await fetch("http://127.0.0.1:8000/api/users",{
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

        if (res.status === true) {
          setUsers(res.data.data);
          setLoading(false);
        } else {
          throw new Error(res.message);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <PanelLayout>
      <div className="content">
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-md-12">
              <div className="card p-3">
                <div className="d-flex justify-content-between align-items-center">
                  <h4>Users</h4>

                  <button className="btn btn-sm btn-dark">Add User</button>
                </div>
              </div>

              <div className="card mt-3">
                <div className="table-responsive">
                  <table className="table table-bordered table-hover align-middle mb-0">
                    <thead className="table-light">
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Action</th>
                      </tr>
                    </thead>

                    <tbody>
                {users.length > 0 ? (
                  users.map((user) => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.phone}</td>
                      <td>
                        <button className="btn btn-sm btn-primary me-1">
                          Edit
                        </button>

                        <button
                          className="btn btn-sm btn-danger"
                        //   onClick={() => handleDelete(user.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center py-3">
                      {loading === true ? "Loading...": "No users found"}
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

export default Users;
