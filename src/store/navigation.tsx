import App from "../components/App";
import ClipManager from "../components/ClipManager";

export const pages: Page[] = [
    { 
        name: "Home",
        url: "/", 
        component: App 
    },
    { 
        name: "Clip Manager",
        url: "/clipmanager", 
        component: ClipManager 
    },
];