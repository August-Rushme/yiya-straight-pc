module.exports = {
  extends: ["cz"],
  parserPreset: {
    parserOpts: {
      headerPattern: /^(\w*)\(([\u4e00-\u9fa5]*)\)/,
      headerCorrespondence: ["type", "scope"]
    }
  },
  rules: {
    "type-empty": [2, "never"],
    "scope-empty": [2, "never"]
  }
}
