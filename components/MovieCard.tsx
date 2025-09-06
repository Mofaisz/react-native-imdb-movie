import { icons } from "@/constants/icons";
import { Link } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Image } from "react-native";


const MovieCard = ({
  id,
  poster_path,
  title,
  vote_average,
  release_date,
}: Movie) => {
  //Movie is declared in interfaces
  //   console.log(poster_path)

  return (
    <Link href={`/movies/${id}`} asChild>
      <TouchableOpacity className="w-[30%]">
        <Image
          source={{
            uri: poster_path
              ? `https://image.tmdb.org/t/p/w500${poster_path}`
              : `https://placehold.co/600x400/1a1a1a/ffffff.png`,
          }}
          className="w-full h-52 rounded-lg"
          resizeMode="cover"
        />
        <Text 
        numberOfLines={1}
        // ellipsizeMode="tail"
        className="text-white">{title}</Text>

        <View className="flex-row items-center gap-2">
          <Image
            source={icons.star}
            style={{ width: 18, height: 18, tintColor: "#FFD700" }} // gold star
            resizeMode="contain"
          />
          <Text className="text-white font-semibold text-base">
            {vote_average?.toFixed(1)} {/* One decimal place */}
          </Text>
        </View>

        <Text className="text-white">{release_date.split("-")[0]}</Text>
      </TouchableOpacity>
    </Link>
  );
};

export default MovieCard;
