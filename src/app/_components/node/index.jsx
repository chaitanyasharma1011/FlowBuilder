import React from "react";
import { Handle, Position } from "reactflow";
import { BiMessageRoundedDetail } from "react-icons/bi";

const Node = ({ data, selected }) => {
  return (
    <div
      className="transition-all duration-200"
      style={{
        boxShadow: selected
          ? "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px"
          : "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
      }}
    >
      <div className="rounded-lg">
        <div className="bg-[#B0F1E2] font-medium p-1 flex space-x-2 items-center">
          <BiMessageRoundedDetail size={12} />
          <span>{data?.heading}</span>
        </div>
        <div className="text-sm p-2">{data?.content}</div>
      </div>
      <Handle type="source" position={Position.Right} id="b" />
      <Handle type="target" position={Position.Left} id="a" />
    </div>
  );
};

export default Node;
