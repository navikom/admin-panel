import React from "react";

export interface IPagination {
  count: number;
  viewPage: number;
  viewRowsPerPage: number;
  rowsPerPageOptions: number[];
  reachedBottom(scrollTop: number, height: number): Promise<void>;
  handleChangePageInView(event: React.MouseEvent<HTMLButtonElement> | null, newPage: number): void;
  handleChangeRowsPerPage(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void;
}
