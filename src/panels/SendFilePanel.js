const vscode = require("vscode");
const { getWebviewURI } = require("../utils/getWebviewUri.js");

module.exports = class SendFilePanel {
    static extensionContext;
    static currentPanel;
    _panel = null;
    _disposables = [];

    constructor(panel) {
        this._panel = panel;
        this._panel.webview.html = this._getWebviewContent(
            this._panel.webview,
            SendFilePanel.extensionContext.extensionUri
        );
        this._panel.iconPath = vscode.Uri.joinPath(
            SendFilePanel.extensionContext.extensionUri,
            "assets/images/jetsetLogoPanel.png"
        );
        this._setWebviewMessageListener(this._panel.webview);
        this._panel.onDidDispose(this.dispose, null, this._disposables);
    }

    static render() {
        if (SendFilePanel.currentPanel) {
            SendFilePanel.currentPanel._panel.reveal(vscode.ViewColumn.Two);
        } else {
            const panel = vscode.window.createWebviewPanel(
                "jetset-send",
                "Send File - JetSet",
                vscode.ViewColumn.Two,
                {
                    enableScripts: true,
                    retainContextWhenHidden: true,
                }
            );
            SendFilePanel.currentPanel = new SendFilePanel(panel);
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
					href="https://server.sudhay.me/static/css/sender.jetset.css"
				/>
                <script type="module" src="${webviewToolkitURI}"></script>
                <script src="https://server.sudhay.me/static/js/jetset.peerjs.min.js" defer></script>
                <script src="https://server.sudhay.me/static/js/sender.jetset.js" defer></script>
                <title>Send File - JetSet</title>
            </head>
            <body>
				<div class="loader">
					<vscode-progress-ring></vscode-progress-ring>
					<p>Loading Files</p>
				</div>
				<div class="container" style="display: none">
					<h2 class="title">Send File</h2>
					<div class="collect-info">
						<vscode-text-field
							size="30"
							class="sender-name-input"
							placeholder="Your Name"
						>
							Enter your name
						</vscode-text-field>
						<span class="errorSpan nameError">
							Error: Please fill your name with more than 5 characters
						</span>
						<vscode-text-field
							size="30"
							class="receiver-id-input"
							placeholder="Receiver ID"
							maxlength="8"
						>
							Enter Receiver ID
						</vscode-text-field>
						<span class="errorSpan receiverIdError">
							Error: Receiver ID must be 8 characters
						</span>
						<vscode-button class="connect-receiver-btn">
							Connect to Receiver
						</vscode-button>
						<p>
							Your ID:
							<span class="senderID valueField">Not Available</span>
						</p>
					</div>
					<div class="display-info">
						<p>Your Name: <span class="senderName valueField">XXX</span></p>
						<p>
							Your ID:
							<span class="senderID valueField">XXX</span>
						</p>
						<p>
							You are connected to:
							<span class="connectedReceiver valueField">
								N/A <small>(99988899)</small>
							</span>
						</p>
						<br />
						<hr />
						<div>
							<h4>Send File 🛫</h4>
							<input type="file" class="sendFileInputBtn" />
							<br />
							<br />
							<vscode-button class="sendFileBtn">Send</vscode-button>
						</div>
						<br />
						<hr />
						<div class="filesSent">
							<h3>Files Sent</h3>
							<ul class="sentFilesList"></ul>
						</div>
					</div>
				</div>
				<progress id="receiveProgressBar" max="100" style="display:none" value="0"></progress>
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
                    case "no-file-chosen":
                        vscode.window.showWarningMessage(message.data);
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
        SendFilePanel.currentPanel = undefined;
        this._panel.dispose();
        while (this._disposables.length) {
            const disposable = this._disposables.pop();
            if (disposable) {
                disposable.dispose();
            }
        }
    }
};
