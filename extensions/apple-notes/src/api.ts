import { runAppleScript } from "@raycast/utils";
import { escapeDoubleQuotes } from "./helpers";

export async function createNote(text?: string) {
  const escapedText = text ? escapeDoubleQuotes(text) : "";

  return runAppleScript(`
    tell application "Notes"
      activate
      set newNote to make new note at folder "Notes"
      if ("${escapedText}" is not "") then
        set body of newNote to "${escapedText}"
      end if
      set selection to newNote
    end tell
    `);
}

export async function openNoteSeparately(id: string) {
  return runAppleScript(`
    tell application "Notes"
      set theNote to note id "${escapeDoubleQuotes(id)}"
      set theFolder to container of theNote
      show theFolder
      show theNote with separately
      activate
    end tell
    `);
}

export async function deleteNoteById(id: string) {
  return runAppleScript(`
    tell application "Notes"
      delete note id "${escapeDoubleQuotes(id)}"
    end tell
    `);
}

export async function restoreNoteById(id: string) {
  return runAppleScript(`
    tell application "Notes"
      set theNote to note id "${escapeDoubleQuotes(id)}"
      set theFolder to default folder of account 1
      move theNote to theFolder
    end tell
    `);
}

export async function getNoteBody(id: string) {
  return runAppleScript(`
    tell application "Notes"
      set theNote to note id "${escapeDoubleQuotes(id)}"
      return body of theNote
    end tell
    `);
}

export async function getNotePlainText(id: string) {
  return runAppleScript(`
    tell application "Notes"
      set theNote to note id "${escapeDoubleQuotes(id)}"
      return plaintext of theNote
    end tell
    `);
}
