import React from "react";
import { useHistory } from "react-router";
import appRoutes from "../../constants/app-routes";

/** 
 
Beneficiary Home Page for Health Worker Role
 */
const BeneficiaryHomeHW = ({ projectId }) => {
  const history = useHistory();
  return (
    <div className="row justify-content-center">
      <p className="m-0 pb-3">Assign Vaccinated Beneficiaries to respective vials</p>

      <div className="col-12 col-lg-6 mt-4">
        <button
          className="formsubmit"
          onClick={() => history.push(`${appRoutes.BENEFICIARY}${appRoutes.VIAL_NUMBER}/assign?projectId=${projectId}`)}
        >
          ASSIGN VIAL NUMBER
        </button>
      </div>
      <div className="col-12 col-lg-6 mt-4">
        <button
          className="formsubmit"
          onClick={() => history.push(`${appRoutes.BENEFICIARY}${appRoutes.VIAL_NUMBER}/search?projectId=${projectId}`)}
        >
          VIAL NUMBER SEARCH
        </button>
      </div>
    </div>
  );
};
export default BeneficiaryHomeHW;
