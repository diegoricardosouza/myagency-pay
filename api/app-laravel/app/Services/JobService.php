<?php

namespace App\Services;

use App\Models\File;
use App\Models\Job;
use Illuminate\Support\Facades\Storage;

class JobService
{
    public function __construct(
        protected Job $job,
    ) {
    }

    public function getAll($user = null, $startDate = null, $endDate = null, $perPage = 10)
    {
        if ($user->level == 'CLIENTE') {
            if($startDate && !empty($endDate)) {
                return $this->job->where('user_id', $user->id)
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

        return $jobCreated;
    }

    public function findById($id, $userLogged = null)
    {
        if(!empty($userLogged) && $userLogged->level == 'CLIENTE') {
            return $this->job->where('user_id', $userLogged->id)
                            ->findOrFail($id);
        }
        return $this->job->findOrFail($id);
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
}
