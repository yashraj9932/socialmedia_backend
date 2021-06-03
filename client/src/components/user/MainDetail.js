import React from "react";

const MainDetail = () => {
  return (
    <div className="row">
      <div className="col-md-6 ">
        <div className="text-center">
          <img
            src="../../../picture.jpeg"
            alt="profilepic"
            className="rounded-circle"
          />
        </div>
      </div>
      <div className="col-md-6 text-center" style={{ marginTop: "5%" }}>
        <div className="row ">
          <div className="col-md-4">
            <strong>121</strong>
            <p>Posts</p>
          </div>
          <div className="col-md-4">
            <strong>300</strong>
            <p>Following</p>
          </div>
          <div className="col-md-4">
            <strong>520</strong>
            <p>Followers</p>
          </div>
        </div>
        <p style={{ marginTop: "5%" }}>Yahan Par Bio Jayega</p>
      </div>
    </div>
  );
};

export default MainDetail;
