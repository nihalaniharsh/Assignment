import { useState, useEffect } from 'react';
import { fetchArtworks } from './services/api';
import type { Artwork } from './types/Artwork';
import ArtTable from './components/ArtTable';



function App(){

  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const [selectedArtworks, setSelectedArtworks] = useState<Artwork[]>([]);


  useEffect(()=>{
    const loadData = async () =>{
      try{
        const data = await fetchArtworks(page);
        setArtworks(data.artworks);
        setTotal(data.total);
      } catch(error){
        console.error('Error fetching artworks:', error);
      }
      };
      loadData();

    }, [page]);
    return(
      <div>
        <h1>Art Institute of Chicago - Artworks</h1>
        <ArtTable
  artworks={artworks}
  total={total}
  page={page}
  onPageChange={setPage}
  selectedArtworks={selectedArtworks}
  onSelectionChange={setSelectedArtworks}
/>

      </div>
    );
  }

export default App;