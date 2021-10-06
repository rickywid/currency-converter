import React, { useRef, useState } from 'react';

import { RiArrowLeftRightLine } from 'react-icons/ri';

import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Circle,
  Container,
  Center,
  Box,
  Text
} from "@chakra-ui/react"

function App() {

  const inputEl = useRef<HTMLInputElement>(null);
  // const [amount, setAmount] = useState<string>("");
  const [toCurrency, setToCurrency] = useState<string>("");
  const [fromCurrency, setFromCurrency] = useState<string>("");
  const [isSubmitted, setSubmitted] = useState<boolean>(false);
  const [currencyConversion, setCurrencyConversion] = useState<number>();

  const handleFromCurrencyChange = (e: any) => {
    console.log(e.target.value)
    setFromCurrency(e.target.value)
  };

  const handleToCurrencyChange = (e: any) => {
    setToCurrency(e.target.value)
  };

  // const handleInputChange = (e: any) => setAmount(e.target.value);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setSubmitted(true);

    const req = await fetch(`https://v6.exchangerate-api.com/v6/c86276d591904d18be400aa2/latest/${parseSelectOption(fromCurrency, true) || "CAD"}`);
    const res = await req.json();
    setCurrencyConversion(res.conversion_rates[parseSelectOption(toCurrency, true) || "USD"]);
    setSubmitted(false);
  }

  const parseSelectOption = (val: string, symbol: boolean) => {
    console.log(val)
    if (!val) return;
    return symbol ? val.split("-")[0].trim() : val.split("-")[1].trim();
  }

  const displayConversion = () => {
    const x = inputEl.current && inputEl.current.value as unknown as number;
    return (
      <Box>
        <Box marginBottom="5">
          <Box color="gray.500">
            <Text
              fontWeight="bold"
              marginBottom="1"
            >{inputEl.current && inputEl.current.value} {parseSelectOption(fromCurrency, false) || "Canadian Dollar"} = </Text>
          </Box>
          <Box>
            <Text fontWeight="bold" fontSize="25">{currencyConversion && currencyConversion * x!} {parseSelectOption(toCurrency, false) || "US Dollars"}</Text>
          </Box>
        </Box>
        <Box color="gray.500" fontSize="15">
          <p>{1} {parseSelectOption(fromCurrency, true)} = {currencyConversion} {parseSelectOption(toCurrency, true) || "US Dollar"}</p>
        </Box>
        <Box color="gray.500" fontSize="15">
          <p>{currencyConversion} {parseSelectOption(toCurrency, true)} = {1} {parseSelectOption(fromCurrency, true) || "Canadian Dollar"}</p>
        </Box>
      </Box>
    )
  }

  return (
    <Container maxW="container.xl">
      <Heading as="h1">CURRENCY CONVERTER</Heading>
      <form action="" onSubmit={handleSubmit}>
        <Box
          display={{
            base: "initial",
            md: "flex"
          }}
        >
          <Box
            flex={1}
            marginRight={{
              base: 0,
              md: 5
            }}
          >
            <FormControl id="amount">
              <FormLabel>Amount</FormLabel>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  color="gray.300"
                  fontSize="1.2em"
                  children="$"
                />
                <Input
                  ref={inputEl}
                  // onChange={handleInputChange}
                  placeholder="Enter amount"
                  required
                />
              </InputGroup>
            </FormControl>
          </Box>
          <Box
            display={{
              base: "initial",
              md: "flex"
            }}
            flex={2.1}
          >
            <FormControl id="from" marginRight={5}>
              <FormLabel>From</FormLabel>
              <InputGroup>
                <Select
                  defaultValue="CAD - Canadian Dollar"
                  onChange={handleFromCurrencyChange}
                >
                  <option value="CAD - Canadian Dollar">🇨🇦 CAD - Canadian Dollar</option>
                  <option value="GBP - British Pound">🇬🇧 GBP - British Pound</option>
                  <option value="USD - US Dollar">🇺🇸 USD - US Dollar</option>
                </Select>
              </InputGroup>
            </FormControl>

            <div style={{ display: "flex", alignItems: "end", marginRight: 20 }}>
              <Center>
                <Circle size="40px" bg="tomato" color="white">
                  <RiArrowLeftRightLine />
                </Circle>
              </Center>
            </div>


            <FormControl id="to">
              <FormLabel>To</FormLabel>
              <InputGroup>
                <Select
                  defaultValue="USD - US Dollar"
                  onChange={handleToCurrencyChange}
                >
                  <option value="CAD - Canadian Dollar">🇨🇦 CAD - Canadian Dollar</option>
                  <option value="GBP - British Pound">🇬🇧 GBP - British Pound</option>
                  <option value="USD - US Dollar">🇺🇸 USD - US Dollar</option>
                </Select>
              </InputGroup>
            </FormControl>
          </Box>
        </Box>

        <Button
          colorScheme="blue"
          type="submit"
          mt={5}
          mb={5}
        >Convert</Button>
      </form>


      {displayConversion()}

    </Container>
  );
}

export default App;

/**
 * https://emojipedia.org/flags/
 */