import { DesignToken } from '@microsoft/fast-foundation';
import { initThemeChangeListener } from '../theme/applyTheme';
/**
 * A mapping of all the Visual Studio Code theme CSS variables mapped to the
 * toolkit design tokens.
 */
export const tokenMappings = {};
/**
 * Boolean flag that ensures the VS Code theme listener is initialized once.
 */
let isThemeListenerInitialized = false;
/**
 * Given a design token name, return a new FAST CSSDesignToken.
 *
 * @remarks A VS Code theme CSS variable can be optionally passed to be
 * associated with the design token.
 *
 * @remarks On the first execution the VS Code theme listener will also be
 * initialized.
 *
 * @param name A design token name.
 * @param vscodeThemeVar A VS Code theme CSS variable name to be associated with
 * the design token.
 * @returns A FAST CSSDesignToken that emits a CSS custom property.
 */
export function create(name, vscodeThemeVar) {
    const designToken = DesignToken.create(name);
    if (vscodeThemeVar) {
        tokenMappings[vscodeThemeVar] = designToken;
    }
    if (!isThemeListenerInitialized) {
        initThemeChangeListener(tokenMappings);
        isThemeListenerInitialized = true;
    }
    return designToken;
}
