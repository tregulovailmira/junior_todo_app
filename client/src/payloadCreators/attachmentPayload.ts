import { createAsyncThunk } from '@reduxjs/toolkit';
import * as API from '../api/restController';

export const uploadUserAttachmentRequest = createAsyncThunk(
  'UPLOAD_ATTACHMENT',
  async (data: any, { rejectWithValue }) => {
    try {
      const { data: newAttachment } = await API.uploadAttachmentByUser(data);
      return newAttachment;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);
