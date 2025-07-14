interface IBooks {
  id: number;
  judul: string;
  tahun: string;
  rak: string;
}

interface IAdd{
    judul : string,
    tahun : string,
    rak : string
}

export type { IBooks, IAdd }