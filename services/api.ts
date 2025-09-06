import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

export interface Genre{
  id:number
  name:string
}

export const TNDB_Config = {
  BASE_URL: "https://api.themoviedb.org/3",
  API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`,
  },
};

export const fetchMovies = async ({ query }: { query: string }) => {
  const endpoint = query
    ? `${TNDB_Config.BASE_URL}/search/movie?query=${encodeURIComponent(query)}`  //encodeURIComponent it will make the query more reponsive you need to search on this
    : `${TNDB_Config.BASE_URL}/discover/movie?sort_by=popularity.desc`;

  const response = await fetch(endpoint, {
    method: "GET",
    headers: TNDB_Config.headers,
  });

  if (!response) {
    // @ts-ignore
    throw new Error("Failed to fecth Movie", response.statusText);
  }

  const data = await response.json();

  return data.results;
};

export const movieDetails = async (movieId:string):Promise<MovieDetails> =>{
  try{
    const response = await fetch(`${TNDB_Config.BASE_URL}/movie/${movieId}?api_key=${TNDB_Config.API_KEY}`,{
      method:"Get",
      headers:TNDB_Config.headers 
    });

    if(!response.ok) throw new Error("Failed to fetch movie detail");

    const data = await response.json()
    
    return data

  }catch(error){
    console.log(error)
    // throw new Error(error)
  }
}



// export const getMovieGenres = async (): Promise<Genre[]> => {

//   try{
//     const response= await fetch(`${TNDB_Config.BASE_URL}/genre/movie/list`,{
//       method:'Get',
//       headers:TNDB_Config.headers
//     })
//     const data = await response.json()
//     return data.genres as Genre[]

//   }catch(error){
//     console.error("Error in genre",error)
//     return []
//   }
// }

// export const mapGenres = (ids: number[], genres: Genre[]): string => {
//   return ids
//     .map((id) => genres.find((g) => g.id === id)?.name || "")
//     .filter(Boolean)
//     .join(", ");
// };