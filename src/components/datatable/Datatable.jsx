import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
// import { userColumns } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const userColumns = [
  { field: "_id", headerName: "ID", width: 250 },
  {
    field: "name",
    headerName: "Name",
    width: 230,
    renderCell: (params) => {
      return <div className="cellWithImg">{params.row.name}</div>;
    },
  },
  {
    field: "email",
    headerName: "Email",
    width: 230,
  },
  {
    field: "phoneNumber",
    headerName: "Phone Number",
    width: 230,
  },
];

const Datatable = () => {
  const [data, setData] = useState([]);
  const getUsers = async () => {
    try {
      const status = await axios.get(`${process.env.REACT_APP_API}api/user`);
      if (status.status === 200) {
        setData(status.data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getUsers();
  }, []);
  const deleteUser = async (id) => {
    try {
      const status = await axios.delete(
        `${process.env.REACT_APP_API}api/user/${id}`
      );
      if (status.status === 200) {
        toast.success("User removed successfully!");
        getUsers();
      }
    } catch (err) {
      toast.error("Error deleting user");
    }
  };
  // console.log(JSON.parse(localStorage.getItem("user")).id);
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            {JSON.parse(localStorage.getItem("user")).id != params.row._id ? (
              <div
                className="deleteButton"
                onClick={() => deleteUser(params.row._id)}
              >
                Delete
              </div>
            ) : (
              <div className="loggedIn">Logged IN</div>
            )}
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Active Users
        <Link to="/users/new" className="link">
          Add New User
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={userColumns.concat(actionColumn)}
        pageSize={10}
        rowsPerPageOptions={[10]}
        getRowId={(row) => row._id}
        // checkboxSelection
      />
    </div>
  );
};

export default Datatable;
