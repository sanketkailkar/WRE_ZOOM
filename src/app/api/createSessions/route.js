import { NextResponse } from "next/server";
import axios from "axios";
import { ROUTES } from "../../../../utils/helper";

export async function POST(req) {
   
    const { sessionName, sessionPassword } = await req.json();
    
    if (!sessionName && !sessionPassword) {
        return NextResponse.json({ error: "No session info available" }, { status: 401 });
    }

    const cookies = req.cookies.get("zoom-sdk-auth");
    const token = cookies?.value;

    console.log({sessionName, sessionPassword, token});

    if (!token) {
        return NextResponse.json({ error: "No token available" }, { status: 401 });
    }

    try {
        const response = await axios.post(ROUTES.CREATE_API,
            {
                session_name: sessionName,
                session_password: sessionPassword,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            });

        return NextResponse.json(response.data);
    } catch (error) {
        console.error("Error fetching sessions:", error.message);
        return NextResponse.json({ error: "Failed to fetch sessions" }, { status: 500 });
    }
}