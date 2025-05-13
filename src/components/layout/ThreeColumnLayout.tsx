"use client";

import Link from 'next/link';

interface ThreeColumnLayoutProps {
    children: React.ReactNode;
    leftColumn?: React.ReactNode;
    rightColumn?: React.ReactNode;
}

function LeftColumn({ children }: { children?: React.ReactNode }) {
    return (
        <div className="w-[300px] bg-gray-50 p-4 flex flex-col">
            <div className="flex justify-end mb-4">
                <Link 
                    href="/admin/configure/custom-questions"
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                >
                    Return
                </Link>
            </div>
            {children}
        </div>
    );
}

function Main({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex-1">
            {children}
        </div>
    );
}

function RightColumn({ children }: { children?: React.ReactNode }) {
    return (
        <div className="w-[300px]">
            {children}
        </div>
    );
}

export default function ThreeColumnLayout({ children, leftColumn, rightColumn }: ThreeColumnLayoutProps) {
    return (
        <div className="flex h-screen">
            <LeftColumn>{leftColumn}</LeftColumn>
            <Main>{children}</Main>
            <RightColumn>{rightColumn}</RightColumn>
        </div>
    );
}

ThreeColumnLayout.LeftColumn = LeftColumn;
ThreeColumnLayout.Main = Main;
ThreeColumnLayout.RightColumn = RightColumn;
