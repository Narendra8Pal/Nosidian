// REACT, files, styles
import { useState, useContext, useEffect, useRef } from "react";
import { useCallback, memo } from "react";
import {
  Handle,
  Position,
  NodeResizer,
  NodeResizeControl,
  useNodeId,
} from "reactflow";
import CanvasStyles from "@/styles/canvas.module.css";
import { userContext } from "./canvas.js";
import { v4 as uuidv4 } from "uuid";

function TextUpdaterNode({ nodesId, nodes, isConnectable, onCreateEdge }) {
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [nodeSize, setNodeSize] = useState({ width: 300, height: 60 });
  const [bottomLineHovered, setBottomLineHovered] = useState(false);
  const [topLineHovered, setTopLineHovered] = useState(false);
  const [leftLineHovered, setLeftLineHovered] = useState(false);
  const [rightLineHovered, setRightLineHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [handleType, setHandleType] = useState("target");
  const [topLineNodeId, setTopLineNodeId] = useState("");
  const [leftLineNodeId, setLeftLineNodeId] = useState("");
  const [bottomLineNodeId, setBottomLineNodeId] = useState("");
  const [rightLineNodeId, setRightLineNodeId] = useState("");

  const nodeRef = useRef(null);
  const nodeId = useNodeId();

  const onChange = useCallback((e) => {
    // console.log(evt.target.value);
  }, []);

  const onInputDoubleClick = useCallback(() => {
    setIsInputFocused(true);
  }, []);

  const onInputBlur = useCallback(() => {
    setIsInputFocused(false);
    // setIsActive(false)
  }, []);

  const onNodeResize = useCallback(() => {
    setNodeSize({ width: "100%", height: "100%" });
  }, []);

  // const nodes = useContext(userContext);

  // if (!nodes || !Array.isArray(nodes)) {
  //   console.log(nodes, "nodes is not ready");
  //   return null;
  // }

  const handleDoubleClick = () => {
    setIsActive(true);
    console.log(nodeId, "NODE ID DOO CLICK");
  };

  const handleClickOutside = (e) => {
    if (nodeRef.current && !nodeRef.current.contains(e.target)) {
      setIsActive(false);
      // console.log(nodeRef.current,"clickon on node id")
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // const sourceHandleId = uuidv4();
  // const targetHandleId = uuidv4();

  const onSourceConnect = (params) => {
    const { source, sourceHandle } = params;
    // Handle source connections here, using nodeId and sourceHandle
    // console.log(`Source connected from ${source} to ${nodeId} using handle ${sourceHandle}`);
  };

  const onTargetConnect = (params) => {
    const { target, targetHandle } = params;
    // Handle target connections here, using nodeId and targetHandle
    console.log(
      `Target connected from ${nodeId} NODE ID HERE to ${target} using handle ${targetHandle}`
    );
  };

  // const handleNodeHover = () => {
  //   // console.log(nodeId,'node id of a node hovered')
  //   if (topLineNodeId === nodeId) {
  //     setHandleType("source");
  //     console.log("handle type set to source bro");
  //   }
  // };

  const handleTLMouseEnter = () => {
    setTopLineHovered(true);
    setTopLineNodeId(nodeId);
    console.log("handle mouse TL enter ", nodeId);
  };

  const handleBLMouseEnter = () => {
    setBottomLineHovered(true);
    setBottomLineNodeId(nodeId);
    console.log("handle mouse BL enter ", nodeId);
  };

  const handleLLMouseEnter = () => {
    setLeftLineHovered(true);
    setLeftLineNodeId(nodeId);
    console.log("handle mouse LL enter ", nodeId);
  };

  const handleRLMouseEnter = () => {
    setRightLineHovered(true);
    setRightLineNodeId(nodeId);
    console.log("handle mouse RL enter ", nodeId);
  };

  const handleTLMouseLeave = () => {
    setTopLineHovered(false);
  };

  const handleLLMouseLeave = () => {
    setLeftLineHovered(false);
  };

  const handleBLMouseLeave = () => {
    setBottomLineHovered(false);
  };

  const handleRLMouseLeave = () => {
    setRightLineHovered(false);
  };

  const toggleHandleType = () => {
    // setHandleType((prevType) => (prevType === "source" ? "target" : "source"));
    // console.log(handleType);
    if (topLineHovered) {
      setHandleType(nodeId === topLineNodeId ? "source" : "target");
    } else if (leftLineHovered) {
      setHandleType(nodeId === leftLineNodeId ? "source" : "target");
    } else if (bottomLineHovered) {
      setHandleType(nodeId === bottomLineNodeId ? "source" : "target");
    } else if (rightLineHovered) {
      setHandleType(nodeId === rightLineNodeId ? "source" : "target");
    }
  };

  useEffect(() => {
    toggleHandleType();
  }, [
    // handleBLMouseEnter,
    handleTLMouseEnter,
    handleLLMouseEnter,
    handleRLMouseEnter,
  ]);

  useEffect(() => {
    setHandleType("target");
  }, [
    handleTLMouseLeave,
    handleBLMouseLeave,
    handleRLMouseLeave,
    handleLLMouseLeave,
  ]);

  // useEffect(() => {
  //   toggleHandleType();
  // }, [nodeRef]);

  return (
    <div
      className="nowheel"
      style={{ width: nodeSize.width, height: nodeSize.height }}
    >
      <div>
        <Handle
          type={handleType}
          // id="handle-top"
          id={`${nodeId}-handle-top`}
          position={Position.Top}
          isConnectable={true}
          style={{
            background: "#7649e6",
            border: "none",
            height: "15px",
            width: "15px",
            opacity: topLineHovered ? 1 : 0,
          }}
          // onConnect={onConnect}
          onConnect={(params) => console.log("handle onConnect", params)}
          // onConnect={handleType === 'source' ? onSourceConnect : onTargetConnect}
        />
        <Handle
          type={handleType}
          // id="handle-left"
          id={`${nodeId}-handle-left`}
          position={Position.Left}
          isConnectable={true}
          style={{
            background: "#7649e6",
            border: "none",
            height: "15px",
            width: "15px",
            opacity: leftLineHovered ? 1 : 0,
          }}
          // onConnect={onConnect}
          // onConnect={(params) => console.log("handle onConnect", params)}
          // onConnect={handleType === 'source' ? onSourceConnect : onTargetConnect}
          onConnect={(params) => console.log("handle onConnect", params)}
        />
        {/* <Handle
          type="source"
          // id="handle-right"
          id={`${nodeId}-handle-right`}
          position={Position.Right}
          isConnectable={true}
          style={{
            background: "#7649e6",
            border: "none",
            height: "15px",
            width: "15px",
            opacity: rightLineHovered ? 1 : 0,
          }}
          // onConnect={(params) => console.log("handle onConnect", params)}
          // onConnect={handleType === 'source' ? onSourceConnect : onTargetConnect}

        />
        <Handle
          type="source"
          // id="handle-bottom"
          id={`${nodeId}-handle-bottom`}
          position={Position.Bottom}
          isConnectable={true}
          style={{
            background: "#7649e6",
            border: "none",
            height: "15px",
            width: "15px",
            opacity: bottomLineHovered ? 1 : 0,
          }}
          // onConnect={(params) => console.log("handle onConnect", params)}
          // onConnect={handleType === 'source' ? onSourceConnect : onTargetConnect}
        />
        
        <Handle
          // id={`${nodes.id}-top`}
          type="target"
          // id="handle-top"
          id={`${nodeId}-handle-top`}
          position={Position.Top}
          isConnectable={true}
          style={{
            background: "#7649e6",
            border: "none",
            height: "15px",
            width: "15px",
            opacity: topLineHovered ? 1 : 0,
          }}
          // onConnect={onConnect}
          // onConnect={handleType === 'source' ? onSourceConnect : onTargetConnect}
          onConnect={(params) => console.log('handle onConnect', params)}
        />
        <Handle
          // id={`${nodesId}-left`}
          type="target"
          // id="handle-left"
          id={`${nodeId}-handle-left`}
          position={Position.Left}
          isConnectable={true}
          style={{
            background: "#7649e6",
            border: "none",
            height: "15px",
            width: "15px",
            opacity: leftLineHovered ? 1 : 0,
          }}
          // onConnect={onConnect}
          // onConnect={(params) => console.log("handle onConnect", params)}
          // onConnect={handleType === 'source' ? onSourceConnect : onTargetConnect}
          onConnect={(params) => console.log('handle onConnect', params)}
        /> */}
        <Handle
          // id={`${nodes.id}-right`}
          type={handleType}
          // id="handle-right"
          id={`${nodeId}-handle-right`}
          position={Position.Right}
          isConnectable={true}
          style={{
            background: "#7649e6",
            border: "none",
            height: "15px",
            width: "15px",
            opacity: rightLineHovered ? 1 : 0,
          }}
          // onConnect={onConnect}
          // onConnect={handleType === 'source' ? onSourceConnect : onTargetConnect}
          onConnect={(params) => console.log("handle onConnect", params)}
        />

        <Handle
          // id={`${nodes.id}-bottom`}
          type={handleType}
          // id="handle-bottom"
          id={`${nodeId}-handle-bottom`}
          position={Position.Bottom}
          isConnectable={true}
          style={{
            background: "#7649e6",
            border: "none",
            height: "15px",
            width: "15px",
            opacity: bottomLineHovered ? 1 : 0,
          }}
          // onConnect={onConnect}
          // onConnect={(params) => console.log("handle onConnect", params)}
          // onConnect={handleType === 'source' ? onSourceConnect : onTargetConnect}
          onConnect={(params) => console.log("handle onConnect", params)}
        />
      </div>

      <div className={CanvasStyles.nodeBox}>
        <textarea
          id={uuidv4()}
          name="text"
          // value={nodes.label}
          onChange={onChange}
          onBlur={onInputBlur}
          onDoubleClick={handleDoubleClick}
          ref={nodeRef}
          readOnly={!isActive}
          className={isActive ? "nodrag" : ""}
        ></textarea>

        <div
          // onMouseEnter={() => setTopLineHovered(true)}
          // onMouseLeave={() => setTopLineHovered(false)}
          onMouseEnter={handleTLMouseEnter}
          onMouseLeave={handleTLMouseLeave}
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
          onMouseEnter={handleBLMouseEnter}
          onMouseLeave={handleBLMouseLeave}
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
          onMouseEnter={handleLLMouseEnter}
          onMouseLeave={handleLLMouseLeave}
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
          onMouseEnter={handleRLMouseEnter}
          onMouseLeave={handleRLMouseLeave}
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

export default memo(TextUpdaterNode);
