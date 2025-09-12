import axios from 'axios';


import type { Artwork } from '../types/Artwork';

const BASE_URL = 'https://api.artic.edu/api/v1/artworks';

export const fetchArtworks = async (page: number) : Promise<{artworks: Artwork[]; total: number}> =>{
const response = await axios.get(`${BASE_URL}?page=${page}`);
return {
    artworks: response.data.data,
total: response.data.pagination.total,
};

};