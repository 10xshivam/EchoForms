"use client"
import axios from "axios";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export default function FormDetail() {
  const [formDetails, setFormDetails] = useState();
  const { formId } = useParams();
  

  const fetchForm = useCallback(async () => {
    try {
      const res = await axios.get(`/api/forms/details?formId=${formId}`);
      const data = await res?.data;

      console.log("✅ Raw Response Data:", data);

      if (data.success) {
        setFormDetails(data.form.content);
      } else {
        console.error("Error:", data.error);
      }
    } catch (error) {
      console.error("❌ Failed to fetch form:", error);
    }
  }, [formId]); 

  useEffect(() => {
    if (formId) {
      fetchForm();
    }
  }, [formId, fetchForm]);

  console.log(formDetails)

  return (
    <div>page</div>
  )
}
