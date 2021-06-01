import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Box } from '@material-ui/core';
import { useAppDispatch } from '../../app/hooks';
import { styled } from '@material-ui/styles';

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

function AttachmentUploader(props: any) {
  const dispatch = useAppDispatch();

  const onDrop = useCallback(acceptedFiles => {
    const { todoId, uploadAttachment } = props;
    acceptedFiles.map((file: any) => dispatch(uploadAttachment({ file, todoId })));
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Box
      component="div"
      {...getRootProps({
        onClick: event => event.stopPropagation(),
      })}
      style={{ position: 'relative' }}
    >
      <input {...getInputProps()} />
      {isDragActive && <CustomBox component="p">Drop the files here ...</CustomBox>}
      {props.children}
    </Box>
  );
}

export default AttachmentUploader;
