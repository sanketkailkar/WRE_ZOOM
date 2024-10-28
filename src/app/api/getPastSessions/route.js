import { NextResponse } from "next/server";
import axios from "axios";
import moment from "moment";

export async function GET(req) {
    const cookies = req.cookies.get("zoom-sdk-auth");
    const token = cookies?.value;

    if (!token) {
        return NextResponse.json({ error: "No token available" }, { status: 401 });
    }

    const fromDate = moment().format("YYYY-MM-DD");
    const toDate = moment().format("YYYY-MM-DD");

    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_ZOOM_BASE_URL}?from=${fromDate}&to=${toDate}&type=past`, {
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        });

        return NextResponse.json(response.data);
    } catch (error) {
        console.error("Error fetching sessions:", error.message);
        return NextResponse.json({ error: "Failed to fetch sessions" }, { status: 500 });
    }
}
