import { Button } from './ui/button';
import { Input } from './ui/input';
import React from 'react';

type Props = { closeDialog: (title: string) => Promise<void> };

function FolderForm({ closeDialog }: Props) {
  return (
    <div>
      <form
        className="flex flex-col gap-4 p-4 border border-gray-200 rounded-md"
        onSubmit={async (e) => {
          e.preventDefault();
          const form = new FormData(e.target as HTMLFormElement);
          await closeDialog(form.get('foldername') as string);
        }}
      >
        <label>New Folder Name</label>
        <Input
          placeholder="Enter new folder name"
          name="foldername"
        />
        <Button type="submit">Create Folder</Button>
      </form>
    </div>
  );
}

export default FolderForm;
