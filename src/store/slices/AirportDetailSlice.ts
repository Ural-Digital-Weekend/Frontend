import {IAirportDetail} from "../../models/models";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface AirportDetailState {
  airport: IAirportDetail | null
  loading: boolean
  error: string
}

const initialState: AirportDetailState = {
  airport: null,
  loading: false,
  error: ''
}

export const airportDetailSlice = createSlice({
  name: 'airportDetail',
  initialState,
  reducers: {
    airportFetching(state) {
      state.loading = true
    },
    airportFetchingSuccess(state, action: PayloadAction<IAirportDetail>) {
      state.loading = false
      state.error = ''
      state.airport = action.payload
    },
    airportFetchingError(state, action: PayloadAction<Error>) {
      state.loading = false
      state.error = action.payload.message
    }
  }
})

export default airportDetailSlice.reducer