import {IComment} from "../../models/models";
import {createSlice, PayloadAction} from "@reduxjs/toolkit"

interface CommentState {
  comments: IComment[]
  loading: boolean
  error: string
}

const initialState: CommentState = {
  comments: [],
  loading: false,
  error: ''
}

export const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    commentFetching(state) {
      state.loading = true
    },
    commentFetchingSuccess(state, action: PayloadAction<IComment[]>) {
      state.loading = false
      state.error = ''
      state.comments = action.payload
    },
    commentFetchingError(state, action: PayloadAction<Error>) {
      state.loading = false
      state.error = action.payload.message
    },
    addComment(state, action: PayloadAction<IComment>) {
      state.comments.push(action.payload)
    }
  }
})

export default commentSlice.reducer