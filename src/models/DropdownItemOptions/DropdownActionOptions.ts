import DropdownItemType from "./DropdownItemType";

export type DropdownActionOptions = {
  type: DropdownItemType.Action;
  label?: string;
  icon?: string;
  action: () => void;
};

export default DropdownActionOptions;
