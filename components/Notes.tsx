import React, { useState } from "react";
import { gql, useMutation, useQuery } from "urql";
import { Note } from "../utils/types";

export function Notes() {
  return (
    <div>
      <NotesNew />
      <NotesList />
    </div>
  );
}

const INSERT_NOTE = gql`
  mutation insertNote($note: notes_insert_input!) {
    insert_notes_one(object: $note) {
      __typename
      id
      created_at
      title
    }
  }
`;

export function NotesNew() {
  const [title, setTitle] = useState("");

  const [{ fetching }, insertNote] = useMutation(INSERT_NOTE);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title) {
      return;
    }

    const { error } = await insertNote({
      note: {
        title,
      },
    });

    if (error) {
      console.log(error);
      alert(error);
      return;
    }

    setTitle("");
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
                value={title}
                onChange={(e) => setTitle(e.target.value)}
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
              disabled={fetching}
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const GET_NOTES = gql`
  query {
    notes {
      __typename
      id
      created_at
      title
    }
  }
`;

export function NotesList() {
  const [{ data, fetching }] = useQuery({
    query: GET_NOTES,
  });

  if (fetching) {
    return <div>Loading...</div>;
  }

  return (
    <div className='my-4'>
      <h1 className='text-2xl py-4'>Notes</h1>
      <div className='space-y-2'>
        {data?.notes?.map((note: Note) => {
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
