import { LoanCard } from "../LoanCard/LoanCard";
import { useNavigate } from "react-router-dom";
import CyberButton from "../../components/CyberButton/CyberButton";
import "./SeriesLoans.css";

export const SeriesLoans = ({ series }) => {
  const navigate = useNavigate();

  return (
    <div className="contentRented">
      <h1 className="seriesHeader">Series</h1>
      {series.length > 0 ? (
        <ul className="contentGrid">
          {series?.map((serie) => (
            <LoanCard key={serie.id_loan} content={serie} />
          ))}
        </ul>
      ) : (
        <div className="d-flex justify-content-center align-items-center flex-column">
          <p>You don't have series yet... check out our colecction</p>
          <CyberButton text={"Series"} onClick={() => navigate("/series")} />
        </div>
      )}
    </div>
  );
};
