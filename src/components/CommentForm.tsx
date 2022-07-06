import React, {FormEvent, useState} from 'react'
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {createComment} from "../store/ActionCreators"

interface CommentFormProps {
  airportId: string
  onCreate(): void
}

export function CommentForm({airportId, onCreate}: CommentFormProps) {
  const [value, setValue] = useState('')
  const dispatch = useAppDispatch()
  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    dispatch(createComment(airportId, value))
    onCreate()
  }

  return (
    <form onSubmit={submitHandler} className="mb-4">
      <textarea
        className="border py-2 px-4 w-full outline-0 resize-none"
        placeholder="Type your comment here"
        onChange={e => setValue(e.target.value)}
      />
      <button
        type="submit"
        className="border py-2 px-4 hover:bg-gray-500 hover:text-white hover:transition-all"
      >Create</button>
    </form>
  )
}