"use client";
import React from "react";
import { Divider, Card, CardBody } from "@nextui-org/react";
import { useRouter } from "next/navigation";

// Define a type for the card items
interface CardItem {
  title: string;
  description: string;
  href: string;
}

// Define the array of card items with the specified type
const cards: CardItem[] = [
  { title: "RSA", description: "Description 1", href: "/rsa" },
  { title: "AES", description: "Description 2", href: "/aes" },
  { title: "SHA-256", description: "Description 3", href: "/sha-256" },
];

export default function Home() {
  const router = useRouter();

  // Explicitly type the href parameter as a string
  const handleCardClick = (href: string) => {
    router.push(href);
  };

  return (
    <div>
      <Divider />
      <section className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((item, index) => (
          <Card
            key={index}
            shadow="sm"
            isPressable
            disableAnimation
            isHoverable
            onClick={() => handleCardClick(item.href)}
          >
            <CardBody className="text-center">
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p>{item.description}</p>
            </CardBody>
          </Card>
        ))}
      </section>
    </div>
  );
}
