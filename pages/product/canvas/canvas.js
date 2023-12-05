//styles, files, REACT
import Home from "../home";
import canvasStyles from "@/styles/canvas.module.css";
import { useState, useMemo, useContext, useEffect } from "react";
import TextUpdaterNode from "./textUpdaterNode.js";
import { FilesConnect } from "../../userContext.js";
import { useRouter } from "next/router";
import Image from "next/image";

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
  const [updatedNodesId, setUpdatedNodesId] = useState([]);
  const [nodeToUpdate, setNodeToUpdate] = useState([]);

  const {
    nodesContext,
    setNodesContext,
    deleteNodesContext,
    onDeleteNode,
    updateNodes,
    setUpdateNodes,
    textContext,
    setTextContext,
    nodeIdContext,
    setNodeIdContext,
    getNodeContext,
    setGetNodeContext,
    textareaId,
    setTextareaId,
    nodeItems,
    setNodeItems,
    setGetTextContext,
    getTextContext,
    setCanvasDataContext,
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

  const handleCreateNode = async () => {
    try {
      // const file_id = id;
      const newNode = {
        file_id: id,
        random_node_id: uuidv4(),
        // textarea_id: `${textareaId}`,
        id: `${nodes.length + 1}`,
        position: {
          x: Math.floor(Math.random() * window.innerWidth - 100),
          y: Math.floor(Math.random() * window.innerHeight),
        },
        data: { value: "", toolbarPosition: Position.Top },
        type: "textUpdater",
        zIndex: 1000,
        isConnectable: true,
        content: "",
      };

      // newNode.textarea_id = `${newNode.id}`;
      // setTextareaId(newNode.textarea_id);

      const response = await fetch(process.env.NEXT_PUBLIC_CANVAS_DATA, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newNode }),
      });
      if (response.ok) {
        const data = await response.json();
        console.log(uuidv4(), "checking uuidv4");
        console.log(data.message);
      } else {
        console.log("Failed to create node on the server");
        console.log("newNOde:", newNode);
      }
      setNodes((prevNodes) => [...prevNodes, newNode]);
      setNodesContext((prevNodes) => [...prevNodes, newNode]);
      // setNodesId(newNode.id);
      // setNodeIdContext(newNode.id);
      setTextareaId(newNode.id);
      console.log(newNode.id, "handlecreatenode node id");
    } catch (error) {
      console.log("error creating a node", error);
    }
  };

  useEffect(() => {
    const handleNodeId = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_CANVAS_DATA}?id=${id}`,
          {
            method: "GET",
          }
        );
        if (response.ok) {
          const nodesData = await response.json();
          console.log(nodesData, "handlenodeid response bro");
          setNodesId(nodesData.id); // this could have issue because you are not mapping
        } else {
          console.error(response, "Error fetching canvas Data");
        }
      } catch (error) {
        console.log(error, "error in handlenodeid");
      }
    };
    handleNodeId();
  }, [id]);

  // useEffect(() => {
  const updateNodeValue = async () => {
    console.log(textContext, " textcontext inside updatenodevalue");

    let updatedData = {
      data: {
        value: "",
      },
      content: "",
    };

    nodes.forEach((node) => {
      if (node.id === nodeToUpdate) {
        node.data.value = textContext;
        node.content = textContext;
        updatedData.data.value = node.data.value;
        updatedData.content = node.content;
      }
    });

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_CANVAS_DATA}?id=${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        }
      );

      // use getNode from react flow to get the node (by id)in which the user is writing
      // than update the value and content of that particular node and done....
      if (response.ok) {
        const updatedNode = await response.json();
        setNodes((prevNodes) => {
          const updatedNodes = prevNodes.map((node) => {
            if (node.id === nodeToUpdate) {
              // adding updatedNodesId equals make no data avail when handle saved run
              return {
                ...node,
                data: {
                  ...node.data,
                  value: updatedData.data.value,
                },
                content: updatedData.content,
              };
            }
            return node;
          });
          return updatedNodes;
        });
        console.log("RESPONSE Updated node:", updatedNode);
        console.log(textContext, "textcontext");
        console.log(nodeItems);
      } else {
        console.error(response.status, "error in put request");
      }
    } catch (error) {
      console.log(error, "error in updating node value");
    }
  };
  // updateNodeValue();

  // },[rfInstance])

  // useEffect(() => {
  //   if (rfInstance) {
  //     const nodes = rfInstance.getNodes();
  //     // console.log(nodes)
  //   }
  // }, [updateNodeValue, rfInstance]);

  useEffect(() => {
    // const gettingNodeById = () => {
    if (getNodeContext) {
      const node = rfInstance.getNode(nodeIdContext);
      if (node) {
        // const updatedArray = [];
        // updatedArray.push(node.id);
        // const uniqueArray = new Set(updatedArray);
        // setUpdatedNodesId(uniqueArray);
        console.log(node.id, "id of this node");
        setNodeToUpdate(node.id);
        setGetNodeContext(false);
        // console.log(node, "your node is here");
      } else {
        console.log("get node doesn't get node");
      }
    } else {
      console.log(getNodeContext, "get node context is false");
    }
    // };
    // gettingNodeById();
  }, [getNodeContext]);

  // const updateNodeData = async () => {
  //   const file_id = id;
  //   const requestDataNoVal = rfInstance.toObject();

  //   requestDataNoVal.nodes.map(async (node) => {
  //     const matchingNode = nodes.find(
  //       (n) => file_id === n.file_id && node.id === n.id
  //     );
  //     console.log("inside fetchPromise");
  //     if (matchingNode) {
  //       node.data.value = matchingNode.data.value;
  //       console.log("inside matching node");
  //     }
  //   });
  // };

  const handleSaveCanvas = useCallback(async () => {
    console.log(rfInstance.toObject(), "toObject rfinstance");
    try {
      // await updateNodeValue();
      const file_id = id;
      const requestData = rfInstance.toObject();

      console.log(requestData, "toOBject resquestData babe");
      const response = await fetch(process.env.NEXT_PUBLIC_TO_OBJECT_DATA, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ requestData, file_id }),
      });
      if (response.ok) {
        console.log("canvas saved");
      } else {
        // console.error("Error saving canvas state");
        console.error("Error put req.:", response.status);
        console.error(await response.text());
      }
    } catch (error) {
      console.log("error saving the diagram", error);
    }
  }, [rfInstance, id]);

  useEffect(() => {
    console.log(rfInstance, "rfinstance in get method");
    const restoreFlow = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_TO_OBJECT_DATA}?id=${id}`,
          {
            method: "GET",
          }
        );
        if (response.ok) {
          const canvasData = await response.json();
          console.log(canvasData, "canvasData babe");
          const { x = 0, y = 0, zoom = 1 } = canvasData.viewport;
          setNodes(canvasData.nodes || []);
          setEdges(canvasData.edges || []);
          setViewport({ x, y, zoom });
          setCanvasDataContext(canvasData);
          setNodesContext(canvasData.nodes || []);

          // canvasData.nodes.forEach((node) => {
          //   nodes.map((nude) => {
          //     if (nude.id === node.id) {
          //       setGetTextContext(node.content);
          //       console.log(getTextContext, "setGetTextContext");
          //     }
          //   });
          // });
        } else {
          console.error(response, "Error fetching canvas state");
        }
      } catch (error) {
        console.log("eror in restoring flow", error);
      }
    };
    restoreFlow();
  }, [setNodes, setViewport, id]);

  // useEffect(() => {
  //   setNodes(deleteNodesContext);
  //   console.log(deleteNodesContext, "deletenodecontext in useeffect");
  //   setUpdateNodes(false);
  //   console.log("set update nodes set to false");
  // }, [updateNodes]);

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
            <Image src="/createCanvas.png" alt="" width={28} height={28}/>
          </Panel>
          <Panel
            position="top-right"
            className={canvasStyles.saveIcon}
            onClick={handleSaveCanvas}
          >
            <Image src="/saveflow.png" alt="" width={30} height={30}/>
          </Panel>
          <Panel
            position="top-left"
            className={canvasStyles.saveIcon}
            onClick={updateNodeValue}
          >
            update
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
