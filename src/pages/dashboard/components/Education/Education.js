import React, { useEffect, useState } from 'react'
import {Edit as EditIcon, Delete as DeleteIcon} from "@material-ui/icons";
 
// styles
import useStyles from "./styles";
import classnames from "classnames";
// components
import Widget from "../../../../components/Widget/Widget";
import { Typography } from "../../../../components/Wrappers/Wrappers";

//types
import { getUserEducations } from '../../../../api/getUserDetailsApi';



const Education = ({ title, id, token }) => {
    var classes = useStyles();
    const [
        userEducation,
        setUserEducation,
    ] = useState(null);
    const [status, setStatus] = useState(
        "IDLE"
    );
    const [error, setError] = useState('');

    useEffect(() => {
        setStatus("LOADING");
        getUserEducations(id, token)
            .then(data => {
                setUserEducation(data.payload.user_education);
                setStatus("SUCCESS");
            })
            .catch(error => {
                setStatus("ERROR");
                setError(error.message);
            });
    }, []);
    return ( 
        <Widget
          header={
            
            <div  style={{display: "flex"}}>
                <div className={classes.title}>
                    <Typography variant="h5">{title}</Typography>
                </div>
                <div className={classes.addButton}>+ Add New</div>
            </div>

          }
          upperTitle
            // bodyClass={classes.fullHeightBody}
            // className={classes.card} disableWidgetMenu={true}
            disableWidgetMenu
        >
            <div>
            {status === "LOADING" ? <div> Loading ...</div> : null}
            {status === "ERROR" ? (
                <div>Oops! There was an Error. Try refreshing the page</div>
            ) : null}

            {status === "SUCCESS" && userEducation ===undefined? (
                <div>No Record Found</div>
            ) : null}

            {status === "SUCCESS" && userEducation!==null
                ? (
                    
                    <div> 
                        
                        {userEducation.map( employment => (
                                <div key={employment.id} style={{display: "flex", marginBottom: "3rem", paddingBottom: "2rem", borderBottom: "0.1rem solid #cecece"}} className={classnames(classes.employ_container)}>
                                    <div  className={classnames(classes.employ_work_summary)}>
                                        <div className={classnames(classes.institution_name)}>{employment.institution_name}</div>
                                            <div className={classnames(classes.institution_city_country)}>{employment.institution_city}, {employment.institution_country}</div>
                                            <div className={classnames(classes.institution_period)}>{employment.start_date_formatted} - {employment.end_date_formatted} * {employment.duration}</div>
                                          
                                    </div>
                                    <div className={classnames(classes.employ_work_details)}>
                                    <div className={classnames(classes.employ_job_title)}>{employment.course_name} ({employment.degree_earned})</div>
                                                <div>{employment.work_summary}</div>
                                                <br/>
                                                <div className={classnames(classes.txtSubHeader)}>Accomplishments</div>
                                                
                                                <div>{employment.accomplishments}</div>
                                                <br/>
                                                
                                                
                                    </div>
                                    <div  className={classnames(classes.employ_actions)}>
                                    <div style={{display: "flex"}}><EditIcon /> <Typography className={classes.materialIconText}>Edit</Typography></div>
                                    <div style={{display: "flex"}}><DeleteIcon /> <Typography className={classes.materialIconText}>Delete</Typography></div>
                                    </div>
                                    
                                    
                                  
                                   
                                </div>
                                
                        ))}
                            
                    </div>    
                       
                      
                )
                : null}
            </div>
        </Widget>
     );
}

export default Education; 