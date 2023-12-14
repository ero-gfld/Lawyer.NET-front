export type LanguageOption = {
  icon: string,
  link: string,
  scale: number,
};

export const LANGUAGES_OPTIONS: ReadonlyArray<LanguageOption> = Object.freeze([
  {
    icon: "co-gb",
    link: "/en",
    scale: 1.3,
  },
  {
    icon: "co-de",
    link: "/de",
    scale: 1.3,
  },
  {
    icon: "co-fr",
    link: "/fr",
    scale: 1.3,
  },
  {
    icon: "co-it",
    link: "/it",
    scale: 1.3,
  },
]);

export default LANGUAGES_OPTIONS;
