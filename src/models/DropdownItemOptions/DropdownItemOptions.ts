import DropdownActionOptions from "./DropdownActionOptions";
import DropdownLinkOptions from "./DropdownLinkOptions";
import DropdownSeparatorOptions from "./DropdownSeparatorOptions";

export type DropdownItemOptions =
  | DropdownLinkOptions
  | DropdownActionOptions
  | DropdownSeparatorOptions;

export default DropdownItemOptions;
