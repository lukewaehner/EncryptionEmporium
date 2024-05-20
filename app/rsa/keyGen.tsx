import React, { useState, useEffect, useMemo } from "react";
import { Input, Select, SelectItem } from "@nextui-org/react";
import LaTeXRenderer from "../components/Latexrendered";
import {
  modularExponentation,
  modularInverse,
  extendedEuclideanAlgorithm,
} from "./mathassets";

const primes = [10501, 21269, 61, 53, 47, 43, 37, 31, 29, 23, 19, 17];
const latexPhi = "\\varphi = (p-1)(q-1)";
const latexD = "d = e^{-1} \\ (mod \\ \\varphi )";

const gcd = (a: number, b: number): number => {
  while (b) {
    [a, b] = [b, a % b];
  }
  return a;
};

const isCoprime = (a: number, b: number): boolean => {
  return gcd(a, b) === 1;
};

const generatePossibleEValues = (phi: number) => {
  const eValues = [];
  for (let i = 2; i < phi; i++) {
    if (isCoprime(i, phi)) {
      eValues.push(i);
    }
  }
  return eValues;
};

const messageToInteger = (message: string): number => {
  return Array.from(message).reduce((acc, char, index) => {
    return acc + char.charCodeAt(0) * Math.pow(256, message.length - 1 - index);
  }, 0);
};

const integerToMessage = (integer: number): string => {
  let message = "";
  while (integer > 0) {
    message = String.fromCharCode(integer % 256) + message;
    integer = Math.floor(integer / 256);
  }
  return message;
};

const KeyGen: React.FC = () => {
  const [valueP, setValueP] = useState<number | null>(null);
  const [valueQ, setValueQ] = useState<number | null>(null);
  const [valueE, setValueE] = useState<number | null>(null);
  const [phi, setPhi] = useState<number | null>(null);
  const [n, setN] = useState<number | null>(null);
  const [possibleEValues, setPossibleEValues] = useState<number[]>([]);
  const [pAndQSelected, setPAndQSelected] = useState(false);
  const [eSelected, setESelected] = useState(false);
  const [m, setM] = useState("");

  useEffect(() => {
    if (valueP && valueQ) {
      const nValue = valueP * valueQ;
      const phiValue = (valueP - 1) * (valueQ - 1);
      setN(nValue);
      setPhi(phiValue);
      setPossibleEValues(generatePossibleEValues(phiValue));
      setPAndQSelected(true);
    }
  }, [valueP, valueQ]);

  const handleSelectionChangeP = (keys: any) => {
    const selectedKey = Array.from(keys)[0] as string;
    setValueP(Number(selectedKey));
  };

  const handleSelectionChangeQ = (keys: any) => {
    const selectedKey = Array.from(keys)[0] as string;
    setValueQ(Number(selectedKey));
  };

  const handleSelectionChangeE = (keys: any) => {
    const selectedKey = Array.from(keys)[0] as string;
    setValueE(Number(selectedKey));
    setESelected(true); // Disable the selector once 'e' is selected
  };

  const isInvalidMessage = useMemo(() => {
    if (m === "") return true;
    if (m.length > 5) return true;
    return false;
  }, [m]);

  const calculateCiphertext = () => {
    if (valueE !== null && n !== null) {
      const messageInteger = messageToInteger(m);
      return modularExponentation(messageInteger, valueE, n);
    }
    return null;
  };

  const ciphertext = useMemo(calculateCiphertext, [m, valueE, n]);

  const calculateDecryption = () => {
    if (ciphertext !== null && valueE !== null && phi !== null && n !== null) {
      const d = modularInverse(valueE, phi);
      const decryptedInteger = modularExponentation(ciphertext, d, n);
      return integerToMessage(decryptedInteger);
    }
    return null;
  };

  const decryptedMessage = useMemo(calculateDecryption, [
    ciphertext,
    valueE,
    phi,
    n,
  ]);

  return (
    <div>
      <h3 className="text-2xl">Key Generation</h3>
      <div>
        <p className="mb-2 mt-4">
          Select two prime numbers <i>p</i> and <i>q</i>:
        </p>
        <div className="flex items-center m-2 justify-center space-x-4">
          <Select
            label="Select a prime p"
            className="max-w-40"
            size="sm"
            selectedKeys={
              valueP !== null ? new Set([valueP.toString()]) : new Set()
            }
            onSelectionChange={handleSelectionChangeP}
            isDisabled={pAndQSelected}
          >
            {primes.map((prime) => (
              <SelectItem key={prime.toString()} value={prime.toString()}>
                {prime.toString()}
              </SelectItem>
            ))}
          </Select>
          <Select
            label="Select a prime q"
            className="max-w-40"
            size="sm"
            selectedKeys={
              valueQ !== null ? new Set([valueQ.toString()]) : new Set()
            }
            onSelectionChange={handleSelectionChangeQ}
            isDisabled={pAndQSelected}
          >
            {primes.map((prime) => (
              <SelectItem key={prime.toString()} value={prime.toString()}>
                {prime.toString()}
              </SelectItem>
            ))}
          </Select>
        </div>
      </div>
      {pAndQSelected && (
        <div>
          <h4>Calculated Values</h4>
          <p>
            <i>n:</i> {n}
          </p>
          <p>
            <LaTeXRenderer latex=" \varphi" className="font-bold" />: {phi}
          </p>
          <p className="mb-2 mt-4">
            Select an encryption exponent <i>e</i>:
          </p>
          <Select
            label="Select e"
            className="max-w-40"
            size="sm"
            selectedKeys={
              valueE !== null ? new Set([valueE.toString()]) : new Set()
            }
            onSelectionChange={handleSelectionChangeE}
            isDisabled={eSelected}
          >
            {possibleEValues.map((e) => (
              <SelectItem key={e.toString()} value={e.toString()}>
                {e.toString()}
              </SelectItem>
            ))}
          </Select>
        </div>
      )}
      {valueE && (
        <div className="flex flex-col items-center justify-center mt-4">
          <p>
            An outside source encrypts a message using the public key <i>n</i>{" "}
            and <i>e</i> that is published. <br />
            This can be a text-based message that is converted into an integer
            using the ASCII decimal system{" "}
            <LaTeXRenderer latex={"c=m^e \\ (mod n)"} />
          </p>
          <Input
            label="Enter a message"
            placeholder="Enter a message to encrypt"
            size="sm"
            value={m}
            onChange={(e) => setM(e.target.value)}
            isInvalid={isInvalidMessage}
            color={isInvalidMessage ? "danger" : "success"}
            errorMessage={
              isInvalidMessage
                ? "Please enter a message less than 6 characters"
                : ""
            }
            className="max-w-40 mt-4"
            spellCheck={false}
          />
        </div>
      )}
      {!isInvalidMessage && (
        <div>
          <p>
            The message <i>m</i> is converted to an integer using ASCII decimal
            system: {messageToInteger(m)} <br />
            The message is then encrypted using the formula{" "}
            <LaTeXRenderer latex={"c=m^e\\pmod{n}"} /> <br />
            So <i>c</i> becomes: {Number(ciphertext)}
          </p>
          <p className="mt-4">
            This is then sent to the recipient who can decrypt the message using
            the private key they created <br />
            (in this case it is us) <br />
            <LaTeXRenderer latex={latexPhi} /> and{" "}
            <LaTeXRenderer latex={latexD} />.
          </p>
          <p className="mt-4">
            To get back the ciphertext <i>c</i> we use the formula <br />
            <LaTeXRenderer latex={"m=c^d\\pmod{n}"} />
          </p>
          <p>
            The recipient can then convert the integer back to the message using
            the ASCII decimal system.
          </p>
        </div>
      )}
    </div>
  );
};

export default KeyGen;
