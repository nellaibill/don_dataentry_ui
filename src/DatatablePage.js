import { MDBDataTable } from "mdbreact";
import React, { useEffect,useState } from "react";
import helpers from "./Helper";
import axios from "axios";
const DatatablePage = () => {
  const [candidatesData, setCandidatesData] = useState("");
  let url = helpers.getUrl() + "select_candidate.php";

  useEffect(() => {
    let mounted = true;
    axios
      .get(url)
      .then((response) => response.data)
      .then((data) => {
        setCandidatesData(data);
      });
    return () => (mounted = false);
  }, []);

  const data = {
    columns: [
      {
        label: "Family Member Name",
        field: "candidate_name",
        sort: "asc",
        width: 150,
      },
     
      {
        label: "Gender",
        field: "gender",
        width: 150,
      },
      {
        label: "Age",
        field: "age",
        sort: "asc",
        width: 50,
      },
      {
        label: "Mobile No",
        field: "mobile_number",
        width: 150,
      },
      {
        label: "EPIC",
        field: "epic_number",
        width: 150,
      }
    ],
    rows: candidatesData.candidate_data,
  };

  return (
    <div>
      <MDBDataTable striped bordered hover data={data} />
    </div>
  );
};

export default DatatablePage;
