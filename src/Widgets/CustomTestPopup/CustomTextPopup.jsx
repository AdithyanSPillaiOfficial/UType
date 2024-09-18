import React, { useState } from 'react'
import "./CustomTextPopup.css"
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

function CustomTextPopup({setTogglePopup}) {
    const [inputtext, setInputText] = useState("");
    const router = useRouter();
  return (
    <div className='popup-container'>
        <div className="popup-content">
            <textarea name="customtext" id="customtext" cols="30" rows="10" placeholder='Enter Your custom text' value={inputtext} onChange={(e)=>setInputText(e.target.value)}></textarea>
            <div className="submitbtn" onClick={()=> {
                Cookies.set('customtext', inputtext, {expires: 1}); 
                window.location.reload();
                setTogglePopup(false);
                }}>Submit</div>
        </div>
    </div>
  )
}

export default CustomTextPopup