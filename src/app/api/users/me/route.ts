import { NextRequest,NextResponse } from "next/server";
import User from '@/models/usermodel'
import { getDataFromToken } from "@/helpers/getDataFromToken";
import { connect } from "@/dbconfig/dbconfig";

connect()
export async function GET(request:NextRequest){
    try {
        const userid = await getDataFromToken(request);
        const user = await User.findOne({_id:userid}).select('-password');
        return NextResponse.json({
            message:"User Found",
            data:user
        })
    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500});
    }
}