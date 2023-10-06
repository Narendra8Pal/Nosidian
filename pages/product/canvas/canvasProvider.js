import ReactFlow, { ReactFlowProvider } from "reactflow";
import Canvas from "./canvas.js";

const canvasProvider = () => {
  return (
    <>
      <ReactFlowProvider>
      <Canvas />
      </ReactFlowProvider>
    </>
  );
};
export default canvasProvider;
