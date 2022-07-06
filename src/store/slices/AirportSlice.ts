import {IAirport, IFilter} from "../../models/models";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface AirportState {
  airports: IAirport[]
  airportsContainer: IAirport[]
  count: number
  loading: boolean
  error: string
}

const initialState: AirportState = {
  airports: [],
  airportsContainer: [],
  count: 0,
  loading: false,
  error: ''
}

interface AirportPayload {
  airports: IAirport[]
  count: number
}

export const airportSlice = createSlice({
  name: 'airport',
  initialState,
  reducers: {
    airportFetching(state) {
      state.loading = true
    },
    airportFetchingSuccess(state, action: PayloadAction<AirportPayload>) {
      state.error = ''
      state.airports = action.payload.airports
      state.airportsContainer = action.payload.airports
      state.count = action.payload.count
      state.loading = false
    },
    airportFetchingError(state, action: PayloadAction<Error>) {
      state.loading = false
      state.error = action.payload.message
    },
    airportFilter(state, action: PayloadAction<IFilter>) {
      state.airports = state.airportsContainer
        .filter(air => air.type.includes(action.payload.type))
        .filter(air => air.country.includes(action.payload.country))
        .filter(air => air.region.includes(action.payload.region))
    }
  }
})

export default airportSlice.reducer