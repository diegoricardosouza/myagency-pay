import { generateEllipsisPagination } from "@/lib/utils"
import { Spinner } from "@/view/components/Spinner"
import { Button } from "@/view/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/view/components/ui/card"
import { Pagination, PaginationButton, PaginationContent, PaginationEllipsis, PaginationItem, PaginationNext, PaginationPrevious } from "@/view/components/ui/pagination"
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/view/components/ui/table"
import { PlusCircle } from "lucide-react"
import { useMemo } from "react"
import { Link } from "react-router-dom"
import { BreadcrumbUser } from "./components/BreadcrumbUser"
import { UserItem } from "./components/UserItem"
import { useUserController } from "./useUserController"

export default function User() {
  const { users, handleDeleteUser, isLoadingDelete, pagination } = useUserController();

  const pages = useMemo(() => {
    return generateEllipsisPagination(pagination.currentPage, pagination.totalPages);
  }, [pagination.currentPage, pagination.totalPages]);

  return (
    <>
      <BreadcrumbUser />

      <div>
        <div className="flex mb-4">
          <Button size="sm" className="h-8 gap-1" asChild>
            <Link to="/usuarios/novo">
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Novo Usuário
              </span>
            </Link>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Usuários</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoadingDelete && (
              <div className="w-full h-full flex justify-center items-center min-h-[400px]">
                <Spinner className="w-6 h-6 fill-primary" />
              </div>
            )}

            {!isLoadingDelete && (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="hidden w-[100px] sm:table-cell">
                      <span className="sr-only">Image</span>
                    </TableHead>
                    <TableHead>Empresa</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Responsável</TableHead>
                    <TableHead>Nível</TableHead>
                    <TableHead className="hidden md:table-cell">Plano</TableHead>
                    <TableHead>
                      Ações
                    </TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {users?.map((user) => (
                    <UserItem key={user.id} {...user} deleteItem={handleDeleteUser} />
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>

          <CardFooter className="justify-center">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    className="cursor-pointer"
                    onClick={pagination.previousPage}
                    disabled={!pagination.hasPreviousPage}
                  />
                </PaginationItem>

                {pages.map(page => {
                  const isEllipsisPosition = typeof page === 'string';

                  if (isEllipsisPosition) {
                    return (
                      <PaginationItem>
                        <PaginationEllipsis />
                      </PaginationItem>
                    )
                  }

                  return (
                    <PaginationItem key={page}>
                      <PaginationButton
                        className="cursor-pointer"
                        isActive={pagination.currentPage === page}
                        onClick={() => pagination.setPage(page)}
                      >
                        {page}
                      </PaginationButton>
                    </PaginationItem>
                  )
                })}

                <PaginationItem>
                  <PaginationNext
                    onClick={pagination.nextPage}
                    className="cursor-pointer"
                    disabled={!pagination.hasNextPage}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </CardFooter>
        </Card>
      </div>
    </>
  )
}
