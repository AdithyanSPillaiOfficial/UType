import React, { useEffect, useState } from 'react'
import "./LeaderboardTable.css"

function LeaderboardTable() {
    const [data, setData] = useState([]);

    useEffect(() => {
        async function fetchLeaderboard() {
            const res = await fetch('/api/database/leaderboard', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const result = await res.json();
            console.log(result);
            result.leaderboard.sort((a, b) => b.wpm - a.wpm);
            setData(result.leaderboard);
        }

        fetchLeaderboard();


    }, [])


    return (
        <div className='tablemaindiv'>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Name</th>
                        <th>WPM</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((userObj, index) => (<tr key={index}>
                            <th>{index + 1}</th>
                            <th>{userObj.name}</th>
                            <th>{userObj.wpm}</th>
                        </tr>))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default LeaderboardTable