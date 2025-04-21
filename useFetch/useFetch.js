import { useEffect, useState } from "react"

const localCache = {}

export const useFetch = ( url ) => {

    const [state, setstate] = useState({
        data: null,
        isLoading: true,
        hasError: false,
        error: null,
    });

    useEffect( () => { 
        getFetch();
     }, [ url ]);

     function setLoadingState() {
        setstate({
            data: null,
            isLoading: true,
            hasError: false,
            error: null,
        });
    }

     const getFetch = async() => { 

        // Si SI existe en el cachelocal...
        if ( localCache[url] ) {
            setstate({
                data: localCache[url],
                isLoading: false,
                hasError: false,
                error: null,
            });
            return;
        }

        // Si NO existe en el cachelocal...
        setLoadingState();
        
        const resp = await fetch( url );
        //sleep
        await new Promise( resolve => setTimeout(resolve, 300) );

        if ( !resp.ok ) {
            setstate({
                data: null,
                isLoading: false,
                hasError: true,
                error: {
                    code: resp.status,
                    message: resp.statusText,
                }
            });
            return;
        }
        const data = await resp.json();
        setstate({
            data: data,
            isLoading: false,
            hasError: false,
            error: null,
        });

        // Manejo del cache....
        // guarda dato en el cachelocal...
        localCache[url] = data;

    }




  return {
    data: state.data,
    isLoading: state.isLoading,
    hasError: state.error,
  }
}
