import { Models } from 'appwrite';
import React from 'react'
import Loader from './Loader';
import GridPostList from './GridPostList';
import { searchPosts } from '@/lib/appwrite/api';
type searchResultProps ={
    isSEARCHFetching : boolean;
    searchedPosts : Models.Document[];
}
const SearchResults = ({isSearchFetching,searchedPosts}:searchResultProps) => {
    if(isSearchFetching) return <Loader/>
    if( searchedPosts && searchedPosts.documents.length >0){
        return(
            <GridPostList posts = {searchPosts.documents}/>
        )
    }
  return (
    <div>
      <p className='w-full mt-10 text-center text-light-4'>No results Found</p>
    </div>
  )
}

export default SearchResults
