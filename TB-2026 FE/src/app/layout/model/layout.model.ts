export interface MenuItem {
  isOpen: boolean;
  label: string;
  icon: any;
  link: any;
  activeCheck: any;
  show: boolean;
  children?: MenuItem[];
}
