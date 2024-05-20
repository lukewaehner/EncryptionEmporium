"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";
import Link from "next/link";

const BreadcrumbComponent: React.FC = () => {
  const pathname = usePathname();
  const pathnames = pathname.split("/").filter((x) => x);

  return (
    <Breadcrumbs>
      <BreadcrumbItem>
        <Link href="/">Home</Link>
      </BreadcrumbItem>
      {pathnames.map((value, index) => {
        const href = `/${pathnames.slice(0, index + 1).join("/")}`;
        return (
          <BreadcrumbItem key={index}>
            <Link href={href}>{value.toUpperCase()}</Link>
          </BreadcrumbItem>
        );
      })}
    </Breadcrumbs>
  );
};

export default BreadcrumbComponent;
