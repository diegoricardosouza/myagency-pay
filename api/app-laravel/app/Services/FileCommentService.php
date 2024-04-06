<?php

namespace App\Services;

use App\Models\FileComment;
use Illuminate\Support\Facades\Storage;

class FileCommentService
{
    public function __construct(
        protected FileComment $file,
    ) {
    }

    public function findById($id)
    {
        return $this->file->findOrFail($id);
    }

    public function delete($id)
    {
        $file = $this->file->with('comment')->findOrFail($id);

        if ($file->url && Storage::exists($file->url)) {
            Storage::delete($file->url);
        }

        $file->delete();
    }
}
