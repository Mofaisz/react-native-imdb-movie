import { icons } from "@/constants/icons";
import { Genre, getMovieGenres, mapGenres, movieDetails } from "@/services/api";
import useFetch from "@/services/useFetch";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, Text, View, Image } from "react-native";

export default function MovieDetails() {
  const { id } = useLocalSearchParams();

  const { data: movie, loading } = useFetch(() => movieDetails(id as string));

  if (loading) {
    return (
      <View className="flex-1 bg-primary justify-center items-center">
        <Text>{loading}</Text>
      </View>
    );
  }

  if (!movie) {
    return (
      <View className="flex-1 bg-primary justify-center items-center">
        <Text>No movie found</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-primary">
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        <View>
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}`,
            }}
            className="w-full h-[500px]"
            resizeMode="stretch"
          />
        </View>
        <Text className="text-white font-bold text-2xl mt-4 px-4">
          {movie.title}
        </Text>
        <Text className="text-accent text-light-200 text-[16px] ml-4 mt-2">
          {`${
            movie?.release_date ? movie.release_date.slice(0, 4) : "N/A"
          } · Lang: ${movie?.original_language?.toUpperCase() || "N/A"}`}
        </Text>{" "}
        <View className="flex-row items-center ml-4 mt-2 bg-[#221F3D] w-32 p-4">
          <Image
            className="w-4 h-4 mr-2"
            resizeMode="contain"
            source={icons.star}
          />
          <Text className="font-semi-bold text-accent text-light-300">{`${movie?.vote_average?.toFixed(
            1
          )}/10`}</Text>
        </View>
        <View className="ml-4 mt-4">
          <Text className="text-accent text-light-100 mb-2">OverView</Text>
          <Text className="font-semi-bold text-white mr-4">
            {movie.overview}
          </Text>
        </View>
        <View className="mt-2 ml-4 ">
          <Text className="text-accent text-light-100 font-semibold">
            Release Date
          </Text>
          <Text className="text-accent text-light-200 text-[16px]">
            {new Date(movie.release_date).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </Text>
        </View>
        <View>
          <Text className="text-white text-[16px] mt-1">
            {movie.genres.map((g) => g.name).join(", ")}
          </Text>{" "}
        </View>
      </ScrollView>
    </View>
  );
}
