
import { Injectable } from "@angular/core";

export const darkTheme = {
  'background-color': '#082646',
  'text-color': '#ffffff',
  'sidebar-Bg-Color':'#15314f',
  'table-Bg-Color':'#15314f',
  'table-thead-tr-Bg-Color':'#2d4661',
  'table-tbody-tr-odd':'#15314f',
  'table-tbody-tr-even':'#2d4661',
  'table-th-color':'#ffffff',
  'table-heading-span':'#407ed2',
  'chart-Bg-Color':'#15314f',
  'breadcrumb-a':'252, 253, 254',
  'breadcrumb-a-o-s':'0.7',
  'select-Bg-Color-white':'#1F3D5D',
  'select-Bg-Color':'#1F3D5D',
  'chart-lable-c':'#ffffff',
  'profile-span':'#ffffff',
  'profile-span-o-s':'0.9',
  'lightblue':'#407ed2',
  'btn-color':'#407ed2',
  'bordercolor':'#204762',
  'chartHover':'#32394e',
  'sideMenuHover':'#32394e',
  'chartBorder':'#222736',
  'table-thead':'#1d4977',
  'checkbox-border' : '#407ed2',
  'sidebar-hover-bg' : '#1F3D5D',
  'code-bg' : '#0d2136',
  'bg-dark-gray' : '#383838',
  'loder-text':'#000',
  'notificationRead':'#ab9a9a',
  'notificationNonRead':'#383838'
};

export const darkThemeLatest = {
  'background-color': '#222736',
  'text-color': '#ffffff',
  'sidebar-Bg-Color':'#2a3042',
  'table-Bg-Color':'#2a3042',
  'table-thead-tr-Bg-Color':'hsl(225deg 26% 43% / 26%)',
  'table-tbody-tr-odd':'#15314f',
  'table-tbody-tr-even':'rgba(191,200,226,.05)',
  'table-th-color':'#ffffff',
  'table-heading-span':'#407ed2',
  'chart-Bg-Color':'#2a3042',
  'breadcrumb-a':'252, 253, 254',
  'breadcrumb-a-o-s':'0.7',
  'select-Bg-Color-white':'#1F3D5D',
  'select-Bg-Color':'#2e3446',
  'chart-lable-c':'#ffffff',
  'profile-span':'#ffffff',
  'profile-span-o-s':'0.9',
  'lightblue':'#556ee6',
  'btn-color':'#556ee6',
  'bordercolor':'#32394e',
  'chartHover':'#32394e',
  'sideMenuHover':'#32394e',
  'chartBorder':'#222736',
  'table-thead':'hsl(225deg 26% 43% / 26%)',
  'checkbox-border' : '#407ed2',
  'sidebar-hover-bg' : '#21283d',
  'code-bg' : '#171a25',
  'bg-dark-gray' : '#383838',
  'loder-text':'#000',
  'notificationRead':'#ab9a9a',
  'notificationNonRead':'#383838',
  'headerfooter': '#262b3c',
  'bs-blue': '#556ee6'
};

export const whiteTheme = {
  'background-color': '#e7f0f8',
  // 'text-color': '#122942',
  // 'text-color': '#59627F',
  'text-color': '#14354B',
  'sidebar-Bg-Color':'#15314f',
  'table-Bg-Color':'#ffffff',
  'table-thead-tr-Bg-Color':'#eef1f3',
  'table-tbody-tr-odd':'#ffffff',
  'table-tbody-tr-even':'#EEF1F3',
  'table-th-color':'#ffffff',
  'table-heading-span':'#ffffff',
  'chart-Bg-Color':'#ffffff',
  'breadcrumb-a':'0, 0, 0',
  'breadcrumb-a-o-s':'0.7',
  'select-Bg-Color-white':'#ffffff',
  'select-Bg-Color':'transparent ',
  'chart-lable-c':'#000000',
  'profile-span':'#000000',
  'profile-span-o-s':'0.9',
  'bordercolor':'#cad8e4',
  'lightblue':'#407ed2',
  'chartHover':'#ffffff',
  'sideMenuHover':'#32394e',
  'chartBorder':'#cad8e4',
  'btn-color':'transparent',
  'table-thead':'#0000001A',
  'checkbox-border' : '#838c95',
  'sidebar-hover-bg' : '#1F3D5D',
  'code-bg' : '#ebeaea',
  'bg-dark-gray' : '#e7f0f8',
  'loder-text':'#fff',
  'notificationRead':'#ab9a9a',
  'notificationNonRead':'#f5f5f5',
  'headerfooter': ' #e7f0f8'
};

@Injectable({
  providedIn: 'root'
})
export class ThemService {

  constructor( ) {}

  //Dark theme event
  toggleDark() {
    this.setTheme(darkThemeLatest);
  }

  //light theme event
  toggleLight() {
    this.setTheme(whiteTheme);
  }

  //assign root css variable
  private setTheme(theme: {}) {
    Object.keys(theme).forEach(k =>
      document.documentElement.style.setProperty(`--${k}`, theme[k])
      // document.body.style.setProperty(`--${k}`, theme[k]) changes to  root variable html to body tag
    );
  }
}
