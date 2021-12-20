import { Select as FoundationSelect, SelectOptions } from '@microsoft/fast-foundation';
/**
 * Dropdown configuration options
 * @public
 */
export declare type DropdownOptions = SelectOptions;
/**
 * The Visual Studio Code dropdown class.
 *
 * @public
 */
export declare class Dropdown extends FoundationSelect {
}
/**
 * The Visual Studio Code link dropdown registration.
 *
 * @remarks
 * HTML Element: `<vscode-dropdown>`
 *
 * @public
 */
export declare const vsCodeDropdown: (overrideDefinition?: import("@microsoft/fast-foundation").OverrideFoundationElementDefinition<SelectOptions> | undefined) => import("@microsoft/fast-foundation").FoundationElementRegistry<SelectOptions, import("@microsoft/fast-element").Constructable<import("@microsoft/fast-foundation").FoundationElement>>;
