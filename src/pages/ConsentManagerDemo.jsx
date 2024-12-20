import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import hvIcon from "../assets/consentManager/Hyperverge.png";
import angelOneIcon from "../assets/consentManager/AngelOne.png";
import acceptIcon from "../assets/consentManager/Accepted.png";
import declineIcon from "../assets/consentManager/Decline.png";
import { ConsentSDK } from "../sdk/ConsentSDK.js";

export const ConsentManagerDemo = () => {
  //SDK Response - State
  const [consentDetails, setConsentDetails] = useState({});

  //Block - 1 States
  const [customerId, setCustomerId] = useState("");
  const [transactionId, setTransactionId] = useState(9876543);
  const [redirectURI, setRedirectURI] = useState("");
  const [policyVersion, setPolicyVersion] = useState("");
  const [refURI, setRefURI] = useState(import.meta.env.VITE_REF_URI);
  const [purpose, setPurpose] = useState("");
  const [code, setCode] = useState(100);
  const [scope, setScope] = useState("");
  const [block1ButtonVisiblity, setBlock1ButtonVisiblity] = useState(false);

  //Block - 2 States
  const [faceScanCheck, setFaceScanCheck] = useState(false);
  const [locationAccessCheck, setLocationAccessCheck] = useState(false);

  //Block -3 States
  const [consentToken, setConsentToken] = useState("");
  const [consentStatus, setConsentStatus] = useState(false);

  //State to maintain Component visiblity
  const [block1Visiblity, setBlock1Visiblity] = useState(true);
  const [block2Visiblity, setBlock2Visiblity] = useState(false);
  const [block3Visiblity, setBlock3Visiblity] = useState(false);
  const [block3Section2Visiblity, setBlock3Section2Visiblity] = useState(false);

  const enableButtonVisiblity = () => {
    if (
      customerId.length > 0 &&
      redirectURI.length > 0 &&
      policyVersion.length > 0 &&
      purpose.length > 0 &&
      scope.length > 0
    ) {
      setBlock1ButtonVisiblity(true);
    } else {
      setBlock1ButtonVisiblity(false);
    }
  };

  //Consent SDK Instance
  const consent = new ConsentSDK(import.meta.env.VITE_API_URL);

  //Handle click function for block - 1 button
  const handleBlock1Button = async () => {
    //Toast on Loading
    const toastId = toast.loading("requesting Consent", {
      position: "top-right",
      autoClose: 5000,
    });
    // const requestConsentResponse = await consent.requestConsent(
    //   customerId,
    //   transactionId,
    //   redirectURI,
    //   policyVersion,
    //   refURI,
    //   purpose,
    //   code,
    //   scope
    // );
    // setConsentDetails(requestConsentResponse);
    // if (requestConsentResponse) {
    // toast success
    toast.update(toastId, {
      render: "request Consent Success",
      type: "success",
      isLoading: false,
      autoClose: 3000,
    });
    setBlock1Visiblity(false);
    setBlock2Visiblity(true);
    // } else {
    //   // toast error
    //   toast.update(toastId, {
    //     render: "request Consent Error",
    //     type: "error",
    //     isLoading: false,
    //     autoClose: 3000,
    //   });
    // }
  };
  //Handle click function for block - 2 Deny button
  const handleBlock2DenyButton = () => {
    setBlock2Visiblity(false);
    setBlock1Visiblity(true);
    toast.success("Consent Denied", {
      position: "top-right",
      autoClose: 3000,
    });
  };
  //Handle click function for block - 2 Allow button
  const handleBlock2AllowButton = () => {
    if (!faceScanCheck) {
      toast.error("Face scan is not approved. Please approve", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }
    if (!locationAccessCheck) {
      toast.error("Location access is not approved. Please approve", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }
    setBlock2Visiblity(false);
    setBlock3Visiblity(true);
  };
  //Handle click function for block - 2 Allow button
  const handleBlock3ValidationButton = () => {
    if (consentToken.length < 1) {
      toast.error("Enter consent Token", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }
    if (consentToken.length > 5) {
      toast.success("Consent Accepted", {
        position: "top-right",
        autoClose: 3000,
      });
      setConsentStatus(true);
    } else {
      toast.error("Consent Denied", {
        position: "top-right",
        autoClose: 3000,
      });
      setConsentStatus(false);
    }
    setBlock3Section2Visiblity(true);
  };

  useEffect(() => {
    enableButtonVisiblity();
  }, [customerId, redirectURI, purpose, policyVersion, scope]);

  return (
    <>
      <ToastContainer stacked />
      <div className="w-full flex justify-center">
        {/*Block 1 - Enter consent details  */}
        <div
          className={`${
            !block1Visiblity && "hidden"
          } h-109.5 w-141.75 mt-30 ml-73.5 mr-73.75 mb-66 flex flex-col items-center justify-center`}
        >
          <h1 className="text-xxl text-center font-semibold text-darknavyblue w-50.75 h-7.5 tracking-tight mx-45.5">
            Enter Consent Details
          </h1>
          <div className="mt-6 h-96 w-141.75 flex justify-center">
            <div className="border border-gainsboro h-96 w-141.75 rounded-8 p-8">
              <div className="w-125.75 h-80">
                <ul className=" w-125.75 h-65">
                  {/* Input  - Customer ID  */}
                  <li className="h-9 w-125.75 mb-5 flex items-center">
                    <div className="w-45 h-5.25 mr-1.5 flex items-center">
                      <label
                        className="my-1.87 tracking-tight text-xss text-darknavyblue opacity-60 font-medium"
                        htmlFor={"customerId"}
                      >
                        {"Customer ID"}
                      </label>
                    </div>
                    <input
                      id={"customerId"}
                      name={"customerId"}
                      type="password"
                      onChange={(e) => setCustomerId(e.target.value)}
                      className="border border-gainsboro h-9 w-79.25 px-3 py-1.87 rounded-6 focus:outline-none text-darknavyblue opacity-80 font-medium tracking-tight"
                    />
                  </li>
                  {/* Input  - Redirect URI  */}
                  <li className="h-9 w-125.75 mb-5 flex items-center">
                    <div className="w-45 h-5.25 mr-1.5 flex items-center">
                      <label
                        className="my-1.87 tracking-tight text-xss text-darknavyblue opacity-60 font-medium"
                        htmlFor={"redirectURI"}
                      >
                        {"Redirect URI"}
                      </label>
                    </div>
                    <input
                      id={"redirectURI"}
                      name={"redirectURI"}
                      type="text"
                      onChange={(e) => setRedirectURI(e.target.value)}
                      className="border border-gainsboro h-9 w-79.25 px-3 py-1.87 rounded-6 focus:outline-none text-darknavyblue opacity-80 font-medium tracking-tight"
                    />
                  </li>
                  {/* Input  - Policy Version  */}
                  <li className="h-9 w-125.75 mb-5 flex items-center">
                    <div className="w-45 h-5.25 mr-1.5 flex items-center">
                      <label
                        className="my-1.87 tracking-tight text-xss text-darknavyblue opacity-60 font-medium"
                        htmlFor={"policyVersion"}
                      >
                        {"Policy Version"}
                      </label>
                    </div>
                    <input
                      id={"policyVersion"}
                      name={"policyVersion"}
                      type="text"
                      onChange={(e) => setPolicyVersion(e.target.value)}
                      className="border border-gainsboro h-9 w-79.25 px-3 py-1.87 rounded-6 focus:outline-none text-darknavyblue opacity-80 font-medium tracking-tight"
                    />
                  </li>
                  {/* Input  - Purpose  */}
                  <li className="h-9 w-125.75 mb-5 flex items-center">
                    <div className="w-45 h-5.25 mr-1.5 flex items-center">
                      <label
                        className="my-1.87 tracking-tight text-xss text-darknavyblue opacity-60 font-medium"
                        htmlFor={"purpose"}
                      >
                        {"Purpose"}
                      </label>
                    </div>
                    <input
                      id={"purpose"}
                      name={"purpose"}
                      type="text"
                      onChange={(e) => setPurpose(e.target.value)}
                      className="border border-gainsboro h-9 w-79.25 px-3 py-1.87 rounded-6 focus:outline-none text-darknavyblue opacity-80 font-medium tracking-tight"
                    />
                  </li>
                  {/* Input  - Scope  */}
                  <li className="h-9 w-125.75 flex items-center">
                    <div className="w-45 h-5.25 mr-1.5 flex items-center">
                      <label
                        className="my-1.87 tracking-tight text-xss text-darknavyblue opacity-60 font-medium"
                        htmlFor={"scpoe"}
                      >
                        {"Scope"}
                      </label>
                    </div>
                    <input
                      id={"scpoe"}
                      name={"scpoe"}
                      type="text"
                      onChange={(e) => setScope(e.target.value)}
                      className="border border-gainsboro h-9 w-79.25 px-3 py-1.87 rounded-6 focus:outline-none text-darknavyblue opacity-80 font-medium tracking-tight"
                    />
                  </li>
                </ul>
                <button
                  onClick={handleBlock1Button}
                  className={`border  w-125.75 h-9 mt-6 text-xxs font-medium rounded-6 text-white ${
                    !block1ButtonVisiblity
                      ? " bg-neonblue opacity-20"
                      : "bg-neonblue active:scale-95"
                  }`}
                  disabled={!block1ButtonVisiblity}
                >
                  Request Consent
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Block  2 - Requesting Permission   */}
        <div
          className={`${
            !block2Visiblity && "hidden"
          } mt-16 mb-15.5 mx-73.75 w-141.75 h-174 flex flex-col items-center`}
        >
          <div className="border border-E6E6E6 rounded-8 w-141.75 h-162.75 shadow-block2">
            {/* section - 1 */}
            <div className="w-141.75 h-24 flex">
              <div className="w-22.2 h-12 my-6 ml-8 flex">
                <img src={hvIcon} alt="Hyperverge" className="h-12 w-12 z-10" />
                <img
                  src={angelOneIcon}
                  alt="Hyperverge"
                  className="h-12 w-12 relative -left-2 z-0"
                />
              </div>
              <div className="w-98.55 h-11.5 ml-5 mr-8 my-6.25">
                <p className="font-semibold tracking-tight text-xxxs text-darknavyblue opacity-80 w-40.75 h-5.25 mb-1">
                  Johndoe@gmail.com
                </p>
                <p className="font-normal text-xxs tracking-tight text-darknavyblue opacity-60 w-27.75 h-5.25">{`${policyVersion}`}</p>
              </div>
            </div>
            {/* Section - 2 */}
            <div className="border w-141.75 h-102.25">
              <div className="w-123.75 h-52.2 mx-9 mt-6 mb-43.75">
                <div className="h-21.75 mb-9">
                  <p className="h-5.25 min-w-45 font-medium text-xxxs text-darknavyblue opacity-80 mb-3">{`The following details will be collected from you by <XYZ_name>`}</p>
                  <div className=" w-123.75 h-13 flex flex-col items-center">
                    {/* Face Scan Checkbox  */}
                    <div className="w-122.75 h-5.25 mx-0.5 mb-3 flex items-center">
                      <input
                        type="checkbox"
                        name="faceScan"
                        id="faceScan"
                        className=" accent-neonblue h-4 w-4"
                        onChange={(e) => setFaceScanCheck(e.target.checked)}
                      />
                      <label
                        htmlFor="faceScan"
                        className="ml-2.5 w-full h-5.25 tracking-tight font-medium text-xxs text-darknavyblue opacity-60"
                      >
                        Face Scan
                      </label>
                    </div>
                    {/* Loaction Access  */}
                    <div className="w-122.75 h-5.25 mx-0.5 flex items-center">
                      <input
                        type="checkbox"
                        name="loactionAccess"
                        id="loactionAccess"
                        className="accent-neonblue h-4 w-4"
                        onChange={(e) =>
                          setLocationAccessCheck(e.target.checked)
                        }
                      />
                      <label
                        htmlFor="loactionAccess"
                        className="ml-2.5 w-full h-5.25 tracking-tight font-medium text-xxs text-darknavyblue opacity-60"
                      >
                        Location Access
                      </label>
                    </div>
                  </div>
                </div>
                <div className="w-123.75 h-21.75">
                  <div className=" w-123.75 h-21.75">
                    <p className="w-122.75 h-5.25  tracking-tight font-medium text-xxxs text-darknavyblue opacity-80 mb-3">
                      Purpose
                    </p>
                    <p className="w-122.75 h-5.25  tracking-tight font-medium text-xxs text-darknavyblue opacity-60 mb-3">
                      {purpose}
                    </p>
                    <p className="w-122.75 h-5.25  tracking-tight font-medium text-xxs text-darknavyblue opacity-60 ">
                      {purpose}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* Section - 3  */}
            <div className=" border border-t-darknavyblue border-opacity-10 w-141.75 h-36.5">
              <p className="mt-6 mx-8 w-125.75 min-h-10.5 tracking-tight font-normal font-roboto text-xxs text-414141 mb-5">
                By clicking Allow, you allow the app to use your information in
                accordance to their respective{" "}
                <a href="#" target="_blank" className="text-neonblue">
                  terms of serve
                </a>{" "}
                and{" "}
                <a href="#" target="_blank" className="text-neonblue">
                  privacy policies
                </a>
                .
              </p>
              <div className="mt-5 mb-6 mx-8 w-125.75 h-9 flex ">
                <button
                  className="w-61.37 h-9 border border-D9DBDD rounded-6 text-444444 text-xxs font-medium tracking-tight text-center mr-3 active:scale-95"
                  onClick={handleBlock2DenyButton}
                >
                  Deny
                </button>
                <button
                  className="w-61.37 h-9 border border-D9DBDD rounded-6 text-white bg-neonblue text-xxs font-medium tracking-tight text-center active:scale-95"
                  onClick={handleBlock2AllowButton}
                >
                  Allow
                </button>
              </div>
            </div>
          </div>
          <p className="h-5.25 w-26.25 tracking-tight text-xss text-darknavyblue opacity-60 mt-6 mx-57.75">{`SDK Version <VK>`}</p>
        </div>
        {/* block - 3  */}
        <div className={`${!block3Visiblity && "hidden"}`}>
          <div className=" w-[503px] h-[156px] mt-10 ml-73.5 mr-73.75">
            {/* section - 1 */}
            <div className="w-[503px] min-h-[156px] rounded-8 border border-E6E6E6 shadow-block2 ">
              <div className="w-[439px] my-8 mx-8">
                <div className="w-[439px] h-9 mb-[20px]">
                  <label
                    htmlFor="token"
                    className="text-xss font-medium tracking-tight text-darknavyblue opacity-60 w-8.75 h-5.25 my-1.87 ml-0.5 mr-14.5"
                  >
                    Token
                  </label>
                  <input
                    type="text"
                    name="token"
                    id="token"
                    className="border border-D9DBDD w-[344px] h-9 rounded-6 py-[5.5px] px-3 focus:outline-none text-333333"
                    onChange={(e) => setConsentToken(e.target.value)}
                  />
                </div>
                <button
                  className="w-[439px] h-9 border border-D9DBDD rounded-6 text-white bg-neonblue text-xxs font-medium tracking-tight text-center active:scale-95"
                  onClick={handleBlock3ValidationButton}
                >
                  Validate Token
                </button>
              </div>
              {/* section - 2 */}
              <div
                className={`${
                  !block3Section2Visiblity && "hidden"
                } border border-t-darknavyblue border-opacity-10 h-[605px] overflow-x-hidden overflow-y-auto `}
              >
                {/* Consent Status  */}
                <div className="w-[439px] h-8 mt-8 mx-8 mb-9 flex  items-center justify-between">
                  <h1 className="w-[105px] h-[21px] tracking-tight font-semibold text-xxs text-darknavyblue opacity-80">
                    Consent Status
                  </h1>
                  {consentStatus ? (
                    <>
                      <div className="w-[102px] h-8 border border-bottlegreen bg-F0FAF5 rounded-6 py-1.5 pl-2 pr-3 flex items-center ">
                        <img
                          src={acceptIcon}
                          alt=""
                          className="h-5 w-5 mr-0.5"
                        />
                        <p className="text-bottlegreen font-medium text-xsss">
                          Accepted
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Decline  */}
                      <div className="w-[86px] h-8 border border-BF2600 bg-FEEAE5 rounded-6 py-1.5 pl-2 pr-3 flex items-center ">
                        <img
                          src={declineIcon}
                          alt=""
                          className="h-5 w-5 mr-0.5"
                        />
                        <p className="text-BF2600 font-medium text-xsss">
                          Denied
                        </p>
                      </div>
                    </>
                  )}
                </div>
                {/* Consent Details  */}
                <div className="w-[439px] h-[381px] mx-8 mb-9">
                  <h1 className="tracking-tight font-semibold text-xxs text-darknavyblue opacity-80 mb-5">
                    Consent Details
                  </h1>
                  <div className="w-[439px] h-[340px]">
                    {/* Device ID  */}
                    <div className="w-[439px] h-[42px] flex items-center mb-4">
                      <h6 className="w-[190px] h-[21px] font-medium text-darknavyblue opacity-60 tracking-tight text-xxs">
                        Device ID
                      </h6>
                      <p className="w-[249px] h-[42px] font-medium text-darknavyblue opacity-80 tracking-tight text-xxs">
                        b9f8e2d4-9c3a-4571-ae84-3c9df20297a1
                      </p>
                    </div>
                    {/* hashedUserId */}
                    <div className="w-[439px] h-[63px] flex items-start mb-4">
                      <h6 className="w-[190px] h-[21px] font-medium text-darknavyblue opacity-60 tracking-tight text-xxs">
                        hashedUserId
                      </h6>
                      <p className="w-[249px] h-[63px] font-medium text-darknavyblue break-words opacity-80 tracking-tight text-xxs">
                        e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
                      </p>
                    </div>
                    {/* timestamp */}
                    <div className="w-[439px] h-[21px] flex items-center mb-4">
                      <h6 className="w-[190px] h-[21px] font-medium text-darknavyblue opacity-60 tracking-tight text-xxs">
                        timestamp
                      </h6>
                      <p className="w-[249px] h-[21px] font-medium text-darknavyblue opacity-80 tracking-tight text-xxs">
                        2024-06-12T14:35:22Z
                      </p>
                    </div>
                    {/* ipAddress */}
                    <div className="w-[439px] h-[21px] flex items-center mb-4">
                      <h6 className="w-[190px] h-[21px] font-medium text-darknavyblue opacity-60 tracking-tight text-xxs">
                        ipAddress
                      </h6>
                      <p className="w-[249px] h-[21px] font-medium text-darknavyblue opacity-80 tracking-tight text-xxs">
                        192.168.1.15
                      </p>
                    </div>
                    {/* Scope */}
                    <div className="w-[439px] h-[21px] flex items-center mb-4">
                      <h6 className="w-[190px] h-[21px] font-medium text-darknavyblue opacity-60 tracking-tight text-xxs">
                        Scope
                      </h6>
                      <p className="w-[249px] h-[21px] font-medium text-darknavyblue opacity-80 tracking-tight text-xxs">
                        facial scan, Location Access
                      </p>
                    </div>
                    {/* Purpose */}
                    <div className="w-[439px] h-[92px] flex items-start mb-4">
                      <h6 className="w-[190px] h-[21px] font-medium text-darknavyblue opacity-60 tracking-tight text-xxs">
                        Purpose
                      </h6>
                      <div>
                        <p className="w-[249px] h-[42px] font-medium text-darknavyblue opacity-80 tracking-tight text-xxs">
                          User onboarding and identity verification
                        </p>
                        <p className="w-[249px] h-[42px] font-medium text-darknavyblue opacity-80 tracking-tight text-xxs">
                          Fraud prevention and compliance checks
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Tenure - 1  */}
                <div className="w-[439] h-[173px] mx-8 mb-9">
                  <h1 className="tracking-tight font-semibold text-xxs text-darknavyblue opacity-80 mb-5">
                    Tenure
                  </h1>
                  {/* Scope  */}
                  <div className="w-[439px] h-[21px]  flex items-center mb-4">
                    <h6 className="w-[190px] h-[21px] font-medium text-darknavyblue opacity-60 tracking-tight text-xxs">
                      Scope
                    </h6>
                    <p className="w-[249px] h-[21px] font-medium text-darknavyblue opacity-80 tracking-tight text-xxs">
                      Chrome
                    </p>
                  </div>
                  {/* browserVersion  */}
                  <div className="w-[439px] h-[21px]  flex items-center mb-4">
                    <h6 className="w-[190px] h-[21px] font-medium text-darknavyblue opacity-60 tracking-tight text-xxs">
                      browserVersion
                    </h6>
                    <p className="w-[249px] h-[21px] font-medium text-darknavyblue opacity-80 tracking-tight text-xxs">
                      124.0.6367.119
                    </p>
                  </div>
                  {/* operating System  */}
                  <div className="w-[439px] h-[21px]  flex items-center mb-4">
                    <h6 className="w-[190px] h-[21px] font-medium text-darknavyblue opacity-60 tracking-tight text-xxs">
                      operatingSystem
                    </h6>
                    <p className="w-[249px] h-[21px] font-medium text-darknavyblue opacity-80 tracking-tight text-xxs">
                      Windows 11
                    </p>
                  </div>
                  {/* deviceType  */}
                  <div className="w-[439px] h-[21px]  flex items-center">
                    <h6 className="w-[190px] h-[21px] font-medium text-darknavyblue opacity-60 tracking-tight text-xxs">
                      deviceType
                    </h6>
                    <p className="w-[249px] h-[21px] font-medium text-darknavyblue opacity-80 tracking-tight text-xxs">
                      Desktop
                    </p>
                  </div>
                </div>
                {/* Tenure - 2 */}
                <div className="w-[439px] h-[99px]  mx-8 mb-9">
                  <h1 className="tracking-tight font-semibold text-xxs text-darknavyblue opacity-80 mb-5">
                    Tenure
                  </h1>
                  <div className="w-[439px] h-[58px]">
                    {/* humanReadable */}
                    <div className="w-[439px] h-[21px]  flex items-center mb-4">
                      <h6 className="w-[190px] h-[21px] font-medium text-darknavyblue opacity-60 tracking-tight text-xxs">
                        humanReadable
                      </h6>
                      <p className="w-[249px] h-[21px] font-medium text-darknavyblue opacity-80 tracking-tight text-xxs">
                        2025-06-12T14:35:22Z
                      </p>
                    </div>
                    {/* machineTimestamp  */}
                    <div className="w-[439px] h-[21px]  flex items-center">
                      <h6 className="w-[190px] h-[21px] font-medium text-darknavyblue opacity-60 tracking-tight text-xxs">
                        machineTimestamp
                      </h6>
                      <p className="w-[249px] h-[21px] font-medium text-darknavyblue opacity-80 tracking-tight text-xxs">
                        1755022522
                      </p>
                    </div>
                  </div>
                </div>
                {/* SDK Version  */}
                <div className="w-[439px] h-[120px]  mx-8 mb-9">
                  <h1 className="tracking-tight font-semibold text-xxs text-darknavyblue opacity-80 mb-5">
                    SDK Version
                  </h1>
                  <div className="w-[439px] h-[79px]">
                    {/* Version */}
                    <div className="w-[439px] h-[21px]  flex items-center mb-4">
                      <h6 className="w-[190px] h-[21px] font-medium text-darknavyblue opacity-60 tracking-tight text-xxs">
                        Version
                      </h6>
                      <p className="w-[249px] h-[21px] font-medium text-darknavyblue opacity-80 tracking-tight text-xxs">
                        v1.3.2
                      </p>
                    </div>
                    {/* link  */}
                    <div className="w-[439px] h-[42px]  flex items-start">
                      <h6 className="w-[190px] h-[21px] font-medium text-darknavyblue opacity-60 tracking-tight text-xxs">
                        link
                      </h6>
                      <p className="w-[249px] h-[42px] break-all font-medium text-darknavyblue opacity-80 tracking-tight text-xxs">
                        https://example.com/sdk/releases/v1.3.2
                      </p>
                    </div>
                  </div>
                </div>
                {/* Privacy Policy  */}
                <div className="w-[439px] h-[136px]  mx-8 mb-9">
                  <h1 className="tracking-tight font-semibold text-xxs text-darknavyblue opacity-80 mb-5">
                    Privacy Policy
                  </h1>
                  <div className="w-[439px] h-[95px]">
                    {/* privacyPolicy */}
                    <div className="w-[439px] h-[21px]  flex items-center mb-4">
                      <h6 className="w-[190px] h-[21px] font-medium text-darknavyblue opacity-60 tracking-tight text-xxs">
                        privacyPolicy
                      </h6>
                      <p className="w-[249px] h-[21px] font-medium text-darknavyblue opacity-80 tracking-tight text-xxs">
                        https://example.com/privacy/v1.3.2
                      </p>
                    </div>
                    {/* User Action */}
                    <div className="w-[439px] h-[21px]  flex items-center mb-4">
                      <h6 className="w-[190px] h-[21px] font-medium text-darknavyblue opacity-60 tracking-tight text-xxs">
                        User Action
                      </h6>
                      <p className="w-[249px] h-[21px] font-medium text-darknavyblue opacity-80 tracking-tight text-xxs">
                        accept
                      </p>
                    </div>
                    {/* actionTimestamp  */}
                    <div className="w-[439px] h-[21px]  flex items-center">
                      <h6 className="w-[190px] h-[21px] font-medium text-darknavyblue opacity-60 tracking-tight text-xxs">
                        actionTimeStamp
                      </h6>
                      <p className="w-[249px] h-[21px] font-medium text-darknavyblue opacity-80 tracking-tight text-xxs">
                        2024-06-12T14:35:22Z
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
