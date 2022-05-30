import React from "react";
import { createOsis } from "../oasis/game";

function App() {
	React.useEffect(() => {
		console.log('## enter')
		createOsis();
	}, []);

	return (
		<canvas id="canvas" style={{ width: "100vw", height: "100vh" }}></canvas>
	);
}

export default App;
