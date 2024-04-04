import {
  Flex,
  FormControl,
  FormLabel,
  HStack,
  VStack,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useEffect, useReducer, useState } from "react";
import { TimerButton, TimerIconButton } from "./components/Button";

export const App = () => {
  const initialState = {
    isResumed: true,
    isStopped: true,
    hasStarted: false,
    isWork: true,
  };

  const initialTime = {
    minutes: 0,
    seconds: 0,
  };

  const initialConfig = {
    color: "#fff",
    workTimeMinutes: 25,
    workTimeSeconds: 0,
    breakTimeMinutes: 5,
    breakTimeSeconds: 0,
  };

  const configReducer = (state, action) => {
    switch (action.type) {
      case "color":
        return {
          ...state,
          color: action.value,
        };

      case "work-time-minutes":
        return {
          ...state,
          workTimeMinutes: action.value,
        };

      case "work-time-seconds":
        return {
          ...state,
          workTimeSeconds: action.value,
        };

      case "break-time-minutes":
        return {
          ...state,
          breakTimeMinutes: action.value,
        };

      case "break-time-seconds":
        return {
          ...state,
          breakTimeSeconds: action.value,
        };
    }
  };

  const timeReducer = (state, action) => {
    switch (action.type) {
      case "minutes":
        return {
          minutes: state.minutes + 1,
          seconds: 0,
        };

      case "seconds":
        return {
          ...state,
          seconds: state.seconds + 1,
        };

      case "reset":
        return {
          minutes: 0,
          seconds: 0,
        };
    }
  };

  const stateReducer = (state, action) => {
    switch (action.type) {
      case "start":
        return { ...state, hasStarted: true, isStopped: false };

      case "stop":
        return {
          ...state,
          hasStarted: false,
          isStopped: true,
          isResumed: false,
        };

      case "completed":
        return {
          ...state,
          isWork: !state.isWork,
        };
    }
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [state, stateDispatch] = useReducer(stateReducer, initialState);
  const [time, timeDispatch] = useReducer(timeReducer, initialTime);
  const [config, configDispatch] = useReducer(configReducer, initialConfig);
  const [isResumed, setIsResumed] = useState(true);
  const [timerId, setTimerId] = useState(null);

  const updateTimer = () => {
    if (time.minutes >= config.workTimeMinutes) {
      setTimeout(() => {
        stateDispatch({ type: "completed" });
        timeDispatch({ type: "reset" });
      }, 4000);
    } else {
      if (
        isResumed === true &&
        state.hasStarted === true &&
        state.isStopped === false
      ) {
        setTimerId(
          setTimeout(() => {
            if (time.seconds > 0 && time.seconds % 59 === 0) {
              timeDispatch({ type: "minutes" });
            } else {
              timeDispatch({ type: "seconds" });
            }
          }, 1000)
        );
      }
    }
  };

  useEffect(() => {
    updateTimer();
    return () => {
      clearTimeout(timerId);
    };
  }, [isResumed, state.hasStarted, state.isStopped, time, state.isWork]);
  return (
    <Flex
      width="full"
      height="100vh"
      justify="center"
      align="center"
      backgroundColor={config.color}
    >
      <Modal onClose={onClose} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent p={1} pb={6} px={2} borderRadius="2xl" mt="25vh">
          <ModalCloseButton mt={4} mr={3} />
          <ModalHeader fontSize="1.7rem" mb={3}>
            Settings
          </ModalHeader>
          <ModalBody>
            <Flex
              justify="flex-start"
              align="flex-start"
              direction="column"
              gap={6}
            >
              <FormControl>
                <HStack>
                  <FormLabel minWidth="fit-content" fontSize="1.2rem">
                    Theme Color:
                  </FormLabel>
                  <Input
                    type="color"
                    value={config.color}
                    onChange={(e) => {
                      configDispatch({ type: "color", value: e.target.value });
                    }}
                  />
                </HStack>
              </FormControl>
              <FormControl direction="row">
                <HStack width="full">
                  <FormLabel minWidth="fit-content" fontSize="1.2rem" mr={7}>
                    Work Time:
                  </FormLabel>
                  <HStack>
                    <NumberInput
                      min={1}
                      max={59}
                      defaultValue={25}
                      value={config.workTimeMinutes}
                      onChange={(value) => {
                        configDispatch({
                          type: "work-time-minutes",
                          value: value,
                        });
                      }}
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                    <NumberInput
                      min={0}
                      max={59}
                      step={10}
                      defaultValue={0}
                      value={config.workTimeSeconds}
                      onChange={(value) =>
                        configDispatch({
                          type: "work-time-seconds",
                          value: value,
                        })
                      }
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </HStack>
                </HStack>
              </FormControl>
              <FormControl direction="row">
                <HStack>
                  <FormLabel minWidth="fit-content" fontSize="1.2rem" mr={7}>
                    Break Time:
                  </FormLabel>
                  <HStack>
                    <NumberInput
                      min={1}
                      max={59}
                      defaultValue={5}
                      value={config.breakTimeMinutes}
                      onChange={(value) =>
                        configDispatch({
                          type: "break-time-minutes",
                          value: value,
                        })
                      }
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                    <NumberInput
                      min={0}
                      max={59}
                      step={10}
                      defaultValue={0}
                      value={config.breakTimeSeconds}
                      onChange={(value) =>
                        configDispatch({
                          type: "break-time-seconds",
                          value: value,
                        })
                      }
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </HStack>
                </HStack>
              </FormControl>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
      <Flex
        width="70%"
        justify="center"
        align="center"
        flexDirection="column"
        pb="7rem"
        gap={10}
      >
        <VStack>
          <Heading
            fontSize="4.5rem"
            backgroundColor={config.color}
            color={useColorModeValue("blackAlpha.700", "white")}
          >
            {state.isWork ? "Work" : "Break"} Time
          </Heading>
          <Heading
            fontSize="10rem"
            backgroundColor={config.color}
            color={useColorModeValue("blackAlpha.800", "white")}
          >
            {`${time.minutes < 10 ? "0" : ""}${time.minutes}:${
              time.seconds < 10 ? "0" : ""
            }${time.seconds}`}
          </Heading>
        </VStack>
        <Flex
          width="40%"
          justify="space-evenly"
          align="center"
          gap="2rem"
          paddingInline="2rem"
        >
          <TimerIconButton icon={<HamburgerIcon />} onClick={onOpen} />
          {state.hasStarted ? (
            <>
              <TimerButton
                text="Stop"
                onClick={() => {
                  stateDispatch({ type: "stop" });
                  timeDispatch({ type: "reset" });
                  clearTimeout(timerId);
                }}
              ></TimerButton>
              <TimerButton
                text={isResumed === true ? "Pause" : "Resume"}
                onClick={() => {
                  setIsResumed(!isResumed);
                  clearTimeout(timerId);
                }}
              />
            </>
          ) : (
            <TimerButton
              onClick={() => stateDispatch({ type: "start" })}
              text="Start"
            />
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};
