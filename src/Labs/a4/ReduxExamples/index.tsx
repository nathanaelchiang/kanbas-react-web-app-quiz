import React from "react";
import HelloRedux from "./HelloRedux";
import AddRedux from "./AddRedux";
import CounterRedux from "./CounterRedux";

const ReduxExamples = () => {
  return(
    <div>
      <h2>Redux Examples</h2>
      <HelloRedux />
      <CounterRedux/>
      <AddRedux/>
    </div>
  );
};

export default ReduxExamples;