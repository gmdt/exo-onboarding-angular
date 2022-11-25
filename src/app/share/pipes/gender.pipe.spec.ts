import { GenderPipe } from "./gender.pipe";

describe("GenderPipe", () => {
  it("create an instance", () => {
    const pipe = new GenderPipe();
    expect(pipe).toBeTruthy();
  });
  it("should return Male->'Homme' & Female->'Femme'", () => {
    expect(new GenderPipe().transform("Male")).toBe("Homme");
    expect(new GenderPipe().transform("Female")).toBe("Femme");
  });
});
