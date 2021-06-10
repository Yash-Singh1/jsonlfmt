const JSONL = require('@saiansh2525/jsonlines');

module.exports = (value, spacing = 2) => JSONL.stringify(JSONL.parse(value), null, spacing);
