import { useState } from "react";

import { getAllConnections } from "../utils/getAllConnections";
import { setGraph, getGraph } from "../store/graphSlice";

import { useSelector, useDispatch } from "react-redux";

function OutputContainer() {
  let [inputA, setInputA] = useState(() => "");
  let [inputB, setInputB] = useState(() => "");
  let [inputC, setInputC] = useState(() => "");
  let [outArr, setOutArr] = useState(() => []);

  const graph = useSelector(getGraph);
  const dispatch = useDispatch();

  function submitInput() {
    if (inputA === "" || inputB === "" || inputC === "") {
      alert("All fields not filled!");
      return;
    }

    dispatch(setGraph(JSON.parse(window.localStorage.getItem("data"))));
    try {
      setOutArr(getAllConnections(graph[inputC], inputA, inputB));
    } catch(err) {
      alert("Data does not exist");
    }
  }

  return (
    <>
      <div className={`flex justify-center pt-10 pb-10 place-items-center`}>
        <span className="pr-3 font-medium">Separation between</span>
        <input
          type={"text"}
          placeholder={"name"}
          className={`p-1.5 rounded-3xl mr-3
          placeholder:text-center placeholder:font-medium placeholder:text-[#1da1f2]
          text-center focus:outline-[#1da1f2] focus:placeholder:text-transparent`}
          onChange={(e) => setInputA(e.target.value)}
          value={inputA}
        />
        <span className="pr-3 font-medium">and</span>
        <input
          type={"text"}
          placeholder={"name"}
          className={`p-1.5 rounded-3xl
          placeholder:text-center placeholder:font-medium placeholder:text-[#1da1f2]
          text-center focus:outline-[#1da1f2] focus:placeholder:text-transparent`}
          onChange={(e) => setInputB(e.target.value)}
          value={inputB}
        />
        <span className="pr-3 pl-3 font-medium">having</span>
        <input
          type={"text"}
          placeholder={"relationship: friend"}
          className={`p-1.5 rounded-3xl
          placeholder:text-center placeholder:font-medium placeholder:text-[#1da1f2]
          text-center focus:outline-[#1da1f2] focus:placeholder:text-transparent`}
          onChange={(e) => setInputC(e.target.value)}
          value={inputC}
        />
        <button
          type="button"
          className={`bg-black text-white rounded-3xl font-semibold
            pt-1.5 pb-1.5 pl-3 pr-3 ml-7
            hover:bg-white hover:text-black transition ease-in duration-200`}
          onClick={submitInput}
        >
          Submit
        </button>
      </div>
      <div>
        {outArr.map((ele1, ind) => {
          return (
            <p className={`font-semibold text-center text-lg`} key={ind}>
              {ind + 1}
              {`. `}
              {ele1.reduce((acc, ele2, ind, arr) => {
                if (ind !== arr.length - 1) {
                  return `${acc}${ele2} > `;
                }
                return `${acc}${ele2}`;
              }, "")}
            </p>
          );
        })}
        {outArr.length === 0 && (
          <p className={`font-semibold text-center text-lg`}>Output</p>
        )}
      </div>
    </>
  );
}

export default OutputContainer;
