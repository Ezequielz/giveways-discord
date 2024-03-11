'use client'

import { logout } from "@/actions";

export const LogoutBtn = () => {
    return (
        <button
            onClick={() => logout()}
            className="flex items-center"
        >

            Logout
        </button>
    )
}
