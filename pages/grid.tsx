import { Box, Flex } from '@rebass/grid';
import React from 'react';
import styled from 'styled-components';
import { errorMessages } from '../src/utils/common';

const Bar = styled.div`
  height: 10px;
  background: orange;
`;

export default () => (
  <div>
    <h1>{errorMessages.emailAlreadyExists}</h1>
    <Flex flexWrap="wrap">
      <Box px={2} py={2} width={1 / 2}>
        <Bar />
        1/2
      </Box>
      <Box px={2} py={2} width={1 / 2}>
        <Bar />
        1/2
      </Box>

      <Box px={2} py={2} width={1 / 3}>
        <Bar />
        1/3
      </Box>
      <Box px={2} py={2} width={1 / 3}>
        <Bar />
        1/3
      </Box>
      <Box px={2} py={2} width={1 / 3}>
        <Bar />
        1/3
      </Box>

      <Box px={2} py={2} width={1 / 4}>
        <Bar />
        1/4
      </Box>
      <Box px={2} py={2} width={1 / 4}>
        <Bar />
        1/4
      </Box>
      <Box px={2} py={2} width={1 / 4}>
        <Bar />
        1/4
      </Box>
      <Box px={2} py={2} width={1 / 4}>
        <Bar />
        1/4
      </Box>

      <Box px={2} py={2} width={1 / 5}>
        <Bar />
        1/5
      </Box>
      <Box px={2} py={2} width={1 / 5}>
        <Bar />
        1/5
      </Box>
      <Box px={2} py={2} width={1 / 5}>
        <Bar />
        1/5
      </Box>
      <Box px={2} py={2} width={1 / 5}>
        <Bar />
        1/5
      </Box>
      <Box px={2} py={2} width={1 / 5}>
        <Bar />
        1/5
      </Box>

      <Box px={2} py={2} width={1 / 6}>
        <Bar />
        1/6
      </Box>
      <Box px={2} py={2} width={1 / 6}>
        <Bar />
        1/6
      </Box>
      <Box px={2} py={2} width={1 / 6}>
        <Bar />
        1/6
      </Box>
      <Box px={2} py={2} width={1 / 6}>
        <Bar />
        1/6
      </Box>
      <Box px={2} py={2} width={1 / 6}>
        <Bar />
        1/6
      </Box>
      <Box px={2} py={2} width={1 / 6}>
        <Bar />
        1/6
      </Box>
    </Flex>
  </div>
);
