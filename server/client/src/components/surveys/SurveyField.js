import React from 'react';

export default function SurveyField({ input, label, meta : { error, touched } }) {
    return (
      <div>
        <label style={{ fontSize: "1.4rem" }}>{label}</label>
        <input {...input} style={{ marginBottom: "5px" }} />
        <div
          className="red-text"
          style={{ marginBottom: "20px", fontWeight: "bold" }}
        >
          {touched && error}
        </div>
      </div>
    );
}
