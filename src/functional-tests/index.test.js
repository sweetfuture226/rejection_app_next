import { Selector } from "testcafe";

fixture`rejection app`.page("http://localhost:3000/");

test("Page should load and display the correct default score", async (t) => {
  const actual = Selector("h3").innerText;
  const expected = "Score: 0";
  await t.expect(actual).eql(expected);
});

test("When a rejected question is added score should update to 10", async (t) => {
  const statusSelect = Selector("#status");
  const statusOption = statusSelect.find("option");

  const actual = Selector("h3").innerText;
  const expected = "Score: 10";
  await t
    .click(statusSelect)
    .click(statusOption.withText("Rejected"))
    .click("#add")
    .expect(actual)
    .eql(expected);
});
