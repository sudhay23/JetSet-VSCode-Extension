import { RadioGroup as FoundationRadioGroup } from '@microsoft/fast-foundation';
/**
 * The Visual Studio Code radio group class.
 *
 * @public
 */
export declare class RadioGroup extends FoundationRadioGroup {
    /**
     * Component lifecycle method that runs when the component is inserted
     * into the DOM.
     *
     * @internal
     */
    connectedCallback(): void;
}
/**
 * The Visual Studio Code radio group component registration.
 *
 * @remarks
 * HTML Element: `<vscode-radio-group>`
 *
 * @public
 */
export declare const vsCodeRadioGroup: (overrideDefinition?: import("@microsoft/fast-foundation").OverrideFoundationElementDefinition<import("@microsoft/fast-foundation").FoundationElementDefinition> | undefined) => import("@microsoft/fast-foundation").FoundationElementRegistry<import("@microsoft/fast-foundation").FoundationElementDefinition, typeof RadioGroup>;
