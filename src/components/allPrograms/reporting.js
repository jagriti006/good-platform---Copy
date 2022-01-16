import React, { useEffect, useState } from "react";

import { Link, useHistory } from "react-router-dom";
import aim from "../../assets/images/task-manager/aim.png";
import { Menu, Dropdown,Modal,Row, Button,Col, message, Space, Tooltip } from 'antd';
import {Field, Form, Formik} from "formik";
import cost from "../../assets/images/task-manager/cost.png";
import ruler from "../../assets/images/task-manager/ruler.png";

const styleMilestone = {
      color: "grey",
      ":hover": {
        color: "midnightblue",
      },
      display:"flex",height:"70px",position:"absolute", zindex:"2",background:"white",borderRadius:"5px!important",width:"25%",top:"120px",left:"70px"
    };

const Reporting = () => {
    
 return (


      <>
      <div style={{position:"relative"}}>
            <div className="col" style={{display: "flex",  background:"white", padding:"40px",position: "relative",height:"150px", zindex:"1" }}>
                    <div className="col" style={{display: "block" }}>
                                    <h3  style={{fontWeight:"900", margin:"20px",color:"midnightblue"}}>Reporting</h3>
                                    
                    </div>
                    <div  class="d-flex justify-content-end">
                                 
                                      <div  className="col"> 
                                          <Button type="link">Email</Button>
                                          
                                      </div>
                                     
                                      <div  className="col">
                                                <button className="signbutton" >
                                                      EXPORT
                                                </button>
                                      </div>  

                    </div> 
            </div>       
                              <div  className="col" style={styleMilestone}>
                                     <h6> <img src={aim} alt=""  style={{height:"20px",width:"20px",margin:"10px"}}/>MILESTONE</h6>
                              </div>

                              <div  className="col" style={{display:"flex",height:"70px",position:"absolute", zindex:"2",background:"white",borderRadius:"5px!important",width:"25%",top:"120px",left:"500px"}}>   
                                     <h6><img src={cost} alt=""  style={{height:"20px",width:"20px",margin:"10px"}}/>BUDGET</h6>
                              </div>

                              {/* <div  className="col" style={{display:"inline-block",height:"70px",position:"absolute", zindex:"",background:"white",borderRadius:"5px!important",width:"25%",top:"120px",left:"900px"}}>         
                                     <h6><img src={ruler} alt=""  style={{height:"20px",width:"20px",margin:"10px"}}/>METRICES</h6>
                              </div> */}
                             


                  
                    </div>
          
      </>
    
      
  
    )
  
};

export default Reporting;


