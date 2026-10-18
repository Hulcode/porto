import assert from "node:assert/strict";
import test, { after, before } from "node:test";
import { defaultPortfolio } from "../lib/default-portfolio.js";
import { validatePortfolio } from "../lib/validate-portfolio.js";

const originalEnvironment = {
  ADMIN_USERNAME: process.env.ADMIN_USERNAME,
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
  ADMIN_SESSION_SECRET: process.env.ADMIN_SESSION_SECRET,
};

before(() => {
  process.env.ADMIN_USERNAME = "test-admin";
  process.env.ADMIN_PASSWORD = "test-password";
  process.env.ADMIN_SESSION_SECRET = "test-session-secret-that-is-long-enough";
});

after(() => {
  for (const [key, value] of Object.entries(originalEnvironment)) {
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
});

test("current portfolio seed passes content validation", () => {
  assert.equal(validatePortfolio(defaultPortfolio), null);
});

test("content validation rejects unsafe link protocols", () => {
  const content = structuredClone(defaultPortfolio);
  content.hero.githubUrl = "javascript:alert(1)";

  assert.match(validatePortfolio(content), /Links must use/);
});

test("content validation rejects malformed repeated content", () => {
  const content = structuredClone(defaultPortfolio);
  content.projects.items[0].tags = ["React", 42];

  assert.match(validatePortfolio(content), /list of at most 100 text values/);
});

test("content validation rejects missing sections", () => {
  const content = structuredClone(defaultPortfolio);
  delete content.learning;

  assert.match(validatePortfolio(content), /learning/);
});

test("admin session tokens authenticate and reject tampering", async () => {
  const {
    createAdminSession,
    verifyAdminCredentials,
    verifyAdminSession,
  } = await import("../lib/admin-session.js");

  assert.equal(verifyAdminCredentials("test-admin", "test-password"), true);
  assert.equal(verifyAdminCredentials("test-admin", "wrong-password"), false);

  const token = createAdminSession();
  assert.equal(verifyAdminSession(token), true);
  assert.equal(verifyAdminSession(`${token}x`), false);
});
