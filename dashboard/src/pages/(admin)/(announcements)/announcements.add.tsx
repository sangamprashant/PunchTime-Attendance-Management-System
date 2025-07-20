import React, { useState } from "react";
import { PageHeader } from "../../../components";

interface AnnouncementFormData {
    officeBranch: string;
    title: string;
    description: string;
    date: string;
    type:
    | "Holiday"
    | "Update"
    | "Policy"
    | "Event"
    | "Maintenance"
    | "Reminder"
    | "Training";
}

const initialForm: AnnouncementFormData = {
    officeBranch: "",
    title: "",
    description: "",
    date: "",
    type: "Holiday",
};

const AnnouncementsAdd: React.FC = () => {
    const [formData, setFormData] = useState<AnnouncementFormData>(initialForm);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Submitting:", formData);
        // Send to server via fetch/axios here
    };

    return (
        <>
            <PageHeader title="Add New Announcement" />
            <div className="mx-auto mt-10 p-6 bg-white rounded shadow">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        name="officeBranch"
                        placeholder="Office Branch ID"
                        value={formData.officeBranch}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />

                    <input
                        type="text"
                        name="title"
                        placeholder="Title"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />

                    <textarea
                        name="description"
                        placeholder="Description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        rows={4}
                        required
                    />

                    <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />

                    <select
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    >
                        <option value="Holiday">Holiday</option>
                        <option value="Update">Update</option>
                        <option value="Policy">Policy</option>
                        <option value="Event">Event</option>
                        <option value="Maintenance">Maintenance</option>
                        <option value="Reminder">Reminder</option>
                        <option value="Training">Training</option>
                    </select>

                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </>
    );
};

export default AnnouncementsAdd;
