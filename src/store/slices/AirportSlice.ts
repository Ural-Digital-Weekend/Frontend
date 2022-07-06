import {IAirport} from "../../models/models";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface AirportState {
  airports: IAirport[]
  loading: boolean
  error: string
}

const initialState: AirportState = {
  airports: [],
  loading: false,
  error: ''
}

export const airportSlice = createSlice({
  name: 'airport',
  initialState,
  reducers: {
    airportFetching(state) {
      state.loading = true
    },
    airportFetchingSuccess(state, action: PayloadAction<IAirport[]>) {
      state.loading = false
      state.error = ''
      state.airports = action.payload
    },
    airportFetchingError(state, action: PayloadAction<Error>) {
      state.loading = false
      state.error = action.payload.message
    }
  }
})

export default airportSlice.reducer