// REACT, files, styles
import { useCallback, useState, useContext, useEffect } from "react";
import { Handle, Position, NodeResizer, NodeResizeControl } from "reactflow";
import CanvasStyles from "@/styles/canvas.module.css";
import { userContext } from "./canvas.js";

function TextUpdaterNode({ nodes, isConnectable,  onCreateEdge }) {
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [nodeSize, setNodeSize] = useState({ width: 300, height: 60 });
  const [bottomLineHovered, setBottomLineHovered] = useState(false);
  const [topLineHovered, setTopLineHovered] = useState(false);
  const [leftLineHovered, setLeftLineHovered] = useState(false);
  const [rightLineHovered, setRightLineHovered] = useState(false);

  const onChange = useCallback((evt) => {
    // console.log(evt.target.value);
  }, []);

  const onInputDoubleClick = useCallback(() => {
    setIsInputFocused(true);
  }, []);

  const onInputBlur = useCallback(() => {
    setIsInputFocused(false);
  }, []);

  const onNodeResize = useCallback(() => {
    setNodeSize({ width: "100%", height: "100%" });
  }, []);

  // const nodes = useContext(userContext);

  // if (!nodes || !Array.isArray(nodes)) {
  //   console.log(nodes, "nodes is not ready");
  //   return null;
  // }

  const onConnect = (params) => {
    if (params.source !== params.target) {
      onCreateEdge(params.source, params.target);
    }
  };

  return (
    <div
      className="nowheel"
      style={{ width: nodeSize.width, height: nodeSize.height }}
    >
      <div>
        <Handle
          type="source"
          id="1"
          position={Position.Top}
          isConnectable={true}
          style={{
            background: "#7649e6",
            border: "none",
            height: "15px",
            width: "15px",
            opacity: topLineHovered ? 1 : 0,
          }}
          onConnect={onConnect}
        />
        <Handle
          type="source"
          id="1"
          position={Position.Left}
          isConnectable={true}
          style={{
            background: "#7649e6",
            border: "none",
            height: "15px",
            width: "15px",
            opacity: leftLineHovered ? 1 : 0,
          }}
          onConnect={onConnect}
        />
        <Handle
          type="source"
          id="1"
          position={Position.Right}
          isConnectable={true}
          style={{
            background: "#7649e6",
            border: "none",
            height: "15px",
            width: "15px",
            opacity: rightLineHovered ? 1 : 0,
          }}
          onConnect={onConnect}
        />
        <Handle
          type="source"
          id="1"
          position={Position.Bottom}
          isConnectable={true}
          style={{
            background: "#7649e6",
            border: "none",
            height: "15px",
            width: "15px",
            opacity: bottomLineHovered ? 1 : 0,
          }}
          onConnect={onConnect}
        />

        <Handle
          // id={`${nodes.id}-top`}
          type="target"
          id="2"
          position={Position.Top}
          isConnectable={true}
          style={{
            background: "#7649e6",
            border: "none",
            height: "15px",
            width: "15px",
            opacity: topLineHovered ? 1 : 0,
          }}
          onConnect={onConnect}
        />
        <Handle
          // id={`${nodes.id}-left`}
          type="target"
          id="2"
          position={Position.Left}
          isConnectable={true}
          style={{
            background: "#7649e6",
            border: "none",
            height: "15px",
            width: "15px",
            opacity: leftLineHovered ? 1 : 0,
          }}
          onConnect={onConnect}
        />
        <Handle
          // id={`${nodes.id}-right`}
          type="target"
          id="2"
          position={Position.Right}
          isConnectable={true}
          style={{
            background: "#7649e6",
            border: "none",
            height: "15px",
            width: "15px",
            opacity: rightLineHovered ? 1 : 0,
          }}
          onConnect={onConnect}
        />

        <Handle
          // id={`${nodes.id}-bottom`}
          type="target"
          id="2"
          position={Position.Bottom}
          isConnectable={false}
          style={{
            background: "#7649e6",
            border: "none",
            height: "15px",
            width: "15px",
            opacity: bottomLineHovered ? 1 : 0,
          }}
          onConnect={onConnect}
        />
      </div>

      <div className={CanvasStyles.nodeBox}>
        <textarea
          id="text"
          name="text"
          // value={nodes.label}
          onChange={onChange}
          onBlur={onInputBlur}
        ></textarea>

        <div
          onMouseEnter={() => setTopLineHovered(true)}
          onMouseLeave={() => setTopLineHovered(false)}
        >
          <NodeResizeControl
            isVisible={true}
            onResize={onNodeResize}
            variant="line"
            position="top"
            minHeight={60}
            minWidth={300}
            style={{ opacity: 0, height: "10px" }}
          />
        </div>

        <div
          onMouseEnter={() => setBottomLineHovered(true)}
          onMouseLeave={() => setBottomLineHovered(false)}
        >
          <NodeResizeControl
            isVisible={true}
            onResize={onNodeResize}
            variant="line"
            position="bottom"
            minHeight={60}
            minWidth={300}
            style={{ opacity: 0, height: "10px" }}
          />
        </div>

        <div
          onMouseEnter={() => setLeftLineHovered(true)}
          onMouseLeave={() => setLeftLineHovered(false)}
        >
          <NodeResizeControl
            isVisible={true}
            onResize={onNodeResize}
            variant="line"
            position="left"
            minHeight={60}
            minWidth={300}
            style={{ opacity: 0, width: "10px" }}
          />
        </div>

        <div
          onMouseEnter={() => setRightLineHovered(true)}
          onMouseLeave={() => setRightLineHovered(false)}
        >
          <NodeResizeControl
            isVisible={true}
            onResize={onNodeResize}
            variant="line"
            position="right"
            minHeight={60}
            minWidth={300}
            style={{ opacity: 0, width: "10px" }}
          />
        </div>
      </div>
    </div>
  );
}

export default TextUpdaterNode;
