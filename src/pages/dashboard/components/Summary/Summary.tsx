import React, { useEffect, useState } from 'react'

// styles
import useStyles from "./styles";

// components
import Widget from "../../../../components/Widget/Widget";
import { Typography } from "../../../../components/Wrappers/Wrappers";

//types
import { ICredentials, REQUEST_STATUSES, UserProfileType} from '../../../../types'
import { getUserProfile } from '../../../../api/userApi';


const Summary: React.FC<ICredentials> = ({ title, id, token }) => {
    var classes = useStyles();
    const [
        userSummary,
        setUserSummary,
    ] = useState<UserProfileType | null>(null);
    const [status, setStatus] = useState<REQUEST_STATUSES>(
        REQUEST_STATUSES.IDLE
    );
    const [error, setError] = useState<string>('');

    useEffect(() => {
        setStatus(REQUEST_STATUSES.LOADING);
        getUserProfile(id, token)
            .then(data => {
                setUserSummary(data);
                setStatus(REQUEST_STATUSES.SUCCESS);
            })
            .catch(error => {
                setStatus(REQUEST_STATUSES.ERROR);
                setError(error.message);
            });
    }, []);
    return ( 
        <Widget
          header={
            <div className={classes.title}>
              <Typography variant="h5">{title}</Typography>
    
              
            </div>
            
          }
          upperTitle
            // bodyClass={classes.fullHeightBody}
            // className={classes.card} disableWidgetMenu={true}
        >
            <div>
                Summary Body
            </div>
        </Widget>
     );
}
 
export default Summary;