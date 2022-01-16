import axios from "axios";
import React from "react";
import apiRequest from "../utils/api-utils/api-request";
import fetcher, { AUTH_TOKEN, BASE_URL } from "./config";
import { useDispatch, useSelector } from "react-redux";
import apirequest from "../utils/api-utils/api-request";

const Organisationapi = () => {
  const token = sessionStorage.getItem("access_token");
  const refreshToken = sessionStorage.getItem("refresh_token");
  const userDetails = sessionStorage.getItem("userDetails");
  const organisationId = sessionStorage.getItem("organisationId");

  return {
    addorOrganization: async (formData) => {
      const organizationUpdate = sessionStorage.getItem("organizationUpdate");
      return apiRequest({
        method: organizationUpdate === "true" ? "PUT" : "POST",
        data: formData,
        url: "/social-org/v1/organisation",
      });
    },
    fetchOrganization: async (orgId) => {
      return apiRequest({
        method: "GET",
        url: `/social-org/v1/organisation/${orgId || organisationId}`,
      });
    },
    fetchPercent: async () => {
      const organisationId = sessionStorage.getItem("organisationId");
      if (organisationId) {
        return apiRequest({
          url: `/social-org/v1/percentage?organisationId=${organisationId}`,
        });
      } else {
        return null;
      }
    },
    addorUpdatelocation: async (formData) => {
      const locationUpdate = sessionStorage.getItem("locationUpdate");
      return apiRequest({
        method: locationUpdate === "true" ? "PUT" : "POST",
        data: formData,
        url: "/social-org/v1/organisation/address/",
      });
    },
    fetchOverview: async (organisationId) => {
      return apiRequest({
        url: `/social-org/v1/organisation/${organisationId}`,
      });
    },
    searchCompanyDetails: async (data) => {
      return apiRequest({
        method: "POST",
        data: data,
        url: "/kyc/v1/signzy/cin/detailed/search",
      });
    },
    fetchAddress: async (organisationId) => {
      return apiRequest({
        url: `/social-org/v1/organisation/address/${organisationId}`,
      });
    },
    addorUpdatetrackrecord: async (formData) => {
      const trackRecordUpdate = sessionStorage.getItem("trackRecordUpdate");
      return apiRequest({
        method: trackRecordUpdate === "true" ? "PUT" : "POST",
        data: formData,
        url: "/social-org/v1/organisation/budget-donor-history",
      });
    },
    fetchTrackRecords: async (organisationId) => {
      return apiRequest({
        url: `/social-org/v1/organisation/budget-donor-history/${organisationId}`,
      });
    },
    addorLeadership: async (formData) => {
      return apiRequest({
        method: formData.id ? "PUT" : "POST",
        data: formData,
        url: "/social-org/v1/organisation/leadership",
      });
    },
    fetchLeadership: async (organisationId) => {
      return apiRequest({
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "Access-Control-Allow-Origin": "*",
        },
        url: `/social-org/v1/organisation/leadership/${organisationId}`,
      });
    },
    addorPurpose: async (formData) => {
      const purposeUpdate = sessionStorage.getItem("purposeUpdate");
      return apiRequest({
        method: purposeUpdate === "true" ? "PUT" : "POST",
        data: formData,
        url: "/social-org/v1/organisation/purpose",
      });
    },
    fetchPurpose: async (organisationId) => {
      return apiRequest({
        url: `/social-org/v1/organisation/purpose/${organisationId}`,
      });
    },
    fetchCountries: async () => {
      return apiRequest({
        method: "GET",
        url: `/beneficiary/v1/countries`,
      });
    },
    addordocumentkyc: async (formValues) => {
      var data = JSON.stringify({
        ifscCode: formValues ? formValues.ifscCode : "",
      });
      const documentUpdate = sessionStorage.getItem("documentUpdate");
      const response = await fetcher("/kyc/v1/signzy/bank/ifsc/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "Access-Control-Allow-Origin": "*",
        },
        body: data,
      });
      const apiResponse = await response.json();
      console.log("dockyc", apiResponse);
      return apiResponse;
    },
    addorBenificiary: async (formData) => {
      const beneficiaryUpdate = sessionStorage.getItem("beneficiaryUpdate");
      const beneficiaryId = sessionStorage.getItem("beneficiaryId");
      const beneficiaryUpdateID = sessionStorage.getItem("beneficiaryUpdateID");

      return apiRequest({
        method: beneficiaryUpdate === "true" ? "PUT" : "POST",
        data: formData,
        url:
          beneficiaryUpdate === "true"
            ? `/social-org/v1/organisation/beneficiary-history/${beneficiaryUpdateID}`
            : `/social-org/v1/organisation/beneficiary-history/`,
      });
    },
    fetchBenificiary: async (organisationId) => {
      return apiRequest({
        url: `/social-org/v1/organisation/${organisationId}/beneficiary-history`,
      });
    },
    uplaodImageAndGetURL: async (file) => {
      let formData = new FormData();
      formData.set("file", file);
      formData.set("fileCategory", "SOCIAL_ORGANISATION");

      return apiRequest({
        method: "POST",
        data: formData,
        url: "/file-upload/v1/file/upload",
        headers: {
          "Content-Type": "multipart/form-data",
          "Access-Control-Allow-Origin": "*",
        },
      });
    },
    addorDocument: async (formData) => {
      const DocumentUpdate = sessionStorage.getItem("documentUpdate");
      const organisationId = sessionStorage.getItem("organisationId");
      const documentId = sessionStorage.getItem("documentId");

      const response = await fetcher(
        DocumentUpdate === "true"
          ? `/social-org/v1/organisation/financial-documents/${documentId}`
          : `/social-org/v1/organisation/financial-documents`,
        {
          method: DocumentUpdate === "true" ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify(formData),
        }
      );
      const apiResponse = await response.json();
      return apiResponse;
    },
    fetchDocument: async (organisationId) => {
      return apiRequest({
        url: `/social-org/v1/organisation/${organisationId}/financial-documents`,
      });
    },
    fetchCountryState: async () => {
      return apiRequest({
        url: `/beneficiary/v1/countries-with-state`,
      });
    },
    addorLegal: async (formData) => {
      const DocumentUpdate = sessionStorage.getItem("LegalUpdate");
      const organisationId = sessionStorage.getItem("organisationId");
      const LegalId = sessionStorage.getItem("legalId");

      const response = await fetcher(`/social-org/v1/organisation/legal-documents`, {
        method: DocumentUpdate === "true" ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(formData),
      });
      const apiResponse = await response.json();
      return apiResponse;
    },
    fetchLegal: async (organisationId) => {
      return apiRequest({
        url: `/social-org/v1/organisation/${organisationId}/legal-documents`,
      });
    },
    deleteMissionStatement: async (statementId, organisationId) => {
      return apiRequest({
        url: `/social-org/v1/organisation/purpose/mission/${statementId}?organisationId=${organisationId}`,
        method: "DELETE",
      });
    },

    fetchSectors: async () => {
      return apiRequest({
        url: `/social-org/v1/sectors`,
      });
    },

    updateSignedAgreement: async (fileUrl) => {
      const formData = {
        signedAgreementUrl: fileUrl,
        organisationId,
      };
      return apiRequest({
        method: "PUT",
        data: formData,
        url: "/social-org/v1/organisation/signed-aggrement",
      });
    },

    verifyUid: async (payload) => {
      const data = {
        uid: payload,
        task: "verifyAadhaar",
      };
      const url = "/kyc/v1/signzy/aadhaar/verification";
      return apiRequest({
        method: "POST",
        data,
        url,
      });
    },
    extractUid: async (payload) => {
      const data = {
        imageUrls: payload,
        type: "aadhaar",
      };
      const url = "/kyc/v1/signzy/extraction";
      return apiRequest({
        method: "POST",
        data,
        url,
      });
    },
    verifyPanCard: async (payload) => {
      const data = {
        pan: payload,
      };
      const url = "/kyc/v1/signzy/pan/fetch";
      return apiRequest({
        method: "POST",
        data,
        url,
      });
    },
    verifyAml: async (id) => {
      const data = {
        din: id,
      };
      const url = "/kyc/v1/signzy/aml";
      return apiRequest({
        method: "POST",
        data,
        url,
      });
    },
    submitforValidation: async (organisationId) => {
      return apiRequest({
        method: "POST",
        url: `/social-org/v1/organisation/${organisationId}/submit`,
      })
    },
    getAmlStatus: async (memberId) => {
      return apiRequest({
        url: `/social-org/v1/organisation/leadership/${memberId}/aml-check`,
      });
    },
    updateAmlById: async (memberId, amlChecked, orgId) => {
      const data = {
        memberId,
        organisationId: orgId,
        amlChecked
      };
      return apiRequest({
        method: "PUT",
        data,
        url: "/social-org/v1/organisation/leadership/aml-check",
      });
    },
  };
};

export default Organisationapi;
