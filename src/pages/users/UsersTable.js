import React from "react";
import {
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Chip
} from "@material-ui/core";
// import useStyles from "../../styles";

const states = {
  sent: "success",
  pending: "warning",
  declined: "secondary",
};

export default function UsersTable({ data }) {
  // const classes = useStyles();
  var keys = Object.keys(data[0]).map(i => i.toUpperCase());
  keys.shift(); // delete "id" key

  return (
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

        </TableRow>
      </TableHead>
      <TableBody>
        {data.map(({ id, first_name, last_name, email, employment_date, job_title, personal_email, phone, city }) => (
          <TableRow key={id}>
            <TableCell className="pl-3 fw-normal">{first_name}{' '}{last_name} </TableCell>
            <TableCell>{email}</TableCell>
            <TableCell>{job_title}</TableCell>
            <TableCell>{employment_date}</TableCell>
            <TableCell>{personal_email}</TableCell>
            <TableCell>{phone}</TableCell>
            <TableCell>{city}</TableCell>
            {/* <TableCell>
              <Chip label={status} classes={{ root: classes[states[status.toLowerCase()]] }} />
            </TableCell> */}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
