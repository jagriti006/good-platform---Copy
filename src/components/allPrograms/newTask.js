import{useState,useEffect,React} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight,faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { Button, Col,Card, Progress,Modal,Image,notification, Row } from "antd";
import {MinusOutlined } from '@ant-design/icons';
import "./mileStone.scss";
import "./milestone.css"
import { Accordion,Table} from "react-bootstrap";
import flag from "../../assets/images/task-manager/flag.png";
import { useFormik } from 'formik';
import {Field, Form, Formik,FormikProvider} from "formik";
import SelectBox from "../FormikComponents/SelectBox/SelectBox";
import Input from "../FormikComponents/Input/Input";
import SelectBoxMultiple from './../FormikComponents/SelectBox/SelectBoxMultiple';
import DatePicker from "../FormikComponents/Date/Date";
import { Collapse } from 'antd';
import moment from "moment";
import calender_icon from "../../assets/images/task-manager/calender_icon.png";
import milestoneAPI from "../../api/milestoneAPI";
import { isEmpty } from "lodash";
//import { Menu, Dropdown,,Row,Collapse, Button,Col, message, Space,notification, Tooltip, InputNumber } from 'antd';


export const NewTask = ({
  id,
  title,
  name,
  click,
  link,
  teammembers,
  category,
  hasButton = false,
  buttonTitle = "",
  borderColorValue,
}) => {
  const { Panel } = Collapse;
  const handleClose = () => setShow(false);
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const [task, setTask] = useState([])
  // const tsdata=[{endDate: "09/12/2021",
  // id: 75,
  // milestone: "registering the youth of ratnagiri",
  // milestoneId: "44a90178470b4615af7d3e2ed99569a",
  // startDate: "09/12/2021",
  // taskName: "cxvb nk"
  // },{endDate: "09/12/2021",
  // id: 76,
  // milestone: "registering the youth of ratnagiri",
  // milestoneId: "44a90178470b4615af7d3e2ed99569a",
  // startDate: "09/12/2021",
  // taskName: "cxvb nk"
  // },{endDate: "09/12/2021",
  // id: 77,
  // milestone: "registering the youth of ratnagiri",
  // milestoneId: "44a90178470b4615af7d3e2ed99569a",
  // startDate: "09/12/2021",
  // taskName: "cxvb nk"
  // },{endDate: "09/12/2021",
  // id: 78,
  // milestone: "registering the youth of ratnagiri",
  // milestoneId: "44a90178470b4615af7d3e2ed99569a",
  // startDate: "09/12/2021",
  // taskName: "cxvb nk"
  // }]
  // setTask(tsdata)
  const m_id=id
 // console.log("Middddd",id,title);
  function fetchTask(){
    fetch(`http://13.235.35.46:8090/api/v2.0/task/getAllTasksByMilestoneId?MilestoneId=${id}`)
    .then(res=>res.json())
    .then(data=>setTask(data))
}
  useEffect(() => {
  fetchTask()
  }, [])

  const mainformik = useFormik({
    initialValues: {
      StartDate:"",
      EndDate:"",
      Team:"",
      TotalBudget:0,
      Description:"dfsf"     
    },
  })
  const {
    mainhandleSubmit,
    mainvalues,
    maintouched,
    mainerrors,
    mainresetForm,
    mainsetFieldValue,
    mainsetValues,
    mainisValid,
    mainsubmitCount,
  } = mainformik;

  
  const formik = useFormik({
    initialValues1: {
      Date:"",
      Category:"",
      Team:"",
      Cost: "",
      Description:""     
    },
  })
  const {
    handleSubmit,
    values,
    touched,
    errors,
    resetForm,
    setFieldValue,
    setValues,
    isValid,
    submitCount,
  } = formik;
//console.log("Task fteched....",task);

 //Array.prototype.map.call(taskdata.Team, function(item) { return item.TeamMember; }).join(",");
 

const[arrow,setArrow]=useState(false)
//console.log(arrow);
const[taskdata,setTaskdata]=useState({})
console.log(taskdata.Team)

var team =taskdata.Team


const formarray=[]
function storeForm(event){
  event.preventDefault()
  console.log("Formikk values" ,formik.values);
  formarray.push(formik.values)
  
  console.log("Arrayyyyy",formarray);
  // localStorage.setItem("Array",JSON.stringify(formarray))
  // let ad=JSON.parse(localStorage.getItem("Array"))
  // console.log("local stotrg",ad);
  // setformdata(ad)

  }

const formcategory=[]
for(let data of category){
// console.log("Datttaaa",data);
formcategory.push({label:data.label,value:data.label})
}
const formteam=[]
for(let data of teammembers){
 formteam.push({label:data.label,value:data.label})
}



const setSaveData = async ( values) => { 
  console.log("inserttask",values);
 // console.log(resKey)
 // const foundItem = resdata.find(i => i.id == values.Milestone);
 // console.log("name",values.Milestone)
  const newArr = [];

//   values.Key.forEach(k => {
//   let foundKey ;
//   console.log(foundKey)
//   for(var n=0;n<resKey.length;n++)
//   if(k==resKey[n].indicatorId){
//    foundKey = {"KeyIndicator": resKey[n].indicatorName, "KeyIndicatorId": resKey[n].indicatorId,"ProjectId":"8a8b855f7db23821017db3445d020000"}
//    newArr.push(foundKey)
//   }
 
//  console.log(foundKey)
//    if(foundKey) {
// //   foundKey = {"KeyIndicator": foundKey.indicatorName, "KeyIndicatorId": foundKey.indicatorId,"ProjectId":"8a8b855f7db23821017db3445d020000"}
//    newArr.push(foundKey)
//    console.log(newArr)
//    }
  //})
 const newArray=[];
//  console.log(resTeam)
//     console.log(values.Team)

// values.Team.forEach(j =>{
// let foundTeam;
//  for(var i =0;i<resTeam.length;i++)       {
//    if(j==resTeam[i].id){  
//      foundTeam ={"TeamMember": resTeam[i].name,"TeamMemId": resTeam[i].id,"ProjectId":"8a8b855f7db23821017db3445d020000"}
//      newArray.push(foundTeam)
//     }
//    } 
//  })


      //  const newValues = {
      //    //...values, 
      //   ProjectId:"8a8b855f7db23821017db3445d020000", 
      //   Team:newArray,
      //   StatusId:2,  
      //  KeyIndicator:newArr,   
      //  Description:values.Description,  
      //  TaskName:values.TaskName,
      //  TotalBudget:values.TotalBudget,
      //  Milestone:localStorage.getItem("nameMile"),
      //  MilestoneId:localStorage.getItem("id").trim(),
      //  StartDate: moment(values.StartDate).format("DD/MM/YYYY"),
      //  EndDate: moment(values.EndDate).format("DD/MM/YYYY")
      //  }

      
      const newValues = 
       {
         Milestone:"Milestone",
         TaskName:"TaskName",
         Description:"Description",
         MilestoneId:"MilestoneId",
         ProjectId:"ProjectId",
         TotalBudget:10000,
         EndDate:"EndDate",
         StartDate:"StartDate",
         StatusId:2,
         KeyIndicator:[
            {
               "KeyIndicator":"KeyIndicator",
               "KeyIndicatorId":"KeyIndicatorId",
               "ProjectId":"testprojectid"
            }
         ],
         Team:[
            {
               "TeamMember":"TeamMember",
               "TeamMemId":"TeamMemId",
               "ProjectId":"testprojectid"
            }
         ]
      }

       console.log(newValues) 
       if(!isEmpty(newValues)){
   // const response = await milestoneAPI().inserttask(newValues);
    notification.success({ message: "Task Details Saved..!" });
       console.log(newValues);
       localStorage.setItem("request",JSON.stringify(newValues));  
       localStorage.getItem("request");
  const budgetvalues ={
     
    TaskId:7,
   Category:"testdog",
   Amount:"7500",
   Team:"testeam",
   Desc:"tesdesc",
   ProjectId:"testprojectid",
   TeamId:"testteamid",
   CategoryId:"testdogid"


  }
  //const response = await milestoneAPI().saveBudget(budgetvalues);
  notification.success({ message: "Budget Details Saved..!" });
 //    fetchTask();
   }
  }

  

//console.log(Array.prototype.map.call(team, function(item) { return item.TeamMember; }).join(","))
  return (
    <>
      
      <Modal 
          visible={show} 
          onCancel={handleClose}
          destroyOnClose
          cancelText="Cancel"
          // style={{padding:"auto",margin:"auto",width:"1000vh"}} 
          width={1000} 
          footer={null} 
         
          >
             
        <Formik
        onSubmit={(values)=>setSaveData(values)}
          
     //     initialValues={getInitialValues()   }
          //     validationSchema={Yup.object().shape({
          //     .max(248, "Maximum 548 characters allowed."),
          //     Milestone: Yup.string()
          //     .required("Milestone is required.")
          //     .max(29, "Maximum 148 characters allowed."),
          //     TaskName: Yup.string().required("taskname is required."),
          //     StartDate: Yup.date().required("StartDate is required."),
          //     EndDate: Yup.date().required("EndDate is required."),
          //     TotalBudget: Yup.string().required("budget is required."),             
          //     Key:Yup.array().required("Indicators is required."),
          //     addMetric:Yup.string().required("addMetric is required."),
          //     Team:Yup.array().required("Team is required.")
          // })}
        
  //  onSubmit={(values) => setAddTask(values)}
         >
        {({ submitForm,touched, errors}) => {
            return (
              <Form style={{padding:"50px"}}>
              <p style={{fontFamily:"Inter",fontStyle:"normal",fontSize:"13px",color:"#39364F",lineHeight:"15px"}}>TASK</p>
                <p style ={{color:"#39364",fontfamily:"Poppins",fontSize:"16px",fontStyle:"normal",lineHeight:"26px",fontWeight:"600" }}>{taskdata.TaskName} </p>
             
                <Image  
               
                src={flag}
                width={20}
                stroke={borderColorValue}
                fill={borderColorValue}
                
             />  
              <p style={{display:"inline",position:"absolute",fontSize:"13px",fontfamily:"Poppins",fontStyle:"normal",lineHeight:"19px"}}>{title}</p> 

            
    
<Collapse defaultActiveKey={['1','2']} expandIconPosition={'right'} bordered={false}  style={{background:"white",marginTop:"30px",borderTop:"1px solid lightgrey"}}>

    <Panel header={<p style={{fontSize:"15px",fontFamily:"poppins"}}>Task Information</p>} key="1">
    <FormikProvider value={mainformik}>
      <Form>
    <Row gutter={[16, 8]}>
                 
                 
                  
                 <Col span={24}>
                   <Field
                     inputType="textarea"
                     value={taskdata.Description}
                     name="Description"
                     component={Input}
                     placeholder="Add a Description (optional)"
                    // errorText={touched.Description ? errors.Description : ""}
                   />
                 </Col>

                               <Col span={24} style={{marginTop:"20px"}}>
                                   <label>Team</label>
                                   
                                   <Field
                                     name="Team"
                                     component={SelectBoxMultiple}
                                
                                     errorText={touched.Team ? errors.Team : ""}
                                  //   options={renderTeam()}
                              
                                   />
                                 </Col>  
                                 <Col span={24}>
                   <Field
                     Type="text"
                     value={taskdata.TotalBudget}
                     name="TotalBudget"
                     component={Input}
                     placeholder="Total budget"
                    // errorText={touched.Description ? errors.Description : ""}
                   />
                 </Col>
                 <Col style={{borderRadius:"5px",borderColor:"red",display:"inline",width:"50%",padding:"10px"}} >
                  
                    
                     <img src={calender_icon} style={{width:"20px",marginRight:"20px"}}/>
                       {(taskdata.StartDate)}
                                 <Field  
                                // label={moment(taskdata.StartDate).format("DD/MM/YYYY")}
                                  name={moment(taskdata.StartDate).format("DD/MM/YYYY")}
                                  component={DatePicker}
                               // value={(taskdata.StartDate)}
                                  format="DD/MM/YYYY"
                                  type="text"
                                 
                                  placeholder="Start Date"                             
                                  // disabledDate={(d) => !d || d.isBefore(new Date())}
                                //   onChange={(e)=>{console.log("dattteeeeeee",e._d)
                                // strDate(e._d)
                                // }}
                                  errortext={ errors.StartDate && touched.StartDate ? errors.StartDate : ""}   
                                />
                             
                                </Col>
                                <Col  style={{borderRadius:"5px",borderColor:"red",display:"inline",width:"50%",padding:"10px"}}>
                                <img src={calender_icon} style={{width:"20px",marginRight:"20px"}}/>
                       {(taskdata.StartDate)}
                                <Field
                                  name="EndDate"
                                  type="date"
                                  ///value={taskdata.EndDate}
                                  component={DatePicker}
                                  format="DD/MM/YYYY"
                                  placeholder="End Date"
                                  // disabledDate={(d) => !d || d.isBefore(date)}
                                  errortext={ errors.EndDate && touched.EndDate ? errors.EndDate : ""}
                                />
                                      

                               </Col>
                 </Row>
                 </Form>
                 </FormikProvider>
    </Panel>
    <Panel header={<p style={{fontSize:"15px",fontFamily:"poppins"}}>Budget</p>} key="2">
      <div className="taborder">
      <div id="table" className="taborder">
    <table>
  <thead>
    <tr className="thd">
     <th >Date</th>
     <th>Category</th>
     <th>Amount</th>
     <th>Member</th>
     <th>Description</th>
    </tr>
  </thead>
  <tbody  >
    
              {formarray.map((item=>

              

             
    <tr>
      <td>{item.Description}</td>
      <td>{item.Category}</td>
      <td>{item.Cost}</td>
      <td>{item.Team}</td>
      <td >{item.Description}</td>
    </tr>
    ))}
   
   
 </tbody>
</table>

</div>

  <Card style={{ width:"91%",margin:"30px 40px 30px 40px",borderRadius:"6px",backgroundColor:"#F4F8F8"}}>
  <FormikProvider value={formik}>
  <p style={{fontFamily:"poppins",fontWeight:"600",fontSize:"13px",color:"#39364F",lineHeight:"15px"}}>New Budget</p>
    <Row style={{marginTop:"10px"}}>
      <Col className="col-sm-6 formStyles">
      <Field  
                                 
                                 name="Date"
                                 component={DatePicker}
                                
                                 format="DD/MM/YYYY"
                                 type="date"
                                 placeholder="Date"                             
                                 disabledDate={(d) => !d || d.isBefore(new Date())}
                               //   onChange={(e)=>{console.log("dattteeeeeee",e._d)
                               // strDate(e._d)
                               // }}
                                 errortext={ errors.Date && touched.Date ? errors.Date : ""}   
                               />
      </Col>
      <Col  className="col-sm-6 formStyles" style={{}}>
      <Field 
                                    
                                     name="Category"
                                     component={SelectBox}
                                    placeholder='Category'
                                     errorText={touched.Team ? errors.Team : ""}
                                   options={formcategory}
                              
                                   />
      </Col>
    </Row>
    <Row style={{marginTop:"10px"}}>
      <Col  className="col-sm-6 formStyles" style={{}}>
      <Field  
                                 
                                 name="Cost"
                                 component={Input}   
                                 placeholder="₹"                             
                                 // disabledDate={(d) => !d || d.isBefore(new Date())}
                               //   onChange={(e)=>{console.log("dattteeeeeee",e._d)
                               // strDate(e._d)
                               // }}
                                //  errortext={ errors.StartDate && touched.StartDate ? errors.StartDate : ""}   
                              
                               />
      </Col>
      <Col className="col-sm-6 formStyles" style={{}}>
      <Field 
                                    
                                     name="Team"
                                     component={SelectBox}
                                    placeholder='Member'
                                     errorText={touched.Team ? errors.Team : ""}
                                     options={formteam}
                              
                                   />
      </Col>
    </Row>
    <Row style={{marginTop:"10px"}}>
      <Col className="col-sm-12 formStyles" >
      <Field  
                                 
                                 name="Description"
                                 component={Input}
                                 
                              
                                 
                                 placeholder="Description"                             
                                 // disabledDate={(d) => !d || d.isBefore(new Date())}
                               //   onChange={(e)=>{console.log("dattteeeeeee",e._d)
                               // strDate(e._d)
                               // }}
                                //  errortext={ errors.StartDate && touched.StartDate ? errors.StartDate : ""}   
                               />
      </Col>

    </Row>
    <Row style={{marginTop:"10px"}}>
    <Col
             style={{marginLeft:"80%"}}
              className="d-flex justify-content-right" >
             <button
                // className="steps"
                // onClick={(event) => {event.preventDefault();click(title)}}
                style={{
            
                  background:"none",
                    border:"none",
                 color:"blue",
                 fontSize:"12px",
                 textDecoration: "underline",
                 width:"auto"
                  
                }} >
                Cancel
              </button>
              <button style={{width:"89px",height:"35px",background:"none",border:"1px solid #39364F",borderRadius:"6px",marginLeft:"10px"}}>
                ADD</button></Col>
    </Row>
    </FormikProvider>
  </Card>
  
</div>
    </Panel>
     </Collapse>
                             
                                

                                  <Row justify="center" className="beneficiaryForms mt-2">
                                    <Col >
                                      <button
                                        // onClick={() => {       
                                        //   setAddFormSuccess (true);
                                        // }}
                                      style={{width:"89px",height:"35px",background:"#39364F",borderRadius:"6px",color:"white"}}
                                        key="back"
                                        onClick={submitForm}
                                       type="primary"
                                      >
                                     SAVE
                                      </button>
                                    </Col>
                                  </Row>

                          </Form>
                        );
                      }}
                    </Formik>         
                  </Modal>




    <div
    className="formStyles notice notice-info pt-2 pb-2 overview"
      onClick={() => (!hasButton ? click(link) : null)}
      style={{
        
        borderRadius:"6px",
        borderLeft:
          title !== "Validation" ? `6px solid ${borderColorValue}` : "0px",
          padding:"5px", width:"95%",  margin:"20px",     marginLeft:"2%",  marginBottom:"0px"   ,height:"auto"   
      }}
    >
      
      {/* <Link to={link} gutter={[16, 16]}> */}
        <Row align="middle" >
          {title !== "Validation" && (
            <Col s={24} lg={1} className="d-flex justify-content-left" style={{marginLeft:"2%"}}>
               {/* <svg xmlns="http://www.w3.org/2000/svg" fill={props.fill} className={props.class}></svg> */}
              <Image
               // type="circle"
                //percent={percent}
                src={flag}
                width={20}
                stroke={borderColorValue}
                fill={borderColorValue}
                // style={{marginTop:"-10px"}}
              /> 
            </Col>
          )}
          <Col
            xs={12}
            lg={title !== "Validation" ? 6 : 19}
            className="p-left"
            style={{ paddingLeft: title !== "Validation" ? "25px" : "0.9rem",width:"10px" }}
          >
            
            <strong style={{fontSize:"13px"}} className="noticeHeading">{title} </strong>
            
            {/* <span className="noticeText"> {description}</span> */}
          </Col>

          { arrow ?
          
          <><Col
            xs={7}
            lg={title !== "Validation" ? 3 : 5}
            style={{marginLeft:"2.3%"}}>
              STATUS
              </Col>
            <Col
            xs={7}
            lg={title !== "Validation" ? 3 : 5}>
              START DATE
            </Col>
             <Col
            xs={7}
            lg={title !== "Validation" ? 2 : 5} >
              END DATE
            </Col>
             {/* <Col
             style={{marginLeft:"9%"}}
            xs={7}
            lg={title !== "Validation" ? 2 : 5} >
              TEAM</Col> */}
              </>:null}
         
           
             { !arrow ? 
              <>
              <Col
              lg={12}>

              </Col>
              <Col
              xs={7}
              lg={title !== "Validation" ? 2 : 5}
              className="d-flex justify-content-center" >
             <Button
                className="steps"
                onClick={(event) => {event.preventDefault();click(title)}}
                style={{
            
                  background:"none",
                    border:"none",
                 color:"blue",
                 fontSize:"12px",
                 textDecoration: "underline",
                 width:"50px"
                  
                }} >
                + New Task
              </Button></Col></>:null
                       
            }
             
            <Col
            lg={2}>
               <button 
               style={{background:"none",border:"none",marginLeft:"50%"}}
               onClick={(event)=>{setArrow(!arrow)
               event.preventDefault()
              }}
                 className="noticeArrow"> 

                <FontAwesomeIcon icon={arrow ? faAngleDown : faAngleRight} className="arrowicons" />
              </button> 
          
              </Col>      
        </Row>
       
       
       {(arrow)?
        task.map((item)=>
        
        (item.startDate!="")?
        <Row align="middle">
          <div className="row "   onClick={()=>{handleShow("")
          setTaskdata(item)
          console.log("TaskDatttaaa",taskdata);
        }} style={{borderTop:"1px solid lightgrey",width:"101%",paddingTop:"20px",marginTop:"10px",marginLeft:"-4px"}}>
       
          <Col
            xs={7}
            lg={7}
          
            className="d-flex justify-content-left" >
              <strong style={{fontSize:"10px",marginLeft:"12%"}} className="noticeHeading">{item.TaskName} </strong>
          </Col>
          <Col
            xs={7}
            lg={title !== "Validation" ? 2 : 5}
            className="d-flex justify-content-center"
          >
           
              <button
              
               
                style={{
                  
                  
                  background:"#78E3A9",
                  marginTop: "-10px",
                  marginLeft:"64%",
                    borderRadius:"30px",
                    border:"none",
                 color:"black",
                 fontSize:"10px",
                 height:"21px",
                 width:"72px"
                  
                }}
              >
                 Active
              </button>
              </Col>
          
          <Col
            xs={7}
            lg={title !== "Validation" ? 2 : 5}
            style={{fontSize:"13px",fontFamily:"Poppins",marginLeft:"8%"}}
            className="d-flex justify-content-center" >
             {item.StartDate}
          </Col>
          <Col
            
            style={{fontSize:"13px",fontFamily:"Poppins",marginLeft:"4%"}}
            className="d-flex justify-content-center">
            {item.EndDate}
          </Col>
          {/* <Col
            xs={4}
           style={{marginLeft:"10%"}}
            className="d-flex justify-content-right">
            {item.team.map((d)=><span style={{fontSize:"8px"}}>{d.name}</span>)}
          </Col>  */}
          </div>
        </Row>:null):null}   
      {/* </Link> */}
     
    </div>
    
  
    </>
  );
};
