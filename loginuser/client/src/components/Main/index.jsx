import styles from "./styles.module.css";

const Main = () => {
	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};

	return (
		
			
		<div className={styles.main_container}>
			
			<nav className={styles.navbar}>
				<div class="headss">
				<h1 align="center">Here is your User System</h1>
				</div>
				

				<button className={styles.white_btn} onClick={handleLogout}>
					
					Logout
				</button>

			</nav>

			<div className ={styles.head}><h1 align="center"><i>Click here on the link below to open the management system!</i></h1>
		<b>	<a className={styles.doit} href="http://localhost:8501/" target="_blank">User Management System</a></b></div>
		</div>
		
		
	);
};

export default Main;