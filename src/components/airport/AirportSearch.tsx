import React, {ChangeEvent, useEffect, useState} from 'react'
import {useDebounce} from "../../hooks/debounce";
import axios from "../../axios";
import {IAirport, ServerResponse} from "../../models/models";
import classes from './AirportSearch.module.css'
import {useNavigate} from "react-router-dom";

export function AirportSearch() {
  const [value, setValue] = useState('')
  const [results, setResults] = useState<IAirport[]>([])
  const navigate = useNavigate()
  const [dropdown, setDropdown] = useState(false)

  const debounced = useDebounce<string>(value, 500)

  async function searchAirports(search: string) {
    const res = await axios.get<ServerResponse<IAirport>>(`airports`, {
      params: {
        count: 10,
        page: 1,
        search
      }
    })
    setResults(res.data.results)
  }

  useEffect(() => {
    if (debounced.length >= 3) {
      searchAirports(debounced).then(() => setDropdown(true))
    } else {
      setDropdown(false)
    }
  }, [debounced])

  function changeHandler(event: ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value)
  }

  function renderDropdown() {
    if (results.length === 0) {
      return <p className="text-center">No results!</p>
    }

    return results.map(airport => (
      <li
        key={airport.id}
        onClick={() => navigate(`/airport/${airport.id}`)}
        className="cursor-pointer hover:bg-gray-500 hover:text-white py-2 px-4"
      >{airport.name}</li>
    ))
  }

  return (
    <div className="mb-4 relative">
      <input
        className="border px-4 py-2 w-full outline-0 h-[42px]"
        type="text"
        onChange={changeHandler}
        value={value}
        placeholder="Search for airport..."
      />

      { dropdown && <ul className={classes.dropdown}>
        { renderDropdown() }
      </ul> }
    </div>
  )
}