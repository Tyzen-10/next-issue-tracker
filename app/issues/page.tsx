"use client"
import React, {useEffect, useState} from 'react'
import {Button} from '@radix-ui/themes'
import Link from 'next/link'
import axios from 'axios'
import DisplayIssue from '../components/DisplayIssue'
type issueType = {
    "id": number,
        "title": string,
        "description": string,
        "status": string,
        "createdAt": string,
        "updatedAt": string,
}
const Issues =  () => {
    const [issues, setIssues] = useState<issueType[]>([]);
    const [loading, setLoading] = useState(true);
    const fetchIssues = async () => {
        try {
          const axiosResponse = await axios.get('/api/issues');
          setIssues(axiosResponse.data);
        } catch (error) {
          console.error('Failed to fetch issues:', error);
        } finally {
          setLoading(false);
        }
      };
      const deleteIssue = async (id: number) => {
        try {
            await axios.delete(`/api/issues?id=${id}`);
            // Refetch the issues after successful deletion
            fetchIssues();
        } catch (error) {
            console.error('Failed to delete issue:', error);
        }
    };
    useEffect(() => {
        fetchIssues();
      }, []);
    
      if (loading) {
        return <p>Loading...</p>;
      }
  return (
    <div>
        {issues.map(issue=><DisplayIssue key={issue.id} issue={issue} deleteIssue={deleteIssue}></DisplayIssue>)}
        <Button><Link href={`/issues/new`}>New Issue</Link></Button></div>
  )
}

export default Issues