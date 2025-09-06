import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { fetchMovies } from "@/services/api";
import useFetch from "@/services/useFetch";
import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import { images } from "@/constants/images";
import { icons } from "@/constants/icons";
import { updateSearchCount } from "@/services/appwrite";

interface Props {
  placeholder: string;
  value: string;
  onPress?: () => void;
  onChangeText: (text: string) => void;
}
const search = ({ placeholder, value, onPress, onChangeText }: Props) => {
  const [searchInput, setSearchInput] = useState("");

  const {
    data: movies,
    loading,
    error,
    refetch: loadMovies,
    reset,
  } = useFetch(() => fetchMovies({ query: searchInput }), false);

  useEffect(() => {
    const func = setTimeout(async () => {
      if (searchInput.trim()) {
        await loadMovies();
        console.log("movies value:", movies);
      } else {
        reset();
      }
    }, 500);

    return () => clearTimeout(func);
  }, [searchInput]);

useEffect(() =>{
  
  const timerFunc = setTimeout(async () =>{
     if (movies?.[0] && movies?.length > 0) {
          updateSearchCount(searchInput, movies[0]);
          console.log("updating");
        }
  },1000)

  return () => clearTimeout(timerFunc)

},[movies])

  return (
    <View className=" flex-1 bg-primary">
      <Image
        className="flex-1 absolute w-full z-0 "
        resizeMode="cover"
        source={images.bg}
      />
      <View>
        {
          <FlatList
            data={movies}
            renderItem={({ item }) => <MovieCard {...item} />}
            keyExtractor={(item) => item.id.toString()}
            numColumns={3}
            columnWrapperStyle={{
              justifyContent: "flex-start",
              gap: 20,
              marginBottom: 20,
              marginVertical: 16,
              marginLeft: 10,
            }}
            contentContainerStyle={{ paddingBottom: 5 }}
            //listHeaderComponent get choosen because when we search somethng and scroll down we want search bar to go down as well and listHead...nt
            // will make the something like header which will be display at the top of flatlist.

            ListHeaderComponent={
              <>
                <View className="flex-row  justify-center ">
                  <Image
                    className="w-12 h-10 mt-10 mb-5 mx-auto"
                    source={icons.logo}
                  />
                </View>
                <View className="text-white">
                  <SearchBar
                    value={searchInput}
                    onChangeText={setSearchInput}
                    placeholder={placeholder}
                  />
                </View>

                {loading && (
                  <ActivityIndicator
                    size="large"
                    color="#0000ff"
                    className="my-5"
                  />
                )}

                {error && (
                  <Text className="text-red flex-row justify-center">
                    Error: {error.message}
                  </Text>
                )}

                {!loading &&
                  !error &&
                  searchInput.trim() &&
                  movies?.length > 0 && (
                    <Text className="text-xl text-white font-bold">
                      Search results for: {""}
                      <Text className="text-accent">{searchInput}</Text>
                    </Text>
                  )}
              </>
            }
            ListEmptyComponent={
              !loading && !error ? (
                <View className="mt-10">
                  <Text className="text-gray-500 text-center">
                    {searchInput.trim()
                      ? "No movies found"
                      : "Search for movies"}
                  </Text>
                </View>
              ) : null
            }
          />
        }
      </View>
    </View>
  );
};

export default search;
