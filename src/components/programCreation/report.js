import React, {useEffect, useState} from "react";
import userAPI from "../../api/userAPI";

const Report = () => {
  const [ummeedID, setUmmeedID] = useState("");
  const [arpanID, setArpanID] = useState("");

  useEffect(async () => {
    const response = await userAPI().getUserDetails();

    if (response.data){
      const umeedData = response.data?.projects && response.data.projects.filter(data => data.project.toLowerCase() === "ummeed");

      const ummeedId = umeedData && umeedData[0]?.id || "";
      setUmmeedID(ummeedId);

      const arpanData = response.data?.projects && response.data.projects.filter(data => data.project.toLowerCase() === "arpan");

      const arpanID = arpanData && arpanData[0]?.id || "";
      setArpanID(arpanID);

    }
  },[]);

  return (
    <iframe
      // src="http://3.7.81.85/views/Ummed_17_09_21/VaccinationTracker?:showAppBanner=false&:display_count=n&:showVizHome=n&:origin=viz_share_link:embed=y"
      // src="http://3.7.81.85/views/Ummeed_v2/BeneficiaryTracker?:iid=1:embed=y"
      // src="http://ummeedreport-test.consumerlinks.in/views/Ummeed_v2/BeneficiaryTracker?:iid=1:embed=y"
      src={ummeedID ? `http://ummeedreport-test.consumerlinks.in/views/Ummeed_Extract/BeneficiaryTracker?project_id=${ummeedID}&:iid=2:embed=y` : `http://ummeedreport-test.consumerlinks.in/views/RationDashboard_extract/BeneficiaryTracker?project_id=${arpanID}&:iid=1embed=y`}
      width="100%"
      height="1000"
    />
  );
}

export default Report;
