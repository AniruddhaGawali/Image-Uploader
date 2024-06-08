'use client';
import React, { useState } from 'react';
import { Input } from './ui/input';
import Image from 'next/image';
import { CloudUpload, Folder, FolderSearch } from 'lucide-react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import UploadImage from './uploadImage';
import { Button } from './ui/button';
import FolderForm from './folderForm';

type Props = {
  setSearch: (search: string) => void;
  upload: (file: File) => Promise<boolean>;
  createFolder: (name: string) => Promise<boolean>;
};

function DriveNavbar({ setSearch, upload, createFolder }: Props) {
  const [image, setImage] = useState<File | null>(null);
  const [imageModelOpen, setImageModelOpen] = useState<boolean>(false);
  const [folderModelOpen, setFolderModelOpen] = useState<boolean>(false);

  return (
    <div className="w-full h-16 bg-white flex items-center justify-between px-4 shadow-sm border rounded-sm mt-5">
      <div className="flex items-center gap-4">
        <FolderSearch />
        <Input
          placeholder="Search"
          className="w-64"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="flex items-center gap-4">
        <Dialog
          onOpenChange={(isOpen) => {
            if (!isOpen) {
              setImageModelOpen(false);
              setImage(null);
            } else {
              setImageModelOpen(true);
            }
          }}
          open={imageModelOpen}
        >
          <DialogTrigger>
            <div className="space-x-3 flex items-center cursor-pointer px-5 py-2 bg-secondary rounded-md font-semibold text-sm">
              <CloudUpload />
              <span>Upload</span>
            </div>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Upload Image</DialogTitle>
              <DialogDescription>
                {image ? (
                  <div className="h-[calc(100vh/2)] flex items-center justify-center">
                    <Image
                      src={URL.createObjectURL(image)}
                      width={100}
                      height={100}
                      className="rounded-md "
                      alt="image"
                    />
                  </div>
                ) : (
                  <UploadImage setImage={setImage} />
                )}
                <Button
                  className="mt-4 w-full"
                  onClick={async () => {
                    if (image) {
                      const res = await upload(image);
                      console.log(res);
                      if (res) {
                        setImageModelOpen(false);
                        setImage(null);
                      }
                    }
                  }}
                >
                  Upload
                </Button>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>

        <Dialog
          onOpenChange={(isOpen) => {
            if (!isOpen) {
              setFolderModelOpen(false);
            } else {
              setFolderModelOpen(true);
            }
          }}
          open={folderModelOpen}
        >
          <DialogTrigger>
            <div className="space-x-3 flex items-center cursor-pointer px-5 py-2 bg-primary rounded-sm text-primary-foreground font-semibold text-sm">
              <Folder />
              <span>New Folder</span>
            </div>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Folder</DialogTitle>
              <DialogDescription>
                <FolderForm
                  closeDialog={async (title: string) => {
                    const res = await createFolder(title);
                    if (res) {
                      setFolderModelOpen(false);
                    }
                  }}
                />
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

export default DriveNavbar;
