# no shadowing bom variable js README

Warns the developer he is shadowing a BOM object.

Even though shadowing an object is syntactically right, I made so it's wrong, because **there is no way** this is allowed:

`const document = 5;`

This is the error shown:

_`Do not override a global BOM variable 'document'`_

It supports all the BOM objects, and works with `let` or `const`, here's the list:

- "window"
- "document"
- "navigator"
- "location"
- "history"
- "screen"
- "frames"
- "self"
- "top"
- "parent"

## Requirements

Works for javascript.

## Known Issues

Using var, instead of let or const doesn't trigger any error. But who uses var anyway...

### 1.0.0

Initial release.

---

**Enjoy!**
