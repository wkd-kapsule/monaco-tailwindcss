import { Postcss } from 'postcss';
import parse from 'postcss-selector-parser';
import { State } from 'tailwindcss-language-service';
import expandApplyAtRules from 'tailwindcss/src/lib/expandApplyAtRules.js';
import { generateRules } from 'tailwindcss/src/lib/generateRules.js';
import { createContext, JitContext } from 'tailwindcss/src/lib/setupContextUtils.js';

export interface JitState extends State {
  config: object;
  separator: string;
  screens: string[];
  variants: Record<string, string | null>;
  jit: true;
  jitContext: JitContext;
  modules: {
    postcss: {
      version: string;
      module: Postcss;
    };
    postcssSelectorParser: {
      module: typeof parse;
    };
    jit: {
      generateRules: {
        module: typeof generateRules;
      };
      createContext: {
        module: typeof createContext;
      };
      expandApplyAtRules: {
        module: typeof expandApplyAtRules;
      };
    };
  };
}