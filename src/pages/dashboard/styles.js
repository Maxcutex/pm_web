import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
  main_header: {backgroundColor: "#fff", marginLeft: "-24px",
  marginTop: "-24px", marginRight: "-24px", padding: "0.5rem", marginBottom: "15px", paddingLeft: "26px", paddingTop: "1.5rem", paddingBottom:"1.5rem"},
  image: {
    paddingLeft: "0.3rem",
    width: "8rem", 
    marginRight: "1rem"
  },
  main_description: {
    color: "#223351",
    marginRight: "2rem"
  },
  main_description_name: {
    flexBasis: "auto",
    fontSize: "1.7rem",
    lineLeight: "1.4375rem",
  },
  main_description_position: {
    color: "#1f2c46",
    fontSize: "1.1rem",
  },
  main_description_contacts: {
  },
  buttonEdit: {},
  buttonEditIcon2: {
    backgroundColor: "#fff",
    border: ".0625rem solid #bfc5d2",
    height: "2.5625rem",
    color: "#1f2c46",
    display: "inline-flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "inherit",
    fontWeight: "500",
    borderRadius: "3px",
    textDecoration: "none",
    transition: ".3333333333s",
  },
  buttonEditIcon: {
    padding: "0.1rem", 
    border: "0.1rem solid #cecece", 
    "&:hover": {
      cursor:"pointer"
    },
    
    width: "2.1rem",
    borderRadius: "0.3rem",
    textAlign: "center",
    verticalAlign: "middle",
  },
  card: {
    minHeight: "100%",
    display: "flex",
    flexDirection: "column",
  },
  visitsNumberContainer: {
    display: "flex",
    alignItems: "center",
    flexGrow: 1,
    paddingBottom: theme.spacing(1),
  },
  progressSection: {
    marginBottom: theme.spacing(1),
  },
  progressTitle: {
    marginBottom: theme.spacing(2),
  },
  progress: {
    marginBottom: theme.spacing(1),
    backgroundColor: 'rgb(236, 236, 236)',
  },
  pieChartLegendWrapper: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-end",
    marginRight: theme.spacing(1),
  },
  legendItemContainer: {
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(1),
  },
  fullHeightBody: {
    display: "flex",
    flexGrow: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  tableWidget: {
    overflowX: "auto",
  },
  progressBarPrimary: {
    backgroundColor: theme.palette.primary.main,
  },
  progressBarWarning: {
    backgroundColor: theme.palette.warning.main,
  },
  performanceLegendWrapper: {
    display: "flex",
    flexGrow: 1,
    alignItems: "center",
    marginBottom: theme.spacing(1),
  },
  legendElement: {
    display: "flex",
    alignItems: "center",
    marginRight: theme.spacing(2),
  },
  legendElementText: {
    marginLeft: theme.spacing(1),
  },
  serverOverviewElement: {
    display: "flex",
    alignItems: "center",
    maxWidth: "100%",
  },
  serverOverviewElementText: {
    minWidth: 145,
    paddingRight: theme.spacing(2),
  },
  serverOverviewElementChartWrapper: {
    width: "100%",
  },
  mainChartBody: {
    overflowX: "auto",
  },
  mainChartHeader: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    [theme.breakpoints.only("xs")]: {
      flexWrap: "wrap",
    },
  },
  mainChartHeaderLabels: {
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.only("xs")]: {
      order: 3,
      width: "100%",
      justifyContent: "center",
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(2),
    },
  },
  mainChartHeaderLabel: {
    display: "flex",
    alignItems: "center",
    marginLeft: theme.spacing(3),
  },
  mainChartSelectRoot: {
    borderColor: theme.palette.text.hint + "80 !important",
  },
  mainChartSelect: {
    padding: 10,
    paddingRight: 25,
  },
  mainChartLegentElement: {
    fontSize: "18px !important",
    marginLeft: theme.spacing(1),
  },
  success: {
    backgroundColor: theme.palette.success.main,
    color: '#fff',
  },
  warning: {
    backgroundColor: theme.palette.warning.main,
    color: '#fff',
  },
  secondary: {
    backgroundColor: theme.palette.secondary.main,
    color: '#fff',
  }
}));
