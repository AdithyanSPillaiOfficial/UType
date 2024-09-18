"use client";
import React, { useEffect, useState } from 'react'
import "./Header.css"
import { useRouter } from 'next/navigation';

function Header() {
    const [uname, setUname] = useState(localStorage.getItem('uname'));
    const [nameChange, setNameChange] = useState(uname == "null" ? true : false);
    const router = useRouter();

    function handleNameChange(inpname) {
        setUname(inpname)
    }

    useEffect(() => {
        localStorage.setItem('uname', uname);
    }, [uname]);

    function handleBtnClick() {
        if (nameChange) {
            if (uname) {
                localStorage.setItem('uname', uname);
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
                {nameChange ? <input type="text" placeholder='Your Name' value={uname != "null" ? uname : ""} onChange={(e) => setUname(e.target.value)} /> : <span>{localStorage.getItem('uname')}</span>}
                <div className='button' onClick={handleBtnClick}>{nameChange ? 'Apply' : 'Edit'}</div>
            </div>
            <div className='button' onClick={()=> router.replace("/leaderboard")}>Ranking 🥇</div>
        </div>
    )
}

export default Header