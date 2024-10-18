"use client";

import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
  VStack,
  Heading,
  useToast,
} from '@chakra-ui/react';

// Import storeChoice from voting.ts
import storeChoice from '@/server/voting'; // Adjust the path based on your project structure

const BasicVotingForm: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string>('');
  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedOption) {
      toast({
        title: 'Error',
        description: 'Please select an option before submitting.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      await storeChoice(selectedOption); // Call the voting function
      toast({
        title: 'Vote Submitted',
        description: 'Thank you for voting!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      setSelectedOption(''); // Reset the form after submission
    } catch (error) {
      console.error('Error submitting vote:', error);
      toast({
        title: 'Error',
        description: 'Failed to submit your vote. Please try again.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box maxWidth="400px" margin="auto" padding={4}>
      <Heading as="h1" size="xl" textAlign="center" marginBottom={6}>
        Vote for Your Favorite Fruit
      </Heading>
      <form onSubmit={handleSubmit}>
        <FormControl as="fieldset">
          <FormLabel as="legend">Select a fruit:</FormLabel>
          <RadioGroup value={selectedOption} onChange={(value) => setSelectedOption(value)}>
            <VStack align="start" spacing={4}>
              <Radio value="Apple">Apple</Radio>
              <Radio value="Banana">Banana</Radio>
              <Radio value="Cherry">Cherry</Radio>
            </VStack>
          </RadioGroup>
        </FormControl>
        <Button
          type="submit"
          colorScheme="blue"
          marginTop={6}
          width="100%"
          isDisabled={!selectedOption}
        >
          Submit Vote
        </Button>
      </form>
    </Box>
  );
};

export default BasicVotingForm;
