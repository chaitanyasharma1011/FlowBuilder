import React from "react";
import { BiMessageRoundedDetail } from "react-icons/bi";
import { LuArrowLeft } from "react-icons/lu";

export default function Sidebar({
  activeNode = false,
  editContentRef,
  nodeContent,
  setNodeContent,
  setSelectedNode,
  setNodes,
}) {
  const handleDragStart = (event, type, text) => {
    event.dataTransfer.setData("application/reactflow", type);
    event.dataTransfer.setData("content", text);
    event.dataTransfer.effectAllowed = "move";
  };

  const handleBack = () => {
    setSelectedNode(null);
    setNodes((nodes) =>
      nodes.map((node) => {
        node.selected = false;

        return node;
      })
    );
  };

  const render_textarea = (
    <>
      <div
        className="flex items-center space-x-2 cursor-pointer"
        onClick={handleBack}
      >
        <LuArrowLeft size={20} color="#1982F8" />
        <p className="font-medium text-[#1982F8] text-sm">Back</p>
      </div>
      <div className="flex flex-col space-y-2 mt-4">
        <label>Edit content here</label>
        <textarea
          ref={editContentRef}
          value={nodeContent || ""}
          onChange={(e) => setNodeContent(e.target.value)}
          className="p-2 bg-[#EEEEEE]"
        />
      </div>
    </>
  );

  const render_message = (
    <div
      className="border border-[#1982F8] text-center p-2 text-sm flex flex-col items-center cursor-pointer bg-white"
      onDragStart={(e) => handleDragStart(e, "node", "Enter message here")}
      draggable
    >
      <BiMessageRoundedDetail size={18} color="#1982F8" />
      Drag to create new node
    </div>
  );

  return (
    <section className="h-full w-[250px] border bg-[#fafafa] p-4">
      {activeNode ? render_textarea : render_message}
    </section>
  );
}
