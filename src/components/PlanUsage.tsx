import axios from 'axios';
import React from 'react'
import { useState, useEffect } from "react";

export default function PlanUsage() {

    const [usage, setUsage] = useState({ createdForms: 0, totalSubmissions: 0, plan: "free" });
    
    useEffect(() => {
      async function fetchUsage() {
        const res = await axios.get(`/api/getUsage`);
        const data = await res.data
        setUsage(data);
      }
      fetchUsage();
    }, []);

    const upgradeToPro = () => {
        window.location.href = "/pricing"; 
      };
      
    
    return (
      <div>
        <p>Forms Created: {usage.createdForms}/10</p>
        <p>Submissions: {usage.totalSubmissions}/100</p>
        <p>Plan: {usage.plan}</p>
        {usage.createdForms >= 10 || usage.totalSubmissions >= 100 ? (
          <button onClick={upgradeToPro}>Upgrade to Pro</button>
        ) : null}
      </div>
    );
}
