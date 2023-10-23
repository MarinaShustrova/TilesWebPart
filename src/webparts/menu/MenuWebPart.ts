// import * as React from 'react';
// import * as ReactDom from 'react-dom';
// import { Version } from '@microsoft/sp-core-library';
// import styles from './components/Menu.module.scss';

// import {
//   IPropertyPaneConfiguration,
//   PropertyPaneTextField,
//   PropertyPaneButton,
//   PropertyPaneButtonType,
//   IPropertyPaneField,
//   IPropertyPanePage,
//   IPropertyPaneDropdownOption,
// } from '@microsoft/sp-webpart-base';

// import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
// import * as strings from 'MenuWebPartStrings';
// import Menu from './components/Menu';
// import { IMenuProps, IMenuLink } from './components/IMenuProps';

// export interface IMenuWebPartProps {
//   logoUrl: string;
//   portalTitle: string;
//   menuList: string;
//   option1?: string;
//   option2?: number;
//   resourceLink?: string;
//   hasSubLinks?: boolean;
//   menuLinks?: IMenuLink[];
//   menuItemIconUrl?: string; // Добавлено новое поле для иконки пунктов меню
//   subMenuItemIconUrl?: string; // Добавлено новое поле для иконки подпунктов меню
// }

// export default class MenuWebPart extends BaseClientSideWebPart<IMenuWebPartProps> {
//   private menuOptions: IPropertyPaneDropdownOption[] = [];
//   private subMenuOptions: IPropertyPaneDropdownOption[] = [];
//   private isVerticalMenu: boolean = false;

//   protected onPropertyPaneFieldChanged(propertyPath: string, oldValue: any, newValue: any): void {
//     if (propertyPath === 'menuLinks' && newValue) {
//       try {
//         const parsedLinks: IMenuLink[] = JSON.parse(newValue);
//         this.properties.menuLinks = parsedLinks;
//       } catch (error) {
//         // Обработка ошибки парсинга JSON
//       }
//     }
//   }

//   public render(): void {
//     const element: React.ReactElement<IMenuProps> = React.createElement(Menu, {
//       logoUrl: this.properties.logoUrl,
//       portalTitle: this.properties.portalTitle,
//       links: this.getMenuLinks(),
//       index: 0,
//       isVerticalMenu: this.isVerticalMenu,
//       menuItemIconUrl: this.properties.menuItemIconUrl, // Передача ссылки на иконку пунктов меню
//       subMenuItemIconUrl: this.properties.subMenuItemIconUrl, // Передача ссылки на иконку подпунктов меню
//     });

//     ReactDom.render(element, this.domElement);
//   }

//   private getMenuLinks(): IMenuLink[] {
//     return this.properties.menuLinks || [];
//   }

//   protected onDispose(): void {
//     ReactDom.unmountComponentAtNode(this.domElement);
//   }

//   protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
//     return {
//       pages: [
//         this.getPropertyPaneGeneralPage(),
//         this.getPropertyPaneMenuPage(),
//       ],
//     };
//   }

//   private getPropertyPaneGeneralPage(): IPropertyPanePage {
//     return {
//       header: {
//         description: 'Общие настройки',
//       },
//       groups: [
//         {
//           groupName: 'Общие настройки меню',
//           groupFields: [
//             PropertyPaneTextField('logoUrl', {
//               label: 'Добавить URL для логотипа',
//             }),
//             PropertyPaneTextField('portalTitle', {
//               label: 'Добавить название портала',
//             }),
//             PropertyPaneButton('toggleMenuOrientation', {
//               text: 'Изменить ориентацию меню',
//               onClick: this.toggleMenuOrientation,
//             }),
//           ],
//         },
//       ],
//     };
//   }

//   private getPropertyPaneMenuPage(): IPropertyPanePage {
//     return {
//       header: {
//         description: 'Настройки пунктов меню',
//       },
//       groups: [
//         {
//           groupName: 'Пункты меню',
//           groupFields: [
//             ...this.getPropertyPaneMenuItems(),
//           ],
//         },
//       ],
//     };
//   }

//   private getPropertyPaneMenuItems(): IPropertyPaneField<any>[] {
//     const menuItemsFields: IPropertyPaneField<any>[] = [];

//     (this.properties.menuLinks || []).forEach((menuItem, index) => {
//       menuItemsFields.push(
//         PropertyPaneTextField(`menuLinks[${index}].title`, {
//           label: `Заголовок пункта меню ${index + 1}`,
//         }),
//         PropertyPaneTextField(`menuLinks[${index}].url`, {
//           label: `URL пункта меню ${index + 1}`,
//         }),
//         PropertyPaneTextField(`menuLinks[${index}].menuItemIconUrl`, { // Добавлено поле для настройки иконки пункта меню
//           label: `URL иконки пункта меню ${index + 1}`,
//         }),
//         PropertyPaneButton(`menuLinks[${index}].removeMenuItem`, {
//           text: 'Удалить пункт меню',
//           onClick: () => this.removeMenuItem(index),
//         })
//       );

//       // Добавление настроек подменю для каждого пункта меню
//       menuItemsFields.push(
//         PropertyPaneButton(`menuLinks[${index}].addSubMenu`, {
//           text: 'Добавить подпункт',
//           onClick: () => this.addSubMenu(index),
//         })
//       );

//       if (menuItem.subLinks && menuItem.subLinks.length > 0) {
//         menuItem.subLinks.forEach((subMenuItem, subIndex) => {
//           menuItemsFields.push(
//             PropertyPaneTextField(`menuLinks[${index}].subLinks[${subIndex}].title`, {
//               label: `Заголовок подпункта ${subIndex + 1}`,
//             }),
//             PropertyPaneTextField(`menuLinks[${index}].subLinks[${subIndex}].url`, {
//               label: `URL подпункта ${subIndex + 1}`,
//             }),
//             PropertyPaneTextField(`menuLinks[${index}].subLinks[${subIndex}].subMenuItemIconUrl`, { // Добавлено поле для настройки иконки подпункта меню
//               label: `URL иконки подпункта ${subIndex + 1}`,
//             }),
//             PropertyPaneButton(`menuLinks[${index}].removeSubMenu[${subIndex}]`, {
//               text: 'Удалить подпункт',
//               onClick: () => this.removeSubMenu(index, subIndex),
//             })
//           );
//         });
//       }
//     });

//     menuItemsFields.push(
//       PropertyPaneButton('addMenuItem', {
//         text: 'Добавить пункт меню',
//         onClick: this.addMenuItem,
//       })
//     );

//     return menuItemsFields;
//   }

//   private addMenuItem = (): void => {
//     const menuLinks = [...(this.properties.menuLinks || [])];
//     menuLinks.push({
//       title: '', url: '', subLinks: [],
//       subMenuItemIconUrl: ''
//     });
//     this.properties.menuLinks = menuLinks;
//     this.context.propertyPane.refresh();
//   };

//   private removeMenuItem = (menuItemIndex: number): void => {
//     const menuLinks = [...(this.properties.menuLinks || [])];
//     menuLinks.splice(menuItemIndex, 1);
//     this.properties.menuLinks = menuLinks;
//     this.context.propertyPane.refresh();
//   };

//   private addSubMenu = (menuItemIndex: number): void => {
//     const menuLinks = [...(this.properties.menuLinks || [])];
//     const subLinks = menuLinks[menuItemIndex].subLinks || [];
//     subLinks.push({
//       title: '', url: '',
//       subMenuItemIconUrl: ''
//     });
//     menuLinks[menuItemIndex].subLinks = subLinks;
//     this.properties.menuLinks = menuLinks;
//     this.context.propertyPane.refresh();
//   };

//   private removeSubMenu = (menuItemIndex: number, subMenuIndex: number): void => {
//     const menuLinks = [...(this.properties.menuLinks || [])];
//     menuLinks[menuItemIndex].subLinks.splice(subMenuIndex, 1);
//     this.properties.menuLinks = menuLinks;
//     this.context.propertyPane.refresh();
//   };

//   private toggleMenuOrientation = (): void => {
//     this.isVerticalMenu = !this.isVerticalMenu;
//     this.render();
//   };
// }



// import * as React from 'react';
// import * as ReactDom from 'react-dom';
// import { Version } from '@microsoft/sp-core-library';
// import styles from './components/Menu.module.scss';

// import {
//   IPropertyPaneConfiguration,
//   PropertyPaneTextField,
//   PropertyPaneButton,
//   PropertyPaneButtonType,
//   IPropertyPaneField,
//   IPropertyPanePage,
//   IPropertyPaneDropdownOption,
// } from '@microsoft/sp-webpart-base';

// import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
// import * as strings from 'MenuWebPartStrings';
// import Menu from './components/Menu';
// import { IMenuProps, IMenuLink } from './components/IMenuProps';

// export interface IMenuWebPartProps {
//   logoUrl: string;
//   portalTitle: string;
//   menuList: string;
//   option1?: string;
//   option2?: number;
//   resourceLink?: string;
//   hasSubLinks?: boolean;
//   menuLinks?: IMenuLink[];
//   menuItemIconUrl?: string; // Добавлено новое поле для иконки пунктов меню
//   subMenuItemIconUrl?: string; // Добавлено новое поле для иконки подпунктов меню
// }

// export default class MenuWebPart extends BaseClientSideWebPart<IMenuWebPartProps> {
//   private menuOptions: IPropertyPaneDropdownOption[] = [];
//   private subMenuOptions: IPropertyPaneDropdownOption[] = [];
//   private isVerticalMenu: boolean = false;
//   clearPropertyPaneFields: any;

//   protected onPropertyPaneFieldChanged(propertyPath: string, oldValue: any, newValue: any): void {
//     if (propertyPath === 'menuLinks' && newValue) {
//       try {
//         const parsedLinks: IMenuLink[] = JSON.parse(newValue);
//         this.properties.menuLinks = parsedLinks;
//       } catch (error) {
//         // Обработка ошибки парсинга JSON
//       }
//     }
//   }

//   public render(): void {
//     const element: React.ReactElement<IMenuProps> = React.createElement(Menu, {
//       logoUrl: this.properties.logoUrl,
//       portalTitle: this.properties.portalTitle,
//       links: this.getMenuLinks(),
//       index: 0,
//       isVerticalMenu: this.isVerticalMenu,
//       menuItemIconUrl: this.properties.menuItemIconUrl, // Передача ссылки на иконку пунктов меню
//       subMenuItemIconUrl: this.properties.subMenuItemIconUrl, // Передача ссылки на иконку подпунктов меню
//     });

//     ReactDom.render(element, this.domElement);
//   }

//   private getMenuLinks(): IMenuLink[] {
//     return this.properties.menuLinks || [];
//   }

//   protected onDispose(): void {
//     ReactDom.unmountComponentAtNode(this.domElement);
//   }

//   protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
//     return {
//       pages: [
//         this.getPropertyPaneGeneralPage(),
//         this.getPropertyPaneMenuPage(),
//       ],
//     };
//   }

//   private getPropertyPaneGeneralPage(): IPropertyPanePage {
//     return {
//       header: {
//         description: 'Общие настройки',
//       },
//       groups: [
//         {
//           groupName: 'Общие настройки меню',
//           groupFields: [
//             PropertyPaneTextField('logoUrl', {
//               label: 'Добавить URL для логотипа',
//             }),
//             PropertyPaneTextField('portalTitle', {
//               label: 'Добавить название портала',
//             }),
//             PropertyPaneButton('toggleMenuOrientation', {
//               text: 'Изменить ориентацию меню',
//               onClick: this.toggleMenuOrientation,
//             }),
//           ],
//         },
//       ],
//     };
//   }

//   private getPropertyPaneMenuPage(): IPropertyPanePage {
//     return {
//       header: {
//         description: 'Настройки пунктов меню',
//       },
//       groups: [
//         {
//           groupName: 'Пункты меню',
//           groupFields: [
//             ...this.getPropertyPaneMenuItems(),
//           ],
//         },
//       ],
//     };
//   }

//   private getPropertyPaneMenuItems(): IPropertyPaneField<any>[] {
//     const menuItemsFields: IPropertyPaneField<any>[] = [];

//     (this.properties.menuLinks || []).forEach((menuItem, index) => {
// const menuItemIndex = index;

//       menuItemsFields.push(
//         PropertyPaneTextField(`menuLinks[${index}].title`, {
//           label: `Заголовок пункта меню ${index + 1}`,
//         }),
//         PropertyPaneTextField(`menuLinks[${index}].url`, {
//           label: `URL пункта меню ${index + 1}`,
//         }),
//         PropertyPaneTextField(`menuLinks[${index}].menuItemIconUrl`, { // Добавлено поле для настройки иконки пункта меню
//           label: `URL иконки пункта меню ${index + 1}`,
//         }),
//         PropertyPaneButton(`menuLinks[${index}].removeMenuItem`, {
//           text: 'Удалить пункт меню',
//           onClick: () => this.removeMenuItem(menuItemIndex),
//         }),
//         PropertyPaneButton(`menuLinks[${index}].addSubMenu`, {
//           text: 'Добавить подпункт',
//           onClick: () => this.addSubMenu(menuItemIndex),
//         })
//       );

//       if (menuItem.subLinks && menuItem.subLinks.length > 0) {
//         menuItem.subLinks.forEach((subMenuItem, subIndex) => {
//           const subMenuItemIndex = subIndex;

//           menuItemsFields.push(
//             PropertyPaneTextField(`menuLinks[${index}].subLinks[${subIndex}].title`, {
//               label: `Заголовок подпункта ${subIndex + 1}`,
//             }),
//             PropertyPaneTextField(`menuLinks[${index}].subLinks[${subIndex}].url`, {
//               label: `URL подпункта ${subIndex + 1}`,
//             }),
//             PropertyPaneTextField(`menuLinks[${index}].subLinks[${subIndex}].subMenuItemIconUrl`, { // Добавлено поле для настройки иконки подпункта меню
//               label: `URL иконки подпункта ${subIndex + 1}`,
//             }),
//             PropertyPaneButton(`menuLinks[${index}].removeSubMenu[${subIndex}]`, {
//               text: 'Удалить подпункт',
//               onClick: () => this.removeSubMenu(menuItemIndex, subMenuItemIndex),
//             })
//           );
//         });
//       }
//     });

//     menuItemsFields.push(
//       PropertyPaneButton('addMenuItem', {
//         text: 'Добавить пункт меню',
//         onClick: this.addMenuItem,
//       })
//     );


//     if (menuItem.subSubLinks && menuItem.subSubLinks.length > 0) {
//       menuItem.subSubLinks.forEach((subSubMenuItem, subSubIndex) => {
//         const subMenuItemIndex = subSubIndex;

//         menuItemsFields.push(
//           PropertyPaneTextField(`menuLinks[${index}].subSubLinks[${subSubIndex}].title`, {
//             label: `Заголовок подпункта ${subSubIndex + 1}`,
//           }),
//           PropertyPaneTextField(`menuLinks[${index}].subLinks[${subSubIndex}].url`, {
//             label: `URL подпункта ${subSubIndex + 1}`,
//           }),
//           PropertyPaneTextField(`menuLinks[${index}].subLinks[${subSubIndex}].subMenuItemIconUrl`, { // Добавлено поле для настройки иконки подпункта меню
//             label: `URL иконки подпункта ${subSubIndex + 1}`,
//           }),
//           PropertyPaneButton(`menuLinks[${index}].removeSubMenu[${subSubIndex}]`, {
//             text: 'Удалить подпункт',
//             onClick: () => this.removeSubSubMenu(menuItemIndex, subSubMenuItemIndex),
//           })
//         );
//       });
//     }


//     return menuItemsFields;
//   }

//   private addMenuItem = (): void => {
//     const menuLinks = [...(this.properties.menuLinks || [])];
//     menuLinks.push({
//       title: '', url: '', subLinks: [],
//       subMenuItemIconUrl: '',
//       menuItemIconUrl: undefined
//     });
//     this.properties.menuLinks = menuLinks;
//     this.context.propertyPane.refresh();
//   };

//   private removeMenuItem = (menuItemIndex: number): void => {
//     const menuLinks = [...(this.properties.menuLinks || [])];
//     menuLinks.splice(menuItemIndex, 1);
//     this.properties.menuLinks = menuLinks;
//     this.context.propertyPane.refresh();
//     this.clearPropertyPaneFields();
//   };

//   private addSubMenu = (menuItemIndex: number): void => {
//     const menuLinks = [...(this.properties.menuLinks || [])];
//     const subLinks = menuLinks[menuItemIndex].subLinks || [];
//     subLinks.push({
//       title: '', url: '',
//       subMenuItemIconUrl: '',
//       menuItemIconUrl: undefined
//     });
//     menuLinks[menuItemIndex].subLinks = subLinks;
//     this.properties.menuLinks = menuLinks;
//     this.context.propertyPane.refresh();
//     this.clearPropertyPaneFields();
//   };

//   private removeSubMenu = (menuItemIndex: number, subMenuIndex: number): void => {
//     const menuLinks = [...(this.properties.menuLinks || [])];
//     menuLinks[menuItemIndex].subLinks.splice(subMenuIndex, 1);
//     this.properties.menuLinks = menuLinks;
//     this.context.propertyPane.refresh();
//   };

//   private toggleMenuOrientation = (): void => {
//     this.isVerticalMenu = !this.isVerticalMenu;
//     this.render();
//   };
// }



import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import styles from './components/Menu.module.scss';

import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneButton,
  PropertyPaneButtonType,
  IPropertyPaneField,
  IPropertyPanePage,
  IPropertyPaneDropdownOption,
} from '@microsoft/sp-webpart-base';

import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import * as strings from 'MenuWebPartStrings';
import Menu from './components/Menu';
import { IMenuProps, IMenuLink, ISubMenuLink } from './components/IMenuProps';

export interface IMenuWebPartProps {
  logoUrl: string;
  portalTitle: string;
  menuList: string;
  option1?: string;
  option2?: number;
  resourceLink?: string;
  hasSubLinks?: boolean;
  menuLinks?: IMenuLink[];
  menuItemIconUrl?: string; // Добавлено новое поле для иконки пунктов меню
  subMenuItemIconUrl?: string;
  subSubMenuItemIconUrl?: string;
  showMenuSettings: boolean;
}

export default class MenuWebPart extends BaseClientSideWebPart<IMenuWebPartProps> {
  private menuOptions: IPropertyPaneDropdownOption[] = [];
  private subMenuOptions: IPropertyPaneDropdownOption[] = [];
  private isVerticalMenu: boolean = false;
  clearPropertyPaneFields: any;

  protected onPropertyPaneFieldChanged(propertyPath: string, oldValue: any, newValue: any): void {
    if (propertyPath === 'menuLinks' && newValue) {
      try {
        const parsedLinks: IMenuLink[] = JSON.parse(newValue);
        this.properties.menuLinks = parsedLinks;
      } catch (error) {
        // Обработка ошибки парсинга JSON
      }
    }
  }

  public render(): void {
    const element: React.ReactElement<IMenuProps> = React.createElement(Menu, {
      logoUrl: this.properties.logoUrl,
      portalTitle: this.properties.portalTitle,
      links: this.getMenuLinks(),
      index:0,
      isVerticalMenu: this.isVerticalMenu,
      menuItemIconUrl: this.properties.menuItemIconUrl, // Передача ссылки на иконку пунктов меню
      subMenuItemIconUrl: this.properties.subMenuItemIconUrl,
      subSubMenuItemIconUrl: this.properties.subSubMenuItemIconUrl,
    });

    ReactDom.render(element, this.domElement);
  }

  private toggleMenuSettings = (): void => {
    this.properties.showMenuSettings = !this.properties.showMenuSettings;
    this.render();
  };


  private getMenuLinks(): IMenuLink[] {
    return this.properties.menuLinks || [];
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        this.getPropertyPaneGeneralPage(),
        this.getPropertyPaneMenuPage(),
      ],
    };
  }

  private getPropertyPaneGeneralPage(): IPropertyPanePage {
    return {
      header: {
        description: 'Общие настройки',
      },
      groups: [
        {
          groupName: 'Общие настройки меню',
          groupFields: [
            PropertyPaneTextField('logoUrl', {
              label: 'Добавить URL для логотипа',
            }),
            PropertyPaneTextField('portalTitle', {
              label: 'Добавить название портала',
            }),
            PropertyPaneButton('toggleMenuOrientation', {
              text: 'Изменить ориентацию меню',
              onClick: this.toggleMenuOrientation,
            }),
          ],
        },
      ],
    };
  }

  private getPropertyPaneMenuPage(): IPropertyPanePage {
    return {
      header: {
        description: 'Настройки пунктов меню',
      },
      groups: [
        {
          groupName: 'Пункты меню',
          groupFields: [
            ...this.getPropertyPaneMenuItems(),
          ],
        },
      ],
    };
  }

  private getPropertyPaneMenuItems(): IPropertyPaneField<any>[] {
    const menuItemsFields: IPropertyPaneField<any>[] = [];

    (this.properties.menuLinks || []).forEach((menuItem, index) => {
      const menuItemIndex = index;

      menuItemsFields.push(
        PropertyPaneTextField(`menuLinks[${index}].title`, {
          label: `Заголовок пункта меню ${index + 1}`,
        }),
        PropertyPaneTextField(`menuLinks[${index}].url`, {
          label: `URL пункта меню ${index + 1}`,
        }),
        PropertyPaneTextField(`menuLinks[${index}].menuItemIconUrl`, {
          label: `URL иконки пункта меню ${index + 1}`,
        }),
        PropertyPaneButton(`menuLinks[${index}].removeMenuItem`, {
          text: 'Удалить пункт меню',
          onClick: () => this.removeMenuItem(menuItemIndex),
        }),
        PropertyPaneButton(`menuLinks[${index}].addSubMenu`, {
          text: 'Добавить подпункт',
          onClick: () => this.addSubMenu(menuItemIndex),
        }),
        PropertyPaneButton(`menuLinks[${index}].addSubSubMenu`, {
          text: 'Добавить подПодпункт',
          onClick: () => this.addSubSubMenu(menuItemIndex, menuItemIndex),
        })
      );

      if (menuItem.subLinks && menuItem.subLinks.length > 0) {
        menuItem.subLinks.forEach((subMenuItem, subIndex) => {
          const subMenuItemIndex = subIndex;

          menuItemsFields.push(
            PropertyPaneTextField(`menuLinks[${index}].subLinks[${subIndex}].title`, {
              label: `Заголовок подпункта ${subIndex + 1}`,
            }),
            PropertyPaneTextField(`menuLinks[${index}].subLinks[${subIndex}].url`, {
              label: `URL подпункта ${subIndex + 1}`,
            }),
            PropertyPaneTextField(`menuLinks[${index}].subLinks[${subIndex}].subMenuItemIconUrl`, {
              label: `URL иконки подпункта ${subIndex + 1}`,
            }),
            PropertyPaneButton(`menuLinks[${index}].removeSubMenu[${subIndex}]`, {
              text: 'Удалить подпункт',
              onClick: () => this.removeSubMenu(menuItemIndex, subMenuItemIndex),
            })
          )

          if (subMenuItem.subSubLinks && subMenuItem.subSubLinks.length > 0) {
            subMenuItem.subSubLinks.forEach((subSubMenuItem, subSubIndex) => {
              const subSubMenuItemIndex = subSubIndex;

              menuItemsFields.push(
                PropertyPaneTextField(`menuLinks[${index}].subLinks[${subIndex}].subSubLinks[${subSubIndex}].title`, {
                  label: `Заголовок подподпункта ${subSubIndex + 1}`,
                }),
                PropertyPaneTextField(`menuLinks[${index}].subLinks[${subIndex}].subSubLinks[${subSubIndex}].url`, {
                  label: `URL подподпункта ${subSubIndex + 1}`,
                }),
                PropertyPaneTextField(`menuLinks[${index}].subLinks[${subIndex}].subSubLinks[${subSubIndex}].subMenuItemIconUrl`, {
                  label: `URL иконки подподпункта ${subSubIndex + 1}`,
                }),
                PropertyPaneButton(`menuLinks[${index}].removeSubSubMenu[${subSubIndex}]`, {
                  text: 'Удалить подподпункт',
                  onClick: () => this.removeSubSubMenu(menuItemIndex, subMenuItemIndex, subSubMenuItemIndex),
                })
              );
            });
          }
        });
      }
    });

    menuItemsFields.push(
      PropertyPaneButton('addMenuItem', {
        text: 'Добавить пункт меню',
        onClick: this.addMenuItem,
      })
    );

    return menuItemsFields;
  }

  private addMenuItem = (): void => {
    const menuLinks = [...(this.properties.menuLinks || [])];
    menuLinks.push({
      title: '',
      url: '',
      subLinks: [],
      subSubLinks: [],
      menuItemIconUrl: undefined,
      subMenuItemIconUrl: '',
      subSubMenuItemIconUrl: '',
      png: ''
    });
    this.properties.menuLinks = menuLinks;
    this.context.propertyPane.refresh();
  };

  private removeMenuItem = (menuItemIndex: number): void => {
    const menuLinks = [...(this.properties.menuLinks || [])];
    menuLinks.splice(menuItemIndex, 1);
    this.properties.menuLinks = menuLinks;
    this.context.propertyPane.refresh();
    this.clearPropertyPaneFields();
  };

  private addSubMenu = (menuItemIndex: number): void => {
    const menuLinks = [...(this.properties.menuLinks || [])];
    const subLinks = menuLinks[menuItemIndex].subLinks || [];
    subLinks.push({
      title: '',
      url: '',
      subMenuItemIconUrl: '',
      menuItemIconUrl: undefined,
      subSubLinks: [],
      subSubMenuItemIconUrl: '',
      subLinks: [],
      png: ''
    });
    menuLinks[menuItemIndex].subLinks = subLinks;
    this.properties.menuLinks = menuLinks;
    this.context.propertyPane.refresh();
    this.clearPropertyPaneFields();
  };

  private removeSubMenu = (menuItemIndex: number, subMenuIndex: number): void => {
    const menuLinks = [...(this.properties.menuLinks || [])];
    menuLinks[menuItemIndex].subLinks.splice(subMenuIndex, 1);
    this.properties.menuLinks = menuLinks;
    this.context.propertyPane.refresh();
    this.clearPropertyPaneFields();
  };

  private addSubSubMenu = (menuItemIndex: number, subMenuIndex: number): void => {
    const menuLinks = [...(this.properties.menuLinks || [])];
    const subSubLinks = menuLinks[menuItemIndex].subLinks[subMenuIndex].subSubLinks || [];
    subSubLinks.push({
      title: '',
      url: '',
      subMenuItemIconUrl: '',
      subSubLinks: [],
      menuItemIconUrl: undefined,
      subSubMenuItemIconUrl: '',
      subLinks: [],
      png: ''
    });
    menuLinks[menuItemIndex].subLinks[subMenuIndex].subSubLinks = subSubLinks;
    this.properties.menuLinks = menuLinks;
    this.context.propertyPane.refresh();
    this.clearPropertyPaneFields();
  };



  private removeSubSubMenu = (menuItemIndex: number, subMenuIndex: number, subSubMenuIndex: number): void => {
    const menuLinks = [...(this.properties.menuLinks || [])];
    menuLinks[menuItemIndex].subLinks[subMenuIndex].subSubLinks.splice(subSubMenuIndex, 1);
    this.properties.menuLinks = menuLinks;
    this.context.propertyPane.refresh();
    this.clearPropertyPaneFields();
  };

  private toggleMenuOrientation = (): void => {
    this.isVerticalMenu = !this.isVerticalMenu;
    this.render();
  };
}

// import * as React from 'react';
// import * as ReactDom from 'react-dom';
// import {
//   BaseClientSideWebPart,
//   IPropertyPaneConfiguration,
//   PropertyPaneTextField,
//   PropertyPaneButton,
//   PropertyPaneButtonType,
//   IPropertyPanePage,
// } from '@microsoft/sp-webpart-base';

// import * as strings from 'MenuWebPartStrings';
// import Menu from './components/Menu';
// import { IMenuProps, IMenuLink } from './components/IMenuProps';
// import { PropertyFieldCollectionData, CustomCollectionFieldType } from '@pnp/spfx-property-controls/lib/PropertyFieldCollectionData';

// export interface IMenuWebPartProps {
//   logoUrl: string;
//   portalTitle: string;
//   menuLinks: IMenuLink[];
//   menuItemIconUrl?: string;
//   subMenuItemIconUrl?: string;
//   subSubMenuItemIconUrl?: string;
//   showMenuSettings: boolean;
// }

// export default class MenuWebPart extends BaseClientSideWebPart<IMenuWebPartProps> {
//   private isVerticalMenu: boolean = false;
//   propertyFieldNumber: any;

//   protected onPropertyPaneFieldChanged(propertyPath: string, oldValue: any, newValue: any): void {
//     if (propertyPath === 'menuLinks' && newValue) {
//       try {
//         const parsedLinks: IMenuLink[] = JSON.parse(newValue);
//         this.properties.menuLinks = parsedLinks;
//       } catch (error) {
//         // Обработка ошибки парсинга JSON
//       }
//     }
//   }

//   public render(): void {
//     const element: React.ReactElement<IMenuProps> = React.createElement(Menu, {
//       logoUrl: this.properties.logoUrl,
//       portalTitle: this.properties.portalTitle,
//       links: this.getMenuLinks(),
//       index: 0,
//       isVerticalMenu: this.isVerticalMenu,
//       menuItemIconUrl: this.properties.menuItemIconUrl,
//       subMenuItemIconUrl: this.properties.subMenuItemIconUrl,
//       subSubMenuItemIconUrl: this.properties.subSubMenuItemIconUrl,
//     });

//     ReactDom.render(element, this.domElement);
//   }

//   private getMenuLinks(): IMenuLink[] {
//     return this.properties.menuLinks || [];
//   }

//   // executes only before property pane is loaded.
//   protected async loadPropertyPaneResources(): Promise<void> {
//     // import additional controls/components
//     const { PropertyFieldNumber } = await import('@pnp/spfx-property-controls/lib/propertyFields/number');
//     this.propertyFieldNumber = PropertyFieldNumber;
//   }

//   protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
//     return {
//       pages: [
//         this.getPropertyPaneGeneralPage(),
//         this.getPropertyPaneMenuPage(),
//       ],
//     };
//   }

//   private getPropertyPaneGeneralPage(): IPropertyPanePage {
//     return {
//       header: {
//         description: 'Общие настройки',
//       },
//       groups: [
//         {
//           groupName: 'Общие настройки меню',
//           groupFields: [
//             PropertyPaneTextField('logoUrl', {
//               label: 'Добавить URL для логотипа',
//             }),
//             PropertyPaneTextField('portalTitle', {
//               label: 'Добавить название портала',
//             }),
//             PropertyPaneButton('toggleMenuOrientation', {
//               text: 'Изменить ориентацию меню',
//               onClick: this.toggleMenuOrientation,
//             }),
//           ],
//         },
//       ],
//     };
//   }

//   private getPropertyPaneMenuPage(): IPropertyPanePage {
//     return {
//       header: {
//         description: 'Настройки пунктов меню',
//       },
//       groups: [
//         {
//           groupName: 'Пункты меню',
//           groupFields: [
//             this.getPropertyPaneCollectionDataField('menuLinks', {
//               key: 'menuLinks',
//               label: 'Пункты меню',
//               panelHeader: 'Пункты меню',
//               manageBtnLabel: 'Управление пунктами меню',
//               value: this.properties.menuLinks,
//               fields: [
//                 {
//                   id: 'title',
//                   title: 'Заголовок',
//                   type: CustomCollectionFieldType.string,
//                 },
//                 {
//                   id: 'url',
//                   title: 'URL',
//                   type: CustomCollectionFieldType.string,
//                 },
//                 {
//                   id: 'png',
//                   title: 'PNG',
//                   type:CustomCollectionFieldType.string,
//                 },
//                 {
//                   id: 'subMenuLinks',
//                 title: 'Подпункты меню',
//                 type: CustomCollectionFieldType.custom,
//                 panelHeader: 'Подпункты меню',
//                 manageBtnLabel: 'Управление подпунктами меню',
//                 value: this.properties.menuLinks ? this.properties.menuLinks.map((link: IMenuLink) => ({ ...link })) : [],
//                 fields: [
//                   {
//                     id: 'title',
//                     title: 'Заголовок',
//                     type: CustomCollectionFieldType.string,
//                   },
//                   {
//                     id: 'url',
//                     title: 'URL',
//                     type: CustomCollectionFieldType.string,
//                   },
//                   {
//                     id: 'png',
//                     title: 'PNG',
//                     type: CustomCollectionFieldType.string,
//                   },
//                 ],

//                 }
//               ],
//               onPropertyChange: this.onMenuLinksChange.bind(this),
//               disableItemCreation: false,
//               disableItemDeletion: false,
//               disabled: false,
//             }),
//           ],
//         },
//       ],
//     };
//   }

//   private getPropertyPaneCollectionDataField(propertyName: string, properties: any): any {
//     return PropertyFieldCollectionData(propertyName, properties);
//   }

//   private onMenuLinksChange(propertyPath: string, oldValue: any, newValue: any): void {
//     this.properties.menuLinks = newValue;
//   }

//   private toggleMenuOrientation = (): void => {
//     this.isVerticalMenu = !this.isVerticalMenu;
//     this.render();
//   };
// }

