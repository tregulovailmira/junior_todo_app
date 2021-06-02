import { createAsyncThunk } from '@reduxjs/toolkit';
import * as API from '../api/restController';
import { DataForUploadAttachment, MyError } from '../interfaces';

export const uploadUserAttachmentRequest = createAsyncThunk<
  void,
  DataForUploadAttachment,
  { rejectValue: MyError }
>('UPLOAD_ATTACHMENT', async (data: DataForUploadAttachment, thunkAPI) => {
  try {
    await API.uploadAttachmentByUser(data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});
