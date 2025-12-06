import { test, expect } from "vitest";
import channelsData from "../src/data/channels.json";

test("channels data has correct structure", () => {
  expect(Array.isArray(channelsData)).toBe(true);
  expect(channelsData.length).toBeGreaterThan(0);
});

test("all channels have required fields", () => {
  channelsData.forEach(channel => {
    expect(channel.id).toBeDefined();
    expect(channel.name).toBeDefined();
    expect(channel.name.en).toBeDefined();
    expect(channel.name.ru).toBeDefined();
    expect(channel.country).toBeDefined();
    expect(Array.isArray(channel.genres)).toBe(true);
    expect(channel.url).toBeDefined();
  });
});

test("all channel IDs are unique", () => {
  const ids = channelsData.map(ch => ch.id);
  const uniqueIds = new Set(ids);
  expect(uniqueIds.size).toBe(ids.length);
});

test("all channels have valid URLs", () => {
  channelsData.forEach(channel => {
    expect(channel.url.startsWith("http")).toBe(true);
    expect(channel.url.includes(".m3u8")).toBe(true);
  });
});

test("countries are in valid format", () => {
  const validCountries = ["US", "UK", "RU", "FR", "DE", "CN", "IN", "AT", "JP"];
  channelsData.forEach(channel => {
    expect(validCountries).toContain(channel.country);
  });
});
