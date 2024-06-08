import { UploadCloud } from 'lucide-react';
import React from 'react';
import Dropzone from 'react-dropzone';

type Props = {
  setImage: (file: File) => void;
};

function UploadImage({ setImage }: Props) {
  return (
    <Dropzone
      accept={{
        'image/jpeg': ['.jpg', '.jpeg'],
        'image/png': ['.png'],
      }}
      maxFiles={1}
      multiple={false}
      onDrop={(acceptedFiles) => {
        if (acceptedFiles.length != 0) {
          setImage(acceptedFiles[0]);
        }
      }}
    >
      {({ getRootProps, getInputProps }) => (
        <label
          {...getRootProps()}
          className="relative flex flex-col items-center justify-center p-6 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 w-full visually-hidden-focusable h-[calc(100vh/2)] mt-10"
          htmlFor="dropzone-file"
        >
          <UploadCloud
            size={48}
            className="text-gray-400 dark:text-gray-500"
          />
          <p className="mt-2 text-sm text-gray-400 dark:text-gray-500">
            Drag and drop your image here or click to browse
          </p>
          <p className="mt-2 text-sm text-gray-400 dark:text-gray-500">
            (PNG, JPG, JPEG)
          </p>
          <p className="mt-2 text-xs text-gray-400 dark:text-gray-500">
            Please upload small size image
          </p>
          <input
            type="file"
            accept="image/png, image/jpeg, image/jpg"
            className="hidden"
            id="dropzone-file"
            {...getInputProps()}
          />
        </label>
      )}
    </Dropzone>
  );
}

export default UploadImage;
