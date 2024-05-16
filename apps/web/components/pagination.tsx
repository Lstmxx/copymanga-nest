"use client";

import { useSearchParams } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";

import { Input } from "./ui/input";

import { useRouter } from "next/navigation";
import { updateListSearchParams } from "@/lib/comic";
import { Button } from "./ui/button";
import { ChangeEventHandler, useEffect, useState } from "react";

export default function CustomPagination({
  total,
  limit,
  handlePre,
  handleNext,
  handleJump,
}: {
  total: number;
  limit: number;
  handlePre: (page: number) => void;
  handleNext: (page: number) => void;
  handleJump: (page: number) => void;
}) {
  const router = useRouter();

  const params = useSearchParams();
  const currentPage = Number(params.get("page") || 1);

  const isPreDisable = currentPage === 1;
  const pre = () => {
    if (isPreDisable) return;
    const newPage = Math.max(currentPage - 1, 1);
    handlePre(newPage);
  };

  const maxPage = Math.ceil(total / limit);
  const isNextDisable = currentPage >= maxPage;

  console.log("page", currentPage);
  console.log("total", total);
  const next = () => {
    if (isNextDisable) return;
    const newPage = Math.min(currentPage + 1, maxPage);
    handleNext(newPage);
  };

  const [page, setPage] = useState(currentPage);
  useEffect(() => {
    setPage(currentPage);
  }, [currentPage]);
  const handleChangePage: ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.target.value;
    const onlyNumberRegex = new RegExp(/^[0-9]*$/);
    if (onlyNumberRegex.test(value)) {
      setPage(Math.min(Math.max(Number(value), 1), maxPage));
    }
  };

  const jump = () => {
    handleJump(page);
  };
  return (
    <Pagination className="flex justify-end container py-2">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className={`${isPreDisable ? "text-muted-foreground hover:bg-white hover:text-muted-foreground cursor-not-allowed" : "cursor-pointer"}`}
            onClick={pre}
          />
        </PaginationItem>
        <PaginationItem>
          <div className="flex gap-2 items-center">
            <Input
              className="w-[80px]"
              value={page}
              min={1}
              max={maxPage}
              onChange={handleChangePage}
            />
            / {maxPage}
            <Button onClick={jump}>GO</Button>
          </div>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            className={`${isNextDisable ? "text-muted-foreground hover:bg-white hover:text-muted-foreground cursor-not-allowed" : "cursor-pointer"}`}
            onClick={next}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}