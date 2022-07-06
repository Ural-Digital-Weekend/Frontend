import React from 'react'
import {IComment} from "../models/models";

interface CommentProps {
  comment: IComment
}

export function Comment({comment}: CommentProps) {
  return (
    <div>
      I am comment
    </div>
  )
}