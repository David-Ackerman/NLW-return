import { Camera, Trash } from "phosphor-react-native";
import React from "react";
import { TouchableOpacity, Image, View } from "react-native";
import { theme } from "../../theme";
import { styles } from "./styles";

interface ScreenshotButtonProps {
  screenshot: string | null;
  onTakeShot: () => void;
  onRemoveShot: () => void;
}

export function ScreenshotButton({
  onRemoveShot,
  onTakeShot,
  screenshot,
}: ScreenshotButtonProps) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={screenshot ? onRemoveShot : onTakeShot}
    >
      {screenshot ? (
        <View>
          <Image style={styles.image} source={{ uri: screenshot }} />
          <Trash
            size={22}
            weight="fill"
            color={theme.colors.text_secondary}
            style={styles.removeIcon}
          />
        </View>
      ) : (
        <Camera size={24} weight="bold" color={theme.colors.text_primary} />
      )}
    </TouchableOpacity>
  );
}