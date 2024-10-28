import { NextResponse } from "next/server";
import axios from "axios";
import { ROUTES } from "../../../../utils/helper";

export async function GET(req) {
    const cookies = req.cookies.get("zoom-sdk-auth");
    const token = cookies?.value;

    if (!token) {
        return NextResponse.json({ error: "No token available" }, { status: 401 });
    }

    const fromDate = "2024-10-28";
    const toDate = "2024-10-28";

    try {
        const response = await axios.get(`${ROUTES.GET_ALL_SESSIONS}?from=${fromDate}&to=${toDate}`, {
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });

        return NextResponse.json(response.data);
    } catch (error) {
        console.error("Error fetching sessions:", error.message);
        return NextResponse.json({ error: "Failed to fetch sessions" }, { status: 500 });
    }
}
