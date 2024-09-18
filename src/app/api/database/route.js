import { NextResponse } from 'next/server';

const { addObject, fetchObjectsByParam } = require('./db');

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