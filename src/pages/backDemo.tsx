import React from "react";
import { createBack } from "../oasis/back";

function App() {
	React.useEffect(() => {
		createBack();
	}, []);

	return (
		<canvas id="canvas" style={{ width: "100vw", height: "100vh" }}></canvas>
	);
}

export default App;
