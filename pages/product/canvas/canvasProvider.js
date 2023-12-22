import { ReactFlowProvider } from "reactflow";
import Canvas from "./canvas.js";

const canvasProvider = (props) => {
  return (
    <>
      <ReactFlowProvider>
        <Canvas {...props} />
      </ReactFlowProvider>
    </>
  );
};
export default canvasProvider;
