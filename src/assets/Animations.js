import { keyframes } from "@emotion/react";

export const pulse = keyframes`
0% { transform: scale(1); }
50% { transform: scale(1.02); }
100% { transform: scale(1); }
`;

export const slideIn = keyframes`
from { transform: translateY(20px); opacity: 0; }
to { transform: translateY(0); opacity: 1; }
`;

export const cardHover = keyframes`
from { transform: translateY(0); }
to { transform: translateY(-4px); }
`;