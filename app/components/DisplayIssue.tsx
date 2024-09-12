import React, { PropsWithChildren } from 'react'
import {Badge, DataList, Button} from "@radix-ui/themes"
type issueType = {
    "id": number,
        "title": string,
        "description": string,
        "status": string,
        "createdAt": string,
        "updatedAt": string,
}
type DisplayIssueProps = {
    issue: issueType;
    deleteIssue: (id: number) => void;
};
const DisplayIssue = ({issue, deleteIssue}: DisplayIssueProps) => {
    const handleDelete = () => {
        deleteIssue(issue.id);
    }
  return (
    <div className='mb-5 max-w-xl bg-green-500 bg-opacity-35 p-5 rounded-md'>
        <DataList.Root>
        <DataList.Item>
            <DataList.Label>ID</DataList.Label>
            <DataList.Value>{issue.id}</DataList.Value>
        </DataList.Item>
        <DataList.Item>
            <DataList.Label>Title</DataList.Label>
            <DataList.Value>{issue.title}</DataList.Value>
        </DataList.Item>
        <DataList.Item>
            <DataList.Label>Status</DataList.Label>
            <DataList.Value><Badge>{issue.status}</Badge></DataList.Value>
        </DataList.Item>
        <DataList.Item>
            <DataList.Label>Description</DataList.Label>
            <DataList.Value>{issue.description}</DataList.Value>
        </DataList.Item>
    </DataList.Root>
    <div className='my-3'><Button color='red' onClick={handleDelete}>Delete</Button></div>
    </div>
  )
}

export default DisplayIssue