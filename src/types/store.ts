export interface UserState {
  id: number
  name: string
  sex: string
  age: number
  tel: string
  address: string
  tags: string[]
  roles?: string[]
}

export interface PathItem {
  path: string,
  component: HTMLElement
  redirect: string
  meta: MetaItem,
  roles?: string[]
  children?: PathItem[]
}

export interface MetaItem {
  title: string
  icon?: string
  hidden?: boolean
  roles?: string[]
}

