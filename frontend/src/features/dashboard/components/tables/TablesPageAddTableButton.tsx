"use client";

import { useState } from "react";
import { Button } from "@mui/material";
import { Plus } from "lucide-react";
import { DashboardTable } from "../../types/tables/tables.type";
import TablesPageTableModal from "./TablesPageTableModal";


export default function TablesPageAddTableButton() {
  const [open, setOpen] = useState(false);

  const handleSubmit = (
    data: Pick<DashboardTable, "number" | "status">,
  ) => {
    console.log("New table:", data);
  };

  return (
    <>
      <Button
        variant="contained"
        endIcon={<Plus size={18} />}
        onClick={() => setOpen(true)}
      >
        افزودن میز
      </Button>

      <TablesPageTableModal
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={handleSubmit}
      />
    </>
  );
}