import { useEffect, useState } from 'react';
import type { Artwork } from '../types/Artwork';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

import { Paginator } from 'primereact/paginator';
import type { PaginatorPageChangeEvent } from 'primereact/paginator';

import axios from 'axios';

type SelectionChangeEvent = {
  value: Artwork[];
};





export default function ArtTable() {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [selectedArtworks, setSelectedArtworks] = useState<Artwork[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);

  





  useEffect(() => {
    axios
      .get(`https://api.artic.edu/api/v1/artworks?page=${page + 1}&limit=10`)
      .then((response) => {
        setArtworks(response.data.data);
        setTotal(response.data.pagination.total);
      })
      .catch((error) => {
        console.error('Error fetching artworks:', error);
      });
  }, [page]);

  const handleSelectionChange = (e: SelectionChangeEvent) => {
    setSelectedArtworks(e.value);
  };

  const handleSubmit = () => {
    alert(`Submitted ${selectedArtworks.length} artwork(s).`);
  };

  const handleClear = () => {
    setSelectedArtworks([]);
  };

  const handlePageChange = (e: PaginatorPageChangeEvent) => {
    setPage(e.page);
  };

  return (
    <div>
      <h1>Art Institute of Chicago - Artworks</h1>

      <div>
        <button onClick={handleSubmit}>Submit</button>
        
        <button onClick={handleClear}>Clear Selection</button>
      </div>

      <DataTable
        value={artworks}
        selection={selectedArtworks}
        onSelectionChange={handleSelectionChange}
        selectionMode="multiple"
        dataKey="id"
      >




        <Column selectionMode="multiple" header="Select rows..." />
        <Column field="title" header="Title" />
        <Column field="place_of_origin" header="Origin" />
        <Column field="artist_title" header="Artist" />
        <Column field="inscriptions" header="Inscriptions" />
        <Column field="date_start" header="Start Date" />
        <Column field="date_end" header="End Date" />
      </DataTable>






      <Paginator
        first={page * 10}
        rows={10}
        totalRecords={total}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
