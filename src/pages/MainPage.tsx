import React, {useEffect} from 'react';
import {AirportSearch} from "../components/airport/AirportSearch";
import {AirportFilter} from "../components/airport/AirportFilter";
import {AirportCard} from "../components/airport/AirportCard";
import {fetchAirports} from "../store/ActionCreators";
import {useAppDispatch, useAppSelector} from "../hooks/redux";

export function MainPage() {
  const {airports, loading: airportLoading, error} = useAppSelector(state => state.airportReducer)
  const {loading: handbookLoading} = useAppSelector(state => state.handbookReducer)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchAirports())
  }, [dispatch])


  const isLoading = () => {
    return airportLoading || handbookLoading
  }

  if (isLoading()) return <p className="font-bold text-2xl">Loading...</p>

  return (
    <div className="container mx-auto p-4 flex justify-center">
      <div>
        <AirportSearch />
        <AirportFilter />

        {error && <p className="text-red-600">{error}</p>}

        <div>
          {airports.map(airport => (
            <AirportCard airport={airport} key={airport.id}/>
          ))}
        </div>
      </div>
    </div>
  )
}