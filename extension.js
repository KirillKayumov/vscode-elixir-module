const vscode = require('vscode');

function findClosestElixirModule(editor, position) {
    let line = position.line;
    let acc = [];

    while (line >= 0) {
        let text = editor.document.lineAt(line).text;
        let moduleNameMatch = text.match(/^(\s*)(defmodule|defprotocol)\s+([\w.]+)\s+do$/);
        if (moduleNameMatch) {
            const moduleName = moduleNameMatch[3];
            const identation = moduleNameMatch[1].length;

            if (acc.length === 0) {
                acc.push([identation, moduleName]);
            } else if (identation < acc[acc.length - 1][0]) {
                acc.push([identation, moduleName]);
            }
        }
        line--;
    }

    if (acc.length === 0) {
        return null;
    } else {
        return acc.map(elem => elem[1]).reverse().join('.');
    }
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
                vscode.window.setStatusBarMessage(`${moduleName} copied to clipboard`, 2000);
            } else {
                vscode.window.setStatusBarMessage(`No Elixir module found`, 2000);
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
                vscode.window.setStatusBarMessage(`${moduleName} copied to clipboard`, 2000);
            } else {
                vscode.window.setStatusBarMessage(`No Elixir module found`, 2000);
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
