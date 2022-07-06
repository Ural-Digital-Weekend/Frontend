import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IAirportCountry, IAirportRegion, IAirportType} from "../../models/models";

interface HandbookState {
  loading: boolean
  types: IAirportType[]
  regions: IAirportRegion[]
  countries: IAirportCountry[]
  error: string
}

const initialState: HandbookState = {
  loading: true,
  types: [],
  regions: [],
  countries: [],
  error: ''
}

type PayloadData = [IAirportType[], IAirportRegion[], IAirportCountry[]]

export const handbookSlice = createSlice({
  name: 'handbook',
  initialState,
  reducers: {
    handbookFetching(state) {
      state.loading = true
    },
    handbookFetchingSuccess(state, action: PayloadAction<PayloadData>) {
      state.loading = false
      state.types = action.payload[0]
      state.regions = action.payload[1]
      state.countries = action.payload[2]
    },
    handbookFetchingError(state, action: PayloadAction<Error>) {
      state.loading = false
      state.error = action.payload.message
    }
  }
})

export default handbookSlice.reducer