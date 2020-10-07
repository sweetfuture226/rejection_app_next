import React from "react";
import describe from "riteway";
import render from "riteway/render-component";

import { Score } from "./Score";

describe("Score component", async (assert) => {
  const createScore = (score) => render(<Score score={score} />);
  {
    const $ = createScore(12);
    assert({
      given: "a score",
      should: "render the correct score (12).",
      actual: $(".score").html(),
      expected: "Score: 12",
    });
  }
  {
    const $ = createScore(3);
    assert({
      given: "a score",
      should: "render the correct score (3).",
      actual: $(".score").html(),
      expected: "Score: 3",
    });
  }
});
