'use client';
import DriveNavbar from '@/components/driveNavbar';
import React, { useEffect, useState } from 'react';
import {
  createFolder,
  deleteFolder,
  getAllFolderData,
  getFolders,
} from '@/api/folder';
import { deleteImage, uploadImage } from '@/api/image';
import { Download, Folder, Trash2 } from 'lucide-react';
import moment from 'moment';
import Link from 'next/link';
import { useParams } from 'next/navigation';

type Props = {};

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import Image from 'next/image';
import getBase64, { downloadBase64Image } from '@/lib/tobase64';
import { Button } from '@/components/ui/button';

function Drive({}: Props) {
  const params = useParams();
  const id = params.id.toString();

  const [currentData, setCurrentData] = useState<Current[]>([]);
  const [search, setSearch] = useState<string>('');
  const [aboutFolder, setAboutFolder] = useState<Folder | null>(null);

  const searchData = currentData.filter((data) =>
    data.name.toLowerCase().includes(search.toLowerCase())
  );

  const fetchData = async () => {
    const data = await getAllFolderData(id);
    const res = await getFolders(id);
    setAboutFolder(res);
    setCurrentData(data);
  };

  const uploadImg = async (file: File) => {
    const data = await getBase64(file);
    if (data) {
      const res = await uploadImage(file.name, data, id);
      if (res) {
        console.log(res);
        await fetchData();
        return true;
      }
    }
    return false;
  };

  const createDir = async (name: string) => {
    const res = await createFolder(name, id);
    if (res) {
      await fetchData();
      return true;
    }
    return false;
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main className="flex w-full flex-col items-center  min-h-screen">
      <div className="flex flex-col items-center justify-center gap-10 h-full mt-24">
        <h1 className="text-6xl font-bold text-center">{aboutFolder?.name}</h1>
      </div>

      <div className="w-full container mt-10">
        <DriveNavbar
          setSearch={setSearch}
          upload={uploadImg}
          createFolder={createDir}
        />

        <div className="flex flex-wrap gap-4 justify-start items-center mt-10">
          {searchData.map((data) => {
            return (
              <>
                <TooltipProvider key={data._id}>
                  <Tooltip>
                    <TooltipTrigger>
                      <div className="flex flex-col items-center justify-center gap-2 p-4 bg-gray-100 rounded-md w-32 h-32">
                        {!data.image ? (
                          <Link href={`/drive/${data._id}`}>
                            <Folder
                              key={data._id}
                              className="w-12 h-12"
                              size={48}
                              color="#000"
                            />
                          </Link>
                        ) : (
                          <Image
                            src={data.image}
                            alt={data.name}
                            width={48}
                            height={48}
                            className="rounded-md"
                          />
                        )}
                        <div className="truncate text-ellipsis w-full">
                          {data.name}
                        </div>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <div>
                        <span className="font-bold ">Name:</span> {data.name}
                      </div>
                      <div>
                        <span className="font-bold">Created at:</span>{' '}
                        {moment(data.createdAt).format('MMMM Do YYYY, h:mm:ss')}
                      </div>
                      <div className="flex items-center w-fit mt-5 p-2 gap-3">
                        <Button
                          className="p-2"
                          variant="destructive"
                          onClick={async () => {
                            if (data.image) {
                              const res = await deleteImage(data._id);
                              if (res) {
                                await fetchData();
                              }
                            } else {
                              const res = await deleteFolder(data._id);
                              if (res) {
                                await fetchData();
                              }
                            }
                          }}
                        >
                          <Trash2 />
                        </Button>
                        {data.image && (
                          <Button
                            className="p-2"
                            variant="secondary"
                            onClick={() => {
                              downloadBase64Image(data.image, data.name);
                            }}
                          >
                            <Download />
                          </Button>
                        )}
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </>
            );
          })}
        </div>
      </div>
    </main>
  );
}

export default Drive;
