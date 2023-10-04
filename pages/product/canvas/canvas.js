//styles, files, REACT
import Home from "../home";
import canvasStyles from "@/styles/canvas.module.css";
import { useState, useMemo, useContext, useEffect } from "react";
import TextUpdaterNode from "./textUpdaterNode.js";
import { FilesConnect } from "../userContext";

// LIBRARIES
import "reactflow/dist/style.css";
import React, { useCallback, createContext } from "react";
import ReactFlow, {
  ReactFlowProvider,
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
  NodeToolbar,
  updateEdge,
  ConnectionMode,
} from "reactflow";
import Draggable, { DraggableCore } from "react-draggable";
import { useDrag } from "@use-gesture/react";
import { v4 as uuidv4 } from "uuid";
import { Send_Flowers } from "next/font/google";

// const userContext = createContext();

const proOptions = { hideAttribution: true };
const nodeTypes = { textUpdater: TextUpdaterNode }; // it will rerender if used inside the component

const canvas = () => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [nodesId, setNodesId] = useState([]);
  const [rfInstance, setRfInstance] = useState(null)

  const {
    nodesContext,
    setNodesContext,
    deleteNodesContext,
    onDeleteNode,
    updateNodes,
    setUpdateNodes,
  } = useContext(FilesConnect);

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

  // const onConnect = (params) => {
  //   const {source, target, sourceHandle} = params;
  //   const newEdge = {
  //     id: `edge-${params.source}-${params.target}`,
  //     source: source,
  //     sourceHandle: sourceHandle,
  //     target: target,
  //   };
  //   setEdges((prevEdges) => addEdge(newEdge, prevEdges));
  // }

  const onConnect = useCallback(
    (connection) => setEdges((edges) => addEdge(connection, edges)),
    [setEdges]
  );

  // on node change is for node changes like node drag, init , edge select
  const onNodesChange = useCallback(
    (changes) => setNodes((nodes) => applyNodeChanges(changes, nodes)),
    [setNodes]
  );

  // to change an edge
  const onEdgesChange = useCallback(
    (changes) => setEdges((edges) => applyEdgeChanges(changes, edges)),
    [setEdges]
  );

  // onedgeupdate helps when edge is updated by dragging it to another handle
  const onEdgeUpdate = useCallback(
    (oldEdge, newConnection) =>
      setEdges((els) => updateEdge(oldEdge, newConnection, els)),
    []
  );

  const generateUniqueId = () => {
    // const uniqueId = uuidv4();
    // console.log(uniqueId)
    uuidv4();
  };
  // const sourceTopId = generateUniqueId();
  // const sourceLeftId = generateUniqueId();

  const handleCreateNode = async () => {
    try {
      const newNode = {
        id: `${nodes.length + 1}`,
        position: { x: 450, y: 450 },
        data: { value: "", toolbarPosition: Position.Top },
        type: "textUpdater",
        zIndex: 1000,
        isConnectable: true,
      };
      const response = await fetch(process.env.NEXT_PUBLIC_CANVAS_DATA, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newNode }),
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data.message);
      } else {
        console.log("Failed to create node on the server");
      }
      setNodes((prevNodes) => [...prevNodes, newNode]);
      setNodesContext((prevNodes) => [...prevNodes, newNode]);
      setNodesId(newNode.id);
      console.log(newNode.id, "handlecreatenode node id");
    } catch (error) {
      console.log("error creating a node", error);
    }
  };

  const handleSaveCanvas = async () => {
    try{
      const flow = rfInstance.toObject();
      const response = await fetch('/api/saveCanvas', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ canvasState: flow }),
      });
      if (response.ok) {
        console.log('canvas saved')
      } else {
        console.error('Error saving canvas state');
      }
    }
    catch{

    }
  };

  useEffect(() => {
    setNodes(deleteNodesContext);
    console.log(deleteNodesContext, "deletenodecontext in useeffect");
    setUpdateNodes(false);
    console.log("set update nodes set to false");
  }, [updateNodes]);

  const handleCreateEdge = (sourceNodeId, targetNodeId) => {
    const newEdge = {
      id: `${edges.length + 1}`,
      source: nodesId,
      sourceHandle: "a",
      target: 2,
    };
    // setEdges((prevEdges) => [...prevEdges, newEdge]);
    // console.log(newEdge.id, "handle createEdge func coming up");
  };

  // const onConnect = useCallback(
  //   (connection) => setEdges((eds) => addEdge(connection, eds)),
  //   [setEdges]
  // );

  // const onDeleteNode = () => {
  //   setNodes(nodes.filter((node) => !nodesId.includes(node.id)));
  // };

  return (
    <>
      <Home />

      <ReactFlowProvider>
        <div style={{ width: "80vw", height: "100vh" }} className="float-right">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onEdgeUpdate={onEdgeUpdate}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            proOptions={proOptions}
            deleteKeyCode={null}
            // onDeleteNode={onDeleteNode}
            // fitView
            // connectionMode={ConnectionMode.Loose}
          >
            <Panel
              position="bottom-center"
              className={canvasStyles.iconsBox}
              onClick={handleCreateNode}
            >
              <img src="/createCanvas.png" alt="" />
            </Panel>
            <Panel
              position="top-right"
              className={canvasStyles.saveIcon}
              onClick={handleSaveCanvas}
            >
              <img src="/saveflow.png" alt="" />
            </Panel>
            <Controls position="bottom-left" />

            <MiniMap
              nodeColor={"#FFFFFF"}
              // nodeStrokeColor={'#7649e6"'}
              // maskColor={"red"}
              style={{ backgroundColor: "#1a1916" }}
            />
            <Background variant="" gap={12} size={1} />
          </ReactFlow>
        </div>
      </ReactFlowProvider>
    </>
  );
};

export default canvas;
