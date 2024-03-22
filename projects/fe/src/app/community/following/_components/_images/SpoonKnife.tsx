import React from "react";

interface SpoonKnifeProps {
    className?: string;
}

const SpoonKnife: React.FC<SpoonKnifeProps> = (props) => {
    return (
        <svg
            className={props.className}
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 -960 960 960"
            width="24"
        >
            <path d="m175-120-56-56 410-410q-18-42-5-95t57-95q53-53 118-62t106 32q41 41 32 106t-62 118q-42 44-95 57t-95-5l-50 50 304 304-56 56-304-302-304 302Zm118-342L173-582q-54-54-54-129t54-129l248 250-128 128Z" />
        </svg>
    );
};

export default SpoonKnife;
