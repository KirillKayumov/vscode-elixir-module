const vscode = require('vscode');

function findClosestElixirModule(editor, position) {
    let line = position.line;
    while (line >= 0) {
        let text = editor.document.lineAt(line).text;
        let moduleNameMatch = text.match(/^\s*defmodule\s+([\w.]+)\s+do$/);
        if (moduleNameMatch) {
            return moduleNameMatch[1];
        }
        line--;
    }
    return null;
}

function activate(context) {
    let copyShortModuleName = vscode.commands.registerCommand('elixir-module.copyShortModuleName', function () {
        let editor = vscode.window.activeTextEditor;
        if (editor) {
            let position = editor.selection.active;
            let moduleName = findClosestElixirModule(editor, position);
            if (moduleName) {
                moduleName = moduleName.split('.').pop();
                vscode.env.clipboard.writeText(moduleName);
                vscode.window.showInformationMessage(`Module name "${moduleName}" copied to clipboard`);
            } else {
                vscode.window.showInformationMessage('No Elixir module found in the file');
            }
        }
    });

    let copyFullModuleName = vscode.commands.registerCommand('elixir-module.copyFullModuleName', function () {
        let editor = vscode.window.activeTextEditor;
        if (editor) {
            let position = editor.selection.active;
            let moduleName = findClosestElixirModule(editor, position);
            if (moduleName) {
                vscode.env.clipboard.writeText(moduleName);
                vscode.window.showInformationMessage(`Module name "${moduleName}" copied to clipboard`);
            } else {
                vscode.window.showInformationMessage('No Elixir module found in the file');
            }
        }
    });

    context.subscriptions.push(copyShortModuleName);
    context.subscriptions.push(copyFullModuleName);
}
exports.activate = activate;

function deactivate() { }
exports.deactivate = deactivate;

module.exports = {
	activate,
	deactivate
}
