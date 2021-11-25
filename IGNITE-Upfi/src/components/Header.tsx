import { Box, Flex, Button, useDisclosure, Image } from '@chakra-ui/react';

import { ModalAddImage } from './Modal/AddImage';

export function Header(): JSX.Element {
  const { onOpen, isOpen, onClose } = useDisclosure();

  return (
    <>
      <Box bgColor="pGray.800">
        <Flex
          justifyContent="space-between"
          alignItems="center"
          maxW={1120}
          mx="auto"
          px={20}
          py={6}
          flexDir={['column', 'column', 'row']}
        >
          <Image
            src="logo.svg"
            h={10}
            onClick={() => window.location.reload()}
            cursor="pointer"
            my={['0.5rem', 0]}
          />
          <Button
            onClick={() => onOpen()}
            mt="0.5rem"
            fontSize={['90%', '1rem']}
          >
            Adicionar imagem
          </Button>
        </Flex>
      </Box>

      <ModalAddImage isOpen={isOpen} onClose={onClose} />
    </>
  );
}
