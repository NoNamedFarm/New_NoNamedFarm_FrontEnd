import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    #root {
        background-color: #fefefe;
        
        color: #555;
        font-family: "Inter";
        font-weight: 600;
    }

    html {
        overflow: overlay;
    }

    * {
        margin: 0;
        padding: 0;

        color: #555;
        font-family: "Inter";
        font-weight: 600;
        
        box-sizing: border-box;
    }
`;
