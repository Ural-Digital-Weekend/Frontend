import React from 'react'
import {IComment} from "../models/models";

interface CommentProps {
  comment: IComment
}

export function Comment({comment}: CommentProps) {
  return (
    <div className="py-2 px-4 border rounded mb-4">
      <div className="font-thin text-xs">{comment.created}</div>
      <p className="text-base">{comment.comment}</p>
    </div>
  )
}