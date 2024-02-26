// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

const SETTING_CONSOLE = "console"
const SECTION_CONFIGURATIONS = "configurations";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	console.log('"unreal-console-fix" is now active!');

	let disposable = vscode.commands.registerCommand('unreal-console-fix.tempFix', async () => {
		
		vscode.window.showInformationMessage('unreal-console-fix: Running temporary fix!');

		await changeConsoleSetting("externalTerminal", "integratedTerminal")

	});
	context.subscriptions.push(disposable);

	disposable = vscode.commands.registerCommand('unreal-console-fix.revert', async () => {
		
		vscode.window.showInformationMessage('unreal-console-fix: Running revert!');

		await changeConsoleSetting( "integratedTerminal", "externalTerminal")

	});
	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}

async function changeConsoleSetting(settingToChange: string, setTo: string) {
	const projectWorkspace = vscode.workspace.workspaceFolders?.find((value: vscode.WorkspaceFolder, index: number, obj: readonly vscode.WorkspaceFolder[]) => {
		return value.name !== "UE4" && value.name !== "UE5";
	});

	if(!projectWorkspace){
		return;
	}

	const launchConfig = vscode.workspace.getConfiguration("launch", projectWorkspace);
	if(!launchConfig){
		return;
	}
	await changeConsoleInLaunch(launchConfig, settingToChange, setTo);
	return;
}

async function changeConsoleInLaunch(launchConfig: vscode.WorkspaceConfiguration, settingToChange: string, setTo: string){

	const inspectLaunch = launchConfig.inspect(SECTION_CONFIGURATIONS);

	if(!inspectLaunch){
		return;
	}
	
	if(inspectLaunch?.workspaceFolderValue){
		setConsoleSetting(inspectLaunch.workspaceFolderValue as {[key:string]: any }, settingToChange, setTo)
		await launchConfig.update(SECTION_CONFIGURATIONS, inspectLaunch.workspaceFolderValue, vscode.ConfigurationTarget.WorkspaceFolder);
		// don't return (both might be set)
	}

	if(inspectLaunch?.workspaceValue){
		setConsoleSetting(inspectLaunch.workspaceValue as {[key:string]: any }, settingToChange, setTo)
		await launchConfig.update(SECTION_CONFIGURATIONS, inspectLaunch.workspaceValue, vscode.ConfigurationTarget.Workspace);
	}
	
}

function setConsoleSetting( configs:{[key:string]: any }, settingToChange: string, setTo: string) {
	
	for (const key in configs) {
		if (Object.prototype.hasOwnProperty.call(configs, key)) {
			const element = configs[key];
			
			if(element[SETTING_CONSOLE] === settingToChange) {
				element[SETTING_CONSOLE] = setTo;
			}
		
		}
	}
	
}
