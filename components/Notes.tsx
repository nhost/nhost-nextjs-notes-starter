import { useAuthenticationStatus } from "@nhost/nextjs";
import React, { useEffect, useState } from "react";
import { nhost } from "../utils/nhost";
import { Note } from "../utils/types";

export function Notes() {
  const { isAuthenticated } = useAuthenticationStatus();

  console.log({
    isAuthenticated,
  });

  return (
    <div>
      <NotesNew />
      <NotesList />
    </div>
  );
}

export function NotesNew() {
  const [noteTitle, setNoteTitle] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!noteTitle) {
      return;
    }

    const { error } = await nhost.graphql.request(
      `#graphql
      mutation insertNote($note: notes_insert_input!) {
        insert_notes(objects: [$note]) {
          affected_rows
        }
      }
    `,
      {
        note: {
          title: noteTitle,
        },
      }
    );

    if (error) {
      console.log(error);
      alert(error);
      return;
    }

    setNoteTitle("");
  };

  return (
    <div className='my-4'>
      <h1 className='text-2xl py-4'>New Note</h1>
      <div>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <label
              htmlFor='note'
              className='block text-sm font-medium text-gray-700'
            >
              Note
            </label>
            <div className='mt-1'>
              <input
                name='note'
                type='note'
                value={noteTitle}
                onChange={(e) => setNoteTitle(e.target.value)}
                id='note'
                className='block w-full rounded-md py-2 px-2 border  border-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm'
                autoFocus
              />
            </div>
          </div>
          <div>
            <button
              type='submit'
              className='inline-flex items-center rounded-md border border-transparent bg-blue-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function NotesList() {
  const [notesFetched, setNotesFetched] = useState(false);
  const [notes, setNotes] = useState<Note[]>([]);

  const getNotes = async () => {
    setNotesFetched(true);

    const { data, error } = await nhost.graphql.request(`#graphql
    query {
      notes {
        id
        created_at
        title
      }
    }
    `);

    if (error) {
      console.log(error);
      alert("error");
      return;
    }

    setNotes(data.notes as Note[]);
  };

  useEffect(() => {
    if (notesFetched) {
      return;
    }
    getNotes();
  });

  return (
    <div className='my-4'>
      <h1 className='text-2xl py-4'>Notes</h1>
      <div className='space-y-2'>
        {notes.map((note) => {
          return (
            <div key={note.id} className='border-b border-gray-200'>
              <div>{note.title}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
