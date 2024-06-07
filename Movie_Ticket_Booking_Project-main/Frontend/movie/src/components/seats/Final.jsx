import React from 'react'
import { useParams } from 'react-router-dom';
import "./final.css";
import scanner from "../Image/scanner.png"

function Final() {
    const { selected, totalprice } = useParams();
  return (
    <>
      <div className="final">
      <div className="showe">
        <img src={scanner} className="img" alt="img not found"/>
        <h3>SELECTED SEATS</h3>
        {selected}
        <h3>TOTALPRICE : Rs. {totalprice}</h3>
      </div>
    </div>
    </>
  )
}

export default Final
