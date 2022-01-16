import React, { Nav,useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Menu, Dropdown,Modal,Row,Collapse, Button,Col, message, Space,notification, Tooltip, InputNumber } from 'antd';
import { useFormik } from 'formik';
import { DownOutlined,PlusOutlined,MinusOutlined, UserOutlined } from '@ant-design/icons';
import {Field, Form, Formik,FormikProvider} from "formik";
import SelectBox from "../FormikComponents/SelectBox/SelectBox";
import Input from "../FormikComponents/Input/Input";
import * as Yup from "yup";
import DatePicker from "../FormikComponents/Date/Date";
import list from "../../assets/images/task-manager/list.png";
import "./mileStone.scss";
import { NewTask } from "./newTask";
import milestoneAPI from "../../api/milestoneAPI";
import moment from "moment";
import sessionStorage from "redux-persist/es/storage/session";
import SelectBoxMultiple from './../FormikComponents/SelectBox/SelectBoxMultiple';
import "./milestone.css";
import { map } from "lodash";


  function handleMenuClick(e) {
    message.info('Click on menu item.');
    console.log('click', e);
  }
 
   const Milestone = (props) => {  
    
  
    
      const history = useHistory();
   
      const[resTeam,setTeam]=useState(null);
      useEffect(()=>{
        getTeamData();
      async function getTeamData() {
      const response = await fetch("http://13.235.35.46:8090/api/Milestone/getTeam" , {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",   
              
          "Access-Control-Allow-Ordataigin": "*",
        },
        body: JSON.stringify(),
        
      });
      const apiresponse= await response.json();    
      setTeam(apiresponse);  
      //console.log(resmetrics[0].matericsName) ;
      } 
      },[]);

      const renderTeam=()=>{
        const handleTeam =[];
     //   console.log(resTeam)
        for(let i=0;i<resTeam.length;i++){
          var teamname = resTeam[i].name;
          var teamId = resTeam[i].id;
          if(teamname!=""){
          handleTeam.push({label:teamname,value:teamId})
        }}
       return handleTeam;
      }



            // const [resmetrics, setmetrics]=useState(null);
            // useEffect(()=>{
            //   const keyid = localStorage.getItem("indicatoreid");
            //   getmetricsData();
            // async function getmetricsData() {
            // const resp = await fetch(`http://13.235.35.46:8090/api/Matrices/22`, {
            //   method: 'GET',
            //   headers: {
            //     "Content-Type": "application/json",   
                    
            //     "Access-Control-Allow-Ordataigin": "*",
            //   },
            //   body: JSON.stringify(),
              
            // });
            // const apiResp= await resp.json();    
            // setmetrics(apiResp);  
            // //console.log(resmetrics[0].matericsName) ;
            // } 
            // },[]);
            
          const [resKey, setkey]=useState(null);
          useEffect(()=>{
            getkeyData();
            async function getkeyData() {
            const res = await fetch("http://13.235.35.46:8090/api/Indicator/getKeyIndicator" , {
            method: 'POST',
            headers: {
              "Content-Type": "application/json",                     
              "Access-Control-Allow-Ordataigin": "*",
            },         
            body: JSON.stringify({
              "ProjectId":"8a8b855f7da2c698017da3d824090000",
              "GoalId":3
            }),
           });
           const apiRes= await res.json();    
           setkey(apiRes);           
          } 
          },[]);

    const renderkey=()=>{
    const handlekey = [];
    for(let i =0;i<resKey.length;i++){
    var keyname = resKey[i].indicatorName;
    var keyid = resKey[i].indicatorId;
    localStorage.setItem("indicatoreid",keyid);
    if(keyname!=""){
    handlekey.push({label:keyname,value:keyid})
    }}
    return handlekey;
    // console.log(indicatoreid)
   }
     const [resdata, setdata] = useState(null);
        async function getData() {
        const response = await fetch("http://13.235.35.46:8090/api/v2.0/milestone/fetchMilestones?projectId=8a8b855f7db23821017db3445d020000" , {
        method: 'GET',
    
        body: JSON.stringify(),
        });
        const apiResponse = await response.json();    
       setdata(apiResponse);   
          
       }
       useEffect(() => {
       getData();
       }, []); 

      const rendermilename=()=>{
      const handlemile = [];
       for(let i=0;i<resdata.length;i++){
       var milename =resdata[i].target_milestones;
     ///  console.log(milename)
       var mileid = resdata[i].id;  
       if(milename!=""){
        handlemile.push({
          label: milename,
          value: mileid
        })    
      }
  //  console.log(handlemile);
      }     
      return handlemile; 
      }

        const setMilestone = async (event) => {
        event.preventDefault();


        console.log("data",initialState1);
       // const response = await milestoneAPI().insertMilestone(initialState1);       
      
          notification.success({ message: "Milestone Details Saved..!" });
         //history.push(`${appRoutes.TASK_MANAGER}${appRoutes.MILESTONE}`);
         localStorage.setItem("setmile",JSON.stringify(initialState1))
         localStorage.getItem("setmile");
     //  resetForm();
        getData();
       }

         const setAddTask = async ( values) => { 
         console.log("inserttask",values);
         console.log(resKey)
         const foundItem = resdata.find(i => i.id == values.Milestone);
         console.log("name",values.Milestone)
         const newArr = [];
       
         values.Key.forEach(k => {
         let foundKey ;
         console.log(foundKey)
         for(var n=0;n<resKey.length;n++)
         if(k==resKey[n].indicatorId){
          foundKey = {"KeyIndicator": resKey[n].indicatorName, "KeyIndicatorId": resKey[n].indicatorId,"ProjectId":"8a8b855f7db23821017db3445d020000"}
          newArr.push(foundKey)
         }
        
        console.log(foundKey)
      //    if(foundKey) {
      // //   foundKey = {"KeyIndicator": foundKey.indicatorName, "KeyIndicatorId": foundKey.indicatorId,"ProjectId":"8a8b855f7db23821017db3445d020000"}
      //    newArr.push(foundKey)
      //    console.log(newArr)
      //    }
         })
        const newArray=[];
      //  console.log(resTeam)
   //     console.log(values.Team)
       
     values.Team.forEach(j =>{
       let foundTeam;
        for(var i =0;i<resTeam.length;i++)       {
          if(j==resTeam[i].id){  
            foundTeam ={"TeamMember": resTeam[i].name,"TeamMemId": resTeam[i].id,"ProjectId":"8a8b855f7db23821017db3445d020000"}
            newArray.push(foundTeam)
           }
          } 
        })

              const newValues = {
                //...values, 
               ProjectId:"8a8b855f7db23821017db3445d020000", 
               Team:newArray,
               StatusId:2,
           //   Category:"",
              KeyIndicator:newArr,   
              Description:values.Description,  
              TaskName:values.TaskName,
              TotalBudget:values.TotalBudget,
              Milestone:localStorage.getItem("nameMile"),
              MilestoneId:localStorage.getItem("id").trim(),
              StartDate: moment(values.StartDate).format("DD/MM/YYYY"),
              EndDate: moment(values.EndDate).format("DD/MM/YYYY")
              }
              console.log(newValues) 
              
           const response = await milestoneAPI().inserttask(newValues);
           notification.success({ message: "Task Details Saved..!" });
              console.log(newValues);
              localStorage.setItem("request",JSON.stringify(newValues));  
              localStorage.getItem("request");
         
      
        //    fetchTask();
          }

    
          const [budget, setBudget] = useState([null]);    
          async function getAvailableBudget(mileid) {  
   //  var mileid = localStorage.getItem("id")
       //     console.log(mileid)      
            const response = await fetch(`http://13.235.35.46:8090/api/v2.0/budget/getAvailableBudget2.0?MilestoneId=${mileid}` , {
              method: 'GET',
              headers: {
                "Content-Type": "application/json",           
                "Access-Control-Allow-Origin": "*",
              },
              body:JSON.stringify(),
            });
            const apiResBudget = await response.json();   
       // console.log(apiResBudget) 
            setBudget(apiResBudget);  
         //   console.log(apiResBudget.totalbudget)    
         //   console.log(budget)
           }

          useEffect(() => {      
            getAvailableBudget();
          }, []); 
  
          if(budget.totalbudget!="null" && budget.sumofbudgets!="null"){
            var AvailableBudget = budget.difference; 
               }
               else if(budget.totalbudget!="null"){
                 AvailableBudget=budget.totalbudget
               }  
               else{
                AvailableBudget=0
                budget.totalbudget=0
               }       

          const currency = function(number){ 
          
            return new Intl.NumberFormat('en-IN', {style: 'currency',currency: 'INR', minimumFractionDigits: 2}).format(number);
        };    

   // console.log(currency(budget.totalbudget))

        const[budgVal,setbudgVal]=useState(0)
    //    console.log(budgVal);
       if (budgVal>Number(budget.totalbudget)){
      //  window.confirm("Warning: The Input Budget Amount should not exceeds the Available Budget Amount")
        };

         //window.confirm("Warning: The Input Budget Amount should not exceeds the Available Budget Amount")
        

         
          const [categories, setCategories] = useState([]);
          useEffect(() => {
            getCateg();
          async function getCateg() {
            const response = await fetch("http://13.235.35.46:8090/api/budget/getCategory?ProjectId=8a8b855f7db23821017db3445d020000" , {
              method: 'GET',  
              headers: {
                "Content-Type": "application/json",                        
                "Access-Control-Allow-Origin": "*",
              },
              body: JSON.stringify(),
            });
            const apiResponse = await response.json();    
            setCategories(apiResponse);      
          }
        }, []); 


        const Duration_In=[  
    { label:"Days", value:"days" },
    {label:"Months", value:"months"},
    {label:"Year", value:"year"}
   ]

      
        const renderCategory=()=>{
         const categ = [];
        for(let i=0;i<categories.length;i++){
          var catlabel= categories[i].title;
          var catid = categories[i].id;
       if(catlabel!=""){
        categ.push({ label:catlabel,value: catid  })
       }
        }
      //  console.log(categ);  
        return categ;     
            }
       
             
              const requiredMsg = "This is a required field.";

           

            const MilestoneSchema = Yup.object().shape({
              duration: Yup.number().required(requiredMsg),
              durationIn:Yup.string().required(requiredMsg),
              keyActivities:Yup.string().max(240, 'Too Long Allowed 240 Charctors.!').required(requiredMsg),
              milestoneName:Yup.string().max(260, 'Too Long Allowed 246 Charctors.!').required(requiredMsg),
              description:Yup.string().max(546, 'Too Long Allowed 546 Charctors.!').required(requiredMsg),  
              budget:Yup.number().required(requiredMsg)
            });
            
            const [isAddMode, setIsAddMode] = useState(false);
            const [isEditMode, setIsEditMode] = useState(false);
            const [editableId, setEditableId] = useState(null);
            const [selectedPanel, setSelectedPanel] = useState(undefined); 
            const [initialState1, setInitialState1] = useState({
              token:"2021-12-23T11:06:22.588+00:00",
              projectId:"8a8b855f7db23821017db3445d020000",
              duration:0,
              durationIn:null,
              keyActivities:null,
              milestoneName: null,
             description: null,
             budget:0
            });
   
            const [isAddMilestoneForm, setIsAddMilestoneForm] = useState(false);
          
            const setDuration=(value)=>{
              console.log(value)
              setInitialState1({
                ...initialState1,
               
                duration:Number(value),
              });      
            }
            const setDurationIn=(value)=>{
              console.log("value",value)
              setInitialState1({
                ...initialState1,
                durationIn: value,
              });
              console.log(value)
            }
            const setkeyActivities=(value)=>{
              setInitialState1({
                ...initialState1,
                keyActivities: value,
              });
            }
            const setname=(value)=>{
              setInitialState1({
                ...initialState1,
                milestoneName: value,
              });
            }
            const setdesc=(value)=>{
              setInitialState1({
                ...initialState1,
                description: value,
              });
            }       
            const setbudget=(value)=>{
              setInitialState1({
                ...initialState1,
               budget : value,
              });
            }
        
  
    const formik = useFormik({
      initialValues: {
        duration:"",
        durationIn:"",
        keyActivities:"",
        milestoneName: "",
        description:"",
        budget:""
        
      },
  
    //   onSubmit: async (values, {resetForm}) => {
    //     if (values.milestoneName === "" || values.description === "" ) {
    //       notification.error(
    //         {message: "Please Fill All Details"}
    //       );
    //       return;
    //     }
  
    //     if (isAddMilestoneForm) {
    //       console.log("akcs");
    //       if (values.milestoneName === undefined || values.milestoneName === "") {
    //         notification.error(
    //           "Please Enter Milestone Name"
    //         );
    //         return;
    //       }   
    //       else {
    //         if (
    //           initialState1.MilestoneTypeData
    //             .map((data) => data.toLowerCase())
    //             .includes((values.milestoneName).toLowerCase())
    //         ) {           
    //         } 
    //         else {
    //           const newMilestoneData = initialState1.MilestoneTypeData;
    //           newMilestoneData.push(values.milestoneName);
    //           setInitialState1({
    //             ...initialState1,
    //             MilestoneTypeData: newMilestoneData,
    //           });
    //         }
    //       }
    //     }
    //     if (values.milestoneName) {
    //       values.type = values.milestoneName;
    //       delete values.milestoneName;
    //     } 
    //     else {
    //       values.type = selectedPanel;
    //     }  
    //     let newMilestoneData;
    //     if (!isEditMode) {
    //       newMilestoneData = initialState1.Milestonelist;
    //       newMilestoneData.push({...values});
    //     }    
    //     setInitialState1({
    //       ...initialState1,
    //       Milestonelist: newMilestoneData,
    //     }); 
    //     resetForm();
    //     setIsAddMode(false);
    //     setIsEditMode(false);
    //     setEditableId(null);
    //     setIsAddMilestoneForm(false);
    //   },
    //   validationSchema:MilestoneSchema,
     });

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

    const closeForm = () => {
      setIsAddMode(false);
      setIsEditMode(false);
      setEditableId(null);
      setIsAddMilestoneForm(false);
      setValues({
        duration:"",
        durationIn:"",
        keyActivities:"",
        milestoneName:"",
        description:"",
        budget:""
      });
    };


   const  onChangeMilestone = (e)=>{
    for(let i=0;i<resdata.length;i++){
      var milename =resdata[i].target_milestones;
    ///  console.log(milename)
      var mileid = resdata[i].id;  
      if(mileid==e){
        localStorage.setItem("nameMile",resdata[i].target_milestones)
     }
 //  console.log(handlemile);
     } 

    localStorage.setItem("id",e)
    setDefval(e)
  getAvailableBudget(e)
    }
   
    const [date,strDate]=useState("")
    const [defVal,setDefval]=useState("")
    const [show, setShow] = useState(false);
   const handleClose = () => setShow(false);
   const handleShow = (milestone,id) =>{ setShow(true);
    console.log("Milesttttttt",milestone,id);
    localStorage.setItem("nameMile",milestone)
    localStorage.setItem("id",id)
  var mileid =  localStorage.getItem("id")
  var milename = localStorage.getItem("nameMile")
     setDefval(milestone)
   console.log("name",milestone)
   getAvailableBudget(mileid);
 

const milestoneData = () => {

}
console.log(initialState1.value)
console.log(initialState1.duration)
console.log(initialState1.keyActivities)
console.log(initialState1.description)
console.log(initialState1.budget)
console.log(initialState1.milestoneName)
  console.log("defVal working...",defVal);}

  
    const menu = (
      <Menu onClick={handleMenuClick}>
          <Menu.Item key="1" icon={<UserOutlined />}>
            1st menu item
          </Menu.Item>    
        </Menu>
      );

    
      const getInitialValues=()=>{
        const editableData = props.data;
        if (editableData) {
          return {
            Milestone: editableData.Milestone,
            MilestoneId:editableData.MilestoneId,
            Description: editableData.Description,
            TaskName: editableData.TaskName,
            StartDate: editableData.StartDate,
            EndDate: editableData.EndDate,
            TotalBudget: editableData.TotalBudget,
            Key: editableData.Key,
            Team: editableData.Team,
          }
        }else{
          return {
            Milestone:"",
            MilestoneId:"",
            Description: "",
            TaskName: "",
            StartDate: "",
            EndDate: "",
            TotalBudget: "",
            Key: [],
            Team: [],       
          }
        }
       }
         return (
  
        <>
         <Modal 
          visible={show} 
          onCancel={handleClose}
          destroyOnClose
          cancelText="Cancel"
         width={900}    
          footer={null} 
            
          >
             
        <Formik  
          
          initialValues={getInitialValues()   }  enableReinitialize={true}
              validationSchema={Yup.object().shape({
              Description:Yup.string()
              .required("Description is required.")
              .max(590, "Maximum 590 characters allowed."),
              // Milestone: Yup.string()
              // .required("Milestone is required.")
              // .max(290, "Maximum 290 characters allowed."),
              TaskName: Yup.string().required("taskname is required."),
              StartDate: Yup.date().required("StartDate is required."),
              EndDate: Yup.date().required("EndDate is required."),
              TotalBudget: Yup.string().required("budget is required."),             
              Key:Yup.array().required("Indicators is required."),
            
              Team:Yup.array().required("Team is required.")
          })}
        
   onSubmit={(values) => setAddTask(values)}
         >
        {({ submitForm,touched, errors,resetForm}) => {
            return (
<>
              <p  style={{paddingTop:"50px",paddingLeft:"50px",color:"#39364",fontfamily:"Poppins",fontSize:"20px",fontStyle:"normal",lineHeight:"26px",fontWeight:"600"}}>New Task</p>
              <Form style={{padding:"50px"}}>
                 <Row  justify="space-between" gutter={[16, 8]}>
                 
                  <Col span={24}>
                  <label style={{ color:"#39364",fontfamily:"Poppins",fontWeight:"600"}}>Milestone</label>            
                    <Field
                      name="Milestone"                  
                      component={SelectBox}
                      onChange={(e)=>{onChangeMilestone(e)}}
                    
                     
                   
                  
                      
                      value={defVal}
                      errorText={touched.Milestone ? errors.Milestone : ""}   
                     options={rendermilename()}
                    />
                   
                  </Col>
                  <Col span={24}>
                    <Field
                      name="TaskName"
                      component={Input}
                      placeholder="Task Name"
                      errorText={touched.TaskName ? errors.TaskName : ""}
                    />
                  </Col>
                  <Col span={24}>
                    <Field
                      inputType="textarea"
                      name="Description"
                      component={Input}
                      placeholder="Add a Description (optional)"
                      errorText={touched.Description ? errors.Description : ""}
                    />
                  </Col>
                  </Row>
                              <Col span={12} style={{display:"inline-block",marginTop:"20px" , width:"45%"}}>
                                 <Field  
                                  name="StartDate"
                                  component={DatePicker}
                                  format="DD/MM/YYYY"
                                  type="date"
                                  placeholder="Start Date"                             
                                  disabledDate={(d) => !d || d.isBefore(new Date())}
                                  onChange={(e)=>{console.log("dattteeeeeee",e._d)
                                strDate(e._d)
                                }}
                                  errortext={ errors.StartDate && touched.StartDate ? errors.StartDate : ""}   
                                />
                                </Col>
                                <Col span={12} style={{display:"inline-block",marginTop:"20px",width:"45%",marginLeft:"60px"}}>
                                <Field
                                  name="EndDate"
                                  type="date"
                                  component={DatePicker}
                                  format="DD/MM/YYYY"
                                  placeholder="End Date"
                                  disabledDate={(d) => !d || d.isBefore(date)}
                                  errortext={ errors.EndDate && touched.EndDate ? errors.EndDate : ""}
                                />
                               </Col>
                                  <Row>

                                  <Col style={{marginTop:"20px"}} span={24}>
                                  <label style={{ color:"#39364",fontfamily:"Poppins",fontWeight:"600"}}>Category</label>   
                                                <Field
                                                  name="Category"                  
                                                  component={SelectBox}
                                                  placeholder="Select Category for the budget"
                                                //  errorText={touched.Category ? errors.Category : ""}   
                                                 options={  renderCategory()}           
                                                />
                                              
                                              </Col>
                                  <Col style={{marginTop:"20px"}} span={24}>
                                    <label style={{display:"inline", color:"#39364",fontfamily:"Poppins",fontWeight:"600"}}>Budget   <span style={{paddingLeft:"10px", fontSize:"13px",color:"green",paddingRight:"10px"}}>(Total Budget {currency(budget.totalbudget)} , Available Budget { currency(AvailableBudget)} )</span>  </label>
                                    
                                   {/* // <p style={{paddingLeft:"10px", fontSize:"10px",color:"green",paddingRight:"10px"}}>(Total Budget {currency(budget.totalbudget)} , Available Budget { currency(AvailableBudget)} )</p> */}
                               
                                    <p style={{color:"blue",fontSize:"13px",fontWeight:"400",paddingTop:"10px"}}>Set a budget for this task</p>
                                  
                                    <Field
                                      name="TotalBudget"
                                      component={Input}
                                      placeholder="₹ 20,000"
                                      onChange={(e)=>setbudgVal(e.target.value)}
                                      errorText={touched.TotalBudget ? errors.TotalBudget : ""}                 
                                    />
                                    { (budgVal>Number(budget.totalbudget))? <p style={{color:"red",fontSize:"10px"}}>The Input Budget Amount should not exceed the Available Budget Amount </p>:null
          }
                                  </Col>
                                  <Col span={24} style={{marginTop:"20px",paddingBottom:"10px"}}>
                                  <label style={{ color:"#39364",fontfamily:"Poppins",fontWeight:"600"}}>Key Indicators</label>
                                  <p style={{color:"blue",fontSize:"13px",fontWeight:"400"}}>Select the key indicators to measure the success of this task</p>
                                   <p style={{color:"lightgrey"}}>Select Key Indicators</p>
                                    <Field
                                      name="Key"
                                      component={SelectBoxMultiple}                          
                                      errorText={touched.Key ? errors.Key : ""}
                                      options={renderkey()}
                                    />
                                  </Col>
          
                                    <Col span={24} style={{marginTop:"20px"}}>
                                    <label style={{ color:"#39364",fontfamily:"Poppins",fontWeight:"600"}}>Team</label>
                                    <p style={{color:"blue",fontSize:"13px",fontWeight:"400"}}>Assign a team member to this task</p>
                                    <p style={{color:"lightgrey"}}>Select Team Members</p>
                                    <Field
                                      name="Team"
                                      component={SelectBoxMultiple}
                                  
                                      errorText={touched.Team ? errors.Team : ""}
                                      options={renderTeam()}
                               
                                    />
                                  </Col>      
                                </Row>

                                  <Row justify="center" className="beneficiaryForms mt-2">
                                    <Col style={{marginTop:"20px"}}>
                                      <Button
                                        // onClick={() => {       
                                        //   setAddFormSuccess (true);
                                        // }}
                                    
                                        key="back"
                                        onClick={submitForm}
                                       type="primary"
                                      >
                                      Add Task
                                      </Button>
                                    </Col>
                                  </Row>

                          </Form> </>
                        );
                       
                      }}
                    </Formik>         
                  </Modal>
        
                  <div className="secondtopbanner">
        <div className="col"  >

          <Dropdown overlay={menu}>
            <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
              <span>Active Tasks  <DownOutlined style={{ marginLeft: "5%" }} /></span>
            </a>
          </Dropdown>


        </div>

        <div class="d-flex justify-content-end">
          <div className="col">
            <Formik>
              <Form>

                <Col span={24} style={{ display: "inline-block", width: "150px", fontWeight: "15px" }} >

                  <Dropdown overlay={menu}>
                    <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                      <img src={list} alt="" style={{ height: "10px", width: "10px", marginRight: "5px" }} />
                      <span>Classic View   <DownOutlined style={{ marginLeft: "5px" }} /></span>
                    </a>
                  </Dropdown>
                </Col>
              </Form>
            </Formik>

          </div>

          <div className="addtask">
            <button onClick={()=>handleShow()} style={{ color: "#39364F", backgroundColor: "white", height: "20px" }} className="signbutton" >
              ADD TASK
            </button>
          </div>
        </div>
      </div>

      <div className="taskdata">
                   
                        {/* <Steps  style={{display: "inline-block",  background:"white", padding:"10px",margin:"10px"}} >
                                  {steps.map((item) => (
                            <Step 
                            icon={item.icon} title={item.title}   
                          />
                            ))}
                              
                        </Steps>
                      <Button
                        type="underlined"
                        style={{color:"blue",border:"white", margin:"10px",width:"200px",padding:"20px"}}
                        block                      
                        icon={<PlusOutlined />}
                         onClick={handleShow}
                      >
                        New Task
                      </Button> */}
                      {/* {steps.map((item, index) => {
                                    return (
                                      
                                      <NewTask
                                      key={item.id}                                     
                                      id={item.id}
                                      title={item.title}  
                                     icon={item.icon}                                    
                                   //  link={getLink(item)}
                                      click={handleShow}
                                      hasButton={item.hasButton || true}
                                      buttonTitle={item.buttonTitle || ""}
                                      borderColorValue={item.borderColorValue || ""}
                                      />
                                    );
                                  })} */}
                                  
                                 
                                   {resdata && (
<div className="stepdata">
{resdata.map((data, index) =>(
  (data.target_milestones!="")?
                                    <NewTask  key={index} 
                                    click={()=>{handleShow(data.target_milestones,data.id)}}                          
                                    hasButton={data.hasButton || true}
                                    category={renderCategory()}
                                    teammembers={renderTeam()}
                                    title={data.target_milestones} id={data.id}  />  :null                         
                                    ))}
                                    </div>
                                     )}

    </div>
        <div className="milestone-stepper" style={{display: "block", width:"93%", marginLeft:"55px", padding:"50px",paddingTop:"5px",margin:"50px",marginTop:"0px"}}>
            <FormikProvider value={formik}>
                  {isAddMilestoneForm && (
                        <div className="arrayInner"
                         style={{                            
                                  boxShadow: "0px 0px 20px rgb(81 74 129 / 7%)",
                                  borderRadius: "12px !important",
                                  backgroundColor: "#fff !important",
                                  borderBottom: "0px",
                                  padding: "2rem" }}
                               
                        >        
                                <Form
                                   className="formStyles"
                                   onSubmit={(values) => setMilestone(values)}
                               
                                >
                                        <div className="col-sm-12 text-right">
                                          <MinusOutlined
                                          onClick={() => closeForm()}
                                        />
                                        </div>
                                       
                                        <div className="row pt-3">
                                        <div className="col-sm-6 formStyles">
                                          <Field
                                            name="duration"
                                          // value={values.milestoneName}
                                            
                                            className="form-control number"
                                            component={Input}
                                            placeholder="Duration"
                                            type="number"
                                         onChange={(e) => {setDuration(e.target.value)  }}
                                            errorText={errors.duration && touched.duration ? errors.duration : ""}
                                          />
                                        </div>
                                
                                        <div className="col-sm-6 formStyles">
                                          <Field
                                            name="durationIn"           
                                            options={Duration_In}
                                            component={SelectBox}
                                            placeholder="Duration In"
                                            onChange={(e) => {setDurationIn(e) 
                                             localStorage.setItem("durationIn",e)
                                             localStorage.getItem("durationIn")
                                            console.log(e)
                                  
                                            }}                         
                                            errorText={errors.durationIn && touched.durationIn ? errors.durationIn : ""}
                                          />
                                        </div>
                                   </div>
                                   <div className="row pt-3">
                                        <div className="col-sm-6 formStyles">
                                          <Field
                                            name="keyActivities"
                                          // value={values.milestoneName}
                                            type="text"
                                            className="form-control"
                                            component={Input}
                                            placeholder="Key Activities"
                                       onChange={(e) => {setkeyActivities(e.target.value)  }}
                             
                                            errorText={errors.keyActivities && touched.keyActivities ? errors.keyActivities : ""}
                                          />
                                        </div>
                                  
                                        <div className="col-sm-6 formStyles">
                                          <Field
                                            name="milestoneName"
                                          // value={values.milestoneName}
                                            type="text"
                                            className="form-control"
                                            component={Input}
                                            placeholder="Milestone Name"
                                            onChange={(e) => {setname(e.target.value)  }}
                             
                                            errorText={errors.milestoneName && touched.milestoneName ? errors.milestoneName : ""}
                                          />
                                        </div>
                                   </div>


                                   <div className="row pt-3">
                                          <div className="col-sm-6 formStyles">
                                            <Field 
                                              name={`description`}
                                             // value={values.description}
                                             inputType="textarea"
                                              className="form-control"
                                              component={Input}
                                              placeholder="Description"
                                              onChange={(e) => {setdesc(e.target.value)  }}
                                            errortext={ errors.description && touched.description ? errors.description : ""}
                                            />
                                          </div>
                                
                                          <div className="col-sm-6 formStyles">
                                            <Field
                                              name={`budget`}
                                             // value={values.description}
                                               type="text"
                                              className="form-control"
                                              component={Input}
                                              placeholder="Budget"
                                              onChange={(e) => {setbudget(e.target.value)  }}
                                            errortext={ errors.budget && touched.budget ? errors.budget : ""}
                                            />
                                          </div>
                                   </div>
                                   
                                   <div className="row pt-3">
                                          
                                              <div className="col-sm-2">
                                                <Button 
                                                
                                                  htmlType="submit"
                                                  className="addcofoundr nextbutton"
                                                  block
                                                //  {isEmpty}
                                           //    disabled={milestoneData()}
                                                >
                                                  ADD
                                                </Button>
                                              </div>
                                    </div>
                               </Form>

                         </div>
                          )}
                            
                        <div  >
                              <Button 
                                  
                                    onClick={() => {       
                                      setIsAddMilestoneForm(true);
                                    }}
                                  
                                    className="milestone "
                               >
                                    + ADD MILESTONE
                              </Button>
                             
                        </div>
                 </FormikProvider>
        </div>


        
        </>
  
    )
  
};

export default Milestone;


