import { notEmpty } from "../validators";

describe("validators", () => {
  it("notEmpty", () => {
    const v = notEmpty();
    expect(v("")).not.toBeNull();
    expect(v("   ")).not.toBeNull();
    expect(v("foo")).toBeNull();
  });
});
