import React from "react";
import { describe } from "riteway";
import render from "riteway/render-component";

import { AddQuestion } from "./AddQuestion";

describe("Question component", async (assert) => {
  const initialState = { question: "", askee: "", status: "" };

  const $ = render(<AddQuestion values={initialState} />);

  assert({
    given: "expected props",
    should: "render the question input text field",
    actual: $(".question").length,
    expected: 1,
  });

  assert({
    given: "expected props",
    should: "render the askee input text field",
    actual: $(".askee").length,
    expected: 1,
  });

  assert({
    given: "expected props",
    should: "render the status input text field",
    actual: $(".status").length,
    expected: 1,
  });

  assert({
    given: "expected props",
    should: "render the add button",
    actual: $(".add").length,
    expected: 1,
  });
});
