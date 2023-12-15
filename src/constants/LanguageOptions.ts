import DropdownItemOptions from "@/models/DropdownItemOptions/DropdownItemOptions";
import DropdownItemType from "@/models/DropdownItemOptions/DropdownItemType";

export const LANGUAGE_OPTIONS: ReadonlyArray<DropdownItemOptions> = [
  {
    type: DropdownItemType.Link,
    icon: "co-gb",
    link: "/en",
  },
  {
    type: DropdownItemType.Link,
    icon: "co-de",
    link: "/de",
  },
  {
    type: DropdownItemType.Link,
    icon: "co-fr",
    link: "/fr",
  },
  {
    type: DropdownItemType.Link,
    icon: "co-it",
    link: "/it",
  },
];

export default LANGUAGE_OPTIONS;
