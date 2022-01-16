import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, useRouteMatch } from "react-router";
import appRoutes from "../../constants/app-routes";
import Milestone from "./mileStone";
import Proposal_summary from "./proposal";
import Reporting from "./reporting";
import { fetchUserData } from "../../redux/user/userActions";


const TaskManager  = () => {
    const [sector, setSector] = useState("");
    const { path } = useRouteMatch();
   

   
    
    useEffect(() => {
        if (sector.length != 0) {
          const stepperData = [
            {
           
              id: 1,
              title: "MILESTONE",
              description: "reaching the goal",
              percent: `${sector.location}`,
              name: "milestone",
              heading: "MILESTONE",
              heading1: "",
              link: `${appRoutes.TASK_MANAGER}${appRoutes.MILESTONE}`,
              
            },
            {
              id: 2,
              title: "REPORTING",
              description: "a brief about  ",
              percent: `${sector.purpose}`,
              name: "reporting",
              heading: "REPORTING",
              heading1: "",
              link: `${appRoutes.TASK_MANAGER}${appRoutes.REPORTING}`,
            
            },
            {
              id: 3,
              title: "PROPOSAL SUMMARY",
              description: "summary",
              percent: `${sector.trackRecord}`,
              name: "proposal-summary",
              heading1: "PROPOSAL SUMMARY",
              heading: "",
              link: `${appRoutes.TASK_MANAGER}${appRoutes.PROPOSAL_SUMMARY}`,
            
            },
           
          ];
         

        }
    }, []);
   

return (

<>
<h1>task-manager</h1>

    <Switch>
      
 
     {/*   <Route exact path={`${path}${appRoutes.OVERVIEW}`} component={OrganisationDetails} />
        <Route exact path={`${path}${appRoutes.OVERVIEW}`} component={OrganisationDetails} />*/}
        <Route exact path={`${path}${appRoutes.MILESTONE}`} component={Milestone} />
        <Route exact path={`${path}${appRoutes.REPORTING}`} component={Reporting} />
        <Route exact path={`${path}${appRoutes.PROPOSAL_SUMMARY}`} component={Proposal_summary} />
        
     
    </Switch>

    </>
  );


 

};

export default TaskManager;