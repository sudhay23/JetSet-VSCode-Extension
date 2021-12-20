import { TextArea as FoundationTextArea } from '@microsoft/fast-foundation';
/**
 * The Visual Studio Code text area class.
 *
 * @remarks
 * HTML Element: `<vscode-text-area>`
 *
 * @public
 */
export declare class TextArea extends FoundationTextArea {
    /**
     * Component lifecycle method that runs when the component is inserted
     * into the DOM.
     *
     * @internal
     */
    connectedCallback(): void;
}
/**
 * The Visual Studio Code text area component registration.
 *
 * @remarks
 * HTML Element: `<vscode-text-area>`
 *
 * @public
 */
export declare const vsCodeTextArea: (overrideDefinition?: import("@microsoft/fast-foundation").OverrideFoundationElementDefinition<import("@microsoft/fast-foundation").FoundationElementDefinition> | undefined) => import("@microsoft/fast-foundation").FoundationElementRegistry<import("@microsoft/fast-foundation").FoundationElementDefinition, typeof TextArea>;
