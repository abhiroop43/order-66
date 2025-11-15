"use client";

import React from 'react'
import {CircularProgress} from "@heroui/react";

const Loader = () => {
    return (
        <div className="flex items-center justify-center">
            <CircularProgress aria-label="Loading..." size="lg"/>
        </div>
    )
}
export default Loader
