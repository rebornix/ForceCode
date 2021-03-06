import * as vscode from 'vscode';
import {ForceService} from './services';
import * as commands from './commands';
import * as parsers from './parsers';


// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext): any {
  'use strict';
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  try {
    vscode.window.forceCode = new ForceService(context);
    vscode.window.showInformationMessage('ForceCode is now active for user ' + vscode.window.forceCode.username);
  } catch (error) {
    console.error(error);
    vscode.window.showErrorMessage('OH NO FORCECODE FAILED');
    vscode.window.showErrorMessage(error);
  }

  if (vscode.window.forceCode !== undefined) {
    context.subscriptions.push(vscode.commands.registerCommand('ForceCode.showMenu', () => {
      commands.showMenu(context);
    }));

    context.subscriptions.push(vscode.commands.registerCommand('ForceCode.executeAnonymous', () => {
      commands.executeAnonymous(vscode.window.activeTextEditor.document, context);
    }));

    context.subscriptions.push(vscode.commands.registerCommand('ForceCode.getLog', () => {
      commands.getLog(context);
    }));

    context.subscriptions.push(vscode.commands.registerCommand('ForceCode.compile', () => {
      commands.compile(vscode.window.activeTextEditor.document, context);
    }));

    context.subscriptions.push(vscode.commands.registerCommand('ForceCode.open', () => {
      commands.open(context);
    }));

    context.subscriptions.push(vscode.commands.registerCommand('ForceCode.exportPackage', () => {
      commands.retrieve();
    }));

    context.subscriptions.push(vscode.commands.registerCommand('ForceCode.staticResource', () => {
      commands.staticResource(context);
    }));

    context.subscriptions.push(vscode.workspace.onDidSaveTextDocument((textDocument: vscode.TextDocument) => {
      const toolingType: string = parsers.getToolingType(textDocument);
      if (toolingType && vscode.window.forceCode.config && vscode.window.forceCode.config.autoCompile === true) {
        commands.compile(textDocument, context);
      }
    }));
  }


  // // // Peek Provider Setup
  // // const peekProvider: any = new commands.PeekFileDefinitionProvider();
  // // const definitionProvider: any = vscode.languages.registerDefinitionProvider(constants.PEEK_FILTER, peekProvider);
  // // context.subscriptions.push(definitionProvider);
}
