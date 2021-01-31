import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
  main_header: {
    backgroundColor: "#fff", marginLeft: "-24px",
    marginTop: "-24px", marginRight: "-24px", padding: "0.5rem", marginBottom: "15px", paddingLeft: "26px", paddingTop: "1.5rem", paddingBottom: "1.5rem"
  },
  main_header2: {

    marginTop: "-24px", marginBottom: "0.2rem",
  },
  search_form: {
    backgroundColor: "#fff",
    padding: "0.4rem",
    borderRadius: "4px",
    border: "1px solid #e3e3e3"
  }, formControl: {
    margin: theme.spacing(1),
    minWidth: 180,
  },
  tableOverflow: {
    overflow: 'auto'
  },
  errorMessage: {
    textAlign: "left",
    color: "#dd4646",
  },
  successMessage: {
    textAlign: "left",
    color: "#57bf70",
  },
  formTextDiv: {
    marginBottom: theme.spacing(1),
    width: "45%",
    marginRight: "1rem"
  },
  hrDivider: { color: "#efefef" },
  searchHeaderTitle: { fontSize: "1rem", color: "#429662", fontWeight: "800" },
  searchHeaderLink: { marginLeft: "auto", cursor: "pointer", fontWeight: "500" },
  btnSuccess: {
    backgroundColor: "#00a65a",
    borderColor: "#008d4c",
    color: "#fff"
  },
  btn: {
    padding: "0.4rem",
    borderRadius: "3px",
    WebkitBoxShadow: "none",
    boxShadow: "none",
    border: "1px solid transparent",
    fontWeight: "700",
    textAlign: "center",
    whiteSpace: "nowrap",
    verticalAlign: "middle",
    touchAction: "manipulation",
    cursor: "pointer",
  },
  button: {
    margin: theme.spacing(1),
  },
}));