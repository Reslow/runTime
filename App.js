import React from "react";
import "./firebase";
import RootNavigation from "./navigation";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback } from "react";

export default function App() {
  const [isLoaded] = useFonts({
    "rub-mid": require("./assets/font/Rubik-Medium.ttf"),
    "rub-bold": require("./assets/font/Rubik-Bold.ttf"),
    "rub-xbold": require("./assets/font/Rubik-ExtraBold.ttf"),
  });

  const handleOnLayout = useCallback(async () => {
    if (isLoaded) {
      await SplashScreen.hideAsync(); //hide the splashscreen
    }
  }, [isLoaded]);

  if (!isLoaded) {
    return null;
  }

  SplashScreen.preventAutoHideAsync();
  return <RootNavigation onLayout={handleOnLayout} />;
}
