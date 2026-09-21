"use client";

import { useMemo, useState } from "react";
import { Button, CircularProgress } from "@mui/material";
import { Plus } from "lucide-react";

import { useCreateTableMutation } from "@/features/dashboard/api/tableApi";

import TablesPageTableModal from "./TablesPageTableModal";
import { useGetBranchesQuery } from "@/features/restaurant/api/restaurantApi";

export default function TablesPageAddTableButton() {
  const [open, setOpen] = useState(false);

  const {
    data: branchesData,
    isLoading: isBranchesLoading,
    isError: isBranchesError,
  } = useGetBranchesQuery();

  const activeBranch = useMemo(() => {
    return branchesData?.results.find((branch) => branch.is_default);
  }, [branchesData]);

  const [createTable, { isLoading: isCreating }] =
    useCreateTableMutation();

  const handleSubmit = async (data: {
    name: string;
    number: number;
    capacity: number;
  }) => {
    if (!activeBranch) {
      return;
    }

    try {
      await createTable({
        branch: activeBranch.id,
        name: data.name,
        number: data.number,
        capacity: data.capacity,
      }).unwrap();

      setOpen(false);
    } catch (error) {
      console.error("Create table failed:", error);
    }
  };

  if (isBranchesLoading) {
    return (
      <Button
        variant="contained"
        disabled
        endIcon={<Plus size={18} />}
      >
        <CircularProgress size={16} color="inherit" />
      </Button>
    );
  }

  if (isBranchesError || !activeBranch) {
    return (
      <Button
        variant="contained"
        disabled
        endIcon={<Plus size={18} />}
      >
        افزودن میز
      </Button>
    );
  }

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
        isSubmitting={isCreating}
      />
    </>
  );
}