import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearErrors, login, loginWithGoogle } from "../redux/authAction";
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
  MDBIcon,
} from "mdb-react-ui-kit";

const Login = () => {
  const containerStyle = {
    backgroundColor: "#508bfc",
    minHeight: "100vh",
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loading, isAuthenticated, error } = useSelector(
    (state) => state.auth
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(login(email, password));
    navigate("/");
  };

  const googlSubmit = async (e) => {
    e.preventDefault();
    await dispatch(loginWithGoogle());
    navigate("/");
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isAuthenticated) {
      navigate("/");
    }
  }, [dispatch, error, navigate, alert, isAuthenticated]);

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
                    <h2 className="fw-bold mb-4 text-center">Log In</h2>

                    <MDBInput
                      wrapperClass="mb-4 w-100"
                      label="Email address"
                      id="formControlLg"
                      type="email"
                      size="lg"
                      name="email"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <MDBInput
                      wrapperClass="mb-4 w-100"
                      label="Password"
                      id="formControlLg"
                      type="password"
                      size="lg"
                      name="password"
                      onChange={(e) => setPassword(e.target.value)}
                    />

                    <div className="d-flex justify-content-end mb-4">
                      <p>
                        Dont't have an account?{" "}
                        <Link to="/register">Sign Up</Link>
                      </p>
                    </div>

                    <MDBBtn size="lg" onClick={handleSubmit}>
                      Log In
                    </MDBBtn>

                    <hr className="my-4" />

                    <MDBBtn
                      className="mb-2 w-100"
                      size="lg"
                      style={{ backgroundColor: "#dd4b39" }}
                      onClick={googlSubmit}
                    >
                      <MDBIcon fab icon="google" className="mx-2" />
                      Sign in with google
                    </MDBBtn>
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

export default Login;
