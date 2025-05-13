"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from "@/components/ui/table";
import AddFormDialog from "@/src/features/custom-questions/add-form-dialog";
import { useEffect } from "react";
import { useState } from "react";
export default function CustomQuestionsPage() {


  const fetchData = async () => {
    const response = await fetch('/api/custom-questions');
    const data = await response.json();
    setData(data);
  };
  
  const [data, setData] = useState<any[]>([
    {
      id: "sample-id-1",
      form: "Onboarding Questions",
      status: "Active",
      category: "General",
      frequency: "Once",
      conditionalLogic: "None",
    },
  ]);

  useEffect(() => {
    fetchData();
  }, []); 

  return (
    <div className="">
      <div className="">
        <div className="">
          <div className="mt-4 flex items-center gap-2">
            <Input type="search" placeholder="Search forms..." className="w-full flex-grow" />
            <AddFormDialog onFormAdded={() => {
              // Refresh the data after adding a new form
              fetchData();
            }}  />
          </div>    
        </div>
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="sm:pl-0">Form</TableHead>
                    <TableHead>ID</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Frequency</TableHead>
                    <TableHead>Conditional Logic</TableHead>
                    <TableHead className="relative sm:pr-0">
                      <span className="sr-only">Actions</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.map((data) => (
                    <TableRow key={data.id}>
                      <TableCell className="font-medium sm:pl-0">{data.form}</TableCell>
                      <TableCell>{data.id}</TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${
                            data.status === "Active"
                              ? "bg-green-50 text-green-700 ring-green-600/20"
                              : "bg-red-50 text-red-700 ring-red-600/20" // Example for Inactive
                          }`}
                        >
                            {data.status}
                        </span>
                      </TableCell>
                      <TableCell>{data.category}</TableCell>
                      <TableCell>{data.frequency}</TableCell>
                      <TableCell>{data.conditionalLogic}</TableCell>
                      <TableCell className="text-right sm:pr-0">
                        <Button variant="link" className="text-indigo-600 hover:text-indigo-900 h-auto p-0">
                          Edit<span className="sr-only">, {data.form}</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                {/* You can add TableFooter here if needed */}
              </Table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
