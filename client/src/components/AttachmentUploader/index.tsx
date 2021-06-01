import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useAppDispatch } from '../../app/hooks';

function AttachmentUploader(props: any) {
  const dispatch = useAppDispatch();

  const onDrop = useCallback(acceptedFiles => {
    const { todoId, uploadAttachment } = props;
    acceptedFiles.map((file: any) => dispatch(uploadAttachment({ file, todoId })));
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps({
        onClick: event => event.stopPropagation(),
      })}
    >
      <input {...getInputProps()} />
      {isDragActive && <p>Drop the files here ...</p>}
      {props.children}
    </div>
  );
}

export default AttachmentUploader;
