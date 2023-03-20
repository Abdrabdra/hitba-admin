export interface IManagementResponse {
  id: number;
  value?: string;
  title?: string;
}

export interface ICreateManagementBody {
  genderId?: number;
  value: string;
}

export interface IGetCityResponse {
  id: number;
  value: string;
}

export interface ICreateArea {
  value: string;
}

export interface ICreateCity {
  value: string;
  areaId: number;
}
