import React, { useContext } from 'react'
import noteContext from '../context/notes/NoteContext';

const Noteitem = (props) => {
    const context = useContext(noteContext)
    const {deleteNote} = context
    
    const { note , updateNote} = props;
    return (
        <div className='col-md-3 my-3'>
            <div className="card">
                <div className="card-body">
                    <div className='d-flex align-items-center'>

                        <h5 className="card-title">{note.title}</h5>
                        <i className="fa-solid fa-pen-to-square mx-2" onClick={() => updateNote(note)}></i>
                        <i className="fa-solid fa-trash mx-2" onClick={() => { deleteNote(note._id); props.showAlert("success" , "Deleted Successfully");}}></i>
                    </div>
                    <p className="card-text">{note.descryption}</p>
                    <a href="/" className="btn btn-primary">Edit Note</a>
                </div>
            </div>
        </div>
    )
}

export default Noteitem
