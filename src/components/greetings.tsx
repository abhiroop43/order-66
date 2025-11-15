"use client";
import React from 'react'
import {Button, Card} from "@heroui/react";

const Greetings = () => {
    return (
        <main className="min-h-screen bg-gray-50 text-gray-900">
            {/* Hero Section */}
            <section className="flex flex-col items-center justify-center text-center py-24 px-6">
                <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent pb-4">
                    Manage Projects Effortlessly
                </h1>
                <p className="text-lg text-gray-600 max-w-xl mb-8">
                    A simple task management tool built with Next.js, HeroUI, and Tailwind.
                </p>
                <Button color="primary" size="lg" radius="md" variant="shadow" href="/tasks/new">
                    Get Started
                </Button>
            </section>

            {/* Features Section */}
            <section className="grid md:grid-cols-3 gap-8 px-12 py-16">
                <Card className="p-6 shadow-md">
                    <h3 className="text-xl font-semibold mb-2">🎫 Ticket Tracking</h3>
                    <p className="text-gray-600">
                        Create, assign, and manage tickets with ease.
                    </p>
                </Card>
                <Card className="p-6 shadow-md">
                    <h3 className="text-xl font-semibold mb-2">🤝 Team Collaboration</h3>
                    <p className="text-gray-600">
                        Keep everyone aligned with comments and updates.
                    </p>
                </Card>
                <Card className="p-6 shadow-md">
                    <h3 className="text-xl font-semibold mb-2">📊 Progress Monitoring</h3>
                    <p className="text-gray-600">
                        Visualize project progress with boards and charts.
                    </p>
                </Card>
            </section>

            {/* Demo Section */}
            <section className="flex flex-col items-center py-20 bg-white">
                <h2 className="text-3xl font-bold mb-6">See It In Action</h2>
                {/*<div className="w-full max-w-3xl border rounded-lg shadow-lg p-8">*/}
                {/*    <CircularProgress*/}
                {/*        aria-label="Loading demo"*/}
                {/*        size="lg"*/}
                {/*        color="primary"*/}
                {/*        value={70}*/}
                {/*        showValueLabel*/}
                {/*    />*/}
                {/*    <p className="mt-4 text-gray-600 text-center">*/}
                {/*        Track sprint progress with interactive dashboards.*/}
                {/*    </p>*/}
                {/*</div>*/}
            </section>

            {/* Footer */}
            <footer className="pb-8 text-center text-gray-500">
                <p>© 2025 Order 66. Built with Next.js, HeroUI, and Tailwind.</p>
            </footer>
        </main>
    )
}
export default Greetings
