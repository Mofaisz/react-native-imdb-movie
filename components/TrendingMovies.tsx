import { Link } from "expo-router";
import { TouchableOpacity, Image, View, Text } from "react-native";
import MaskedView from "@react-native-masked-view/masked-view";
import { images } from "@/constants/images";

const TrendingMovies = ({
  movie: { movie_id, title, poster_url },
  index,
}: TrendingCardProps) => {
  return (
    <Link href={`/movies/${movie_id}`} asChild>
      <TouchableOpacity className="w-32 relative pl-4">
        <Image
          source={{ uri: poster_url }}
          className="w-full h-48"
          resizeMode="cover"
        />
        <Text
        className="text-white mt-2 ml-2 text-sm font-bold"
        numberOfLines={1}>
          {title}
        </Text>

        <View className="absolute bottom-3 -left-2">

        {/* this is for getting number on trending movies  */}
          <MaskedView
            maskElement={
              <Text className="font-bold text-white text-6xl">{index + 1}</Text>
            }
          >
            <Image source={images.rankingGradient} className="size-14" resizeMode="cover" />
          </MaskedView>

        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default TrendingMovies;
