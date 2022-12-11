import "./DegreeSeparation.css";

import DataContainer from "./DataContainer";
import SeparationInputHeader from "./SeparationInputHeader";
import OutputContainer from "./OutputContainer";

import { useEffect } from "react";

import { useDispatch } from "react-redux";
import { setGraph } from "../store/graphSlice";

function DegreeSeparation() {
  const dispatch = useDispatch();

  useEffect(() => {
    let lclstg = JSON.parse(window.localStorage.getItem("data"));
    if (lclstg != null) dispatch(setGraph(lclstg));
  }, [dispatch]);

  return (
    <main>
      <DataContainer />
      <SeparationInputHeader />
      <OutputContainer />
    </main>
  );
}

export default DegreeSeparation;
