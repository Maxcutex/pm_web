

import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
  title: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "20rem",
    marginBottom: theme.spacing(1),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 180,
  },
  formTextDiv: {
    marginBottom: theme.spacing(1),
    width: "45%",
    marginRight: "1rem"
  },
  addButton: {
    color: "blue",
    width: "7rem",
    marginTop: "0.3rem",
    "&:hover": {
      cursor: "pointer",
    }
  },
  skillsBadge: {
    padding: ".7125rem .775rem .8rem .775rem",
    marginRight: ".9375rem",
    marginBottom: ".9375rem",
    position: "relative",
    border: "1px solid #d6dee4",
    borderRadius: ".1875rem",
    backgroundColor: "#fff",
    cursor: "pointer",
  },
  skillsBadgeSkillName: {
    margin: "0",
    padding: "0",
    border: "0",
    color: "#1f2c46",
    fontSize: ".9375rem",
    lineHeight: "1.125rem",
    minWidth: "0", fontWeight: "400",

  },
  skillLevel: {
    margin: "0",
    padding: "0",
    border: "0",
    color: "#626a7d",
    fontSize: ".8125rem",
    lineHeight: "1rem",
    marginTop: ".3125rem",
    "&::first-letter": {
      textTransform: "capitalize",
    }
  }
}));