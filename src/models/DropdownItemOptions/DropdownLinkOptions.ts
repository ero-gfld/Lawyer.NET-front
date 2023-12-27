import DropdownItemType from "./DropdownItemType";

export type DropdownLinkOptions = {
  type: DropdownItemType.Link;
  label?: string;
  icon?: string;
  link: string;
};

export default DropdownLinkOptions;
