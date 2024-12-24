// /src/index.js
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store/store";
import App from "./App";
import "./index.module.css";

// Get the root element from the DOM
const root = ReactDOM.createRoot(document.getElementById("root"));

// Render the application inside the root element
root.render(
	<Provider store={store}>
		{" "}
		{/* Provide the Redux store to the app */}
		<App /> {/* Render the main App component */}
	</Provider>
);
