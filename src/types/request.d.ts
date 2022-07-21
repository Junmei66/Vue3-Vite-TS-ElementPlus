export interface postData {
  id?: number;
  time: string;
  author: string;
  title: string;
  description: string;
}

export interface loginParams {
  id?: number;
  name: string;
  password?: string;
}

export interface UpdateParams {
  id?: number;
  time?: string;
  author?: string;
  name: string;
  content: string;
  type: string;
}