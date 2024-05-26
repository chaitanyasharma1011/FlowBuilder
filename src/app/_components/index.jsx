"use client";

import React, { useRef, useState, useEffect } from "react";
import ReactFlow, {
  addEdge,
  Background,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
} from "reactflow";
import { v4 } from "uuid";
import "reactflow/dist/style.css";

import { checkNodesConnection, fetchSelectedNode } from "@/lib/helper";

import Node from "./node";
import Sidebar from "./sidebar";

// Defining custom node as the default node type for react flow
const nodeTypes = { node: Node };

export default function Controller() {
  // Ref for focusing on text area on selecting a node
  const editContentRef = useRef(null);

  // State for nodes and edges using hooks from react-flow
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  // State to store reactFlowInstance on intialization
  const [reactFlow, setReactFlow] = useState(null);
  // State to store selected node
  const [selectedNode, setSelectedNode] = useState(null);
  //State to store textArea's value
  const [nodeContent, setNodeContent] = useState("");

  //Initialising react flow instace
  const handleInit = (reactFlowInstance) => setReactFlow(reactFlowInstance);

  //handling state of a new node while its being dragged inside react flow wrapper
  const handleDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  //handling state of a new node while it is dropped inside react flow wrapper
  const handleDrop = (event) => {
    //synthetic event
    event.preventDefault();

    //extracting data from the dropped block
    const type = event.dataTransfer.getData("application/reactflow");
    const content = event.dataTransfer.getData("content");

    //defining position on react flow as where to create the new node
    const position = reactFlow.screenToFlowPosition({
      x: event.clientX,
      y: event.clientY,
    });

    // initialising the new node with all the required data points
    const newNode = {
      id: v4(),
      type,
      position,
      data: { heading: "Message", content },
    };

    //adding new node to the given nodes list
    setNodes((nodes) => nodes.concat(newNode));
    setSelectedNode(newNode?.id);
    setNodeContent(newNode?.data?.content);
  };

  // a handler for connecting nodes, i.e. , insertion of a new edge from source to target
  const handleConnect = (params) =>
    setEdges((edges) =>
      addEdge({ ...params, markerEnd: { type: "arrowclosed" } }, edges)
    );

  // handle to save connections and throwing error in case constraints are not met
  const handleSave = () => {
    if (checkNodesConnection(nodes, edges)) alert("The flow is saved");
    else alert("Cannot Save Flow");
  };

  // whenever a node is selected, this useEffect updates selected node's state and updates the textArea's state with selected nodes content
  useEffect(() => {
    let temp = fetchSelectedNode(nodes);
    setSelectedNode(temp);
    if (temp) {
      setNodeContent(temp?.data?.content || temp);
      editContentRef?.current?.focus();
    }
  }, [nodes]);

  //whenever the text area's value gets updated, the selected node's content gets updated
  useEffect(() => {
    setNodes((nodes) =>
      nodes.map((node) => {
        if (node.id === selectedNode?.id)
          node.data = {
            ...node.data,
            content: nodeContent || " ",
          };

        return node;
      })
    );
  }, [nodeContent]);

  return (
    <>
      {" "}
      <div className="h-[50px] bg-[#EDEDED] flex justify-end w-full p-2">
        <button
          className="bg-[#1982F8] text-white px-4 text-sm rounded-md"
          onClick={handleSave}
        >
          Save
        </button>
      </div>
      <div className="w-[100vw] h-[calc(100vh-50px)] flex">
        <ReactFlowProvider>
          <div className="flex-1 h-full" id="react-flow-container">
            <ReactFlow
              nodes={nodes}
              edges={edges}
              nodeTypes={nodeTypes}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={handleConnect}
              onInit={handleInit}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              <Background color="#ededed" gap={16} />
            </ReactFlow>
          </div>
          <Sidebar
            activeNode={Boolean(selectedNode)}
            editContentRef={editContentRef}
            nodeContent={nodeContent}
            setNodeContent={setNodeContent}
            setSelectedNode={setSelectedNode}
            setNodes={setNodes}
          />
        </ReactFlowProvider>
      </div>
    </>
  );
}
