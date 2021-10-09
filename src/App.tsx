import React, { useEffect, useState } from 'react';

import { RiArrowLeftRightLine } from 'react-icons/ri';

import {
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Circle,
  Center,
  Box,
  Text,
  Divider
} from "@chakra-ui/react"
import currencies, { ICurrency } from "./currencies";
import { BASE_URL } from './const';

function App() {

  const [amount, setAmount] = useState<string>("");
  const [toCurrency, setToCurrency] = useState<string>("USD - US Dollar");
  const [fromCurrency, setFromCurrency] = useState<string>("CAD - Canadian Dollar");
  const [currencyConversion, setCurrencyConversion] = useState<number>();
  const [error, setError] = useState<string>("");

  useEffect(() => {
    try {
      validate();
      getConversion();
    } catch (e: any) {
      setError(e);
      setAmount("");
    }
  }, [amount, fromCurrency, toCurrency]);

  const handleFromCurrencyChange = (e: any) => { setFromCurrency(e.target.value) };

  const handleToCurrencyChange = (e: any) => { setToCurrency(e.target.value) };

  const handleInputChange = (e: any) => {
    setError("");
    setAmount(e.target.value);
    getConversion();
  }

  const getConversion = async () => {
    try {
      const req = await fetch(`${BASE_URL}/${process.env.REACT_APP_API_KEY}/latest/${parseSelectOption(fromCurrency, true) || "CAD"}`);
      const res = await req.json();

      if(res.result === "error") {
        throw Error(res["error-type"]);
      };

      setCurrencyConversion(res.conversion_rates[parseSelectOption(toCurrency, true) || "USD"]);
    } catch (e) {
      setError(e.message);
    }
  }

  const parseSelectOption = (val: string, symbol: boolean) => {
    if (!val) return;
    return symbol ? val.split("-")[0].trim() : val.split("-")[1].trim();
  }

  const validate = () => {
    const regex = /^\d*\.?\d*$/gm.test(amount);
    if (!regex) { throw 'Please enter a valid amount' }
  }

  const switchCurrencies = () => {
    setToCurrency(fromCurrency);
    setFromCurrency(toCurrency);
  }

  const displayConversion = () => {
    return (
      <Box>
        <Box marginBottom="5">
          <Box color="gray.500">
            <Text
              fontWeight="bold"
              marginBottom="1"
            >{amount} {parseSelectOption(fromCurrency, false) || "Canadian Dollar"} = </Text>
          </Box>
          <Box>
            <Text fontWeight="bold" fontSize="25">{currencyConversion && Math.round(currencyConversion * (amount as unknown as number) * 100) / 100} {parseSelectOption(toCurrency, false) || "US Dollars"}</Text>
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
    <>
      <Box
        display="block"
        boxSizing="border-box"
        height="50vh"
        background="linear-gradient(180deg, rgba(2,0,36,1) 0%, rgb(14 212 182) 68%)"
        clipPath="ellipse(300% 100% at 185% 0%)"
        className="animate__animated animate__fadeIn"
      >
      </Box>
      <Box
        position="relative"
        marginTop={{ base: "-356px", md: "-270" }}
        className="animate__animated animate__fadeIn"
      >
        <Heading
          as="h6"
          size="md"
          position="absolute"
          top={0}
          left={0}
          right={0}
          textAlign="center"
          color="white"
        >CURRENCY CONVERTER</Heading>
        <Box
          display="flex"
          justifyContent="center"
          position="absolute"
          left={0}
          right={0}
          top={35}
          marginRight={{ base: "auto" }}
          marginLeft={{ base: "auto" }}
          width="10%"
        >
          <Center marginRight={1}>
            <Circle
              size="40px"
              background="#029690"
              borderBottom="3px solid #076460"
              color="white"
              fontWeight="bold"
            >
              &#xA3;
          </Circle>
          </Center>
          <Center marginRight={1}>
            <Circle
              size="40px"
              background="#029690"
              borderBottom="3px solid #076460"
              color="white"
              fontWeight="bold"
            >
              &#x20AC;
          </Circle>
          </Center>
          <Center marginRight={1}>
            <Circle
              size="40px"
              background="#029690"
              borderBottom="3px solid #076460"
              color="white"
              fontWeight="bold"
            >
              &#x24;
          </Circle>
          </Center>
          <Center marginRight={1}>
            <Circle
              size="40px"
              background="#029690"
              borderBottom="3px solid #076460"
              color="white"
              fontWeight="bold"
            >
              &#xa5;
          </Circle>
          </Center>
        </Box>
        <Box
          background="#ffffff"
          boxShadow="-1px 12px 26px -8px rgb(255 255 255 / 75%)"
          borderRadius={10}
          marginRight={{ base: "auto" }}
          marginLeft={{ base: "auto" }}
          paddingTop={10}
          paddingLeft={{ base: 10, md: 20 }}
          paddingRight={{ base: 10, md: 20 }}
          paddingBottom={{ base: 10, md: 20 }}
          position="absolute"
          width={{ base: "90%", md: "1200px" }}
          left={0}
          right={0}
          top={117}
        >
          <Box>
            <Box>
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
                  marginBottom={{
                    base: 10,
                    md: 0
                  }}
                >
                  <FormControl id="amount">
                    <FormLabel fontWeight="bold">Amount</FormLabel>
                    <InputGroup>
                      <InputLeftElement
                        pointerEvents="none"
                        color="gray.300"
                        fontSize="1.2em"
                      />
                      <Input
                        onChange={handleInputChange}
                        placeholder="Enter amount"
                        maxLength={8}
                        boxShadow="md"
                        required
                      />
                    </InputGroup>
                  </FormControl>
                  <Box color="#b30021">
                    {error && <Text position="absolute" fontSize="14">{error}</Text>}
                  </Box>
                </Box>
                <Box
                  display={{
                    base: "initial",
                    md: "flex"
                  }}
                  flex={2.1}
                >
                  <FormControl
                    id="from"
                    marginRight={5}
                    marginBottom={{
                      base: 5,
                      md: 0
                    }}
                  >
                    <FormLabel fontWeight="bold">From</FormLabel>
                    <InputGroup>
                      <Select
                        onChange={handleFromCurrencyChange}
                        boxShadow="md"
                        value={fromCurrency}
                      >
                        {currencies.map((currency: ICurrency, i: number) => <option key={i} value={currency.name}>{currency.flag} {currency.name}</option>)}
                      </Select>
                    </InputGroup>
                  </FormControl>
                  <Box
                    display="flex"
                    marginRight="5"
                    alignItems="end"
                    marginBottom={{
                      base: 5,
                      md: 0
                    }}
                  >
                    <Center>
                      <Circle
                        size="40px"
                        bg="cadetBlue"
                        color="white"
                        onClick={() => switchCurrencies()}
                        _hover={{
                          cursor: "pointer",
                          background: "#3c6567"
                        }}
                      >
                        <RiArrowLeftRightLine />
                      </Circle>
                    </Center>
                  </Box>
                  <FormControl id="to">
                    <FormLabel fontWeight="bold">To</FormLabel>
                    <InputGroup>
                      <Select
                        onChange={handleToCurrencyChange}
                        boxShadow="md"
                        value={toCurrency}
                      >
                        {currencies.map((currency: ICurrency, i: number) => <option key={i} value={currency.name}>{currency.flag} {currency.name}</option>)}
                      </Select>
                    </InputGroup>
                  </FormControl>
                </Box>
              </Box>
            </Box>
          </Box>
          <Divider marginTop="8" marginBottom="8" />
          {displayConversion()}
        </Box>
      </Box>
    </>
  );
}

export default App;
