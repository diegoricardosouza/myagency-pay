<?php

namespace App\Services;

use App\Mail\CreateJobMail;
use App\Mail\createJobMailAtt;
use App\Mail\NoticeJobsExceeded;
use App\Models\Comment;
use App\Models\File;
use App\Models\Job;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;

class JobService
{
    public function __construct(
        protected Job $job,
        protected Comment $comment,
        protected User $user,
    ) {
    }

    public function findById($id, $userLogged = null)
    {
        if (!empty($userLogged) && $userLogged->level == 'CLIENTE') {
            return $this->job->where('user_id', $userLogged->id)
                ->findOrFail($id);
        }
        return $this->job->findOrFail($id);
    }

    public function getAll($user = null, $startDate = null, $endDate = null, $perPage = 6)
    {
        if($startDate) {
            $startDate = $startDate. "T00:00:00.000000Z";
        }
        if($endDate) {
            $endDate = $endDate. "T23:59:59.000000Z";
        }

        if ($user->level == 'CLIENTE') {
            if($startDate && !empty($endDate)) {
                return $this->job->with(['files', 'comments'])->where('user_id', $user->id)
                                ->whereBetween('created_at', [$startDate, $endDate])
                                ->orderBy('created_at', 'desc')
                                ->paginate($perPage);
            }

            return $this->job->with(['files', 'comments'])->where('user_id', $user->id)
                            ->orderBy('created_at', 'desc')
                            ->paginate($perPage);
        }

        if (!empty($startDate) && !empty($endDate)) {
            return $this->job->with(['files', 'comments'])->whereBetween('created_at', [$startDate, $endDate])
                            ->orderBy('created_at', 'desc')
                            ->paginate($perPage);
        }

        return $this->job->with(['files', 'comments'])
                        ->orderBy('created_at', 'desc')
                        ->paginate($perPage);
    }

    public function getAllNoPagination($user = null, $startDate = null, $endDate = null)
    {
        if ($startDate) {
            $startDate = $startDate . "T00:00:00.000000Z";
        }
        if ($endDate) {
            $endDate = $endDate . "T23:59:59.000000Z";
        }

        if ($user->level == 'CLIENTE') {
            if ($startDate && !empty($endDate)) {
                return $this->job->with(['files', 'comments'])->where('user_id', $user->id)
                    ->whereBetween('created_at', [$startDate, $endDate])
                    ->orderBy('created_at', 'desc')
                    ->get();
            }

            return $this->job->with(['files', 'comments'])->where('user_id', $user->id)
                ->orderBy('created_at', 'desc')
                ->get();
        }

        if (!empty($startDate) && !empty($endDate)) {
            return $this->job->with(['files', 'comments'])->whereBetween('created_at', [$startDate, $endDate])
                ->orderBy('created_at', 'desc')
                ->get();
        }

        return $this->job->orderBy('created_at', 'desc')
                        ->get();
    }

    public function createNew($data, $id = null)
    {
        $jobCreated = $this->job->create($data);

        if(!empty($data['files'])){
            foreach ($data['files'] as $file) {
                $dataFile['job_id'] = $jobCreated->id;
                $dataFile['name'] = $file->storeAs('jobs', $file->hashName());
                $fileCreated = File::create($dataFile);
            }
        }

        $jobAfterCreation = $this->job->with(['user', 'files'])->where('id', $jobCreated->id)->first();
        $user = $this->user->with('plan')->where('id', Auth::user()->id)->first();

        if($jobAfterCreation->type == "Atualizações") {
            $users_temp = explode(',', env('EMAIL_ATUALIZACOES'));
            foreach ($users_temp as $u) {
                $this->sendMailAtt($jobAfterCreation, $u, $user->plan->name);
            }

        } else {
            $users_temp = explode(',', env('EMAIL_SOLICITACOES'));
            foreach ($users_temp as $u) {
                $this->sendMail($jobAfterCreation, $u, $user->plan->name);
            }
        }

        $this->verifyQtdJobs($id, $jobCreated);

        return $jobCreated;
    }

    public function verifyQtdJobs($userId, $job)
    {
        $user = $this->user->with(['plan'])->where('id', $userId)->first();

        // $month = date('m');
        // $year = date('Y');
        // $dataCorte = $year."-". $month."-". $user->day;
        // $dataAtualObj = date('Y-m-d', strtotime("+1 month", strtotime($dataCorte)));
        // $dateStart = $year."-". $month."-". $user->day . "T00:00:00.000000Z";
        // $dateEnd = $dataAtualObj . "T23:59:59.000000Z";

        if($job->type == "Atualizações") {
            $this->countJobs($job, 'Atualizações', $user->plan->updates, $user->id);
        }

        if($job->type == "Mídia Digital") {
            $this->countJobs($job, 'Mídia Digital', $user->plan->digital_midia, $user->id);
        }

        if($job->type == "Impresso") {
            $this->countJobs($job, 'Impresso', $user->plan->printed, $user->id);
        }

        if($job->type == "Apresentações") {
            $this->countJobs($job, 'Apresentações', $user->plan->presentations, $user->id);
        }
    }

    private function countJobs($job, $type, $qtdPlan, $userId)
    {
        if ($qtdPlan != -1) {
            // Obter o número de solicitações de atualizações para o próximo mês
            $user = $this->user->with(['plan'])->where('id', $userId)->first();

            $numAtualizacoes = $this->calculateNumberJobs($user->day, $userId, $type);

            // Verificar se excede a quantidade permitida
            if ($numAtualizacoes > $qtdPlan) {
                // Enviar e-mail de aviso $job, $emails, $type
                $this->sendExceededJob($job, env('EMAIL_FINANCEIRO'), $type);
            }
        }
    }

    public function update($data, $id)
    {
        $job = $this->job->findOrFail($id);
        $job->update($data);

        return $job;
    }

    public function delete($id)
    {
        $job = $this->job->with(['files', 'comments'])->findOrFail($id);

        foreach ($job->files as $file) {
            if ($file->name && Storage::exists($file->name)) {
                Storage::delete($file->name);
            }
        }

        $job->files()->delete();

        //Comentários
        $comments = $job->comments()->with('files')->get();

        foreach ($comments as $fileC) {
            $this->deleteCommentsAndFiles($fileC->id);
        }
        $job->comments()->delete();

        $job->delete();
    }

    public function deleteCommentsAndFiles($id) {
        $comments = $this->comment->with('files')->findOrFail($id);

        foreach ($comments->files as $file) {
            if ($file->url && Storage::exists($file->url)) {
                Storage::delete($file->url);
            }
        }

        $comments->files()->delete();
    }

    public function countNumberJobs($userId, $type)
    {
        $user = $this->user->with(['plan'])->where('id', $userId)->first();

        return $this->calculateNumberJobs($user->day, $userId, $type);
    }

    public function calculateNumberJobs($userDayCut, $userId, $type)
    {
        $day = date('d');
        $month = date('m');
        $year = date('Y');
        $dataCorte = $year . "-" . $month . "-" . $userDayCut;

        if ((int)$day < $userDayCut) {
            $dataAtualObj = date('Y-m-d', strtotime("-1 month", strtotime($dataCorte)));
            $dateStart = $dataAtualObj . "T00:00:00.000000Z";
            $dateEnd = $year . "-" . $month . "-" . $userDayCut . "T23:59:59.000000Z";
        } else {
            $dataAtualObj = date('Y-m-d', strtotime("+1 month", strtotime($dataCorte)));
            $dateStart = $year . "-" . $month . "-" . $userDayCut . "T00:00:00.000000Z";
            $dateEnd = $dataAtualObj . "T23:59:59.000000Z";
        }

        // return $dateStart . "-----------" . $dateEnd;

        return $this->job->where('user_id', $userId)
                        ->where('type', $type)
                        ->whereBetween('created_at', [$dateStart, $dateEnd])
                        ->count();
    }

    public function sendMail($job, $emails, $plan)
    {
        $urlFile = [];
        foreach($job->files as $file){
            $urlFile[] = url("storage/{$file->name}");
        }

        Mail::to($emails)->send(new CreateJobMail([
            'url' => env('URL_FRONT')."/solicitacoes/detalhes/".$job->id,
            'ref' => Carbon::parse($job->created_at)->format('Y').$job->ref,
            'data' => Carbon::parse($job->created_at)->format('d/m/Y'),
            'hora' => Carbon::parse($job->created_at)->format('H:i:s'),
            'formatos' => $job->format,
            'outros_formatos' => $job->other_formats,
            'frase_destaque' => $job->phrase,
            'informacoes' => $job->content,
            'observacoes' => $job->obs,
            'responsavel' => $job->user->responsible,
            'email' => $job->user->email,
            'whatsapp' => $job->user->whatsapp,
            'files' => implode("\n", $urlFile),
        ], $job->user->company." - ". $plan ." - ". $job->phrase." (" . Carbon::parse($job->created_at)->format('Y').$job->ref . ")"));
    }

    public function sendMailAtt($job, $emails, $plan)
    {
        $urlFile = [];
        foreach($job->files as $file){
            $urlFile[] = url("storage/{$file->name}");
        }

        Mail::to($emails)->send(new createJobMailAtt([
            'url' => env('URL_FRONT') . "/solicitacoes/detalhes/" . $job->id,
            'ref' => Carbon::parse($job->created_at)->format('Y').$job->ref,
            'data' => Carbon::parse($job->created_at)->format('d/m/Y'),
            'hora' => Carbon::parse($job->created_at)->format('H:i:s'),
            'site' => $job->site,
            'page' => $job->page,
            'frase_destaque' => $job->phrase,
            'informacoes' => $job->content,
            'observacoes' => $job->obs,
            'responsavel' => $job->user->responsible,
            'email' => $job->user->email,
            'whatsapp' => $job->user->whatsapp,
            'files' => implode("\n", $urlFile),
        ], $job->user->company . " - " . $plan . " - " . $job->phrase . " (" . Carbon::parse($job->created_at)->format('Y') . $job->ref . ")"));
    }

    private function sendExceededJob($job, $emails, $type)
    {
        $urlFile = [];
        foreach ($job->files as $file) {
            $urlFile[] = url("storage/{$file->name}");
        }

        Mail::to($emails)->send(new NoticeJobsExceeded([
            'url' => env('URL_FRONT') . "/solicitacoes/detalhes/" . $job->id,
            'ref' => Carbon::parse($job->created_at)->format('Y') . $job->ref,
            'data' => Carbon::parse($job->created_at)->format('d/m/Y'),
            'hora' => Carbon::parse($job->created_at)->format('H:i:s'),
            'formatos' => $job->format,
            'outros_formatos' => $job->other_formats,
            'frase_destaque' => $job->phrase,
            'informacoes' => $job->content,
            'observacoes' => $job->obs,
            'responsavel' => $job->user->responsible,
            'company' => $job->user->company,
            'type' => $type,
            'email' => $job->user->email,
            'whatsapp' => $job->user->whatsapp,
            'files' => implode("\n", $urlFile),
        ]));
    }
}
