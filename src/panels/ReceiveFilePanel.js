const vscode = require("vscode");
const path = require("path");
const { getWebviewURI } = require("../utils/getWebviewUri.js");

module.exports = class ReceiveFilePanel {
    static extensionContext;
    static currentPanel;
    _panel = null;
    _disposables = [];

    constructor(panel) {
        this._panel = panel;
        this._panel.webview.html = this._getWebviewContent(
            this._panel.webview,
            ReceiveFilePanel.extensionContext.extensionUri
        );
        this._panel.iconPath = vscode.Uri.joinPath(
            ReceiveFilePanel.extensionContext.extensionUri,
            "assets/images/jetsetLogoPanel.png"
        );
        this._setWebviewMessageListener(this._panel.webview);
        this._panel.onDidDispose(this.dispose, null, this._disposables);
    }

    static render() {
        if (ReceiveFilePanel.currentPanel) {
            ReceiveFilePanel.currentPanel._panel.reveal(vscode.ViewColumn.Two);
        } else {
            const panel = vscode.window.createWebviewPanel(
                "jetset-receive",
                "Receive File - JetSet",
                vscode.ViewColumn.Two,
                {
                    enableScripts: true,
                    retainContextWhenHidden: true,
                }
            );
            ReceiveFilePanel.currentPanel = new ReceiveFilePanel(panel);
        }
    }

    _getWebviewContent(webview, extensionUri) {
        const webviewToolkitURI = getWebviewURI(webview, extensionUri, [
            "assets",
            "webview-ui-toolkit",
            "build",
            "toolkit.js",
        ]);
        return `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
				<link
					rel="stylesheet"
					href="https://server.sudhay.me/static/css/receiver.jetset.css"
				/>
                <script type="module" src="${webviewToolkitURI}"></script>
                <script src="https://server.sudhay.me/static/js/jetset.peerjs.min.js" defer></script>
                <script src="https://server.sudhay.me/static/js/receiver.jetset.js" defer></script>
                <title>Receive File - JetSet</title>
            </head>
            <body>
				<div class="loader">
					<vscode-progress-ring></vscode-progress-ring>
					<p>Loading Files</p>
				</div>
				<div class="container" style="display:none">
					<h2 class="title">Receive File</h2>
					<div class="collect-info">
						<vscode-text-field
							size="30"
							class="receiver-name-input"
							placeholder="Your Name"
						>
							Enter your name
						</vscode-text-field>
						<span class="errorSpan nameError">
							Error: Please fill your name with more than 5 characters
						</span>
						<vscode-button class="generate-id-btn">
							Generate ID
						</vscode-button>
					</div>
					<div class="display-info">
						<p>
							Your Name: <span class="receiverName valueField">XXX</span>
						</p>
						<p>
							Your ID <small>(share with sender)</small>:
							<span class="receiverID valueField">XXX</span>
						</p>
						<p>
							You are connected to:
							<span class="connectedSender valueField">
								N/A
							</span>
						</p>
						<vscode-button class="acceptSenderBtn">
							Accept Sender with ID XXXX
						</vscode-button>
						<br />
						<br />
						<hr />
						<div class="filesReceived">
							<h3>Files Received</h3>
							<progress id="receiveProgressBar" max="100" value="0"></progress>
							<ul class="receivedFilesList"></ul>
						</div>
					</div>
				</div>
			</body>
            </html>
            `;
    }

    _setWebviewMessageListener(webview) {
        webview.onDidReceiveMessage(
            (message) => {
                switch (message.type) {
                    case "test":
                        vscode.window.showWarningMessage(message.data);
                        break;
                    case "peerjs-error":
                        vscode.window.showErrorMessage(message.data);
                        break;
                    case "fileBlobReceive":
                        const targetUri = vscode.Uri.file(
                            path.join(
                                vscode.workspace.workspaceFolders[0].uri.fsPath,
                                "JetSetDownloads",
                                message.payload.fileName
                            )
                        );
                        vscode.workspace.fs.writeFile(
                            targetUri,
                            message.payload.fileByteArray
                        );
                        break;
                    default:
                        vscode.window.showErrorMessage(
                            "Message type Not Defined"
                        );
                }
            },
            undefined,
            this._disposables
        );
    }

    dispose() {
        ReceiveFilePanel.currentPanel = undefined;
        this._panel.dispose();
        while (this._disposables.length) {
            const disposable = this._disposables.pop();
            if (disposable) {
                disposable.dispose();
            }
        }
    }
};
