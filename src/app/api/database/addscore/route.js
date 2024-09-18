import { NextResponse } from 'next/server';

import { addObject, fetchObjectsByParam } from "../db"


export async function POST(request) {
    const req = await request.json();
    if(addObject(req)){
        return NextResponse.json({
            sucess : true,
        })
    }
    return NextResponse.json({
        sucess: false
    })
}