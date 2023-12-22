import { ReactFlowProvider } from "reactflow";
import Canvas from "../../../utils/canvas.js";

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
