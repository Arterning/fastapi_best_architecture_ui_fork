import axios from 'axios';
import qs from 'query-string';

export interface SysDocReq {
  name: string;
  title?: string;
  desc?: string;
  content?: string;
  type?: string;
  file?: string;
  doc_data?: Record<string, any>[];
}

export interface SysDocRes extends SysDocReq {
  id: number;
}

export interface SysDocParams {
  name?: string;
  title?: string;
  content?: string;
  type?: string;
  page?: number;
  size?: number;
}

export interface SysDocListRes {
  items: SysDocRes[];
  total: number;
}

export interface SysDocDeleteParams {
  pk: number[];
}

export function querySysDocList(params: SysDocParams): Promise<SysDocListRes> {
  return axios.get('/api/v1/sys/docs', {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}

export function querySysDocAll(): Promise<SysDocRes[]> {
  return axios.get('/api/v1/sys/docs/all');
}

export function querySysDocDetail(pk: number): Promise<SysDocRes> {
  return axios.get(`/api/v1/sys/docs/${pk}`);
}

export function createSysDoc(data: SysDocReq) {
  return axios.post('/api/v1/sys/docs', data);
}

export function updateSysDoc(pk: number, data: SysDocReq) {
  return axios.put(`/api/v1/sys/docs/${pk}`, data);
}

export function deleteSysDoc(params: SysDocDeleteParams) {
  return axios.delete(`/api/v1/sys/docs`, {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}
