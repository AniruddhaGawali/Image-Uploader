type Folder = {
  _id: string;
  name: string;
  parent: string | null;
  createdAt: string;
};

type Image = {
  _id: string;
  name: string;
  image: string;
  folder: string;
  createdAt: string;
};


type Current  = Image & Folder;