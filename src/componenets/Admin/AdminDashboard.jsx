import React, { useState, useEffect } from "react";
import AdminBox from "./AdminBox";
import axios, * as others from 'axios';
import AdminCard from "./AdminCard";
import { useStateContext } from "../../contexts/ContextProvider";
import API_URL from "../../url";

export default function DashBoardContent() {
    const [requestData, setrequesData] = useState(null)
    const [reload,setReload]=useState();
    const { setOrgDetails } = useStateContext();
    const { orgDetails } = useStateContext();
    const header = {
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
    }
    useEffect(() => {
        axios
            .get(`${API_URL}/api/admin/org/request`, header)
            .then((response) => {
                // console.log(response)
                setrequesData({
                    ...response.data.data
                })
                storeOrgDetails(response.data.data.pendingRequests)
            }, (error) => {
                console.log("Error")

            });
    }, [reload]);
    
    const loadPage=()=>{
        setReload("true")
    }
    const storeOrgDetails = (items) => {
        const IdsMap = {}
        for (let i = 0; i < items.length; i++) {
            var id = items[i]._id
            IdsMap[id] = items[i]
        }
        setOrgDetails(IdsMap)
    }
    
    
    if (!requestData) {
        return <div>Loading...</div>;
    }
    const items = requestData.pendingRequests;
    return (
        <div>
            <AdminBox title="Pending Requests" height="20px" width="90%" />
            <AdminBox title={requestData.pendingRequestsCount} height="20px" width="30%" />
            <AdminCard items={items} loadPage={loadPage}/>
        </div>
    );
}