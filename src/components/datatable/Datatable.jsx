import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
import axios from "axios";

const Datatable = () => {
  const [data, setData] = useState([]);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };
  useEffect(()=>{
    const getUsers=async()=>{
      try{
        const  status=await axios.get(`${process.env.REACT_APP_API}/user`);
        if(status.status===200)
          {
            console.log(status);
            // setData(status.data)
          }
      }
      catch(err)
      {
        console.log(err);
      }
    }
    getUsers();
    console.log(data);
  })

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to="/users/test" style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div>
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
        checkboxSelection
      />
    </div>
  );
};

export default Datatable;
