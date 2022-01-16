import React, { Component } from "react";
import { OverviewBox } from "../../organisationForm/overviewBox/overviewBox";
import { Redirect, Route } from "react-router";
class ProgramOverview extends Component {
  state = {
    overviewBoxConfig: [
      {
        id: 1,
        title: "Basics",
        description: "All the General details for your program",
        percent: "15%",
        time: "approx 25 mins",
        link: "/programCreation",
      },
      {
        id: 2,
        title: "Team",
        description:
          "Detail out primary contact and the core team of the program",
        percent: "0%",
        time: "approx 25 mins",
        link: "/programCreation",
      },
      {
        id: 3,
        title: "Metrics",
        description: "Define your data and metrics as per IRIS",
        percent: "0%",
        time: "approx  25 mins",
        link: "/programCreation",
      },
      {
        id: 4,
        title: "Budget",
        description: "Provide budget and breakdown details",
        percent: "0%",
        time: "approx 15 mins",
        link: "/programCreation",
      },
      {
        id: 5,
        title: "Donor",
        description: "Help the donor understand their role in this project",
        percent: "0%",
        time: "approx 15 mins",
        link: "/programCreation",
      },

      {
        id: 6,
        title: "Monitoring and Reporting",
        description:
          "Allow the donor to understand the internal and external monitoring and reporting standards",
        percent: "0%",
        time: "approx 15 mins",
        link: "/programCreation",
      },
    ],
  };


  
  handleclick = (link) => {
    // console.log(link);
  };

  
  render() {
    const access = sessionStorage.getItem("access_token");
    let header = sessionStorage.getItem("headerVisibility");

    if (access === null) {
      return <Redirect to="/login" />;
    }

    return (
      <div className=" container-pad-60">
        <div className="pad-left-14">
          <h3>Ummeed</h3>
          <p>One last step to go!</p>
        </div>

        <div className="pad-left-14">
          <strong>Make sure you have your team approval </strong>
          <span className="marginLeft10">Last Save 10 min ago</span>
        </div>

        <div className="col-sm-12 pad-top-4">
          {this.state.overviewBoxConfig.map((item, index) => {
            return (
              <OverviewBox
                key={item.id}
                id={item.id}
                title={item.title}
                description={item.description}
                percent={item.percent}
                time={item.time}
                link={item.link}
                click={(link) => this.handleclick(link)}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default ProgramOverview;
