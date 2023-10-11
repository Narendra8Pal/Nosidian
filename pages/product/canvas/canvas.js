//styles, files, REACT
import Home from "../home";
import canvasStyles from "@/styles/canvas.module.css";
import { useState, useMemo, useContext, useEffect } from "react";
import TextUpdaterNode from "./textUpdaterNode.js";
import { FilesConnect } from "../userContext";
import { useRouter } from "next/router";

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
  useReactFlow,
} from "reactflow";
import Draggable, { DraggableCore } from "react-draggable";
import { useDrag } from "@use-gesture/react";
import { v4 as uuidv4 } from "uuid";
import { Send_Flowers } from "next/font/google";

// const userContext = createContext();

const proOptions = { hideAttribution: true };
const nodeTypes = { textUpdater: TextUpdaterNode }; // it will rerender if used inside the component

const Canvas = () => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [nodesId, setNodesId] = useState([]);
  const [rfInstance, setRfInstance] = useState(null);
  const [canvasState, setCanvasState] = useState({});

  const {
    nodesContext,
    setNodesContext,
    deleteNodesContext,
    onDeleteNode,
    updateNodes,
    setUpdateNodes,
  } = useContext(FilesConnect);

  const { setViewport } = useReactFlow();
  const router = useRouter();
  const { id } = router.query;

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
        file_id: id,
        random_node_id: uuidv4(),
        id: `${nodes.length + 1}`,
        position: {
          x: Math.floor(Math.random() * window.innerWidth - 100),
          y: Math.floor(Math.random() * window.innerHeight),
        },
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
        console.log(uuidv4(), 'checking uuidv4')
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

  const handleSaveCanvas = useCallback(async () => {
    try {
      const file_id = id;
      const requestData = rfInstance.toObject();
      console.log(requestData, 'toOBject resquestData babe')
      const response = await fetch(process.env.NEXT_PUBLIC_TO_OBJECT_DATA, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({requestData, file_id}),
      });
      if (response.ok) {
        console.log("canvas saved");
      } else {
        // console.error("Error saving canvas state");        
        console.error('Error put req.:', response.status);
        console.error(await response.text());
      }
    } catch (error) {
      console.log("error saving the diagram", error);
    }
  }, [rfInstance, id]);

  useEffect(() => {
    const file_id = id;
    console.log(rfInstance,'rf instance in get method useEffect')
    const restoreFlow = async () => {
      console.log(id, "fucking canvas file_id");
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_TO_OBJECT_DATA}/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          const canvasData = await response.json();
          console.log(canvasData, 'canvasData babe')
          console.log(response, 'it is response babe')
          setCanvasState(canvasData);
          console.log(canvasData,'response.json() babe')
          const { x = 0, y = 0, zoom = 1 } = flow.viewport;
          setNodes(canvasData.nodes || []);
          setEdges(canvasData.edges || []);
          setViewport({ x, y, zoom });
          console.log(response, "get method response");
        } else {
          console.error(response,"Error fetching canvas state");
        }
      } catch (error) {
        console.log("eror in restoring flow", error);
      }
    };
    restoreFlow();
  }, [ setNodes, setViewport, id]);

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

      {/* <ReactFlowProvider> */}
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
          onInit={setRfInstance}
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
      {/* </ReactFlowProvider> */}
    </>
  );
};

export default Canvas;

// const canvasProvider = () => {
//   return (
//     <>
//       <ReactFlowProvider>
//         <canvas/>
//       </ReactFlowProvider>
//     </>
//   );
// };

// export default canvasProvider;
