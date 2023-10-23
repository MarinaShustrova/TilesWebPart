declare interface IMenuWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
  LogoUrlFieldLabel: string;
  PortalTitleFieldLabel: string;
  MenuListFieldLabel: string;
}

declare module 'MenuWebPartStrings' {
  const strings: IMenuWebPartStrings;
  export = strings;
}
