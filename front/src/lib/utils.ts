import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateEllipsisPagination(
  currentPage: number,
  totalPages: number,
  surroundingPages = 1
) {
  const pages: (number | string)[] = [];

  for (let i = 1; i <= totalPages; i++) {
    const isFirstPage = i === 1;
    const isLastPage = i === totalPages;
    const isWithinLowerBound = i >= (currentPage - surroundingPages);
    const isWithinUpperBound = i <= (currentPage + surroundingPages);
    const isEllipsisPosition = (
      i === currentPage - surroundingPages - 1 ||
      i === currentPage + surroundingPages + 1
    );

    if (isEllipsisPosition && !isFirstPage && !isLastPage) {
      pages.push('...');
      continue;
    }

    if ((isFirstPage || isLastPage) || (isWithinLowerBound && isWithinUpperBound)) {
      pages.push(i);
    }
  }

  return pages;
}

export function formatedDate(date: string) {
  const getDate = date.split("-")
  const day = getDate[2].split("T")
  const dateFormated = getDate[0] + '-' + getDate[1] + '-' + day[0];

  return dateFormated;
}
