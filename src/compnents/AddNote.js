import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/NoteContext';
// import NoteState from '../context/notes/NoteState';

const AddNote = (props) => {
    const context = useContext(noteContext);
    const {addNote} = context;

    const [note, setNote] = useState({title : "" , descryption : "", tag : ""})

    const handleClick = (e) => {
        // console.log("clicked on hadlle click");
        e.preventDefault();
        addNote(note.title,note.descryption,note.tag);
        setNote({title : "" , descryption : "", tag : ""})
        props.showAlert("success" , "Added Successfully");
    }
    const onChange = (e) => {
        setNote({...note,[e.target.name] : e.target.value})
    }
    return (
        <div>
            <div className='container my-3'>

                <h2>Add a note</h2>
                <form>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" name='title' value={note.title}  onChange={onChange} aria-describedby="emailHelp" minLength={5} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="descryption" className="form-label">descryption</label>
                        <input type="text" className="form-control" value={note.descryption} id="descryption" name="descryption" onChange={onChange} minLength={5} required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">tag</label>
                        <input type="text" className="form-control" value={note.tag} id="tag" name="tag" onChange={onChange} minLength={5} required/>
                    </div>
                    <button disabled={(note.title.length < 5 || note.descryption.length < 5) || note.tag.length <3 } type="submit" className="btn btn-primary" onClick={handleClick}>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default AddNote
