import { LoaderCircle } from 'lucide-react';
import React from 'react';

type Props = {};

function Loading({}: Props) {
  return (
    <div className="flex flex-col items-center justify-center gap-10 h-full w-full mt-24">
      <LoaderCircle
        size={64}
        className="animate-spin"
      />
    </div>
  );
}

export default Loading;
