<?php

namespace App\Services;

use App\Models\File;
use Illuminate\Support\Facades\Storage;

class FileService
{
    public function __construct(
        protected File $file,
    ) {
    }

    public function findById($id)
    {
        return $this->file->findOrFail($id);
    }

    public function delete($id)
    {
        $file = $this->file->with('job')->findOrFail($id);

        if ($file->name && Storage::exists($file->name)) {
            Storage::delete($file->name);
        }

        $file->delete();
    }
}
