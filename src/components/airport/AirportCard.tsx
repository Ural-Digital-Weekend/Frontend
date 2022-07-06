import React from 'react'
import {IAirport} from "../../models/models"
import {useNavigate} from 'react-router-dom'

interface AirportCardProps {
  airport: IAirport
}

export function AirportCard({ airport }: AirportCardProps) {
  const navigate = useNavigate()

  const openAirport = () => {
    navigate('/airport/' + airport.id)
  }

  return (
    <div onClick={openAirport} className="border py-4 px-6 mb-2 cursor-pointer hover:shadow-lg hover:transition-all rounded-md">
      <h4>Name: {airport.name}</h4>
      <strong>Country: {airport.country}</strong>
      <p>Ident: {airport.ident}</p>
      <p>Type: {airport.type}</p>
      <p>Local Code: {airport.local_code}</p>
      <p>Region: {airport.region}</p>
    </div>
  )
}