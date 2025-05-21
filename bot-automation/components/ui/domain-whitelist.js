"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "./toast-provider";
import Link from "next/link";
import { SquareArrowOutUpRight, Trash } from "lucide-react";

export const DomainWhitelist = ({
  domains = [],
  onAdd,
  onChange,
  onRemove,
}) => {
  const [newDomain, setNewDomain] = useState("");
  const showToast = useToast();
  const [isValidDomain, setIsValidDomain] = useState(false);

  const normalizeDomain = (domain) => {
    return domain
      .replace(/^(https?:\/\/)?(www\.)?/, "") // Remove protocol and www
      .split("/")[0] // Remove paths
      .toLowerCase() // Case insensitive
      .trim(); // Remove whitespace
  };

  // Domain validation function
  const validateDomain = (domain) => {
    if (!domain.trim()) return false;

    // Basic domain validation regex
    const domainRegex =
      /^(?!:\/\/)([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;

    const normalizedInput = normalizeDomain(domain);

    if (!domainRegex.test(normalizedInput)) {
      return false;
    }
    const isDuplicate = domains.some(
      (existingDomain) => normalizeDomain(existingDomain) === normalizedInput
    );
    if (isDuplicate) {
      showToast({
        title: "Already Exist",
        description: "This domain is already in the list",
        variant: "warning",
      });
      return false;
    }

    return true;
  };

  const handleDomainChange = (e) => {
    const value = e.target.value;
    setNewDomain(value);
    setIsValidDomain(validateDomain(value));
  };

  const handleAddDomain = () => {
    if (!isValidDomain) return;

    let domainToAdd = newDomain.trim();

    // Ensure the domain starts with https://
    if (
      !domainToAdd.startsWith("http://") &&
      !domainToAdd.startsWith("https://")
    ) {
      domainToAdd = `https://${domainToAdd}`;
    }

    onAdd(domainToAdd);
    setNewDomain("");
    setIsValidDomain(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && isValidDomain) {
      e.preventDefault();
      handleAddDomain();
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <Input
          value={newDomain}
          onChange={handleDomainChange}
          onKeyDown={handleKeyDown}
          placeholder="Enter domain (e.g., example.com)"
        />
        <Button onClick={handleAddDomain} disabled={!isValidDomain}>
          Add
        </Button>
      </div>

      <div className="space-y-1">
        {domains.map((domain, index) => (
          <div
            key={index}
            className="flex items-center justify-between bg-muted p-2 rounded"
          >
            <Input
              value={domain}
              onChange={(e) => onChange(index, e.target.value)}
              className="border text-gray-900 dark:text-gray-200 bg-transparent shadow-none flex-1"
            />

            <div className="gap-1 flex items-center">
              <Link
                href={`${domain}`}
                target="__blank"
                className="inline-flex items-center h-9 text-sm justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-0 disabled:opacity-50 disabled:pointer-events-none bg-transparent px-2 hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-gray-100 data-[state=open]:bg-transparent"
              >
                <SquareArrowOutUpRight size={14} />
              </Link>
              <Button variant="ghost" size="sm" onClick={() => onRemove(index)}>
                <Trash size={14} />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
