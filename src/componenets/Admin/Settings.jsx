import AdminBox from "./AdminBox";
import { Button } from "@mantine/core";
import { Center } from '@mantine/core';
import axios, * as others from 'axios';
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";
import API_URL from "../../url";
export default function Settings() {
    const { setLogin } = useStateContext()
    const navigate=useNavigate()
    const logoutAll = () => {
        const headers = {
            'Authorization': `Bearer ${localStorage.getItem("token")}`
        };
        axios.post(`${API_URL}/admin/logoutall`, undefined, { headers })
            .then((response) => {

                localStorage.clear()
                setLogin(null)
                navigate("/")
            })
            .catch((error) => {
            });
    }

    return (
        <div>
            <AdminBox title="Settings" height="20px" width="90%" />
            <Center>
                <Button
                    variant="outline"
                    loaderPosition="center"
                    onClick={logoutAll}
                >Click Here to Logout from all devices</Button>
            </Center>
        </div>
    );

}