#!/usr/bin/env zx

void (async function () {
  await $`echo "Hello, CommonJS!"`
})().catch(console.error)
