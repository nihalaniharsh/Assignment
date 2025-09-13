// import React, { useState, useEffect } from 'react';
// import ArtTable from './components/ArtTable';
// import type { Artwork } from './types/Artwork';
// import axios from 'axios';

// export default function App() {
//   const [artworks, setArtworks] = useState<Artwork[]>([]);
//   const [selectedArtworks, setSelectedArtworks] = useState<Artwork[]>([]);
//   const [total, setTotal] = useState(0);
//   const [page, setPage] = useState(0);

//   useEffect(() => {
//     axios
//       .get(`https://api.artic.edu/api/v1/artworks?page=${page + 1}&limit=10`)
//       .then((response) => {
//         setArtworks(response.data.data);
//         setTotal(response.data.pagination.total);
//       });
//   }, [page]);

//   return (
//     <ArtTable
//       artworks={artworks}
//       total={total}
//       page={page}
//       onPageChange={({ page }) => setPage(page)}
//       selectedArtworks={selectedArtworks}
//       onSelectionChange={setSelectedArtworks}
//     />
//   );
// }


import ArtTable from './components/ArtTable';

export default function App() {
  return <ArtTable />;
}
