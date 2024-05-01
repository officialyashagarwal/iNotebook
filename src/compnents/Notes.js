import React, { useContext, useEffect, useRef,useState } from 'react'
import noteContext from '../context/notes/NoteContext';
import Noteitem from './Noteitem';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';

const Notes = (props) => {
  const navigate = useNavigate();
  const context = useContext(noteContext);
  const { notes, getNotes,editNote} = context;
  const [note, setNote] = useState({id : "", etitle : "" , edescryption : "", etag : "default"})
  useEffect(() => {
    if(localStorage.getItem('token')){

      getNotes();
    }
    else{
      navigate('/signup')
    }
    // eslint-disable-next-line
  }, [])

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({id : currentNote._id, etitle :currentNote.title, edescryption :currentNote.descryption, etag :currentNote.tag})
    // props.showAlert("success" , "Updated Successfully");
  }

  const ref = useRef(null)
  const refClose = useRef(null);


  const handleClick = (e) => {
    // console.log("clicked on hadlle click");
    e.preventDefault();
    console.log("updatig NOte",note)
    refClose.current.click();
    editNote(note.id, note.etitle, note.edescryption, note.etag);
    props.showAlert("success" , "Updated Successfully");
}

const onChange = (e) => {
    setNote({...note,[e.target.name] : e.target.value})
}
  return (
    <>
      <AddNote showAlert = {props.showAlert}></AddNote>

      <button type="button" className="btn btn-primary d-none" ref={ref} data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>


      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input type="text" className="form-control" id="etitle" name='etitle' value={note.etitle} onChange={onChange} aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                  <label htmlFor="descryption" className="form-label">descryption</label>
                  <input type="text" className="form-control" id="edescryption" value={note.edescryption}name="edescryption" onChange={onChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">tag</label>
                  <input type="text" className="form-control" id="etag" name="etag" onChange={onChange} value={note.etag} />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" ref = {refClose} data-bs-dismiss="modal">Close</button>
              <button type="button" disabled={(note.etitle.length < 5 || note.edescryption.length < 5) || note.etag.length <3 } className="btn btn-primary"  onClick={handleClick}>Update</button>
            </div>
          </div>
        </div>
      </div>
      <div className='row my-3'>
        <h2>Your Notes</h2>
        {notes.map((note) => {
          return (
            <Noteitem key={note._id} updateNote={updateNote} showAlert = {props.showAlert} note={note} />
          )
        })}
      </div>
    </>
  )
}

export default Notes
