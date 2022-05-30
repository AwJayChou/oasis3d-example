import React from "react";
import { createOasis } from "../oasis/pointEvent";

function App() {
	React.useEffect(() => {
		createOasis();
	}, []);

	return (
		<canvas id="pointerBox" style={{ width: "100vw", height: "100vh" }}></canvas>
	);
}

export default App;
