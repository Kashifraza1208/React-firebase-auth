import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearErrors, register } from "../redux/authAction";
import { useAlert } from "react-alert";
import Loader from "./Loader";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
} from "mdb-react-ui-kit";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(register(name, email, password));

    // Check if registration was successful before navigating to the login page

    navigate("/login");
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error, navigate, alert]);

  const containerStyle = {
    backgroundColor: "#508bfc",
    minHeight: "100vh",
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MDBContainer fluid style={containerStyle}>
            <MDBRow className="d-flex justify-content-center align-items-center h-100">
              <MDBCol col="12">
                <MDBCard
                  className="bg-white my-5 mx-auto"
                  style={{ borderRadius: "1rem", maxWidth: "500px" }}
                >
                  <MDBCardBody className="p-5 w-100 d-flex flex-column">
                    <h2 className="fw-bold mb-4 text-center">Sign Up</h2>

                    <MDBInput
                      wrapperClass="mb-4 w-100"
                      label="Name"
                      type="text"
                      size="lg"
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <MDBInput
                      wrapperClass="mb-4 w-100"
                      label="Email address"
                      type="email"
                      size="lg"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <MDBInput
                      wrapperClass="mb-4 w-100"
                      label="Password"
                      type="password"
                      size="lg"
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />

                    <div className="d-flex justify-content-end mb-4">
                      <p>
                        Already have an account?{" "}
                        <Link to="/login">Sign In</Link>
                      </p>
                    </div>

                    <MDBBtn size="lg" onClick={handleSubmit}>
                      Register
                    </MDBBtn>

                    <hr className="my-4" />
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </Fragment>
      )}
    </Fragment>
  );
};

export default SignUp;
