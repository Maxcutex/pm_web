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

export default function UsersTable({ data, handleView, handleEdit, handleDelete }) {
  const classes = useStyles();
  console.log("data object is ", data)

  return (
    <div>
      {data.length !== 0 ? (
        <div>
          <Table className="mb-0">
            <TableHead>
              <TableRow>
                <TableCell >Full Name</TableCell>
                <TableCell >Email</TableCell>
                <TableCell >Title</TableCell>
                <TableCell >Employment Date</TableCell>
                <TableCell >P. Email</TableCell>
                <TableCell >Phone</TableCell>
                <TableCell >City</TableCell>
                <TableCell ></TableCell>

              </TableRow>
            </TableHead>
            <TableBody>
              {data.map(({ id, first_name, last_name, email, employment_date, job_title, personal_email, phone, location }) => (
                <TableRow key={id} hover>
                  <TableCell className="pl-3 fw-normal">{first_name}{' '}{last_name} </TableCell>
                  <TableCell>{email}</TableCell>
                  <TableCell>{job_title}</TableCell>
                  <TableCell>{employment_date}</TableCell>
                  <TableCell>{personal_email}</TableCell>
                  <TableCell>{phone}</TableCell>
                  <TableCell>{location.name}</TableCell>
                  <TableCell>
                    <div className={classnames(classes.user_actions)}>
                      <div className={classnames(classes.user_actions_buttons)} onClick={() => handleView(id)}><ViewIcon /> </div>
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
        No Users Found.
      </div>)}
    </div>

  );
}
