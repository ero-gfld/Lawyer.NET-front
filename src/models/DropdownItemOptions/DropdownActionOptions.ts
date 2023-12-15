export type DropdownActionOptions = {
  type: "action";
  label?: string;
  icon?: string;
  action: () => void;
};

export default DropdownActionOptions;
