"use client";
import React from 'react'
import "./leaderboard.css"
import LeaderboardTable from '@/Widgets/LeaderboardTable/LeaderboardTable';

function page() {
  return (
    <div className='leaderboard'>
        <span className='heading'>Global UType WPM Leaderboard</span>
        <LeaderboardTable />
    </div>
  )
}

export default page