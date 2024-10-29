import { type Config } from "tailwindcss";

export default {
  content: [
    "{routes,islands,components}/**/*.{ts,tsx,js,jsx}",
  ],
  plugins: [
    // deno-lint-ignore no-explicit-any
    function ({ addVariant }: any) {
      addVariant(
        "supports-scrollbars",
        "@supports selector(::-webkit-scrollbar)",
      );
      addVariant("children", "& > *");
      addVariant("scrollbar", "&::-webkit-scrollbar");
      addVariant("scrollbar-track", "&::-webkit-scrollbar-track");
      addVariant("scrollbar-thumb", "&::-webkit-scrollbar-thumb");
    },
  ],
} satisfies Config;
