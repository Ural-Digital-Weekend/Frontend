import {AppDispatch} from "./index"
import axios from "../axios"
import {
  IAirport,
  IAirportCountry, IAirportDetail,
  IAirportRegion,
  IAirportType,
  IAuth,
  IAuthResponse, IComment,
  ServerResponse
} from "../models/models"
import {airportSlice} from "./slices/AirportSlice"
import {handbookSlice} from "./slices/HandbookSlice"
import {authSlice} from "./slices/AuthSlice"
import {airportDetailSlice} from "./slices/AirportDetailSlice";
import {commentSlice} from "./slices/CommentSlice";

export const fetchAirports = (page = 1, count = 20) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(airportSlice.actions.airportFetching())
      const response = await axios.get<ServerResponse<IAirport>>(`airports?count=${count}&page=${page}`)
      dispatch(airportSlice.actions.airportFetchingSuccess(response.data.results))
    } catch (e) {
      dispatch(airportSlice.actions.airportFetchingError(e as Error))
    }
  }
}

export const fetchAirport = (id: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(airportDetailSlice.actions.airportFetching())
      const response = await axios.get<IAirportDetail>(`airports/${id}`)
      dispatch(airportDetailSlice.actions.airportFetchingSuccess(response.data))
    } catch (e) {
      dispatch(airportDetailSlice.actions.airportFetchingError(e as Error))
    }
  }
}

export const fetchComments = (airportId: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(commentSlice.actions.commentFetching())
      const response = await axios.get<ServerResponse<IComment>>(`airports/${airportId}/comments`)
      dispatch(commentSlice.actions.commentFetchingSuccess(response.data.results))
    } catch (e) {
      dispatch(commentSlice.actions.commentFetchingError(e as Error))
    }
  }
}

export const fetchHandbooks = () => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(handbookSlice.actions.handbookFetching())
      const response = await Promise.all([
        axios.get<IAirportType[]>('handbooks/airport-types'),
        axios.get<IAirportRegion[]>('handbooks/regions'),
        axios.get<IAirportCountry[]>('handbooks/countries'),
      ])
      dispatch(handbookSlice.actions.handbookFetchingSuccess([
        response[0].data,
        response[1].data,
        response[2].data
      ]))
    } catch (e) {
      dispatch(handbookSlice.actions.handbookFetchingError(e as Error))
    }
  }
}

export const register = (data: IAuth) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await axios.post<IAuthResponse>(`auth/register`, data)
      dispatch(authSlice.actions.loginSuccess({
        access: response.data.access,
        username: data.username
      }))
    } catch (e) {
      console.log('Error register', e)
    }
  }
}

export const login = (data: IAuth) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await axios.post<IAuthResponse>(`auth/login`, data)
      dispatch(authSlice.actions.loginSuccess({
        access: response.data.access,
        username: data.username
      }))
    } catch (e) {
      console.log('Error Login', e)
    }
  }
}