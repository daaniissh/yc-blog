'use client'
import React from 'react'
import Form from "next/form"
import SearchReset from './SearchReset'
import { Search } from 'lucide-react'
const SearchForm = ({ query }: { query?: string }) => {


  return (
    <Form action="/" className='search-form' >
      <input type="text" name='query' defaultValue={query} className='search-input' placeholder='Search Startup' />
      <div className='flex gap-2 ' >
        {query && (
          <SearchReset />

        )}
        <button type='submit' className='search-btn text-white'><Search className='size-5' /></button>
      </div>
    </Form>
  )
}

export default SearchForm