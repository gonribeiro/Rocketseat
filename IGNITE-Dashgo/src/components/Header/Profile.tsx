import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

interface ProfileProps {
  showProfileData: boolean;
}

export function Profile({ showProfileData = true }: ProfileProps) {
  return (
    <Flex align="center">
      {showProfileData && (
        <Box mr="4" textAlign="right">
          <Text>Tiago</Text>
          <Text
            color="gray.300"
            fontSize="small"
          >
            meu@email.com
          </Text>
        </Box>
      )}

      <Avatar size="md" name="Tiago" src="https://avatars.githubusercontent.com/u/32773851?s=400&u=853701c5f1f44b5dfbf4795d2692ef1c6d0000bf&v=4" />          
    </Flex>
  );
}