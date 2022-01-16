import axios from "axios";
import React from "react";
import apiRequest from "../utils/api-utils/api-request";
import fetcher, { AUTH_TOKEN, TASK_MANAGERS_BASE_URL } from "./config";
import { useDispatch, useSelector } from "react-redux";
import apirequest from "../utils/api-utils/api-request";



const milestoneAPI = () => {
   
     const token = sessionStorage.getItem("access_token");
    // const refreshToken = sessionStorage.getItem("refresh_token");
    // const userDetails = sessionStorage.getItem("userDetails");
    // const organisationId = sessionStorage.getItem("organisationId");
   
    return{
     
        insertMilestone: async (formdata) => {
            return apiRequest({
                method: "POST",
                data : formdata,
                
                url: "http://13.235.35.46:8090/api/v2.0/milestone/insertMilestone",
              })
            },   

        // displayMilestone: async()=>{
        //   const response = await fetcher(`http://13.235.35.46:8090/api/Milestone/SelectMilestone`, {
        //     method: "POST",
        //     headers: {
        //       "Content-Type": "application/json",           
        //       "Access-Control-Allow-Origin": "*",
        //     },
        //     body: JSON.stringify(),
        //   });
        //   const apiResponse = await response.json();
        //   return apiResponse;
        // },

      

        inserttask: async (formData) => {
           return apiRequest({
            method: "POST",
            data :formData,
            url: "http://13.235.35.46:8090/api/v2.0/task/insertTask",
          })
        } ,

        saveBudget: async(formData)=>{
          return apiRequest({
            method: "POST",
            data :formData,
            url: "http://13.235.35.46:8090/api/v2.0/task/insertTaskBudget",
          })

        },
      getTeamMembers: async () =>{
        const response = await fetcher(`http://13.235.35.46:8090/api/Milestone/getTeam`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",           
              "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify(),
          });
          const apiResponse = await response.json();
          return apiResponse;
        },

        // getKeyIndicators : async () => {
        //   const response = await fetcher(`http://13.235.35.46:8090/api/Indicator/getKeyIndicator`, {
        //     method: "POST",
        //     headers: {
        //       "Content-Type": "application/json",           
        //       "Access-Control-Allow-Origin": "*",
        //     },
        //     body: JSON.stringify(),
        //   });
        //   const apiResponse = await response.json();
        //   return apiResponse;
        // }

      }
    };
      
export default milestoneAPI;