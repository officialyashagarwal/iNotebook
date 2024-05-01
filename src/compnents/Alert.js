import React from 'react'

export default function Alert(props) {
    const CapitalizeIt = (word) => {
        if(word === "danger"){
            word = "error";
        }
        let low = word.toLowerCase();
        return low.charAt(0).toUpperCase() + low.slice(1);
    }
    return (
        <div style={{height : "55px"}}>

            {props.Alert && <div className={'alert text-center alert-success alert-dismissible fade show'} role="alert">
                <strong>{CapitalizeIt(props.Alert.type)}</strong> {props.Alert.message}
                {/* <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button> */}
            </div>}
        </div>

    )
}
