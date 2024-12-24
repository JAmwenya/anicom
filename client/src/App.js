// /src/App.js
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/NavBar";
import Footer from "./components/Footer";
import RouterComponent from "./routes/Router";
import styles from "./styles/App.module.css";

const App = () => {
	return (
		<Router>
			<Navbar />
			<div className={styles.content}>
				<RouterComponent />
			</div>
			<Footer />
		</Router>
	);
};

export default App;
