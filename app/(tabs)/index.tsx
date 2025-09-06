import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  ScrollViewComponent,
  Text,
  View,
} from "react-native";
import { Link, useRouter } from "expo-router";
import { images } from "@/constants/images";
import { icons } from "@/constants/icons";
import SearchBar from "@/components/SearchBar";
import { fetchMovies } from "@/services/api";
import useFetch from "@/services/useFetch";
import MovieCard from "@/components/MovieCard";
import { getTrendingMovies } from "@/services/appwrite";
import TrendingMovies from "@/components/TrendingMovies";

export default function Index() {
  const router = useRouter();

  const {
    data: trendingMovies,
    loading: trendingLoading,
    error: trendingError,
  } = useFetch(getTrendingMovies);

  const {
    data: movies,
    loading: movieLoading,
    error: moviesError,
  } = useFetch(() => fetchMovies({ query: "" }));
  return (
    <View className="flex-1 bg-primary ">
      <Image
        source={images.bg}
        className="flex-1 w-full h-screen absolute z-0"
      />
      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          minHeight: "100%",
          paddingBottom: 10,
        }}
      >
        <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />

        {movieLoading || trendingLoading ? (
          <ActivityIndicator size="large" color="#0000ff" className="mt-10" />
        ) : moviesError || trendingError ? (
          <Text className="text-white">
            Error :{moviesError?.message || trendingError?.message}
          </Text>
        ) : (
          <View>
            <SearchBar
              onPress={() => router.push("/search")}
              placeholder="Search for a movie"
            />

            <>
            {/* trending movies */}
              {trendingMovies && (
                <View className="mt-10">
                  <Text className="text-lg text-white font-bold mb-3 ">
                    Trending Movies
                  </Text>
                </View>
              )}

              {/* we have make horizontal tru since we need to scroll horizontal */}
              <FlatList
              horizontal
              showsHorizontalScrollIndicator ={false}
              ItemSeparatorComponent={() =><View
              className="w-4"/>}
                data={trendingMovies}
                renderItem={({ item, index }) => <TrendingMovies movie={item} index = {index}/>}
                keyExtractor={(item) => item.movie_id.toString()}
              />


              <Text className="text-white mt-5">Latest Movies</Text>

              <FlatList
                data={movies}
                renderItem={({ item }) => <MovieCard {...item} />}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                columnWrapperStyle={{
                  justifyContent: "flex-start",
                  gap: 20,
                  padding: 5,
                  marginBottom: 10,
                }}
                className="mt-4 mb-2"
                scrollEnabled={false}
              />
            </>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
