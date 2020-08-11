import React from 'react';
import './ImageLinkForm.css';


const ImageLinkForm =({onInputChange,onButtonSubmit})=>{
    return(
        <div>
            <p className="f3">
                {'This Magic Brain will detect your faces in your pictures.Give it a Try'}
            </p>
            <div className="center">
                <div className=" center form pa4 br3 shadow-5">
                    <input className="f4 pa2 w-70 center" type="text" onChange={onInputChange}/>
                    <button 
                       className="w-30 grow link ph3 dib white bg-light-purple"
                       onClick={onButtonSubmit}
                       >Detect</button>
                </div>
            </div>
        </div>
    );
}

export default ImageLinkForm;
