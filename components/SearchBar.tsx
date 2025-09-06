import { View, Text, TextInput, Image } from "react-native";
import React from "react";
import { images } from "@/constants/images";
import { icons } from "@/constants/icons";

interface Props {
  placeholder: string;
  value? : string;
  onPress?: () => void;
  onChangeText?:(text:string) => void;
}

const SearchBar = ({ placeholder,value, onPress,onChangeText }:Props) => {
  return (
    <View className="flex-row items-center justify-center bg-dark-200 text-white">
      <Image
        source={icons.search}
        className="size-5 px-5 py-3"
        resizeMode="contain"
        tintColor="#AB8BFF"
      />
      <TextInput
        onPress={onPress}
        value = {value}
        onChangeText={onChangeText}
        className="flex-1 text-white"
        placeholder={placeholder}
        placeholderTextColor="#A8B5DB"
      />
    </View>
  );
};

export default SearchBar;
