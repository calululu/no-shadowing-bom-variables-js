/**
 * @param {vscode.ExtensionContext} context
 */

// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const BOMGlobals = require("./globals");

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
function activate(context) {
  const diagnosticCollection =
    vscode.languages.createDiagnosticCollection("bomOverrides");

  const validateTextDocument = (document) => {
    if (document.languageId !== "javascript") return;

    const diagnostics = [];
    const lines = document.getText().split("\n");

    lines.forEach((line, index) => {
      BOMGlobals.forEach((global) => {
        const regex = new RegExp(
          `\\bconst\\s+${global}\\b|\\blet\\s+${global}\\b`
        );
        if (regex.test(line)) {
          const range = new vscode.Range(
            new vscode.Position(index, 0),
            new vscode.Position(index, line.length)
          );

          diagnostics.push(
            new vscode.Diagnostic(
              range,
              `You are shadowing a global BOM variable: '${global} '`,
              vscode.DiagnosticSeverity.Error
            )
          );
        }
      });
    });

    diagnosticCollection.set(document.uri, diagnostics);
  };

  vscode.workspace.onDidChangeTextDocument((event) =>
    validateTextDocument(event.document)
  );
  vscode.workspace.onDidOpenTextDocument(validateTextDocument);

  context.subscriptions.push(diagnosticCollection);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
