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
      <div className="col-md-6">
        <div className="row ">
          <div className="col-md-4">Posts</div>
          <div className="col-md-4">Following</div>
          <div className="col-md-4">Followers</div>
        </div>
      </div>
    </div>
  );
};

export default MainDetail;
