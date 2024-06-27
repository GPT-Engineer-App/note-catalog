import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { SortableItem } from "@/components/SortableItem";

const Index = () => {
  const [notes, setNotes] = useState([]);
  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");
  const [selectedNote, setSelectedNote] = useState(null);

  const addNote = () => {
    if (noteTitle && noteContent) {
      setNotes([...notes, { id: notes.length, title: noteTitle, content: noteContent }]);
      setNoteTitle("");
      setNoteContent("");
    }
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setNotes((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
    <div className="h-screen w-screen flex">
      <div className="w-1/4 p-4 border-r">
        <h1 className="text-3xl text-center mb-4">Notes</h1>
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={notes} strategy={verticalListSortingStrategy}>
            {notes.map((note) => (
              <SortableItem key={note.id} id={note.id}>
                <Card className="mb-2 cursor-pointer" onClick={() => setSelectedNote(note)}>
                  <CardHeader>
                    <CardTitle>{note.title}</CardTitle>
                  </CardHeader>
                </Card>
              </SortableItem>
            ))}
          </SortableContext>
        </DndContext>
        <div className="mt-4">
          <Label htmlFor="note-title">Title</Label>
          <Input
            id="note-title"
            value={noteTitle}
            onChange={(e) => setNoteTitle(e.target.value)}
            placeholder="Note Title"
          />
          <Label htmlFor="note-content" className="mt-2">Content</Label>
          <Textarea
            id="note-content"
            value={noteContent}
            onChange={(e) => setNoteContent(e.target.value)}
            placeholder="Note Content"
          />
          <Button onClick={addNote} className="mt-2">Add Note</Button>
        </div>
      </div>
      <div className="w-3/4 p-4">
        {selectedNote ? (
          <Card>
            <CardHeader>
              <CardTitle>{selectedNote.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{selectedNote.content}</p>
            </CardContent>
          </Card>
        ) : (
          <p className="text-center">Select a note to view its content</p>
        )}
      </div>
    </div>
  );
};

export default Index;