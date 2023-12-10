import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  TextField,
} from "@mui/material";
import { MapTableData } from "./mapper";
import { TableDetails } from "./react-queries";
import { useEffect, useState } from "react";
import { IMainData } from "./types";

export const Alippo = () => {
  const { data: tableData } = TableDetails();
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [columnValue, setColumnValue] = useState("");
  const [rowValue, setRowValue] = useState<any>([]);
  const [tableDetails, setTableDetails] = useState<IMainData[]>([]);

  useEffect(() => {
    const mappedData = MapTableData(tableData);
    setTableDetails(mappedData);
  }, [tableData]);

  const handleEdit = (data: IMainData) => {
    setRowValue(data);
    setOpen(true);
    setColumnValue(data.name);
    console.log(data);
  };

  const handleDelete = (data: IMainData) => {
    setRowValue(data);
    setOpenDelete(true);
    console.log(data);
  };

  const handleClose = () => {
    setOpen(false);
    setOpenDelete(false);
  };

  const handleColumnChange = (event: any) => {
    setColumnValue(event.target.value);
    console.log("edit", event);
  };

  const handleConfrimSubmit = () => {
    const deletedData = tableDetails.filter(
      (data) => data.name !== rowValue.name
    );
    setTableDetails(deletedData);
    setOpenDelete(false);
  };

  const handleEditSubmit = () => {
    const updatedData = tableDetails.map((item) => {
      if (item.name === rowValue.name) {
        console.log(item, { ...item, name: columnValue });
        return { ...item, name: columnValue };
      }
      return item;
    });
    setTableDetails(updatedData);
    setOpen(false);
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "50px" }}>
      <table
        style={{
          borderCollapse: "collapse",
          width: "90%",
          borderRadius: "100px",
        }}
      >
        <thead>
          <tr style={{ borderBottom: "1px solid black" }}>
            <th style={{ border: "1px solid black", padding: "8px" }}>SL.NO</th>
            <th style={{ border: "1px solid black", padding: "8px" }}>
              Column1
            </th>
            <th style={{ border: "1px solid black", padding: "8px" }}>
              Column2
            </th>
            <th style={{ border: "1px solid black", padding: "8px" }}>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {tableDetails.map((row: any) => (
            <tr key={row.id} style={{ borderBottom: "1px solid black" }}>
              <td style={{ border: "1px solid black", padding: "8px" }}>
                {row.SLNO}
              </td>
              <td style={{ border: "1px solid black", padding: "8px" }}>
                {row.name}
              </td>
              <td style={{ border: "1px solid black", padding: "8px" }}>
                {row.age}
              </td>
              <td style={{ border: "1px solid black", padding: "8px" }}>
                <button onClick={() => handleEdit(row)}>Edit</button>
                <button onClick={() => handleDelete(row)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alippo-edit"
          aria-describedby="alippo-edit"
        >
          <DialogTitle id="alippo-edit">
            Edit Column1 {rowValue.name}
          </DialogTitle>
          <div style={{ padding: "20px", width: "70vh" }}>
            <TextField
              autoFocus
              margin="dense"
              id="Column"
              type="text"
              fullWidth
              variant="standard"
              value={columnValue}
              onChange={handleColumnChange}
            />
          </div>

          <DialogActions>
            <Button onClick={handleEditSubmit}>Edit</Button>
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>
        </Dialog>
      </div>
      <div>
        <Dialog
          open={openDelete}
          onClose={handleClose}
          aria-labelledby="alippo-delete"
          aria-describedby="alippo-delete"
        >
          <DialogTitle
            id="alippo-delete"
            sx={{ padding: "20px", width: "70vh" }}
          >
            Delete SLNO :-{rowValue.SLNO}
          </DialogTitle>
          <DialogActions>
            <Button onClick={handleConfrimSubmit}>Confrim</Button>
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};
