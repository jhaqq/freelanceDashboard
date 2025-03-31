"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { UpdateInvoice, DeleteInvoice } from "./buttons";
import InvoiceStatus from "./status";
import { formatCurrency, formatDateToLocal } from "@/app/lib/utils";
import { InvoiceRaw } from "@/app/lib/definitions";
import clsx from "clsx";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/solid";


export default function InvoicesTable({
  query,
  invoices,
}: {
  query: string;
  invoices: InvoiceRaw[];
}) {
  const [filteredSelection, setFilteredSelection] = useState("all");
  const [sortDateSelection, setSortDateSelection] = useState("");
  const [sortAmountSelection, setSortAmountSelection] = useState("")
  const [alteredInvoices, setAlteredInvoices] = useState(invoices);
  const [displayInvoices, setDisplayInvoices] = useState(invoices)
  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 6;

  //Handle filtering and sorting on press
  const handleSelections = (
    filter: string,
    sortDate: string,
    sortAmount: string,
    invoices: InvoiceRaw[]
  ) => {
    let filteredInvoices = invoices;

    if (filter != "all") {
      filteredInvoices = filteredInvoices.filter(
        (invoice) => invoice.status == filter
      );
    }

    if (sortDate === "Newest First") {
      filteredInvoices.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    } else if (sortDate === "Oldest First") {
      filteredInvoices.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      );
    }

    if (sortAmount === "Highest Amount") {
      filteredInvoices.sort((a, b) => b.amount - a.amount);
    } else if (sortAmount === "Lowest Amount") {
      filteredInvoices.sort((a, b) => a.amount - b.amount);
    }
    
    return filteredInvoices;
  };

  // When seletions are made, execute function
  useEffect(() => {
    const updatedInvoices = handleSelections(
      filteredSelection,
      sortDateSelection,
      sortAmountSelection,
      invoices
    );

    console.log(updatedInvoices.length)
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    setAlteredInvoices(updatedInvoices);
    setDisplayInvoices(updatedInvoices.slice(startIndex, endIndex))
  }, [filteredSelection, sortDateSelection, sortAmountSelection, currentPage, invoices]);

  const totalPages = Math.ceil(alteredInvoices.length / ITEMS_PER_PAGE)

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2">
          <div className="gap-4 px-3 py-4 flex flex-wrap sm:flex xs:items-center xs:justify-center md:justify-start">
            <button
              className={clsx(
                "py-2 px-4 bg-gray-50 border rounded-full h-7.5 flex items-center",
                {
                  "bg-yellow-100 text-yellow-600":
                    filteredSelection == "all" && (sortDateSelection == "" && sortAmountSelection == "") ,
                }
              )}
              onClick={() => {
                setFilteredSelection("all");
                setSortDateSelection("");
                setSortAmountSelection("")
                setCurrentPage(1);
              }}
            >
              <p className="text-sm">All</p>
            </button>
            <div className="hidden sm:flex items-center">
              <p>|</p>
            </div>
            <button
              className={clsx(
                "py-2 px-4 bg-gray-50 border rounded-full h-7.5 flex items-center",
                {
                  "bg-yellow-100 text-yellow-600":
                    filteredSelection == "pending",
                }
              )}
              onClick={() => {
                setFilteredSelection("pending");
                setCurrentPage(1);
              }}
            >
              <p className="text-sm">Pending</p>
            </button>
            <button
              className={clsx(
                "py-2 px-4 bg-gray-50 border rounded-full h-7.5 flex items-center",
                {
                  "bg-yellow-100 text-yellow-600": filteredSelection == "paid",
                }
              )}
              onClick={() => {
                setFilteredSelection("paid");
                setCurrentPage(1);
              }}
            >
              <p className="text-sm">Paid</p>
            </button>
            <div className="hidden sm:flex items-center">
              <p>|</p>
            </div>
            <button
              className={clsx(
                "py-2 px-4 bg-gray-50 border rounded-full h-7.5 flex items-center",
                {
                  "bg-yellow-100 text-yellow-600":
                    sortAmountSelection == "Highest Amount",
                }
              )}
              onClick={() => {
                setSortAmountSelection("Highest Amount");
                setCurrentPage(1);
              }}
            >
              <p className="text-sm">Highest Amount</p>
            </button>
            <button
              className={clsx(
                "py-2 px-4 bg-gray-50 border rounded-full h-7.5 flex items-center",
                {
                  "bg-yellow-100 text-yellow-600":
                    sortAmountSelection == "Lowest Amount",
                }
              )}
              onClick={() => {
                setSortAmountSelection("Lowest Amount");
                setCurrentPage(1);
              }}
            >
              <p className="text-sm">Lowest Amount</p>
            </button>
            <div className="hidden sm:flex items-center">
              <p>|</p>
            </div>
            <button
              className={clsx(
                "py-2 px-4 bg-gray-50 border rounded-full h-7.5 flex items-center",
                {
                  "bg-yellow-100 text-yellow-600":
                    sortDateSelection == "Newest First",
                }
              )}
              onClick={() => {
                setSortDateSelection("Newest First");
                setCurrentPage(1);
              }}
            >
              <p className="text-sm">Newest First</p>
            </button>
            <button
              className={clsx(
                "py-2 px-4 bg-gray-50 border rounded-full h-7.5 flex items-center",
                {
                  "bg-yellow-100 text-yellow-600":
                    sortDateSelection == "Oldest First",
                }
              )}
              onClick={() => {
                setSortDateSelection("Oldest First");
                setCurrentPage(1);
              }}
            >
              <p className="text-sm">Oldest First</p>
            </button>
          </div>
          <div className="md:hidden">
            {displayInvoices?.map((invoice, index) => (
              <div key={index} className="mb-2 w-full rounded-md bg-white p-4">
                <div className="flex items-center justify-between border-b border-gray-300 pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <Image
                        src={invoice.image_url}
                        className="mr-2 rounded-full"
                        width={28}
                        height={28}
                        alt={`${invoice.name}'s profile picture`}
                      />
                      <p>{invoice.name}</p>
                    </div>
                    <p className="text-sm text-gray-500">{invoice.email}</p>
                  </div>
                  <InvoiceStatus status={invoice.status} />
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">
                      {formatCurrency(invoice.amount)}
                    </p>
                    <p>{formatDateToLocal(invoice.date)}</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdateInvoice id={invoice.id} />
                    <DeleteInvoice id={invoice.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Customer
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Email
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Amount
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Date
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Status
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {displayInvoices.length > 0 ? (
                displayInvoices.map((invoice, index) => (
                  <tr
                    key={index}
                    className="w-full border-b border-gray-200 py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                  >
                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                      <div className="flex items-center gap-3">
                        <Image
                          className="rounded-full"
                          alt="Profile Picture"
                          src={invoice.image_url}
                          width={28}
                          height={28}
                        />
                        <p className="capitalize">{invoice.name}</p>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      {invoice.email}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      {formatCurrency(invoice.amount)}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      {formatDateToLocal(invoice.date)}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3 capitalize">
                      {invoice.status}
                    </td>
                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                      <div className="flex justify-end gap-3">
                        <UpdateInvoice id={invoice.id} />
                        <DeleteInvoice id={invoice.id} />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="w-full py-3 text-center">
                    <p className="text-gray-500">No results found</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="mt-4 flex justify-center items-center">
        <button
          className={clsx(
            "flex h-10 w-10 items-center justify-center rounded-md border mr-2 md:mr-4",
            {
              "pointer-events-none text-gray-300": currentPage <= 1,
              "hover:bg-gray-100": currentPage > 1,
            }
          )}
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        >
          <ArrowLeftIcon className="w-4" />
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            className={clsx(
              "flex h-10 w-10 items-center justify-center text-sm border-black",
              {
                "rounded-l-md": i == 0 || totalPages == 1,
                "rounded-r-md": i == totalPages - 1 || totalPages == 1,
                "bg-blue-500 text-white": currentPage == i + 1
              }
            )}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
        <button
          disabled={currentPage === totalPages}
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          className="flex h-10 w-10 items-center justify-center rounded-md border ml-2 md:ml-4 disabled:text-gray-300"
        >
          <ArrowRightIcon className="w-4" />
        </button>
      </div>
    </div>
  );
}
