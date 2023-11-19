// REACT, files, styles
import { useState, useContext, useEffect, useRef } from "react";
import { useCallback, memo } from "react";
import { FilesConnect } from "../userContext.js";
import {
  Handle,
  Position,
  NodeResizer,
  NodeResizeControl,
  useNodeId,
  NodeToolbar,
} from "reactflow";
import CanvasStyles from "@/styles/canvas.module.css";
import { userContext } from "./canvas.js";
import { v4 as uuidv4 } from "uuid";

function TextUpdaterNode() {
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [nodeSize, setNodeSize] = useState({ width: 300, height: 60 });
  const [bottomLineHovered, setBottomLineHovered] = useState(false);
  const [topLineHovered, setTopLineHovered] = useState(false);
  const [leftLineHovered, setLeftLineHovered] = useState(false);
  const [rightLineHovered, setRightLineHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [text, setText] = useState([]);
  const [nodeTexts, setNodeTexts] = useState([{}]);

  const nodeRef = useRef(null);
  const nodeId = useNodeId();
  const {
    onDeleteNode,
    setNodeIdContext,
    setTextContext,
    textContext,
    nodesContext,
    setNodesContext,
    nodeIdContext,
    setGetNodeContext,
    textareaId,
    nodeItems,
    setNodeItems,
    getTextContext,
    canvasDataContext,
  } = useContext(FilesConnect);
  
  const addTextWithId = (newText, nodeId) => {
    // setTextContext((prevText) => [...prevText,  newText]);
    
    setTextContext(newText);
    setText((prevText) => [...prevText, newText]);
    console.log(text,':text state')
  };
  
  const onChange = useCallback((e, nodeId) => {
    // const newText = { ...setTextContext, [nodeId]: e.target.value };
    const newText = { [nodeId]: e.target.value };
    console.log(newText);
    setNodeTexts(newText);
    // setTextContext((prev) => [...prev, newText]);
    
    addTextWithId(newText, nodeId);
  }, []);
  
  const onInputDoubleClick = useCallback(() => {
    setIsInputFocused(true);
  }, []);
  
  const onInputBlur = useCallback(() => {
    setIsInputFocused(false);
    // setIsActive(false)'
  }, []);
  
  const onNodeResize = useCallback(() => {
    setNodeSize({ width: "100%", height: "100%" });
  }, []);
  
  const handleDoubleClick = () => {
    setIsActive(true);
    console.log(nodeId, "NODE ID DOO CLICK");
    setNodeIdContext(nodeId);
    setGetNodeContext(true);
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

  // const onDeleteNode = () => {
  //   setNodesContext(nodesContext.filter((node) => !nodeId.includes(node.id)));
  //   console.log(nodesContext, 'delte works')
  // };

  return (
    <div
      className="nowheel"
      style={{ width: nodeSize.width, height: nodeSize.height }}
    >
      <NodeToolbar>
        <div className={CanvasStyles.nodeIconsBox}>
          <img
            src="/nodeDelete.png"
            alt=""
            onClick={onDeleteNode}
            className={CanvasStyles.iconsHover}
          />
        </div>
      </NodeToolbar>
      <div>
        <Handle
          type="source"
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
          onConnect={(params) => console.log("handle onConnect", params)}
        />
        <Handle
          type="source"
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
          onConnect={(params) => console.log("handle onConnect", params)}
        />

        <Handle
          type="target"
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
          onConnect={(params) => console.log("handle onConnect", params)}
        />

        <Handle
          type="target"
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
          onConnect={(params) => console.log("handle onConnect", params)}
        />
      </div>

      <div className={CanvasStyles.nodeBox}>
        {textContext && 
          // .filter((nodes) => nodes.id === textareaId)
          // .map((node, index) => (
          //   <div key={uuidv4()}>
              <textarea
                name="text"
                id={uuidv4()} 
                onChange={(e) => onChange(e, nodeIdContext)}
                // value={textContext[nodeIdContext] || ""}
                value={text}
                onBlur={onInputBlur}
                onDoubleClick={handleDoubleClick}
                ref={nodeRef}
                readOnly={!isActive}
                className={isActive ? "nodrag" : ""}
              />
            //  </div>
          // ))
          } 

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

export default memo(TextUpdaterNode);
