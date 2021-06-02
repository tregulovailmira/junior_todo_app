import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Box } from '@material-ui/core';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { styled } from '@material-ui/styles';
import Loader from 'react-loader-spinner';
import { AsyncThunk } from '@reduxjs/toolkit';
import { DataForUploadAttachment, MyError } from '../../interfaces';

const CustomBox = styled(Box)({
  display: 'grid',
  justifyContent: 'center',
  alignContent: 'center',
  position: 'absolute',
  zIndex: 1000,
  bottom: '-15px',
  width: '100%',
  height: '100%',
  backgroundColor: 'white',
  opacity: '0.9',
});

interface Props {
  todoId: number;
  uploadAttachment: AsyncThunk<void, DataForUploadAttachment, { rejectValue: MyError }>;
}

interface AttachmentProps extends React.PropsWithChildren<Props> {}

function AttachmentUploader(props: AttachmentProps) {
  const { isFetching, error, todoId } = useAppSelector(state => state.uploadAttachments);
  const dispatch = useAppDispatch();

  const onDrop = useCallback(acceptedFiles => {
    const { todoId, uploadAttachment } = props;
    acceptedFiles.map((file: any) => dispatch(uploadAttachment({ file, todoId })));
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const onClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  return (
    <Box
      component="div"
      {...getRootProps({
        onClick: onClick,
      })}
      style={{ position: 'relative' }}
    >
      <input {...getInputProps()} />
      {isDragActive && <CustomBox component="p">Drop the files here ...</CustomBox>}
      {isFetching && props.todoId === todoId && (
        <CustomBox>
          <Loader type="ThreeDots" color="#3f51b5" width={50} />
        </CustomBox>
      )}
      {error && props.todoId === todoId && (
        <CustomBox style={{ color: 'red' }}>{error.message}</CustomBox>
      )}
      {props.children}
    </Box>
  );
}

export default AttachmentUploader;
