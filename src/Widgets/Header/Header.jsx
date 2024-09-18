"use client";
import React, { useEffect, useState } from 'react'
import "./Header.css"
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

function Header() {
    const [uname, setUname] = useState(Cookies.get('uname') || "");
    const [nameChange, setNameChange] = useState(uname == "" ? true : false);
    const router = useRouter();

    function handleNameChange(inpname) {
        setUname(inpname)
    }

    useEffect(() => {
        //localStorage.setItem('uname', uname);
        Cookies.set('uname',uname, { expires: 7 });
    }, [uname]);

    function handleBtnClick() {
        if (nameChange) {
            if (uname) {
                //localStorage.setItem('uname', uname);
                Cookies.set('uname',uname, { expires: 7 });
                setNameChange(false);
            }
            else alert("Please Enter a username");
        }
        else {
            setNameChange(true);
        }
    }

    return (
        <div className='titlebar'>
            <div onClick={() => router.replace("/")}><span>U Type</span></div>
            <div className='nameinput'>
                {nameChange ? <input type="text" placeholder='Your Name' value={uname != "null" ? uname : ""} onChange={(e) => setUname(e.target.value)} /> : <span>{Cookies.get('uname')}</span>}
                <div className='button' onClick={handleBtnClick}>{nameChange ? 'Apply' : 'Edit'}</div>
            </div>
            <div className='button' onClick={()=> router.replace("/leaderboard")}>Ranking 🥇</div>
        </div>
    )
}

export default Header