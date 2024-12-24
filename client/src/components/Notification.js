// /src/components/Notification.js
import React from "react";
import styles from "../styles/Notification.module.css";

const Notification = ({ message }) => {
	return <div className={styles.notification}>{message}</div>;
};

export default Notification;
