import React, { useState } from "react";
import hypervergeLogo from "../assets/sidebar1/hyperverge.png";

export const Sidebar = () => {
  const [sidebar2Visibility, setSidebar2Visibility] = useState(false);
  const [sidebar2Content, setSidebar2Content] = useState({});

  //Sidebar - 1  Nav item
  const sidebar1NavItems = [
    {
      title: "Applications",
    },
    {
      title: "Analytics",
    },
    {
      title: "Workflows",
    },
    {
      title: "Dev Hub",
    },
    {
      title: "Account",
    },
    {
      title: "Consent Manager",
    },
  ];

  //Account Components
  const home = {
    title: "Home",
    components: [
      {
        name: "Demo",
        path: "/home/demo",
      },
      {
        name: "Configurations",
        path: "/home/configurations",
      },
      {
        name: "Search",
        path: "/home/search",
      },
    ],
  };
  //Account Components
  const account = {
    title: "Account",
    components: [
      {
        name: "Demo",
        path: "/account/demo",
      },
      {
        name: "Configurations",
        path: "/account/configurations",
      },
      {
        name: "Search",
        path: "/account/search",
      },
    ],
  };
  //Concent manager Components
  const analytics = {
    title: "Analytics",
    components: [
      {
        name: "Demo",
        path: "/analytics/demo",
      },
      {
        name: "Configurations",
        path: "/analytics/configurations",
      },
      {
        name: "Search",
        path: "/analytics/search",
      },
    ],
  };
  //Concent manager Components
  const applications = {
    title: "Applications",
    components: [
      {
        name: "Demo",
        path: "/applications/demo",
      },
      {
        name: "Configurations",
        path: "/applications/configurations",
      },
      {
        name: "Search",
        path: "/applications/search",
      },
    ],
  };
  //Concent manager Components
  const devHub = {
    title: "Dev Hub",
    components: [
      {
        name: "Demo",
        path: "/devhub/demo",
      },
      {
        name: "Configurations",
        path: "/devhub/configurations",
      },
      {
        name: "Search",
        path: "/devhub/search",
      },
    ],
  };
  //Concent manager Components
  const workflows = {
    title: "Workflows",
    components: [
      {
        name: "Demo",
        path: "/workflows/demo",
      },
      {
        name: "Configurations",
        path: "/workflows/configurations",
      },
      {
        name: "Search",
        path: "/workflows/search",
      },
    ],
  };
  //Concent manager Components
  const consentManager = {
    title: "Consent Manager",
    components: [
      {
        name: "Demo",
        path: "/concentManager/demo",
      },
      {
        name: "Configurations",
        path: "/concentManager/configurations",
      },
      {
        name: "Search",
        path: "/concentManager/search",
      },
    ],
  };

  const handleSidebar1Click = (component) => {
    if (!sidebar2Visibility) setSidebar2Visibility(true);
    switch (component) {
      case "Account": {
        setSidebar2Visibility(true);
        setSidebar2Content(account);
        break;
      }
      case "Analytics": {
        setSidebar2Visibility(true);
        setSidebar2Content(analytics);
        break;
      }
      case "Applications": {
        setSidebar2Visibility(true);
        setSidebar2Content(applications);
        break;
      }
      case "Consent Manager": {
        setSidebar2Visibility(true);
        setSidebar2Content(consentManager);
        break;
      }
      case "Dev Hub": {
        setSidebar2Visibility(true);
        setSidebar2Content(devHub);
        break;
      }
      case "Home": {
        setSidebar2Visibility(true);
        setSidebar2Content(home);
        break;
      }
      case "Workflows": {
        setSidebar2Visibility(true);
        setSidebar2Content(workflows);
        break;
      }
    }
  };

  return (
    <div className="h-screen flex">
      <div className="bg-darkblue w-side_1 h-screen flex justify-between py-5 p-0.5">
        <div className="h-full w-16.5">
          {/* Hyperverge Logo  */}
          <div className="flex justify-center px-2.25">
            <img
              src={hypervergeLogo}
              alt=""
              className="w-7 h-7.77 mt-2 mb-2.22  mx-2.5"
            />
          </div>
          <div className="h-104 w-16.5 mt-4">
            <ul>
              <li
                key={0}
                className="h-13 flex flex-col items-center justify-center py-2"
                onClick={() => handleSidebar1Click("Home")}
              >
                <img
                  src="./src/assets/sidebar1/Home.png"
                  alt="Home"
                  className="h-6 w-6 hover:bg-darkslategray active:bg-darkslategray rounded-m"
                />
                <p className="font-medium text-s text-lavendergrey text-center pt-0.5">
                  Home
                </p>
              </li>
              {sidebar1NavItems.map((navItems, index) => {
                return (
                  <li
                    className="min-h-12 flex flex-col justify-center items-center mt-3 cursor-pointer"
                    key={index + 1}
                    onClick={() => handleSidebar1Click(navItems.title)}
                  >
                    <img
                      src={`./src/assets/sidebar1/${navItems.title}.png`}
                      alt={navItems.title}
                      className="h-6 w-6 m-1 hover:bg-darkslategray active:bg-darkslategray rounded-m"
                    />
                    <p className="font-medium text-s text-gainsboro text-center pt-0.5">
                      {navItems.title}
                    </p>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
      <div
        className={`border border-gainsboro bg-snow h-screen duration-500 transform ${
          sidebar2Visibility ? "translate-x-0 w-side_2" : "-translate-x-0 w-0"
        }`}
      >
        <div className={`${!sidebar2Visibility ? "hidden" : ""}`}>
          <h1>{sidebar2Content.title}</h1>
        </div>
      </div>
    </div>
  );
};
