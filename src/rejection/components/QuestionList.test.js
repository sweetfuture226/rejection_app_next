import React from "react";
import { describe } from "riteway";
import render from "riteway/render-component";

import { QuestionList } from "../components";
import { reducer, addQuestion, getScore } from "../rejection-reducer";

describe("QuestionList Component", async (assert) => {
  const actions = [
    { status: "accepted" },
    { status: "accepted" },
    { status: "rejected" },
  ].map(addQuestion);

  const state = actions.reduce(reducer, reducer());

  const $ = render(<QuestionList questions={state} />);

  assert({
    given: "three questions and answers",
    should: "return a list of three questions and answers",
    actual: $(".questionList").length,
    expected: 3,
  });

  assert({
    given: "three questions and answers",
    should: "render the status input text field 3x",
    actual: $(".status").length,
    expected: 3,
  });

  assert({
    given: "three questions and answers",
    should: "render the delete button 3x",
    actual: $(".deleteButton").length,
    expected: 3,
  });
});
