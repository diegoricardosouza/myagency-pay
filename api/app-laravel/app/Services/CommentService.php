<?php

namespace App\Services;

use App\Mail\CreateCommentMail;
use App\Models\Comment;
use App\Models\FileComment;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Mail;
use Carbon\Carbon;

class CommentService
{
    public function __construct(
        protected Comment $comment,
    ) {
    }

    public function getAll()
    {
        return $this->comment->with('files')->orderBy('created_at', 'desc')->get();
    }

    public function findById($id)
    {
        return $this->comment->findOrFail($id);
    }

    public function createNew($data)
    {
        $commentCreated = $this->comment->create($data);

        if (!empty($data['files'])) {
            foreach ($data['files'] as $file) {
                $dataFile['comment_id'] = $commentCreated->id;
                $dataFile['url'] = $file->storeAs('comments', $file->hashName());
                $fileCreated = FileComment::create($dataFile);
            }
        }

        $commentAfterCreation = $this->comment->with('files')->where('id', $commentCreated->id)->first();
        $this->sendMail($commentAfterCreation);

        return $commentCreated;
    }

    public function delete($id)
    {
        $comment = $this->comment->with('files')->findOrFail($id);

        foreach ($comment->files as $file) {
            if ($file->url && Storage::exists($file->url)) {
                Storage::delete($file->url);
            }
        }

        $comment->files()->delete();

        $comment->delete();
    }

    public function sendMail($comment)
    {
        $urlFile = [];
        foreach ($comment->files as $file) {
            $urlFile[] = url("storage/{$file->url}");
        }

        Mail::to('diegoricardoweb@gmail.com')->send(new CreateCommentMail([
            'data' => Carbon::parse($comment->created_at)->format('d/m/Y'),
            'hora' => Carbon::parse($comment->created_at)->format('H:i:s'),
            'conteudo' => $comment->content,
            'files' => implode("\n", $urlFile),
        ]));
    }
}
