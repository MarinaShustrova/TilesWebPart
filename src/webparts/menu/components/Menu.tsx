// import * as React from 'react';
// import styles from './Menu.module.scss';
// import { IMenuLink } from './IMenuProps';

// export interface IMenuProps {
//   logoUrl: string;
//   portalTitle: string;
//   links: IMenuLink[];
//   index: number;
//   isVerticalMenu: boolean;
//   menuItemIconUrl: string;
//   subMenuItemIconUrl: string;
// }

// export interface IMenuState {
//   menuLinks: IMenuLink[];
//   isDropdownOpen: boolean;
//   activeDropdownIndex: number | null;
//   isSubMenuOpen: true;
// }

// export default class Menu extends React.Component<IMenuProps, IMenuState> {
//   constructor(props: IMenuProps) {
//     super(props);

//     this.state = {
//       menuLinks: this.props.links,
//       isDropdownOpen: false,
//       activeDropdownIndex: null,
//       isSubMenuOpen: true,
//     };
//   }

//   handleDropdownToggle = (event: React.MouseEvent<HTMLAnchorElement>, index: number): void => {
//     event.preventDefault();
//     this.setState((prevState) => ({
//       isDropdownOpen: !prevState.isDropdownOpen,
//       activeDropdownIndex: index,
//       isSubMenuOpen: !prevState.isSubMenuOpen,
//     }));
//     event.currentTarget.parentElement.classList.toggle('expanded');
//   };

//   renderMenuLink = (menuLink: IMenuLink, index: number) => {
//     const { isDropdownOpen, activeDropdownIndex, isSubMenuOpen } = this.state;
//     const { isVerticalMenu, menuItemIconUrl, subMenuItemIconUrl } = this.props;

//     const menuItemClass = isVerticalMenu ? styles.menuItemVertical : styles.menuItem;
//     const menuLinkClass = isVerticalMenu ? styles.menuLinkVertical : styles.menuLink;
//     const subMenuItemClass = isVerticalMenu ? styles.subMenuItemVertical : styles.subMenuItem;
//     const subMenuClass = isVerticalMenu ? styles.subMenuVertical : styles.subMenu;

//     if (menuLink.subLinks && menuLink.subLinks.length > 0) {
//       return (
//         <li className={menuItemClass} key={menuLink.title}>
//           <a href="#" className={menuLinkClass} onClick={(event) => this.handleDropdownToggle(event, index)}>
//             {menuItemIconUrl && <img src={menuItemIconUrl} alt="Icon" className={styles.menuItemIconUrl} />}
//             {menuLink.title}
//             <span className={`${styles.subMenuToggle} ${isDropdownOpen && activeDropdownIndex === index ? 'expanded' : ''}`} />
//           </a>
//           {isSubMenuOpen && activeDropdownIndex === index && (
//             <ul className={subMenuClass}>
//               {menuLink.subLinks.map((subLink) => (
//                 <li className={subMenuItemClass} key={subLink.title}>
//                   <a href={subLink.url} className={styles.subMenuLink}>
//                     {subMenuItemIconUrl && <img src={subMenuItemIconUrl} alt="Icon" className={styles.subMenuItemIconUrl} />}
//                     {subLink.title}
//                   </a>
//                 </li>
//               ))}
//             </ul>
//           )}
//         </li>
//       );
//     } else {
//       return (
//         <li className={menuItemClass} key={menuLink.title}>
//           <a href={menuLink.url} className={menuLinkClass}>
//             {menuItemIconUrl && <img src={menuItemIconUrl} alt="Icon" className={styles.menuItemIconUrl} />}
//             {menuLink.title}
//           </a>
//         </li>
//       );
//     }
//   };


//   render() {
//     const { isVerticalMenu } = this.props;
//     const menuClass = isVerticalMenu ? styles.menuVertical : styles.menu;
//     const menuItemsClass = isVerticalMenu ? styles.menuItemsVertical : styles.menuItemsHorizontal;

//     return (
//       <div className={menuClass}>
//         <div className={styles.logo}>
//           <img src={this.props.logoUrl} alt="Logo" />
//         </div>
//         <div>
//           <span className={styles.header}>{this.props.portalTitle}</span>
//         </div>
//         <ul className={menuItemsClass}>
//         <div className={styles.menuItemIconUrl}>
//           <img src={this.props.menuItemIconUrl} alt="Logo" />
//         </div>
//           {this.state.menuLinks.map((menuLink, index) => this.renderMenuLink(menuLink, index))}
//         </ul>
//       </div>
//     );
//   }
// }



// import * as React from 'react';
// import styles from './Menu.module.scss';
// import { IMenuLink } from './IMenuProps';

// export interface IMenuProps {
//   logoUrl: string;
//   portalTitle: string;
//   links: IMenuLink[];
//   index: number;
//   isVerticalMenu: boolean;
//   menuItemIconUrl: string;
//   subMenuItemIconUrl: string;
//   subSubMenuItemIconUrl: string;
// }

// export interface IMenuState {
//   menuLinks: IMenuLink[];
//   isDropdownOpen: boolean;
//   activeDropdownIndex: number | null;
//   isSubMenuOpen: true;
// }

// export default class Menu extends React.Component<IMenuProps, IMenuState> {
//   constructor(props: IMenuProps) {
//     super(props);

//     this.state = {
//       menuLinks: this.props.links,
//       isDropdownOpen: false,
//       activeDropdownIndex: null,
//       isSubMenuOpen: true,
//     };
//   }

//   handleDropdownToggle = (event: React.MouseEvent<HTMLAnchorElement>, index: number): void => {
//     event.preventDefault();
//     this.setState((prevState) => ({
//       isDropdownOpen: !prevState.isDropdownOpen,
//       activeDropdownIndex: index,
//       isSubMenuOpen: !prevState.isSubMenuOpen,
//     }));
//     event.currentTarget.parentElement.classList.toggle('expanded');
//   };

//   renderMenuLink = (menuLink: IMenuLink, index: number) => {
//     const { isDropdownOpen, activeDropdownIndex, isSubMenuOpen } = this.state;
//     const { isVerticalMenu } = this.props;

//     const menuItemClass = isVerticalMenu ? styles.menuItemVertical : styles.menuItem;
//     const menuLinkClass = isVerticalMenu ? styles.menuLinkVertical : styles.menuLink;
//     const subMenuItemClass = isVerticalMenu ? styles.subMenuItemVertical : styles.subMenuItem;
//     const subMenuClass = isVerticalMenu ? styles.subMenuVertical : styles.subMenu;

//     if (menuLink.subLinks && menuLink.subLinks.length > 0) {
//       return (
//         <li className={menuItemClass} key={menuLink.title}>
//           <a href="#" className={menuLinkClass} onClick={(event) => this.handleDropdownToggle(event, index)}>
//             {menuLink.menuItemIconUrl && typeof menuLink.menuItemIconUrl === 'string' && (
//               <img src={menuLink.menuItemIconUrl} alt="Icon" className={styles.menuItemIconUrl} />
//             )}
//             {menuLink.title}
//             <span className={`${styles.subMenuToggle} ${isDropdownOpen && activeDropdownIndex === index ? 'expanded' : ''}`} />
//           </a>
//           {isSubMenuOpen && activeDropdownIndex === index && (
//             <ul className={subMenuClass}>
//               {menuLink.subLinks.map((subLink) => (
//                 <li className={subMenuItemClass} key={subLink.title}>
//                   <a href={subLink.url} className={styles.subMenuLink}>
//                     {subLink.subMenuItemIconUrl && typeof subLink.subMenuItemIconUrl === 'string' && (
//                       <img src={subLink.subMenuItemIconUrl} alt="Icon" className={styles.subMenuItemIconUrl} />
//                     )}
//                     {subLink.title}
//                   </a>
//                 </li>
//               ))}
//             </ul>
//           )}
//         </li>
//       );
//     } else {
//       return (
//         <li className={menuItemClass} key={menuLink.title}>
//           <a href={menuLink.url} className={menuLinkClass}>
//             {menuLink.menuItemIconUrl && typeof menuLink.menuItemIconUrl === 'string' && (
//               <img src={menuLink.menuItemIconUrl} alt="Icon" className={styles.menuItemIconUrl} />
//             )}
//             {menuLink.title}
//           </a>
//         </li>
//       );
//     }
//   };

//   render() {
//     const { isVerticalMenu } = this.props;
//     const menuClass = isVerticalMenu ? styles.menuVertical : styles.menu;
//     const menuItemsClass = isVerticalMenu ? styles.menuItemsVertical : styles.menuItemsHorizontal;

//     return (
//       <div className={menuClass}>
//         <div className={styles.logo}>
//           <img src={this.props.logoUrl} alt="Logo" />
//         </div>
//         <div>
//           <span className={styles.header}>{this.props.portalTitle}</span>
//         </div>
//         <ul className={menuItemsClass}>
//           {this.state.menuLinks.map((menuLink, index) => this.renderMenuLink(menuLink, index))}
//         </ul>
//       </div>
//     );
//   }
// }



// import * as React from 'react';
// import styles from './Menu.module.scss';
// import { IMenuLink } from './IMenuProps';

// export interface IMenuProps {
//   logoUrl: string;
//   portalTitle: string;
//   links: IMenuLink[];
//   index: number;
//   isVerticalMenu: boolean;
//   menuItemIconUrl: string;
//   subMenuItemIconUrl: string;
//   subSubMenuItemIconUrl: string;
// }

// export interface IMenuState {
//   menuLinks: IMenuLink[];
//   isDropdownOpen: boolean;
//   activeDropdownIndex: number | null;
//   isSubMenuOpen: boolean;
//   isSubSubMenuOpen: boolean;
// }

// export default class Menu extends React.Component<IMenuProps, IMenuState> {
//   constructor(props: IMenuProps) {
//     super(props);

//     this.state = {
//       menuLinks: this.props.links,
//       isDropdownOpen: false,
//       activeDropdownIndex: null,
//       isSubMenuOpen: true,
//       isSubSubMenuOpen: true,
//     };
//   }

//   handleDropdownToggle = (event: React.MouseEvent<HTMLAnchorElement>, index: number): void => {
//     event.preventDefault();
//     this.setState((prevState) => ({
//       isDropdownOpen: !prevState.isDropdownOpen,
//       activeDropdownIndex: index,
//       isSubMenuOpen: !prevState.isSubMenuOpen,
//       isSubSubMenuOpen: !prevState.isSubSubMenuOpen,
//     }));
//     event.currentTarget.parentElement.classList.toggle('expanded');
//   };

//   renderSubMenuLink = (subLink: IMenuLink) => {
//     const { subSubMenuItemIconUrl } = this.props;
//     const subSubMenuClass = styles.subMenu;
//     const subSubMenuLinkClass = styles.subMenuLink;

//     if (subLink.subSubLinks && subLink.subSubLinks.length > 0) {
//       return (
//         <ul className={subSubMenuClass}>
//           {subLink.subSubLinks.map((subSubLink) => (
//             <li key={subSubLink.title}>
//               <a href={subSubLink.url} className={subSubMenuLinkClass}>
//                 {subSubLink.subSubMenuItemIconUrl && typeof subSubLink.subSubMenuItemIconUrl === 'string' && (
//                   <img src={subSubLink.subSubMenuItemIconUrl} alt="Icon" className={styles.subSubMenuItemIconUrl} />
//                 )}
//                 {subSubLink.title}
//               </a>
//             </li>
//           ))}
//         </ul>
//       );
//     }
//   };

//   renderMenuLink = (menuLink: IMenuLink, index: number) => {
//     const { isDropdownOpen, activeDropdownIndex, isSubMenuOpen, isSubSubMenuOpen } = this.state;
//     const { isVerticalMenu } = this.props;

//     const menuItemClass = isVerticalMenu ? styles.menuItemVertical : styles.menuItem;
//     const menuLinkClass = isVerticalMenu ? styles.menuLinkVertical : styles.menuLink;
//     const subMenuItemClass = isVerticalMenu ? styles.subMenuItemVertical : styles.subMenuItem;
//     const subMenuClass = isVerticalMenu ? styles.subMenuVertical : styles.subMenu;

//     if (menuLink.subLinks && menuLink.subLinks.length > 0) {
//       return (
//         <li className={menuItemClass} key={menuLink.title}>
//           <a href="#" className={menuLinkClass} onClick={(event) => this.handleDropdownToggle(event, index)}>
//             {menuLink.menuItemIconUrl && typeof menuLink.menuItemIconUrl === 'string' && (
//               <img src={menuLink.menuItemIconUrl} alt="Icon" className={styles.menuItemIconUrl} />
//             )}
//             {menuLink.title}
//             <span className={`${styles.subMenuToggle} ${isDropdownOpen && activeDropdownIndex === index ? 'expanded' : ''}`} />
//           </a>
//           {isSubMenuOpen && activeDropdownIndex === index && (
//             <ul className={subMenuClass}>
//               {menuLink.subLinks.map((subLink) => (
//                 <li className={subMenuItemClass} key={subLink.title}>
//                   <a href={subLink.url} className={styles.subMenuLink}>
//                     {subLink.subMenuItemIconUrl && typeof subLink.subMenuItemIconUrl === 'string' && (
//                       <img src={subLink.subMenuItemIconUrl} alt="Icon" className={styles.subMenuItemIconUrl} />
//                     )}
//                     {subLink.title}
//                   </a>
//                   {isSubSubMenuOpen && this.renderSubMenuLink(subLink)}
//                 </li>
//               ))}
//             </ul>
//           )}
//         </li>
//       );
//     } else {
//       return (
//         <li className={menuItemClass} key={menuLink.title}>
//           <a href={menuLink.url} className={menuLinkClass}>
//             {menuLink.menuItemIconUrl && typeof menuLink.menuItemIconUrl === 'string' && (
//               <img src={menuLink.menuItemIconUrl} alt="Icon" className={styles.menuItemIconUrl} />
//             )}
//             {menuLink.title}
//           </a>
//         </li>
//       );
//     }
//   };

//   render() {
//     const { isVerticalMenu } = this.props;
//     const menuClass = isVerticalMenu ? styles.menuVertical : styles.menu;
//     const menuItemsClass = isVerticalMenu ? styles.menuItemsVertical : styles.menuItemsHorizontal;

//     return (
//       <div className={menuClass}>
//         <div className={styles.logo}>
//           <img src={this.props.logoUrl} alt="Logo" />
//         </div>
//         <div>
//           <span className={styles.header}>{this.props.portalTitle}</span>
//         </div>
//         <ul className={menuItemsClass}>
//           {this.state.menuLinks.map((menuLink, index) => this.renderMenuLink(menuLink, index))}
//         </ul>
//       </div>
//     );
//   }
// }



// import * as React from 'react';
// import styles from './Menu.module.scss';
// import { IMenuLink } from './IMenuProps';

//  export interface IMenuProps {
//   logoUrl: string;
//   portalTitle: string;
//   links: IMenuLink[];
//   index: number;
//   isVerticalMenu: boolean;
//   menuItemIconUrl: string;
//   subMenuItemIconUrl: string;
//   subSubMenuItemIconUrl: string;
// }

//  export interface IMenuState {
//   menuLinks: IMenuLink[];
//   isDropdownOpen: boolean;
//   activeDropdownIndex: number | null;
//   isSubMenuOpen: boolean;
//   isSubSubMenuOpen: boolean;
// }

//  export default class Menu extends React.Component<IMenuProps, IMenuState> {
//   constructor(props: IMenuProps) {
//     super(props);

//     this.state = {
//       menuLinks: this.props.links,
//       isDropdownOpen: false,
//       activeDropdownIndex: null,
//       isSubMenuOpen: true,
//       isSubSubMenuOpen: true,
//     };
//   }

//   handleDropdownToggle = (event: React.MouseEvent<HTMLAnchorElement>, index: number): void => {
//     event.preventDefault();
//     this.setState((prevState) => ({
//       isDropdownOpen: !prevState.isDropdownOpen,
//       activeDropdownIndex: index,
//       isSubMenuOpen: !prevState.isSubMenuOpen,
//       isSubSubMenuOpen: !prevState.isSubSubMenuOpen,
//     }));
//     event.currentTarget.parentElement.classList.toggle('expanded');
//   };

//   handleSubMenuToggle = (): void => {
//     this.setState((prevState) => ({
//       isSubSubMenuOpen: !prevState.isSubSubMenuOpen,
//     }));
//   };

//   renderSubMenuLink = (subLink: IMenuLink) => {
//     const { subSubMenuItemIconUrl } = this.props;
//     const subSubMenuClass = styles.subMenu;
//     const subSubMenuLinkClass = styles.subMenuLink;

//     if (subLink.subSubLinks && subLink.subSubLinks.length > 0) {
//       return (
//         <ul className={subSubMenuClass}>
//           {subLink.subSubLinks.map((subSubLink) => (
//             <li key={subSubLink.title}>
//               <a href={subSubLink.url} className={subSubMenuLinkClass}>
//                 {subSubLink.subSubMenuItemIconUrl && typeof subSubLink.subSubMenuItemIconUrl === 'string' && (
//                   <img src={subSubLink.subSubMenuItemIconUrl} alt="Icon" className={styles.subSubMenuItemIconUrl} />
//                 )}
//                 {subSubLink.title}
//               </a>
//             </li>
//           ))}
//         </ul>
//       );
//     }
//     return null;
//   };

//   renderMenuLink = (menuLink: IMenuLink, index: number) => {
//     const { isDropdownOpen, activeDropdownIndex, isSubMenuOpen, isSubSubMenuOpen } = this.state;
//     const { isVerticalMenu } = this.props;

//     const menuItemClass = isVerticalMenu ? styles.menuItemVertical : styles.menuItem;
//     const menuLinkClass = isVerticalMenu ? styles.menuLinkVertical : styles.menuLink;
//     const subMenuItemClass = isVerticalMenu ? styles.subMenuItemVertical : styles.subMenuItem;
//     const subMenuClass = isVerticalMenu ? styles.subMenuVertical : styles.subMenu;

//     if (menuLink.subLinks && menuLink.subLinks.length > 0) {
//       return (
//         <li className={menuItemClass} key={menuLink.title}>
//           <a href="#" className={menuLinkClass} onClick={(event) => this.handleDropdownToggle(event, index)}>
//             {menuLink.menuItemIconUrl && typeof menuLink.menuItemIconUrl === 'string' && (
//               <img src={menuLink.menuItemIconUrl} alt="Icon" className={styles.menuItemIconUrl} />
//             )}
//             {menuLink.title}
//             <span className={`${styles.subMenuToggle} ${isDropdownOpen && activeDropdownIndex === index ? 'expanded' : ''}`} />
//           </a>
//           {isSubMenuOpen && activeDropdownIndex === index && (
//             <ul className={subMenuClass}>
//               {menuLink.subLinks.map((subLink) => (
//                 <li className={subMenuItemClass} key={subLink.title}>
//                   <a href={subLink.url} className={styles.subMenuLink} onClick={this.handleSubMenuToggle}>
//                     {subLink.subMenuItemIconUrl && typeof subLink.subMenuItemIconUrl === 'string' && (
//                       <img src={subLink.subMenuItemIconUrl} alt="Icon" className={styles.subMenuItemIconUrl} />
//                     )}
//                     {subLink.title}
//                   </a>
//                   {isSubSubMenuOpen && this.renderSubMenuLink(subLink)}
//                 </li>
//               ))}
//             </ul>
//           )}
//         </li>
//       );
//     }

//     return (
//       <li className={menuItemClass} key={menuLink.title}>
//         <a href={menuLink.url} className={menuLinkClass}>
//           {menuLink.menuItemIconUrl && typeof menuLink.menuItemIconUrl === 'string' && (
//             <img src={menuLink.menuItemIconUrl} alt="Icon" className={styles.menuItemIconUrl} />
//           )}
//           {menuLink.title}
//         </a>
//       </li>
//     );
//   };

//   render() {
//     const { isVerticalMenu } = this.props;
//     const menuClass = isVerticalMenu ? styles.menuVertical : styles.menu;
//     const menuItemsClass = isVerticalMenu ? styles.menuItemsVertical : styles.menuItemsHorizontal;

//     return (
//       <div className={menuClass}>
//         <div className={styles.logo}>
//           <img src={this.props.logoUrl} alt="Logo" />
//         </div>
//         <div>
//           <span className={styles.header}>{this.props.portalTitle}</span>
//         </div>
//         <ul className={menuItemsClass}>
//           {this.state.menuLinks.map((menuLink, index) => this.renderMenuLink(menuLink, index))}
//         </ul>
//       </div>
//     );
//   }
// }

import  { Component, MouseEvent } from 'react';
import * as React from 'react';
import styles from './Menu.module.scss';
import { IMenuLink } from './IMenuProps';

 export interface IMenuProps {
  logoUrl: string;
  portalTitle: string;
  links: IMenuLink[];
  index: number;
  isVerticalMenu: boolean;
  menuItemIconUrl: string;
  subMenuItemIconUrl: string;
  subSubMenuItemIconUrl: string;

}

 export interface IMenuState {
  menuLinks: IMenuLink[];
  isDropdownOpen: boolean;
  activeDropdownIndex: number | null;
  isSubMenuOpen: boolean;
  isSubSubMenuOpen: boolean;
}

export default class Menu extends Component<IMenuProps, IMenuState> {
  constructor(props: IMenuProps) {
    super(props);

    this.state = {
      menuLinks: this.props.links,
      isDropdownOpen: false,
      activeDropdownIndex: null,
      isSubMenuOpen: false,
      isSubSubMenuOpen: false,
    };
  }

  handleDropdownToggle = (event: MouseEvent<HTMLAnchorElement>, index: number): void => {
    event.preventDefault();
    this.setState((prevState) => ({
      isDropdownOpen: !prevState.isDropdownOpen,
      activeDropdownIndex: index,
      isSubMenuOpen: prevState.isDropdownOpen && prevState.activeDropdownIndex === index,
    isSubSubMenuOpen: prevState.isDropdownOpen && prevState.activeDropdownIndex === index && !prevState.isSubSubMenuOpen,

    }));
    event.currentTarget.parentElement!.classList.toggle('expanded');
  };

  renderSubMenuLink = (subLink: IMenuLink, index: number) => {
    const { isDropdownOpen, activeDropdownIndex } = this.state;

      const subSubMenuClass = styles.subMenu;
    const subSubMenuLinkClass = styles.subMenuLink;

    if (subLink.subSubLinks && subLink.subSubLinks.length > 0) {
      return (
        <ul className={`${subSubMenuClass} ${styles.subSubMenu}`}>
          {subLink.subSubLinks.map((subSubLink) => (
            <li key={subSubLink.title}>
              <a href='#' className={subSubMenuLinkClass} onClick={(event) => this.handleDropdownToggle(event, index)}>
                {subSubLink.subSubMenuItemIconUrl && typeof subSubLink.subSubMenuItemIconUrl === 'string' && (
                  <img src={subSubLink.subSubMenuItemIconUrl} alt="Icon" className={styles.subSubMenuItemIconUrl} />
                )}
                {subSubLink.title}
                <span className={`${styles.subMenuToggle} ${isDropdownOpen && activeDropdownIndex === index ? 'expanded' : ''}`} />
              </a>
            </li>
          ))}
        </ul>
      );
    }
    return null;
  };

  renderMenuLink = (menuLink: IMenuLink, index: number) => {
    const { isDropdownOpen, activeDropdownIndex, isSubMenuOpen, isSubSubMenuOpen } = this.state;
    const { isVerticalMenu } = this.props;

    const menuItemClass = isVerticalMenu ? styles.menuItemVertical : styles.menuItem;
    const menuLinkClass = isVerticalMenu ? styles.menuLinkVertical : styles.menuLink;
    const subMenuItemClass = isVerticalMenu ? styles.subMenuItemVertical : styles.subMenuItem;
    const subMenuClass = isVerticalMenu ? styles.subMenuVertical : styles.subMenu;

    if (menuLink.subLinks && menuLink.subLinks.length > 0) {
      return (
        <li className={menuItemClass} key={menuLink.title}>
          <a href="#" className={menuLinkClass} onClick={(event) => this.handleDropdownToggle(event, index)}>
            {menuLink.menuItemIconUrl && typeof menuLink.menuItemIconUrl === 'string' && (
              <img src={menuLink.menuItemIconUrl} alt="Icon" className={styles.menuItemIconUrl} />
            )}
            {menuLink.title}
            <span className={`${styles.subMenuToggle} ${isDropdownOpen && activeDropdownIndex === index ? 'expanded' : ''}`} />
          </a>
          {isSubMenuOpen && activeDropdownIndex === index && (
            <ul className={subMenuClass}>
              {menuLink.subLinks.map((subLink) => (
                <li className={subMenuItemClass} key={subLink.title}>
                  <a href={subLink.url} className={styles.subMenuLink}>
                    {subLink.subMenuItemIconUrl && typeof subLink.subMenuItemIconUrl === 'string' && (
                      <img src={subLink.subMenuItemIconUrl} alt="Icon" className={styles.subMenuItemIconUrl} />
                    )}
                    {subLink.title}
                  </a>
                  {isSubSubMenuOpen && this.renderSubMenuLink(subLink, index)}
                </li>
              ))}
            </ul>
          )}
        </li>
      );
    } else {
      return (
        <li className={menuItemClass} key={menuLink.title}>
          <a href={menuLink.url} className={menuLinkClass}>
            {menuLink.menuItemIconUrl && typeof menuLink.menuItemIconUrl === 'string' && (
              <img src={menuLink.menuItemIconUrl} alt="Icon" className={styles.menuItemIconUrl} />
            )}
            {menuLink.title}
          </a>
        </li>
      );
    }
  };

  render() {
    const { isVerticalMenu } = this.props;
    const menuClass = isVerticalMenu ? styles.menuVertical : styles.menu;
    const menuItemsClass = isVerticalMenu ? styles.menuItemsVertical : styles.menuItemsHorizontal;


    return (
      <div className={menuClass}>
        <div className={styles.logo}>
          <img src={this.props.logoUrl} alt="Logo" />
        </div>
        <div>
          <span className={styles.header}>{this.props.portalTitle}</span>
        </div>
        <ul className={menuItemsClass}>
          {this.state.menuLinks.map((menuLink, index) => this.renderMenuLink(menuLink, index))}
        </ul>
      </div>
    );
  }
}



