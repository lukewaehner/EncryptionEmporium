"use client";
import React from "react";
import { Divider } from "@nextui-org/react";
import LaTeXRenderer from "../components/Latexrendered";
import KeyGen from "./keyGen";

const latexStr = "(m^e)^d \\equiv m (mod n)";
export default function RSA() {
  return (
    <div className="text-center">
      <div className="mt-2 flex flex-col align-center display-center">
        <h1 className="mb-2 text-3xl">RSA</h1>
        <p className="mb-4 ">
          {" "}
          The RSA algorithm is one of the most famed public-key encryption
          methods. The term "RSA" comes form the initials of Ron Rivert, Adi
          Shamir, and Leonard Adleman who described the algorithm in 1977,
          albeit secretly developed by the British signals intellgence agency.
        </p>
        <Divider />
        <p className="mt-2">
          The RSA algorithm involves four steps: generating a key, distributing
          it, encrypting the message, and decrypting the message.{" "}
        </p>
        <p className="mt-2">
          {" "}
          The algorithm is based around the face that it is practical to find
          three very large positivef integers <i>e</i>, <i>d</i>, and <i>n</i>,
          such that for all integers <i>m </i> both{" "}
          <LaTeXRenderer latex={latexStr} />. But, when given only <i>e</i> and{" "}
          <i>n</i>, it is computationally expensive to find d.
        </p>
        <p className="mt-2">
          Integers <i>n</i> and <i>e</i> represent the public key, <i>d</i>{" "}
          represents the private key, and <i>m</i> represents the message.
        </p>
        {/* Actual algorithm happens after this divider */}
        <Divider className="mt-2" />
        <KeyGen />
      </div>
    </div>
  );
}
