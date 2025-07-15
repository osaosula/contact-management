"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { AgGridReact } from "ag-grid-react";
import {
  CellValueChangedEvent,
  ColDef,
  GridReadyEvent,
  ICellRendererParams,
} from "ag-grid-community";
import { useState, useMemo, useCallback } from "react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { Contact } from "@/model/Contact";
import { deleteContact, updateContact } from "@/app/contacts/add/actions";
import Link from "next/link";
import { format } from "date-fns";
import toast from "react-hot-toast";

ModuleRegistry.registerModules([AllCommunityModule]);

export default function DisplayContacts({
  contacts,
}: {
  contacts: Contact[] | null;
}) {
  const router = useRouter();

  const dateComp = (p: { value: string | Date }) => {
    const date = new Date(p.value);

    return <>{format(date, "MMMM d, yyyy")}</>;
  };

  // Column Definitions: Defines the columns to be displayed.
  const [columnDefs] = useState<ColDef<Contact>[]>([
    {
      field: "name",
      headerName: "Name",
      flex: 2, // Takes up 2 parts of available space
      editable: true, // Enable inline editing for this column
      filter: true, // Enable filtering
      valueGetter: (params) => params?.data?.name || params?.data?.name, // Use full_name, fallback to name
    },
    {
      field: "email",
      headerName: "Email",
      flex: 3,
      editable: true,
      filter: true,
    },
    {
      field: "created_at",
      headerName: "Date created",
      cellRenderer: dateComp,
      flex: 2,
      editable: false,
      filter: true,
    },
    {
      headerName: "Actions",
      colId: "actions",
      flex: 1,
      cellRenderer: (params: ICellRendererParams<Contact>) => (
        <div className="flex items-center h-full">
          <Link
            href="#" // Implement your delete logic here
            onClick={(e) => {
              e.preventDefault();
              // Example: Implement a delete function
              //console.log("Delete contact:", params.data);
              const id = params.data?.id as string;
              doDelete(id);
              // You would typically call an API here to delete the contact
            }}
            className="text-red-600 hover:text-red-900"
          >
            Delete
          </Link>
        </div>
      ),
      // Prevent actions column from being sortable or filterable
      sortable: false,
      filter: false,
      resizable: false,
      cellClass: "ag-cell-actions", // Custom class for styling
    },
  ]);

  // Default Column Definition: Applied to all columns unless overridden.
  const defaultColDef = useMemo<ColDef>(() => {
    return {
      // Set every column to be sortable
      sortable: true,
      // Enable resizing for all columns
      resizable: true,
      // Enable text filtering by default
      filter: true,
      // Make all columns editable by default, can be overridden by individual columnDefs
      editable: false,
    };
  }, []);

  // Callback to set grid API when the grid is ready
  const onGridReady = useCallback((params: GridReadyEvent) => {
    params.api.sizeColumnsToFit();
  }, []);

  // Handle cell editing
  const onCellValueChanged = useCallback(
    (event: CellValueChangedEvent<Contact>) => {
      const changedValue = event.data;

      updateContact(changedValue);

      toast.success("Contact updated successfully");
      router.refresh();
    },
    [router]
  );

  const doDelete = (id: string) => {
    deleteContact(id);
    toast.success("Contact deleted successfully");
    router.refresh();
  };

  return (
    <div className="w-full max-w-3xl bg-gray-50 p-6 rounded-lg shadow-xl border border-gray-200 mx-auto mt-32">
      <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
        Your Contacts
      </h2>

      <Button
        className="flex mx-auto mb-2"
        onClick={() => router.push("/contacts/add")}
      >
        Add new contact
      </Button>

      {contacts === null || contacts.length === 0 ? (
        <div className="text-center p-8 bg-gray-50 rounded-md border border-blue-200 text-black">
          <p className="text-lg mb-4">You do not have any contacts yet.</p>
          <Button
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-black hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            onClick={() => router.push("/contacts/add/")}
          >
            Add New Contact
            <svg
              className="ml-2 -mr-1 h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
          </Button>
        </div>
      ) : (
        // ADDED ag-theme-quartz CLASS HERE
        <div className="ag-theme-quartz w-full h-[600px]">
          <AgGridReact
            rowData={contacts} // Your contact data
            columnDefs={columnDefs} // Column definitions
            defaultColDef={defaultColDef} // Default column properties
            onGridReady={onGridReady} // Callback when grid is ready
            onCellValueChanged={onCellValueChanged} // Handle cell edit changes
            pagination={true} // Enable pagination
            paginationPageSize={10} // Set page size to 10
            paginationPageSizeSelector={[10, 25, 50]} // Allow user to change page size
            // Other optional properties for styling and features
            animateRows={true} // Animate row changes
          />
        </div>
      )}
    </div>
  );
}
