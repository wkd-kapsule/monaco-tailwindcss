import { IDisposable, languages } from 'monaco-editor';
import { TailwindConfig } from 'tailwindcss/tailwind-config';

export interface MonacoTailwindcssOptions {
  /**
   * @default defaultLanguageSelector
   */
  languageSelector?: languages.LanguageSelector;

  tailwindConfig?: TailwindConfig | string;
}

/**
 * Contains the content of CSS classes to extract.
 * With optional "extension" key, which might be relevant
 * to properly extract css classed based on the content language.
 */
export interface Content {
  content: string;
  extension?: string;
}

export interface MonacoTailwindcss extends IDisposable {
  setTailwindConfig: (tailwindConfig: TailwindConfig) => void;

  /**
   * Generate styles using Tailwindcss.
   *
   * This generates CSS using the Tailwind JIT compiler. It uses the Tailwind configuration that has
   * previously been passed to {@link configureMonacoTailwindcss}.
   *
   * @param css - The CSS to process. Only one CSS file can be processed at a time.
   * @param content - All content that contains CSS classes to extract.
   * @returns The CSS generated by the Tailwind JIT compiler. It has been optimized for the given
   * content.
   * @example
   * monacoTailwindcss.generateStylesFromContent(
   *   css,
   *   editor.getModels().filter((model) => model.getLanguageId() === 'html')
   * )
   */
  generateStylesFromContent: (css: string, content: (Content | string)[]) => Promise<string>;
}

export function configureMonacoTailwindcss(
  monaco: typeof import('monaco-editor'),
  options?: MonacoTailwindcssOptions,
): MonacoTailwindcss;

/**
 * This data can be used with the default Monaco CSS support to support tailwind directives.
 *
 * It will provider hover information from the Tailwindcss documentation, including a link.
 */
export const tailwindcssData: languages.css.CSSDataV1;
