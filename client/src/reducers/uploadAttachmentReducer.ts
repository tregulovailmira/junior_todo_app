import { createSlice } from '@reduxjs/toolkit';
import { uploadUserAttachmentRequest } from '../payloadCreators/attachmentPayload';

interface State {
  isFetching: boolean;
  error: any;
  todoId: number | null;
}

const initialState: State = {
  isFetching: false,
  error: null,
  todoId: null,
};

const uploadAttachments = createSlice({
  name: 'attachments',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(uploadUserAttachmentRequest.fulfilled, state => {
        state.isFetching = false;
        state.error = null;
        state.todoId = null;
      })
      .addCase(uploadUserAttachmentRequest.rejected, (state, action) => {
        state.isFetching = false;
        state.error = action.payload;
        state.todoId = action.meta.arg.todoId;
      })
      .addCase(uploadUserAttachmentRequest.pending, (state, action) => {
        state.isFetching = true;
        state.error = null;
        state.todoId = action.meta.arg.todoId;
      });
  },
});

export default uploadAttachments;
