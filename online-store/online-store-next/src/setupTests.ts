// src/setupTests.ts
import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";

// Denne én-linjeren gjør både runtime-extend og type-augmentering for Vitest:
import "@testing-library/jest-dom/vitest";

afterEach(() => {
  cleanup();
});