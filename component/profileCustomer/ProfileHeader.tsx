"use client";

import { FiEdit2, FiMail, FiPhone } from "react-icons/fi";

type Props = {
    username: string;
    email: string;
    nomorHp: string;
    onEdit: () => void;
};

export default function ProfileHeader({
    username,
    email,
    nomorHp,
    onEdit,
}: Props) {

    return (

        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 md:p-8">

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">

                <div className="flex items-center gap-5">

                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#2A4AA1] to-[#5B7FFF] flex items-center justify-center shadow-lg">
                        <span className="text-3xl font-black text-white">
                            {username
                                .split(" ")
                                .slice(0, 2)
                                .map((item) => item[0])
                                .join("")
                                .toUpperCase()}
                        </span>
                    </div>

                    <div>

                        <p className="text-sm font-medium text-slate-500">

                            Customer

                        </p>

                        <h1 className="text-3xl md:text-4xl font-black text-slate-800">

                            {username}

                        </h1>

                        <div className="mt-3 flex flex-col gap-2 text-slate-600">

                            <div className="flex items-center gap-2">

                                <FiMail />

                                {email}

                            </div>

                            <div className="flex items-center gap-2">

                                <FiPhone />

                                {nomorHp}

                            </div>

                        </div>

                    </div>

                </div>

                <button
                    onClick={onEdit}
                    className="flex items-center justify-center gap-2 rounded-xl bg-[#2A4AA1] px-6 py-3 font-semibold text-white transition hover:bg-[#1E3A8A]"
                >

                    <FiEdit2 />

                    Edit Profile

                </button>

            </div>

        </div>

    );

}