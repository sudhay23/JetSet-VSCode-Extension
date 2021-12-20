import { Badge as FoundationBadge } from '@microsoft/fast-foundation';
/**
 * The Visual Studio Code tag class.
 *
 * @public
 */
export declare class Tag extends FoundationBadge {
    /**
     * Component lifecycle method that runs when the component is inserted
     * into the DOM.
     *
     * @internal
     */
    connectedCallback(): void;
}
/**
 * The Visual Studio Code tag component registration.
 *
 * @remarks
 * HTML Element: `<vscode-tag>`
 *
 * @public
 */
export declare const vsCodeTag: (overrideDefinition?: import("@microsoft/fast-foundation").OverrideFoundationElementDefinition<import("@microsoft/fast-foundation").FoundationElementDefinition> | undefined) => import("@microsoft/fast-foundation").FoundationElementRegistry<import("@microsoft/fast-foundation").FoundationElementDefinition, typeof Tag>;
