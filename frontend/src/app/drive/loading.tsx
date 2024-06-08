import DriveNavbar from '@/components/driveNavbar';
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

type Props = {};

function Drive({}: Props) {
  return (
    <div className="flex w-full flex-col items-center min-h-screen">
      <div className="flex flex-col items-center justify-center gap-10 h-full w-full mt-24">
        <Skeleton className="container flex flex-col items-center justify-center gap-10 h-20 w-2/3 mt-24" />
      </div>

      <div className="w-full container mt-10">
        <Skeleton className="flex flex-col items-center justify-center gap-10 h-16 w-full mt-24" />

        <div className="flex flex-wrap gap-4 justify-start items-center mt-10">
          <Skeleton className="w-32 h-32" />
          <Skeleton className="w-32 h-32" />
          <Skeleton className="w-32 h-32" />
          <Skeleton className="w-32 h-32" />
          <Skeleton className="w-32 h-32" />
        </div>
      </div>
    </div>
  );
}

export default Drive;
