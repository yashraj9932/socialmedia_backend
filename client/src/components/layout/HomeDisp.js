import React from "react";

const HomeDisp = ({ post, name }) => {
  const onClick = (e) => {};

  const { caption, picture } = post;
  return (
    <div
      className="row"
      style={{ borderBottom: "1px solid black", paddingTop: "4%" }}
    >
      <div className=" text-center" style={{ margin: "0 auto " }}>
        <p>
          <strong>{name}</strong>
        </p>
        <img
          src={`/uploads/${picture}`}
          alt="picc"
          style={{
            maxWidth: "100%",
            maxHeight: "320px",
          }}
        />
        <div style={{ margin: "5% auto" }}>
          <p>
            <strong>{caption}</strong>
          </p>
          <span id="heart" onClick={onClick}>
            <i className="fas fa-heart" aria-hidden="true"></i>{" "}
          </span>
        </div>
      </div>
    </div>
  );
};

export default HomeDisp;
