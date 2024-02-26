# unreal-console-fix README

This is for Unreal. `This extension can be removed once VSCode fixes the bug.`

VSCode has a bug in ~1.86 and this extension has VSCode commands you can run to fix and revert.

## How to Install
Download the vsix file from this github. Then do this:

![image](https://user-images.githubusercontent.com/62588629/225083466-39ca4a93-e06a-4a04-83ba-82d60b548513.png)

## Using

### Run the commands below to Fix and Revert "launch" console settings in launch.json and *.code-workspace file

### 0.0.2
Command: **'unreal-console-fix: Temporary Fix'** (Fixes Build config "console" setting to integratedTerminal from externalTerminal)

Command: **'unreal-console-fix: Revert'** (Fixes Build config "console" setting to externalTerminal from integratedTerminal)
