import React from "react";
import { connect } from "react-redux";
import formFields from "./formFields";
import { withRouter } from "react-router-dom";
import * as actions from "../../actions";

const SurveyFormReview = ({ onCancel, formValues, submitSurvey, history }) => {
  const reviewFields = formFields.map(({ name, label }) => {
    return (
      <div style={{ marginBottom: "45px" }} key={name}>
        <label style={{ fontSize:"1.4rem" }}>{label}</label>
        <div>{formValues[name]}</div>
      </div>
    );
  });

  return (
    <div>
      <h5 style={{ marginBottom: "25px", textAlign: "center" }}>
        Please confirm your entries
      </h5>
      {reviewFields}
      <button
        className="yellow darken-2 white-text btn-flat"
        onClick={onCancel}
      >
        Back
        <i className="material-icons right">arrow_back</i>
      </button>
      <button
        onClick={() => submitSurvey(formValues, history)}
        className="green btn-flat right white-text"
      >
        Send Survey
        <i className="material-icons right">email</i>
      </button>
    </div>
  );
};

function mapStateToProps(state) {
  return { formValues: state.form.surveyForm.values };
}

export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));