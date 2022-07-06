import React, {useEffect, useState} from 'react'
import {Comment} from "../components/Comment";
import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {fetchAirport, fetchComments} from "../store/ActionCreators";
import {CommentForm} from "../components/CommentForm";

export function AirportPage() {
  const params = useParams<'id'>()
  const dispatch = useAppDispatch()
  const [canCreate, setCanCreate] = useState(true)
  const {loading, airport} = useAppSelector(state => state.airportDetailReducer)
  const {isAuthenticated} = useAppSelector(state => state.authReducer)
  const {loading: commentLoading, comments} = useAppSelector(state => state.commentReducer)

  useEffect(() => {
    dispatch(fetchAirport(params.id!))
    dispatch(fetchComments(params.id!))
  }, [dispatch, params.id])

  if (loading) return <p>Loading...</p>

  return (
    <div className="container mx-auto mt-8 p-4 flex justify-center">
      <div>
        <h1 className="font-bold size text-3xl">{airport?.name}</h1>
        <p>country: {airport?.country}</p>
        <p>continent: {airport?.continent}</p>
        <p>coordinates: {airport?.coordinates}</p>
        <p>elevation_ft: {airport?.elevation_ft}</p>
        <p>gps_code: {airport?.gps_code}</p>
        <p>iata_code: {airport?.iata_code}</p>
        <p>ident: {airport?.ident}</p>
        <p>local_code: {airport?.local_code}</p>
        <p>municipality: {airport?.municipality}</p>
        <p>region: {airport?.region}</p>
        <p>type: {airport?.type}</p>

        <hr className="my-4"/>

        {isAuthenticated && canCreate && <CommentForm
          airportId={params.id!}
          onCreate={() => setCanCreate(false)}
        />}

        {
          commentLoading
            ? <p>Comments Loading...</p>
            : comments.length
              ? comments.map(comment => <Comment key={comment.id} comment={comment}/>)
              : <p>No comments!</p>
        }

      </div>
    </div>
  )
}