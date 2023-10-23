export interface IMenuLink {
  menuItemIconUrl: JSX.Element;
  title: string;
  url: string;
  subLinks: IMenuLink[];
  iconUrl?: string;
  subMenuItemIconUrl: string;
  subSubLinks: IMenuLink[];
  subSubMenuItemIconUrl?:string;
  png: string;
  subMenuLinks?: IMenuLink[];


}

export interface IMenuProps {
  logoUrl: string;
  portalTitle: string;
  links: IMenuLink[];
  index: number;
  isVerticalMenu: boolean;
  menuItemIconUrl:string;
  subMenuItemIconUrl: string;
  subSubMenuItemIconUrl: string;


}

export interface IMenuState {
  menuLinks: IMenuLink[];
  isDropdownOpen: boolean;
  activeDropdownIndex: number | null;

}

export interface ISubMenuLink {
  title: string;
  url: string;
}


