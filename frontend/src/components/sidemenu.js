import { Home, Dashboard,ExitToApp,EventNote } from '@material-ui/icons';
// import NoteAltIcon from '@mui/icons-material/NoteAlt';

export const sidemenu = [
    {
        name: "Home",
        path: "/dashboard",
        icon: <Home />
    },
    {
        name: "Dashboard",
        path: "/dashboard",
        icon: <Dashboard />
    },
    {
        name: "Logout",
        path: "/",
        icon: <ExitToApp />
    },
    {
        name:"Appointment",
        path:"/appointment",
        icon:<EventNote />
    }
]