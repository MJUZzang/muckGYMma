"use client";

import React, { useEffect, useRef } from "react";

function CommentSectionTextArea({
    text,
    setText,
}: {
    text: string;
    setText: React.Dispatch<React.SetStateAction<string>>;
}) {
    const hiddenTextArea = useRef<HTMLTextAreaElement>(null);
    const textArea = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (!hiddenTextArea.current || !textArea.current) return;

        hiddenTextArea.current.value = textArea.current.value;
        textArea.current.style.height =
            hiddenTextArea.current.scrollHeight + 5 + "px";
    }, [text]);

    return (
        <div className="w-full">
            {/* Input Comment */}
            <textarea
                ref={textArea}
                maxLength={700}
                onChange={(e) => setText(e.target.value)}
                rows={1}
                className="w-full min-h-[43px] py-2 rounded-xl pl-3 bg-[#202020] text-app-font-2 
                focus:outline-none resize-none max-h-[45dvh] overflow-y-auto
                duration-75 transition-all"
                placeholder="Leave a comment for jeheecheon..."
            />
            {/* Hidden Text Area */}
            <textarea
                ref={hiddenTextArea}
                className="absolute min-h-[43px] invisible w-full overflow-y-auto"
                rows={1}
            />
        </div>
    );
}

export default CommentSectionTextArea;
