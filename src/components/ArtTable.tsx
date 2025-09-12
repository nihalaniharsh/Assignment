import type { Artwork } from '../types/Artwork';
import { useState, useEffect } from 'react';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Paginator } from 'primereact/paginator';
import { MultiSelect } from 'primereact/multiselect';
import { Button } from 'primereact/button';

type Props = {
  artworks: Artwork[];
  total: number;
  page: number;
  onPageChange: (page: number) => void;
  selectedArtworks: Artwork[];
  onSelectionChange: (selected: Artwork[]) => void;
};

export default function ArtTable({
  artworks,
  total,
  page,
  onPageChange,
  
  onSelectionChange,
}: Props) {

  const [allSelected, setAllSelected] = useState<Artwork[]>([]);
  const [customSelected, setCustomSelected] = useState<Artwork[]>([]);

  const onSelectionChangeHandler = (e: any) => {
    const currentSelected = e.value as Artwork[];
    const updated = [
      ...allSelected.filter((a) => !artworks.some((b) => b.id === a.id)),
      ...currentSelected,
    ];
    setAllSelected(updated);
    onSelectionChange(updated);
  };

  const onPageChangeHandler = (event: any) => {
    onPageChange(event.page + 1);
  };

  useEffect(() => {
    onSelectionChange(allSelected);
  }, [allSelected]);

  const onSubmit = () => {
    console.log('Submitted:', customSelected);
    alert(`Submitted ${customSelected.length} artwork(s).`);
  };

  const header = (
    <div className="flex gap-2 align-items-center mb-2">
      <MultiSelect
        value={customSelected}
        options={allSelected}
        onChange={(e) => setCustomSelected(e.value)}
        optionLabel="title"
        placeholder="Select rows..."
        display="chip"
        style={{ width: '250px' }}
      />
      <Button label="Submit" onClick={onSubmit} />
    </div>
  );

  return (
    <>
      <DataTable
        value={artworks}
        selection={allSelected.filter((a) =>
          artworks.some((b) => b.id === a.id)
        )} 
        onSelectionChange={onSelectionChangeHandler}
        dataKey="id"
        header={header}
        selectionMode="multiple"
         cellSelection={false}    
      >
        <Column selectionMode="multiple" headerStyle={{ width: '3em' }} />
        <Column field="title" header="Title" />
        <Column field="place_of_origin" header="Origin" />
        <Column field="artist_display" header="Artist" />
        <Column field="inscriptions" header="Inscriptions" />
        <Column field="date_start" header="Start Date" />
        <Column field="date_end" header="End Date" />
      </DataTable>

      <Paginator
        first={(page - 1) * 10}
        rows={10}
        totalRecords={total}
        onPageChange={onPageChangeHandler}
      />
    </>
  );
}
