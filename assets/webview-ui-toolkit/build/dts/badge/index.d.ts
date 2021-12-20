import { Badge as FoundationBadge } from '@microsoft/fast-foundation';
/**
 * The Visual Studio Code badge class.
 *
 * @public
 */
export declare class Badge extends FoundationBadge {
    /**
     * Component lifecycle method that runs when the component is inserted
     * into the DOM.
     *
     * @internal
     */
    connectedCallback(): void;
}
/**
 * The Visual Studio Code badge component registration.
 *
 * @remarks
 * HTML Element: `<vscode-badge>`
 *
 * @public
 */
export declare const vsCodeBadge: (overrideDefinition?: import("@microsoft/fast-foundation").OverrideFoundationElementDefinition<import("@microsoft/fast-foundation").FoundationElementDefinition> | undefined) => import("@microsoft/fast-foundation").FoundationElementRegistry<import("@microsoft/fast-foundation").FoundationElementDefinition, typeof Badge>;
