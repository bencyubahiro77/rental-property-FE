import {
  Pagination as PaginationWrapper,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { paginationProps } from "@/types/types";

const Pagination: React.FC<paginationProps> = ({ currentPage, totalPages, onPageCHange }) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageCHange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageCHange(currentPage + 1);
    }
  };

  return (
    <div className="mt-4 flex justify-center mb-4">
      <PaginationWrapper>
        <PaginationContent>
          <PaginationItem className="cursor-pointer">
            <PaginationPrevious onClick={handlePrevious} />
          </PaginationItem>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <PaginationItem key={page} className={page === currentPage ? "bg-gray-200 font-bold text-black rounded-xl cursor-pointer" : "cursor-pointer"}>
              <PaginationLink onClick={() => onPageCHange(page)}>{page}</PaginationLink>
            </PaginationItem>
          ))}
          {totalPages > 5 && <PaginationEllipsis />}
          <PaginationItem className="cursor-pointer">
            <PaginationNext onClick={handleNext} />
          </PaginationItem>
        </PaginationContent>
      </PaginationWrapper>
    </div>
  );
};

export default Pagination;