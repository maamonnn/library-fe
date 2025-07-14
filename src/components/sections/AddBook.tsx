import { Button } from "@/components/ui/button"
import { useState } from "react"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { IAdd } from "@/lib/types/books"
import axios from "axios"
import { toast } from "sonner"

type AddBookProps = {
  refetchBooks: () => void;
};

export function AddBook({ refetchBooks }: AddBookProps) {
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState<IAdd>({ judul: '', tahun: '', rak: '' });
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };
    const handlSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
        console.log("Fungsi handleSubmit dijalankan!");
        event.preventDefault();
        try{
            const dataString = JSON.stringify(formData);
            const response = await axios.post('http://localhost:18080/buku', dataString, {headers: {'Content-Type' : 'text/plain'}})
            console.log(response.data)
            toast.success("Buku berhasil ditambahkan!", {
            description: `Buku '${formData.judul}' telah disimpan.`,});
            setOpen(false);
            refetchBooks();
        }catch(err){
            console.error('Gagal menambahkan buku: ', err)
        }
        
    }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="link">+ Tambah Buku</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handlSubmit}>
          <DialogHeader>
            <DialogTitle>Menambahkan Buku</DialogTitle>
            <DialogDescription>
              Tambahkan data buku di Perpustakaan
            </DialogDescription>
          </DialogHeader>         
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="judul" className="text-right">Judul Buku</Label>
              <Input id="judul" name="judul" value={formData.judul} onChange={handleChange} className="col-span-3" required/>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="tahun" className="text-right">Tahun</Label>
              <Input id="tahun" name="tahun" value={formData.tahun} onChange={handleChange} className="col-span-3" required/>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="rak" className="text-right">Lokasi Rak</Label>
              <Input id="rak" name="rak" value={formData.rak} onChange={handleChange} className="col-span-3" required/>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Batal</Button>
            </DialogClose>
            <Button type="submit" className="bg-gray-600 hover:bg-gray-800" >Tambahkan buku</Button>
          </DialogFooter>
        </form> 
      </DialogContent>
    </Dialog>
  )
}
