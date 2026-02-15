import { Instagram } from 'lucide-react';

export const socialLinks = [
    {
        name: "Instagram",
        url: "https://www.instagram.com/_skydesigners",
        colorClass: "bg-gradient-to-br from-purple-600 to-pink-600",
        icon: (props: any) => <Instagram {...props} />
    },
    {
        name: "X (Twitter)",
        url: "https://x.com/skyper1z",
        colorClass: "bg-black",
        icon: (props: any) => (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                {...props}
            >
                <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
                <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
            </svg>
        )
    },
    {
        name: "Snapchat",
        url: "https://www.snapchat.com/@skyper1z",
        colorClass: "bg-[#FFFC00] text-black", // Snapchat yellow
        icon: (props: any) => (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="#020202"
                {...props}
            >
                <path d="M5.829 4.533c-.6 1.344-.363 3.752-.267 5.436-.648.359-1.48-.271-1.951-.271-.49 0-1.075.322-1.167.802-.066.346.089.85 1.201 1.289.43.17 1.453.37 1.69.928.333.784-1.71 4.403-4.918 4.931-.251.041-.43.265-.416.519.056.975 2.242 1.357 3.211 1.507.099.134.179.7.306 1.131.057.193.204.424.582.424.493 0 1.312-.38 2.738-.144 1.398.233 2.712 2.215 5.235 2.215 2.345 0 3.744-1.991 5.09-2.215.779-.129 1.448-.088 2.196.058.515.101.977.157 1.124-.349.129-.437.208-.992.305-1.123.96-.149 3.156-.53 3.211-1.505.014-.254-.165-.477-.416-.519-3.154-.52-5.259-4.128-4.918-4.931.236-.557 1.252-.755 1.69-.928.814-.321 1.222-.716 1.213-1.173-.011-.585-.715-.934-1.233-.934-.527 0-1.284.624-1.897.286.096-1.698.332-4.095-.267-5.438-1.135-2.543-3.66-3.829-6.184-3.829-2.508 0-5.014 1.268-6.158 3.833z" />
            </svg>
        )
    },
    {
        name: "TikTok",
        url: "https://www.tiktok.com/@skyper1z",
        colorClass: "bg-black",
        icon: (props: any) => (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                {...props}
            >
                <path d="M9 12a4 4 0 1 0 4 4v-12a5 5 0 0 0 5 5" />
            </svg>
        )
    }
];

export function SocialLinks({ className = "", iconClassName = "w-5 h-5" }: { className?: string, iconClassName?: string }) {
    return (
        <div className={`flex items-center gap-4 ${className}`}>
            {socialLinks.map((link) => (
                <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-blue-600 transition hover:scale-110"
                    title={link.name}
                >
                    <link.icon className={iconClassName} />
                </a>
            ))}
        </div>
    );
}
