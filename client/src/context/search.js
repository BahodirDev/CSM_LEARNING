import {useState,createContext,useContext} from 'react';

const SearchProvider =createContext();


 function ContextSearch({children}){
  
    const [value,setValue] = useState({
        keyword:"",
        results:[]
    });

    // value = {keyword:"",results:[]}

    return(
        <SearchProvider.Provider value={[value,setValue]}>
            {children}
        </SearchProvider.Provider>
    );
}

const useSearch= ()=> useContext(SearchProvider);

export {useSearch,ContextSearch} 