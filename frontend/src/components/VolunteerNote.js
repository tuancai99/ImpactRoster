import { useParams, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Axios from "axios";
import "../style/VolunteerNote.css";
import { getClickCount } from "../utils/clickUtils";

const VolunteerNote = () => {
  const { id } = useParams();
  const [volunteerData, setVolunteerData] = useState(null);
  const [clickNum, setClickNum] = useState(0);
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  useEffect(() => {
    Axios.get(`http://localhost:5001/api/bog/users/${id}`)
      .then((response) => {
        setVolunteerData(response.data);
        setClickNum(getClickCount(id));
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  return (
    <div>
      {volunteerData ? (
        <div>
          <div className="header">
            <button onClick={handleGoBack} className="backButton">
              Go Back
            </button>
          </div>
          <div className="contentContainer">
            <div className="first">
              <div className="hihi">
                <div>
                  <div className="volunteer_name">
                    {volunteerData.name}{" "}
                    <div
                      className={`online-indicator ${
                        volunteerData.status ? "green" : "gray"
                      }`}
                    ></div>
                  </div>
                  <div>{volunteerData.hero_project}</div>
                </div>

                <img
                  src={volunteerData.avatar}
                  alt={`Avatar of ${volunteerData.name}`}
                  className="avatar"
                />
              </div>
              <div className="list">
                <div>Email: {volunteerData.email}</div>
                <div>Phonenumber: {volunteerData.phone}</div>
                <div>Id: {volunteerData.id}</div>
                <div>Rating: {volunteerData.rating}</div>
                <div>Click Count: {clickNum}</div>
              </div>
            </div>
            <div className="second">
              <h1>Notes: </h1>
              <div>{volunteerData.notes}</div>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default VolunteerNote;
