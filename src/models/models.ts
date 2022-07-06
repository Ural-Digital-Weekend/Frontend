export interface IAirport {
  id: number
  name: string
  ident: string
  local_code: any
  region: string
  type: string
  country: string
}

export interface IAirportDetail {
  continent: number
  coordinates: string
  country: string
  elevation_ft: any
  gps_code: string
  iata_code: string
  ident: string
  local_code: string
  municipality: string
  name: string
  region: string
  type: string
}

export interface ServerResponse<T> {
  count: number
  next: number | null
  previous: number | null
  results: T[]
}

export interface IComment {
  id: number
  comment: string
  created: string
  user: {
    username: string
  }
}

export interface IAuth {
  password: string
  username: string
}

export interface IAuthResponse {
  access: string
  refresh: string
}

export interface IFilter {
  type: IAirportType
  country: IAirportCountry
  region: IAirportRegion
}

export type IAirportType = string
export type IAirportCountry = string
export type IAirportRegion = string