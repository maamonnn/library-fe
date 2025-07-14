import { Button } from "@/components/ui/button"
import React, { useState,useEffect } from "react"
import axios from 'axios'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import type { IBooks } from "./lib/types/books"
import { AddBook } from "./components/sections/AddBook"
import NavBar from "./components/sections/Navbar"
import { Pagination, PaginationContent, PaginationNext, PaginationPrevious } from "./components/ui/pagination"
import Footer from "./components/sections/Footer"


function App() {
  const [Books, setBooks] = useState<IBooks[]>([]);
  const fetchBooks = async() => {
      try{
        const response = await axios.get('http://localhost:18080/buku');
        setBooks(response.data.buku);
      }catch(err){
        if (axios.isAxiosError(err)) {
          console.error("Failed to fetch data:", err.response?.data || err.message);
        } else {
          console.error("An unexpected error occurred:", err);
        }
      }
    }
  useEffect(() => {
    fetchBooks()
  }, [])
  console.log(Books)
  return (
    <>
      <NavBar />
      <div className="flex w-full min-h-full items-start justify-center py-24 bg-gray-200">
        <div className="flex justify-center flex-col w-3/6 bg-white p-12 rounded-xl shadow-2xl">
        <div className="text-right mb-3">
          <AddBook refetchBooks={fetchBooks}/>
        </div>
        <Table>
          <TableHeader className="border-1 border-white">
            <TableRow>
              <TableHead className="w-[100px]">Id Buku</TableHead>
              <TableHead>Judul Buku</TableHead>
              <TableHead>Tahun Terbit</TableHead>
              <TableHead>Lokasi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="text-center">
            {Books.map((Book) =>(
              <TableRow key={Book.id}>
                <TableCell className="font-medium border-t-white">{Book.id}</TableCell>
                <TableCell>{Book.judul}</TableCell>
                <TableCell>{Book.tahun}</TableCell>
                <TableCell>{Book.rak}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex place-content-center-safe">
          <div className="flex gap-2 my-2 mx-1 p-1 "><Button variant="secondary" className="hover:bg-gray-300"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6"><path fillRule="evenodd" d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z" clipRule="evenodd" /></svg></Button></div>
          <div className="flex gap-2 my-2 mx-1 p-1 "><Button variant="secondary" className="hover:bg-gray-300"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6"><path fillRule="evenodd" d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z" clipRule="evenodd" /></svg></Button></div>
        </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default App