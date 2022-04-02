import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import React, {useState} from 'react';
import helpers from "./Helper";
import axios from "axios";

const Reports = () => {
  const [candidatesData, setCandidatesData] = useState("");
  let url = helpers.getUrl() + "select_candidate.php";
  axios
    .get(url)
    .then((response) => response.data)
    .then((data) => {
      setCandidatesData(data);
    });
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'Right',
        alignItems: 'Right',
        height: '100vh'
      }}
    >
        <DataTable
            value={candidatesData.candidate_data}
            scrollable
            scrollHeight="750px"
            style={{ width: "100%" }}
          >
            <Column
              field="candidate_name"
              header="Family Head Name"
              headerStyle={{ width: "250px" }}
            ></Column>
            <Column
              field="gender"
              header="Gender"
              headerStyle={{ width: "250px" }}
            ></Column>
            <Column
              field="age"
              header="Age"
              headerStyle={{ width: "250px" }}
            ></Column>
           
            <Column
              field="addr_door_no"
              header="DoorNo"
              headerStyle={{ width: "250px" }}
            ></Column>
            <Column
              field="addr_line1"
              header="Address1"
              headerStyle={{ width: "250px" }}
            ></Column>
            <Column
              field="addr_line2"
              header="Address2 "
              headerStyle={{ width: "250px" }}
            ></Column>
            <Column
              field="city_name"
              header="City"
              headerStyle={{ width: "250px" }}
            ></Column>
            <Column
              field="district_name"
              header="District"
              headerStyle={{ width: "250px" }}
            ></Column>
            <Column
              field="pincode_number"
              header="Pincode"
              headerStyle={{ width: "250px" }}
            ></Column>
            <Column
              field="mobile_number"
              header="Mobile"
              headerStyle={{ width: "250px" }}
            ></Column>
            <Column
              field="assembly_name"
              header="Assembly"
              headerStyle={{ width: "250px" }}
            ></Column>
            <Column
              field="ward_name"
              header="Ward"
              headerStyle={{ width: "250px" }}
            ></Column>
             <Column
              field="subward_name"
              header="SubWard"
              headerStyle={{ width: "250px" }}
            ></Column>
            
            <Column
              field="epic_number"
              header="EPIC"
              headerStyle={{ width: "250px" }}
            ></Column>
          </DataTable>
    </div>
  );
};
  
export default Reports;