export interface Params {
  page: number;
  page_size: number;
  [k: string]: string | number | boolean | null;
}

export interface Response<T = any> {
  status: string;
  headers: Headers;
  [k: string]: string | number | object | T;
}

interface Headers {
  authorization?: string
}

export interface skillItem {
  id: number;
  title: string;
  value: number;
}

export interface PostItem {
  id: number;
  time: string;
  position: string;
  company: string;
}




