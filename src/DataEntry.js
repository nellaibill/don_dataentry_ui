import React from "react";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import "primeicons/primeicons.css";
import "primereact/resources/themes/saga-blue/theme.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import helpers from "./Helper";
import { Dialog } from "primereact/dialog";
export default class DataEntry extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      cityApiData: [],
      districtApiData: [],
      pincodeApiData: [],
      candidatesData: [],
      assemblyApiData: [],
      wardApiData: [],
      subWardApiData: [],
      cityName: "",
      wardNo: "",
      wardName: "",
      subWardName: "",
      isShowAlertModal: false,
      isShowWardAlertModal: false,
      isShowSubWardAlertModal: false,
      isSaveCandidateDialog: false,
      candidate_name: "",
      family_member: "",
      gender: "",
      age: 0,
      relation_name: "",
      relation_type: "",
      addr_door_no: "",
      addr_line1: "",
      addr_line2: "",
      selectedCity: "",
      selectedDistrict: "",
      selectedPincode: "",
      mobile_number: "",
      selectedAssembly: "",
      selectedWard: "",
      selectedSubWard: "",
      epic: "",
      dialogHeader: "Candidate Information ! ",
      dialogContent: "",
    };
  }

  componentDidMount() {
    this.getCity();
    this.getDistricts();
    this.getCandidates();
    this.getPincodes();
    this.getAssembly();
    this.getWard();
    this.getSubWard();
  }
  addCity = () => {
    this.setState({
      isShowAlertModal: true,
    });
  };
  addWard = () => {
    this.setState({
      isShowWardAlertModal: true,
    });
  };

  addSubWard = () => {
    this.setState({
      isShowSubWardAlertModal: true,
    });
  };

  setStateShowAlertModal = () => {
    this.setState({ isShowAlertModal: false });
  };
  setStateShowWardAlertModal = () => {
    this.setState({ isShowWardAlertModal: false });
  };
  setStateShowSubWardAlertModal = () => {
    this.setState({ isShowSubWardAlertModal: false });
  };
  saveCandidateDialogOK = () => {
    this.setState({ isSaveCandidateDialog: false });
  };
  dataClear = () => {
    this.setState({
      candidate_name: "",
      family_member: "",
      gender: "",
      age: 0,
      relation_name: "",
      relation_type: "",
      addr_door_no: "",
      addr_line1: "",
      addr_line2: "",
      selectedCity: "",
      selectedDistrict: "",
      selectedPincode: "",
      mobile_number: "",
      selectedAssembly: "",
      selectedWard: "",
      selectedSubWard:"",
      epic: "",
    });
  };
  getCandidates = () => {
    let url = helpers.getUrl() + "select_candidate.php";
    axios
      .get(url)
      .then((response) => response.data)
      .then((data) => {
        this.setState({ candidatesData: data });
      });
  };

  afterSaveCandidatesCompleted = () => {
    this.setState({
      isSaveCandidateDialog: true,
      dialogContent: "Data Saved Succesfully",
    });
    this.dataClear();
    this.getCandidates();
  };
  afterSaveCandidatesError = () => {
    this.setState({
      isSaveCandidateDialog: true,
      dialogContent: "Please Check Data",
    });
  };

  getCity = () => {
    this.setState({ isShowAlertModal: false });
    let url = helpers.getUrl() + "select_city.php";
    axios
      .get(url)
      .then((response) => response.data.city_data)
      .then((data) => {
        this.setState({ cityApiData: data });
      });
  };
  getDistricts = () => {
    let url = helpers.getUrl() + "select_district.php";
    axios
      .get(url)
      .then((response) => response.data.district_data)
      .then((data) => {
        this.setState({ districtApiData: data });
      });
  };

  getPincodes = () => {
    this.setState({ isShowAlertModal: false });
    let url = helpers.getUrl() + "select_pincode.php";
    axios
      .get(url)
      .then((response) => response.data.pincode_data)
      .then((data) => {
        this.setState({ pincodeApiData: data });
      });
  };
  getAssembly = () => {
    let url = helpers.getUrl() + "select_assembly.php";
    axios
      .get(url)
      .then((response) => response.data.assembly_data)
      .then((data) => {
        this.setState({ assemblyApiData: data });
      });
  };
  getWard = () => {
    this.setState({ isShowWardAlertModal: false });
    let url = helpers.getUrl() + "select_ward.php";
    axios
      .get(url)
      .then((response) => response.data.ward_data)
      .then((data) => {
        this.setState({ wardApiData: data });
      });
  };

  getSubWard= () => {
    this.setState({ isShowSubWardAlertModal: false });
    let url = helpers.getUrl() + "select_subward.php";
    axios
      .get(url)
      .then((response) => response.data.subward_data)
      .then((data) => {
        this.setState({ subWardApiData: data });
      });
  };

  getSubWardById= (value) => {
    this.setState({ isShowSubWardAlertModal: false });
    this.setState({ selectedWard: value });
    let url = helpers.getUrl() + "select_subward_id.php?selectedWardId="+value
    axios
      .get(url)
      .then((response) => response.data.subward_data)
      .then((data) => {
        this.setState({ subWardApiData: data });
      });
  };
  saveCity = () => {
    let url =
      helpers.getUrl() + "insert_city.php?cityname=" + this.state.cityName;
    axios.post(url).then(
      (response) => {
        this.getCity();
      },
      (error) => {
        console.log(error);
      }
    );
  };
  saveWard = () => {
    let url =
      helpers.getUrl() +
      "insert_ward.php?wardno=" +
      this.state.wardNo +
      "&wardname=" +
      this.state.wardName;
    axios.post(url).then(
      (response) => {
        this.getWard();
      },
      (error) => {
        console.log(error);
      }
    );
  };

  saveSubWard = () => {
    let url =
      helpers.getUrl() +
      "insert_subward.php?wardno=" +
      this.state.selectedWard +
      "&subward_name=" +
      this.state.subWardName;
    axios.post(url).then(
      (response) => {
        this.getSubWard();
      },
      (error) => {
        console.log(error);
      }
    );
  };

  saveCandidates = () => {
    const user = {
      candidate_name: this.state.candidate_name,
      family_member: this.state.family_member,
      gender: this.state.gender,
      age: this.state.age,
      relation_name: this.state.relation_name,
      relation_type: this.state.relation_type,
      addr_door_no: this.state.addr_door_no,
      addr_line1: this.state.addr_line1,
      addr_line2: this.state.addr_line2,
      selectedCity: this.state.selectedCity,
      selectedDistrict: this.state.selectedDistrict,
      selectedPincode: this.state.selectedPincode,
      mobile_number: this.state.mobile_number,
      assembly_id: this.state.selectedAssembly,
      ward_id: this.state.selectedWard,
      subward_id:this.state.selectedSubWard,
      epic: this.state.epic,
    };
    //console.log("user_data", user);
    let test = JSON.stringify(user);
    axios
      .post(helpers.getUrl() + "insert_candidate.php", {
        user,
      })
      .then((res) => {
        if (res.data == null) {
          console.log("responseData", res);
          this.setState({
            isSaveCandidateDialog: true,
            dialogContent: "Please Check Data",
          });
        } else if (res.data.code == 0) {
          this.setState({
            isSaveCandidateDialog: true,
            dialogContent: "Please Check Data",
          });
        } else {
          this.afterSaveCandidatesCompleted();
        }
      });
  };

  render() {
    const gender = [
      { label: "Male", value: "Male" },
      { label: "Female", value: "Female" },
    ];

    const lstFamilyMember = [
      { label: "FamilyHead", value: "FamilyHead" },
      { label: "FamilyHead/Husband", value: "FamilyHead/Husband" },
      { label: "FamilyHead/Father", value: "FamilyHead/Father" },
      { label: "Father", value: "Father" },
      { label: "Mother", value: "Mother" },
      { label: "Husband", value: "Husband" },
      { label: "Son", value: "Son" },
      { label: "Daughter", value: "Daughter" },
    ];
    const lstRelationType = [
      { label: "Father", value: "Father" },
      { label: "Husband", value: "Husband" },
    ];

    const lblStyle = {
      textAlign: "left",
      width: "100%",
      color: "#ffb26b",
      fontSize: "16px",
      fontWeight: "bold",
    };
    const footer = (
      <div>
        <Button
          label="OK"
          icon="pi pi-times"
          onClick={() => this.saveCandidateDialogOK.bind()}
        />
      </div>
    );

    return (
      <div style={{ padding: "20px" }}>
        <Dialog
          header={this.state.dialogHeader}
          visible={this.state.isSaveCandidateDialog}
          style={{ width: "50vw" }}
          modal
          onHide={this.saveCandidateDialogOK.bind()}
        >
          <h4>{this.state.dialogContent}</h4>
        </Dialog>

        <div className="p-grid">
          <div className="p-col-6 p-md-6 p-lg-1">
            <label style={lblStyle}>Family Head Name</label>
          </div>
          <div className="p-col-6 p-md-6 p-lg-2">
            <InputText
              value={this.state.candidate_name}
              style={{ width: "100%" }}
              onChange={(e) =>
                this.setState({ candidate_name: e.target.value })
              }
            />
          </div>
          

          <div className="p-col-6 p-md-6 p-lg-1">
            <label style={lblStyle}>Gender</label>
          </div>
          <div className="p-col-6 p-md-6 p-lg-2">
            <Dropdown
              value={this.state.gender}
              options={gender}
              style={{ width: "100%" }}
              onChange={(e) => {
                this.setState({ gender: e.value });
              }}
              placeholder="Select a gender"
            />
          </div>
          <div className="p-col-6 p-md-6 p-lg-1">
            <label style={lblStyle}>Age</label>
          </div>
          <div className="p-col-6 p-md-6 p-lg-2">
            <InputText
              value={this.state.age}
              style={{ width: "100%" }}
              onChange={(e) => this.setState({ age: e.target.value })}
            />
          </div>
        

          <div className="p-col-6 p-md-6 p-lg-1">
            <label style={lblStyle}>Door No</label>
          </div>
          <div className="p-col-6 p-md-6 p-lg-2">
            <InputText
              value={this.state.addr_door_no}
              style={{ width: "100%" }}
              onChange={(e) => this.setState({ addr_door_no: e.target.value })}
            />
          </div>

          <div className="p-col-6 p-md-6 p-lg-1">
            <label style={lblStyle}>AddressLine1</label>
          </div>
          <div className="p-col-6 p-md-6 p-lg-2">
            <InputText
              value={this.state.addr_line1}
              style={{ width: "100%" }}
              onChange={(e) => this.setState({ addr_line1: e.target.value })}
            />
          </div>

          <div className="p-col-6 p-md-6 p-lg-1">
            <label style={lblStyle}>AddressLine2</label>
          </div>
          <div className="p-col-6 p-md-6 p-lg-2">
            <InputText
              value={this.state.addr_line2}
              style={{ width: "100%" }}
              onChange={(e) => this.setState({ addr_line2: e.target.value })}
            />
          </div>
          <div className="p-col-6 p-md-6 p-lg-1">
            <label style={lblStyle}>City</label>
          </div>
          <div className="p-col-6 p-md-6 p-lg-2">
            <Dropdown
              value={this.state.selectedCity}
              options={this.state.cityApiData}
              filter
              showClear
              style={{ width: "100%" }}
              onChange={(e) => {
                this.setState({ selectedCity: e.value });
              }}
              placeholder="Select a City"
            />
          </div>

          <div className="p-col-6 p-md-6 p-lg-2">
            <Button
              label="Add City"
              icon="pi pi-plus"
              onClick={this.addCity.bind()}
            />
          </div>
          <div className="p-col-6 p-md-6 p-lg-1"></div>
          <div className="p-col-6 p-md-6 p-lg-1">
            <label style={lblStyle}>District</label>
          </div>
          <div className="p-col-6 p-md-6 p-lg-2">
            <Dropdown
              value={this.state.selectedDistrict}
              options={this.state.districtApiData}
              filter
              showClear
              style={{ width: "100%" }}
              onChange={(e) => {
                this.setState({ selectedDistrict: e.value });
              }}
              placeholder="Select a District"
            />
          </div>
          <div className="p-col-6 p-md-6 p-lg-1">
            <label style={lblStyle}>Pincode</label>
          </div>
          <div className="p-col-6 p-md-6 p-lg-2">
            <Dropdown
              value={this.state.selectedPincode}
              options={this.state.pincodeApiData}
              filter
              showClear
              style={{ width: "100%" }}
              onChange={(e) => {
                this.setState({ selectedPincode: e.value });
              }}
              placeholder="Select a Pincode"
            />
          </div>
          <div className="p-col-6 p-md-6 p-lg-1">
            <label style={lblStyle}>Mobile Number</label>
          </div>
          <div className="p-col-6 p-md-6 p-lg-2">
            <InputText
              value={this.state.mobile_number}
              style={{ width: "100%" }}
              onChange={(e) => this.setState({ mobile_number: e.target.value })}
            />
          </div>

          <div className="p-col-6 p-md-6 p-lg-1">
            <label style={lblStyle}>Assembly</label>
          </div>
          <div className="p-col-6 p-md-6 p-lg-2">
            <Dropdown
              value={this.state.selectedAssembly}
              options={this.state.assemblyApiData}
              filter
              showClear
              style={{ width: "100%" }}
              onChange={(e) => {
                this.setState({ selectedAssembly: e.value });
              }}
              placeholder="Select a Assembly"
            />
          </div>
          <div className="p-col-6 p-md-6 p-lg-3"></div>
          <div className="p-col-6 p-md-6 p-lg-1">
            <label style={lblStyle}>Ward</label>
          </div>
          <div className="p-col-6 p-md-6 p-lg-2">
            <Dropdown
              value={this.state.selectedWard}
              options={this.state.wardApiData}
              filter
              showClear
              style={{ width: "100%" }}
              onChange={(e) => {
               this.getSubWardById(e.value)
              }}
              placeholder="Select a Ward"
            />
          </div>
          <div className="p-col-6 p-md-6 p-lg-2">
            <Button
              label="Add Ward"
              icon="pi pi-plus"
              onClick={this.addWard.bind()}
            />
          </div>
          <div className="p-col-6 p-md-6 p-lg-4"></div>
          <div className="p-col-6 p-md-6 p-lg-1">
            <label style={lblStyle}>SubWard</label>
          </div>
          <div className="p-col-6 p-md-6 p-lg-2">
            <Dropdown
              value={this.state.selectedSubWard}
              options={this.state.subWardApiData}
              filter
              showClear
              style={{ width: "100%" }}
              onChange={(e) => {
                this.setState({ selectedSubWard: e.value });
              }}
              placeholder="Select a SubWard"
            />
          </div>
          <div className="p-col-6 p-md-6 p-lg-2">
            <Button
              label="Add Sub Ward"
              icon="pi pi-plus"
              onClick={this.addSubWard.bind()}
            />
          </div>

          <div className="p-col-6 p-md-6 p-lg-1"></div>

          <div className="p-col-6 p-md-6 p-lg-1">
            <label style={lblStyle}>EPIC</label>
          </div>
          <div className="p-col-6 p-md-6 p-lg-2">
            <InputText
              value={this.state.epic}
              style={{ width: "100%" }}
              onChange={(e) => this.setState({ epic: e.target.value })}
            />
          </div>
          <Modal
            show={this.state.isShowAlertModal}
            onHide={this.setStateShowAlertModal}
            size="sm"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>Enter City</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="p-grid">
                <div className="p-col-6 p-md-6 p-lg-12">
                  <InputText
                    value={this.state.cityName}
                    style={{ width: "100%" }}
                    onChange={(e) =>
                      this.setState({ cityName: e.target.value })
                    }
                  />
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="success" onClick={this.saveCity.bind()}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>

          <Modal
            show={this.state.isShowWardAlertModal}
            onHide={this.setStateShowWardAlertModal}
            size="sm"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>Enter Ward</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="p-grid">
                <label>Ward No</label>
                <div className="p-col-6 p-md-6 p-lg-12">
                  <InputText
                    value={this.state.wardNo}
                    style={{ width: "100%" }}
                    onChange={(e) => this.setState({ wardNo: e.target.value })}
                  />
                </div>
                <label>Ward Name</label>
                <div className="p-col-6 p-md-6 p-lg-12">
                  <InputText
                    value={this.state.wardName}
                    style={{ width: "100%" }}
                    onChange={(e) =>
                      this.setState({ wardName: e.target.value })
                    }
                  />
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="success" onClick={this.saveWard.bind()}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>

          <Modal
            show={this.state.isShowSubWardAlertModal}
            onHide={this.setStateShowSubWardAlertModal}
            size="sm"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>Enter Sub Ward</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="p-grid">
                <label>Ward No</label>
                <div className="p-col-6 p-md-6 p-lg-12">
                  <Dropdown
                    value={this.state.selectedWard}
                    options={this.state.wardApiData}
                    filter
                    showClear
                    style={{ width: "100%" }}
                    onChange={(e) => {
                      this.setState({ selectedWard: e.value });
                    }}
                    placeholder="Select a Ward"
                  />
                </div>
                <label>Sub Ward Name</label>
                <div className="p-col-6 p-md-6 p-lg-12">
                  <InputText
                    value={this.state.subWardName}
                    style={{ width: "100%" }}
                    onChange={(e) =>
                      this.setState({ subWardName: e.target.value })
                    }
                  />
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="success" onClick={this.saveSubWard.bind()}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
        <hr />
        <div className="p-grid">
          <div className="p-col-6 p-md-6 p-lg-11"></div>
          <div className="p-col-6 p-md-6 p-lg-1">
            <Button
              label="SAVE"
              icon="pi pi-save"
              style={{ width: "100%" }}
              className="p-button-success"
              onClick={this.saveCandidates.bind()}
            />
          </div>
        </div>
        <hr />
        <div className="card"></div>
      </div>
    );
  }
}

