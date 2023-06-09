module.exports = {
  "env": {
    "node": true,
    "es6": true
  },
  "extends": ["airbnb", "prettier", "plugin:node/recommended"],
  "plugins": [
    "prettier"
  ],
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "rules": {
    "indent": [
      "error",
      2
    ],
    "no-unused-vars": [
      "error",
      {
        "vars": "all",
        "args": "none"
      }
    ],
    "semi": [
      "error",
      "always"
    ]
  }
};