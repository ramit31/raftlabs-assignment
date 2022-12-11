import { createSlice } from "@reduxjs/toolkit";

const graphSlice = createSlice({
  name: "graph",
  initialState: {
    graph: {}
  },
  reducers: {
    setGraph: (state, action) => {
      state.graph = action.payload;
    },
  },
});

export const { setGraph } = graphSlice.actions;

export const getGraph = (state) => state.graph.graph;

export default graphSlice.reducer;