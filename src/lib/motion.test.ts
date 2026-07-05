import { describe, expect, it } from "vitest";
import {
  reducedFade,
  resolveTransition,
  springGentle,
  springSnappy,
} from "./motion";

describe("motion presets", () => {
  it("springSnappy matches the spec (stiffness 500, damping 30)", () => {
    expect(springSnappy).toMatchObject({
      type: "spring",
      stiffness: 500,
      damping: 30,
    });
  });

  it("springGentle matches the spec (stiffness 260, damping 24)", () => {
    expect(springGentle).toMatchObject({
      type: "spring",
      stiffness: 260,
      damping: 24,
    });
  });
});

describe("resolveTransition", () => {
  it("passes the spring through when motion is allowed", () => {
    expect(resolveTransition(false, springSnappy)).toBe(springSnappy);
  });

  it("collapses to a short fade when reduced motion is requested", () => {
    expect(resolveTransition(true, springSnappy)).toBe(reducedFade);
    expect(resolveTransition(true, springGentle)).toEqual({
      duration: 0.12,
      ease: "easeOut",
    });
  });
});
