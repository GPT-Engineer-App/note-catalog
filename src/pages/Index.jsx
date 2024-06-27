import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Index = () => {
  const [notes, setNotes] = useState([]);
  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");

  const addNote = () => {
    if (noteTitle && noteContent) {
      setNotes([...notes, { title: noteTitle, content: noteContent }]);
      setNoteTitle("");
      setNoteContent("");
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col items-center p-4 space-y-4">
      <h1 className="text-3xl text-center">Note Taking Application</h1>
      <div className="w-full max-w-md space-y-4">
        <div>
          <Label htmlFor="note-title">Title</Label>
          <Input
            id="note-title"
            value={noteTitle}
            onChange={(e) => setNoteTitle(e.target.value)}
            placeholder="Note Title"
          />
        </div>
        <div>
          <Label htmlFor="note-content">Content</Label>
          <Textarea
            id="note-content"
            value={noteContent}
            onChange={(e) => setNoteContent(e.target.value)}
            placeholder="Note Content"
          />
        </div>
        <Button onClick={addNote}>Add Note</Button>
      </div>
      <div className="w-full max-w-md space-y-4">
        {notes.map((note, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{note.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{note.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Index;