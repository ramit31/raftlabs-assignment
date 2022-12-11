import { useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { setGraph, getGraph } from "../store/graphSlice";

function DataContainer() {
  //all commented lines were to handle undirected graph
  const graph = useSelector(getGraph);
  const dispatch = useDispatch();

  let [dataA, setDataA] = useState(() => "");
  let [dataB, setDataB] = useState(() => "");
  let [dataC, setDataC] = useState(() => "");

  function submitData() {
    if (dataA === "" || dataB === "" || dataC === "") {
      alert("All fields not filled!");
      return;
    }

    if (
      graph &&
      Object.keys(graph).length === 0 &&
      Object.getPrototypeOf(graph) === Object.prototype
    ) {
      let curGraph = {};
      curGraph[dataB] = {};
      curGraph[dataB][dataA] = [dataC];
      //   curGraph[dataB][dataC] = [dataA];

      dispatch(setGraph(curGraph));
      window.localStorage.setItem("data", JSON.stringify(curGraph));
    } else {
      let curGraph = structuredClone(graph);
      if (dataB in curGraph) {
        if (dataA in curGraph[dataB]) {
          curGraph[dataB][dataA].push(dataC);
        } else {
          curGraph[dataB][dataA] = [dataC];
        }

        // if (dataC in curGraph[dataB]) {
        //   curGraph[dataB][dataC].push(dataA);
        // } else {
        //   curGraph[dataB][dataC] = [dataA];
        // }
      } else {
        curGraph[dataB] = {};
        curGraph[dataB][dataA] = [dataC];
        // curGraph[dataB][dataC] = [dataA];
      }

      dispatch(setGraph(curGraph));
      window.localStorage.setItem("data", JSON.stringify(curGraph));
    }

    alert("Data added!");
  }

  return (
    <>
      <div className="ml-3">
        <p className={`text-[13px] font-semibold text-white`}>
          * All data is case sensitive
        </p>
        <p className={`text-[13px] font-semibold text-white`}>
          * All fields are required to submit data
        </p>
      </div>
      <div className={`flex justify-center pt-10 pb-10 items-center`}>
        <input
          type={"text"}
          placeholder={"name"}
          className={`p-1.5 rounded-3xl
          placeholder:text-center placeholder:font-medium placeholder:text-[#1da1f2]
          text-center focus:outline-[#1da1f2] focus:placeholder:text-transparent`}
          onChange={(e) => setDataA(e.target.value)}
          value={dataA}
        />
        <span className="pl-3 pr-3 font-medium">is a</span>
        <input
          type={"text"}
          placeholder={"relationship: friend"}
          className={`p-1.5 rounded-3xl
          placeholder:text-center placeholder:font-medium placeholder:text-[#1da1f2]
          text-center focus:outline-[#1da1f2] focus:placeholder:text-transparent`}
          onChange={(e) => setDataB(e.target.value)}
          value={dataB}
        />
        <span className="pl-3 pr-3 font-medium">of</span>
        <input
          type={"text"}
          placeholder={"name"}
          className={`p-1.5 rounded-3xl
          placeholder:text-center placeholder:font-medium placeholder:text-[#1da1f2]
          text-center focus:outline-[#1da1f2] focus:placeholder:text-transparent`}
          onChange={(e) => setDataC(e.target.value)}
          value={dataC}
        />
        <button
          type="button"
          className={`bg-black text-white rounded-3xl font-semibold
            pt-1.5 pb-1.5 pl-3 pr-3 ml-7
            hover:bg-white hover:text-black  transition ease-in duration-200`}
          onClick={submitData}
        >
          Submit
        </button>
      </div>
    </>
  );
}

export default DataContainer;
