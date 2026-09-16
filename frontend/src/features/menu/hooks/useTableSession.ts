"use client";

import { useEffect, useState } from "react";

import {
  useCreateTableSessionMutation,
  useLazyResolveTableQuery,
} from "../api/tableSessionApi";

type TableInfo = {
  table_id: string;
  table_name: string;
  branch_id: string;
};

export function useTableSession(
  qrToken?: string,
) {
  const [sessionToken, setSessionToken] =
    useState<string | null>(null);

  const [table, setTable] =
    useState<TableInfo | null>(null);

  const [error, setError] =
    useState(false);

  const [resolveTable, { isFetching: isResolving }] =
    useLazyResolveTableQuery();

  const [
    createTableSession,
    { isLoading: isCreating },
  ] = useCreateTableSessionMutation();

  useEffect(() => {
    if (!qrToken) {
      return;
    }

    let cancelled = false;

    async function initializeSession() {
      try {
        setError(false);

        const resolvedTable =
          await resolveTable(qrToken).unwrap();

        const session =
          await createTableSession({
            qr_token: qrToken,
          }).unwrap();

        if (cancelled) {
          return;
        }

        setTable({
          table_id: resolvedTable.table_id,
          table_name: resolvedTable.table_name,
          branch_id: resolvedTable.branch_id,
        });

        setSessionToken(
          session.session_token,
        );
      } catch (error) {
        if (cancelled) {
          return;
        }

        console.error(
          "Table session initialization failed:",
          error,
        );

        setError(true);
      }
    }

    initializeSession();

    return () => {
      cancelled = true;
    };
  }, [
    qrToken,
    resolveTable,
    createTableSession,
  ]);

  return {
    sessionToken,
    table,

    isLoading:
      isResolving || isCreating,

    isError: error,
  };
}
