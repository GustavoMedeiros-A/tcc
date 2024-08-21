import React from "react";
import { useNavigate } from "react-router-dom";
import Text from "../components/Text";
import Button from "../components/Button";
import image from "/Image.png";

const HomeScreen: React.FC = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/main");
  };

  //   const handleSignIn = () => {
  //     console.log("Sign in clicked");
  //   };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "50px",
        }}
      >
        <img
          src={image}
          alt="Performance Monitor"
          style={{ width: "400px", height: "auto", marginRight: "50px" }}
        />
        <div style={{ textAlign: "center" }}>
          <Text size="48px" color="#fff" bold>
            DBAnalyzer
          </Text>
          <Text size="20px" color="#aaa">
            Monitor performance, CPU and RAM memory with real-time graphs!
          </Text>
          <div
            style={{
              marginTop: "30px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <Button
              label="Get started"
              onClick={handleGetStarted}
              backgroundColor="#d70d0c"
              width="35vh"
            />
            {/* <Button
              label="Sign in"
              onClick={handleSignIn}
              backgroundColor="#fff"
              color="#000"
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
