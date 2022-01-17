export interface NavBundle {

  tag: string,
  links: NavLink[]
}

export interface NavLink {

  tag: string,
  redirectTo: string,
}
