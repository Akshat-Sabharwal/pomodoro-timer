import { IconButton, Button, useColorModeValue } from "@chakra-ui/react";

export const TimerButton = ({ text, onClick }) => {
  return (
    <Button
      rounded="lg"
      width="70%"
      py="1.7rem"
      fontSize="1.5rem"
      variant="outline"
      borderColor={useColorModeValue("blackAlpha.800", "white")}
      color={useColorModeValue("blackAlpha.800", "white")}
      _hover={{
        backgroundColor: useColorModeValue("blackAlpha.800", "white"),
        color: useColorModeValue("white", "blackAlpha.800"),
        borderColor: useColorModeValue("blackAlpha.800", "white"),
      }}
      onClick={onClick}
    >
      {text}
    </Button>
  );
};

export const TimerIconButton = ({ icon, onClick }) => {
  return (
    <IconButton
      rounded="lg"
      width="50%"
      py="1.7rem"
      fontSize="1.5rem"
      icon={icon}
      variant="outline"
      borderColor={useColorModeValue("blackAlpha.800", "white")}
      color={useColorModeValue("blackAlpha.800", "white")}
      _hover={{
        backgroundColor: useColorModeValue("blackAlpha.800", "white"),
        color: useColorModeValue("white", "blackAlpha.800"),
        border: useColorModeValue("blackAlpha.800", "white"),
      }}
      onClick={onClick}
    />
  );
};
