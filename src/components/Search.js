import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export function Search() {
  const navigate = useNavigate();
  const [input, setInput] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    navigate("/searched/" + input);
  };

  return (
    <form
      onSubmit={submitHandler}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "0 20px",
        marginTop: "20px",
      }}
    >
      <div
        style={{
          position: "relative",
        }}
      >
        <FaSearch
          style={{
            position: "absolute",
            top: "50%",
            left: "0%",
            transform: "translate(100%, -50%)",
            color: "white",
          }}
        />
        <input
          type="text"
          style={{
            border: "none",
            background: "linear-gradient(35deg, #494949, #313131)",
            fontSize: "1.5rem",
            color: "white",
            padding: "1rem 3rem",
            borderRadius: "1rem",
            outline: "none",
            width: "100%", // Set the input width to 100% to make it responsive.
          }}
          onChange={(e) => setInput(e.target.value)}
          value={input}
        />
      </div>
    </form>
  );
}
