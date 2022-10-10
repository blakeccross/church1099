import SkeletonLoader from "expo-skeleton-loader";
import React from "react";
import { View } from "react-native";
import { HP, WP } from "../../Assets/config/screen-ratio";

const EmptyProfile = () => {
  return (
    <SkeletonLoader boneColor="#fbfbfb" highlightColor="#f2f2f2">
      <SkeletonLoader.Container
        style={[
          {
            flexDirection: "column",
            alignItems: "flex-start",
            alignContent: "center",
            justifyContent: "center",
            backgroundColor: "white",
          },
        ]}
      >
        <SkeletonLoader.Item
          style={{
            width: WP(30),
            height: WP(30),
            alignSelf: "center",
            marginTop: HP(4),
            borderRadius: WP(15),
            alignSelf: "center",
          }}
        />
        <SkeletonLoader.Container
          style={{
            paddingTop: 10,
            alignItems: "center",
            alignContent: "center",
            justifyContent: "center",
          }}
        >
          <SkeletonLoader.Item
            style={{ width: 220, height: 20, marginBottom: 5 }}
          />
          <SkeletonLoader.Item
            style={{ width: 220, height: 20, marginBottom: 50 }}
          />
          <SkeletonLoader.Item
            style={{ width: WP(100), height: HP(20), marginBottom: 10 }}
          />
          <SkeletonLoader.Item
            style={{ width: WP(100), height: HP(20), marginBottom: 10 }}
          />
        </SkeletonLoader.Container>
      </SkeletonLoader.Container>
    </SkeletonLoader>
  );
};
export default EmptyProfile;
