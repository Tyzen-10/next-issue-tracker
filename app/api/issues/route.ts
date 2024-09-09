import { NextRequest, NextResponse } from "next/server";
//for data validation we use zod -> to check whether there is zod -> zod version 3.22.2
import {z} from 'zod';
//importing the primsa singleton instance we created already.
import prisma from "@/prisma/client";

const createIssueSchema = z.object({
    title: z.string().min(1).max(255),
    description: z.string().min(1)
})

export async function POST(request:NextRequest) {
    const body = await request.json();
    const validation = createIssueSchema.safeParse(body);
    if(!validation.success){
        return NextResponse.json(validation.error.errors, {status: 400})
        //learn what are the params for Next Response. -> check in notes.
    }
    //.issue is the name of the model
    //prisma functions are mostly async.
    const newIssue = await prisma.issue.create({
        data: {title:body.title, description:body.description}
    });
    return NextResponse.json(newIssue, {status:201})
}