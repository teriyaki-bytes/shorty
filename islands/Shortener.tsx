import { useState } from "preact/hooks";
import { Button } from "../components/Button.tsx";
import { SITE_URL } from "../config.ts";

interface ShortenerProps {
    display?: string
}

export default function Shortener(props?: ShortenerProps) {
    const [url, setUrl] = useState("");

    return (
        <>
            <div class="bg-gray-300 p-4">
                <form method="post" class="flex items-center">
                    <input
                        type="url"
                        name="s"
                        value={url}
                        onChange={(e) => setUrl((e.target as HTMLInputElement).value)}
                        class="w-full rounded-md border border-gray-400 px-4 py-2 mr-2"
                        placeholder="Enter URL"
                    />
                    <button
                        type="submit"
                        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Shorten
                    </button>
                </form>
            </div>
            {(props) ? (
                <div class="flex items-center justify-center bg-gray-100 p-4" >
                    <div class="w-full max-w-md rounded-md border bg-gray-100 border-gray-400 px-4 py-2 mr-2">
                        {((SITE_URL === undefined) ? `https://${SITE_URL}` : "http://localhost:8000") + `/${props?.display}`}
                    </div>
                    <Button
                        onClick={() => navigator.clipboard.writeText(`https://${SITE_URL || "localhost:8080"}/${props?.display}`)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-copy"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                    </Button>
                </div>
            ) : <span></span>}

        </>
    );
}
