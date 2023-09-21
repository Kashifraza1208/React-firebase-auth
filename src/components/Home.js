import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authAction";
import { useAlert } from "react-alert";

import React from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
} from "mdb-react-ui-kit";

const Home = () => {
  const alert = useAlert();

  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const handleLogout = async () => {
    await dispatch(logout());
    alert.success("Logout successfully");
  };

  return (
    <MDBContainer fluid>
      <MDBRow className="d-flex justify-content-center align-items-center h-100">
        <MDBCol col="12">
          <MDBCard
            className="bg-dark text-white my-5 mx-auto"
            style={{ borderRadius: "1rem", maxWidth: "600px" }}
          >
            <MDBCardBody className="p-5 d-flex flex-column align-items-center mx-auto w-100">
              <h2 className="fw-bold mb-2 text-uppercase">
                Welcome to home page
              </h2>
              <p className="text-white-50 mb-4 fw-bold text-uppercase">
                User Information
              </p>
              <h4>Name : {user.displayName}</h4>
              <h4 className="mb-5">Email : {user.email}</h4>

              <MDBBtn
                outline
                className="mx-2 px-5 fw-bold text-uppercase"
                size="lg"
                onClick={handleLogout}
              >
                Logout
              </MDBBtn>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default Home;
