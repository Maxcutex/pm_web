export enum REQUEST_STATUSES {
    IDLE,
    LOADING,
    SUCCESS,
    ERROR,
  }
  export interface ICredentials {
    title: string,
    id: number,
    token: string,
  }

  export interface IBigStat {
    product: any, total: any, color: any, registrations: any, bounce: any
  }
  export interface IWidget {
    children: any,
    title: any,
    noBodyPadding: any,
    bodyClass: any,
    disableWidgetMenu: any,
    header: any,
    noHeaderPadding: any,
    headerClass: any,
    style: any,
    noWidgetShadow: any,
  }
  export type UserRole ={
    id: number, 
    name: string, 
  }
  export type Timestamps ={
    id: number, 
    name: string, 
  }
  export type UserProfileType = {
    id: number, 
    name: string, 
    date_of_birth: string,
    email: string,
    first_name: string,
    gender: string,
    image_url: string,
    is_active: boolean,
    is_deleted: boolean,
    last_name: string,
    last_password: string,
    location_id: number,
    profile_summary: string,
    timestamps: Timestamps,
    user_roles: UserRole[]
  }
