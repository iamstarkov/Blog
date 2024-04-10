const { test, describe } = require("node:test");
const assert = require("node:assert");
const { add } = require("./add");

describe("Addition", () => {
  test("Commutativity", () => {
    assert.equal(add(1, 2), add(2, 1));
  });

  test("Associativity", () => {
    assert.equal(add(add(1, 2), 3), add(1, add(2, 3)));
  });

  test("Identity", () => {
    assert.equal(add(1, 0), 1);
  });

  test("Successor", () => {
    assert.equal(add(1, 1), 2);
  });
});
