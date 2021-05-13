import {Injectable} from '@angular/core';

export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  exactMatch?: boolean;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  function?: any;
  badge?: {
    title?: string;
    type?: string;
  };
  children?: Navigation[];
}

export interface Navigation extends NavigationItem {
  children?: NavigationItem[];
}

const NavigationItems = [
  {
    id: 'navigation',
    title: 'Navegação',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'dashboard',
        title: 'Dashboard',
        type: 'item',
        url: '/dashboard/default',
        icon: 'feather icon-home',
        classes: 'nav-item',
      }
    ]
  },

  {
    id: 'listUser',
    title: 'Cadastro',
    type: 'group',
    icon: 'icon-group',
    children: [
      {
        id: 'list-user',
        title: 'Usuários',
        type: 'item',
        url: '/list-user',
        classes: 'nav-item',
        icon: 'feather icon-users'
      },
      {
        id: 'list-client',
        title: 'Parceiros',
        type: 'item',
        url: '/list-partner',
        classes: 'nav-item',
        icon: 'feather icon-check'
      },
      {
        id: 'list-branch',
        title: 'Ramo',
        type: 'item',
        url: '/list-branch',
        classes: 'nav-item',
        icon: 'feather icon-grid'
      }
    ]
  },

  {
    id: 'listProduct',
    title: 'Perfil parceiro',
    type: 'group',
    icon: 'icon-group',
    children: [
      {
        id: 'list-product',
        title: 'Meus produtos',
        type: 'item',
        url: '/list-product',
        class:'nav-item',
        icon: 'icon-package'
      },
      {
        id: 'myservices',
        title: 'Meus serviços',
        type: 'item',
        url: '/myservices',
        class:'nav-item',
        icon: 'icon-settings'
      }
    ]
  },
  {
    id: 'shopping',
    title: 'Financeiro',
    type: 'group',
    icon: 'icon-group',
    children: [
      {
        id: 'buy',
        title: 'Compras',
        type: 'item',
        url: '/buy',
        class:'nav-item',
        icon: 'icon-shopping-cart'
      }

    ]
  },
  {
    id: 'admin',
    title: 'ADMIN',
    type: 'group',
    icon: 'icon-group',
    children: [
      {
        id: 'company',
        title: 'Minha Empresa',
        type: 'item',
        url: '/company',
        class:'nav-item',
        icon: 'icon-home'
      },
      {
        id: 'configuration',
        title: 'Configuração',
        type: 'item',
        url: '/configuration',
        class:'nav-item',
        icon: 'icon-align-justify'
      }
    ]
  }
];

@Injectable()
export class NavigationItem {
  get() {
    return NavigationItems;
  }
}
