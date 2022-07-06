import React, {useEffect, useState} from 'react'
import {useAppSelector} from "../../hooks/redux";

export function AirportFilter() {
  const {types, countries, regions} = useAppSelector(state => state.handbookReducer)

  return (
    <div className="border mb-2 p-2">
      <span className="mr-2">Filter</span>
      <select className="px-2 py-1 border mr-2" defaultValue="default">
        <option disabled value="default" className="text-gray-500">Type</option>
        {types.map(type => <option key={type} value={type}>{type}</option>)}
      </select>

      <select className="px-2 py-1 border mr-2">
        <option disabled className="text-gray-500">Country</option>
        {countries.map(country => <option value={country} key={country}>{country}</option>)}
      </select>

      <select className="px-2 py-1 border mr-2">
        <option disabled className="text-gray-500">Region</option>
        {regions.map(region => <option value={region} key={region}>{region}</option>)}
      </select>
    </div>
  )
}