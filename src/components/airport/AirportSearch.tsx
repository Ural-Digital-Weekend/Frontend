import React, {ChangeEvent, useEffect, useState} from 'react'
import debounce from 'lodash.debounce'

export function AirportSearch() {
  const [value, setValue] = useState('')

  // useEffect(() => {
  //   console.log('change')
  //
  //   // debounce
  //   // send request to fetch items
  //
  //   // axios.get()
  // }, [value])

  function changeHandler(event: ChangeEvent<HTMLInputElement>) {
    const changeValue = () => setValue(event.target.value)

    debounce(changeValue, 200)
  }

  return (
    <div className="mb-4 relative">
      <input
        className="border px-4 py-2 w-full outline-0 h-[42px]"
        type="text"
        onChange={changeHandler}
        value={value}
        placeholder="Search for airport ..."
      />

      {/*<div className="absolute top-[142px] right-0 left-0 h-[200px] bg-amber-800">*/}

      {/*</div>*/}
    </div>
  )
}