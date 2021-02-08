import React from "react";
import {
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  // Chip
} from "@material-ui/core";
import useStyles from "./styles";
import classnames from "classnames";
import { Edit as EditIcon, Delete as DeleteIcon, Pageview as ViewIcon } from "@material-ui/icons";

// const states = {
//   sent: "success",
//   pending: "warning",
//   declined: "secondary",
// };

export default function ClientsTable({ data, handleView, handleEdit, handleDelete }) {
  const classes = useStyles();
  console.log("data object is ", data)

  return (
    <div>
      {data.length !== 0 ? (
        <div>
          <Table className="mb-0">
            <TableHead>
              <TableRow>
                <TableCell >Inst. Name</TableCell>
                <TableCell >City</TableCell>
                <TableCell >Country</TableCell>
                <TableCell >Size</TableCell>
                <TableCell >Url</TableCell>
                <TableCell >Status</TableCell>
                <TableCell ></TableCell>

              </TableRow>
            </TableHead>
            <TableBody>
              {data.map(({ id, institution_name,
                institution_url,
                institution_city,
                institution_country,
                institution_size,
                status,
                start_date, }) => (
                  <TableRow key={id} hover>
                    <TableCell className="pl-3 fw-normal">{institution_name} </TableCell>
                    <TableCell>{institution_city}</TableCell>
                    <TableCell>{institution_country}</TableCell>
                    <TableCell>{institution_size}</TableCell>
                    <TableCell>{institution_url}</TableCell>
                    <TableCell>{status}</TableCell>
                    <TableCell>
                      <div className={classnames(classes.user_actions)}>
                        <div className={classnames(classes.user_actions_buttons)} ><ViewIcon /> </div>
                        <div className={classnames(classes.user_actions_buttons)} onClick={() => handleEdit(id)}><EditIcon /> </div>
                        <div className={classnames(classes.user_actions_buttons_delete)} onClick={() => handleDelete(id)}><DeleteIcon /> </div>
                      </div>
                    </TableCell>
                    {/* <TableCell>
              <Chip label={status} classes={{ root: classes[states[status.toLowerCase()]] }} />
            </TableCell> */}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
      ) : (<div style={{ padding: "8px" }}>
        No Clients Found.
      </div>)}
    </div>

  );
}
