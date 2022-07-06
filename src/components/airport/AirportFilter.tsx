import React, {ChangeEvent, useEffect, useState, MouseEvent} from 'react'
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {IFilter} from "../../models/models"
import {airportSlice} from "../../store/slices/AirportSlice";

export function AirportFilter() {
  const {types, countries, regions, loading} = useAppSelector(state => state.handbookReducer)
  const dispatch = useAppDispatch()
  const [filter, setFilter] = useState<IFilter>({
    type: '',
    region: '',
    country: ''
  })

  const hasFilter = () => {
    return filter.type || filter.region || filter.country
  }

  useEffect(() => {
    dispatch(airportSlice.actions.airportFilter(filter))
  }, [filter])

  const changeHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    setFilter(prev => ({...prev, [event.target.name]: event.target.value}))
  }

  const clearHandler = (event: MouseEvent<HTMLButtonElement>) => {
    setFilter({
      type: '',
      region: '',
      country: ''
    })
  }

  if (loading) return <p className="text-center">Loading...</p>

  return (
    <div className="border mb-2 p-2">
      <span className="mr-2">Filter</span>
      <select className="px-2 py-1 border mr-2" onChange={changeHandler} value={filter.type} name="type">
        <option disabled className="text-gray-500" value="">Type</option>
        {types.map(type => <option key={type} value={type}>{type}</option>)}
      </select>

      <select className="px-2 py-1 border mr-2" onChange={changeHandler} value={filter.country} name="country">
        <option disabled className="text-gray-500" value="">Country</option>
        {countries.map(c => <option key={c} value={c}>{c}</option>)}
      </select>

      <select className="px-2 py-1 border mr-2" onChange={changeHandler} value={filter.region} name="region">
        <option disabled className="text-gray-500" value="">Region</option>
        {regions.map(r => <option key={r} value={r}>{r}</option>)}
      </select>

      {hasFilter() && <button className="py-1 px-4 border bg-red-800 text-white rounded" onClick={clearHandler}>&times;</button>}
    </div>
  )
}