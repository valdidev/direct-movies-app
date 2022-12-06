import { useSelector } from "react-redux";
import { contentData } from "../../slices/contentSlice";
import { useEffect, useState } from "react";
import { Spinner } from "../../components/Spinner/Spinner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API } from "../../utils/httpClient";
import CyberButton from "../../components/CyberButton/CyberButton";
import "./LoanDetails.css";

export const LoanDetails = () => {
  const { content } = useSelector(contentData);
  const [isLoading, setIsLoading] = useState(true);

  let cleanDateOfReturn = content.date_of_return.split("T")[0];

  let cleanDateOfLoan = content.date_of_loan.split("T")[0];

  const localStorageToken = localStorage.getItem("jwt");

  const navigate = useNavigate();

  const body = {
    id_loan: content.id_loan,
  };

  const returnContent = async () => {
    let config = {
      headers: { Authorization: "Bearer " + localStorageToken },
    };
    await axios.patch(`${API}/loans/myloans/return`, body, config);
    navigate("/profileloans");
  };

  useEffect(() => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading)
    return (
      <div className="container-fluid vh-100 bg-black d-flex justify-content-center align-items-center">
        <Spinner />
      </div>
    );

  return (
    <div className="detailsContainer container-fluid vh-100 bg-black pt-5 d-flex flex-column justify-content-center mt-5 mt-lg-0 ">
      <div className="row  pt-5 justify-content-evenly mt-5 mt-lg-0 ">
        <img
          className="col-xl-3 col bg-black  detailImage mt-5 mt-lg-0"
          src={content.poster}
          alt={content.title}
        />
        <div className="col-xl-5  bg-black text-light d-flex flex-column justify-content-evenly bg-gray">
          <h1>{content.title}</h1>
          <p>Date of loan: {cleanDateOfLoan}</p>
          <p>Until: {cleanDateOfReturn}</p>
          <CyberButton
            text={"Return"}
            onClick={returnContent}
            className={"CyberButtonColor d-flex align-items-center "}
          />
        </div>
      </div>
    </div>
  );
};
