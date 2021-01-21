import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
  title: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "8rem",
    marginBottom: theme.spacing(1),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 180,
  },
  addButton: {
    color: "blue",
    width: "7rem",
    marginTop: "0.3rem"
  },
  formTextDiv: {
    marginBottom: theme.spacing(1),
    width: "45%",
    marginRight: "1rem"
  },
  txtSubHeader: {
    fontSize: "14px",
    fontWeight: "700",
    color: "#635c5c",
    fontFamily: "Lato,BlinkMacSystemFont,-apple-system,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,Helvetica,Arial,sans-serif"
  },
  base_div: {
    display: "block",
    float: "left",
  },
  employ_container: {
    "&::before": {
      content: " ",
      display: "inline-block",
      position: "absolute",
      borderRadius: "50%",
      border: ".625rem solid #d5deff",
      left: "0",
      top: "1.0625rem",
      width: "1.25rem",
      height: "1.25rem",
      zIndex: "400",
    }
  },
  employ_actions: {
    marginRight: "2rem",
    width: "10%",
  },
  materialIconText: {
    marginLeft: theme.spacing(1),
    fontSize: 12,
  },
  employ_work_summary: {
    marginRight: "2rem",
    width: "35%",
  },
  employ_job_title: {
    margin: "0",
    fontWeight: "700",
    fontSize: "1rem",
    lineHeight: "1",
  },
  employ_work_details: {
    width: "50%",
  },
  divider: {
    border: "1px solid #e2dede",
    marginTop: "3px",
    marginBottom: "3px",
  },
  employment_skill: {
    border: "1px solid #49aaaf",
    padding: "4px",
    color: "#49aaaf",
    boxSizing: "none",
    minWidth: "3rem",
    borderRadius: "5%", marginRight: "0.6rem"
  },
  institution_name: {
    color: "#3359db",
    fontSize: "18px",
  },
  institution_city_country: {
    color: "#000",
    fontSize: "14px",
  },
  institution_period: {
    color: "#626a7d",
    fontSize: "12px",
  },
  timeline_item_left: {
    float: "left",
    border: "1px solid #cecece",
    width: "35%",
  },
  timeline_item_right: {
    float: "right",
    border: "1px solid #cecece",
    width: "55%",
    clear: "both",
  },
  notificationCallButton: {
    color: "white",
    marginBottom: theme.spacing(1),
    textTransform: "none",
  },
  bottomStatsContainer: {
    display: "flex",
    justifyContent: "space-between",
    margin: theme.spacing(1) * -2,
    marginTop: theme.spacing(1),
  },
  statCell: {
    padding: theme.spacing(2),
  },
  totalValueContainer: {
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  totalValue: {
    display: "flex",
    alignItems: "baseline",
  },
  profitArrow: {
    transform: "rotate(-45deg)",
    fill: theme.palette.success.main,
  },
  profitArrowDanger: {
    transform: "rotate(45deg)",
    fill: theme.palette.secondary.main,
  },
  selectInput: {
    padding: 10,
    paddingRight: 25,
    "&:focus": {
      backgroundColor: "white",
    },
  },
  bodyWidgetOverflow: {
    overflow: 'auto'
  }
}));