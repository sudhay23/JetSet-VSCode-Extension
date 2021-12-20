const vscode = require("vscode");

const getWebviewURI = (webview, extensionUri, pathList) => {
	return webview.asWebviewUri(vscode.Uri.joinPath(extensionUri, ...pathList));
};

module.exports = { getWebviewURI };
