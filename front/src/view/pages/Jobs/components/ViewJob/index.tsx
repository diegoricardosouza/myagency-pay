import { Button } from "@/view/components/ui/button";
import { Card, CardContent } from "@/view/components/ui/card";

import { FileViewJob } from "@/view/components/FileViewJob";
import { Spinner } from "@/view/components/Spinner";
import { Label } from "@/view/components/ui/label";
import { ScrollArea } from "@/view/components/ui/scroll-area";
import { ChevronLeft, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { BreadcrumbViewJob } from "./BreadcrumbViewJob";
import { Comments } from "./Comments";
import { CreateComment } from "./CreateComment";
import { StatusJob } from "./StatusJob";
import { useViewJobController } from "./useViewJobController";


export function ViewJob() {
  const {
    jobData,
    changingStatus,
    user,
    isChangeStatus,
    approvingStatus,
    approvedStatus,
    handleChangingStatus,
    handleApprovingStatus,
    handleApprovedStatus,
  } = useViewJobController();

  const buttonsRuleNotApproved = jobData?.status !== "approved";
  const buttonsRuleApproving = jobData?.status !== "approving";
  const buttonsRuleChanging = jobData?.status !== "changing";
  const userRoleNotClient = user?.data.level !== "CLIENTE";
  // const userRoleClient = user?.data.level === "CLIENTE";
  const userNotBelongsJob = user?.data.id === jobData?.user.id;

  return (
    <>
      <BreadcrumbViewJob />

      <div className="grid flex-1 items-start gap-4 p-4 sm:py-0 md:gap-8 lg:px-0">
        <div className="mx-auto grid w-full flex-1 auto-rows-max gap-4">
          <div className="flex items-center gap-4 justify-between flex-col lg:flex-row">
            <div className="flex gap-4">
              <Button variant="outline" size="icon" className="h-7 w-7" asChild>
                <Link to="/solicitacoes">
                  <ChevronLeft className="h-4 w-4" />
                  <span className="sr-only">Back</span>
                </Link>
              </Button>

              <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                Ver Solicitação
              </h1>
            </div>

            <div className="flex flex-col gap-1 lg:flex-row">
              {(buttonsRuleNotApproved && buttonsRuleChanging && userNotBelongsJob && userRoleNotClient) && (
                <form
                  onSubmit={handleChangingStatus}
                >
                  <Button type="submit" size="sm" disabled={isChangeStatus}>
                    {changingStatus && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Mandar para alteração
                  </Button>
                </form>
              )}

              {(buttonsRuleNotApproved && userRoleNotClient && buttonsRuleApproving) && (
                <form
                  onSubmit={handleApprovingStatus}
                >
                  <Button type="submit" size="sm" disabled={isChangeStatus}>
                    {approvingStatus && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Mandar para aprovação
                  </Button>
                </form>
              )}
              {(buttonsRuleNotApproved && userNotBelongsJob) && (
                <form
                  onSubmit={handleApprovedStatus}
                >
                  <Button name="approved" type="submit" size="sm" disabled={isChangeStatus}>
                    {approvedStatus && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Aprovar
                  </Button>
                </form>
              )}
            </div>
          </div>

          <StatusJob status={jobData?.status} />

          <div className="grid gap-4 lg:grid-cols-2 lg:gap-5">
            <div>
              <Card x-chunk="dashboard-07-chunk-0" className="pt-6">
                <CardContent>
                  <div className="grid gap-6">
                    <div className="grid gap-3">
                      <Label>Cliente:</Label>
                      <p>{jobData?.user.company}</p>
                    </div>

                    <div className="grid gap-6">
                      {jobData?.type === 'Atualizações' && (
                        <>
                          <div className="grid gap-3">
                            <Label>Site:</Label>
                            <p>{jobData?.site}</p>
                          </div>

                          <div className="grid gap-3">
                            <Label>Página que deseja atualizar:</Label>
                            <p>{jobData?.page}</p>
                          </div>
                        </>
                      )}

                      {jobData?.type !== 'Atualizações' && (
                        <>
                          <div className="grid gap-3">
                            <Label>Formato:</Label>
                            <p>{jobData?.format}</p>
                          </div>

                          <div className="grid gap-3">
                            <Label>Outros Formatos:</Label>
                            <p>{jobData?.other_formats}</p>
                          </div>

                          <div className="grid gap-3">
                            <Label>Frase:</Label>
                            <p>{jobData?.phrase}</p>
                          </div>
                        </>
                      )}
                    </div>

                    <div className="grid gap-6">
                      <div className="grid gap-3">
                        <Label>Conteúdos:</Label>
                        <div
                          dangerouslySetInnerHTML={{ __html: jobData?.content as string }}
                        ></div>
                      </div>
                      <div className="grid gap-3">
                        <Label>Observações:</Label>
                        <div
                          dangerouslySetInnerHTML={{ __html: jobData?.obs as string }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {jobData?.status !== "approved" && (
                <CreateComment />
              )}
            </div>

            <div className="grid auto-rows-max items-start gap-4 lg:gap-5">
              <Card x-chunk="dashboard-07-chunk-0" className="pt-6">
                <CardContent>
                  <div>
                    <Label>Arquivos:</Label>
                  </div>

                  <div className="flex flex-col gap-2">
                    {jobData?.files?.map((file) => (
                      <FileViewJob key={file.id} id={file.id} url={file.url} name={file.name} />
                    ))}
                  </div>
                </CardContent>
              </Card>

              <h2 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0 mb-[-10px]">
                Comentários
              </h2>
              <ScrollArea className="h-full max-h-[500px] w-full rounded-md border bg-white p-6 flex flex-col gap-3 relative">
                {isChangeStatus && (
                  <div className="w-full h-full flex justify-center items-center absolute top-0 left-0 z-[9999] bg-white transition-all">
                    <Spinner className="w-6 h-6 fill-primary" />
                  </div>
                )}


                {// eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
                jobData?.comments?.length! <= 0 && (
                  <span className="text-center block">
                    Ainda não possui comentários.
                  </span>
                )}

                {jobData?.comments?.map((comment) => (
                  <Comments
                    key={comment.id}
                    id={comment.user.id}
                    company={comment.user.company}
                    content={comment.content}
                    files={comment?.files}
                    userId={user!.data.id}
                  />
                ))}
              </ScrollArea>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
