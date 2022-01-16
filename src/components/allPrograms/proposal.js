import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import search from "../../assets/images/task-manager/search.png";
import { Progress } from 'antd';
import 'react-circular-progressbar/dist/styles.css';
import user from "../../assets/images/task-manager/user.png";
import ruler from "../../assets/images/task-manager/ruler.png";
import cost from "../../assets/images/task-manager/cost.png";
import donor from "../../assets/images/task-manager/donor.png";
import barchart from "../../assets/images/task-manager/barchart.png";

const Proposal_summary = () => {
    

    return (
      <>
    
    <div className="col" style={{display: "block",  background:"white", padding:"20px"}}>

          <div className="col" style={{display: "flex"}}>

                 <Progress type="circle" percent={20} width={80} />

                      <div className="col" style={{display: "block" }}>
                            <h3  style={{fontWeight:"900", margin:"20px",color:"midnightblue"}}>Pathways To Progress</h3>
                            
                      </div>
          </div>
   
          <div className="col" style={{display: "flex",paddingTop:"50px",borderBottom:"lightblue" }}>
                  <h5  style={{fontWeight:"900",color:"midnightblue"}}>
                  <img src={search} alt="" style={{height:"20px",width:"20px",margin:"10px"}} />
                  Baiscs</h5>
          </div>


          <div className="col" style={{display: "flex",paddingTop:"50px" }}>
                  <h5  style={{fontWeight:"900",color:"midnightblue"}}>
                  <img src={user} alt="" style={{height:"20px",width:"20px",margin:"10px"}} />
                  Team</h5>
          </div>


          <div className="col" style={{display: "flex",paddingTop:"50px" }}>
                  <h5  style={{fontWeight:"900",color:"midnightblue"}}>
                  <img src={ruler} alt="" style={{height:"20px",width:"20px",margin:"10px"}} />
                  Key Indicators</h5>
          </div>

          <div className="col" style={{display: "flex",paddingTop:"50px" }}>
                  <h5  style={{fontWeight:"900",color:"midnightblue"}}>
                  <img src={cost} alt="" style={{height:"20px",width:"20px",margin:"10px"}} />
                  Budget</h5>
          </div>

          <div className="col" style={{display: "flex",paddingTop:"50px" }}>
                  <h5  style={{fontWeight:"900",color:"midnightblue"}}>
                  <img src={donor} alt="" style={{height:"20px",width:"20px",margin:"10px"}} />
                  Donor</h5>
          </div>

          <div className="col" style={{display: "flex",paddingTop:"50px" }}>
                  <h5  style={{fontWeight:"900",color:"midnightblue"}}>
                  <img src={barchart} alt="" style={{height:"20px",width:"20px",margin:"10px"}} />
                  Reporting</h5>
          </div>
        
    </div>
      
      
      </>
    
  
    )
  
};

export default Proposal_summary;


