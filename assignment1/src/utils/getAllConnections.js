function getPaths(graph, current, end, visited, path, allPath) {
  visited.add(current);
  path.push(current);

  if (current === end) {
    allPath.push([...path]);
  } else if (current in graph) {
    for (const neighbor of graph[current]) {
      if (!visited.has(neighbor)) {
        getPaths(graph, neighbor, end, visited, path, allPath);
      }
    }
  }

  visited.delete(current);
  path.pop();
}

function getAllConnections(graph, current, end) {
  let ans = [];
  getPaths(graph, current, end, new Set(), [], ans);
  return ans;
}

export { getAllConnections };
