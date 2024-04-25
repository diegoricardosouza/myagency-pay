import { generateEllipsisPagination } from "@/lib/utils";
import { CustomPagination } from "@/view/components/CustomPagination";
import { Spinner } from "@/view/components/Spinner";
import { Button } from "@/view/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/view/components/ui/card";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/view/components/ui/table";
import { PlusCircle } from "lucide-react";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import { Search } from "../../components/Search";
import { BreadcrumbJob } from "./components/BreadcrumbJob";
import { JobItem } from "./components/JobItem";
import { useJobController } from "./useJobController";

export function Jobs() {
  const {
    control,
    handleSubmit,
    dateStartCut,
    dateEndCut,
    isLoading,
    jobs,
    handleDeleteJob,
    isLoadingDelete,
    user,
    pagination
  } = useJobController();

  const pages = useMemo(() => {
    return generateEllipsisPagination(pagination.currentPage, pagination.totalPages);
  }, [pagination.currentPage, pagination.totalPages]);

  return (
    <>
      <BreadcrumbJob />

      <div>
        <div className="flex mb-4">
          <Button size="sm" className="h-8 gap-1" asChild>
            <Link to="/solicitacoes/novo">
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Nova Solicitação
              </span>
            </Link>
          </Button>
        </div>

        <Search
          isLoading={isLoading}
          control={control}
          dateEndCut={dateEndCut}
          dateStartCut={dateStartCut}
          handleSubmit={handleSubmit}
          day={user?.data.day}
        />

        <Card className="min-h-[500px] relative">
          {isLoadingDelete && (
            <div className="w-full h-full flex justify-center items-center absolute top-0 left-0">
              <Spinner className="w-6 h-6 fill-primary" />
            </div>
          )}

          <CardHeader>
            <CardTitle>
              {user?.data.level !== 'CLIENTE' && (
                <div>Solicitações</div>
              )}
              {user?.data.level === 'CLIENTE' && (
                <div>Minhas Solicitações</div>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {jobs.length <= 0 && (
              <span className="text-center block mt-5">
                Ainda não possui solicitações.
              </span>
            )}
            {(!isLoadingDelete && jobs.length > 0) && (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[115px]">Referência</TableHead>
                    <TableHead className="w-[115px]">Data</TableHead>
                    <TableHead>Hora</TableHead>
                    {user?.data.level !== 'CLIENTE' && (
                      <TableHead>Empresa</TableHead>
                    )}
                    {/* <TableHead>Frase</TableHead> */}
                    <TableHead>Tipo</TableHead>
                    <TableHead>Formatos</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-[100px]"></TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {jobs?.map((job) => (
                    <JobItem key={job.id} {...job} deleteItem={handleDeleteJob} user={user} jobuser={job.user} />
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>

          {pagination.totalPages > 1 && (
            <CustomPagination pages={pages} pagination={pagination} />
          )}
        </Card>
      </div>
    </>
  )
}
