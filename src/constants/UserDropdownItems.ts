import DropdownItemOptions from "@/models/DropdownItemOptions/DropdownItemOptions";
import DropdownItemType from "@/models/DropdownItemOptions/DropdownItemType";
import NotificationTypes from "@/constants/NotificationTypes";
import { useNotificationStore } from "@/stores/NotificationStore";
import { useLoginStore } from "@/stores/LoginStore";

export const USER_LOGGED_DROPDOWN_ITEMS: ReadonlyArray<DropdownItemOptions> = [
  {
    type: DropdownItemType.Link,
    label: "navbar.profile",
    link: "/my-account",
  },
  {
    type: DropdownItemType.Action,
    label: "navbar.logout",
    action: () => {
      useLoginStore().logout();
      useNotificationStore().generateNotification(
        "Logout successful",
        "You have successfully logged out.",
        NotificationTypes.SUCCESS
      );
    },
  },
];

export const USER_NOT_LOGGED_DROPDOWN_ITEMS: ReadonlyArray<DropdownItemOptions> =
  [
    {
      type: DropdownItemType.Link,
      label: "navbar.register",
      link: "/register",
    },
    {
      type: DropdownItemType.Link,
      label: "navbar.login",
      link: "/login",
    },
  ];

export const ADMIN_DROPDOWN_ITEMS: ReadonlyArray<DropdownItemOptions> = [
  {
    type: DropdownItemType.Separator,
    showSeparator: true,
    verticalSpacing: "2",
  },
  {
    type: DropdownItemType.Link,
    label: "navbar.admin-users",
    link: "/admin/users",
  },
  {
    type: DropdownItemType.Link,
    label: "navbar.add-lawyer",
    link: "/admin/lawyers",
  },
];
