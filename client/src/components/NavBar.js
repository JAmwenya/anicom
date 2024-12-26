// /src/components/Navbar.js
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUserAsync } from "../features/auth/authAction";
import styles from "../styles/Navbar.module.css";

const Navbar = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { isAuthenticated, user } = useSelector((state) => state.auth);

	const handleLogout = (e) => {
		e.preventDefault();
		dispatch(logoutUserAsync());
		navigate("/"); // Redirect to the homepage after logout
	};

	return (
		<nav className={styles.header}>
			{/* Navigation Links */}
			<nav className={styles.navbar}>
				<Link
					to="/"
					className={styles.navLink}>
					Home
				</Link>
				<Link
					to="/episode"
					className={styles.navLink}>
					Episode
				</Link>
				<Link
					to="/content"
					className={styles.navLink}>
					Content
				</Link>
				<Link
					to="/profile"
					className={styles.navLink}>
					Profile
				</Link>
			</nav>

			{/* Authentication Links */}
			<ul className={styles.authLinks}>
				{isAuthenticated && user ? (
					<>
						<li>
							<Link
								to="/"
								onClick={handleLogout}
								className={styles.authLink}>
								Logout
							</Link>
						</li>
					</>
				) : (
					<>
						<li>
							<Link
								to="/login"
								className={styles.authLink}>
								Login
							</Link>
						</li>
					</>
				)}
			</ul>
		</nav>
	);
};

export default Navbar;
