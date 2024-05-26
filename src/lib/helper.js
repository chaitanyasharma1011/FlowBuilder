export const fetchSelectedNode = (nodes = []) => {
  for (var i = 0; i < nodes.length; i++) if (nodes[i].selected) return nodes[i];

  return null;
};

export const checkNodesConnection = (nodes = [], edges = []) => {
  let nodes_id = nodes.map((node) => node.id);
  let edges_source = edges.map((edge) => edge.source);

  let disconnected_node = 0;

  for (let i = 0; i < nodes_id.length; i++) {
    if (!edges_source.includes(nodes_id[i])) disconnected_node++;
    if (disconnected_node >= 2) break;
  }
  if (disconnected_node >= 2) {
    return false;
  }
  return true;
};
