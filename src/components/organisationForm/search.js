import React, { Component } from "react";
import { InputField } from "../form/inputField";

class OrganisationSearch extends Component {
  state = {
    parameters: [
      {
        id: 1,
        name: "search",
        placeholder: "",
        labelName: "Registration Number or Company name",
        type: "text",
        spacing: "12",
        background: "none",
      },
    ],
  };
  render() {
    return (
      <>
        {this.state.parameters.map((item, index) => {
          return (
            <InputField
              id={item.id}
              name={item.name}
              placeholder={item.placeholder}
              labelName={item.labelName}
              spacing={item.spacing}
              background={item.background}
            />
          );
        })}
      </>
    );
  }
}

export default OrganisationSearch;
