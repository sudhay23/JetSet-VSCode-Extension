import { Divider as FoundationDivider } from '@microsoft/fast-foundation';
/**
 * The Visual Studio Code divider class.
 *
 * @public
 */
export declare class Divider extends FoundationDivider {
}
/**
 * The Visual Studio Code divider component registration.
 *
 * @remarks
 * HTML Element: `<vscode-divider>`
 *
 * @public
 */
export declare const vsCodeDivider: (overrideDefinition?: import("@microsoft/fast-foundation").OverrideFoundationElementDefinition<import("@microsoft/fast-foundation").FoundationElementDefinition> | undefined) => import("@microsoft/fast-foundation").FoundationElementRegistry<import("@microsoft/fast-foundation").FoundationElementDefinition, typeof Divider>;
