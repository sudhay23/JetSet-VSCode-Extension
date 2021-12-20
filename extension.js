const vscode = require("vscode");
const SendFilePanel = require("./src/panels/SendFilePanel");
const ReceiveFilePanel = require("./src/panels/ReceiveFilePanel");

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
    console.log(
        "Welcome, your extension JetSet is now activated! Sharing files just got easy 🎉"
    );

    SendFilePanel.extensionContext = context;
    ReceiveFilePanel.extensionContext = context;

    vscode.window
        .showInformationMessage(
            "Welcome, JetSet is ready! Sharing files just got easy 🎉",
            "Get Started",
            "Dismiss"
        )
        .then((welcomePromptAnswer) => {
            if (welcomePromptAnswer === "Get Started") {
                vscode.commands.executeCommand("getstarted-view.focus");
            }
        });

    context.subscriptions.push(
        vscode.commands.registerCommand("jetset-for-vscode.sendFileCmd", () => {
            SendFilePanel.render();
        })
    );

    context.subscriptions.push(
        vscode.commands.registerCommand(
            "jetset-for-vscode.receiveFileCmd",
            () => {
                if (vscode.workspace.workspaceFolders !== undefined) {
                    ReceiveFilePanel.render();
                } else {
                    vscode.window.showErrorMessage(
                        "You don't have an active project folder open to receive files. Try again after opening a folder on VSCode"
                    );
                }
            }
        )
    );
}

function deactivate() {}

module.exports = {
    activate,
    deactivate,
};
