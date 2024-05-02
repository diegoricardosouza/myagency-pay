import { Button } from "@/view/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/view/components/ui/card";
import { NotebookText, Presentation, RefreshCcw, Share2 } from "lucide-react";
import { Link } from "react-router-dom";

export function FormatsDashboard() {
  return (
    <div className="grid flex-1 items-start gap-4 p-4 sm:px-0 sm:py-0 md:gap-8">
      <div className="mx-auto grid w-full flex-1 auto-rows-max gap-4">
        <Card className="relative">
          <CardHeader>
            <CardTitle className="text-center">
              Formatos
            </CardTitle>
          </CardHeader>

          <CardContent
            className="flex gap-3 flex-col lg:flex-row justify-center"
          >
            <Button type="submit" size="sm" asChild>
              <Link to="/solicitacoes/atualizacoes">
                <RefreshCcw className="w-5 h-5 mr-1" />
                ATUALIZAÇÕES SITE
              </Link>
            </Button>

            <Button type="submit" size="sm" asChild>
              <Link to="/solicitacoes/midia-digital">
                <Share2 className="w-5 h-5 mr-1" />
                MÍDIA DIGITAL
              </Link>
            </Button>

            <Button type="submit" size="sm" asChild>
              <Link to="/solicitacoes/impresso">
                <NotebookText className="w-5 h-5 mr-1" />
                IMPRESSO
              </Link>
            </Button>

            <Button type="submit" size="sm" asChild>
              <Link to="/solicitacoes/apresentacoes">
                <Presentation className="w-5 h-5 mr-1" />
                APRESENTAÇÕES
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
