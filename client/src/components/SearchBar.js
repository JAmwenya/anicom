// src/components/SearchBar.js
import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "../styles/SearchBar.module.css";

const SearchBar = ({
	onSearch,
	availableTags = [],
	availableStatuses = [],
	placeholder = "Search...",
}) => {
	const [query, setQuery] = useState("");
	const [selectedTag, setSelectedTag] = useState("");
	const [selectedStatus, setSelectedStatus] = useState("");

	const handleQueryChange = (e) => {
		const newQuery = e.target.value;
		setQuery(newQuery);
		onSearch({ query: newQuery, tag: selectedTag, status: selectedStatus });
	};

	const handleTagChange = (e) => {
		const newTag = e.target.value;
		setSelectedTag(newTag);
		onSearch({ query, tag: newTag, status: selectedStatus });
	};

	const handleStatusChange = (e) => {
		const newStatus = e.target.value;
		setSelectedStatus(newStatus);
		onSearch({ query, tag: selectedTag, status: newStatus });
	};

	const handleClear = () => {
		setQuery("");
		setSelectedTag("");
		setSelectedStatus("");
		onSearch({ query: "", tag: "", status: "" });
	};

	return (
		<div className={styles["search-bar-container"]}>
			<div className={styles["search-input"]}>
				<input
					type="text"
					value={query}
					onChange={handleQueryChange}
					placeholder={placeholder}
					className={styles.input}
				/>
				{query && (
					<button
						type="button"
						onClick={handleClear}
						className={styles.button}>
						X
					</button>
				)}
			</div>

			<div className={styles.filters}>
				{availableTags.length > 0 && (
					<select
						value={selectedTag}
						onChange={handleTagChange}
						className={styles.select}>
						<option value="">All Tags</option>
						{availableTags.map((tag) => (
							<option
								key={tag}
								value={tag}>
								{tag}
							</option>
						))}
					</select>
				)}
				{availableStatuses.length > 0 && (
					<select
						value={selectedStatus}
						onChange={handleStatusChange}
						className={styles.select}>
						<option value="">All Statuses</option>
						{availableStatuses.map((status) => (
							<option
								key={status}
								value={status}>
								{status}
							</option>
						))}
					</select>
				)}
			</div>
		</div>
	);
};

SearchBar.propTypes = {
	onSearch: PropTypes.func.isRequired,
	availableTags: PropTypes.array,
	availableStatuses: PropTypes.array,
	placeholder: PropTypes.string,
};

export default SearchBar;
