import { assertEquals } from "https://deno.land/std@0.193.0/testing/asserts.ts";


Deno.test(function addTest() {
  assertEquals(String.fromCharCode(97), "a");
});
