<?php

namespace App\Services;

use App\Mail\CreateJobMail;
use App\Models\File;
use App\Models\Job;
use Carbon\Carbon;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;

class JobService
{
    public function __construct(
        protected Job $job,
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

    public function getAll($user = null, $startDate = null, $endDate = null, $perPage = 10)
    {
        // $a = $this->job->with('files')
        //     ->paginate($perPage);

        //     dd($a);

        if ($user->level == 'CLIENTE') {
            if($startDate && !empty($endDate)) {
                return $this->job->with('files')->where('user_id', $user->id)
                                ->whereBetween('created_at', [$startDate, $endDate])
                                ->paginate($perPage);
            }

            return $this->job->where('user_id', $user->id)
                            ->paginate($perPage);
        }

        if (!empty($startDate) && !empty($endDate)) {
            return $this->job->whereBetween('created_at', [$startDate, $endDate])
                            ->paginate($perPage);
        }

        return $this->job->paginate($perPage);
    }

    public function createNew($data)
    {
        $jobCreated = $this->job->create($data);

        if($data['files']){
            foreach ($data['files'] as $file) {
                $dataFile['job_id'] = $jobCreated->id;
                $dataFile['name'] = $file->storeAs('jobs', $file->hashName());
                $fileCreated = File::create($dataFile);
            }
        }

        $jobAfterCreation = $this->job->with(['user', 'files'])->where('id', $jobCreated->id)->first();
        $this->sendMail($jobAfterCreation);

        return $jobCreated;
    }

    public function update($data, $id)
    {
        $job = $this->job->findOrFail($id);
        $job->update($data);

        return $job;
    }

    public function delete($id)
    {
        $job = $this->job->with('files')->findOrFail($id);

        foreach ($job->files as $file) {
            if ($file->name && Storage::exists($file->name)) {
                Storage::delete($file->name);
            }
        }

        $job->files()->delete();

        $job->delete();
    }

    public function sendMail($job)
    {
        $urlFile = [];
        foreach($job->files as $file){
            $urlFile[] = url("storage/{$file->name}");
        }

        Mail::to('diegoricardoweb@gmail.com')->send(new CreateJobMail([
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
        ]));
    }
}
