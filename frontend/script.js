let API_URL = 'http://localhost:3000/api/notes';

// Function to switch between sections
function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Show the selected section
    document.getElementById(sectionId).classList.add('active');
}

// FUNCTION TO DISPLAY NOTES
const fetchNotes = async () => {
    try {
        const response = await fetch(API_URL);  // Correct API_URL usage
        const notes = await response.json();

        const notesContainer = document.getElementById('notes');
        notesContainer.innerHTML = '';  // Clear the container before appending new notes

        notes.forEach((note) => {  // Correct 'forEach'
            const noteElement = document.createElement('div');
            noteElement.classList.add('note');

            noteElement.innerHTML = `
                <h3>${note.title}</h3> 
                <p>${note.content}</p>
                <button onclick="deleteNoteByTitle('${note.title}')">Delete</button>
                <button onclick="updateNotebyTitle('${note.title}')">Update</button>`;  // Correct function call

            notesContainer.appendChild(noteElement);
        });
    } catch (err) {
        console.log("Error fetching notes:", err);
    }
};

// Add Note
const addNote = async () => {
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;

    const newNote = { title, content };

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newNote),
        });
        if (response.ok) {
            alert("Note added successfully");
            document.getElementById('title').value = '';
            document.getElementById('content').value = '';
            fetchNotes();  // Refresh the notes after adding
        } else {
            alert("Error adding note");
        }
    } catch (err) {
        console.log("Error:", err);
    }
};

// Update Note by Title
const updateNotebyTitle = async (oldTitle) => {
    const newTitle = document.getElementById('newTitle').value;
    const newContent = document.getElementById('newcontent').value;

    const updateNote = { title: newTitle, content: newContent };

    try {
        const response = await fetch(`${API_URL}/title/${oldTitle}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updateNote),
        });

        if (response.ok) {
            alert("Note updated successfully");
            document.getElementById('updateTitle').value = '';  // Clear input fields
            document.getElementById('newTitle').value = '';
            document.getElementById('newcontent').value = '';
            fetchNotes();  // Refresh the notes after updating
        } else {
            alert("Failed to update note");
        }
    } catch (err) {
        console.log("Error occurred:", err);
    }
};

// Find Note by Title
const findNoteByTitle = async () => {
    const searchTitle = document.getElementById('searchTitle').value;

    try {
        const response = await fetch(`${API_URL}/title/${searchTitle}`);
        const note = await response.json();

        const noteDetails = document.getElementById('noteDetails');

        if (note) {
            noteDetails.innerHTML = `<h3>${note.title}</h3><p>${note.content}</p>`;
        } else {
            noteDetails.innerHTML = "Note not found";
        }
    } catch (err) {
        console.log("Error occurred:", err);
    }
};

// Delete Note by Title
const deleteNoteByTitle = async (title) => {  // Modified function to take title as parameter
    try {
        const response = await fetch(`${API_URL}/title/${title}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            alert("Note deleted successfully");
            document.getElementById('searchTitle').value = ''
            fetchNotes();  // Refresh notes after deletion
        } else {
            alert("Failed to delete note");
        }
    } catch (err) {
        console.log("Error occurred:", err);
    }
};

// Call fetchNotes() when the page loads to display all notes
window.onload = fetchNotes;
