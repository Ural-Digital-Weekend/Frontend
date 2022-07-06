import React, {useEffect, useRef} from 'react';
import {AirportSearch} from "../components/airport/AirportSearch";
import {AirportFilter} from "../components/airport/AirportFilter";
import {AirportCard} from "../components/airport/AirportCard";
import {fetchAirports} from "../store/ActionCreators";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import ReactPaginate from 'react-paginate'

const ITEMS_PER_PAGE = 50

export function MainPage() {
  const {airports, count, loading, error} = useAppSelector(state => state.airportReducer)
  const page = useRef(1)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchAirports(page.current, ITEMS_PER_PAGE))
  }, [dispatch])

  const pageCount = Math.ceil(count / ITEMS_PER_PAGE)

  const pageChangeHandler = ({selected}: {selected: number}) => {
    page.current = selected + 1
    dispatch(fetchAirports(page.current, ITEMS_PER_PAGE))
  }

  return (
    <div className="container mx-auto p-4 flex justify-center">
      <div>
        <AirportSearch />
        <AirportFilter />

        {error && <p className="text-red-600">{error}</p>}

        <div className="min-w-[760px]">
          { loading && <p className="text-center">Loading...</p> }

          {
            count > 0
              ? airports.map(airport => (
                <AirportCard airport={airport} key={airport.id}/>
              ))
              : <p className="text-center">No items</p>
          }

          { pageCount && <ReactPaginate
            breakLabel="..."
            nextLabel=">"
            onPageChange={pageChangeHandler}
            pageRangeDisplayed={3}
            pageCount={pageCount}
            forcePage={page.current - 1}
            previousLabel="<"
            containerClassName="flex"
            pageClassName="border py-1 px-3 mr-2"
            activeClassName="bg-gray-500 text-white"
            previousClassName="border py-1 px-3 mr-2"
            nextClassName="border py-1 px-3"
          /> }
        </div>
      </div>
    </div>
  )
}