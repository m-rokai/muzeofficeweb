// franchise/lib/actions/franchise-inquiry-core.test.ts
import { expect, test, describe } from "bun:test";
import {
  validateInquiry,
  isSuspectedSpam,
  buildLeadPayload,
  buildEmailText,
  type InquiryInput,
} from "./franchise-inquiry-core";

const valid: InquiryInput = {
  name: "Dana Operator",
  email: "dana@example.com",
  phone: "702-555-0143",
  track: "franchisee",
  capital: "250-500k",
  market: "Phoenix, AZ",
  timeline: "3-6",
  role: "Owns 2 service businesses",
  message: "Interested in opening a Muze Office in Phoenix this year.",
  honeypot: "",
  elapsedMs: 9000,
};

describe("validateInquiry", () => {
  test("passes a complete valid inquiry", () => {
    expect(validateInquiry(valid)).toEqual({});
  });
  test("requires a name of at least 2 chars", () => {
    expect(validateInquiry({ ...valid, name: "D" }).name).toBeDefined();
  });
  test("requires a valid email", () => {
    expect(validateInquiry({ ...valid, email: "nope" }).email).toBeDefined();
  });
  test("requires a track selection", () => {
    expect(validateInquiry({ ...valid, track: "" }).track).toBeDefined();
  });
  test("requires a message of at least 10 chars", () => {
    expect(validateInquiry({ ...valid, message: "hi" }).message).toBeDefined();
  });
});

describe("isSuspectedSpam", () => {
  test("flags sub-3s submissions", () => {
    expect(isSuspectedSpam({ ...valid, elapsedMs: 1200 })).toBe(true);
  });
  test("does not flag normal-speed submissions", () => {
    expect(isSuspectedSpam(valid)).toBe(false);
  });
  test("does not flag when elapsedMs is missing", () => {
    expect(isSuspectedSpam({ ...valid, elapsedMs: undefined })).toBe(false);
  });
});

describe("buildLeadPayload", () => {
  test("produces a CRM-ready object with resolved labels", () => {
    const p = buildLeadPayload(valid);
    expect(p.source).toBe("muzeofficefranchise.com");
    expect(p.track.value).toBe("franchisee");
    expect(p.track.label).toContain("Operate");
    expect(p.capital.label).toBe("$250k – $500k");
    expect(p.timeline.label).toBe("3–6 months");
    expect(p.email).toBe("dana@example.com");
  });
});

describe("buildEmailText", () => {
  test("includes a [Franchise] human summary and a JSON block", () => {
    const text = buildEmailText(valid, false);
    expect(text).toContain("Dana Operator");
    expect(text).toContain("Phoenix, AZ");
    expect(text).toContain('"track"');           // JSON block present
    expect(text).not.toContain("[Suspected spam]");
  });
  test("marks suspected spam", () => {
    expect(buildEmailText(valid, true)).toContain("[Suspected spam]");
  });
});
