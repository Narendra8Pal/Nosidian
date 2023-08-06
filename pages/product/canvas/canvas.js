//styles, files, REACT
import Home from "../home";
import canvasStyles from "@/styles/canvas.module.css";
import CanvasStyles from "@/styles/canvas.module.css"
import CustomNode from "./customNode";
import { useState } from "react";
import TextUpdaterNode from "./textUpdaterNode";

// LIBRARIES
import "reactflow/dist/style.css";
import React, { useCallback, createContext } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  Panel,
  addEdge,
  Handle,
  Position,
  removeElements,
  applyNodeChanges,
  applyEdgeChanges,
} from "reactflow";
import Draggable, { DraggableCore } from "react-draggable";
import { useDrag } from "@use-gesture/react";


const userContext = createContext();

const proOptions = { hideAttribution: true };
const nodeTypes = { textUpdater: TextUpdaterNode }; // it will rerender if used inside the component

const canvas = () => {
  

  const initialNodes = [
    {
      id: "1",
      position: { x: 400, y: 400 },
      data: { value: 123 },
      type: "textUpdater",
    },
  ];

  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);





  // const onConnect = (params) => {
  //   if (params.source !== params.target) {
  //     const newEdge = {
  //       id: `edge-${params.source}-${params.target}`,
  //       source: params.source,
  //       target: params.target,
  //     };
  //     setEdges((prevEdges) => addEdge(newEdge, prevEdges));
  //   }
  // };


  const onNodesChange = useCallback(
    (changes) => setNodes((nodes) => applyNodeChanges(changes, nodes)),
    [setNodes]
  );

  const onEdgesChange = useCallback((changes) =>
    setEdges((edges) => applyEdgeChanges(changes, edges))
  );

  const handleCreateNode = () => {
    const newNode = {
      id: `${nodes.length + 1}`,
      position: { x: 450, y: 450 },
      data: { value: 123 },
      type: "textUpdater",
    }
    setNodes((prevNodes) => [...prevNodes, newNode]);
    console.log(newNode.id,'this is from handleCreateNode')
  };

  const handleCreateEdge = (sourceNodeId, targetNodeId) => {
    const newEdge = {
      id: `${sourceNodeId}-${targetNodeId}`,
      source: sourceNodeId,
      target: targetNodeId,
    }
    setEdges((prevEdges) => [...prevEdges, newEdge])
    console.log(newEdge.id, "handle createEdge func coming up")
  }

  return (
    <>
      <Home />

      <div style={{ width: "80vw", height: "100vh" }} className="float-right">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          // onConnect={onConnect}
          nodeTypes={nodeTypes}
          proOptions={proOptions}
          // fitView
        >
          <Panel
            position="bottom-center"
            className={canvasStyles.iconsBox}
            onClick={handleCreateNode}
          >
            <img src="/createCanvas.png" alt="" />
          </Panel>

          <Controls position="top-right" />

          <MiniMap
            nodeColor={"#FFFFFF"}
            // nodeStrokeColor={'#7649e6"'}
            // maskColor={"red"}
            style={{ backgroundColor: "#1a1916" }}
          />
          <Background variant="" gap={12} size={1} />

          <userContext.Provider value={nodes}>
            <TextUpdaterNode/>
          </userContext.Provider>



        </ReactFlow>
      </div>
    </>
  );
};

export default canvas;
